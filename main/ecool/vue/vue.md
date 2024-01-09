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

### attrs 和 listeners??

### ref

```html
<!-- vue2 -->
<template>
  <!-- 子组件 -->
  <TestComponent ref="TestComponent"></TestComponent>
</template>

<script>
  // 导入子组件
  import TestComponent from "./TestComponent";
  export default {
    components: {
      TestComponent,
    },
    mounted() {
      // 调用子组件方法
      this.$refs.TestComponent.show();
    },
  };
</script>

<!-- vue3 -->
<template>
  <!-- 子组件 -->
  <TestComponent ref="RefTestComponent"></TestComponent>
</template>

<script>
  // 导入子组件
  import TestComponent from "./TestComponent";
  import { ref } from "vue";
  import { nextTick } from "process";
  export default {
    components: {
      TestComponent,
    },
    setup() {
      // 定义一个对象关联上子组件的 ref 值（注意：这里的属性名必须跟子组件定义的 ref 值一模一样，否者会关联失效）
      const RefTestComponent = ref(null);
      // 延迟使用，因为还没有返回跟挂载
      nextTick(() => {
        RefTestComponent.value.show();
      });
      // 返回
      return {
        RefTestComponent,
      };
    },
  };
</script>

<!-- vue3 setup -->
<template>
  <!-- 子组件 -->
  <TestComponent ref="RefTestComponent"></TestComponent>
</template>

<script setup>
  // 导入子组件
  import TestComponent from "./TestComponent";
  import { ref } from "vue";
  import { nextTick } from "process";

  // 定义一个对象关联上子组件的 ref 值（注意：这里的属性名必须跟子组件定义的 ref 值一模一样，否者会关联失效）
  const RefTestComponent = ref(null);
  // 延迟使用，因为还没挂载
  nextTick(() => {
    RefTestComponent.value.show();
  });
</script>
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

- 使用全局样式（以在 `<style>` 标签外部或使用 @import 引入全局样式文件，这样样式将不受作用域限制。）

- 使用类名继承（在子组件的 `<style>` 标签中使用 @extend 来继承父组件或其他组件的样式，这样可以打破作用域限制。）

### 实现样式隔离

- scoped

- css modules

- css-in-js

## template 模板 => render 函数

- 解析模板（Vue 会解析模板字符串，将其转化为抽象语法树（AST）。AST 是一个表示模板结构和内容的树状数据结构。）
- 优化 AST（Vue 会对 AST 进行优化处理，以提升渲染性能。这包括标记静态节点、静态属性和静态文本等。）
- 生成渲染函数（利用优化后的 AST，Vue 会生成渲染函数。渲染函数是一个 JavaScript 函数，它接收一个上下文对象作为参数，并返回一个虚拟 DOM 树（VNode））
- 渲染虚拟 DOM（当执行渲染函数时，它将生成一个新的虚拟 DOM 树。如果之前已经存在真实的 DOM 树，Vue 将通过比较新旧 VNode 来计算最小的更新操作并应用在真实 DOM 上，从而进行局部更新，提高效率）
- 生成 DOM（Vue 将根据最新的 VNode 生成真实的 DOM 元素，并将其插入到页面中，完成渲染）

1. Vue 的编译过程通常在构建时（比如使用 Vue CLI）或运行时的初始阶段完成，以便在实际渲染组件时获得更好的性能。这样一来，渲染函数会被缓存并重复使用，而不需要每次重新编译模板。

2. Vue 还可以使用 render 函数直接编写组件而不依赖于模板。这种情况下，手动编写的 render 函数会跳过模板解析和优化的步骤，直接生成渲染函数并进行渲染。这种方式可以在需要更高级别的动态和灵活性时使用。

## 实现 v-model

### 基本的 v-model

```js
// 父组件
<template>
  <modelComp v-model="test"></modelComp>
</template>

<script setup>
import { ref, watch } from "vue";
import modelComp from "./components/model/modelComp.vue";
const test = ref("");
</script>

// modelComp.vue
<template>
  <input
    type="text"
    @input="emit('update:modelValue', $event.target.value)"
    :value="props.modelValue"
  />
</template>

<script setup>
const emit = defineEmits();
const props = defineProps({
  modelValue: String,
});
</script>

```

### 多个 v-model 绑定

```html
<!-- 父组件 -->
<modelComp
  v-model="test"
  v-model:test1="test1"
  v-model:test2="test2"
></modelComp>

<script setup>
  import { ref, watch } from "vue";
  import modelComp from "./components/model/modelComp.vue";
  const test = ref("");
  const test1 = ref("");
  const test2 = ref("");
</script>

<!-- modelComp.vue -->
<template>
    <input
    type="text"
    @input="emit('update:modelValue', $event.target.value)"
    :value="props.modelValue"
  />
    <input
    type="text"
    @input="emit('update:test1', $event.target.value)"
    :value="props.test1"
  />
    <input
    type="text"
    @input="emit('update:test2', $event.target.value)"
    :value="props.test2"
  />
</template>

<script setup>
  const emit = defineEmits([
    "update:modelValue",
    "update:test1",
    "update:test2",
  ]);
  const props = defineProps({
    modelValue: String,
    test1: String,
    test2: String,
  });
</script>
```

### v-model 修饰符

```html
<!-- 自vue提供的修饰符 -->
<modelComp
  v-model.trim="test"
  v-model:test1.lazy="test1"
  v-model:test2.trim.lazy="test2"
></modelComp>
<!-- 自定义的修饰符 -->
<modelComp v-model.a="test" v-model:test1.b.c="test1"></modelComp>

<!-- 子组件 -->
<template>
    <input type="text" @input="vModelInput" :value="props.modelValue" />
    <input type="text" @input="vModelTest1" :value="props.test1" />
</template>

<script setup>
  const emit = defineEmits(["update:modelValue", "update:test1"]);
  const props = defineProps({
    modelValue: String, //接受v-model的修饰符
    modelModifiers: {
      default: () => ({}),
    },
    test1: String, //接受v-model:test1的修饰符
    test1Modifiers: {
      default: () => ({}),
    },
  });

  const vModelInput = (e) => {
    let value = e.target.value;
    console.log(props.modelModifiers); //{a:true}
    if (props.modelModifiers.a) {
      //处理value值
    }
    emit("update:modelValue", value);
  };

  const vModelTest1 = (e) => {
    let value = e.target.value;
    console.log(props.test1Modifiers); //{b:true,c:true}
    if (props.modelModifiers.b) {
      //处理value值
    }
    if (props.modelModifiers.c) {
      //处理value值
    }
    emit("update:test1", value);
  };
</script>
```

### v-model 的子组件直接使用 v-model

#### 在子组件中使用 v-model 报错的示例

```html
<!-- 子组件 -->
<input type="text" v-model="xxx" />
<!-- 子组件 这样会报错 -->
<input type="text" v-model="props.modelValue" />
```

#### 通过 watch 中转

```html
<!-- 子组件 -->
<template>   <input type="text" v-model="proxy" /> </template>

<script setup>
  import { ref, watch } from "vue";
  const emit = defineEmits();
  const props = defineProps({
    modelValue: String,
  });

  const proxy = ref(props.modelValue);

  watch(
    () => proxy.value,
    (v) => emit("update:modelValue", v)
  );
</script>
```

#### computed 的 get set

```js
const proxy = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
```

#### 对 watch 做最后的封装

```html
<!--childModel.vue -->
<template>
    <input type="text" v-model="modelValue" />   <input
    type="text"
    v-model="test"
  />
</template>

<script setup>
  import { useVmodel } from "./hooks/useVmodel2";
  const emit = defineEmits();
  const props = defineProps({
    modelValue: String,
    test: String,
  });
  const modelValue = useVmodel(props);
  const test = useVmodel(props, "test");
</script>

<!-- 父组件 -->
<template>   <Model v-model="modelValue" v-model:test="test" /> </template> 

<script setup>
  import { ref, watch } from "vue";
  import Model from "./childModel.vue";

  const modelValue = ref("");
  const test = ref("");
</script>
```

## 双向绑定 MVVM

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类 UI 组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

### ViewModel

- 数据变化后更新视图
- 视图变化后更新数据

当然，它还有两个主要部分组成

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

## Vuex

- State（状态）：应用程序的数据存储在一个单一的状态树中，即 state。这个状态树是响应式的，当状态发生变化时，相关的组件将自动更新。

- Getter（获取器）：getter 允许从 state 中派生出一些衍生的状态，类似于计算属性。可以使用 getter 来对 state 进行处理和计算，并将其暴露给组件使用。

- Mutation（突变）：mutation 是用于修改 state 的唯一途径。它定义了一些操作函数，每个函数都有一个特定的名称（称为 type），并且可以在这些函数中改变 state 的值。mutation 必须是同步的，以确保状态变更是可追踪的。

- Action（动作）：action 用于处理异步操作和复杂的业务逻辑。类似于 mutation，但 action 可以包含异步操作，可以在 action 中触发多个 mutation，也可以在 action 中调用其他 action。

- Module（模块）：为了更好地组织和拆分大型的应用程序，Vuex 允许将 state、getter、mutation 和 action 划分为模块。每个模块都有自己的 state、getter、mutation 和 action，并且可以被嵌套和组合。

## 添加新的响应数据

```js

	data:()=>{
       	item:{
            oldProperty:"旧属性"
        }
    },
    methods:{
        addProperty(){
            this.items.newProperty = "新属性"  // 为items添加新属性
            console.log(this.items)  // 输出带有newProperty的items
        }
    }

```

- 使用 Vue.set() Vue.set( target, propertyName/index, value )

- 使用 Object.assign()

```js
this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})
```

- $forceUpdate 迫使 Vue 实例重新渲染

```js
import { getCurrentInstance } from "vue";
const { ctx } = getCurrentInstance();
ctx.$forceUpdate();
```

## vue3 和 vue2 的区别

- 保持与 vue2 的向后兼容性

- 引入 compositionAPI（组合式 api）作为管理组件状态和逻辑。（vue2 是 Options API 选项式 api）

- 响应性 reactivite（引入了 compositionAPI，提供更灵活和强大的组件状态和逻辑管理方式，使代码组织和重用更加方便，compositionAPI 使用函数而不是对象，可以提高摇树优化 Tree Shaking 并减小打包体积）

- 更小的包体积（Vue 3 通过更好的 Tree Shaking 和更高效的运行时代码生成，相较于 Vue 2，打包体积更小。Vue 3 的响应式系统也经过优化，性能更好。）

- 性能改进 （Vue 3 采用了更快、更高效的渲染机制，得益于新的编译器。虚拟 DOM 的差异化算法经过优化，减少不必要的更新，提升渲染性能。）

- 引入 Teleport 后，在组件任何位置渲染内容，并将其挂载到 dom 中的其他位置。

- 更好的支持 ts

### Teleport

```html
<template>
  <div>
    <!-- 其他组件内容 -->

    <teleport to="body">
      <!-- 弹出框内容 -->
    </teleport>
  </div>
</template>
```

### Fragments

作为 vue3 的新特性之一，允许一个 vue 组件可以有多个根节点。创建一个如下的组件，vue3 中开箱即用

```html
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## 自定义指令 Custom Directive

在 `<script setup>` 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。在下面的例子中，vFocus 即可以在模板中以 v-focus 的形式使用。

- 操作 DOM：自定义指令可以用于直接操作 DOM 元素，例如修改元素的样式、属性、事件绑定等。你可以通过在指令的钩子函数中访问和操作 DOM 元素。

- 表单验证：你可以创建自定义指令来实现表单验证逻辑。通过自定义指令，你可以监听输入框的值变化，并根据自定义的验证规则进行验证，以便提供实时的反馈。

- 权限控制：自定义指令可以用于权限控制场景，例如根据用户权限来隐藏或禁用某些元素。你可以在自定义指令中根据用户权限进行条件判断，并修改元素的显示或行为。

- 第三方库集成：当你需要在 Vue 中使用第三方库或插件时，可以使用自定义指令来进行集成。你可以创建一个自定义指令，在其中初始化和配置第三方库，并在适当的时机调用库的方法。

- 动画和过渡效果：自定义指令可以与 Vue 的过渡系统一起使用，实现自定义的动画和过渡效果。你可以在自定义指令中监听过渡钩子函数，并根据需要操作元素的样式或类名来实现过渡效果。

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>

<template>
  <input v-focus />
</template>
```

## key 的原理

- 当 Vue 更新渲染真实 DOM 时，它会对新旧节点进行比较，找出它们之间的差异。
- 如果两个节点具有相同的 key 值，则 Vue 认为它们是相同的节点，会尝试复用已存在的真实 DOM 节点。
- 如果节点具有不同的 key 值，Vue 会将其视为不同的节点，并进行适当的更新、移动或删除操作。

- key 的作用是为了在 diff 算法执行时更快的找到对应的节点，提高 diff 速度，更高效的更新虚拟 DOM;

vue 和 react 都是采用 diff 算法来对比新旧虚拟节点，从而更新节点。在 vue 的 diff 函数中，会根据新节点的 key 去对比旧节点数组中的 key，从而找到相应旧节点。如果没找到就认为是一个新增节点。而如果没有 key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个 map 映射，另一种是遍历查找。相比而言。map 映射的速度更快。

- 为了在数据变化时强制更新组件，以避免“就地复用”带来的副作用。

当 Vue.js 用  v-for  更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。重复的 key 会造成渲染错误。

## 修饰符

- 表单修饰符（v-model.lazy v-model.trim v-model.number）
- 事件修饰符（@click.stop :submit.prevent 阻止事件默认行为 @click.self 当前元素自生时触发处理函数 @click.once 绑定完成后只触发一次 @scroll.passive 消极的元素滚动事件 @click.native 监听原生 dom）
- 鼠标按键修饰符（@click.left @click.middle）
- 键盘值修饰符（@keyup.keyCode）
- v-bind 修饰符（:myMessage.sync="bar"进行一个双向绑定）

```
//父组件
<comp :myMessage.sync="bar"></comp>
//子组件
this.$emit('update:myMessage',params);


相当于下面的写法
//父亲组件
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
 this.bar = e;
}
//子组件js
func2(){
  this.$emit('update:myMessage',params);
}

```

## $route & $router

- route 只读 包括当前 URL 路径、查询参数、路径参数等信息
- router Vue Router 的实例对象，包括了许多用于导航控制和路由操作的 API push、replace、go、forward

## 响应式

- 简化代码
- 提高可维护性
- 增强用户体验（局部更新、异步加载）
- 支持复杂组件设计

## vue 和 react 的区别

- 数据启动方式不同（react 使用单项数据流 vue 双向数据绑定）
- 模版语法不同（react 使用 jsx vue2 使用模版语法）
- 性能优化方式不同（react 使用虚拟 dom vue 使用模版编译）

## 单页应用提高加载速度

- 使用代码分割：将代码拆分成小块并按需加载（懒加载），以避免不必要的网络请求和减少加载时间。
- 缓存资源：利用浏览器缓存来存储重复使用的文件，例如 CSS 和 JS 文件、图片等。
- 预加载关键资源：在首次渲染之前，先提前加载关键资源，例如首页所需的 JS、CSS 或数据，以保证关键内容的快速呈现。
- 使用合适的图片格式：选择合适的图片格式（例如 JPEG、PNG、WebP 等），并根据需要进行压缩以减少文件大小。对于一些小图标，可以使用 iconfont 等字体文件来代替。
- 启用 Gzip 压缩：使用服务器端的 Gzip 压缩算法对文件进行压缩，以减少传输时间和带宽消耗。
- 使用 CDN：使用内容分发网络（CDN）来缓存和传递文件，以提高文件的下载速度和可靠性。
- 优化 API 请求：尽可能地减少 API 调用的数量，并使用缓存和延迟加载等技术来优化 API 请求的效率。
- 使用服务器端渲染：使用服务器端渲染（SSR）来生成 HTML，以减少客户端渲染所需的时间和资源。但需要注意，SSR 也可能增加了服务器的负担并使网站更复杂。

## v-if v-for

- 在 vue 模板编译的时候，会将指令系统转化成可执行的 render 函数

- 在 Vue2 当中，v-for 的优先级更高，而在 Vue3 当中，则是 v-if 的优先级更高。

## 遇到了 404 的问题

- hash

优点：浏览器兼容性较好，连 IE8 都支持
缺点：路径在井号 # 的后面，比较丑

- history
  优点：路径比较正规，没有井号 #
  缺点：兼容性不如 hash，且需要服务端支持，否则一刷新页面就 404 了

## vue 的 diff 算法

https://fe.ecool.fun/topic/7d27dc57-5d95-4e3f-88a7-eb685b7c21e4?orderBy=updateTime&order=desc&tagId=14

## 模版的编译过程

https://fe.ecool.fun/topic/418ef81f-96c6-4c4e-b218-df29be84890d?orderBy=updateTime&order=desc&tagId=14

## vue3 中设置全局变量

- config.globalProperties

```js
// 之前 (Vue 2.x)
Vue.prototype.$http = () => {};

// 之后 (Vue 3.x)
const app = createApp({});
app.config.globalProperties.$http = () => {};
```

- Provide / Inject
  vue3 新的 provide/inject 功能可以穿透多层组件，实现数据从父组件传递到子组件。

可以将全局变量放在根组件的 provide 中，这样所有的组件都能使用到这个变量。

如果需要变量是响应式的，就需要在 provide 的时候使用 ref 或者 reactive 包装变量。

## vue3 响应式原理

https://fe.ecool.fun/topic/ea676360-c8f5-4ce4-bc66-5c3e4f7eddb6?orderBy=updateTime&order=desc&tagId=14

## Vue 页面渲染流程

https://fe.ecool.fun/topic/6201f33e-f962-4cdc-ab01-59d03993fed8?orderBy=updateTime&order=desc&tagId=14

## computed 怎么实现的缓存

https://fe.ecool.fun/topic/ca2af24f-1516-4fd7-b979-e2f1d09ccb20?orderBy=updateTime&order=desc&tagId=14

## vue-loader 做了哪些事情

https://fe.ecool.fun/topic/d32689f1-49ec-4eae-97f4-583fe5362c3b?orderBy=updateTime&order=desc&tagId=14

## keep-alive

对组件进行持久化，使组件的状态维持不变。下一次展示时，不会进行重新初始化组件。

保存在内存里，方式重复渲染 dom

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
- max - 数字。最多可以缓存多少组件实例

```html
<!-- 指定home组件和about组件被缓存 -->
<keep-alive include="home,about">
  <router-view></router-view>
</keep-alive>

<!-- 除了home组件和about组件别的都缓存，本例中就是只缓存detail组件 -->
<keep-alive exclude="home,about">
  <router-view></router-view>
</keep-alive>
```

使用了 keep-alive 的组件以后，自动加上了 activated 钩子和 deactivated 钩子

- activated 当组件被激活（使用）的时候触发，可以简单理解为进入这个页面的时候触发
- deactivated 当组件不被使用（inactive 状态）的时候触发，可以简单理解为离开这个页面的时候触发

初始进入和离开 created ---> mounted ---> activated --> deactivated

后续进入和离开 activated --> deactivated

源码解释 https://fe.ecool.fun/topic/7cefdb7e-8b8a-429f-be44-45b346de6f3f?orderBy=updateTime&order=desc&tagId=14

## vue3 实现 modal 组件

https://fe.ecool.fun/topic/977b3a64-29e7-4085-a05a-26e78bdefcea?orderBy=updateTime&order=desc&tagId=14

## composition api 和 options api

https://fe.ecool.fun/topic/3707a3b3-2330-4833-9c9b-b427887f8ee9?orderBy=updateTime&order=desc&tagId=14

## vue3 性能提升

https://fe.ecool.fun/topic/9f19f171-7071-42e6-82d5-35b19bd83928?orderBy=updateTime&order=desc&tagId=


https://fe.ecool.fun/topic/a5032eb9-6a53-4792-852f-3f9417631c47?orderBy=updateTime&order=desc&tagId=14

## Vue3.0 的设计目标是什么？做了哪些优化?

https://fe.ecool.fun/topic/ca63a7ef-8e3d-4fe4-b697-28138bd96f74?orderBy=updateTime&order=desc&tagId=14

## 处理 vue 项目中的错误

https://fe.ecool.fun/topic/0cc5abe2-7798-40a6-b930-7dacdb404b8d?orderBy=updateTime&order=desc&tagId=14

## vue 权限管理

https://fe.ecool.fun/topic/f43b7906-f51f-454f-8028-ea027ae3e121?orderBy=updateTime&order=desc&tagId=14

## Vue 项目划分结构和划分组件

- 文件夹和文件夹内部文件的语义一致性
- 单一入口/出口
- 就近原则，紧耦合的文件应该放到一起，且应以相对路径引用
- 公共的文件应该以绝对路径的方式从根目录引用
- /src 外的文件不应该被引入

## 封装 axios

封装的同时，你需要和 后端协商好一些约定，请求头，状态码，请求超时时间.......

- 设置接口请求前缀：根据开发、测试、生产环境的不同，前缀需要加以区分

- 请求头 : 来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)

- 状态码: 根据接口返回的不同 status ， 来执行不同的业务，这块需要和后端约定好

- 请求方法：根据 get、post 等方法进行一个再次封装，使用起来更为方便

- 请求拦截器: 根据请求的请求头设定，来决定哪些请求可以访问

- 响应拦截器： 这块就是根据 后端`返回来的状态码判定执行不同业务

## 实现虚拟 dom

https://fe.ecool.fun/topic/d5acd6cf-38c3-4afb-965d-be79f03cd045?orderBy=updateTime&order=desc&tagId=14

## observable

https://fe.ecool.fun/topic/adaa5c02-f04c-4247-b6d6-0fe3f1bd439c?orderBy=updateTime&order=desc&tagId=14

## slot

https://fe.ecool.fun/topic/28305428-953c-4daa-9b4e-f3d01b694017?orderBy=updateTime&order=desc&tagId=14

## mixin

https://fe.ecool.fun/topic/c1bcc1f1-3375-4c66-b3af-1ba1b937c01f?orderBy=updateTime&order=desc&tagId=14

## NextTick

https://fe.ecool.fun/topic/a0c75651-7e44-437d-9f1f-38775698091b?orderBy=updateTime&order=desc&tagId=14

## 插件和组件的区别

- 编写形式

```
组件
标准格式
<template>
</template>
<script>
export default{
    ...
}
</script>
<style>
</style>

我们还可以通过template属性来编写一个组件，如果组件内容多，我们可以在外部定义template组件内容，如果组件内容并不多，我们可直接写在template属性上
<template id="testComponent">     // 组件显示的内容
    <div>component!</div>
</template>

Vue.component('componentA',{
    template: '#testComponent'
    template: `<div>component</div>`  // 组件内容少可以通过这种形式
})
```

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}

```

- 注册形式

```js
// 组件全局注册
Vue.component('my-component-name', { /* ... */ })

// 组件局部注册
const component1 = {...} // 定义一个组件

export default {
	components:{
		component1   // 局部注册
	}
}


// 插件
Vue.use(插件名字,{ /* ... */} )


```

- 使用场景

  - 组件 (Component) 是用来构成你的 App 的业务模块，它的目标是 App.vue

  - 插件 (Plugin) 是用来增强你的技术栈的功能模块，它的目标是 Vue 本身

简单来说，插件就是指对 Vue 的功能的增强或补充


## vue 实例挂载
https://fe.ecool.fun/topic/41132096-4901-45d1-a453-6119931a083e?orderBy=updateTime&order=desc&tagId=14

## 生命周期
https://fe.ecool.fun/topic/cf1e843f-9005-42dc-b204-194dd3d1fc42?orderBy=updateTime&order=desc&tagId=14


## 分析为什么vue中的data属性是一个函数而不是一个对象
https://fe.ecool.fun/topic/7e8c5dd0-90cc-451b-afdb-0c4150704768?orderBy=updateTime&order=desc&tagId=14