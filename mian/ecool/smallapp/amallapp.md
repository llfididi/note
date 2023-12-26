## 小程序的双线程
- 渲染线程：负责渲染界面，包括解析WXML和WXSS、样式计算、布局排版和绘制视图等操作。

- 逻辑线程：负责处理业务逻辑和数据处理，包括调用小程序API、处理事件、请求网络等操作。

通过双线程协同工作，可以实现小程序的高性能和流畅体验，通过系统层jsBridge。当界面需要进行更新时，渲染线程会优先响应，避免造成卡顿；而逻辑线程则负责处理复杂的业务逻辑，不会对界面渲染产生影响。这种设计可以有效地提高小程序的运行效率，同时也能够更好地满足用户对于小程序的使用需求。

## 微信小程序bindtap 和 catchtap 区别？
- 相同点： 都是点击事件
- 不同点： bindtap 不会阻止冒泡，catchtap 可以阻止冒泡。

## 小程序 WXSS 与 CSS 的区别？
- wxss 背景图片只能引入外链，不能使用本地图片
- 小程序样式使用 @import 引入 外联样式文件，地址为相对路径。
- 尺寸单位为 rpx , rpx 是响应式像素,可以根据屏幕宽度进行自适应。

## 简述一下微信小程序的主要文件有哪些？
- WXML——模板文件
- JSON——配置/设置文件，如标题,tabbar,页面注册
- WXSS——样式文件，样式可直接用import导入
- JS——脚本逻辑文件，逻辑处理，网络请求
- app.json——配置文件入口，整个小程序的全局配置，网络超时时间、底部tab、页面路径，window字段是小程序所有页面的顶部背景颜色、文字颜色
- app.js——可以没有内容，可以在里边监听生命周期函数、声明全局变量
- app.wxss——全局配置样式文件

## jsBridge的原理
以 JavaScript 引擎或 Webview 容器作为媒介，通过协定协议进行通信，实现 Native 端和 Web 端双向通信的一种机制。

所谓 双向通信的通道:

- JS 向 Native 发送消息 : 调用相关功能、通知 Native 当前 JS 的相关状态等。
- Native 向 JS 发送消息 : 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。