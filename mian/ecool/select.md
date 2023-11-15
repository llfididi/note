## new Number(3) 输出什么
输出一个对象，不是3！

## const num = parseInt("7*6", 10);
num = 7


## Maserati
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };


}

const myCar = new Car();
console.log(myCar.make);


## defineProperty
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));

通过defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了"name". 用defineProperty方法添加的属性默认不可变。你可以通过writable, configurable 和 enumerable属性来改变这一行为。这样的话， 相比于自己添加的属性，defineProperty方法添加的属性有了更多的控制权。

## 便利对象

const object1 = {
  a: 'somestring',
  b: 42,
};



for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}


## 对象的剩余参数

... args是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，并且只能作为最后一个参数。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。


function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
}
getItems(["banana", "apple"], "pear", "orange")

// [ 'banana', 'apple', 'orange', 'pear' ]

## symbol 不可枚举
const info = {
  [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
// {Symbol('a'): 'b'} and []

## 值得学习的yieid函数
async function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield Promise.resolve(i);
	}
}

(async () => {
	const gen = range(1, 3);
	for await (const item of gen) {
		console.log(item);
	}
})();