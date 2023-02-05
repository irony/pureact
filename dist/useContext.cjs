var t=[],e=-1;function n(n){var r=e++,u=t[r]=t[r]||n;return{state:u.getState(),dispatch:u.dispatch.bind(u)}}n.__reset=function(){t=[],e=[],n.flush()},n.flush=function(){return e=-1},module.exports=n;
//# sourceMappingURL=useContext.cjs.map
