### 实现apply基本思路：

与call的实现思路相同，唯一不同的就是传入参数的方式，apply的第二个参数是个数组。



```js
Function.prototype._apply = function(context) {
  const o = context == undefined ? window : Object(context);
  if (!Array.isArray(arguments[1])) {
  	throw new Error('arg not a array')
  }
  const args = arguments[1];
  o.fn = this;
  let res;
  if (arg) {
    res = o[fn](...arg);
  } else {
    res = o[fn]();
  }
  delete o.fn;
  return res;
}
```

