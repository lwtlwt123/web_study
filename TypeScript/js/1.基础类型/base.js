"use strict";
/*
基础类型
*/
// 布尔
let isDone = false;
//数字
let num = 1;
//字符串  (可使用摸板字符串)
let string = "string";
let string1 = `my name is ${string}`;
//数组
let arr = [1, 2, 3];
//数组泛型 Array<元素类型>
let arr1 = [1, 2, 3];
//元组 Tuple ： 原则类型允许表示一个一直元素数量和类型的数组，各元素的类型不必相同，比如，你可以定义一对值分别为string和number类型的元组
let x;
x = ['hello', 10];
// x =[10,'hello'] （错误）
//访问已知索引的元素，会得到正确的类型
console.log(x[0].substring(1)); // => 'h'
//访问越界的元素，会用联合类型来替代（typescript 2.7后，元祖长度被固定，访问元祖越界元素会报错）
// x[3] = 10
//枚举 （enum类型对js标准数据类型的一个补充，像c#c#，是用枚举可以对一组数值赋予友好的名字）
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
    Color[Color["alpha"] = 3] = "alpha";
})(Color || (Color = {}));
let c = Color.red;
//默认情况下，从0开始为元素编号
