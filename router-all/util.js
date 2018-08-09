import React from './index'

class Util {
	ROUTER_CHANGE_EVENT_NAME = 'monaReactRouterChange'
	
	isJSON (data) {
		return typeof(data) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]'
	}
}

export default new Util
