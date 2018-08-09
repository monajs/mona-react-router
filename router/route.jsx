import Url from './url'
import Util from './util'
import Events from 'mona-events'
import Router from './index'

class Route extends Events {
	setConf (routeConf) {
		this.routeConf = routeConf
		this.format()
		
		window.addEventListener('popstate', this.format.bind(this), false)
		this.on(Util.HISTORY_POPSTATE_EVENT_NAME, this.format.bind(this))
	}
	
	format () {
		const url = new Url(location.href)
		const routePath = url.pathname.length > 1 ? url.pathname.substring(1) : this.routeConf.index
		
		const routeInfo = this.matchRoute(routePath)
		
		if (!routeInfo) {
			this.switchPage(this.routeConf.emptyPage)
			return
		}
		
		const params = Url.parseParam(url.search)
		this.current = Object.assign({}, routeInfo, {
			routePath: routePath,
			params: Object.assign({}, params, routeInfo.params),
			url: url
		})
		Router.current = this.current
		this.emit(Util.ROUTER_CHANGE_EVENT_NAME, this.current)
	}
	
	parseStrToRegExp (str) {
		let params = []
		let reg = str.replace(/\/\:([^\/]+)/g, function (t, k) {
			params.push(k)
			return '/([^\/]*)'
		})
		return {
			regExp: new RegExp('^' + reg + '$'),
			params: params
		}
	}
	
	matchRoute (path) {
		if (!this.routeInfo) {
			this.routeInfo = []
			this.routeConf.routeList.forEach((ri) => {
				let keys = Object.keys(ri.routes)
				this.routeInfo = this.routeInfo.concat(keys.map((v) => {
					let info = {
						layout: ri.layout,
						path: v,
						page: ri.routes[v]
					}
					return Object.assign(info, this.parseStrToRegExp(v))
				}))
			})
		}
		Router.routeInfo = this.routeInfo
		
		const l = this.routeInfo.length
		for (let i = 0; i < l; i++) {
			let regInfo = this.routeInfo[i].regExp.exec(path)
			if (regInfo) {
				let paramData = regInfo.slice(1)
				let params = {}
				this.routeInfo[i].params.forEach((v, j) => {
					params[v] = paramData[j]
				})
				return Object.assign({}, this.routeInfo[i], {
					routePath: path,
					params: params
				})
			}
		}
		return false
	}
	
	changeFinish () {
		this.emit('changeFinish')
	}
	
	switchPage (path, data, title = '', state = {}) {
		window.history.replaceState(state, title, path + (data ? '?' + Url.param(data) : ''))
		this.emit(Util.HISTORY_POPSTATE_EVENT_NAME)
	}
	
	href (path, data) {
		return '/' + path + (data ? '?' + Url.param(data) : '')
	}
	
	go (path, data, title = '', state = {}) {
		window.history.pushState(state, title, path + (data ? '?' + Url.param(data) : ''))
		this.emit(Util.HISTORY_POPSTATE_EVENT_NAME)
	}
}

export default new Route
