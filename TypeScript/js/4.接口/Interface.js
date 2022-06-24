"use strict";
/*
    什么是接口？
      在ts中，我们用接口来定义对象的类型
      在面向对象语言中，接口（Interfaces）是一个很重要的概念，他是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

      ts中的接口是哟个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对【对象的形状（Shape）】进行描述
*/
let tom = {
    name: '章三',
    age: 18
};
console.log(tom);
/*
    定义了一个接口Person，又定义了一个变量是Person类型的，这样就约束了tom和Person的类型必须保持一致
    接口首字母一般大写
    同类型的属性要保持一致，不能多或者少
*/
// 少属性，报错
/* let tom1: Person = {
    name: '里斯',
} */
//多属性，报错
/* let tom2:Person = {
    name:'王武',
    age:15,
    type:true
} */
/*
    赋值的时候变量的形状和接口的形状要保持一致
*/
