"use strict";
/*
基础类型
*/
// 布尔
let isDone = false;
//数字
let num = 1;
//字符串  (可使用摸板字符串)
let string = "ceshiname";
let string1 = `my name is ${string}`;
console.log(string1);
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
//枚举 （enum类型对js标准数据类型的一个补充，像c#，是用枚举可以对一组数值赋予友好的名字）
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
    Color[Color["alpha"] = 3] = "alpha";
})(Color || (Color = {}));
let c = Color.red;
console.log(c);
//默认情况下，从0开始为元素编号，可以手动指定成员的数值
var Color1;
(function (Color1) {
    Color1[Color1["red"] = 1] = "red";
    Color1[Color1["green"] = 2] = "green";
    Color1[Color1["blue"] = 3] = "blue";
})(Color1 || (Color1 = {}));
let a = Color1.red;
console.log(a);
//枚举类型提供的便利是你可以由枚举的值得到他的名字
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 4] = "red";
    Color2[Color2["green"] = 5] = "green";
    Color2[Color2["blue"] = 6] = "blue";
})(Color2 || (Color2 = {}));
let b = Color2[5];
console.log(b);
//Any (不清楚类型的变量)
let notSure = 4;
notSure = '我可能是一串字符串';
console.log(notSure);
notSure = true;
console.log(notSure);
//在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或一处类型检查。
//与Object类似，Object变量允许你给他赋任意值，但是不能够在他上面调用任意的方法
let notSure1 = 4;
notSure1.toFixed();
// notSure1.concat();(不会直接报错)
let notSure2 = 4;
// notSure2.splice(); (error  不能调用任意的方法 Obj)
//只知道一部分数据的类型时，any类型也是有用的
let arr2 = [1, true, 'string'];
arr2[1] = 100;
console.log(arr2);
//void 表示没有类型，当一个函数没有返回值的时候返回值，返回值类型为void
function methods() {
    console.log('这是一个没有返回值的函数');
}
methods();
//null和undefined 默认情况下，null和undefined是所有类型的子变量可以把null和undefined赋值给number类型的变量
let n = undefined;
let n1 = null;
//never表示永不存在的值的类型 never类型总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可以是never类型，被永不为真的类型保护所约束时
//never是任何类型的子类型，可以赋值给任何类型，never没有子类型any不可以赋值给never
//返回never的函数必须存在无法抵达的终点
function error(message) {
    throw new Error(message);
}
//推断返回值的类型为never
function fail() {
    return error('Something failed');
}
//返回never函数必须存在无法到达的终点
function infiniteLoop() {
    while (true) {
    }
}
Object;
/* 表示非原始类型，除number，string,boolean,symbol,null或undefined之外的类型 */
/* 类型断言 */
/*
    判断当前值的类型
*/
/*
    类型断言两种语法
*/
let someValue = 'this is a string';
let strLength = someValue.length;
/*
    as语法
*/
let someValue1 = "this is a string";
let strLength1 = someValue1.length;
console.log(strLength1);
