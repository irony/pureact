const snabbdom = require('snabbdom')
const patch = snabbdom.init([ 
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/eventlisteners').default
])
const h = require('snabbdom/h').default
const omit = (o, fields) => Object.keys(o).reduce((a, b) => !fields.includes(b) ? Object.assign(a, {[b]: o[b]}) : a, {})
const shadowRoot = (child) => h('span', {}, child.map(deflate)) // Should be replaced with reference to parent instead?
const deflate = (child) => child ? (Array.isArray(child) ? shadowRoot(child) : child.tagName ? vtree(child) : child) : ''
const ScriptAttributes = new Set([
  'onafterprint',
  'onbeforeprint',
  'onbeforeunload',
  'onerror',
  'onhashchange',
  'onload',
  'onoffline',
  'ononline',
  'onpagehide',
  'onpageshow',
  'onpopstate',
  'onresize',
  'onstorage',
  'onunload',
  'onblur',
  'onchange',
  'oncontextmenu',
  'onfocus',
  'oninput',
  'oninvalid',
  'onreset',
  'onsearch',
  'onselect',
  'onsubmit',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onwheel',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'onscroll',
  'oncopy',
  'oncut',
  'onpaste',
  'ondetail',
  'onabort',
  'oncanplay',
  'oncanplaythrough',
  'oncuechange',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onseeked',
  'onseeking',
  'onstalled',
  'onsuspend',
  'ontimeupdate',
  'onvolumechange',
  'onwaiting',
]);

function collectOns(obj) {
  let on = {};
  for(let key in obj) {
    let name = key.toLocaleLowerCase();
    if(ScriptAttributes.has(name)) {
      on[name.slice(2)] = obj[key];
      delete obj[key];
    }
  }
  return on;
}

function vtree (tree) {
  const props = omit(tree, ['element', 'children', 'style', 'tagName'])
  const on = collectOns(props);
  const children = tree.children && tree.children.map(deflate)
  return h(tree.tagName, {props, style: tree.style, attrs: props.attrs || (props.properties || {}).attributes, on}, children)
}

function render (tree, node, oldTree) {
  const newTree = vtree(tree)
  if (oldTree) { patch(oldTree, newTree) } else { patch(node, newTree) }
  return newTree
}
module.exports = render
