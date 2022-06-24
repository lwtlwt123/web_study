/* 
    可选属性：有的时候我们希望不用完全匹配一个形状，所以选用可选属性
*/
interface Person1{
    name: string;
    age?:number; //该属性可以不存在
}
let tom3:Person1 = {
    name:'赵六'
}
console.log(tom3);

/*
    此时仍然不许添加未定义的属性(报错)
*/
/* let tom4:Person1 ={
    name:"白朵",
    age:18,
    gender:"0"
} */
