import React, { Component } from 'react'
import Route from './route'
import Util from './util'
import classNames from 'classnames'

export default class Link extends Component {
	routeInfo = {}
	
	constructor (props) {
		super(props)
		let to = this.props.to
		if (to) {
			if (typeof(to) === 'string') {
				this.routeInfo = Route.matchRoute(to) || {}
			}
			if (to instanceof Object) {
				this.routeInfo = Route.matchRoute(to.path) || {}
			}
		}
	}
	
	componentWillUnmount () {
		this.unmount = true
		Route.off('changeFinish', this.onChange)
	}
	
	componentDidMount () {
		this.onChange = () => {
			if (this.unmount) {
				return
			}
			this.setState({})
		}
		Route.on('changeFinish', this.onChange)
	}
	
	isLeftClickEvent (event) {
		return event.button === 0
	}
	
	isModifiedEvent (event) {
		return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
	}
	
	onClick (href, e) {
		const { to, target, onClick } = this.props
		onClick && onClick(e)
		
		if (this.isModifiedEvent(e) || !this.isLeftClickEvent(e)) return
		
		if (target || e.defaultPrevented) {
			return
		}
		let state = {}
		let title = ''
		if (to instanceof Object) {
			state = to.state || {}
			title = to.title || ''
		}
		window.history.pushState(state, title, href)
		e.preventDefault()
		Route.emit(Util.HISTORY_POPSTATE_EVENT_NAME)
		return false
	}
	
	render () {
		const { className, activeClassName, to, children, ...props } = this.props
		let isActive = false
		if (this.routeInfo.routePath === Route.current.routePath) {
			isActive = true
		}
		if (!isActive && Route.routeConf.relation && Route.routeConf.relation[Route.current.path]) {
			isActive = Route.routeConf.relation[Route.current.path].parents.indexOf(this.routeInfo.path) >= 0
		}
		
		let actName = isActive ? activeClassName : ''
		
		let href = ''
		if (to instanceof Object) {
			href = Route.href(to.path, to.query)
		} else {
			href = Route.href(to)
		}
		return (
			<a className={classNames(actName, className)} href={href} onClick={this.onClick.bind(this, href)} {...props}>{children}</a>
		)
	}
}
