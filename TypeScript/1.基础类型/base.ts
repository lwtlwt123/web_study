/* 
基础类型
*/
// 布尔
let isDone: boolean = false;

//数字
let num: number = 1

//字符串  (可使用摸板字符串)
let string: string = "ceshiname";
let string1: string = `my name is ${string}`
console.log(string1);


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
enum Color { red, green, blue, alpha }
let c: Color = Color.red
console.log(c);
//默认情况下，从0开始为元素编号，可以手动指定成员的数值
enum Color1 { red = 1, green = 2, blue = 3 }
let a: Color1 = Color1.red
console.log(a);
//枚举类型提供的便利是你可以由枚举的值得到他的名字
enum Color2 { red = 4, green, blue }
let b: string = Color2[5]
console.log(b);

//Any (不清楚类型的变量)
let notSure: any = 4
notSure = '我可能是一串字符串'
console.log(notSure);
notSure = true
console.log(notSure);
//在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或一处类型检查。
//与Object类似，Object变量允许你给他赋任意值，但是不能够在他上面调用任意的方法
let notSure1: any = 4
notSure1.toFixed();
// notSure1.concat();(不会直接报错)
let notSure2: Object = 4
// notSure2.splice(); (error  不能调用任意的方法 Obj)
//只知道一部分数据的类型时，any类型也是有用的
let arr2: any = [1, true, 'string'];
arr2[1] = 100
console.log(arr2);






