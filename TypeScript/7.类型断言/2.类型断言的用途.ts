/* 
当ts不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问联合类型的所有类型中共有的属性和方法
*/
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function getName(animal: Cat | Fish): Cat | Fish {
    return animal;
}

let data = {
    name: 'title',
    run() {
        return console.log('测试');
    }
}

console.log(getName(data));

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Cat).run === 'function') {
        return true
    }
    else return false
}

console.log(isFish(data));


/* 
类型断言只能够欺骗ts编译器 无法避免运行时的错误  滥用类型断言可能会导致运行时的错误
*/



/* function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom2:Cat = {
    name:'tom',
    run(){console.log('ceshi');
    }
}

console.log(swim(tom2)); */

/* 
这段代码隐藏了animal可能为Cat的情况 将animal直接断言成了fish ts编译器信任了我们的断言 在swim()时没有编译错误
但是 swim 接受的参数是 Cat | Fish 一旦传入的参数是Cat 类型的变量 Cat 上没有swim方法 就会导致运行时发生错误

调用时会报错
没有这个方法
*/



