/* 
    可选参数
*/
function buildName(name: string, age?: number) {
    return name
}
console.log(buildName('小攻'));

/*
    可选参数必须在必选参数后面，可选参数后面不能出现必选参数了
*/

