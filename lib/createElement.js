module.exports = function ljsx (tagName, props, children) {
  if (typeof tagName === 'function') return tagName(props)
  children = Array.prototype.slice.call(arguments, 2)
  return Object.assign({tagName}, props, { children })
}
