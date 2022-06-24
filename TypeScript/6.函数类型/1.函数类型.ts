/**
 * 在js中，有两种常见的定义函数的方式--函数声明（Function Declaration）和函数表达式(Function Expression)
 */
// 函数声明（Function Declaration）
/* function sum(x, y) {
    return x + y;
    报错
} */

// 函数表达式（Function Expression）
/* let mySum = function (x, y) {
    return x + y;
    报错
}; */

/* 
    一个函数有输入输出，要把输入输出全部考虑到，在ts中进行约束，函数声明类型的定义较简单
*/
function sum2(x: number, y: number): number {
    return x+y
}
sum2(1,2)
/* 
    多参数或者少参数会报错
*/
