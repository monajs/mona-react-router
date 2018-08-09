import DefaultLayout from 'views/layout/default'
import NoMatch from 'pages/noMatch'
import Home from 'pages/home'

export default {
	index: 'home',
	emptyPage: 'test',
	routeList: [
		{
			layout: DefaultLayout,
			routes: {
				'home/:name': Home
			}
		}, {
			routes: {
				'test': NoMatch
			}
		}, {
			routes: {
				'400': NoMatch
			}
		}
	]
}
