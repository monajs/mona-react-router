'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _util = require('./util');

var _constant = require('./constant');

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Component) {
  _inherits(Router, _Component);

  _createClass(Router, null, [{
    key: 'go',
    value: function go(path, data) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var state = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var isHistory = _route2.default.routeConfig.isHistory;

      if (isHistory) {
        window.history.pushState(state, title, _route2.default.href(path, data));
        _route2.default.format();
      } else {
        window.location.href = _route2.default.href(path, data);
      }
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(eventName, callback) {
      var eventsMap = {
        onChange: _constant.ROUTER_CHANGE_EVENT,
        onMiss: _constant.ROUTER_MISS_EVENT
      };
      if (!eventsMap[eventName]) {
        throw new Error('Dont support ' + eventName + ' evnet.');
      }
      _route2.default.on(eventsMap[eventName], function () {
        callback(_route2.default.current);
      });
    }
  }]);

  function Router() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));

    _this.verify(props.config);
    _route2.default.setConfig(props.config);
    return _this;
  }

  _createClass(Router, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _route2.default.on(_constant.ROUTER_CHANGE_EVENT, function () {
        _this2.setState({}, function () {
          // 渲染完成触发渲染路由事件
          _route2.default.changeFinish();
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _route2.default.off(_constant.ROUTER_CHANGE_EVENT);
      _route2.default.off(_constant.ROUTER_MISS_EVENT);
    }

    // verify config

  }, {
    key: 'verify',
    value: function verify(config) {
      if (!config || !(0, _util.isJSON)(config)) {
        throw TypeError('Please check the config data type.');
      }
      var type = config.type;

      if (type !== _constant.ROUTER_TYPE_KEY_HISTORY && type !== _constant.ROUTER_TYPE_KEY_HASH) {
        throw new Error('The type attribute only supports hash and history.');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!_route2.default.current) {
        return null;
      }
      var Layout = _route2.default.current.layout;
      var RouteView = _route2.default.current.component;
      if (!RouteView) {
        return null;
      }
      if (this.page !== RouteView) {
        this.ctrl = null;
        RouteView.Controller && (this.ctrl = new RouteView.Controller());
      }
      this.page = RouteView;
      Router.current.ctrl = _route2.default.current.ctrl = this.ctrl;

      if (!Layout) {
        return _react2.default.createElement(RouteView, null);
      }
      return _react2.default.createElement(
        Layout,
        null,
        _react2.default.createElement(RouteView, null)
      );
    }
  }]);

  return Router;
}(_react.Component);

Router.link = _link2.default;
Router.current = {};
Router.routeInfo = {};
Router.routeConfig = {};
exports.default = Router;