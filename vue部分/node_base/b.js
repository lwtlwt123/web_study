// b.js引入a.js
// require返回值是1引入路径的对象
const a= require('./a.js')

// {}
a.addFn(10,20)
a.subFn(30,5)
console.log(a.result);
console.log(a);