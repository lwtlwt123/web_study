// 引入fs模板
const fs = require('fs')
let startPromise = new Promise((reslove,reject)=>{
    fs.readFile('./1.txt','utf-8',(error,content)=>{
        if(error == null){
            reslove(content);
        }
    })
})

startPromise.then(res=>{
    return new Promise((reslove,reject) =>{
        fs.readFile('./2.txt','utf-8',(error,content)=>{
            if(error == null){
                reslove([res,content]);
            }
        })
    })
})
.then(resArr=>{
    return new Promise((reslove,reject)=>{
        fs.readFile('./3.txt','utf-8',(error,content)=>{
            if(error == null){
                let tmp = resArr;
                tmp.push(content)
                reslove(tmp);
            }
        })
    })
})
.then(final =>{
    console.log(final);
})