# 课程目标

收尾 双向绑定 原理的订阅发布（昨天已经讲解数据劫持）

简单的封装一下 双向绑定

路由初体验

嵌套路由

路由的两种跳转方式

路由如何获取参数

路由钩子（路由守卫）



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

### 面试题 $route 和 $router

​		**$route** 一般是获取路由的信息相关，譬如query、params、完整路径、简化路径、meta自定义配置

​		**$router **一般是操作路由的，可以通过$rotuer进行编程式导航