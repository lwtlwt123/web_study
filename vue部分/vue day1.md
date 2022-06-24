# 课程目标

- 能够说出vue框架相对于jQuery或者普通原生开发的好处（3点）
- 能够说出MVVM模式开发
- vue初体验（vue模板语法）
- vue的列表循环（v-for）
- vue的条件判断（v-if..v-else-if..v-else)
- vue的事件处理（常用事件、按键修饰符、事件修饰符）
- 使用以上知识点完成简单的vue案例

# vue框架的好处？

- 开发效率高
- 减少dom操作
- 组件化开发（vue允许让html+js+css成为一个代码块，从而实现高效复用）<web-header></web-header> <login></login>

# 什么是vue框架？

![](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213092342053.png)

```javascript
1.vue好处
	+ 减少dom操作
	+ 提高开发效率
	+ 组件化开发***难点
2.什么是vue框架???
    + vue是一个渐进式的js框架，他能配合vue的生态系列完全项目的快速开发
	+ js库/jquery...
```

# 了解MVVM框架

MVC 框架

![image-20211213093447447](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213093447447.png)

MVP 框架

![image-20211213094000256](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213094000256.png)

MVVM 框架

![image-20211213094506968](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213094506968.png)

# vue初体验

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 1.引入 vue.js 框架文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
    <!-- 2.创建一个dom元素 -->
    <div id="app">
        <h3>大家好，我的名字叫做{{uname}}</h3>
        <h4>我今年{{age}}岁了！</h4>
        <h4>我的兴趣爱好是：</h4>
        <ul>
            <li v-for="item in hobbies">{{item}}</li>
        </ul>
    </div>
    <script>
        // 3.创建一个vue的对象
        // MVVM 开发模式
        /*
            view   ->   <div id="app"></div>
            model  ->   vm.data
            viewModel   -> vm
        */
        const vm = new Vue({
            el:'#app',  // view
            data:{    // model
                uname:'angela',
                age:20,
                hobbies:['唱歌','游戏','运动','做饭']
            }
        })
    </script>
</body>
</html>
```

# vue中模板语法

- 差值表达式 {{val}} 可以进行简单的运算，但是不能解析html也不能写在标签上
- v-text 等同于innerText,写在标签上
- v-html 等同于innerHtml 写在标签上，可以渲染html标签
- v-bind
  - 绑定属性的模板语法   v-bind:属性名="data中的值"
  - 简写方式   :属性名="data中的值"
- v-on
  - 绑定事件的模板语法 v-on:事件名="methods中的事件"
  - 简写方式   @事件名="methods中的事件"

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入 vue.js  -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <p>大家好，我叫做{{uname}}</p>
        <p v-text="uname"></p>
        <p>我的年龄是{{age}}岁</p>
        <p>五年以后，我的年龄是{{age + 5}}岁</p>
        <p>当前我的成年情况：{{age >= 18 ? "已成年":"未成年"}}</p>
        <p>我的名字如果反过来写是：{{uname.split('').reverse().join('')}}</p>
        <!--
            如果需要绑定的数据是 属性  {{}}不能用来绑定属性
            绑定属性：
                v-bind:属性名=绑定的值
                :属性名=绑定的值
         -->
        <img v-bind:src="imgPath" alt="">
        <img :src="imgPath" alt="">
        <br>
        <a :href="jdUrl">京东</a>
        <a :href="bdUrl">百度</a>
        <hr>
        <!-- 
            如果需要绑定事件 
                v-on:事件名=事件函数
                @事件名=事件函数
         -->
        <button v-on:click="showHello">点我弹出Hello</button>
        <button @click="showHello">点我弹出Hello</button>
        <hr>
        <p v-html="tmpHtml"></p>
    </div>

    <script>
        const vm = new Vue({
            el:'#app',
            // data中只放数据
            data:{
                uname:'jack',
                age:19,
                imgPath:'https://p4.music.126.net/ktAw4FNwGL4owGZW_5227w==/109951166669987126.jpg?param=100y100',
                jdUrl:'http://www.jd.com',
                bdUrl:'http://www.baidu.com',
                tmpHtml:'<h1 style="color:red">这是红色的文字</h1>'
            },
            // 所有的方法
            methods:{
                showHello(){
                    alert('hello')
                }
            }
        })
    </script>
</body>
</html>
```

# 循环语法（v-for)

当页面中出现列表或重复元素的时候，考虑使用v-for

语法：

​	 <标签 v-for="(item,index) in data中的数组"     :key="唯一的值">{{item || iindex}}</标签>

*** 在使用v-for的时候，一定要使用key，key的值一般都是数据的唯一列，如果数据没有唯一列，那么就用index暂时替代

# 条件语法

![image-20211213130310122](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213130310122.png)

*** 需求：当购物车的数量小于等于0的时候，不显示数量，否则显示具体的数量

实现方式

- v-if 是直接操作dom元素的新增和移除
  - 更加适合符合条件但后期基本不变动的元素使用（权限）
  - 支持多条件  v-if   v-else-if  v-else
    - 案例：当考试成绩>=90 优秀 >=80 良  >=70 中 >=60 及格  否则不及格
- v-show 是操作dom元素的display的显示和隐藏
  - 当频繁显示和隐藏需求的时候，考虑使用v-show，因为效率高，仅仅是切换css

# 事件修饰符

网址：https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6

![image-20211213133820811](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213133820811.png)

# 按键修饰符

网址：https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6

![image-20211213142109871](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\image-20211213142109871.png)

# 双向绑定 v-model

概念：vue默认的通信方式都是单向的，从data到view（默认通信方式） 那么如果需要通过view修改data的值能及时的同步给data，需要使用v-model双向绑定标签

语法：<限定标签 v-model="data中的值"></限定标签>

*** v-model只能用在input  select textarea

​		*** input 如果是radio或checkbox 必须给value值，否则拿到的是null

​		*** select v-model只能加在select上面，且option必须有value，否则拿到的也是null

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <h3>万和学生注册系统</h3>
        <!-- 
            双向绑定只能用在 input:type   select    textarea
            v-model:双向绑定  data  <->  view
         -->
        <table border="1">
            <tr>
                <td>账号</td>
                <td>
                    <input v-model="regObj.uname" type="text" name="" id="">
                </td>
            </tr>
            <tr>
                <td>密码</td>
                <td>
                    <input v-model="regObj.pwd" type="password" name="" id="">
                </td>
            </tr>
            <tr>
                <td>性别</td>
                <td>
                    <input v-model="regObj.gender" value="male" type="radio" name="gender" id=""> 男
                    <input v-model="regObj.gender" value="female" type="radio" name="gender" id=""> 女
                </td>
            </tr>
            <tr>
                <td>爱好</td>
                <td>
                    <input v-model="regObj.hobbies" type="checkbox" value="唱歌"> 唱歌
                    <input v-model="regObj.hobbies" type="checkbox" value="电影"> 电影
                    <input v-model="regObj.hobbies" type="checkbox" value="音乐"> 音乐
                </td>
            </tr>
            <tr>
                <td>所在城市</td>
                <td>
                    <select v-model="regObj.city">
                        <option value="南京">南京</option>
                        <option value="上海">上海</option>
                        <option value="深证">深证</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>个人简介</td>
                <td>
                    <textarea v-model="regObj.info" name="" id="" cols="30" rows="10"></textarea>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button @click="regFn">注册</button>
                    <button @click="clearFn">重置</button>
                </td>
            </tr>
        </table>
        <hr>
        {{regObj}}
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                regObj: {
                    uname: '',
                    pwd: '',
                    gender: '',
                    hobbies: [],
                    city: '',
                    info: ''
                }
                // uname:'',
                // pwd:'',
                // gender:'',
                // hobbies:[],
                // city:'',
                // info:''
            },
            methods:{
                regFn(){
                    console.log(JSON.stringify(this.regObj));
                },
                clearFn(){
                    this.regObj = {}
                }
            }
        })
    </script>
</body>

</html>
```

# 作业

![QQ图片20211213165656](C:\Users\SuperZHEN\Desktop\vue-26-day1\课件\img\QQ图片20211213165656.png)