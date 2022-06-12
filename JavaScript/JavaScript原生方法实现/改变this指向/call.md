### 实现call基本思路：

在接收到的对象上添加一个属性，将this赋值给这个属性，此时的this就是调用call的函数，也就是将函数赋值给属性，最后将函数执行返回结果。



```js
/**
 * Object()方法
 * 如果传入的是值类型 会返回对应类型的构造函数创建的实例
 * 如果传入的是对象 返回对象本身
 * 如果传入 undefined 或者 null 会返回空对象
 */

Function.prototype._call = function(context){
  const o = context == undefined ? window : Object(context)
  const args = [...arguments].slice(1);
 	// 声明一个不重复的键名，仅此而已
  const fn = Symbol();
  o[fn] = this;
  const res = o[fn](...args);
  delete o[fn];
  return res;
}


// test
const obj = {
  name: 'tober'
};

function foo() {
  console.log(this.name)
}

foo._call(obj); // tober
```

