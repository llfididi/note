    const column = {name:12,age:1}
    console.log(`name:${column.name}`)
    var promise = new Promise(function(resolve,reject) {
      // b
      // throw('抛出一个错误')
      return resolve(7)
    }).then((a)=>{ 

      
      console.log(a)
      console.log(123)}
    ).catch(()=>console.log("这是一个错误"))
    // promise.catch(()=>console.log(1))
    // .then会产生一个新的promise对象


        /*
    //Person 类 === 构造函数
    //es5中 类 === 构造函数
    //类：只要有 new new后面跟着的就是类
    //构造函数 ：通过参数 可以传递到本身的this身上
    function Person(name,age){
      this.name = name;
      this.age = age;

      this.fn = function () {
        console.log(this === person)
      }
    }
    let person = new Person('张三',20); //对象
    console.log(person.name)
    console.log(person.fn())
*/

 
    //es6中
    // Person 是类
    // constructor 是构造函数
    /*
        class Person {
          //属性声明在构造函数中
          constructor(name,age) {
            this.name = name;
            this.age = age;
          }
          sayName(){ //只能这样写 没有别的写法
            console.log(this.name)
          }
        }
        let person = new Person('小星',20);
        person.sayName();
        console.log(person)
    */