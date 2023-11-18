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

cors(Cross-Origin Resource Sharing) Access-Control-Allow-Origin:http://location:8000 ie10以上

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
- 发起tcp连接 三次握手
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

## get和post请求的区别

应用场景：一般get请求用于对服务器资源不会产生影响的场景，比如请求一个网页。post一般用于注册用户这一类的操作。
参数类型：get只接受ascii字符。post 的参数传递支持更多的数据类型，放在请求正文里（body）。
发送的报文格式：Get 请求的报文中实体部分为空，Post 请求的报文中实体部分一般为向服务器发送的数据。
请求长度：浏览器由于对 url 有一个长度上的限制，所以会影响 get 请求发送数据时的长度。这个限制是浏览器规定的，并不是 RFC 规定的。
是否缓存：因为不同的应用场景，所以浏览器一般会对 Get 请求缓存，但很少对 Post 请求缓存。get被浏览器主动cache，post要手动设置，Cache-Control: max-age=3600
安全性：GET参数通过URL传递，POST放在Request body中

只是后天的人为规定造成了它们之间的不同和缺陷

get是幂等：在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同

## http和https

HTTPS是在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密（在传输层）
HTTP + 加密 + 认证 + 完整性保护 = HTTPS

https具有安全性的ssl加密

HTTP是直接与TCP进行数据传输；
HTTPS运行在SSL/TLS(安全传输层协议)之上，SSL/TLS运行在TCP之上，用的端口也不一样，前者是80（需要国内备案），后者是443

HTTP的连接很简单，是无状态的；
HTTPS协议是由SSL+HTTP协议构建的，可进行加密传输、身份认证的网络协议，比HTTP协议安全

## http request & response header 

请求和响应报文都会使用的首部
- Cache-Control 告诉所有的缓存机制是否可以缓存及哪种类型
- Connection 是否需要持久化连接
- Transfer-Encoding 文件传输编码

Request Header
- Accept 客户能够接收的内容类型，内容类型中的先后次序表示客户端接收的先后次序
- Range 实体的字节范围请求
- Authorization web的认证信息
- Host 请求资源所在的服务器
- User-Agent 客户端程序信息

Response Header
- Location 令客户端重定向的url
- Expires 响应过期的日期和时间
- Allow 资源可支持http请求的方法，不允许则返回405
- Content-Type 返回内容的媒体类型 Content-Type:text/html;charset=utf-8

## options
除了get和post之外的其中一种http请求方法


主要用途
获取服务器支持的所有HTTP请求方法
用来检查访问权限。例如：JS 的 XMLHttpRequest对象进行 CORS 跨域资源共享时，对于复杂请求，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。


## 状态码
1xx Informational(信息性状态码)接收的请求正在处理

2xx Success(成功状态码)请求正常处理完毕

3xx Redirection(重定向状态码)需要进行附加操作以正确处理请求
永久重定向有两个： 301和308。
- 两者都默认缓存，
- 但是308不允许将请求方法从POST修改到GET, 301允许。

临时重定向三个：302，303，307

303强制浏览器可以将请求方法从POST修改到GET
307不允许浏览器修改请求方法。
302一开始的标准是不允许修改POST方法，但是浏览器的实现不遵循标准，标准就向现实妥协而做了修改。

304 Not Modified

浏览器缓存相关。 该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。

带条件的请求（Http 条件请求）：使用 Get方法 请求，请求报文中包含（if-match、if-none-match、if-modified-since、if-unmodified-since、if-range）中任意首部。

状态码304并不是一种错误，而是告诉客户端有缓存，直接使用缓存中的数据。返回页面的只有头部信息，是没有内容部分的，这样在一定程度上提高了网页的性能。

4xx Client Error(客户端错误状态码)服务器无法处理请求

5xx Server Error(服务器错误状态码)服务器处理请求出错

## http缓存策略
HTTP缓存是一种提高网页性能的技术，它可以减少服务器的负载，加快客户端的响应速度，节省网络带宽。HTTP缓存分为两种类型：强制缓存和协商缓存。

强制缓存是指客户端在一定时间内直接使用本地缓存的资源，不需要向服务器发送请求。强制缓存的控制由服务器端的响应头来指定，主要有两个字段：Cache-Control和Expires


协商缓存是指客户端在每次请求时都要向服务器询问资源是否有更新，如果没有更新，则返回304状态码和空响应体，表示可以继续使用本地缓存；如果有更新，则返回200状态码和新的资源，表示需要替换本地缓存。协商缓存的控制由服务器端和客户端共同参与，主要有两组字段：Last-Modified/If-Modified-Since和ETag/If-None-Match。

https://juejin.cn/post/7270334229597683766?searchId=2023111616421605D807002F8B455C592D

## 正向代理 反向代理
正向：知道访问哪里
访问原来无法访问的资源，如Google
可以做缓存，加速访问资源
对客户端访问授权，上网进行认证
代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

反向：不知道访问哪里 
保证内网的安全，通常将反向代理作为公网访问地址，Web服务器是内网
负载均衡，通过反向代理服务器来优化网站的负载


## get 请求是否限制了传参长度
浏览器和web服务器限制了url的长度，不同浏览器限制长度不一样。

## cookie 怎么设置只在 https 时携带？
设置 cookie 的 secure 属性。

sameSite
sameSite是为了防止csrf攻击而产生的属性，如果不知道啥是CSRF攻击，可以自己先去查一下。

由于我们需要在请求中带上cookie，所以需要在set-cookie时将cookie的sameSite设置为none；又由于将sameSite设置为none时，也需要将Secure设置上，所以请求需要基于https;
