const e = require('./render'),
  r = require('./createElement'),
  t = require('./createStore'),
  u = require('./useState'),
  s = require('./useReducer'),
  o = require('./useContext')
module.exports = {
  render: e,
  createElement: r,
  createStore: t,
  useState: u,
  useReducer: s,
  useContext: o,
  Component: function (e) {
    ;(this.props = e),
      (this.setState = () => {
        throw new Error('Unsupported. Use hooks/useState instead')
      })
  },
}
//# sourceMappingURL=index.modern.js.map
