### 实现bind基本思路：

首先：实现调用bind函数不会立即执行，他返回的是一个函数，可以先实现返回函数这一步

其次：调用bind函数后返回的函数可以当做构造函数，即可以使用new关键字，这样一来前面绑定的作用域就失效了，此时this应该是构造函数生成的实例；

最后： 使用new关键字生成的实例，会继承调用bind函数的函数，所以实现实例与函数的继承。 



```js
Function.prototype._bind = function(context) {
	if (typeof this !== 'function') {
    throw TypeError("Bind must be called on a function");
  }
  const arg1 = [...arguments].slice(1);
  const that = this;
  const Fn = function(){}
  function bd() {
    const argSum = arg1.concat([...arguments]);
    if(this instanceof bd) {
      return that.apply(this, argSum)
    }else{
	    return that.apply(context, argSum);  
    }
  }
  Fn.prototype = that.prototype;
  bd.prototype = new Fn()
  return bd;
}
```

