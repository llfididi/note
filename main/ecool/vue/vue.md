## proxy 替代 defineProperty

### defineProperty

`Object.defineProperty()`静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

```js
// 小试牛刀
let person = {};
let personName = "lihua";

//在person对象上添加属性namep,值为personName
Object.defineProperty(person, "namep", {
  //但是默认是不可枚举的(for in打印打印不出来)，可：enumerable: true
  //默认不可以修改，可：wirtable：true
  //默认不可以删除，可：configurable：true
  get: function () {
    console.log("触发了get方法");
    return personName;
  },
  set: function (val) {
    console.log("触发了set方法");
    personName = val;
  },
});

//当读取person对象的namp属性时，触发get方法
console.log(person.namep);

//当修改personName时，重新访问person.namep发现修改成功
personName = "liming";
console.log(person.namep);

// 对person.namep进行修改，触发set方法
person.namep = "huahua";
console.log(person.namep);

/** ------------------------------------------ */

// 实现一个响应式函数
let person = {
  name: "",
  age: 0,
};
function defineProperty(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`访问了${key}属性`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性被修改为${newVal}了`);
      val = newVal;
    },
  });
}

// 实现一个遍历函数Observer
function Observer(obj) {
  Object.keys(obj).forEach((key) => {
    defineProperty(obj, key, obj[key]);
  });
}
Observer(person);
// console.log(person.age);
person.age = 18;
// console.log(person.age);

let arr = [1, 2, 3];
let obj = {};
//把arr作为obj的属性监听
Object.defineProperty(obj, "arr", {
  get() {
    console.log("get arr");
    return arr;
  },
  set(newVal) {
    console.log("set", newVal);
    arr = newVal;
  },
});
console.log(obj.arr); //输出get arr [1,2,3]  正常
obj.arr = [1, 2, 3, 4]; //输出set [1,2,3,4] 正常
obj.arr.push(3); //输出get arr 不正常，监听不到push

/** ------------------------------------------ */

// 深度监听一个对象

function defineProperty(obj, key, val) {
  //如果某对象的属性也是一个对象，递归进入该对象，进行监听
  if (typeof val === "object") {
    observer(val);
  }
  Object.defineProperty(obj, key, {
    get() {
      console.log(`访问了${key}属性`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性被修改为${newVal}了`);
      val = newVal;
    },
  });
}

// 递归停止
function Observer(obj) {
  //如果传入的不是一个对象，return
  if (typeof obj !== "object" || obj === null) {
    return;
  } // for (key in obj) {
  Object.keys(obj).forEach((key) => {
    defineProperty(obj, key, obj[key]);
  }); // }
}
```

### proxy

`Proxy` 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
//定义一个需要代理的对象
let person = {
  age: 0,
  school: "xdu",
};
//定义handler对象
let hander = {
  get(obj, key) {
    console.log("触发了get"); // 如果对象里有这个属性，就返回属性值，如果没有，就返回默认值66
    return key in obj ? obj[key] : 66;
  },
  set(obj, key, val) {
    console.log("触发了set");
    obj[key] = val;
    return true;
  },
};
//把handler对象传入Proxy
let proxyObj = new Proxy(person, hander);

// 测试get能否拦截成功
console.log(proxyObj.school); //输出：触发了get xdu
console.log(proxyObj.name); //输出：触发了get 66

// 测试set能否拦截成功
proxyObj.age = 18; // 输出：触发了set
console.log(proxyObj.age); //输出： 触发了set 18

/** ------------------------------------------ */

let person = {
  age: 0,
  school: "xdu",
  children: {
    name: "小明",
  },
  arr: [1, 3, 4],
};
let hander = {
  get(obj, key) {
    console.log("触发了get");
    return key in obj ? obj[key] : 66;
  },
  set(obj, key, val) {
    console.log("触发了set");
    obj[key] = val;
    return true;
  },
};
let proxyObj = new Proxy(person, hander);

// 测试get
console.log(proxyObj.children.name); //输出：触发了get 小明
console.log(proxyObj.children.height); //输出：触发了get undefined
// 测试set
proxyObj.children.name = "菜菜"; // 触发了get
console.log(proxyObj.children.name); //输出: 触发了get 菜菜

console.log(proxyObj.arr); // 触发了get [1,3,4]
proxyObj.arr.push(2);
console.log(proxyObj.arr); // 触发了get [1,3,4,2]
```

## SSR 在 vue 中怎么实现

- 更快的首次渲染：由于服务器在响应请求时已经生成了完整的 HTML 页面，所以用户打开页面时可以立即看到内容，无需等待 JavaScript 下载和执行。
- 更好的搜索引擎优化（SEO）：搜索引擎爬虫能够抓取到完整的 HTML 页面，并且页面内容可直接被搜索引擎索引。
- 更好的用户体验：页面内容在服务器端渲染完成后即可展示，减少了白屏时间和加载等待。

- 需要注意的是，SSR 可能会增加服务器负载和响应时间，并且涉及到一些复杂性，例如处理路由、状态管理等。因此，在选择是否使用 SSR 时，需要根据项目需求和复杂性来权衡利弊。

- 使用 Express 或其他后端框架

## vue 的通信方式

### props & emit

### vuex

### Provide/Inject

解决多层的问题

```js
import { provide } from "vue";
provice(/* 注入名*/ "message", /*值*/ "hello!");

import { inject } from "vue";
const message = inject("message");

// 使用工厂函数来创建默认值
const value = inject("key", () => new ExpensiveClass());
```

### Event Bus

```js
// EventBus.js
import Vue from "vue";
export const eventBus = new Vue();

// ComponentA.vue

import { eventBus } from "./EventBus";

export default {
  name: "ComponentA",
  methods: {
    handleClick() {
      // 触发自定义事件
      eventBus.$emit("custom-event", data);
    },
  },
  created() {
    // 监听自定义事件
    eventBus.$on("custom-event", (data) => {
      console.log("Received data:", data);
    });
  },
};
```

## 破开 scope 对样式隔离的限制

Scoped Styles 是将样式限制在单个组件的作用域中，以确保样式不会被其他组件影响


```html
<!-- scoped特性 -->
<style>
  #app button[data-v-7ba5bd90] {
    background-color: red;
  }
</style>

<!------------------ -->

<!-- module特性 -->
<template>
  <button :class="$style.button" />
</template>

<style module>
  .button {
    color: red;
  }
</style>
<!-- 生成 -->
<style>
  .ComponentName__button__2Kxy {
    color: red;
  }
</style>

<button class="”ComponentName__button__2Kxy”"></button>
```

- 使用/deep/ 或 ::v-deep（Vue 2.x 中的别名）

```html
<style lang="scss" scoped>
  .a {
    /deep/ .b {
      /* ... */
    }
  }
</style>

<style lang="scss" scoped>
  .a {
    ::v-deep .b {
      /* ... */
    }
  }
</style>
```

- 使用全局样式（以在 <style> 标签外部或使用 @import 引入全局样式文件，这样样式将不受作用域限制。）

- 使用类名继承（在子组件的 <style> 标签中使用 @extend 来继承父组件或其他组件的样式，这样可以打破作用域限制。）

### 实现样式隔离
- scoped

- css modules

- css-in-js

## template模板 => render函数
- 解析模板（Vue会解析模板字符串，将其转化为抽象语法树（AST）。AST是一个表示模板结构和内容的树状数据结构。）
- 优化AST（Vue会对AST进行优化处理，以提升渲染性能。这包括标记静态节点、静态属性和静态文本等。）
- 生成渲染函数（利用优化后的AST，Vue会生成渲染函数。渲染函数是一个JavaScript函数，它接收一个上下文对象作为参数，并返回一个虚拟DOM树（VNode））
- 渲染虚拟DOM（当执行渲染函数时，它将生成一个新的虚拟DOM树。如果之前已经存在真实的DOM树，Vue将通过比较新旧VNode来计算最小的更新操作并应用在真实DOM上，从而进行局部更新，提高效率）
- 生成DOM（Vue将根据最新的VNode生成真实的DOM元素，并将其插入到页面中，完成渲染）

1. Vue的编译过程通常在构建时（比如使用Vue CLI）或运行时的初始阶段完成，以便在实际渲染组件时获得更好的性能。这样一来，渲染函数会被缓存并重复使用，而不需要每次重新编译模板。

2. Vue还可以使用render函数直接编写组件而不依赖于模板。这种情况下，手动编写的render函数会跳过模板解析和优化的步骤，直接生成渲染函数并进行渲染。这种方式可以在需要更高级别的动态和灵活性时使用。


## 实现v-model

