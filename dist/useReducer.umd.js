!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){var e=require("./createStore"),n=[],t=-1;function i(i,f){var r=t++,u=n[r]=n[r]||f.dispatch?f:e(i,f);return[u.getState(),u.dispatch.bind(u)]}i.__reset=function(){n=[],t=[],i.flush()},i.flush=function(){return t=-1},module.exports=i});
//# sourceMappingURL=useReducer.umd.js.map
