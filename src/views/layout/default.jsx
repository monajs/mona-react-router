/***
 * created by yangxi 2018/1/8
 */
import React, { Component } from 'react'
import Router from 'router'

export default class DefaultLayout extends Component {
	componentWillMount () {
		Router.addEventListener('onChange', (res) => {
			console.log(res)
		})
	}
	
	render () {
		return (
			<div>
				<div>layout</div>
				{this.props.children}
			</div>
		)
	}
}
