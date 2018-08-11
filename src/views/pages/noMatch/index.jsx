import React, { Component } from 'react';
import Router from 'router'

const Link = Router.link

export default class NoMatch extends Component {
	componentDidMount () {
		console.dir(Router.current)
	}
	render () {
		return (
			<Link to="home/name/321">test</Link>
		);
	}
}
