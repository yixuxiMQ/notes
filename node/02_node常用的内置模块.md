# Node常用的内置模块

---

### 一、path模块

1. path模块用于对路径和文件进行处理，提供了很多好用的方法

2. ```js
   const path = require("path");
   
   const filename = "/Users/01_路径演练.js";
   // 路径的拼接
   const res = path.resolve(__dirname, filename);
   console.log(res);
   // /Users/01_路径演练.js
   
   console.log(path.basename(res));
   // 01_路径演练.js
   console.log(path.dirname(res));
   // /Users
   console.log(path.extname(res));
   // .js
   ```

---

### 二、fs模块

1. fs是File System的缩写，表示文件系统。

2. node的API大多数都提供三种操作方式：

   1. 同步操作文件：代码会被阻塞，不会继续执行

   2. 异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行

   3. 异步Promise操作文件：代码不会被阻塞，通过 fs.promises 调用方法操作，会返回一个Promise，

      可以通过then、catch进行处理

   ```js
   const fs = require("fs");
   
   // 同步
   const state = fs.statSync("./test.txt");
   console.log(state);
   console.log(1111111111);
   
   // 异步
   fs.stat("./test.txt", (err, state) => {
     if (err) {
       console.log(err);
       return;
     }
     console.log(state);
   });
   console.log(2222222222)
   
   // 异步Promise
   fs.promises.stat("./test.txt").then(
     (state) => {
       console.log(state);
       console.log(state.isDirectory());
     },
     (reason) => {
       console.log(reason);
     }
   );
   console.log(333333333);
   ```

3. 文件的读写

   ```js
   const fs = require("fs");
   
   const content = "hello world!!!!!!!!!";
   
   fs.writeFile("./test.txt", content, { flag: "a" }, (err) => {
     if (err) {
       console.log(err);
       return;
     }
   });
   
   // 如果不填写encoding，返回的结果是Buffer
   fs.readFile("./test.txt", { encoding: "utf-8" }, (err, data) => {
     console.log(data);
   });
   ```

   在写入操作时，有flag选项，它的值：

   - w 打开文件写入，默认值； 
   - w+ 打开文件进行读写，如果不存在则创建文件
   - r+ 打开文件进行读写，如果不存在那么抛出异常
   - r 打开文件读取，读取时的默认值
   - a 打开要写入的文件，将流放在文件末尾。如果不存在则创建文件
   - a+ 打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

4. 文件夹操作

   ```js
   const fs = require("fs");
   const path = require("path");
   
   // 创建文件夹
   const dirname = "./yxx";
   if (!fs.existsSync(dirname)) {
     fs.mkdir(dirname, (err) => {
       if (err) {
         console.log(err);
       }
     });
   }
   // 读取文件夹中的所有文件
   fs.readdir(dirname, (err, files) => {
     if (err) {
       console.log(err);
       return;
     }
     console.log(files);
   });
   
   // 如果文件夹中还有文件夹，可以采用递归操作
   function getFiles(dirname) {
     fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
       if (err) {
         console.log(err);
         return;
       }
       files.forEach((file) => {
         if (file.isDirectory()) {
           const filePath = path.resolve(dirname, file.name);
           getFiles(filePath);
         } else {
           console.log(file.name);
         }
       });
     });
   }
   getFiles(dirname);
   
   // 文件夹的重命名
   fs.rename(dirname, "./yxx", (err) => {
     if (err) {
       console.log(err);
       return;
     }
   });
   ```

---

### 三、events模块

1. Node中的核心API都是基于异步事件驱动的：

   1. 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
   2. 可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用

2. 发出事件和监听事件都是通过EventEmitter类来完成的，它们都属于events对象

   1. `emitter.on(eventName, listener)`：监听事件，也可以使用addListener； 

   2. `emitter.off(eventName, listener)`：移除事件监听，也可以使用removeListener； 

   3. `emitter.emit(eventName[, ...args])`：发出事件，可以携带一些参数；

      ```js
      const EventEmitter = require("events");
      
      // 创建发射器
      const emitter = new EventEmitter();
      
      // 监听一个事件
      //  addListener和on是一样的
      emitter.on("click", (...args) => {
        console.log("监听事件1触发", args);
      });
      
      const listener2 = (...args) => {
        console.log("监听事件2触发", args);
      };
      emitter.on("click", listener2);
      
      emitter.emit("click", "abc", "cba", "nab");
      emitter.off("click", listener2);
      ```


------

