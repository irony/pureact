const e = require('./useState')
module.exports = function (t, s) {
  let o = s || {},
    i = o
  const r = [],
    c = {
      getState: () => o,
      dispatch: (e) =>
        'function' == typeof e
          ? e(c.dispatch, c.getState)
          : Promise.resolve(e) === e
          ? Promise.resolve(e).then(c.dispatch)
          : ((i = Promise.resolve(i).then((s) => t(s, e || {}))),
            Promise.resolve(i).then(
              (e) => (
                (o = e),
                r.forEach((e, t) =>
                  e(() => {
                    delete r[t]
                  })
                ),
                (o = e)
              )
            )),
      subscribe: (e) => r.push(e),
    }
  return s && setTimeout(c.dispatch), (e.dispatch = c.dispatch), c
}
//# sourceMappingURL=createStore.modern.js.map
