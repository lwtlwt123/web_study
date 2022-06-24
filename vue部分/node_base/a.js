// 一个属性
const result = '这里显示运算结果'
// 四个函数
const addFn = function(num1,num2){
    console.log(`两数相加的结果=${num1+num2}`);
}
const subFn = function(num1,num2){
    console.log(`两数相减的结果=${num1-num2}`);
}
const chenFn = function(num1,num2){
    console.log(`两数相乘的结果=${num1*num2}`);
}
const chuFn = function(num1,num2){
    console.log(`两数相除的结果=${num1/num2}`);
}
// 自由控制模块内部的属性或方法被公开
/* exports.addFn = addFn
exports.subFn = subFn
exports.chenFn = chenFn
exports.chuFn = chuFn */
// 如果你导出的是一个对象形式的结果。那么之前分属性到处的成员会被替代
module.exports = {
    addFn,
    subFn,
    chenFn,
    chuFn,
    result
}
