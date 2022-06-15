"use strict";
/*
    前面的key值取的string任意属性  后面的值取得any任意值，并不是任意属性
    或者去这个类型string ｜number值  确定属性和可选书习惯必须为任意属性的子集
    一旦定义了任意属性那么确定属性和可选属性必须是它的子集
*/
/* interface Person3 {
    name: string;
    age?: number;
    任意属性为string     值为string
    [propName: string]: string;
}

let tom4: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}; */
/*
    上述中任意属性的值是string，但是可选属性的值是number，number不是string的子集，所以报错了
*/
/*
    一个接口只能定义一个类型的任意属性，如果接口中有多个类型的属性则可以在任何属性中使用联合类型
*/
// interface Person3 {
//     name: string;
//     age?: number;
//     [propName: string]: string | number;
// }
// let tom4: Person3 = {
//     name: 'Tom',
//     age: 25,
//     gender: 'male'
// };
