(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dom = {
  render: function render(tree, node, document) {
    if (tree.tagName) {
      // new node
      if (!tree.element) {
        document = document || node.ownerDocument;
        var element = document.createElement(tree.tagName);
        tree.children && tree.children.map(function (child) {
          return dom.render(child, element);
        });
        node.appendChild(element);
        tree.element = element;
      }
      // existing node, apply all properties except read only ones
      Object.assign(tree.element, omit(tree, ['element', 'children', 'tagName']));
    } else {
      node.innerHTML = tree;
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;

function createStore(reducers, app, state) {
  state = state || {};
  var store = {
    getState: function getState(action) {
      return Object.assign({}, state, Object.keys(reducers).reduce(function (state, key) {
        return Object.assign({}, reducers[key](action, state));
      }, {}));
    },
    dispatch: function dispatch(action) {
      return state = store.getState(action);
    },
    subscribe: function subscribe(callback) {
      return reducers[Symbol(callback)] = callback;
    }
  };
  return store;
}

},{}],4:[function(require,module,exports){
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

},{"../../lib/ljsx":2}],6:[function(require,module,exports){
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

},{"../../lib/ljsx":2}],7:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

var _libLdom = require('../lib/ldom');

var _libLdom2 = _interopRequireDefault(_libLdom);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _componentsHeader = require('./components/header');

var _componentsHeader2 = _interopRequireDefault(_componentsHeader);

var _componentsMain = require('./components/main');

var _componentsMain2 = _interopRequireDefault(_componentsMain);

var _componentsFooter = require('./components/footer');

var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

var main = function main(props) {
  return (0, _libLjsx2['default'])(
    'div',
    null,
    (0, _libLjsx2['default'])(_componentsHeader2['default'], null),
    (0, _libLjsx2['default'])(_componentsMain2['default'], props),
    (0, _libLjsx2['default'])(_componentsFooter2['default'], null)
  );
};

_store2['default'].subscribe(function (action, state) {
  console.log('action', action);
  _libLdom2['default'].render(main, document.getElementById('root'), state);
});

// start the app
_store2['default'].dispatch({
  type: 'START',
  user: {
    name: 'Christian Landgren'
  }
});

},{"../lib/ldom":1,"../lib/ljsx":2,"./components/footer":4,"./components/header":5,"./components/main":6,"./store":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

exports['default'] = { user: _user2['default'] };
module.exports = exports['default'];

},{"./user":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var user = function user(state, action) {
  if (state === undefined) state = { name: 'foo', id: 1 };

  switch (action.type) {
    case 'UPDATE_NAME':
      return Object.assign({}, state, { name: action.name });
    default:
      return state;
  }
};

exports['default'] = user;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLstore = require('../../lib/lstore');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

exports['default'] = (0, _libLstore.createStore)(_reducers2['default']);
module.exports = exports['default'];

},{"../../lib/lstore":3,"../reducers":8}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4xLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvbGliL2xkb20uanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9saWIvbGpzeC5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL2xpYi9sc3RvcmUuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvY29tcG9uZW50cy9mb290ZXIuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvY29tcG9uZW50cy9tYWluLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL21haW4uanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvcmVkdWNlcnMvdXNlci5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9zdG9yZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEsSUFBTSxHQUFHLEdBQUc7QUFDVixRQUFNLEVBQUMsZ0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDNUIsUUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOztBQUVoQixVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNqQixnQkFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFBO0FBQ3pDLFlBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2xELFlBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLO2lCQUFJLEdB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RUFBSztNQUEzQyxLQUFLLGdCQUFMLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTs7QUFDMUMsVUFBUSxNQUFNLENBQUMsSUFBSTtBQUNqQixTQUFLLGFBQWE7QUFBRSxhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUFBLEFBQzFFO0FBQVMsYUFBTyxLQUFLLENBQUE7QUFBQSxHQUN0QjtDQUNGLENBQUE7O3FCQUVjLElBQUk7Ozs7Ozs7Ozs7Ozt5QkNQUyxrQkFBa0I7O3dCQUM5QixhQUFhOzs7O3FCQUVkLGtEQUFnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBkb20gPSB7XG4gIHJlbmRlciAodHJlZSwgbm9kZSwgZG9jdW1lbnQpIHtcbiAgICBpZiAodHJlZS50YWdOYW1lKSB7XG4gICAgICAvLyBuZXcgbm9kZVxuICAgICAgaWYgKCF0cmVlLmVsZW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSBkb2N1bWVudCB8fCBub2RlLm93bmVyRG9jdW1lbnRcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRyZWUudGFnTmFtZSlcbiAgICAgICAgdHJlZS5jaGlsZHJlbiAmJiB0cmVlLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBkb20ucmVuZGVyKGNoaWxkLCBlbGVtZW50KSlcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgICB0cmVlLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICB9XG4gICAgICAvLyBleGlzdGluZyBub2RlLCBhcHBseSBhbGwgcHJvcGVydGllcyBleGNlcHQgcmVhZCBvbmx5IG9uZXNcbiAgICAgIE9iamVjdC5hc3NpZ24odHJlZS5lbGVtZW50LCBvbWl0KHRyZWUsIFsnZWxlbWVudCcsICdjaGlsZHJlbicsICd0YWdOYW1lJ10pKVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLmlubmVySFRNTCA9IHRyZWVcbiAgICB9XG4gIH1cbn1cblxudmFyIHBpY2sgPSAobywgZmllbGRzKSA9PiBPYmplY3QuYXNzaWduKHt9LCBmaWVsZHMucmVkdWNlKChhLCBiKSA9PiBPYmplY3QuYXNzaWduKGEsIHtbYl06IG9bYl19KSwge30pKVxuXG52YXIgb21pdCA9IChvLCBmaWVsZHMpID0+IE9iamVjdC5hc3NpZ24oe30sIE9iamVjdC5rZXlzKG8pLnJlZHVjZSgoYSwgYikgPT4gIWZpZWxkcy5pbmNsdWRlcyhiKSAmJiBPYmplY3QuYXNzaWduKGEsIHtbYl06IG9bYl19KSB8fCBhLCB7fSkpXG5cbmV4cG9ydCBkZWZhdWx0IGRvbVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGpzeCAodGFnTmFtZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRhZ05hbWUocHJvcHMpXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt0YWdOYW1lfSwgcHJvcHMsIHsgY2hpbGRyZW4gfSlcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdG9yZSAocmVkdWNlcnMsIGFwcCwgc3RhdGUpIHtcbiAgc3RhdGUgPSBzdGF0ZSB8fCB7fVxuICBjb25zdCBzdG9yZSA9IHtcbiAgICBnZXRTdGF0ZTogKGFjdGlvbikgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5yZWR1Y2UoKHN0YXRlLCBrZXkpID0+IE9iamVjdC5hc3NpZ24oe30sIHJlZHVjZXJzW2tleV0oYWN0aW9uLCBzdGF0ZSkpLCB7fSkpLFxuICAgIGRpc3BhdGNoOiAoYWN0aW9uKSA9PiBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKGFjdGlvbiksXG4gICAgc3Vic2NyaWJlOiAoY2FsbGJhY2spID0+IHJlZHVjZXJzW1N5bWJvbChjYWxsYmFjayldID0gY2FsbGJhY2tcbiAgfVxuICByZXR1cm4gc3RvcmVcbn1cbiIsIi8qKiBAanN4IGxqc3ggKi9cbmltcG9ydCBsanN4IGZyb20gJy4uLy4uL2xpYi9sanN4J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgcmV0dXJuIDxuYXY+PGRpdiBjbGFzc05hbWU9J2Zvb3Rlcic+Rm9vdGVyPC9kaXY+PC9uYXY+XG59XG4iLCIvKiogQGpzeCBsanN4ICovXG5pbXBvcnQgbGpzeCBmcm9tICcuLi8uLi9saWIvbGpzeCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPG5hdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dvJz5Mb2dvPC9kaXY+XG4gICAgICA8cD5Vc2VyOiB7cHJvcHMudXNlci5uYW1lfTwvcD5cbiAgICA8L25hdj5cbiAgKVxufVxuIiwiLyoqIEBqc3ggbGpzeCAqL1xuaW1wb3J0IGxqc3ggZnJvbSAnLi4vLi4vbGliL2xqc3gnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lcic+PC9kaXY+XG59XG4iLCIvKiogQGpzeCBsanN4ICovXG5pbXBvcnQgbGpzeCBmcm9tICcuLi9saWIvbGpzeCdcbmltcG9ydCBsZG9tIGZyb20gJy4uL2xpYi9sZG9tJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcidcbmltcG9ydCBNYWluIGZyb20gJy4vY29tcG9uZW50cy9tYWluJ1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyJ1xuXG52YXIgbWFpbiA9IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZGVyLz5cbiAgICAgIDxNYWluIHsuLi5wcm9wc30vPlxuICAgICAgPEZvb3Rlci8+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuc3RvcmUuc3Vic2NyaWJlKChhY3Rpb24sIHN0YXRlKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdhY3Rpb24nLCBhY3Rpb24pXG4gIGxkb20ucmVuZGVyKG1haW4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JyksIHN0YXRlKVxufSlcblxuLy8gc3RhcnQgdGhlIGFwcFxuc3RvcmUuZGlzcGF0Y2goe1xuICB0eXBlOiAnU1RBUlQnLFxuICB1c2VyOiB7XG4gICAgbmFtZTogJ0NocmlzdGlhbiBMYW5kZ3JlbidcbiAgfVxufSlcbiIsImltcG9ydCB1c2VyIGZyb20gJy4vdXNlcidcbmV4cG9ydCBkZWZhdWx0IHsgdXNlciB9XG4iLCJjb25zdCB1c2VyID0gKHN0YXRlID0geyBuYW1lOiAnZm9vJywgaWQ6IDEgfSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdVUERBVEVfTkFNRSc6IHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBuYW1lOiBhY3Rpb24ubmFtZSB9KVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXJcbiIsImltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi4vLi4vbGliL2xzdG9yZSdcbmltcG9ydCBhcHAgZnJvbSAnLi4vcmVkdWNlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKGFwcClcbiJdfQ==
