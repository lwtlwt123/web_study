/* 
    联合类型：表示取值可以为多种类型中的一种
*/

let number: string | number;
number = 1;
number = 'seven';
console.log(number);

/*
   访问联合类型的属性和方法：
   当ts不确定一个联合类型的变量到底是哪个的类型的时候，我们只能访问此联合类型的所有类型的所有方法的共有属性和方法
*/


/*
     function getLength(something: string | number): number {
    return something.length;
}

length不是string和number的共有属性，所以会报错，访问他们的共有属性是没有问题的
*/

function getString(something: string | number): string {
    return something.toString();
}

/* 
联合类型的变量在被赋值的时候，会根据类型推论来推断出一个类型

*/
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
// myFavoriteNumber = 7;
// console.log(myFavoriteNumber.length); // 编译时报错
/* 
第一个类型被推断成了string
第二个类型被推断成了number
*/