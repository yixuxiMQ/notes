```js
  Array.prototype._forEach = function(fn){
    let arr = this;
    let len = this.length;
    let arg2 = arguments[1] || window;
    for(let i = 0; i < len; i++){
        fn.call(arg2, arr[i], i, arr);
    }
}
```