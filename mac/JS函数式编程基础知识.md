# 一、引言 

函数式编程的历史已经很悠久了，但是最近几年却频繁的出现在大众的视野，很多不支持函数式编程的语言也在积极加入闭包，匿名函数等非常典型的函数式编程特性。大量的前端框架也标榜自己使用了函数式编程的特性，好像一旦跟函数式编程沾边，就很高大上一样，而且还有一些专门针对函数式编程的框架和库，比如：RxJS、cycleJS、ramdaJS、lodashJS、underscoreJS 等。函数式编程变得越来越流行，掌握这种编程范式对书写高质量和易于维护的代码都大有好处，所以我们有必要掌握它。

# 二、什么是函数式编程

维基百科定义：函数式编程（英语：functional programming），又称泛函编程，是一种编程范式，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。

# 三、纯函数（函数式编程的基石，无副作用的函数）

![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73ziclRKVibg9iaiaenCe5vrVX9MXAibwKU1glKNbPD9OSpdh7PjWkuW1A5EpH87lIKAqIjQ83cDmJwWYicDg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)在初中数学里，函数 f 的定义是：对于输入 x 产生一个唯一输出 y=f(x)。这便是纯函数。它符合两个条件：1.此函数在相同的输入值时，总是产生相同的输出。函数的输出和当前运行环境的上下文状态无关。2.此函数运行过程不影响运行环境，也就是无副作用（如触发事件、发起 http 请求、打印/log 等）。简单来说，也就是当一个函数的输出不受外部环境影响，同时也不影响外部环境时，该函数就是纯函数，也就是它只关注逻辑运算和数学运算，同一个输入总得到同一个输出。javascript 内置函数有不少纯函数，也有不少非纯函数。

纯函数：Array.prototype.sliceArray.prototype.mapString.prototype.toUpperCase

非纯函数：Math.randomDate.nowArray.ptototype.splice

这里我们以 slice 和 splice 方法举例：

```
var xs = [1,2,3,4,5];
// 纯的
xs.slice(0,3);
//=> [1,2,3]
xs.slice(0,3);
//=> [1,2,3]
xs.slice(0,3);
//=> [1,2,3]

// 不纯的
xs.splice(0,3);
//=> [1,2,3]
xs.splice(0,3);
//=> [4,5]
xs.splice(0,3);
//=> []
```

我们看到调用数组的 slice 方法每次返回的结果完全相同，同时 xs 不会被改变，而调用 splice 方法每次返回值都不一样，同时 xs 变得面目全非。这就是我们强调使用纯函数的原因，因为纯函数相对于非纯函数来说，在可缓存性、可移植性、可测试性以及并行计算方面都有着巨大的优势。这里我们以可缓存性举例：

```
var squareNumber  = memoize(function(x){ return x*x; });
squareNumber(4);
//=> 16
squareNumber(4); // 从缓存中读取输入值为 4 的结果
//=> 16
```

那我们如何把一个非纯函数变纯呢？比如下面这个函数：

```
var minimum = 21;
var checkAge = function(age) {
  return age >= minimum;
};
```

这个函数的返回值依赖于可变变量 minimum 的值，它依赖于系统状态。在大型系统中，这种对于外部状态的依赖是造成系统复杂性大大提高的主要原因。

```
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
```

通过改造，我们把 checkAge 变成了一个纯函数，它不依赖于系统状态，但是 minimum 是通过硬编码的方式定义的，这限制了函数的扩展性，我们可以在后面的柯里化中看到如何优雅的使用函数式解决这个问题。所以把一个函数变纯的基本手段是不要依赖系统状态。

# 四、函数柯里化

curry 的概念很简单：将一个低阶函数转换为高阶函数的过程就叫柯里化。![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73ziclRKVibg9iaiaenCe5vrVX9MXT6ST8tbA1XqJWNibuZe6Th3SA00oPQcoMSicJ0Gkfy7W0EnHuLunicQVg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)用一个形象的比喻就是：![图片](https://mmbiz.qpic.cn/mmbiz_gif/lP9iauFI73ziclRKVibg9iaiaenCe5vrVX9MXqyLUp7WbBACpyWSX6dZjJrLgBZm5VF1xUqlGeSG3Vv400I1z53hHmw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)比如对于加法操作：var add = (x, y) => x + y，我们可以这样柯里化：

```
//es5写法
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

//es6写法
var add = x => (y => x + y);

//试试看
var increment = add(1);
var addTen = add(10);

increment(2);  // 3

addTen(2);  // 12
```

对于加法这种极其简单的函数来说，柯里化并没有什么用。还记得上面的 checkAge 函数吗？我们可以这样柯里化它：

```
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20);
// =>true
```

这表明函数柯里化是一种“预加载”函数的能力，通过传递一到两个参数调用函数，就能得到一个记住了这些参数的新函数。从某种意义上来讲，这是一种对参数的缓存，是一种非常高效的编写函数的方法：

```
var curry = require('lodash').curry;

//柯里化两个纯函数
var match = curry((what, str) => str.match(what));
var filter = curry((f, ary) => ary.filter(f));

//判断字符串里有没有空格
var hasSpaces = match(/\s+/g);

hasSpaces("hello world");  // [ ' ' ]
hasSpaces("spaceless");  // null

var findSpaces = filter(hasSpaces);

findSpaces(["tori_spelling", "tori amos"]);  // ["tori amos"]
```

# 五、函数组合

假设我们需要对一个字符串做一些列操作，如下，为了方便举例，我们只对一个字符串做两种操作，我们定义了一个新函数 shout，先调用 toUpperCase，然后把返回值传给 exclaim 函数，这样做有什么不好呢？不优雅，如果做得事情一多，嵌套的函数会非常深，而且代码是由内往外执行，不直观，我们希望代码从右往左执行，这个时候我们就得使用组合。

```
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };

var shout = function(x){
  return exclaim(toUpperCase(x));
};

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"
```

使用组合，我们可以这样定义我们的 shout 函数：

```
//定义compose
var compose = (...args) => x => args.reduceRight((value, item) => item(value), x);

var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };

var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"
```

代码从右往左执行，非常清晰明了，一目了然。我们定义的 compose 像 N 面胶一样，可以将任意多个纯函数结合到一起。这种灵活的组合可以让我们像拼积木一样来组合函数式的代码：

```
var head = function(x) { return x[0]; };
var reverse = reduce(function(acc, x){ return [x].concat(acc); }, []);
var last = compose(head, reverse);

last(['jumpkick', 'roundhouse', 'uppercut']);
//=> 'uppercut'
```

# 六、声明式和命令式代码

命令式代码：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。声明式代码：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。与命令式不同，声明式意味着我们要写表达式，而不是一步一步的指示。以 SQL 为例，它就没有“先做这个，再做那个”的命令，有的只是一个指明我们想要从数据库取什么数据的表达式。至于如何取数据则是由它自己决定的。以后数据库升级也好，SQL 引擎优化也好，根本不需要更改查询语句。这是因为，有多种方式解析一个表达式并得到相同的结果。这里为了方便理解，我们来看一个例子：

```
// 命令式
var makes = [];
for (var i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}

// 声明式
var makes = cars.map(function(car){ return car.make; });
```

命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码。然后再直接迭代 cars 列表，手动增加计数器，就像你开了一辆零部件全部暴露在外的汽车一样。这不是优雅的程序员应该做的。声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。它指明的是做什么，而不是怎么做。除了更加清晰和简洁之外，map 函数还可以进一步独立优化，甚至用解释器内置的速度极快的 map 函数，这么一来我们主要的业务代码就无须改动了。函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。相反，不纯的不函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。

# 七、Point Free

pointfree 模式指的是，永远不必说出你的数据。它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。

```
// 非 pointfree，因为提到了数据：word
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

// pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```

这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通用。当然，为了在一些函数中写出 Point Free 的风格，在代码的其它地方必然是不那么 Point Free 的，这个地方需要自己取舍。

# 八、示例应用

拥有了以上的知识，我们是时候该写一个示例应用了。这里我们使用了 ramda ，没有用 lodash 或者其他类库。ramda 提供了 compose、curry 等很多函数。我们的应用将做四件事：1.根据特定搜索关键字构造 url
2.向 flickr 发送 api 请求
3.把返回的 json 转为 html 图片
4.把图片放到屏幕上上面提到了两个不纯的动作，即从 flickr 的 api 获取数据和在屏幕上放置图片这两件事。我们先来定义这两个动作，这样就能隔离它们了。这里我们只是简单包装了一下 jQuery 的 getJSON 函数，把它变为一个 curry 函数，还有就是把参数位置也调换了下，我们把它们放在 Impure 命名空间下以用来隔离，这样我们就知道它们都是危险函数。运用函数柯里化和函数组合的技巧，我们就可以创建一个函数式的实际应用了：![图片](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73ziclRKVibg9iaiaenCe5vrVX9MX08iblGoQd35BRbnxXyDDacVarg3xW2jics4McVnXAuB7aENTCq85JP0Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)**预览地址：demo**[1]看看，多么美妙的声明式规范啊，只说做什么，不说怎么做。现在我们可以把每一行代码都视作一个等式，变量名所代表的属性就是等式的含义。

# 九、总结

我们已经见识到如何在一个小而不失真实的应用中运用新技能了，但是异常处理以及代码分支呢？如何让整个应用都是函数式的，而不仅仅是把破坏性的函数放到命名空间下？如何让应用更安全更富有表现力？我会在下一篇文章中介绍函数式编程的更加高阶一些的知识，例如 Functor、Monad、Applicative 等概念