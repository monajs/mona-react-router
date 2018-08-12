'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _monaEvents = require('mona-events');

var _monaEvents2 = _interopRequireDefault(_monaEvents);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_Events) {
	_inherits(Route, _Events);

	function Route() {
		_classCallCheck(this, Route);

		return _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).apply(this, arguments));
	}

	_createClass(Route, [{
		key: 'setConfig',
		value: function setConfig(routeConfig) {
			this.routeConfig = _extends({
				type: _util2.default.ROUTER_TYPE_KEY_HASH,
				isHistory: routeConfig.type === _util2.default.ROUTER_TYPE_KEY_HISTORY // 限定死了hash 和history
			}, routeConfig);

			_index2.default.routeConfig = this.routeConfig;

			this.format();

			var isHistory = this.routeConfig.isHistory;

			if (isHistory) {
				window.addEventListener('popstate', this.format.bind(this), false);
			} else {
				window.addEventListener('hashchange', this.format.bind(this), false);
			}
		}

		// 核心处理逻辑

	}, {
		key: 'format',
		value: function format() {
			var _routeConfig = this.routeConfig,
			    isHistory = _routeConfig.isHistory,
			    index = _routeConfig.index,
			    emptyPage = _routeConfig.emptyPage;

			var url = void 0;
			if (isHistory) {
				url = new _url2.default(window.location.href);
			} else {
				var p = window.location.hash.substring(1);
				if (p.charAt(0) !== '/') {
					p = '/' + p;
				}
				url = new _url2.default(p);
			}
			var routePath = url.pathname.length > 1 ? url.pathname.substring(1) : index;
			var routeInfo = this.matchRoute(routePath);

			if (!routeInfo) {
				// 跳空页面
				this.switchPage(emptyPage || '404');
				return;
			}

			var params = _url2.default.parseParam(url.search);
			this.current = _extends({}, routeInfo, {
				routePath: routePath,
				params: _extends({}, params, routeInfo.params),
				url: url
			});
			_index2.default.current = this.current;
			this.emit(_util2.default.ROUTER_CHANGE_EVENT, this.current);
		}
	}, {
		key: 'parseStrToRegExp',
		value: function parseStrToRegExp(str) {
			var params = [];
			var reg = str.replace(/\/\:([^\/]+)/g, function (t, k) {
				params.push(k);
				return '/([^\/]*)';
			});
			return {
				regExp: new RegExp('^' + reg + '$'),
				params: params
			};
		}
	}, {
		key: 'matchRoute',
		value: function matchRoute(path) {
			var _this2 = this;

			if (!this.routeInfo) {
				this.routeInfo = [];
				this.routeConfig.routeList.forEach(function (ri) {
					var keys = Object.keys(ri.routes);
					_this2.routeInfo = _this2.routeInfo.concat(keys.map(function (v) {
						var info = {
							layout: ri.layout,
							path: v,
							page: ri.routes[v]
						};
						return _extends(info, _this2.parseStrToRegExp(v));
					}));
				});
			}

			_index2.default.routeInfo = this.routeInfo;
			for (var i = 0; i < this.routeInfo.length; i++) {
				var regInfo = this.routeInfo[i].regExp.exec(path);
				if (regInfo) {
					var _ret = function () {
						var paramData = regInfo.slice(1);
						var params = {};
						_this2.routeInfo[i].params.forEach(function (v, j) {
							params[v] = paramData[j];
						});
						var routeInfo = _extends({}, _this2.routeInfo[i], {
							routePath: path,
							params: params
						});
						if (_this2.routeConfig.isHistory) {
							routeInfo.state = window.history.state;
						}
						return {
							v: routeInfo
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
			}
			console.error('请检查页面链接！');
			return false;
		}
	}, {
		key: 'changeFinish',
		value: function changeFinish() {
			this.emit(_util2.default.ROUTER_CHANGE_FINISH_EVENT);
		}
	}, {
		key: 'switchPage',
		value: function switchPage(path, data) {
			var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
			var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var isHistory = this.routeConfig.isHistory;

			if (isHistory) {
				window.history.replaceState(state, title, '/' + path + (data ? '?' + _url2.default.param(data) : ''));
				this.format();
			} else {
				window.location.replace('#' + path + (data ? '?' + _url2.default.param(data) : ''));
			}
		}
	}, {
		key: 'href',
		value: function href(path, data) {
			var isHistory = this.routeConfig.isHistory;

			if (isHistory) {
				return '/' + path + (data ? '?' + _url2.default.param(data) : '');
			} else {
				return '#' + path + (data ? '?' + _url2.default.param(data) : '');
			}
		}
	}]);

	return Route;
}(_monaEvents2.default);

exports.default = new Route();