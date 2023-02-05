const t=require("./createStore");let e=[],r=-1;function s(s,c){const n=r++,o=e[n]=e[n]||c.dispatch?c:t(s,c);return[o.getState(),o.dispatch.bind(o)]}s.__reset=()=>{e=[],r=[],s.flush()},s.flush=()=>r=-1,module.exports=s;
//# sourceMappingURL=useReducer.modern.mjs.map
