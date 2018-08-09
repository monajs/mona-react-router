import React, { Component } from 'react'
import Router from 'router'

const Link = Router.link

export default class Home extends Component {
	componentDidMount () {
		console.dir(Router.current)
	}
	
	render () {
		return (
			<Link to="test">home</Link>
		)
	}
}
