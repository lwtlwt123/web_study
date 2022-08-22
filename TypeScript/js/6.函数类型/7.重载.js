"use strict";
//重载允许一个函数接受不同数量或者类型的参数的时候，做出不同的处理
function reserve(x) {
    if (typeof x === 'number')
        return 1;
    else
        return 'string';
}
