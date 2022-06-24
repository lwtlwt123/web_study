const fs = require('fs');
/* fs.readFile('./data.json','utf-8',(error,content)=>{
    if(error == null){
        console.log(content);
    }
}) */
let content = '12354'
fs.writeFile('./5.html',content,(error)=>{
    if(error==null){
        console.log('你好');
    }
})