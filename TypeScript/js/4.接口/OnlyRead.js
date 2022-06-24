"use strict";
let mary = {
    id: 11, name: 'mary', age: 11, gender: '男'
};
//类型 "{ name: string; age: number; }" 中缺少属性 "id"，但类型 "Person5" 中需要该属性
/* let jack: Person5 = {
    name: 'mary', age: 11,
} */
/* 无法分配到 "id" ，因为它是只读属性
jack.id = 12 */ 
