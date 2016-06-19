(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var i = 0;
var dom = {
  render: function render(tree, node, document) {
    if (!tree.tagName) return Object.assign(node, { innerHTML: tree });

    // new node
    console.log(i++, tree);
    if (!tree.element) {
      document = document || node.ownerDocument;
      var element = document.createElement(tree.tagName);
      tree.children && tree.children.map(function (child) {
        return dom.render(child, element, document);
      });
      node.appendChild(element);
      tree.element = element;
    }

    // existing node, apply all properties except read only ones
    Object.assign(tree.element, omit(tree, ['element', 'children', 'tagName']));
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

function createStore(reducer, initialState) {
  var state = initialState || {};
  var listeners = [];
  var store = {
    getState: function getState(action) {
      return Object.assign({}, state, reducer(state, action || {}));
    },
    dispatch: function dispatch(action) {
      state = store.getState(action);
      listeners.forEach(function (listener, i) {
        return listener(function (unsubscribe) {
          delete listeners[i];
        });
      });
    },
    subscribe: function subscribe(callback) {
      return listeners.push(callback);
    }
  };
  return store;
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.updateName = updateName;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function updateName(id, name) {
  return _store2['default'].dispatch({
    type: 'UPDATE_NAME',
    id: id,
    name: name
  });
}

},{"../store":12}],5:[function(require,module,exports){
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
  console.log('props', props);
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

},{"../../lib/ljsx":2}],7:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

exports['default'] = function (props) {
  return (0, _libLjsx2['default'])(
    'div',
    { className: 'container' },
    (0, _libLjsx2['default'])(_user2['default'], props.user)
  );
};

module.exports = exports['default'];

},{"../../lib/ljsx":2,"./user":8}],8:[function(require,module,exports){
/** @jsx ljsx */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

var _actionsUser = require('../actions/user');

exports['default'] = function (props) {
  return name(_extends({}, props, {
    onkeyup: function onkeyup(e) {
      return (0, _actionsUser.updateName)(props.id, e.target.value);
    }
  }));
};

function name(props) {
  console.log('name', props);
  return (0, _libLjsx2['default'])(
    'label',
    null,
    'Namn:',
    (0, _libLjsx2['default'])('input', { type: 'text', onkeyup: props.onkeyup, value: props.name })
  );
}
module.exports = exports['default'];

},{"../../lib/ljsx":2,"../actions/user":4}],9:[function(require,module,exports){
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
    (0, _libLjsx2['default'])(_componentsHeader2['default'], props),
    (0, _libLjsx2['default'])(_componentsMain2['default'], props),
    (0, _libLjsx2['default'])(_componentsFooter2['default'], null)
  );
};

_store2['default'].subscribe(function () {
  var state = _store2['default'].getState();
  _libLdom2['default'].render(main(state), document.getElementById('root'));
});

// start the app
_store2['default'].dispatch({
  type: 'START'
});

},{"../lib/ldom":1,"../lib/ljsx":2,"./components/footer":5,"./components/header":6,"./components/main":7,"./store":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

exports['default'] = { user: _user2['default'] };

var app = function app(state, action) {
  return {
    user: (0, _user2['default'])(state.user, action)
  };
};

exports['default'] = app;
module.exports = exports['default'];

},{"./user":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLstore = require('../../lib/lstore');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var store = (0, _libLstore.createStore)(_reducers2['default']);
exports['default'] = store;
module.exports = exports['default'];

},{"../../lib/lstore":3,"../reducers":10}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4xLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvbGliL2xkb20uanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9saWIvbGpzeC5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL2xpYi9sc3RvcmUuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvYWN0aW9ucy91c2VyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvZm9vdGVyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvbWFpbi5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9jb21wb25lbnRzL3VzZXIuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvbWFpbi5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9yZWR1Y2Vycy91c2VyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL3N0b3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDVCxJQUFNLEdBQUcsR0FBRztBQUNWLFFBQU0sRUFBQyxnQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM1QixRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7OztBQUdoRSxXQUFPLENBQUMsR0FBRyxDQUFDLENB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QUFJLEVBQUUsTUFBTSxDQUFDO0dBQy9CO0NBQUMsQ0FBQTs7cUJBRWEsR0FBRzs7Ozs7Ozs7O0FDUGxCLElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxDQUFJLEtBQUssRUFBMkIsTUFBTSxFQUFLO01BQTNDLEtBQUssZ0JBQUwsS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFOztBQUMxQyxVQUFRLE1BQU0sQ0FBQyxJQUFJO0FBQ2pCLFNBQUssYUFBYTtBQUFFLGFBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQUEsQUFDMUU7QUFBUyxhQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ3RCO0NBQ0YsQ0FBQTs7cUJBRWMsSUFBSTs7Ozs7Ozs7Ozs7O3lCQ1BTLGtCQUFrQjs7d0JBQzlCLGFBQWE7Ozs7QUFFN0IsSUFBSSxLQUFLLEdBQUcsa0RBQWdCLENBQUE7cUJBQ2IsS0FBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaSA9IDBcbmNvbnN0IGRvbSA9IHtcbiAgcmVuZGVyICh0cmVlLCBub2RlLCBkb2N1bWVudCkge1xuICAgIGlmICghdHJlZS50YWdOYW1lKSByZXR1cm4gT2JqZWN0LmFzc2lnbihub2RlLCB7aW5uZXJIVE1MOiB0cmVlfSlcblxuICAgIC8vIG5ldyBub2RlXG4gICAgY29uc29sZS5sb2coaSsrLCB0cmVlKVxuICAgIGlmICghdHJlZS5lbGVtZW50KSB7XG4gICAgICBkb2N1bWVudCA9IGRvY3VtZW50IHx8IG5vZGUub3duZXJEb2N1bWVudFxuICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRyZWUudGFnTmFtZSlcbiAgICAgIHRyZWUuY2hpbGRyZW4gJiYgdHJlZS5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gZG9tLnJlbmRlcihjaGlsZCwgZWxlbWVudCwgZG9jdW1lbnQpKVxuICAgICAgbm9kZS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgdHJlZS5lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cblxuICAgIC8vIGV4aXN0aW5nIG5vZGUsIGFwcGx5IGFsbCBwcm9wZXJ0aWVzIGV4Y2VwdCByZWFkIG9ubHkgb25lc1xuICAgIE9iamVjdC5hc3NpZ24odHJlZS5lbGVtZW50LCBvbWl0KHRyZWUsIFsnZWxlbWVudCcsICdjaGlsZHJlbicsICd0YWdOYW1lJ10pKVxuICB9XG59XG5cbnZhciBwaWNrID0gKG8sIGZpZWxkcykgPT4gT2JqZWN0LmFzc2lnbih7fSwgZmllbGRzLnJlZHVjZSgoYSwgYikgPT4gT2JqZWN0LmFzc2lnbihhLCB7W2JdOiBvW2JdfSksIHt9KSlcblxudmFyIG9taXQgPSAobywgZmllbGRzKSA9PiBPYmplY3QuYXNzaWduKHt9LCBPYmplY3Qua2V5cyhvKS5yZWR1Y2UoKGEsIGIpID0+ICFmaWVsZHMuaW5jbHVkZXMoYikgJiYgT2JqZWN0LmFzc2lnbihhLCB7W2JdOiBvW2JdfSkgfHwgYSwge30pKVxuXG5leHBvcnQgZGVmYXVsdCBkb21cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxqc3ggKHRhZ05hbWUsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICBpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdmdW5jdGlvbicpIHJldHVybiB0YWdOYW1lKHByb3BzKVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7dGFnTmFtZX0sIHByb3BzLCB7IGNoaWxkcmVuIH0pXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RvcmUgKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICB2YXIgc3RhdGUgPSBpbml0aWFsU3RhdGUgfHwge31cbiAgdmFyIGxpc3RlbmVycyA9IFtdXG4gIGNvbnN0IHN0b3JlID0ge1xuICAgIGdldFN0YXRlOiAoYWN0aW9uKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgcmVkdWNlcihzdGF0ZSwgYWN0aW9uIHx8IHt9KSksXG4gICAgZGlzcGF0Y2g6IChhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoYWN0aW9uKVxuICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyLCBpKSA9PiBsaXN0ZW5lcih1bnN1YnNjcmliZSA9PiB7IGRlbGV0ZSBsaXN0ZW5lcnNbaV0gfSkpXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IChjYWxsYmFjaykgPT4gbGlzdGVuZXJzLnB1c2goY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIHN0b3JlXG59XG4iLCJpbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVOYW1lIChpZCwgbmFtZSkge1xuICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goe1xuICAgIHR5cGU6ICdVUERBVEVfTkFNRScsXG4gICAgaWQsXG4gICAgbmFtZVxuICB9KVxufVxuIiwiLyoqIEBqc3ggbGpzeCAqL1xuaW1wb3J0IGxqc3ggZnJvbSAnLi4vLi4vbGliL2xqc3gnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gPG5hdj48ZGl2IGNsYXNzTmFtZT0nZm9vdGVyJz5Gb290ZXI8L2Rpdj48L25hdj5cbn1cbiIsIi8qKiBAanN4IGxqc3ggKi9cbmltcG9ydCBsanN4IGZyb20gJy4uLy4uL2xpYi9sanN4J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgY29uc29sZS5sb2coJ3Byb3BzJywgcHJvcHMpXG4gIHJldHVybiAoXG4gICAgPG5hdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dvJz5Mb2dvPC9kaXY+XG4gICAgICA8cD5Vc2VyOiB7cHJvcHMudXNlci5uYW1lfTwvcD5cbiAgICA8L25hdj5cbiAgKVxufVxuIiwiLyoqIEBqc3ggbGpzeCAqL1xuaW1wb3J0IGxqc3ggZnJvbSAnLi4vLi4vbGliL2xqc3gnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXInPlxuICAgICAgPFVzZXIgey4uLnByb3BzLnVzZXIgfSAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iLCIvKiogQGpzeCBsanN4ICovXG5pbXBvcnQgbGpzeCBmcm9tICcuLi8uLi9saWIvbGpzeCdcbmltcG9ydCB7IHVwZGF0ZU5hbWUgfSBmcm9tICcuLi9hY3Rpb25zL3VzZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIG5hbWUoey4uLnByb3BzLCBcbiAgICAgIG9ua2V5dXA6IChlKSA9PiB1cGRhdGVOYW1lKHByb3BzLmlkLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuICApXG59XG5cbmZ1bmN0aW9uIG5hbWUgKHByb3BzKXtcbiAgY29uc29sZS5sb2coJ25hbWUnLCBwcm9wcylcbiAgcmV0dXJuIChcbiAgICA8bGFiZWw+XG4gICAgICBOYW1uOlxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG9ua2V5dXA9e3Byb3BzLm9ua2V5dXB9IHZhbHVlPXtwcm9wcy5uYW1lfS8+XG4gICAgPC9sYWJlbD5cbiAgKVxufSIsIi8qKiBAanN4IGxqc3ggKi9cbmltcG9ydCBsanN4IGZyb20gJy4uL2xpYi9sanN4J1xuaW1wb3J0IGxkb20gZnJvbSAnLi4vbGliL2xkb20nXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyJ1xuaW1wb3J0IE1haW4gZnJvbSAnLi9jb21wb25lbnRzL21haW4nXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9mb290ZXInXG5cbnZhciBtYWluID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxIZWFkZXIgey4uLnByb3BzfS8+XG4gICAgICA8TWFpbiB7Li4ucHJvcHN9Lz5cbiAgICAgIDxGb290ZXIvPlxuICAgIDwvZGl2PlxuICApXG59XG5cbnN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gIHZhciBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKClcbiAgbGRvbS5yZW5kZXIobWFpbihzdGF0ZSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpXG59KVxuXG4vLyBzdGFydCB0aGUgYXBwXG5zdG9yZS5kaXNwYXRjaCh7XG4gIHR5cGU6ICdTVEFSVCdcbn0pXG4iLCJpbXBvcnQgdXNlciBmcm9tICcuL3VzZXInXG5leHBvcnQgZGVmYXVsdCB7IHVzZXIgfVxuXG5jb25zdCBhcHAgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgdXNlcjogdXNlcihzdGF0ZS51c2VyLCBhY3Rpb24pXG59KVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiIsImNvbnN0IHVzZXIgPSAoc3RhdGUgPSB7IG5hbWU6ICdmb28nLCBpZDogMSB9LCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ1VQREFURV9OQU1FJzogcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG5hbWU6IGFjdGlvbi5uYW1lIH0pXG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlclxuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuLi8uLi9saWIvbHN0b3JlJ1xuaW1wb3J0IGFwcCBmcm9tICcuLi9yZWR1Y2VycydcblxudmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoYXBwKVxuZXhwb3J0IGRlZmF1bHQgc3RvcmVcbiJdfQ==
