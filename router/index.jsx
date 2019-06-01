import React, { Component } from 'react'
import Route from './route'
import { isJSON } from './util'
import { ROUTER_CHANGE_EVENT, ROUTER_TYPE_KEY_HISTORY, ROUTER_TYPE_KEY_HASH, ROUTER_MISS_EVENT } from './constant'
import Link from './link'

export default class Router extends Component {
  static link = Link
  static current = {}
  static routeInfo = {}
  static routeConfig = {}

  static go (path, data, title = '', state = {}) {
    const { isHistory } = Route.routeConfig
    if (isHistory) {
      window.history.pushState(state, title, Route.href(path, data))
      Route.format()
    } else {
      window.location.href = Route.href(path, data)
    }
  }

  static addEventListener (eventName, callback) {
    const eventsMap = {
      onChange: ROUTER_CHANGE_EVENT,
      onMiss: ROUTER_MISS_EVENT
    }
    if (!eventsMap[eventName]) {
      throw new Error(`Dont support ${eventName} evnet.`)
    }
    Route.on(eventsMap[eventName], () => {
      callback(Route.current)
    })
  }

  constructor (props = {}) {
    super(props)
    this.verify(props.config)
    Route.setConfig(props.config)
  }

  componentDidMount () {
    Route.on(ROUTER_CHANGE_EVENT, () => {
      this.setState({}, () => {
        // 渲染完成触发渲染路由事件
        Route.changeFinish()
      })
    })
  }

  componentWillUnmount () {
    Route.off(ROUTER_CHANGE_EVENT)
    Route.off(ROUTER_MISS_EVENT)
  }

  // verify config
  verify (config) {
    if (!config || !isJSON(config)) {
      throw TypeError('Please check the config data type.')
    }
    const { type } = config
    if (type !== ROUTER_TYPE_KEY_HISTORY && type !== ROUTER_TYPE_KEY_HASH) {
      throw new Error('The type attribute only supports hash and history.')
    }
  }

  render () {
    if (!Route.current) {
      return null
    }
    const Layout = Route.current.layout
    const RouteView = Route.current.component
    if (!RouteView) {
      return null
    }
    if (this.page !== RouteView) {
      this.ctrl = null
      RouteView.Controller && (this.ctrl = new RouteView.Controller)
    }
    this.page = RouteView
    Router.current.ctrl = Route.current.ctrl = this.ctrl

    if (!Layout) {
      return <RouteView />
    }
    return (
      <Layout>
        <RouteView />
      </Layout>
    )
  }
}
