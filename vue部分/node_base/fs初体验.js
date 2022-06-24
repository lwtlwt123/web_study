// 读取本地的文件数据
// 写入本地的文件数据

// 引入系统模块 fs 异步的
const fs = require('fs')
const path = require('path')
// 有了fs以后，就可以完成文件的读和写的操作
let finalPath = path.join(__dirname,'data.json')
fs.readFile(finalPath,'utf-8',(error,content) => {
    if(error == null){
        console.log(content);
    }else{
        console.log('读取文件失败，失败原因：'+error);
    }
})

let content = '写入成功啦'
fs.writeFile('./test.txt',content,error => {
    if(error == null){
        console.log('写入文件成功');
    }else{
        console.log(`写入文件失败，失败原因：${error}`);
    }
})


/* let content = '测试是否成功啦'
fs.writeFile('./txt/test.txt',content,error => {
    if(error == null){
        console.log('写入文件成功');
    }else{
        console.log(`写入文件失败，失败原因：${error}`);
    }
}) */