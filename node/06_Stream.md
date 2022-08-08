# Stream

---

### 一、认识Stream

1. 什么是流呢？
   1. 第一反应应该是流水，源源不断的流动
   2. 程序中的流定义也是类似，当从一个文件中读取数据时，文件的二进制(字节)数据会源源不断的被读取到程序中，这一连串的字节数据就是流
   3. 流是连续字节的表现形式和抽象概念
   4. 流是可读可写的

2. 读写文件时，可以使用readFile和writeFile的方式，为什么还需要`流`呢？
   1. 直接读写文件，虽然简单，但是无法控制一些细节
   2. 比如从什么位置开始读，读到什么位置，一次性读取多少字节
   3. 读到某个位置暂停读取，某个时刻恢复读取等，因为有时候读取的文件比较大（比如视频），一次性读取完不合适


---

### 二、文件读写的Stream

1. node中很多对象是基于流实现的

   1. http模块的request和response对象
   2. process.stdout对象

2. 官方：所有的流都是EventEmitter的实例

3. node中有四种基本流类型：

   1. Writable：可以向其写入数据的流（例如 fs.createWriteStream()）
   2. Readable：可以从中读取数据的流（例如 fs.createReadStream()）
   3. Duplex：同时为Readable和的流Writable（例如 net.Socket）
   4. Transform：Duplex可以在写入和读取数据时修改或转换数据的流（例如zlib.createDeflate()）

4. Readable:

   1. 之前读取写入文件：

      ```js
      const fs = require("fs");
      
      fs.readFile("./index.txt", {}, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data.toString());
        fs.writeFile("./write.txt", data, (err) => console.log(err));
      });
      ```

      缺点：文件过大、无法确定读取的位置和结束的位置、一次读取的大小

   2. 使用流的createReadStream

      1. start：文件读取开始的位置

      2. end：文件读取结束的位置

      3. highWaterMark：一次性读取字节的长度，默认是64kb

         ```js
         const read = fs.createReadStream("./index.txt", {
           start: 1,
           end: 6,
           highWaterMark: 2,
         });
         
         read.on("open", () => {
           console.log("文件打开");
         });
         
         read.on("data", (data) => {
           // 读取暂停
           read.pause();
         	
           // 利用setTimeout实现间隔读取
           setTimeout(() => {
             // 读取恢复
             read.resume();
           }, 1000);
         });
         
         read.on("end", () => {
           console.log("读取结束");
         });
         
         read.on("close", () => {
           console.log("文件被关闭");
         });
         ```

5. Writable:

   1. 使用 createWriteStream

      1. flags：默认是w，如果我们希望是追加写入，可以使用 a或者 a+；

      2. start：写入的位置

         ```js
         const write = fs.createWriteStream("./write.txt", {
           flags: "a+",
           highWaterMark: 2,
         });
         
         write.on("open", () => {
           console.log("文件打开");
         });
         
         write.write("一许西", (err) => {
           if (err) {
             console.log(err);
             return;
           }
           console.log("写入成功");
         });
         
         // 必须手动关闭
         // write.close()
         write.end("hello world");
         
         write.on("finish", () => {
           console.log("写入结束");
         });
         
         write.on("close", () => {
           console.log("文件关闭");
         });
         ```

      3. 通过on并不能监听到close事件：

         1. 因为写入流在打开后是不会自动关闭的
         2. 必须手动关闭，来告诉Node已经写入结束了
         3. 并且会发出一个 finish 事件
         4. 另外一个非常常用的方法是 end：end方法相当于做了两步操作： write传入的数据和调用close方法

6. pipe方法：

   ```js
   const fs = require("fs");
   
   const read = fs.createReadStream("./index.txt");
   const write = fs.createWriteStream("./foo.txt");
   
   read.pipe(write);
   ```

