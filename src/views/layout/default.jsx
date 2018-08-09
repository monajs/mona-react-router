/***
 * created by yangxi 2018/1/8
 */
import React, { Component } from 'react'

export default class DefaultLayout extends Component {
	
	render () {
		return (
			<div>
				<div>layout</div>
				{this.props.children}
			</div>
		)
	}
}
