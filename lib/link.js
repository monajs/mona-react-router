'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Component) {
	_inherits(Link, _Component);

	function Link(props) {
		_classCallCheck(this, Link);

		var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

		_this.routeInfo = {};
		var to = _this.props.to;

		if (to) {
			if (typeof to === 'string') {
				_this.routeInfo = _route2.default.matchRoute(to) || {};
			} else if (_util2.default.isJSON(to)) {
				_this.routeInfo = _route2.default.matchRoute(to.path) || {};
			}
		}
		return _this;
	}

	_createClass(Link, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.unmount = true;
			_route2.default.off(_util2.default.ROUTER_CHANGE_FINISH_EVENT, this.onChange);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.onChange = function () {
				if (_this2.unmount) {
					return;
				}
				_this2.setState({});
			};
			_route2.default.on(_util2.default.ROUTER_CHANGE_FINISH_EVENT, this.onChange);
		}
	}, {
		key: 'isLeftClickEvent',
		value: function isLeftClickEvent(event) {
			return event.button === 0;
		}
	}, {
		key: 'isModifiedEvent',
		value: function isModifiedEvent(event) {
			return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
		}
	}, {
		key: 'onClick',
		value: function onClick(href, e) {
			var _props = this.props,
			    to = _props.to,
			    target = _props.target,
			    onClick = _props.onClick;

			onClick && onClick(e);

			if (_route2.default.routeConfig.type !== _util2.default.ROUTER_TYPE_KEY_HISTORY) {
				return;
			}
			if (this.isModifiedEvent(e) || !this.isLeftClickEvent(e)) {
				return;
			}

			if (target || e.defaultPrevented) {
				return;
			}
			var state = {};
			var title = '';
			if (_util2.default.isJSON(to)) {
				state = to.state || {};
				title = to.title || '';
			}
			window.history.pushState(state, title, href);
			e.preventDefault();
			_route2.default.format();
			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    activeClassName = _props2.activeClassName,
			    to = _props2.to,
			    children = _props2.children,
			    props = _objectWithoutProperties(_props2, ['className', 'activeClassName', 'to', 'children']);

			var isActive = this.routeInfo.routePath === _route2.default.current.routePath;

			if (!isActive && _route2.default.routeConfig.relation && _route2.default.routeConfig.relation[_route2.default.current.path]) {
				isActive = _route2.default.routeConfig.relation[_route2.default.current.path].parents.indexOf(this.routeInfo.path) >= 0;
			}

			var klass = isActive ? activeClassName : '';
			if (className) {
				klass = klass + ' ' + className;
			}

			var href = '';
			if (_util2.default.isJSON(to)) {
				href = _route2.default.href(to.path, to.query);
			} else {
				href = _route2.default.href(to);
			}
			return _react2.default.createElement(
				'a',
				_extends({ className: klass, href: href, onClick: this.onClick.bind(this, href) }, props),
				children
			);
		}
	}]);

	return Link;
}(_react.Component);

exports.default = Link;