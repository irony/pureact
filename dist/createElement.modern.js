function r() {
  return (r =
    Object.assign ||
    function (r) {
      for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n]
        for (var e in t)
          Object.prototype.hasOwnProperty.call(t, e) && (r[e] = t[e])
      }
      return r
    }).apply(this, arguments)
}
module.exports = function (n, t, ...e) {
  if ('function' == typeof n) {
    const o = n
    if (o.prototype) {
      const n = new o(r({}, t, { children: e }))
      return n.render ? n.render() : n
    }
    return o(t)
  }
  return r({ tagName: n }, t, { children: e })
}
//# sourceMappingURL=createElement.modern.js.map
