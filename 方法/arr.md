数组方法
============================

在数组尾部添加元素
**************************
push(); //返回新数组的长度

删除数组尾部的元素
**************************
pop()  //返回被删除的元素

在数组的头部插入元素
**************************
unshift() //返回新数组的长度

删除数组头部的元素
**************************
shift() //返回被删除的元素

**************************
数组合并
concat() //返回新数组

**************************
数组中添加删除或替换元素
splice()

**************************
1.只有一个值时，从该值位置删除到数组末尾
2.有两个值，第一个是删除的位置，第二个是删除的个数
3.三个或多个值时，第一个为插入元素的位置，第二个为替换的个数，后面的都为插入的新元素

**************************

// 删除数组中的指定元素
let data = 2
let arr1 = [1, 2, 3, 4]
arr.splice(arr.indexOf(2), 1)

arr = arr.filter(item => item != 2)
