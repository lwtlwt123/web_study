# 课程目标

- 学会掌握并使用计算属性（computed）
- 学会掌握并使用侦听器（watch）
- 学会使用vue的全局过滤器
- 学会使用vue的自定义定义



# 计算属性（computed）

### 概念

之前我们用的都是模板语法{{}}，这个语法虽然方便，可以进行简单的逻辑运算，他比较冗余，每次都会重新计算一次结果，当无数个结果都相同的时候，不会去优化内存，所以容易造成模板过重或不宜维护

### 解决

- 使用函数的方式解决，可以解决模板过重和难以维护的问题，但是内容相同的情况下，不好反复利用，浪费内存
- 使用计算属性方式解决，可以解决模板过重和难以维护的问题，还可以解决函数的浪费内存的问题
  - 因为计算属性是普通函数的**升级版**，相较于普通函数来说，它具有**缓存性**（每次计算出结果以后，将结果进行缓存，如果后面的结果和缓存的结果一致，直接使用就可以）

### 面试怎么说

计算属性是普通函数的升级版，具有缓存性，当发生**多对一**条件的时候，我们就考虑使用计算属性或者结果较为统一的时候，也可以考虑使用计算属性

### 语法

```javascript
// 简单使用
vm = {
    data:{},
    methods:{},
    ...,
    computed:{
    	计算属性名(){
            return ''
        }
}
}
// 使用计算属性的getter和setter
vm  = {
    ...,
    computed:{
    	计算属性名:{
    		get:function(){
                return ''
            },
            set:function(newVal){
                // 对不同的变量进行赋值操作
            }
		}
	}
}
```

# 侦听器(watch)

### 概念

可以监控data中任意一个变量的值的变化，当值产生变化的时候即被侦听器立马捕获到，我们可以在侦听器内处理值变化带来的各种逻辑代码（譬如搜索、开关、输入搜索内容，结果立马出来...）

### 语法

```javascript
// 非深度监控
vm = {
    ...,
    watch:{
    	需要监控的值([newVal,oldVal]){}
	},
    watch:{
        需要监控的值:{
            handler:function([newVal,oldVal]){}
        }
    }
}
// 深度监控
vm = {
    watch:{
        需要监控的值:{
            deep:true, // 此属性代表开启深度监控，如果对象和数组开启深度监控后，newVal和oldVal完全相同
            			// 因为他们是复杂类型，引用地址完全一致
            handler:function([newVal,oldVal]){}
        }
    }
}
```

### 案例 - 模仿百度智能提示

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
        <input type="text" v-model="keywords" placeholder="请输入游戏名查询">
        <ul>
            <li v-for="(item,index) in tmp_list" :key="index">{{item}}</li>
        </ul>
    </div>
    <script>
        var vm = new Vue({
           el:'#app',
           data:{
               keywords:'',
               search_list:[
                   '腾讯王者荣耀',
                   '腾讯刺激战场',
                   '网易第五人格',
                   '网易哈利波特',
                   '网易阴阳师'
               ],
               tmp_list:[]
           },
           methods:{},
           watch:{
            keywords(newVal){
                if (newVal == "") {
                    this.tmp_list = []
                    return
                }
                // 将符合条件的结果给tmp_list
                this.tmp_list = this.search_list.filter(item => {
                    return item.indexOf(newVal) !== -1
                })
            }
           }
        });
    </script>
</body>

</html>
```

# Vue的过滤器

### 概念

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式**

### 语法

```javascript
// 全局创建过滤器
Vue.filter(过滤器名称,function(value,[params]){
    return 处理的格式
})
// 局部创建过滤器
vm = {
    ...,
    filters:{
    	过滤器的名称:function(value,[params]){
            return 处理的格式
        }
	}
}
```

### 注意点

1. 当全局和局部有相同的过滤器的时候，最终会用局部的过滤器（就近原则）
2. 局部过滤器只能用在el对应的dom范围内，不能跨el的dom去使用
3. 全局过滤器可以el监控的dom范围使用，因为所有的viewmodel都会有全局过滤器的此功能

### 案例 - 格式化日期

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
        <input type="text" v-model="uname">
        <hr>
        <h3>{{ uname }}</h3>
        <h3>{{ uname | myToUpper}}</h3>
        <hr>
        {{ today }}
        {{ today | myToDate}}
        <br>
        {{ today | myToDate2('-')}}
    </div>

    <div id="app2">
        <!-- {{ uname | myToUpper}} -->
        {{today | myToDate}}
    </div>
    <script>

        // 全局过滤器
        Vue.filter('myToDate2', function (value, type) {
            return `全局：${value.getFullYear()}${type}${value.getMonth() + 1}${type}${value.getDate()}`
        })

        const vm2 = new Vue({
            el:'#app2',
            data:{
                uname:'jack',
                today:new Date
            }
        })

        var vm = new Vue({
            el: '#app',
            data: {
                uname: '',
                today: new Date
            },
            methods: {},
            // 局部过滤器
            filters: {
                // 作用：把第一个字母转为大写   就近原则
                myToUpper: function (value) {
                    return value.charAt(0).toUpperCase() + value.slice(1)
                },
                myToDate: function (value) {
                    return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`
                },
                myToDate2:function(value,type){
                    return `局部：${value.getFullYear()}${type}${value.getMonth() + 1}${type}${value.getDate()}`
                }
            }
        });
    </script>
</body>

</html>
```

# 自定义指令

### 概念

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令，说直白点就是可以自己写v-xxx的语法

### 语法

#### 创建全局指令

```javascript
Vue.directive('change',{
    bind(){ // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
        console.log('执行了 bind');
    },
    inserted(el){ // 被绑定元素插入父节点时调用 在自定义指令的元素出现在dom中的时候,有默认参数，默认参数是绑定该自定义指令的原生js的dom对象
        console.log('执行了 inserted');
        console.log(el);
    },
    update(){ // 当自定义指令所在的元素发生更新的时候调用（多次执行，只要值发生改变就执行）
        console.log('执行了 update');
    },
    unbind(){ // 只调用一次，指令与元素解绑时调用
        console.log('执行了 unbind');
    }
})

```

#### 创建局部指令

```javascript
vm = {
    ...,
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
}
```



### 案例 - 

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
        <!-- 自动聚焦的功能 v-focus -->
        <input type="text" v-focus>
        <!-- 自定义字体颜色的功能 v-color="red/orange/pink" -->
        <h1 v-color2>显示红色</h1>
        <h1 v-color="'orange'">显示橘黄色</h1>
        <h1 v-color="'skyblue'">显示天蓝色</h1>
    </div>
    <script>
        Vue.directive('focus',{
            inserted:function(el){
                el.focus()
            }
        })
        Vue.directive('color',{
            inserted:function(el,otherColor){
                el.style.color = otherColor.value
            }
        })
        Vue.directive('color2',{
            inserted:function(el){
                el.style.color = "red"
            }
        })

        var vm = new Vue({
           el:'#app',
           data:{
           },
           methods:{}
        });
    </script>
</body>

</html>
```

