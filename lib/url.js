'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Url = function () {
	function Url(path) {
		_classCallCheck(this, Url);

		var _def = {
			hash: '',
			host: '',
			hostname: '',
			href: '',
			username: '',
			password: '',
			origin: '',
			pathname: '',
			port: '',
			protocol: '',
			search: ''
		};
		var _a = null;
		//if(window.hasOwnProperty("URL")){
		//_a = new URL(path,location.href);
		//}else{
		_a = document.createElement('a');
		_a.href = path;
		//}
		for (var i in _def) {
			this[i] = _a[i] ? _a[i] : _def[i];
		}
	}

	_createClass(Url, [{
		key: 'toString',
		value: function toString() {
			return (this.protocol && this.protocol + '://') + (this.username && this.useranme + (this.password && ':' + this.password) + '@') + this.host + (this.port && ':' + this.port) + this.path + this.search + this.hash;
		}
	}], [{
		key: 'param',
		value: function param(data) {
			var _t = [];
			Object.keys(data).forEach(function (vi) {
				if (data[vi] !== undefined) {
					_t.push(vi + '=' + data[vi]);
				}
			});
			return _t.join('&');
		}
	}, {
		key: 'parseParam',
		value: function parseParam(search) {
			if (search.indexOf('?') === 0) {
				search = search.substring(1);
			}
			var _t = search.split('&');
			var params = {};
			_t.forEach(function (vi) {
				var _p = vi.split('=');
				if (_p.length !== 2) {
					return;
				}
				params[_p[0]] = _p[1];
			});
			return params;
		}
	}]);

	return Url;
}();

exports.default = Url;