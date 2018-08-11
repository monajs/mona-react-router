'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
	function Util() {
		_classCallCheck(this, Util);

		this.ROUTER_CHANGE_EVENT = 'monaReactRouterChange';
		this.ROUTER_CHANGE_FINISH_EVENT = 'monaReactRouterChangeFinish';
		this.ROUTER_TYPE_KEY_HASH = 'hash';
		this.ROUTER_TYPE_KEY_HISTORY = 'history';
	}

	_createClass(Util, [{
		key: 'isJSON',
		value: function isJSON(data) {
			return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]';
		}
	}]);

	return Util;
}();

exports.default = new Util();