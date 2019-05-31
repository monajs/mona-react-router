import DefaultLayout from 'views/layout/default'
import NoMatch from 'pages/noMatch'
import Home from 'pages/home'

export default {
	index: 'home',
	type: 'history',
	baseUrl: 'aaa',
	routeList: [
		{
			layout: DefaultLayout,
			routes: {
				'home/:name/:count': Home
			}
		}, {
			routes: {
				'test': NoMatch
			}
		}, {
			routes: {
				'404': NoMatch
			}
		}
	]
}
