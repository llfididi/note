# vue react 获取json文件终极解决方案 可配置 可修改

## 环境配置
 打包完成后会有需要配置的请求接口地址、动态参数、总不能每次都修改密码。

## 解决方案

### import
    - 直接使用`import`引入静态文件

    - 优点：方便快捷
    - 缺点：打包时现在这些文件会被打包进代码里，修改json等静态文件不能修改

### Storage
    - 这个方法在html文件中定义一个localStorage或sessionStorage，给其他js文件获取保存的内容。
    - 优点：方法使用比较简单数据，可以实现生成可修改配置文件的需求。
    - 缺点：不够优雅😅
### axios（终极解决方法）
    - 使用请求接口的方式请求目录下的文件，可获取到最新的静态文件。
    - 注意：开发环境可以正常请求，但是打包出来获取不到文件，跨域错误。这是因为本地获取浏览器的报错。可以把文件放在服务器里或在vscode里使用`Live Server`插件运行页面模拟服务器环境。

