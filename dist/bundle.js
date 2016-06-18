(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dom = {
  render: function render(tree, node, document) {
    if (tree.tagName) {
      document = document || node.ownerDocument;
      var element = document.createElement(tree.tagName);
      tree.children && tree.children.map(function (child) {
        return dom.render(child, element);
      });
      Object.assign(element, omit(tree, ['children', 'tagName']));
      node.appendChild(element);
    } else {
      return node.innerText = tree;
    }
  }
};

var pick = function pick(o, fields) {
  return Object.assign({}, fields.reduce(function (a, b) {
    return Object.assign(a, _defineProperty({}, b, o[b]));
  }, {}));
};

var omit = function omit(o, fields) {
  return Object.assign({}, Object.keys(o).reduce(function (a, b) {
    return !fields.includes(b) && Object.assign(a, _defineProperty({}, b, o[b])) || a;
  }, {}));
};

exports['default'] = dom;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ljsx;

function ljsx(tagName, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (typeof tagName === 'function') return tagName(props);
  return Object.assign({ tagName: tagName }, props, { children: children });
}

module.exports = exports['default'];

},{}],3:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

exports['default'] = function (props) {
  return (0, _libLjsx2['default'])(
    'nav',
    null,
    (0, _libLjsx2['default'])(
      'div',
      { className: 'footer' },
      'Footer'
    )
  );
};

module.exports = exports['default'];

},{"../../lib/ljsx":2}],4:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

exports['default'] = function (props) {
  return (0, _libLjsx2['default'])(
    'nav',
    null,
    (0, _libLjsx2['default'])(
      'div',
      { className: 'logo' },
      'Logo'
    ),
    (0, _libLjsx2['default'])(
      'p',
      null,
      'User: ',
      props.user.name
    )
  );
};

module.exports = exports['default'];

},{"../../lib/ljsx":2}],5:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

exports['default'] = function (props) {
  return (0, _libLjsx2['default'])('div', { className: 'container' });
};

module.exports = exports['default'];

},{"../../lib/ljsx":2}],6:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

var _libLdom = require('../lib/ldom');

var _libLdom2 = _interopRequireDefault(_libLdom);

var _componentsHeader = require('./components/header');

var _componentsHeader2 = _interopRequireDefault(_componentsHeader);

var _componentsMain = require('./components/main');

var _componentsMain2 = _interopRequireDefault(_componentsMain);

var _componentsFooter = require('./components/footer');

var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

var user = { name: 'foo' };

var main = function main() {
  return (0, _libLjsx2['default'])(
    'div',
    null,
    (0, _libLjsx2['default'])(_componentsHeader2['default'], { user: user }),
    (0, _libLjsx2['default'])(_componentsMain2['default'], null),
    (0, _libLjsx2['default'])(_componentsFooter2['default'], null)
  );
};

_libLdom2['default'].render(main(), document.getElementById('root'), document);

},{"../lib/ldom":1,"../lib/ljsx":2,"./components/footer":3,"./components/header":4,"./components/main":5}]},{},[6]);
