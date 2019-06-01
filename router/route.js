import Url from './url'
import {
  ROUTER_TYPE_KEY_HASH,
  ROUTER_TYPE_KEY_HISTORY,
  ROUTER_CHANGE_EVENT,
  ROUTER_MISS_EVENT,
  ROUTER_CHANGE_FINISH_EVENT
} from './constant'
import Events from 'mona-events'
import Router from './index'

class Route extends Events {
  setConfig (routeConfig = {}) {
    this.routeConfig = Object.assign({
      baseUrl: '',
      type: ROUTER_TYPE_KEY_HASH,
      isHistory: routeConfig.type === ROUTER_TYPE_KEY_HISTORY
    }, routeConfig)

    Router.routeConfig = this.routeConfig

    this.format()

    const { isHistory } = this.routeConfig
    if (isHistory) {
      window.addEventListener('popstate', this.format.bind(this), false)
    } else {
      window.addEventListener('hashchange', this.format.bind(this), false)
    }
  }

  // 核心处理逻辑
  format () {
    const { isHistory, index } = this.routeConfig
    let url
    if (isHistory) {
      url = new Url(window.location.href)
    } else {
      let p = window.location.hash.substring(1)
      if (p.charAt(0) !== '/') {
        p = `/${p}`
      }
      url = new Url(p)
    }
    const routePath = url.pathname.length > 1 ? url.pathname.substring(1) : index
    const routeInfo = this.matchRoute(routePath)

    if (!routeInfo) {
      this.emit(ROUTER_MISS_EVENT)
      throw new Error('404.')
    }

    const params = Url.parseParam(url.search)
    this.current = Object.assign({}, routeInfo, {
      routePath: routePath,
      params: Object.assign({}, params, routeInfo.params),
      url: url
    })
    Router.current = this.current
    this.emit(ROUTER_CHANGE_EVENT, this.current)
  }

  parseStrToRegExp (str) {
    const params = []
    const reg = str.replace(/\/\:([^\/]+)/g, (t, k) => {
      params.push(k)
      return '/([^\/]*)'
    })
    return {
      regExp: new RegExp('^' + reg + '$'),
      params: params
    }
  }

  matchRoute (path) {
    const { defaultLayout, isHistory } = this.routeConfig
    if (!this.routeInfo) {
      this.routeInfo = []
      this.routeConfig.routeList.forEach((ri) => {
        this.routeInfo.push({
          ...ri,
          ...this.parseStrToRegExp(ri.path),
          layout: ri.layout || defaultLayout
        })
      })
      Router.routeInfo = this.routeInfo
    }

    for (let i = 0; i < this.routeInfo.length; i++) {
      const routeItem = this.routeInfo[i]
      const regInfo = routeItem.regExp.exec(path)
      if (regInfo) {
        const paramData = regInfo.slice(1)
        const params = {}
        routeItem.params.forEach((v, j) => {
          params[v] = paramData[j]
        })
        const routeInfo = Object.assign({}, this.routeInfo[i], {
          routePath: path,
          params
        })
        if (isHistory) {
          routeInfo.state = window.history.state
        }
        return routeInfo
      }
    }
    return false
  }

  // 路由切换结束
  changeFinish () {
    this.emit(ROUTER_CHANGE_FINISH_EVENT)
  }

  // 控制 path
  href (path, data) {
    const { isHistory } = this.routeConfig
    let { baseUrl } = this.routeConfig
    if (path && path.charAt(0) !== '/') {
      path = `/${path}`
    }
    const qs = data ? `?${Url.param(data)}` : ''
    if (isHistory) {
      if (baseUrl && baseUrl.charAt(0) !== '/') {
        baseUrl = `/${baseUrl}`
      }
      return `${baseUrl}${path}${qs}`
    } else {
      return `#${path}${qs}`
    }
  }
}

export default new Route
