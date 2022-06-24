const fs = require('fs')
const oneGen = function(){
    fs.readFile('./1.txt','utf-8',(error,content)=>{
        if(error==null){
            iterator.next(content)
        }
    })
}
const twoGen = function(){
    fs.readFile('./2.txt','utf-8',(error,content)=>{
        if(error==null){
            iterator.next(content)
        }
    })
}
const threeGen = function(){
    fs.readFile('./3.txt','utf-8',(error,content)=>{
        if(error==null){
            iterator.next(content)
        }
    })
}

function * gen(){
   let one = yield oneGen()
   console.log(one);
   let two = yield twoGen()
   console.log(two);
   let three = yield threeGen()
   console.log(three);

}

let iterator = gen();
iterator.next();