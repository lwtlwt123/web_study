/* 
    ts参加了默认值的参数作为可选参数
*/

function buildName1(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName1('Tom', 'Cat');
let tom1 = buildName1('Tom');

//此时不用遵循可选参数在必选参数后面的限制了