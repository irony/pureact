module.exports = function createElement (tagName, props, ...children) {
  if (typeof tagName === 'function' && tagName.prototype) {
    const Component = tagName
    const component = (new Component(Object.assign({}, props, {children})))
    return component.render ? component.render() : component
  }
  return Object.assign({tagName}, props, { children })
}

// module.exports = require('snabbdom/h').default