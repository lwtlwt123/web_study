const queryStr = require('querystring')
let loginObj = {
    /* 
    账号
    密码
    密保问题
    密保答案
    */
   username:'angela',
   pwd:'123456',
   question:'likes',
   answer:'songs',
   age:18
}

// username=angela&pwd=123456&question=likes&answer=songs
let finalQueryString = queryStr.stringify(loginObj);
console.log(`http://www.jxshop.com?${finalQueryString}`);