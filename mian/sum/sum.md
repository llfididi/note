# sum

## key

### 作用

key 是给每一个 vnode 的唯一 id,可以`依靠key`,更`准确`, 更`快`的拿到 oldVnode 中对应的 vnode 节点。

### 1. 更准确

因为带 key 就不是`就地复用`了，在 sameNode 函数 `a.key === b.key`对比中可以避免就地复用的情况。所以会更加准确。

### 2. 更快

利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map 会比遍历更快。)

## map to parseInt

### 两个函数的定义

map(value: string, index: number, array: string[])

第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引，第三个是被 map 的数组

parseInt（string: string, radix?: number）

第一个表示被处理的值（字符串），第二个表示为解析时的基数（几进制）

所以 ['1','2','3'].map((o,p)=>{parseInt}) // [ 1, NaN, NaN ]

## 防抖和节流

防抖：在一段时间内连续执行，只执行最后一次的函数

节流：稀释函数的执行频率

## Map

### map

键值对格式，集合

### WeakMap

对象作为键名，不能便利

### Set

成员不能重复，类似数组

### WeakSet

成员为对象，弱引用（储存 dom，避免泄露）

## 深度优先，广度优先

并写出他们的 clone 方法

## 异步

```js
//请写出输出内容
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

在执行 async1 时其他宏任务（如：console.log('script end')）在执行，await 只能保证`console.log('async1 end')`在`await async2()`执行后，而不代表整个宏任务等待 async2 执行完毕。

在每次执行完宏任务后都会检测是否存在微任务并执行。

`promise`构造函数是同步执行的`then` 是微任务。

## 数组排序

sort((a,b)=>a-b) 升序排

```js
const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];

const arrToFlat = (arr) => {
  const end = new Set();
  while (arr.length >= 1) {
    const thiszhan = arr.pop();
    if (typeof thiszhan === "number") {
      end.add(thiszhan);
      continue;
    }

    thiszhan.forEach((a) => {
      if (typeof a === "number") {
        end.add(a);
      } else {
        arr.unshift(a);
      }
    });
  }
  return [...end].sort((a, b) => a - b);
};

console.log(arrToFlat(arr));
```

## typeof

> typeof 操作符返回一个字符串，表示未经计算的操作数的类型

下表总结了 `typeof` 可能的返回值。有关类型和原始值的更多信息，可查看 [JavaScript 数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures) 页面。

| 类型                                                                                                          | 结果                                                                                                           |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| [Undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)                                      | `"undefined"`                                                                                                  |
| [Null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)                                                | `"object"` (见[下文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#null)) |
| [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)                                          | `"boolean"`                                                                                                    |
| [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)                                            | `"number"`                                                                                                     |
| [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)(ECMAScript 2020 新增)                      | `"bigint"`                                                                                                     |
| [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)                                            | `"string"`                                                                                                     |
| [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) (ECMAScript 2015 新增)                     | `"symbol"`                                                                                                     |
| 宿主对象（由 JS 环境提供）                                                                                    | _取决于具体实现_                                                                                               |
| [Function](https://developer.mozilla.org/zh-CN/docs/Glossary/Function) 对象 (按照 ECMA-262 规范实现 [[Call]]) | `"function"`                                                                                                   |
| 其他任何对象                                                                                                  | `"object"`                                                                                                     |

### instanceof

arr instanceof Number // false
arr instanceof Array // true
arr instanceof Object // true

### Array.isArray

typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';

### Object.prototype.toString.call

Object.prototype.toString.call([123,343]) // [object Array]

## ？创建一个 new

## ？有关 tcp http 协议

## 重绘和回流

回流引起重绘，重绘不一定会引起回流

## ？观察者模式，订阅者模式

实现一下？

## 迭代实现 flatten

```js
// 迭代
const flatten = (arr) => {
  while (arr.some((arritem) => Array.isArray(arritem))) {
    arr = [].concat(...arr);
  }
  return arr;
};

// 递归
const flatten = (array) =>
  array.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur],
    []
  );

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
console.log(flatten(arr));
```

## 隐式转换

```js
var a = {
  i: 1,
  valueOf() {
    return a.i++;
  },
};

let a = [1, 2, 3];
a.toString = a.shift;

if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```

## 定时器

```js
for (var i = 0; i < 10; i++) {
  setTimeout(
    (i) => {
      console.log(i);
    },
    0,
    i
  );
}
```

## push

> `push` 方法根据 `length` 属性来决定从哪里开始插入给定的值。如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。
>
> 当调用该方法时，新的 `length` 属性值将被返回。

```js
var obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
console.log(obj);
```

## 埋点请求

```js
var thisPage = location.href;
var referringPage = document.referrer ? document.referrer : "none";
var beacon = new Image();
beacon.src =
  "http://www.example.com/logger/beacon.gif?page=" +
  encodeURI(thisPage) +
  "&ref=" +
  encodeURI(referringPage);
```

## 自定义数字原型

```js
Number.prototype.add = function (addData) {
  return this.valueOf() + addData;
};

Number.prototype.minus = function (addData) {
  return this.valueOf() - addData;
};

console.log((5).add(3).minus(2));
```

## 连续赋值的问题

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x) 	// undefine 
console.log(b.x)  // {n:2}

```

## 设计一个类
> LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');

> Hi I am Tony

> 等待了5秒...

> I am eating lunch

> I am eating dinner

> 等待了10秒...

> I am eating junk food

```js

class LazyManClass {
  constructor(name){
    this.queue = [] // 运行数组
    console.log(`Hi I am ${name}`);
    setTimeout(()=>{
      this.next()

    },0)
  }
  eat(foot){
    const fn = ()=>{
      console.log(`eating ${foot}`);
      this.next()
    }
    this.queue.push(fn)
    return this

  }
  sleepFirst(time){
    const fn = ()=>setTimeout(()=>{
      console.log(`等待了 ${time}秒`);
      this.next()
    },time)
    this.queue.unshift(fn)
    return this
  }
  sleep(time){
    const fn = ()=>setTimeout(()=>{
      console.log(`等待了 ${time}秒`);
      this.next()
    },time)
    this.queue.push(fn)
    return this

  }
  next(){
    const fn = this.queue.shift()
    fn && fn()
    
  }
}

const LazyMan = (name)=> new LazyManClass(name)
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');

```

## display:none visibility:hidden opacity:0

结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见

## Promise.prototype.finally()
在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。

## 随机数生成 && 生成固定长度的循环
`floor` 向下取整
`ceil` 向上取整

```js
// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
initArr.sort((a,b) => { return a - b });
initArr = [...(new Set(initArr))];

```
## HML(hot module replacement)
1.当修改了一个或多个文件；
2.文件系统接收更改并通知webpack；
3.webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。
https://zhuanlan.zhihu.com/p/30669007


## 数组查找数据1或10000
数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

得出结论：消耗时间几乎一致，差异可以忽略不计

## 隐式转换
下面的例子除了字符串和symbol都会被隐式转换（tostring）。
```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);

console.log({key:'234'}.toString());

// c
// b
// c
// [object Object]

```

## vue渲染生命周期
加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
父beforeUpdate->父updated
销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 反转字符串
先转化为数组，`reverse`反转数组，`join`合并数组。
string.split('').reverse().join('')

