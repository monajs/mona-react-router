import DefaultLayout from 'views/layout/default'
import NoMatch from 'pages/noMatch'
import Home from 'pages/home'

export default {
  index: 'home',
  type: 'history',
  baseUrl: 'aaa',
  defaultLayout: DefaultLayout,
  routeList: [
    {
      path: 'home/:name/:count',
      component: Home
    }, {
      path: 'test',
      component: NoMatch
    }, {
      path: '404',
      component: NoMatch
    }
  ]
}
