# 课程目标

- 了解并知道vue中ref的作用
- 了解vue中混入的概念及作用
- 了解vue中组件的创建与使用
- 动态组件的使用
- 组件通信之父传子
- 组件通信之子传父
- 组件通信之兄弟传值

# ref

### 引导

问题：原生JavaScript开发或者jQuery开发会遇到大量的dom操作，此操作会降低开发效率和性能

解决：可以使用 MVVM 模式的框架解决（vue）

思考？？？

如果我想在vue中使用dom完成一些需求，该怎么办？？？

答案：使用ref属性来保存dom *** vue每次渲染的时候，会把加上了ref的属性的标签存在另一个内存中,那么我们如果需要使用的话，直接拿内存中存好的dom元素即可

​	       原生查找元素 doc.getxxxx    doc.qs()   **从根开始找**

### 语法

​	   <标签 ref="value"></标签>

​	  *** 获取：this.$refs.value

### 注意点

1. 当ref绑定在原生标签上的时候，获取的是原生dom对象
2. 当ref绑定在自定义的组件上的时候，获取的是组件的对象



# 混入

### 概念

减少代码冗余 提升开发效率，将相同的可复用的代码放置混入内

### 注意点

**混入内部的data必须是一个函数，函数内部必须return一个对象，对象里写data应有的变量（防止空间/数据污染）**

### 类型

#### 全局混入

当混入类型为全局混入的时候，所有的vue对象（viewmodel)都会有混入对象内的所有数据，可以直接使用

```javascript
Vue.mixin({
	data(){
		return {
			xxx:xxx
			...
		}
	},
    methods:{},
    ...
})
```



#### 局部混入

需要先创建一个混入对象，然后再需要混入的vm中通过mixins:[混入对象,...]

```javascript
const maxinObj = {
    data(){
    	return {
         	xxx:xxx,
            ...
        }
    },
    methods:{},
    ...
}
```



# 组件

### 概念

就是一个包含html、css和js以及完整逻辑的代码块，可以用来快速实现网站的布局与逻辑，提高开发效率减少代码冗余

通常一个页面都是由多个组件构成，形成完整页面的功能

### 语法

#### 全局组件

```javascript
Vue.component(组件名,{
    template:'', // html
    data(){
        reutrn {}
	}
    ,
    ...
})
```



#### 局部组件

```javascript
vm = {
    ...,
    components:{
    	组件名1:{
    		template:``,
    		...
		},
    	组件名2:{}
	}
}
```

### 注意点

1. 组名在调用的时候用小写，且从第二个大写字母开始要加上-进行分割
2. 组件内部只能有一个根节点
3. data必须是一种函数，函数内部返回一个对象（防止空间、数据污染）



# 动态组件

### 概念

就是一个vue.js自带的组件，可以用来通过is指定我们写的组件，进行组件的渲染  <component v-bind:is="组件名"></component>

### 案例

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <ul>
            <li><a href="#" @click.prevent="current_game = 'wzry'">王者荣耀</a></li>
            <li><a href="#" @click.prevent="current_game = 'hlbt'">哈利波特</a></li>
            <li><a href="#" @click.prevent="current_game = 'dwrg'">第五人格</a></li>
            <li><a href="#" @click.prevent="current_game = 'cjzc'">刺激战场</a></li>
        </ul>
        <!-- vue 有哪些自带的组件  component -->
        <!-- 动态组件   vue自带的组件 -->
        <component :is="current_game"></component>
    </div>
    <script>
        
        Vue.component('wzry',{
            template:`<fieldset>
                        <legend>王者荣耀专区</legend>
                        <h1>点击查看王者荣耀最新数据</h1>
                    </fieldset>`
        })
        Vue.component('hlbt',{
            template:`<fieldset>
                        <legend>哈利波特专区</legend>
                        <h1>点击查看哈利波特最新数据</h1>
                    </fieldset>`
        })
        Vue.component('dwrg',{
            template:`<fieldset>
                        <legend>第五人格专区</legend>
                        <h1>点击查看第五人格最新数据</h1>
                    </fieldset>`
        })
        Vue.component('cjzc',{
            template:`<fieldset>
                        <legend>刺激战场专区</legend>
                        <h1>点击查看刺激战场最新数据</h1>
                    </fieldset>`
        })

        const vm = new Vue({
           el:'#app',
           data:{
               current_game:"wzry"
           },
           methods:{}
        });
    </script>
</body>

</html>
```

# 组件通信

### 父子通信

#### 	概念

​			当组件内去使用或声明另一个组件，那这时候就是父子组件关系，那么如果父子之间需要传递数据（通信），就需要用到

​		    **父子通信**

​					1.在父组件中找到调用子组件的标签，在此标签上通过v-bind:自定义名称="data的值"来声明需要传递给子组件的值

​					2.在子组件中，通过props属性来接收父子间传递给子组件的值，此值的名称就是父组件v-bind的名称

​           **props的类型**

​			

```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
// 接收参数（但是限制接收值的类型）
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}

// 只是简单的限制类型
props:类型
// 限制类型的同时，给默认值
props:{
    type:类型,
    default:默认值
}
// 限制类型的同时，必须给值
props:{
    type:类型,
    required:true
}
// 自定义规则类型
props:{
    validator:function(value){
        return true || false
    }
}
```



### 子父通信

#### 	概念

​		就是通过子组件修改/通知父组件完成一些命令或需求逻辑

### 兄弟通信