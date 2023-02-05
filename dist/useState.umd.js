!function(n){"function"==typeof define&&define.amd?define(n):n()}(function(){var n=[],e=-1;function t(f){var u=e++;return[n[u]||f,function(e){n[u]="function"==typeof e?e():e,t.dispatch&&Promise.resolve(n[u]).then(function(){return t.flush()&&t.dispatch()})}]}t.__reset=function(){n=[],e=[],t.flush()},t.flush=function(){return e=-1},module.exports=t});
//# sourceMappingURL=useState.umd.js.map
