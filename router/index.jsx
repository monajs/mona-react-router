import React, { Component } from 'react'
import Route from './route'
import Util from './util'
import Url from './url'
import Link from './link'

export default class Router extends Component {
	static link = Link
	static current = {}
	static routeInfo = {}
	static routeConfig = {}
	
	static go (path, data, title = '', state = {}) {
		const { isHistory } = Route.routeConfig
		if (isHistory) {
			window.history.pushState(state, title, '/' + path + (data ? '?' + Url.param(data) : ''))
			Route.format()
		} else {
			window.location.href('#' + path + (data ? '?' + Url.param(data) : ''))
		}
	}
	
	constructor (props) {
		super(props)
		this.verify(props)
		Route.setConfig(props.config)
	}
	
	// 初始化属性校验
	verify (props) {
		if (!props.config || !Util.isJSON(props.config)) {
			throw new Error('请检查 config props属性类型')
		}
		const { type } = props.config
		if (type && !(type === Util.ROUTER_TYPE_KEY_HISTORY || type === Util.ROUTER_TYPE_KEY_HISTORY)) {
			throw new Error('type 属性仅支持hash 和 history')
		}
	}
	
	componentDidMount () {
		Route.on(Util.ROUTER_CHANGE_EVENT, () => {
			this.setState({}, () => {
				// 渲染完成触发渲染路由事件
				Route.changeFinish()
			})
		})
	}
	
	render () {
		if (!Route.current) {
			return null
		}
		let Layout = Route.current.layout
		let RoutePage = Route.current.page
		if (!RoutePage) {
			return null
		}
		if (this.page !== RoutePage) {
			this.ctrl = null
			RoutePage.Controller && (this.ctrl = new RoutePage.Controller)
		}
		this.page = RoutePage
		Router.current.ctrl = Route.current.ctrl = this.ctrl
		
		if (!Layout) {
			return <RoutePage />
		}
		return (
			<Layout>
				<RoutePage />
			</Layout>
		)
	}
}
