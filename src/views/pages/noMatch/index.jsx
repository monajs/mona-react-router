import React, { Component } from 'react'
import Router from 'router'

const Link = Router.link

export default class NoMatch extends Component {
	componentDidMount () {
		console.dir(Router.current)
	}
	
	render () {
		return (
			<Link className="sss" activeClassName="active" to={{ path: 'home/name/321?age=25', state: { a: 1 } }}>test</Link>
		)
	}
}
