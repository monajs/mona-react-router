'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isJSON = exports.isJSON = function isJSON(data) {
	return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]';
};