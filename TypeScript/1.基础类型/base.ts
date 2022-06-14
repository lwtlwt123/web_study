/* 
基础类型
*/
// 布尔
let isDone: boolean = false;

//数字
let num: number = 1

//字符串  (可使用摸板字符串)
let string: string = "string";
let string1: string = `my name is ${string}`

//数组
let arr: number[] = [1, 2, 3];
//数组泛型 Array<元素类型>
let arr1: Array<number> = [1, 2, 3];

//元组 Tuple ： 原则类型允许表示一个一直元素数量和类型的数组，各元素的类型不必相同，比如，你可以定义一对值分别为string和number类型的元组
let x: [string, number]
x = ['hello', 10]
// x =[10,'hello'] （错误）
//访问已知索引的元素，会得到正确的类型
console.log(x[0].substring(1)); // => 'h'
//访问越界的元素，会用联合类型来替代（typescript 2.7后，元祖长度被固定，访问元祖越界元素会报错）
// x[3] = 10

//枚举 （enum类型对js标准数据类型的一个补充，像c#c#，是用枚举可以对一组数值赋予友好的名字）
enum Color {red, green, blue, alpha}
let c:Color = Color.red
//默认情况下，从0开始为元素编号


