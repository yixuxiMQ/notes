# Iterator 迭代器

1. ### 定义：

   - `iterator` ( 迭代器 ) ，是一种接口，为不同的数据结构提供统一的访问机制。任何数据结构只要部署`iterator`接口，就可以完成遍历操作。

     ------

     

2. ### 作用：

   - 为各种数据结构提供统一的、便捷的访问接口；

   - 可以使数据接口的成员按照某种次序排列；

   - 创造了`for...of`循环命令。

     ------

     

3. ### 遍历过程：

   - 创建一个指针对象，指向当前数据结构的起始位置；

   - 第一次调用指针对象的`next`方法，可以将指针指向当前数据结构的第一个成员；

   - 第二次调用指针对象的`next`方法，可以将指针指向当前数据结构的第二个成员；

   - 第三次、第四次依次同样操作；

   - 不断调用指针的`next`方法，直到指针指向当前数据结构的末尾。

     ------

     

4. ### 模拟实现：

   ```javascript
   function _iterator(arr) {
               let nextIndex = 0;
               return {
                   next() {
                       return nextIndex < arr.length ?
                       { value: arr[nextIndex++], done:false } :
                       { value: undefined, done: true }
                   }
               }
           }
   let arr = ['a', 'b', 'c'];
   let it = _iterator(arr);
   it.next(); //{value: 'a', done: false}
   it.next(); //{value: 'b', done: false}
   it.next(); //{value: 'c', done: false}
   it.next(); //{value: undefined, done: true}
   ```

   ------

   
# for...of 循环

   > 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以用`for...of`循环遍历它的成员。也就是说`for...of`调用的是数据结构的`Symbol.iterator`方法。
   >
   > `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
   >
   > [阮一峰 `for...of`循环](https://es6.ruanyifeng.com/?search=promise&x=0&y=0#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)

 - [ ] ### `for...of`与`for..in`的区别：

  - `for...in`循环，只能获得对象的键名，不能直接获取键值。`for...of`循环，允许遍历获得键值。
  - `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。
  - 对于普通的对象，`for...of`结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，`for...in`循环依然可以用来遍历键名。
  - `for...in`只要针对遍历对象而设计，`for...of`更适合遍历数组。
  - `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。

