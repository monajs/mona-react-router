class Util {
	ROUTER_CHANGE_EVENT = 'monaReactRouterChange'
	ROUTER_CHANGE_FINISH_EVENT = 'monaReactRouterChangeFinish'
	ROUTER_TYPE_KEY_HASH = 'hash'
	ROUTER_TYPE_KEY_HISTORY = 'history'
	
	isJSON (data) {
		return typeof(data) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]'
	}
}

export default new Util
