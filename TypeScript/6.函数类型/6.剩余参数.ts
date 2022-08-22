//在es6中  可以使用...rest 的方式获取函数中的剩余参数（rest参数）
let a1: any[] = []
function push(array: Array<number>, ...items: Array<number>) {
    items.forEach(function (item) {
        array.push(item)
    })
}
push(a1, 1, 2, 3)
console.log(a1);
