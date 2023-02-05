!function(n){"function"==typeof define&&define.amd?define(n):n()}(function(){var n=[],t=-1;function e(e){var f=t++,i=n[f]=n[f]||e;return{state:i.getState(),dispatch:i.dispatch.bind(i)}}e.__reset=function(){n=[],t=[],e.flush()},e.flush=function(){return t=-1},module.exports=e});
//# sourceMappingURL=useContext.umd.js.map
