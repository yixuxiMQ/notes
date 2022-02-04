# Generator 生成器

### 定义：
  - 语法上，首先可以把它理解成，`Generator` 函数是一个状态机，封装了多个内部状态。 执行 `Generator` 函数会返回一个遍历器对象，也就是说，`Generator` 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。
  - 生成器是一个极其灵活的结构，可以在一个函数块内暂停和恢复代码执行。

------

### 操作：

- `Generator` 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 `Generator` 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。

  ```js
  function* generatorFn() {
      yield 'foo';
      return 'tober'
  }
  console.log(generatorFn()); // generatorFn {<suspended>}
  const g = generatorFn()
  console.log(g.next()); // {value: 'foo', done: false}
  console.log(g.next()); // {value: 'tober', done: true}
  console.log(g.next()); // {value: undefined, done: true}
  ```



------

### yield:

- `yield`关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出错误。

- 生成器对象可作为可迭代对象

  ```js
  function* generatorFn() {
  		yield 1;
    	yield 2;
  		yield 3;
  }
  
  for(const x of generatorFn()) {
    console.log(x);
  }
  // 1
  // 2
  // 3
  ```



- `yield`实现输入输出

  - 上一次让生成器函数暂停的`yield`关键字会接收到传给`next()`方法的第一个值

  ```js
  function* generatorFn(n) {
    	let x = yield n; // x = 10
    	let y = x + (yield 2); // y = 10 + 20   (yield在运算中要加括号)
    	let z = y + (yield 3); // z = 30 + 30
    	return x + y + z;
  }
  let g = generatorFn(1);
  console.log(g.next().value) // 1
  console.log(g.next(10).value) // 2
  console.log(g.next(20).value) // 3
  console.log(g.next(30).value) // 100
  ```

  

