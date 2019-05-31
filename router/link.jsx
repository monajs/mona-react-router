import React, { Component } from 'react'
import Route from './route'
import { isJSON } from './util'
import { ROUTER_CHANGE_FINISH_EVENT, ROUTER_TYPE_KEY_HISTORY } from './constant'

export default class Link extends Component {
  routeInfo = {}

  constructor (props) {
    super(props)
    const { to } = this.props
    if (to) {
      if (typeof(to) === 'string') {
        this.routeInfo = Route.matchRoute(to) || {}
      } else if (isJSON(to)) {
        this.routeInfo = Route.matchRoute(to.path) || {}
      }
    }
  }

  componentWillUnmount () {
    this.unmount = true
    Route.off(ROUTER_CHANGE_FINISH_EVENT, this.onChange)
  }

  componentDidMount () {
    this.onChange = () => {
      if (this.unmount) {
        return
      }
      this.setState({})
    }
    Route.on(ROUTER_CHANGE_FINISH_EVENT, this.onChange)
  }

  isLeftClickEvent (event) {
    return event.button === 0
  }

  isModifiedEvent (event) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
  }

  onClick (href, e) {
    const { to, target, onClick } = this.props
    onClick && onClick(e)

    if (Route.routeConfig.type !== ROUTER_TYPE_KEY_HISTORY) {
      return
    }
    if (this.isModifiedEvent(e) || !this.isLeftClickEvent(e)) {
      return
    }

    if (target || e.defaultPrevented) {
      return
    }
    let state = {}
    let title = ''
    if (isJSON(to)) {
      state = to.state || {}
      title = to.title || ''
    }
    window.history.pushState(state, title, href)
    e.preventDefault()
    Route.format()
    return false
  }

  render () {
    const { className, activeClassName, to, children, ...props } = this.props
    let isActive = this.routeInfo.routePath === Route.current.routePath

    if (!isActive && Route.routeConfig.relation && Route.routeConfig.relation[Route.current.path]) {
      isActive = Route.routeConfig.relation[Route.current.path].parents.indexOf(this.routeInfo.path) >= 0
    }

    let klass = isActive ? activeClassName : ''
    if (className) {
      klass = klass + ' ' + className
    }

    let href = ''
    if (isJSON(to)) {
      href = Route.href(to.path, to.query)
    } else {
      href = Route.href(to)
    }
    return (
      <a className={klass} href={href} onClick={this.onClick.bind(this, href)} {...props}>{children}</a>
    )
  }
}
