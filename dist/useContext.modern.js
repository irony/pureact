let t = [],
  e = -1
function s(s) {
  const n = e++,
    u = (t[n] = t[n] || s)
  return { state: u.getState(), dispatch: u.dispatch.bind(u) }
}
;(s.__reset = () => {
  ;(t = []), (e = []), s.flush()
}),
  (s.flush = () => (e = -1)),
  (module.exports = s)
//# sourceMappingURL=useContext.modern.js.map
