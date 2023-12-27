JavaScript的数字类型：(console(typeof 666) //返回一个字符串，表示未经计算的操作数的类型)
    undefined number string boolean null  object
    es6 Symbol 这种对象永不相等，解决属性名冲突的问题
    引用类型object包含:Data function Array 正则等()

原型：在当前类可以调用的方法

原型链：__proto__链状结构，当前没有就找上一级

       哪里用到了：Vue.prototype.$axios =  this.$axios()
               或求平均值:(在原型上直接调用)
               let ddd = [1,3,4]
               ddd.average() 
               Array.prototype.average = function(){
                   let sum = 0;
                   for(let i =0;i<this.length;i++){
                       sum+=this[i]
                   }
                   return sum/this.length
               }

继承：
    1：类继承
    2：构造函数继承
    3：组合继承
    4：寄生组合继承
    5：extends es6

闭包:
     1：读取函数内部的变量
     2：使这些变量的值始终保存在内存中  



错题解析：
        1：overflow属性：
                        scroll：必会出出现滚动条；
                        auto：子元素内容大于父元素时出现滚动条
                        visible：溢出的内容出现在父元素之外
                        hidden:溢出隐藏
        2：
        