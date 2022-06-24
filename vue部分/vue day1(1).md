# 课程目标

- 完成购物车的完整案例
- 使用vue动态绑定class与style
- 学会使用代码片段
- 学会使用fetch和axios完全前后端的交互（xhr/ajax）



# 案例 - 购物车

![image-20211214134346822](\img\image-20211214134346822.png)

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <style>
        .quantity {
            width: 50px;
            text-align: center;
        }

        .price {
            color: red;
        }

        .cart_empty {
            width: 600px;
            margin: 50px auto;
            color: red;
        }

        .cart_empty span {
            font-size: 14px;
            color: #fff;
            padding: 5px 8px;
            background-color: red;
            border-radius: 8px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 购物车的内容模块 -->
        <div v-show="carts.length > 0" class="carts">
            <table border="1">
                <tr>
                    <td>
                        <!-- 
                            如果想要拿到checkbox || radio 的选中状态的话(v-model)
                            那么就不能用click方法，因为click方法会在数据被修改前触发
                            这时候需要使用另一个方法，change
                         -->
                        <input v-model="isChkAll" type="checkbox" @change="chkAllFn">
                    </td>
                    <td>购物车编号</td>
                    <td>商品名称</td>
                    <td>商品单价</td>
                    <td>商品数量</td>
                    <td>单个商品总价</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in carts" :key="item.cart_id">
                    <td>
                        <input type="checkbox" v-model="select_carts" :value="item">
                    </td>
                    <td>{{item.cart_id}}</td>
                    <td>{{item.goods_name}}</td>
                    <td class="price">￥{{item.price}}</td>
                    <td>
                        <button @click="changeQuantity('sub',item)">-</button>
                        <input @input="filterQuantityVal(index)" class="quantity" type="text" v-model="item.quantity">
                        <button @click="changeQuantity('add',item)">+</button>
                    </td>
                    <td class="price">￥{{item.quantity * item.price}}</td>
                    <td>
                        <!-- 
                            目前因为我们没有调用API (数据库存储)
                            暂时删除集合或数组都是通过index删除 后面写项目了
                            删除对应的列表等等，都是通过唯一的key去删
                         -->
                        <button @click="delGoods(index)">删除</button>
                    </td>
                </tr>
            </table>
            <h3>当前购物车共选中<span style="color: red;">{{select_carts.length}}</span>件商品</h3>
            <hr>
            <h3>当前购物车总金额：<span class="price">￥{{calcTotalPrice()}}</span></h3>
        </div>
        <!-- 购物车为空的提示 -->
        <div v-show="carts.length === 0" class="cart_empty">
            <h3>当前购物车内无商品</h3>
            <span>去购买</span>
        </div>
        <div class="buy_box">
            <table border="1">
                <tr>
                    <td>商品编号</td>
                    <td>商品名称</td>
                    <td>商品单价</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in buy_carts_list" :key="item.cart_id">
                    <td>{{item.cart_id}}</td>
                    <td>{{item.goods_name}}</td>
                    <td class="price">￥{{item.price}}</td>
                    <td>
                        <button @click="addCart(index)">添加到购物车</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                // 购物车的数据
                carts: [
                    { cart_id: 1, goods_name: 'iPhone 13 Pro Max', quantity: 1, price: 8999 },
                    { cart_id: 2, goods_name: 'iMac 2021', quantity: 1, price: 11998 },
                    { cart_id: 3, goods_name: 'Huawei P50 Pro', quantity: 1, price: 7699 }
                ],
                // 当前被选中的商品
                select_carts: [],
                // 记录当前是否全选
                isChkAll: false,
                // 提供购买的商品列表
                buy_carts_list: [
                    { cart_id: 4, goods_name: '康师傅方便面', price: 5 },
                    { cart_id: 5, goods_name: '卫龙辣条', price: 4 },
                    { cart_id: 6, goods_name: '海底捞自热火锅', price: 35.5 }
                ]
            },
            methods: {
                // 过滤数量的值
                filterQuantityVal(index) {
                    let quantity = this.carts[index].quantity
                    // jacka -> jick   jack.replace('a','i')
                    // 想把数量转成字符串，然后用正则去替换掉非法字符
                    quantity = quantity.toString().replace(/\D/g, "")
                    this.carts[index].quantity = quantity
                },
                // 修改购物车数量的方法
                changeQuantity(type, item) {
                    if (type === 'add') {
                        if (item.quantity === 9) {
                            alert('最多购买9件')
                            return
                        }
                        item.quantity++
                    } else {
                        if (item.quantity === 1) {
                            alert('最少购买1件')
                            return
                        }
                        item.quantity--
                    }
                },
                // 循环购物车，算总价的方法
                calcTotalPrice() {
                    let totalPrice = 0
                    for (const item of this.select_carts) {
                        totalPrice += item.quantity * item.price
                    }
                    return totalPrice
                },
                // 删除购物车的方法
                delGoods(index) {
                    this.carts.splice(index, 1)
                },
                // 全选的方法
                chkAllFn() {
                    /*
                        思考？？
                            + 当我重新点全选按钮的时候 分情况？？
                                - 如果全选chk没有选中，代表子项全部选中
                                - 如果全选chk已经选择，代表子项全部取消选中
                            + 需要记录一个全选状态？？ 需要
                    */
                    if (this.isChkAll == false) {
                        // 子项全部取消选择
                        this.select_carts = []
                    } else {
                        // 子项全部选择
                        this.select_carts = this.carts
                    }
                },
                // 加入购物车的方法
                addCart(index) {
                    /*
                        1.获取到需要添加到购物车的商品
                        2.将该商品添加到购物车的数组内即可
                        进阶：
                            + 每次添加到购物车的数组之前，我们先要检查一次被添加的商品是否已经存在
                                - 不存在 -> 直接push
                                - 存在 -> 修改数量
                    */
                    // 深拷贝
                    let addGood = JSON.parse(JSON.stringify(this.buy_carts_list[index]))
                    // 浅拷贝
                    // index >= 0 代表有   == -1 代表没有
                    let fIndex = this.carts.findIndex(item => {
                        return item.cart_id === addGood.cart_id
                    })

                    if (fIndex === -1) {
                        //    let addGood = this.buy_carts_list[index]
                        // 因为源数据内没有数量的列，所以需要我们手动添加此列
                        // 浅拷贝 原来的对象拿过来 往里面添加了一个数量
                        addGood.quantity = 1
                        this.carts.push(addGood)
                    }else{
                        this.carts[fIndex].quantity++
                    }
                }
            }
        })
    </script>
</body>

</html>
```



# vue动态绑定class和style

### 概念：

因为后续开发中，很多的样式需要切换，需要做一些UI交互，所以我们必须要操作class和style的数据

### 思考：

问题：一般来说 网页中的style或者class是固定还是可变的

答案：有固定的，但是也有可变的，因为可变的才能实现网页的动态交互

问题：一般来说 网页中的style或者class是单个还是多个？ 

答案：多个使用  style="color:red;font-size:12px;..."  class="fGreen bgRed"

### 语法

前置总结：总结出无论是style还是class 都是有可能是单个或者多个的，所以我们可以用数组、对象来存储style或class

在vue使用，使用v-bind="data的值"绑定属性  现在绑定的是style或者class v-bind:style||class 是一个升级版

```javascript
----------绑定class-----------
// 绑定单个class
	// 直接使用v-bind:class=“data中的值即可”
// 绑定多个class(数组)
	// 数组内的值就是需要绑定的class名称
// 绑定多个class(对象)
	// 对象的key是需要绑定的class名称，value代表是否使用
----------绑定style----------
// 绑定多个style（数组）
	// 数组中每个对象就是需要绑定的style属性，对象中的key就是属性名，value就是属性值
// 绑定多个style（对象）
	// 对象中的key就是属性名，value就是属性值
```

# 代码片段

### 需求

​	举例：目前我们写vue的项目，每次都需要重复的引入库 、 创建#app节点 、创建script节点 、创建vm并初始化

​			    那么开发起来效率就会比较低？如何解决？代码片段

### 概念

​	 就是一个代码片段，被你自己用短的命令封装起来了，想用的时候就用短命令快速执行即可

### 实现

​	1、ctrl+shift+p 打开配置菜单

​	2、在菜单输入栏内敲 snip

​    3、在菜单键输入html.json (*** 第一次配置html的时候，不能有.json文件)



# fetch的使用

### 概念

​	fetch是javascript全新的请求api的方式，他是基于 xmlhttprequest 和 promise 技术综合而来的全新请求方式

### 使用的注意点

​	因为是JavaScript提供的，所以不需要引入任何第三方库

### 语法

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
        <button @click="getLocalData">使用fetch请求本地json文件</button>
        <ul>
            <li v-for="(item,index) in localData" :key="index">
                {{item.song_name}} __ {{item.singer}} __ {{item.alubm}}
            </li>
        </ul>
        <button @click="getOnlineData">使用fetch请求远程数据</button>
        <ul>
            <li v-for="(item,index) in onlineData" :key="item.filmId">
                <img :src="item.poster" alt="">
                <h5>{{item.name}}</h5>
            </li>
        </ul>
    </div>
    <script>
        var vm = new Vue({
           el:'#app',
           data:{
               localData:[],
               onlineData:[]
           },
           methods:{
            // 请求本地json
            getLocalData(){
                /*
                    fetch(url,{
                        method:'get/post',
                        body:'uname=angela&age=18',
                        headers:{

                        }
                    })
                */
                fetch('./data/song.json')
                // !!!!切记:fetch第一个then拿到的是response的对象，并不是数据
                // 在第一个then里面需要 .json()
                .then(res => res.json())
                .then(res => {
                    this.localData = res.data.list
                })
                // const xhr = new XMLHttpRequest()
                // xhr.open('GET','./data/song.json')
                // xhr.send()
                // xhr.onreadystatechange = function(){
                //     if (xhr.readyState === 4) {
                //         if (xhr.status === 200) {
                //             console.log(xhr.response);
                //         }
                //     }
                // }
            },
            // 请求在线接口（详细讲）
            getOnlineData(){
                fetch('https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6926667',{
                    headers:{
                        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16179368764092240544661505","bc":"110100"}',
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                })
                .then(res => res.json())
                .then(res => {
                    this.onlineData = res.data.films
                })
            },
           }
        });
    </script>
</body>

</html>
```

![image-20211214151028610](\img\image-20211214151028610.png)

问题：以上截图出现的错误代表请求出现了跨域

### 什么是跨域

概念：跨域是***同源***政策发生的不匹配的情况 同源？当请求方式（协议）、端口、域名都完全一致的时候，代表是同源 否则代表非同源

案例

​		  请求方 http://www.baidu.com    请求 http://www.baidu.com?search=angela  不会产生跨域

​          请求方http://127.0.0.1:5500/3.fetch.html   请求 https://127.0.0.1:5500/3.fetch.html 不符合同源政策 请求方式，会产生跨域

​          请求方https://192.0.0.1:5500/3.fetch.html   请求 https://127.0.0.1:5500/3.fetch.html 不符合同源政策 域名不同，会产生跨域

​          请求方https://127.0.0.1:5511/3.fetch.html   请求 https://127.0.0.1:5500/3.fetch.html 不符合同源政策 端口不同，会产生跨域

​          请求方https://127.0.0.1:5500/3.fetch.html?name=angela   请求 https://127.0.0.1:5500/3.fetch.html 

​          符合同源政策，不会产生跨域 参数不参与同源政策的判断

### 怎么解决跨域

​		使用CORS插件 最简单 只要安装即可

​		使用vue-cli脚手架进行代理

​        使用JSONP



# axios的使用

### 概念:

Axios，基于 Promise 的 HTTP 客户端，可以工作于浏览器中，也可以在 node.js 中使用

### 使用步骤

1、先去下载、使用CDN的方式安装axios

2、通过axios的函数或者对象的形式请求API完成数据的获取

### axios使用方式

#### 函数形式使用

```javascript
// 第一种方式
axios(url,{
    method:'get/post/put/delete',
    headers:{
        // 头部信息
    },
    params:{
        // 参数 参数以key和value的形式保存
    }
})
.then(res => res.data)
.then(res => {res})


// 第二种使用方式
axios({
    url:'url',
    ...
})
```



#### 对象形式使用

```javascript
// 第一种使用方式
axios.get
axios.post
axios.put
axios.delete(url,{
    headers:{
        // 头部信息
    },
    params:{
        // 参数 参数以key和value的形式保存
    }
})
.then(res => res.data)
.then(res => {res})
```

### axios的全局配置（默认配置）

概念：给axios添加统一的超时时间、请求地址、请求头信息等

```javascript
axios.defaults.timeout = 毫秒
axios.defaults.baseURL = url
axios.defaults.henader[key] = val
```



#### 实例对象方式使用（综合了以上的方式的结果）

```javascript
const request = axios.create({
            timeout: 5000,
            baseURL: 'https://m.maizuo.com/gateway',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16179368764092240544661505","bc":"110100"}'
            }
        })
reqeust.xxx
request()
```

### axios的***拦截器***

概念：在axios发送请求之前和axios拿到数据（响应）之前分别进行一些操作

​			（加统一请求头信息。loading。根据状态码判断统一处理 404 401 403等情况）

```javascript
// 请求拦截器
        axios.interceptors.request.use(function (config) {
            // 在return之前，对请求做一些处理（loading的开始... 加token）
            // 在所有axios的请求之前，再加一个headers的配置，叫做token  值是web26
            // config.headers["token"] = 'web26'
            document.getElementsByClassName('cover')[0].style.display="block"
            return config;
        }, function (error) {
            // 请求失败的处理
            return Promise.reject(error);
        });

        // 响应拦截器
        axios.interceptors.response.use(function (response) {
            // 在响应之前，做一些处理（loading的结束... 判断状态码...） 404 调到404专属页面   401 403 没有权限
            document.getElementsByClassName('cover')[0].style.display="none"
            return response;
        }, function (error) {
            // 响应失败的处理
            return Promise.reject(error);
        });
```

留心：如果使用的是实例化的axios方式，那么拦截器就需要挂在实例对象身上，否则挂在axios身上