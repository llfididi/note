# nodejs



## 介绍

Front-end =>界面

Back-end

全栈开发工程师=>全栈

基本的网站开发能力 -- 前端 服务端 运维部署



在浏览器发起请求 -- 到服务器 -- 像一个黑盒（完全不知道后端怎么返回的）

数据库 -- 服务器来做助理 -- 这就是web后台服务器

学习node.js 的目的就是帮助打开服务端这个黑盒子 -- 只有了解服务端才能更好的配合服务端进行开发 

## 了解

一个javascript，everywhere。

凡是能用js来实现的，最终都会用js来实现。

1. java

2. php

3. python

4. ruby -- GitHub

5. .net  (dot net)

6. c#

7. Node.js

   

   org -- 技术结尾的网站 organization（组织结构）

   io -- 输入输出 input output 

   

### node.js 是什么

- node.js is a javascript runtime built on chrome's V8 javascript engine

  Node.js不是一门语言

  node.js不是库、不是框架

  node.js是一个js运行时环境

  --- 就是node.js 可以解析和执行js代码

  --- 以前只有浏览器可以解析执行js代码

  --- 现在的js可以完全脱离浏览器来运行，一切都归功于node.js



- 浏览器中的js es-bom-dom

- node.js 中的javascript

  没有bom、dom

  ecmascript 

  在node这个js执行环境中为js提供了一些服务级别的操作api

  ​	文件的读写

  ​	网络服务的构建

  ​	网络通信

  ​	http服务器

  ​	等处理 -- 主要学习web服务器开发

- Node.js uses an event-driven,non-blocking I/Omodel that makes it lightweight and efficient.

  Event-driven 事件驱动

  Non-blocking I/O model 非阻塞IO模型（异步）

  lightweight and efficient. 轻量和高效

- Node.js' package ecosystem,npm,is the largest ecosystem of open source libraries in the world.

  npm是世界上最大的开源库生态系统

  绝大多数js相关的包都存放在了npm上，这样做的目的是为了让开发人员更方便的去下载使用。

  npm install jquery



### Node.js 能做什么

web服务器后台

命令行工具 --  npm / git  / hero / 

接触最多的是node的命令行工具

​		--自己写的很少，主要是使用别人第三方的

### 学习资源

《深入浅出node.js》 --朴灵 

《node.js 权威指南》

node入门

官方api文档

cnode社区

cnode-新手入门

JavaScript Standard Style

javaScript style guide

[js权威指南](https://js.2019919.xyz)

### 能学到什么

B/S 编程模型 -- 

​		browser-server 

​		back-end 

​		任何服务端技术编程模型都一样，与语言无关。

​		node只是作为我们学习bs编程模型的一个工具而已

模块化编程

​		RequireJs

​		SeaJs

​		以前认知的js只能通过script 标签加载

​		在node中可以像@import() 一样来引用加载js脚本

node常用api

异步编程

​		回调函数

​		promise

​		async

​		generator

Express Web 开发框架

Ecmascript6

##  起步

### 安装node环境

### hello world

#### 解析执行js

#### 文件读写

#### http

### node中的js

### node中的模块系统

node为js提供了服务器级别的api

​	

### 端口号？

所有联网的程序都需要进行网络通信。

计算机只有一个物理网卡，而且同一个局域网中，网卡的地址必须事唯一的。

网卡是通过唯一的ip地址来进行定位的。

ip地址用来定位计算机，端口号来定位具体的应用程序。 --所有需要联网通行的软件都必须具有端口号。



### 第一天总结

- Node 中的 JavaScript

  - ecmascript

    - 变量
    - 方法
    - 数据类型
    - 内置对象
    - array
    - object
    - date
    - math

  - 模块系统

    - 在node中没有全局作用域的概念
    - f
    - require加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所有不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    - 模块作用域固然可以带来的一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    - 但是某些情况下，模块与模块是需要进行通信的
    - 在每个模块中，都提供了一个对象：`EXPORTS`
    - 该对象默认是一个空对象
    - 你要做的就是把需要被外部访问使用的成员手动的挂载到`export` 接口对象中
    - 然后谁来`require`这个模块，谁就可以得到模块内部的`exports`接口对象

  - 核心模块

    - 核心模块是由node提供的一个个的具名的模块，他们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络构建
      - os 操作系统信息
      - path 路径处理模块
    - 所有核心模块在使用的时候都必须手动的先使用 方法加载，然后才可以使用
      - var fs = require('fs')

  - http

    - require
    - 端口号
      - IP地址定位计算机
      - 端口号定位具体的应用程序

    - content- type
      - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，正确的回复
      - 不同资源对应的content-type不一样
      - 队友文本类型的数据，最好都加上编码，防止中文解析乱码问题
    - 通过网络发送文件
      - 发送的并不是文件，本质上来讲发送的是文件内容
      - 当浏览器收到服务器响应内容后，根据content-type进行对应的解析处理

    ------------------------------

    后面要学的

  - 模块系统

  - node 中的其他的核心模块

  - 做一个小管理系统
    - crub

  - express web 开发框架



