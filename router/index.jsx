import React, { Component } from 'react'
import Route from './route'
import { isJSON } from './util'
import { ROUTER_CHANGE_EVENT, ROUTER_TYPE_KEY_HISTORY, ROUTER_TYPE_KEY_HASH } from './constant'
import Url from './url'
import Link from './link'

export default class Router extends Component {
  static link = Link
  static current = {}
  static routeInfo = {}
  static routeConfig = {}

  static go (path, data, title = '', state = {}) {
    const { isHistory, baseUrl } = Route.routeConfig
    if (isHistory) {
      window.history.pushState(state, title, '/' + baseUrl + '/' + path + (data ? `?${Url.param(data)}` : ''))
      Route.format()
    } else {
      window.location.href = `#${path}${data ? '?' + Url.param(data) : ''}`
    }
  }

  static addEventListener (eventName, callback) {
    const eventsMap = {
      onChange: ROUTER_CHANGE_EVENT
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

  // init verify for config
  verify (config) {
    if (!config || !isJSON(config)) {
      throw TypeError('Please check the type of config.')
    }
    const { type } = config
    if (type !== ROUTER_TYPE_KEY_HISTORY && type !== ROUTER_TYPE_KEY_HASH) {
      throw new Error('Please input "hash" or "history" for type.')
    }
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
