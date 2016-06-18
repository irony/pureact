var tags = ['div', 'p', 'img']
module.exports = tags.reduce((result, tagName) =>
 Object.assign(result, {[tagName]: (options, ...children) =>
  Object.assign({tagName}, options, { children })}), {})

