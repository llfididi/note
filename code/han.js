new (function Person(name) {
  this.name = name;
})();
Person.prototype.eat = function () {
  console.log("Eatting");
};
var lindaidai = new Person("LinDaiDai");
console.log(lindaidai);
lindaidai.eat();

function create() {
  // 1. 获取构造函数，并且删除 arguments 中的第一项
  var Con = [].shift.call(arguments);
  // 2. 创建一个空的对象并链接到构造函数的原型，使它能访问原型中的属性
  var obj = Object.create(Con.prototype);
  // 3. 使用apply改变构造函数中this的指向实现继承，使obj能访问到构造函数中的属性
  var ret = Con.apply(obj, arguments);
  // 4. 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
