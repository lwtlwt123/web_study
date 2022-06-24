// 函数表达式
/* 
    现在写一个函数表达式的定义
*/
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

/* 
    在ts中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
*/