module.exports = function ljsx (tagName, props, children) {
  if (typeof tagName === 'function') return tagName.render ? tagName.render(props) : tagName(props)
  children = Array.prototype.slice.call(arguments, 2)
  return Object.assign({tagName}, props, { children })
}
