(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dom = {
  render: function render(tree, node, document) {
    console.log('render', tree);
    if (tree.tagName) {
      // new node
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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createStore = createStore;

function createStore(reducers, app, state) {
  state = state || {};
  var listeners = [];
  var store = {
    getState: function getState(action) {
      return Object.assign({}, state, Object.keys(reducers).reduce(function (state, key) {
        return Object.assign({}, state, reducers[key](action, state));
      }, {}));
    },
    dispatch: function dispatch(action) {
      state = store.getState(action);
      console.log('dispatch', action, state, reducers);
      listeners.forEach(function (l) {
        return l(action, state);
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

function updateName(id, name) {
  return {
    type: 'UPDATE_NAME',
    id: id,
    name: name
  };
}

},{}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLjsx = require('../../lib/ljsx');

var _libLjsx2 = _interopRequireDefault(_libLjsx);

var _actionsUser = require('../actions/user');

exports['default'] = function (props) {
  return (0, _libLjsx2['default'])('input', { type: 'text', value: props.name });
};

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

_store2['default'].subscribe(function (action, state) {
  console.log('subcribe', action);
  _libLdom2['default'].render(main(state), document.getElementById('root'));
});

// start the app
_store2['default'].dispatch({
  type: 'START',
  user: {
    name: 'Christian Landgren'
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4xLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvbGliL2xkb20uanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9saWIvbGpzeC5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL2xpYi9sc3RvcmUuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvYWN0aW9ucy91c2VyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvZm9vdGVyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL2NvbXBvbmVudHMvbWFpbi5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9jb21wb25lbnRzL3VzZXIuanMiLCIvVXNlcnMvY2xuL3NyYy9kaXJqcy9zcmMvbWFpbi5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIi9Vc2Vycy9jbG4vc3JjL2RpcmpzL3NyYy9yZWR1Y2Vycy91c2VyLmpzIiwiL1VzZXJzL2Nsbi9zcmMvZGlyanMvc3JjL3N0b3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxJQUFNLEdBQUcsR0FBRztBQUNWLFFBQU0sRUFBQyxnQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUM1QixXQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMzQixRQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7O0FBRWhCLFVBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2pCLGdCQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7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RSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFBQSxBQUMxRTtBQUFTLGFBQU8sS0FBSyxDQUFBO0FBQUEsR0FDdEI7Q0FDRixDQUFBOztxQkFFYyxJQUFJOzs7Ozs7Ozs7Ozs7eUJDUFMsa0JBQWtCOzt3QkFDOUIsYUFBYTs7OztBQUU3QixJQUFJLEtBQUssR0FBRyxrREFBZ0IsQ0FBQTtxQkFDYixLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IGRvbSA9IHtcbiAgcmVuZGVyICh0cmVlLCBub2RlLCBkb2N1bWVudCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXInLCB0cmVlKVxuICAgIGlmICh0cmVlLnRhZ05hbWUpIHtcbiAgICAgIC8vIG5ldyBub2RlXG4gICAgICBpZiAoIXRyZWUuZWxlbWVudCkge1xuICAgICAgICBkb2N1bWVudCA9IGRvY3VtZW50IHx8IG5vZGUub3duZXJEb2N1bWVudFxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHJlZS50YWdOYW1lKVxuICAgICAgICB0cmVlLmNoaWxkcmVuICYmIHRyZWUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGRvbS5yZW5kZXIoY2hpbGQsIGVsZW1lbnQsIGRvY3VtZW50KSlcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgICB0cmVlLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgICB9XG4gICAgICAvLyBleGlzdGluZyBub2RlLCBhcHBseSBhbGwgcHJvcGVydGllcyBleGNlcHQgcmVhZCBvbmx5IG9uZXNcbiAgICAgIE9iamVjdC5hc3NpZ24odHJlZS5lbGVtZW50LCBvbWl0KHRyZWUsIFsnZWxlbWVudCcsICdjaGlsZHJlbicsICd0YWdOYW1lJ10pKVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLmlubmVySFRNTCA9IHRyZWVcbiAgICB9XG4gIH1cbn1cblxudmFyIHBpY2sgPSAobywgZmllbGRzKSA9PiBPYmplY3QuYXNzaWduKHt9LCBmaWVsZHMucmVkdWNlKChhLCBiKSA9PiBPYmplY3QuYXNzaWduKGEsIHtbYl06IG9bYl19KSwge30pKVxuXG52YXIgb21pdCA9IChvLCBmaWVsZHMpID0+IE9iamVjdC5hc3NpZ24oe30sIE9iamVjdC5rZXlzKG8pLnJlZHVjZSgoYSwgYikgPT4gIWZpZWxkcy5pbmNsdWRlcyhiKSAmJiBPYmplY3QuYXNzaWduKGEsIHtbYl06IG9bYl19KSB8fCBhLCB7fSkpXG5cbmV4cG9ydCBkZWZhdWx0IGRvbVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGpzeCAodGFnTmFtZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRhZ05hbWUocHJvcHMpXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt0YWdOYW1lfSwgcHJvcHMsIHsgY2hpbGRyZW4gfSlcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdG9yZSAocmVkdWNlcnMsIGFwcCwgc3RhdGUpIHtcbiAgc3RhdGUgPSBzdGF0ZSB8fCB7fVxuICB2YXIgbGlzdGVuZXJzID0gW11cbiAgY29uc3Qgc3RvcmUgPSB7XG4gICAgZ2V0U3RhdGU6IChhY3Rpb24pID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBPYmplY3Qua2V5cyhyZWR1Y2VycykucmVkdWNlKChzdGF0ZSwga2V5KSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgcmVkdWNlcnNba2V5XShhY3Rpb24sIHN0YXRlKSksIHt9KSksXG4gICAgZGlzcGF0Y2g6IChhY3Rpb24pID0+IHtcbiAgICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoYWN0aW9uKVxuICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoJywgYWN0aW9uLCBzdGF0ZSwgcmVkdWNlcnMpXG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoYWN0aW9uLCBzdGF0ZSkpXG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IChjYWxsYmFjaykgPT4gbGlzdGVuZXJzLnB1c2goY2FsbGJhY2spXG4gIH1cbiAgcmV0dXJuIHN0b3JlXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gdXBkYXRlTmFtZSAoaWQsIG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnVVBEQVRFX05BTUUnLFxuICAgIGlkLFxuICAgIG5hbWVcbiAgfVxufVxuIiwiLyoqIEBqc3ggbGpzeCAqL1xuaW1wb3J0IGxqc3ggZnJvbSAnLi4vLi4vbGliL2xqc3gnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gPG5hdj48ZGl2IGNsYXNzTmFtZT0nZm9vdGVyJz5Gb290ZXI8L2Rpdj48L25hdj5cbn1cbiIsIi8qKiBAanN4IGxqc3ggKi9cbmltcG9ydCBsanN4IGZyb20gJy4uLy4uL2xpYi9sanN4J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgY29uc29sZS5sb2coJ3Byb3BzJywgcHJvcHMpXG4gIHJldHVybiAoXG4gICAgPG5hdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dvJz5Mb2dvPC9kaXY+XG4gICAgICA8cD5Vc2VyOiB7cHJvcHMudXNlci5uYW1lfTwvcD5cbiAgICA8L25hdj5cbiAgKVxufVxuIiwiLyoqIEBqc3ggbGpzeCAqL1xuaW1wb3J0IGxqc3ggZnJvbSAnLi4vLi4vbGliL2xqc3gnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXInPlxuICAgICAgPFVzZXIgey4uLnByb3BzLnVzZXJ9IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsIi8qKiBAanN4IGxqc3ggKi9cbmltcG9ydCBsanN4IGZyb20gJy4uLy4uL2xpYi9sanN4J1xuaW1wb3J0IHsgdXBkYXRlTmFtZSB9IGZyb20gJy4uL2FjdGlvbnMvdXNlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIHJldHVybiAoPGlucHV0IHR5cGU9J3RleHQnIHZhbHVlPXtwcm9wcy5uYW1lfS8+KVxufVxuXG4iLCIvKiogQGpzeCBsanN4ICovXG5pbXBvcnQgbGpzeCBmcm9tICcuLi9saWIvbGpzeCdcbmltcG9ydCBsZG9tIGZyb20gJy4uL2xpYi9sZG9tJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlcidcbmltcG9ydCBNYWluIGZyb20gJy4vY29tcG9uZW50cy9tYWluJ1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyJ1xuXG52YXIgbWFpbiA9IGZ1bmN0aW9uIChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZGVyIHsuLi5wcm9wc30vPlxuICAgICAgPE1haW4gey4uLnByb3BzfS8+XG4gICAgICA8Rm9vdGVyLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5zdG9yZS5zdWJzY3JpYmUoKGFjdGlvbiwgc3RhdGUpID0+IHtcbiAgY29uc29sZS5sb2coJ3N1YmNyaWJlJywgYWN0aW9uKVxuICBsZG9tLnJlbmRlcihtYWluKHN0YXRlKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSlcbn0pXG5cbi8vIHN0YXJ0IHRoZSBhcHBcbnN0b3JlLmRpc3BhdGNoKHtcbiAgdHlwZTogJ1NUQVJUJyxcbiAgdXNlcjoge1xuICAgIG5hbWU6ICdDaHJpc3RpYW4gTGFuZGdyZW4nXG4gIH1cbn0pXG4iLCJpbXBvcnQgdXNlciBmcm9tICcuL3VzZXInXG5leHBvcnQgZGVmYXVsdCB7IHVzZXIgfVxuIiwiY29uc3QgdXNlciA9IChzdGF0ZSA9IHsgbmFtZTogJ2ZvbycsIGlkOiAxIH0sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnVVBEQVRFX05BTUUnOiByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbmFtZTogYWN0aW9uLm5hbWUgfSlcbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VyXG4iLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4uLy4uL2xpYi9sc3RvcmUnXG5pbXBvcnQgYXBwIGZyb20gJy4uL3JlZHVjZXJzJ1xuXG52YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShhcHApXG5leHBvcnQgZGVmYXVsdCBzdG9yZVxuIl19
