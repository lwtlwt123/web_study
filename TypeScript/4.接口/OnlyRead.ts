/* 
    只读属性 希望对象中的属性只在创建的时候赋值 可以用readonly定义只读
*/
interface Person4 {
    readonly id: number;
    name: string;
    age: number;
    [propName: string]: any;
}
let mary: Person4 = {
    id: 11, name: 'mary', age: 11, gender: '男'
};

/* 无法分配到 "id" ，因为它是只读属性
mary.id = 12; */

/*
    只读属性的约束存在于第一次给对象赋值的时候，不是第一次给只读属性赋值的时候
*/
interface Person5 {
    readonly id: number;
    name: string;
    age: number;
    [propName: string]: any;
}
//类型 "{ name: string; age: number; }" 中缺少属性 "id"，但类型 "Person5" 中需要该属性
/* let jack: Person5 = {
    name: 'mary', age: 11,
} */

/* 无法分配到 "id" ，因为它是只读属性
jack.id = 12 */