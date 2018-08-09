import React, { Component } from 'react';
import Router from 'router'

const Link = Router.link

export default class NoMatch extends Component {
	render () {
		return (
			<Link to="hom/123">test</Link>
		);
	}
}
