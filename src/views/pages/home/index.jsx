import React, { Component } from 'react'
import Router from 'router'
import Ctrl from './ctrl'

const Link = Router.link

export default class Home extends Component {
	static Controller = Ctrl
	
	componentDidMount () {
		console.dir(Router.current)
	}
	
	go() {
		Router.go ('404', {name: 'yangxi'}, 'title', {s: 'state'})
	}
	
	render () {
		return (
			<div onClick={this.go.bind(this)}>home</div>
		)
	}
}
