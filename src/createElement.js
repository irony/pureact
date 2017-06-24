module.exports = function createElement (tagName, props, children) {
  if (typeof tagName === 'function') {
    const Component = tagName
    const component = (new Component(props))
    return component.render ? component.render() : component
  }
  children = Array.prototype.slice.call(arguments, 2)
  return Object.assign({tagName}, props, { children })
}

// module.exports = require('snabbdom/h').default