var t=require("./createStore"),e=[],r=-1;function n(n,u){var i=r++,a=e[i]=e[i]||u.dispatch?u:t(n,u);return[a.getState(),a.dispatch.bind(a)]}n.__reset=function(){e=[],r=[],n.flush()},n.flush=function(){return r=-1},module.exports=n;
//# sourceMappingURL=useReducer.cjs.map
