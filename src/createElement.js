module.exports = function createElement (tagName, props, ...children) {
  if (typeof tagName === 'function') {
    const Component = tagName
    if (Component.prototype) {
      const component = (new Component(Object.assign({}, props, {children})))
      return component.render ? component.render() : component
    } else {
      return Component(props)
    }
  }
  return Object.assign({tagName}, props, { children })
}