

# 自定义 loader

---

### 一、自定义 loader

1. 创建自己的 loader
   1. loader 是用于对模块的源代码进行转换（处理），比如css-loader、style-loader、babel-loader
   2. 自定义loader：
      1. loader本质上是一个导出为函数的JavaScript模块
      2. loader runner 库会调用这个函数，然后将上一个 loader 产生的结果或者资源文件传入进去
   3. loader可接受的三个参数
      1. content 源文件内容
      2. map sourcemap数据
      3. mate 数据，可以是任何内容


---

### 二、同步和异步

1. 同步loader

   1. ```js
      module.exports = function (content, map, meta) {
        return content;
      };
      
      
      // this.callback 方法则更灵活，因为它允许传递多个参数，而不仅仅是 content。
      module.exports = function (content, map, meta) {
        // 传递map，让source-map不中断
        // 传递meta，让下一个loader接收到其他参数
        this.callback(null, content, map, meta);
        return; // 当调用 callback() 函数时，总是返回 undefined
      };
      ```

2. 异步loader

   1. ```js
      module.exports = function (content, map, meta) {
        const callback = this.async();
        // 进行异步操作
        setTimeout(() => {
          callback(null, result, map, meta);
        }, 1000);
      };
      ```

      由于同步计算过于耗时，在 Node.js 这样的单线程环境下进行此操作并不是好的方案，建议尽可能地使**自定义 loader 异步化**。但如果计算量很小，同步 loader 也是可以的。


---

### 三、传入和获取参数

1. 通过webpack官方提供的一个解析库 loader-utils ，来获取传入参数

2. ```sh
   npm install loader-utils -D
   ```

3. ```js
   // webpack.config.js
   {
   	test: /\.js$/i,
   	use: {
   		loader: 'my-loader',
   		options: {
   			name: 'tober',
   			age: 18
   		}
   	}
   }
   
   
   // my-loader.js
   const { getOptions } = require('loader-utils');
   module.exports = function(content){
     // 设置为异步参数
     const callback = this.async();
     
     // 获取参数
     const options = getOptions(this);
     
     setTimeout(() => {
       console.log('my-loader', content, options);
       callback(null, content)
     }, 1000)
   }
   ```


---

### 四、校验参数

1. 通过webpack官方提供的校验库 schema-utils ，校验参数

2. ```sh
   npm install schema-utils -D
   ```

3. ```js
   // myLoader-schema.json
   {
     "type": "object",
     "properties": {
       "name": {
         "type": "string",
         "description": "请填写你的名称"
       },
       "age": {
         "type": "number",
         "description": "请填写你的年龄"
       }
     },
     "additionalProperties": true
   }
   
   
   
   // my-loader.js
   const { getOptions } = require('loader-utils');
   const { validate } = require('schema-utils');
   const myLoaderSchema = require('../schema/myLoader-schema.json');
   
   module.exports = function(content){
     // 设置为异步参数
     const callback = this.async();
     
     // 获取参数
     const options = getOptions(this);
     
     // 参数校验
     validate(myLoaderSchema, options);
     
     setTimeout(() => {
       console.log('my-loader', content, options);
       callback(null, content)
     }, 1000)
   }
   ```

   