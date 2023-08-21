# 优化
## webpack打包优化 常规且有效的打包速度体积优化
### 使用 externals 提取项目依赖

externals提取依赖包，告诉webpack这些依赖是外部环境提供的，打包时忽略它们。在外部使用cdn引入依赖。

```js
module.exports = {
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      echarts: "echarts",
    },
  },
};
```
当没有cdn资源或不支持cdn时，使用DllPlugin动态链接库，DllReferencePlugin 将打包生成的dll文件，引用到需要预编译的依赖上来，html-webpack-tags-plugin在打包时自动插入dll文件。

### 组件库按需引入&&减少第三方库体积


### Gzip 压缩


### HappyPack多线程打包

## 网络优化

### dns预解析
link标签的rel属性设置dns-prefetch，提前获取域名对应的IP地址

### 使用缓存
强缓存、协商缓存。

### 使用cdn（内容分发网络）


### 压缩响应
客户端通过http请求中的Accept-Encoding头来标识对压缩的支持
web服务器使用Content-Encoding 来告知客户端使用的哪种方法压缩的
### 使用多个域名
Chrome 等现代化浏览器，都会有同域名限制并发下载数的情况，不同的浏览器及版本都不一样，使用不同的域名可以最大化下载线程，但注意保持在 2~4 个域名内，以避免 DNS 查询损耗。
### 使用字体图标iconfont代替图片图标
- 图片会增加网络请求次数，从而拖慢页面加载时间
- iconfont可以很好的缩放并且不会添加额外的请求

### 避免图片src为空
虽然 src 属性为空字符串，但浏览器仍然会向服务器发起一个 HTTP 请求：
IE 向页面所在的目录发送请求； Safari、Chrome、Firefox 向页面本身发送请求； Opera 不执行任何操作。






## 页面渲染优化
webkit渲染引擎流程：
- 处理 HTML 并构建 DOM 树
- 处理 CSS 构建 CSS 规则树(CSSOM)
- DOM Tree 和 CSSOM Tree 合成一棵渲染树 Render Tree。
- 根据渲染树来布局，计算每个节点的位置
- 调用 GPU 绘制，合成图层，显示在屏幕上

### 避免css阻塞
css影响renderTree的构建，会阻塞页面的渲染，因此应该尽早（将 CSS 放在 head 标签里）和尽快（启用 CDN 实现静态资源加载速度的优化)的将css资源加载

### 避免使用css表达式
css表达式会被频繁的计算

### 避免js阻塞
js可以修改cssom（css对象模型）和dom，因此js会阻塞页面的解析和渲染，并且会等待css资源的加载。也就是说js会抢走渲染引擎的控制权。所以需要给js资源添加defer（当前页面解析完后执行代码）或者async（在当前文件加载完后执行js代码），延迟js脚本的执行。

### 首屏加载优化
- 使用骨架屏或者动画优化用户体验
- 首页资源按需加载
### 减少重绘和回流！！！


## js中的优化

### 使用事件委托

### 防抖和节流

### 尽量不要使用js动画

### 多线程


## 图片的优化
### 精灵图、雪碧图




### 懒加载
方案1：clientHeight+scroolTop>offsetTop
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片加载优化</title>
</head>

<body>
    <div style="background-color: green;width:100vw;heig
    ht:8000px">
    </div>
    <div id="yellow" style="background-color: yellow;width:100vw;height:800px">
    </div>

    <script>
        document.addEventListener('scroll', () => {
            const clientH = document.documentElement.clientHeight//获取屏幕可视区域的高度
            const scrollT = document.documentElement.scrollTop//获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
            const offsetTop = document.getElementById('yellow').offsetTop//获取元素相对于文档顶部的高度
            if (clientH + scrollT > offsetTop) {
                console.log('进入可视区域啦！！')
            }
        })
    </script>
</body>

</html>

```
方案2：下滑过程中bound.top会越来越小
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片加载优化</title>
</head>

<body>
    <div style="background-color: green;width:100vw;height:8000px">
    </div>
    <div id="yellow" style="background-color: yellow;width:100vw;height:800px">
    </div>

    <script>
        document.addEventListener('scroll', () => {
            var bound = document.getElementById('yellow').getBoundingClientRect(); ////获取元素的大小及位置
            var clientHeight = window.innerHeight;
            if (bound.top <= clientHeight) {
                console.log('进入可视区域啦')
            }
        })
    </script>
</body>

</html>
```

### 使用css3代替图片
使用css效果
### 图片压缩
- 使用在线网站进行压缩
- 通过webpack插件image-webpack-loader。它是基于imagemin这个node库来进行图片压缩的

### 使用渐进式jpeg
打开文件过程中，会先显示整个图片的模糊轮廓，随着扫描次数的增加，图片变得越来越清晰。这种格式的主要优点是在网络较慢的情况下，可以看到图片的轮廓知道正在加载的图片大概是什么。
### 使用webp格式的图片
是一种新的图片格式文件，提供有损压缩和无损压缩两种方式。在相同图片质量下，webp的体积比png和jpg的更小。
### 减少重绘（paint）和回流(reflow)

- 更新多个节点使用documentFragment。最常用的方法是使用 DocumentFragment 创建并组成一个 DOM 子树，然后使用 Node 接口方法（如：appendChild() 或 insertBefore()）将其插入到 DOM 中。这种情况下会插入片段的所有子节点，并留下一个空的 DocumentFragment。因为所有的节点会被一次插入到文档中，所以仅会发生一个重渲染的操作，而不是每个节点分别被插入到文档中从而发生多次重渲染的操作。
- 使用translate代替top
- 使用visibility替换display:none,因为vis发生重绘，后者会引发回流（改变了布局），opacity代替visiability，vis会发生重绘，但opacity不会。
- 把dom离线后修改，比如：先把dom给display：none，有一次回流，然后你修改很多次，再显示出来。
- 尽量少用table布局，table布局的话，每次单元格布局改变，整个tabel回流重绘。
- 最好别频繁操作dom节点，把需要操作的样式提前写成class，之后要修改，只需要修改className一次，一次回流重绘总比多次低。
- window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
- 每次访问DOM的偏移量属性的时候，例如获取一个元素的scrollTop、scrollLeft、scrollWidth、offsetTop、offsetLeft、offsetWidth、offsetHeight之类的属性，浏览器为了保证值的正确也会回流取得最新的值，所以如果你要多次操作，最取完做个缓存。更加不要for循环中访问DOM偏移量属性，而且使用的时候，最好定义一个变量，把要需要的值赋值进去，进行值缓存，把回流重绘的次数减少；



## 框架优化
- 路由懒加载
- 第三方插件按需引入

### React优化
- map循环展示添加key
- 合理使用useMemo\useCallback
看情况才去使用useCallback.很多时候useMemo就够了,它能解决当前组件监听一个状态才去更新， 如果涉及到父组件更新子组件不用更新的情况才考虑使用useCallback. useCallback用来监听某个状态的变化。 然后可以在子组件用useEffect来监听callBack是否改变了；改变了就更新子组件。
### vue优化
- v-for添加key
- 合理使用computed和watch
- v-for的同时避免使用v-if
- destory是销毁事件：addEventListener添加的事件、setTimeout setInterval bus.$on 绑定的监听事件等


## webpack打包优化
配置页面打包的配置，压缩代码、分包文件



将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件
默认情况下，所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页的加载速度
代码分离可以分出更小的bundle，以及控制资源加载优先级，提供代码的加载性能
这里通过splitChunksPlugin来实现，该插件webpack已经默认安装和集成，只需要配置即可
默认配置中，chunks仅仅针对于异步（async）请求，我们可以设置为initial或者all
module.exports = {
    ...
    optimization:{
        splitChunks:{
            chunks:"all"
        }
    }
}
splitChunks主要属性有如下：
Chunks，对同步代码还是异步代码进行处理
minSize： 拆分包的大小, 至少为minSize，如何包的大小不超过minSize，这个包不会拆分
maxSize： 将大于maxSize的包，拆分为不小于minSize的包
minChunks：被引入的次数，默认是1





### 缩小loader匹配范围
- 优化loader配置
- test、include|exclude三个配置项来缩小loader的处理范围
- 推荐include
``` js
 include:path.resolve(__dirname,"./src")
```





# 散
## generator
```js

    function* Generator() {
      // 内部使用yield表达式——不会阻止代码向下运行
      yield '我是第一个状态'
      yield '我是第二个状态'
      yield '我是第三个状态'
    }
    let res = Generator() //返回值  返回的是一个迭代器对象
    console.log(res.next()); //next()执行一个状态
    console.log(res.next()); //next()执行下一个状态
```

## bfc（Block Formatting Context）
每个BFC区域只包括其子元素，不包括其子元素的元素
每个BFC区域都是独立隔绝的，互不影响
怎样使一个元素变成BFC区域：
- body根元素
- 设置浮动，不包括none
- 设置定位，absoulte或者fixed
- 行内块显示模式，inline-block
- 设置overflow,hisdden,auto,scroll
- 表格单元格，table-cell
- 弹性布局，table-cell
- 弹性布局，flex

## 居中

- display:flex;(这里也可以使用display:grid;)align-items:center;jusitify-content:center;(设置在父元素上)
- display:flex;(父元素)margin:auto;(子元素)
- display:relative;(父元素) display:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
- display:table-cell;vertical-align:middle;text-align:center;(父元素)
- display:grid;(父元素)margin:auto;(子元素)
- 父元素设置伪类（.father::after{content:'';line-height:200px;/**父元素的高度*/}）,子元素需要设置为inline-block

## flex？
flex-direction row col reverse alingn-items:start end center




















# 提问环节
问： 你讲讲前端模块化吧
答： 模块化的开发方式可以提高代码复用率，方便进行代码的管理。通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。
问：模块化有哪几种标准？
答： 目前流行的js模块化规范有CommonJS、AMD、CMD以及ES6的模块系统
问：ES Modules 和 CommonJS的一些区别
答：
使用语法层面，CommonJs是通过module.exports，exports导出，require导入；ESModule则是export导出，import导入
CommonJs是运行时加载模块，ESModule是在静态编译期间就确定模块的依赖
ESModule在编译期间会将所有import提升到顶部，CommonJs不会提升require
CommonJs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ESModule是导出的一个引用，内部修改可以同步到外部
CommonJs中顶层的this指向这个模块本身，而ESModule中顶层this指向undefined
CommonJS加载的是整个模块，将所有的接口全部加载进来，ESModule可以单独加载其中的某个接口