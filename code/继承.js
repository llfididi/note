//extends :继承的关键字
// super：es6中的super:超类 === 父类 此处的super是一个方法

class Person {
    constructor() {
    }
    father(){
        console.log('father')
    }

}

class Man extends Person {
    constructor(height) {
        super(); //如果继承父类的画 做一件事 调用父类的构造方法
        this.height = height
    }
    studyCoding() {
        console.log(`男人学习编程`)
    }
}

class Woman extends Person {
    constructor(height) {
        super(); //
        this.height = height
    }
    studyDrawing() {
        console.log(`女人学习画画`)
    }
}

let man = new Man()
man.studyCoding()
man.father()