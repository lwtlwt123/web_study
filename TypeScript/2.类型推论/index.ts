/* 
    类型推论：当设置变量时没有明确的指定类型，ts会依照类型推论来推断出一个类型
*/
let item = 'this'
/* 
    item = 3;
    报错
    它等价于
    let item:string = 'this'
    item = 3
*/

/* 
    如果定义的时候没有赋值，类型推论会成为any，完全不被类型检查
*/
let thing;
thing = 1;
