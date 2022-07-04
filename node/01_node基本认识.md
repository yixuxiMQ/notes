# Node基本认识

---

### 一、什么是Node.js？

1. Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。

---

### 二、浏览器内核是什么？

1. 浏览器内核指的是浏览器的排版引擎

   1. **排版引擎**（layout engine），也称为**浏览器引擎**（browser engine）、**页面渲染引擎**（rendering engine） 

      或**样版引擎**。

2. 不同的浏览器有不同的内核组成：

   1. Gecko：早期被Netscape和Mozilla Firefox浏览器使用；
   2. Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
   3. Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
   4. Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；


---

### 三、Node的REPL

1. **REPL**是**Read-Eval-Print Loop**的简称，翻译为**“读取-求值-输出”循环**； 
2. REPL是一个简单的、交互式的编程环境；

---

### 四、Node中特殊的全局对象

1. 为什么是特殊的？

   1. 这些全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的；

2. ```js
   console.log(__dirname);
   // /Users/tober/Desktop/node/03_全局对象
   console.log(__filename);
   // /Users/tober/Desktop/node/03_全局对象/01_node中特殊的全局对象.js
   ```

---

### 五、Node的常见的全局对象

1. **process对象：**process提供了Node进程中相关的信息；

2. **console对象：**提供了简单的调试控制台；

3. **定时器函数：**

   ```js
   setTimeout(() => {
     console.log("setTimeout");
   }, 1000);
   
   setInterval(() => {
     console.log("setInterval");
   }, 1000);
   
   setImmediate(() => {
     console.log("setImmediate");
   });
   
   process.nextTick(() => {
     console.log("process.nextTick");
   });
   ```

    

