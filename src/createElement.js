module.exports = function createElement (tagName, props, ...children) {
  if (typeof tagName === 'function') {
    const Component = tagName
    if (Component.prototype) {
      const component = new Component({...props, children})
      return component.render ? component.render() : component
    } else {
      return Component(props)
    }
  }
  return {tagName, ...props, children }
}