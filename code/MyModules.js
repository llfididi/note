
/**
 * 一个巧妙的构造函数
 * 
 * modules 可以继承bar的函数并使用 
 * 
 */

var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl(...deps);
  }
  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  };
})();

MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }
  return {
    hello,
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  function awesome(e) {
    console.log(bar.hello(e).toUpperCase());
  }
  return {
    awesome,
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(bar.hello("hippo")); // I Let me introduce: hippo
foo.awesome("hippos"); // LET ME INTRODUCE: HIPPO
