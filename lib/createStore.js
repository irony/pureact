"use strict";

module.exports = function createStore(reducer, initialState) {
  var state = initialState || {};
  var listeners = [];
  var store = {
    getState: function getState(action) {
      return Object.assign({}, state, reducer(state, action || {}));
    },
    dispatch: function dispatch(action) {
      state = store.getState(action);
      listeners.forEach(function (listener, i) {
        return listener(function () {
          delete listeners[i];
        });
      });
    },
    subscribe: function subscribe(callback) {
      return listeners.push(callback);
    }
  };
  return store;
};