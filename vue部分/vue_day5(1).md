# 课程目标

- 掌握并了解vue中的生命周期(生命钩子、生命函数)
- 补充组件通信 - 兄弟
- 缓存 keep-alive
- 了解$nextTick的作用
- 掌握vue中插槽的使用（配合组件完成一些功能）【后备插槽、具名插槽和作用域插槽】
- 掌握vue中过渡、动画的使用
- v-model原理（会写***了解、面试题、说出来）



# 生命周期

### 概念

在不同的情况下，通过生命周期函数触发不同的方法，从而完成不同的业务逻辑

### 语法

```
// 自动执行的生命函数
beforeCreate 在vm创建之前执行，此时$el/$data...都没有被初始化
created 在vm实例化完成之后执行，此阶段有$data/$methods/$watch... 但是没有$el
beforeMount 挂载之前执行 此阶段开始有$el 但是$el没有被替换（可以看到写的vue源码）
mounted  挂载替换之后执行 此阶段有$el 并且此$el已经被替换

// 符合条件执行的生命函数
beforeUpdate  在数据发生改变，但是dom没有被修改之前执行
updated       在数据发生改变，而且dom也已经被更新之后执行
beforeDestroy 在vm/组件销毁之前执行
destroyed     在vm/组件销毁之后执行

// 剩余的***后面说
activated     在 keep-alive 缓存的组件被激活的时候执行
deactivated   在 keep-alive 缓存的组件被失活的时候执行
```

### 面试题

- created和mounted有什么区别
- 页面自动执行的生命周期有哪些



# 补充：组件通信-兄弟

### 概念

​		两个同级的组件如果需要传递数据，那么父传子和子传父都不可以用，因为不符合层级关系，那么这时候就需要用到组件通信中的兄弟传值来完成需求了

### 使用方法   bus 是兄弟之间通信的桥梁

​	1.在请求方   bus.$emit(自定义事件,参数...)

​	2.在接收方   bus.$on(自定义事件,callback(参数根据请求的自定义事件而定))

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
        <!-- 超市 -->
        <super-market></super-market>
        <!-- 购物车 -->
        <carts></carts>
    </div>
    <script>

        // 创建bus
        const bus = new Vue()

        // 超市组件
        Vue.component('SuperMarket', {
            template: `<fieldset>
                        <legend>万和小超市</legend>
                        <ul>
                            <li v-for="(item,index) in goods" :key="index">{{item}} <button @click="buy(item)">购买</button></li>
                        </ul>
                    </fieldset>`,
            data() {
                return {
                    goods: [
                        '卫龙辣条',
                        '康师傅方便面',
                        '牙刷'
                    ]
                }
            },
            methods:{
                buy(good){
                    // bus.$emit()
                    bus.$emit('buyGoods',good)
                }
            }
        })

        // 购物车组件
        Vue.component('Carts',{
            template:`<fieldset>
                        <legend>购物车</legend>
                        <ul>
                            <li v-for="(item,index) in carts" :key="index">{{item}}</li>
                        </ul>
                    </fieldset>`,
            data(){
                return {
                    carts:[]
                }
            },
            mounted(){
                // 涉及到dom才有影响
                bus.$on('buyGoods', good => {
                    this.carts.push(good)
                })
            }
        })

        var vm = new Vue({
            el: '#app',
            data: {
                
            },
            methods: {}
        });
    </script>
</body>

</html>
```



# keep-alive 缓存机制

### 概念

​	缓存某个组件，缓存起来的组件不会走created或destoryed，只会走deactivated和activated，但是组件首次加载还是会加载created

### 语法

```javascript
<keep-alive>
    // 需要缓存的页面或者组件
</keep-alive>

// b-bind的属性
max:num    // 最大缓存数量，如果超过数量，会把最久没有被激活的组件删除
include:['组件名',...]   // 只有数据内写的组件才会被缓存
exclude:['组件名',...]   // 数据内写的组件不会被缓存，其他都会被缓存
```

### 注意点

​	1.如果组件被缓存，那么created和activated需要配合使用，created用来进行首次初始化数据，之后都交给activated，但是activated不能每次都去请求数据，需要根据情况来请求数据

​    2.一旦组件被缓存，就不要再用destroyed，用deactivated来代替destroyed



# $nextTick

### 概念

​		使用了$.nextTick之后，所属的callback一直会等待dom更新完毕之后执行，从而解决可能代码在dom更新之前获取异常的问题

### 语法

​		在需要使用的地方 通过 <code>this.$nextTick(callback)</code> 进行dom更新之后调用回调函数

### 解决问题

​	 1.修改数量后，或者一些判断，dom未更新的时候获取数据异常的问题

​	 2.面试题？？？（就是想在created里面去用dom怎么办？？？） 在created里面也可以用 $nextTick 来获取dom元素



# 插槽 Slot

### 概念

### 类型

#### 	1.后备插槽（默认插槽）

```
在组件内部需要使用插槽的地方 用 <slot></slot> 占位即可 最后<slot>会渲染组件之间的内容
```

#### 	2.具名插槽

```
1.在组件内部 找到插槽 <slot name="value"></slot>
2.在调用组件的中间 一定要写 <template v-slot:name></template>
***注意点：v-slot千万不能加引号 如果具名插槽内部出现后备插槽 那么在调用的时候 没有使用v-slot的所有内容全部放到后备插槽里面
```

#### 	3.作用域插槽

```
概念：就是在使用插槽的时候，可以通过<slot></slot>上面v-bind绑定的值，在<template></template>上使用

步骤
1.设置作用域插槽 <slot name="value" v-bind:"组件中data的值"></slot>
2.使用作用域插槽的值  <template v-slot:name="任意名称">{{任意名称.xxx}}</template>
```



# vue中的过渡和动画

### 使用过渡（transition）

```
.xxx-enter-active,.xxx-leave-active{
    过渡的设置
}
.xxx-enter{},.xxx-leave-to{
    修改的样式
}

<transition name="xxx"></transiton>
```

### 使用动画（animation）

```
.xxx-enter-active{正向动画}
.xxx-leave-active{反向动画}

@keyframes xxx {}

<transition name="xxx"></transiton>
```

### 使用动画库（Animate.css）

```
1.引入动画库
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
2.加入标签属性
<transition
	enter-active-class="Animate.css的动画名"
	leave-active-class="Animate.css的动画名"
></transiton>
```



# v-model 原理

### 引导

发现问题：v-model是双向绑定??? vue里面都是单向的 model -> view 但是 v-model 却能做到 model <->  view

为什么?????????

### 原理

v-model 原理  **v-bind** && **@input** ，v-model 其实就一中 **语法糖** 通过bind和on来完成双向绑定的功能



# 双向绑定 原理

### 概念

vue 双向数据绑定是通过 **数据劫持** 结合 **发布订阅模式**的方式来实现的， 也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变

### vue 使用的底层原理

##### Object.defineProperty()

### 语法

```javascript
Object.defineProperty(对象,属性名,options)
// obj
	// 需要操作的对象
// prop
	// 需要新增或者修改的属性
// options
	// 配置的数据描述/操作符
```

### 数据描述/操作符

| `configurable` | `enumerable` | `value` | `writable` | `get`  | `set`  |        |
| -------------- | ------------ | ------- | ---------- | ------ | ------ | ------ |
| 数据描述符     | 可以         | 可以    | 可以       | 可以   | 不可以 | 不可以 |
| 存取描述符     | 可以         | 可以    | 不可以     | 不可以 | 可以   | 可以   |

**`configurable`** 是否可以删除 默认false 如果设置为true 代表可以删除

**`enumerable `**是否能被循环到key，设置false不可以被循环，设置true可以被循环

**`value`** 默认值

**`writable`** 值能否修改 true可以被修改 false不能被修改

**`get`** getter函数

**`set`** setter函数，有一个默认的参数，指的就是最新的值（赋值符号后面的值）

### 注意点

get里面不能直接返回对象内部的属性，否则会造成死循环，同理，set也是一样，不能直接操作对象内部的属性进行赋值

需要声明创建一个临时变量进行保存，之后所有的操作都是操作临时变量为准



# 面试题

1.v-model 原理

2.vue 中双向绑定的原理是什么

3.能不能给我讲一讲 **Object.defineProperty()**

4.v-if 和 v-for 哪个优先级高？v-if和v-for一般能一起用吗 有没有什么缺点

5.v-for 如果不设置 :key会发生什么？为什么一定要设置

6.为什么组件或混入里面data是个函数？