'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ldom = require('./lib/ldom');

var _ldom2 = _interopRequireDefault(_ldom);

var _ljsx = require('./lib/ljsx');

var _ljsx2 = _interopRequireDefault(_ljsx);

var _lstore = require('./lib/lstore');

var _lstore2 = _interopRequireDefault(_lstore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { render: _ldom2.default.render, ljsx: _ljsx2.default, createStore: _lstore2.default };