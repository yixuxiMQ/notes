

# 自定义 plugin

---

### 一、plugin 原理

1. plugin 的作用

   1. 通过插件我们可以扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

2. plugin 的工作原理

   > 1. webpack就如同一条生产线，要经过一系列处理流程才能将源文件转换成输出结果。
   > 2. 这条生产线上的每个处理流程的职责都是单一的，多个流程之间存在依赖关系，只有在完成当前流程时才能交给下一个流程处理
   > 3. 插件就像是插入到生产线中的一个功能，在特定的时机对生产线上的资源进行处理
   > 4. webpack 通过 Tapable 来组织这条复杂的生产线
   > 5. webpack 在运行过程中会广播事件，插件只需要监听到自己关心的事件，就能加入这条生产线，去改变生产线的运作
   > 6. webpack 的事件流机制保证了插件的有序性，是的整个系统扩展性良好。


---

### 二、webpack 内部的钩子

1. 钩子

   1. 钩子的本质就是：事件。为了方便我们直接介入和控制编译过程，webpack 把编译过程中触发的各类关键事件封装成事件接口暴露了出来。这些接口被很形象地称做：`hooks`（钩子）。开发插件，离不开这些钩子。

2. **Tapable**

   1. `Tapable` 为 webpack 提供了统一的插件接口（钩子）类型定义，它是 webpack 的核心功能库。webpack 中目前有十种 `hooks`，在 `Tapable` 源码中可以看到，他们是：

      ```js
      // https://github.com/webpack/tapable/blob/master/lib/index.js
      exports.SyncHook = require("./SyncHook");
      exports.SyncBailHook = require("./SyncBailHook");
      exports.SyncWaterfallHook = require("./SyncWaterfallHook");
      exports.SyncLoopHook = require("./SyncLoopHook");
      exports.AsyncParallelHook = require("./AsyncParallelHook");
      exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
      exports.AsyncSeriesHook = require("./AsyncSeriesHook");
      exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
      exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
      exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
      exports.HookMap = require("./HookMap");
      exports.MultiHook = require("./MultiHook");
      ```

   2. `Tapable` 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：

      1. `tap`：可以注册同步钩子和异步钩子。
      2. `tapAsync`：回调方式注册异步钩子。
      3. `tapPromise`：Promise 方式注册异步钩子。


---

### 三、plugin 构建对象

1. **compiler**

   1. compiler 对象中保存着完整的 Webpack 环境配置，每次启动 webpack 构建时它都是一个独一无二，仅仅会创建一次的对象。

      这个对象会在首次启动 Webpack 时创建，我们可以通过 compiler 对象上访问到 Webapck 的主环境配置，比如 loader 、 plugin 等等配置信息。

   2. 它有以下主要属性：

      1. `compiler.options` 可以访问本次启动 webpack 时候所有的配置文件，包括但不限于 loaders 、 entry 、 output 、 plugin 等等完整配置信息。
      2. `compiler.inputFileSystem` 和 `compiler.outputFileSystem` 可以进行文件操作，相当于 Nodejs 中 fs。
      3. `compiler.hooks` 可以注册 tapable 的不同种类 Hook，从而可以在 compiler 生命周期中植入不同的逻辑。

2. **compilation**

   1. compilation 对象代表一次资源的构建，compilation 实例能够访问所有的模块和它们的依赖。
   2. 一个 compilation 对象会对构建依赖图中所有模块，进行编译。 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。
   3. 它有以下主要属性：
      1. `compilation.modules` 可以访问所有模块，打包的每一个文件都是一个模块。
      2. `compilation.chunks` chunk 即是多个 modules 组成而来的一个代码块。入口文件引入的资源组成一个 chunk，通过代码分割的模块又是另外的 chunk。
      3. `compilation.assets` 可以访问本次打包生成所有文件的结果。
      4. `compilation.hooks` 可以注册 tapable 的不同种类 Hook，用于在 compilation 编译模块阶段进行逻辑添加以及修改。

3. 生命周期简图：

   ​	![](https://tva1.sinaimg.cn/large/006y8mN6ly1h6uvfn4rz9j30u019mgoc.jpg)


---

### 四、开发一个插件

1. 最简单的插件

   ```js
   class TestPlugin {
     constructor() {
       console.log("TestPlugin constructor()");
     }
     // 1. webpack读取配置时，new TestPlugin() ，会执行插件 constructor 方法
     // 2. webpack创建 compiler 对象
     // 3. 遍历所有插件，调用插件的 apply 方法
     apply(compiler) {
       console.log("TestPlugin apply()");
     }
   }
   
   module.exports = TestPlugin;
   ```

2. 注册hooks

   ```js
   class TestPlugin {
     constructor() {
       console.log("TestPlugin constructor()");
     }
     // 1. webpack读取配置时，new TestPlugin() ，会执行插件 constructor 方法
     // 2. webpack创建 compiler 对象
     // 3. 遍历所有插件，调用插件的 apply 方法
     apply(compiler) {
       console.log("TestPlugin apply()");
   
       // 从文档可知, compile hook 是 SyncHook, 也就是同步钩子, 只能用tap注册
       compiler.hooks.compile.tap("TestPlugin", (compilationParams) => {
         console.log("compiler.compile()");
       });
   
       // 从文档可知, make 是 AsyncParallelHook, 也就是异步并行钩子, 特点就是异步任务同时执行
       // 可以使用 tap、tapAsync、tapPromise 注册。
       // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
       compiler.hooks.make.tap("TestPlugin", (compilation) => {
         setTimeout(() => {
           console.log("compiler.make() 111");
         }, 2000);
       });
   
       // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
       compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
         setTimeout(() => {
           console.log("compiler.make() 222");
           // 必须调用
           callback();
         }, 1000);
       });
   
       compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
         console.log("compiler.make() 333");
         // 必须返回promise
         return new Promise((resolve) => {
           resolve();
         });
       });
   
       // 从文档可知, emit 是 AsyncSeriesHook, 也就是异步串行钩子，特点就是异步任务顺序执行
       compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
         setTimeout(() => {
           console.log("compiler.emit() 111");
           callback();
         }, 3000);
       });
   
       compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
         setTimeout(() => {
           console.log("compiler.emit() 222");
           callback();
         }, 2000);
       });
   
       compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
         setTimeout(() => {
           console.log("compiler.emit() 333");
           callback();
         }, 1000);
       });
     }
   }
   
   module.exports = TestPlugin;
   ```

   

