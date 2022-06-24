# 课程目标

收尾 双向绑定 原理的订阅发布（昨天已经讲解数据劫持）

简单的封装一下 双向绑定

路由初体验

嵌套路由

路由的两种跳转方式

路由如何获取参数

路由模式（hash history）

路由模式的原理

嵌套路由

路由钩子（路由守卫）

路由meta属性、动态添加、命名视图





# 语法特性 *** 面试题

### vue 语法的特性

<h5 style="color: red;">简单数据类型 值变化的时候都会同步给页面</h5>

<h5 style="color: red;">复杂数据类型 数组 下标的值发生改变(无论是已定义还是未定义 都不会同步给页面)</h5>

<h5 style="color: red;">***当数组存储的是对象类型，修改对象的属性会发生同步</h5>

<h5 style="color: red;">复杂类型 对象 已定义的属性无论多少层都会同步，但是未定义的不会同步</h5>



# 补充-双向绑定原理

### 数据劫持

Object.defineProperty(obj,key,{})

### 观察和响应

**observe** 负责观察对象，在观察里面去响应

**defineReactive** 在方法内去响应数据的变化，通过getter 和 setter

### 为什么数组类型直接修改下标不刷新值呢？

因为 vue  源码在进行观察的时候 会判断当前 target 的类型是否为数组，如果是数组，会改写目前数组类型的 __proto__ 重新指向一个重写的对象，而重写对象内部则对需要刷新页面的方法进行了重置

```javascript
// 先获取到数组原生的 prototype 
const origin_prototype = Array.prototype

// 基于获取的数据的 prototype 创建一个新的对象
const clone_arrayObj = Object.create(origin_prototype)

// 创建一个数组，写上需要重写(需要通知页面刷新的)的方法名
const rewriteMethods = [
    "push",
    "splice",
    "reverse"
]

// 基于 rewriteMethods 重写 clone_arrayObj 里面的方法
rewriteMethods.forEach(method_name => {
    clone_arrayObj[method_name] = function () {
        updateView()
        // 真的往数组里面去添加
        return origin_prototype[method_name].apply(this, arguments)
    }
})
```



### $set $forceUpdate的作用

都是刷新页面不同步的问题，但是 **$forceUpdate**  会刷新所有的数据，性能不高 **$set** 支持单元素的刷新同步

#### 原理

就是在这两个方法内部通知页面刷新，$set通过页面的同时还会去请求响应



# vue-router 初体验 【全家桶之一】

### 概念

Vue Router 是 [Vue.js (opens new window)](http://cn.vuejs.org/)官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

### 使用步骤

1. 引入 vue-router 目前使用的是CDN的方式

2. 创建VueRouter对象

   ```javascript
   const router = new VueRouter({
       routes:[
           {path:'/路径',component:路由对象},
           ...
       ]
   })
   ```

3. 配置占坑

   ```
   <router-view></router-view>
   ```

4. 配置连接

   ```
   <router-link to="/路径"></router-link>
   ```

5. 激活路由

   ```javascript
   vm = {
   	router
   }
   ```

### 如何创建组件对象

#### 常规创建

const 组件对象 = Vue.component(组件名,{})

#### 简化创建

const 组件对象 = {template:'',...}

### 别名

alias:'别名'  用处就是给路由起另一个名字，通过这个名字也可以找到该条路由的配置，一般用在首页的默认显示 /

### 重定向

redirect:'/path' 类似电话的转接功能，当路由配置遇到了 redirect 关键字贼会把路由重新定向配置好的路由对象 一般用在 404 页面配置

### 路由参数

#### query

​	直接在url后面添加?参数=值的形式，和之前使用js的时候传递参数无差别

   如何获取    $route.query.参数名 即可获取

#### params

​	必须给路由配置好固定的参数名  {path:'/a/:参数名',component:组件对象} 如果路由设置的params 不传递会无法匹配到该条路由

​    如何获取  $route.params.参数名

### 路由跳转方式

#### 	声明式导航

​			类似 a 标签 实则渲染出来也是 a 标签，可以直接进行路由的跳转    <router-link to="路由配置地址"></router-link>

#### 	编程式导航

​			是通过事件触发 是可以在javascript代码中去操作或改变路由，相较于 声明式路由 他可以增加很多的判断逻辑

​			this.$router.push('/a')

​			this.$router.push({path:'/a',query:) 针对query    this.$router.push({name:'a',params}) 针对params

# 路由模式

### hash模式

#### 特性

url带 # 号，而且是 vue 默认使用的路由模式

#### 原理

通过修改当前页面的 **hash** 值 配合 **window.onhashchange** 事件来完成页面内容的更改

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <fieldset>
            <legend>hash路由的原理</legend>
            <!-- 模拟声明式导航和编程式导航 -->
            <button id="btn1">page1</button>
            <button id="btn2">page2</button>
            <a href="#/page1">page1</a>
            <a href="#/page2">page2</a>
            <hr>
            <h1>这里显示不同页面的内容</h1>
        </fieldset>
    </div>

    <script>
        document.querySelector('#btn1').onclick = function(){
            location.hash = '/page1'
        }
        document.querySelector('#btn2').onclick = function(){
            location.hash = '/page2'
        }

        window.onhashchange = function(){
            if(location.hash == "#/page1"){
                document.querySelector('h1').innerText = "页面1的内容"
            }else{
                document.querySelector('h1').innerText = "页面2的内容"
            }
        }

    </script>
</body>
</html>
```



### history模式

#### 特性

url不带 # 号，相较于 hash 模式而言，url相对美观，但是需要手动开启 history 模式

#### 缺点

1.不能刷新页面 刷新后页面立马找不到   2.如果使用的是 history 模式 上线后需要重新配置才可以使用

#### 原理

通过 **history.pushState** 修改 url 地址，完成不同页面的内容显示 配合 **window.onpopstate** 实现页面的前进和后退监控

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <fieldset>
            <legend>history路由的原理</legend>
            <!-- 模拟声明式导航和编程式导航 -->
            <button id="btn1">page1</button>
            <button id="btn2">page2</button>
            <a href="/page1">page1</a>
            <a href="/page2">page2</a>
            <hr>
            <h1>这里显示不同页面的内容</h1>
        </fieldset>
    </div>

    <script>
        document.querySelector('#btn1').onclick = function(){
            history.pushState(null,null,'/page1')
            document.querySelector('h1').innerText = "页面1的内容"
        }
        document.querySelector('#btn2').onclick = function(){
            history.pushState(null,null,'/page2')
            document.querySelector('h1').innerText = "页面2的内容"
        }

        let alinks = document.querySelectorAll('a')
        alinks.forEach(a => {
            // 给所有的a标签添加点击事件
            a.onclick = function(e){
                // 阻止默认事件
                e.preventDefault()
                // 区分需要跳转和显示的是哪个页面
                // http://127.0.0.1:5500/page1
                let tmp = this.href.split('/')
                let history_target = tmp[tmp.length - 1]
                // history.pushState
                history.pushState(null,null,`/${history_target}`)
                document.querySelector('h1').innerText = history_target
            }
        });

        // 监控路由的前进和后退
        window.onpopstate = function(){
            let tmp = location.href.split('/')
            let history_target = tmp[tmp.length - 1]
            document.querySelector('h1').innerText = history_target
        }

    </script>
</body>
</html>
```



# 动态路由参数匹配

### 现象

当同一个组件被多次调用，且传递的参数不同，这时候组件内部的生命周期（四个）只会走一次，之后再通过路由修改或者手动修改url的形式将不会再次触发 生命周期 从而可能无法导致信息是最新的问题

### 解决

#### 	侦听器

```javascript
watch:{
    $route(new,old){
        // 触发最新的路由查询或者操作
    }
}
```



#### 	路由钩子

```javascript
beforeRouteUpdate(new,old,next){
    // 触发最新的路由查询或者操作
    next() // 一定要调用next 否则路由将会一直被拦截不显示
}
```



# 嵌套路由

### 概念

就是一个路由对象里面 包含了 children 可以配置多条路由对象信息，一旦路由被配置在 children 里面 则代表当前路由是子路由

*** 子路由配置的时候不能写 /     访问的时候通过/父路由/子路由来访问，不能单独脱离父路由访问

### 语法

```javascript
 routes:[
     {
         path:'/films',
         component:films,
         children:[
             // 子路由定义的时候 path 不要再写 / 
             {path:'nowplaying',component:nowplaying},
             {path:'commingsoon',component:commingsoon}
         ]
     }
 ]
```

### 实战 - 电影网实战

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
     <!-- 1.引入 vue-rotuer 的文件 -->
     <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
     <style>
         *{margin: 0;padding: 0;outline: 0;color: #fff;}
         html,body,#app{width: 100vw;height: 100vh;overflow: hidden;}
          h1{color: orange;}
         .header{height: 55px;line-height: 55px;background-color: orange;text-align: center;}
         .footer{height: 50px;line-height: 50px;background-color: orange;text-align: center;position: fixed;left: 0;right: 0;bottom: 0;}
     </style>
</head>

<body>
    <div id="app">
        <router-view></router-view>
    </div>
    <script>

        // 电影网站父路由
        const films = {
            template:`<div>
                        <div class="header">卖座电影 App</div>
                        <div class="content">
                            <router-view></router-view>
                        </div>
                        <div class="footer">底部</div>
                    </div>`
        }


        // 两个子路由（正在上映 即将上映）

        const nowplaying = {
            template:`<h1>正在上映</h1>`
        }
        const commingsoon = {
            template:`<h1>即将上映</h1>`
        }

         // 创建一个 router 对象
         const router = new VueRouter({
            // 因为路由是有很多配置的路径或者 url 来组成的
            routes:[
                {
                    path:'/films',
                    component:films,
                    children:[
                        // 子路由定义的时候 path 不要再写 / 
                        {path:'nowplaying',component:nowplaying},
                        {path:'commingsoon',component:commingsoon}
                    ]
                }
            ]
        })


        var vm = new Vue({
           router,
           el:'#app',
           data:{},
           methods:{}
        });
    </script>
</body>

</html>
```



# 路由守卫

### 概念

在路由显示之前，先进行拦截，对路由进行判断或处理，最后再进行放行next 一般用在登录拦截上

### 语法

```javascript
router.beforeEach((to,from,next) => {
    // 逻辑判断，进行各种验证
})
```



### 实战 - 登录拦截

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
     <!-- 1.引入 vue-rotuer 的文件 -->
     <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <router-view></router-view>
    </div>
    <script>


        /*
            设计逻辑？
                + 先登录 登录成功才能访问 MyBank 或者 BankLog 页面
                + 页面一打开就是登录页面 方便用户登录
                + 防止用户手动敲 url 来改变路由的指向 因为 mybank 和 banklog 都是应该登录过后才能访问（安全性）
        */

        // 登录页面
        const login = {
            template:`<h1>登录页</h1>`
        }
        // 我的银行页面
        const mybank = {
            template:`<h1>我的银行页面</h1>`
        }
        // 我的汇款记录页面
        const banklog = {
            template:`<h1>我的汇款记录页面</h1>`
        }

        // 创建一个 router 对象
        const router = new VueRouter({
            // 因为路由是有很多配置的路径或者 url 来组成的
            routes:[
                {path:'/login',component:login,alias:'/'},
                {path:'/mybank',component:mybank},
                {path:'/banklog',component:banklog}
            ]
        })

        // 添加一个 路由守卫
        router.beforeEach((to,from,next) => {
            // 先判断你要去的地方是不是login 如果不是就代表我要开始拦截了 如果是直接放行
            if(to.path != '/login'){
                // 判断token
                if (localStorage.getItem('token') == 'true') {
                    next()
                }else{
                    next('/login')
                }
            }else{
                next()
            }
        })


        var vm = new Vue({
            router,
           el:'#app',
           data:{},
           methods:{}
        });
    </script>
</body>

</html>
```



# 路由的 meta 属性

### 做什么

自定义路由的属性，方便给路由进行各种描述，譬如说 是否缓存 显示不同路由的 title

### 怎么配置

```
{
	path,
	component,
	components,
	alias,
	redirect,
	children,
	meta:{
		自定义属性:value
		...
	}
}
```

### 如何使用 meta

<p style="color:red">this.$route.meta.xxx</p>



# 路由动态添加 addRoutes addRoute

### 能做什么

根据需求或判断，动态的往 router 里面添加路由配置对象，从而实现不同的需求加载不同的路由

也能解决当路由过大，第一次加载全部路由的问题，提升项目性能优化

### 如何使用

```javascript
// 批量添加 (官方已经废弃此方法，不推荐使用)
router.addRoutes([{},{},{}])
// 单个添加
router.addRoute({})
```

### 解决什么问题

当后面我们接入了各种权限或项目写完以后的优化性能的问题



# 命名视图

### 概念

可以给<router-view>占坑取名字 然后根据名字找不同的路由占坑进行显示，从而让一个页面可以使用多个不同的路由组件对象

### 语法

```javascript
routes:[
    {path,components:{
        name1:组件对象,
        name2:组件对象,
        ...
    }}
]
     
<router-view name="name"></router-view>
```

### 案例 - 不同页面加载不同的头部和尾部

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <style>
        *{margin: 0;padding: 0;outline: 0;}
        .header{line-height: 55px;text-align: center;background-color: orange;width: 100%;}
        .footer{line-height: 55px;text-align: center;background-color: pink;width: 100%;}
        .header.cart{
            background-color: skyblue;
        }
        .footer.cart{
            background-color: green;
        }
        h1{
            line-height: 200px;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 渲染头部 -->
        <router-view name="header"></router-view>
        <!-- 渲染内容 -->
        <router-view></router-view>
        <!-- 渲染底部 -->
        <router-view name="footer"></router-view>
    </div>
    <script>

        // 通用头部
        const header1 = {
            template:`<div class="header">通用头部</div>`
        }
        // 购物车头部
        const header2 = {
            template:`<div class="header cart">我的购物车</div>`
        }

        // 通用底部
        const footer1 = {
            template:`<div class="footer">通用底部</div>`
        }

        // 购物车底部
        const footer2 = {
            template:`<div class="footer cart">当前总价￥1000.00 <button>立即下载</button></div>`
        }


        const home = {
            template:`<h1>显示首页</h1>`
        }
        const type = {
            template:`<h1>显示分类页面</h1>`
        }
        const carts = {
            template:`<h1>显示购物车页面</h1>`
        }


        const router = new VueRouter({
            routes:[
                {path:'/home',components:{header:header1,default:home,footer:footer1}},
                {path:'/type',components:{
                    header:header1,
                    default:type,
                    footer:footer2
                }},
                {path:'/carts',components:{
                    header:header2,
                    default:carts,
                    footer:footer2
                }},
            ]
        })

        var vm = new Vue({
            router,
           el:'#app',
           data:{},
           methods:{}
        });
    </script>
</body>

</html>
```



### 面试题 $route 和 $router

​		**$route** 一般是获取路由的信息相关，譬如query、params、完整路径、简化路径、meta自定义配置

​		**$router **一般是操作路由的，可以通过$rotuer进行编程式导航