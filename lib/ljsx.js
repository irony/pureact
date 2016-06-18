export default function ljsx (tagName, props, ...children) {
  if (typeof tagName === 'function') return tagName(props)
  return Object.assign({tagName}, props, { children })
}
