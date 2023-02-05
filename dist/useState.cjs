var n=[],t=-1;function u(e){var r=t++;return[n[r]||e,function(t){n[r]="function"==typeof t?t():t,u.dispatch&&Promise.resolve(n[r]).then(function(){return u.flush()&&u.dispatch()})}]}u.__reset=function(){n=[],t=[],u.flush()},u.flush=function(){return t=-1},module.exports=u;
//# sourceMappingURL=useState.cjs.map
