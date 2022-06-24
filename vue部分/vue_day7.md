# 课程目标

VUEX 初体验

VUEX 简化函数

VUEX 模块化

VUEX 模块化配合简化函数

安装&使用脚手架（完全新的开发模式 开发习惯）

卖座电影项目起步



# VUEX初体验

### 什么是vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化（一个状态的仓库，有了这个仓库，所有的组件都可以使用此仓库里面的数据）

### vuex能做什么

解决当组件层级越多越多，或者页面越来越多，当组件需要通信，或者页面都需要统一的值的时候，就不太方便开发了（代码冗余、性能不高），这时候就需要使用 vuex 数据仓库 来解决以上的问题

### 什么时候用

当层级开发多起来，或者大部分页面都需要进行某个数据的时候的时候，才考虑使用 vuex 因为vuex会让程序变的复杂

### 怎么使用vuex （非脚手架模式下）

1. 安装 vuex （cnd）
2. 创建 vuex 的对象 store
3. 在 store 里面进行公共数据的定义和存取
4. 激活 vuex 
5. 在需要使用 vuex 的地方 通过 **$store.state.xxx** 获取公共数据即可

### vuex 五属性含义

**state** 

vuex 存储公共变量的仓库，所以需要被共享的数据都放在 state 里面 就把它当成是组件内部的 data 

**mutations** 

因为state当中的值是可以被修改的，所以必须通过**mutations**来进行修改，不能直接修改 state 当中的值 可以理解为就是一     个事件，这个事件有一个默认参数 参数指向 state 通过此参数来修改 state 当中的值，然后 **mutations** 不能自我触发，必须通过 store.commit()来进行触发 **mutations** 

**actions**

因为state当中的值是可以被修改的，所以必须通过**actions**来进行修改，它支持写**异步代码**，最重要的就是它无法直接修改state，只能通过 **mutations** 进行state中值的修改，所以他也有一个默认参数，指向store的对象名称叫做context，通过context.commit()进行触发，真正触发actions方法是通过 store.dispatch()

**getters**

可以把state当中的值进行任何组合，变成新的值向外部返出并使用，可以简单理解为是是vuex的 计算属性 

**modules**

实现 vuex 的模块化 让不同的模块可以被 vuex 结合使用

### 简化函数

...Vuex.mapState([] || {})

...Vuex.mapActions([] || {})

...Vuex.mapMutations([] || {})

...Vuex.mapGetters([] || {})



# 安装&使用脚手架 （vue-cli)

### 安装步骤

下载安装 npm install -g @vue/cli  是全局安装 安装的是 命令行 工具

如何检测   vue -V 如果看到版本号就代表安装成功了

### 使用 脚手架 创建项目

#### 命令创建

1.在对应的文件夹内 打开 命令行工具 （cmd、powershell）

2.输入命令 vue create 项目名

​	询问是否使用 **淘宝镜像** 

​	Please pick a preset: (Use arrow keys)

​	Default ([Vue 2] babel, eslint)   vue2 项目的预设

​	Default (Vue 3 Preview) ([Vue 3] babel, eslint)  vue3 项目预设

​	**Manually select features** 自定义选择

---------------------------------------------------------------------------------------------------------

Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
> ( * ) Choose Vue version 选择vue的版本
> ( * ) Babel 转换JavaScript 的库
> ( ) TypeScript 强类型的 JavaScript 语言
> ( ) Progressive Web App (PWA) Support 负责写 App 
> ( * ) Router 路由
> ( * ) Vuex  vuex
> ( * ) CSS Pre-processors  css预处理器（less，sass）
> () Linter / Formatter （代码检查）
> ( ) Unit Testing 
> ( ) E2E Testing
>
>------------------------------------------------------------------------------------------------------------
>
>Choose a version of Vue.js that you want to start the project with (Use arrow keys)
>> 2.x vue2
>> 3.x  vue3
>>
>> -------------------------------------------------------------------
>>
>> Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) n
>>
>> ---------------------------------------------------------
>>
>> Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
>> > Sass/SCSS (with dart-sass)
>> > Sass/SCSS (with node-sass)
>> > *Less
>> > Stylus
>> >
>> > -----------------------------------------------------------------------------
>> >
>> > Where do you prefer placing config for Babel, ESLint, etc.?
>> >   In dedicated config files
>> >
>> > * In package.json 所有的第三方库
>> >
>> >   -------------------------------------------------------------------
>> >
>> >   Save this as a preset for future projects? (y/N) 是否保存当前的预设

#### UI界面化创建

