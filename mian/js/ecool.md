## axios ai ke sei you si

就是对xmlhttprequest的封装

### 请求拦截器：
```js
axios.interceptors.request.use((config) => {
    // 发送请求前处理
    return config
}),(error) => {
    // 错误响应处理
    return Promise.reject(error)
}


// 响应拦截器同理

// 将request 变成 response
```

### 取消请求

```js
// 方式一
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('xxxx', {
  cancelToken: source.token
})
// 取消请求 (请求原因是可选的)
source.cancel('主动取消请求');

// 方式二
const CancelToken = axios.CancelToken;
let cancel;

axios.get('xxxx', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});
cancel('主动取消请求');

```

## 跨域
协议https|http IP地址|域名 端口

### 解决方法
jsonp 利用script标签没有跨域的限制，从而实现跨域 仅支持get请求

cors Access-Control-Allow-Origin:http://location:8000 ie10以上

nignx 反向代理

websocket

iframe 搭配document.domain location.hash window.name 三种方式实现

node作为中间件代理  proxy 代理跨域



## URI、URL、URN
URI:Universal Resource Identifier

URL:xxx xxx Locator

URN: xxx xxx Name

URN 和 URL 都是URI的子集。

## tcp 三次握手

三次握手是 TCP 连接的建立过程。在握手之前，主动打开连接的客户端结束 CLOSE 阶段，被动打开的服务器也结束 CLOSE 阶段，并进入 LISTEN 阶段。随后进入三次握手阶段：
① 首先客户端向服务器发送一个 SYN 包，并等待服务器确认，其中：

标志位为 SYN，表示请求建立连接；
序号为 Seq = x（x 一般取随机数）；
随后客户端进入 SYN-SENT 阶段。

② 服务器接收到客户端发来的 SYN 包后，对该包进行确认后结束 LISTEN 阶段，并返回一段 TCP 报文，其中：

标志位为 SYN 和 ACK，表示确认客户端的报文 Seq 序号有效，服务器能正常接收客户端发送的数据，并同意创建新连接；
序号为 Seq = y；
确认号为 Ack = x + 1，表示收到客户端的序号 Seq 并将其值加 1 作为自己确认号 Ack 的值，随后服务器端进入 SYN-RECV 阶段。

③ 客户端接收到发送的 SYN + ACK 包后，明确了从客户端到服务器的数据传输是正常的，从而结束 SYN-SENT 阶段。并返回最后一段报文。其中：

标志位为 ACK，表示确认收到服务器端同意连接的信号；
序号为 Seq = x + 1，表示收到服务器端的确认号 Ack，并将其值作为自己的序号值；
确认号为 Ack= y + 1，表示收到服务器端序号 seq，并将其值加 1 作为自己的确认号 Ack 的值。
随后客户端进入 ESTABLISHED。

当服务器端收到来自客户端确认收到服务器数据的报文后，得知从服务器到客户端的数据传输是正常的，从而结束 SYN-RECV 阶段，进入 ESTABLISHED 阶段，从而完成三次握手。


三次握手的主要目的是确认自己和对方的发送和接收都是正常的，从而保证了双方能够进行可靠通信。若采用两次握手，当第二次握手后就建立连接的话，此时客户端知道服务器能够正常接收到自己发送的数据，而服务器并不知道客户端是否能够收到自己发送的数据。


## cdn 
Content Delivery Network 内容分发网络
CDN就是根据用户位置分配最近的资源


## 输入url到看见页面发现了什么


- DNS解析 本地域名服务器-根域名服务器-顶级域名服务器
- 发起tcp连接 三次握手 四次挥手
- 发送http请求 构建HTTP请求报文，并通过TCP协议，发送到服务器指定端口 请求报文由请求行，请求报头，请求正文组成
- 服务器处理请求并返回http报文
- 浏览器解析渲染页面 dom树-cssdom树-合并前面两颗树-渲染并绘制页面
- 连接结束


## dns
Domain Name System
首先会在浏览器的缓存中查找对应的IP地址，如果查找到直接返回，若找不到继续下一步
将请求发送给本地DNS服务器，在本地域名服务器缓存中查询，如果查找到，就直接将查找结果返回，若找不到继续下一步
本地DNS服务器向根域名服务器发送请求，根域名服务器会返回一个所查询域的顶级域名服务器地址
本地DNS服务器向顶级域名服务器发送请求，接受请求的服务器查询自己的缓存，如果有记录，就返回查询结果，如果没有就返回相关的下一级的权威域名服务器的地址
本地DNS服务器向权威域名服务器发送请求，域名服务器返回对应的结果
本地DNS服务器将返回结果保存在缓存中，便于下次使用
本地DNS服务器将返回结果返回给浏览器
比如我们如果想要查询 www.baidu.com 的 IP 地址，我们首先会在浏览器的缓存中查找是否有该域名的缓存，如果不存在就将请求发送到本地的 DNS 服务器中，本地DNS服务器会判断是否存在该域名的缓存，如果不存在，则向根域名服务器发送一个请求，根域名服务器返回负责 .com 的顶级域名服务器的 IP 地址的列表。然后本地 DNS 服务器再向其中一个负责 .com 的顶级域名服务器发送一个请求，负责 .com 的顶级域名服务器返回负责 .baidu 的权威域名服务器的 IP 地址列表。然后本地 DNS 服务器再向其中一个权威域名服务器发送一个请求，最后权威域名服务器返回一个对应的主机名的 IP 地址列表。