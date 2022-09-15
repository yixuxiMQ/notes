

# Babel

---

### 一、`babel`初步了解

1. 为什么需要`babel`？
   1. JavaScript 编译器，主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
2. `babel`到底是什么？
   1. 一个工具链，包括语法转换、源代码转换、polyfill实现目标环节缺少的功能等


---

### 二、`babel`底层原理

1. 可以将`babel`看做是一个`编译器`，它的作用就是**将我们的源代码转换成浏览器可以识别的另外一段源代码**
2. `babel`拥有编译器的工作流程：
   1. 解析阶段（ parsing ）
   2. 转换阶段（ transformation ）
   3. 生成阶段（ code generator ）
3. `babel`的具体工作流程：
   1. 原生源代码
   2. 词法分析（ lexical analysis ）
   3. tokens数组
   4. 语法分析（ syntactic analysis ）
   5. AST抽象语法树
   6. 遍历（ traversal ）：对整个树结构进行遍历
   7. 访问（ visitor ）：在遍历的时候会对每一个节点进行访问
   8. 应用插件（ plugin ）：在访问节点的过程中应用插件，改变节点
   9. 新的AST抽象语法树
   10. 目标源代码


---

### 三、`babel`的使用

1. 配置文件：

   1. `babel.config.js`或者`babel.config.json`，在项目根目录新建文件
   2. `.babelrc`或者`.babelrc.js`或者`.babelrc.json`，在项目根目录新建文件

   上面的两类文件只需要新建一类就可以，`babel`会自动查找和读取

2. 具体配置：

   1. 安装相关依赖：

      ```sh
      npm i babel-loader @babel/core @babel/preset-env -D
      ```

   2. 以babel.config.js为例：

      ```js
      module.exports = {
        presets: ["@babel/preset-env"]
      }
      ```

      `presets`就是预设，可以理解为`babel`插件，扩展`babel`的功能：

      - `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
      - `@babel/preset-react`：一个用来编译 React jsx 语法的预设
      - `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

   3. webpack.config.js中配置：

      1. ```js
         module.exports = {
           module: {
             rules: [
               {
                 test: /\.js$/,
                 exclude: /node_modules/, // 排除node_modules代码不编译
                 loader: "babel-loader",
               },
             ],
           }
         };
         ```


---

### 四、认识`polyfill`

1. 什么是 polyfill ？

   - polyfill 可以理解为`填充物、补丁`，为了我们能够更好地运用**JavaScript新特性**

2. 什么时候使用 polyfill ？

   - 当我们使用了一些语法特性（例如：Promise、Generator、Symbol等以及实例方法例如 Array.prototype.includes 等），浏览器根本不认识这些特性，就会报错，这个时候我们就可以**使用 polyfill 来填充或者说打一个补丁**，就会包含该新特性

3. 如何使用 polyfill ？

   - babel 7.4.0 之后，可以通过单独引入 core-js 和 regenerator-runtime 来完成 polyfill 的使用

     ```shell
     npm install core-js regenerator-runtime --save
     ```

   - `babel.config.js`

     ```js
     module.exports = {
       prests: [
         ["@babel/preset-env", {
           // useBuiltIns 决定了如何使用 polyfill，有三个值：
           // false 不使用 polyfill
           // usage 根据源代码中需要哪些 polyfill 就引入哪些 polyfill
           // entry 只要是目标浏览器需要的 polyfill 都会引入，不在乎源代码中有没有用到
           // 值为 entry 时，需要在入口文件 index.js 中引入文件：
           // 					import "core-js/stable"; 
           //					import "regenerator-runtime/runtime";
           useBuiltIns: "",
           // 指定 corejs 版本 3 ， 默认是 2 的版本
           corejs: 3
         }]
       ]
     }
     ```

     