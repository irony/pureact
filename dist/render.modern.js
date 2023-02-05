const e = require('snabbdom').init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/attributes').default,
    require('snabbdom/modules/eventlisteners').default,
  ]),
  t = require('snabbdom/h').default,
  s = (e) =>
    e
      ? Array.isArray(e)
        ? ((e) => t('span', {}, e.map(s)))(e)
        : e.tagName
        ? r(e)
        : e
      : ''
function r(e) {
  const r =
    ((a = e),
    (n = ['element', 'children', 'style', 'tagName']),
    Object.keys(a).reduce(
      (e, t) => (n.includes(t) ? e : Object.assign(e, { [t]: a[t] })),
      {}
    ))
  var a, n
  const u = e.children && e.children.map(s)
  return t(
    e.tagName,
    {
      props: r,
      style: e.style,
      attrs: r.attrs || (r.properties || {}).attributes,
    },
    u
  )
}
module.exports = function (t, s, a) {
  const n = r(t)
  return e(a || s, n), n
}
//# sourceMappingURL=render.modern.js.map
