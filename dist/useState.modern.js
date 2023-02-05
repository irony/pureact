let e = [],
  t = -1
function s(o) {
  const n = t++
  return [
    e[n] || o,
    (t) => {
      ;(e[n] = 'function' == typeof t ? t() : t),
        s.dispatch &&
          Promise.resolve(e[n]).then(() => s.flush() && s.dispatch())
    },
  ]
}
;(s.__reset = () => {
  ;(e = []), (t = []), s.flush()
}),
  (s.flush = () => (t = -1)),
  (module.exports = s)
//# sourceMappingURL=useState.modern.js.map
