"use strict";
/*
在ts中，数组有多种定义方式，比较灵活
*/
// 类型+尖括号表示法
let array1 = [1, 2, 34, 64];
// let array1:number[] = [1,2,34,64,'123']   数组中不允许有其他类型的元素
// 操作的话也不允许添加不同类型的元素
// array1.push('1')  报错
/*
数组范型
*/
let array2 = [1, 1, 1];
let array3 = [1, 2, 34, 1, 5];
/*
类数组   不是数组类型
*/
/* function sum() {
    let args: number[] = arguments;
    arguments是一个类数组，不能用普通的数组来描述，应该用接口
} */
function sum() {
    let args = arguments;
}
/*
    类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：
*/
function sum1() {
    let args = arguments;
}
/*
    any在数组中的应用
    在数组中表示任意可以出现的类型 any
*/
let list = ['xCatLiu', 25, { website: 'http://xcatliu.com' }];
