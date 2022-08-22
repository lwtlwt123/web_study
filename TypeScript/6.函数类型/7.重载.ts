//重载允许一个函数接受不同数量或者类型的参数的时候，做出不同的处理

// 实现函数的功能   reserve   当输入数字123时 返回321  当输入字符串‘hello’ 输出‘olleh’

// 使用联合类型

/* function reserve(x: number | string): number | string {
    if (typeof x === 'number')
        return 1
    else return 'string'
}
console.log(reserve('test')); */


// 使用重载
function reserve(x: number): number;
function reserve(x: string): string;
function reserve(x: number | string): number | string {
    if (typeof x === 'number')
        return 1
    else return 'string'
}

