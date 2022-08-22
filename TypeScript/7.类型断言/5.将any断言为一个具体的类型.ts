/* 
遇到any类型的变量时，我们可以选择无视他
可以选择改进他 通过类型断言及时的吧any断言为精确的类型
*/

//exam
function getCode(key: string): any {
    return (window as any).cache[key]
}

interface Cat {
    name: string;
    run(): void;
}

