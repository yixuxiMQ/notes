# webpack-dev-server 和 Hot Module Replacement

---

### 一、webpack-dev-server

1. webpack-dev-server 提供了一个基本的 web server，并且具有 **live reloading ( 实时重新加载 )** 功能。

2. 安装：

   1. ```sh
      npm install webpack-dev-server -D
      ```

3. 在 webpack.config.js 中配置：

   1. ```js
      module.exports = {
        // 将 dist 目录下的文件 serve 到 localhost:8080 下
        devServer: './dist'
      }
      ```

4. webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。


---

### 二、模块热替换（ hot module replacement ）

1. 模块热替换 ( HMR - hot module replacement ) 功能会在应用程序运行过程中，**替换、添加或删除**模块，而**无需重新加载整个页面**。主要是通过以下几种方式，来显著加快开发速度：

   - 不重新加载整个页面，可以保持页面中应用程序的状态不丢失
   - 只更新产生变化的内容，节省开发时间
   - 源代码发生变化时，会立刻在浏览器中更新

2. 在 webpack.config.js 中配置：

   1. ```js
      module.exports = {
        hot: true
      }
      ```

   2. ```js
      import math from "./math";
      
      // 对 math 进行热更新
      if (module.hot) {
        module.hot.accept("./math.js", () => {
          console.log("更新成功！");
        });
      }
      ```

3. 框架中使用HMR：

   1. react：

      1. 安装插件

         - ```sh
           npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
           ```

      2. 在 webpack.config.js 中配置：

         - ```js
           const path = require("path");
           const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
           
           module.exports = {
             module: {
               rules: [
                {
                   test: /\.(jsx|js)$/,
                   include: path.resolve(__dirname, "../src"),
                   loader: "babel-loader",
                   options: {
                     plugins: [
                       "react-refresh/babel", // 开启js的HMR功能
                     ],
                  	},
                 }, 
               ],
             },
             plugins: [
               new ReactRefreshWebpackPlugin(), // 解决js的HMR功能运行时全局变量的问题
             ],
             devServer: {
               hot: true,
             },
           };
           
           ```

   2. vue：

      1. 安装依赖：

         - ```shell
           npm install vue
           npm install vue-loader vue-template-compiler -D
           ```

      2. webpack.config.js 配置：

         - ```js
           const { VueLoaderPlugin } = require("vue-loader");
           
           module.exports = {
             devServer: {
               hot: true,
             },
             module: {
               rules: [
                 {
                   test: /\.css$/i,
                   use: [
                     "style-loader",
                     {
                       loader: "css-loader",
                       options: {
                         importLoaders: 1,
                       },
                     },
                     "postcss-loader",
                   ],
                 },
                 {
                   test: /\.vue$/i,
                   use: "vue-loader",
                 },
               ],
             },
             plugins: [
               new VueLoaderPlugin(),
             ],
           };
           ```

           


---

### 三、HMR 的原理

1. 使用 `webpack-dev-server` (后面简称 WDS) 托管静态资源，同时以 Runtime 方式注入 HMR 客户端代码

   1. 执行 `npx webpack serve` 命令后，WDS 调用 `HotModuleReplacementPlugin` 插件向应用的主 Chunk 注入一系列 HMR Runtime，包括：
      - 用于建立 WebSocket 连接，处理 `hash` 等消息的运行时代码
      - 用于加载热更新资源的 `RuntimeGlobals.hmrDownloadManifest` 与 `RuntimeGlobals.hmrDownloadUpdateHandlers` 接口
      - 用于处理模块更新策略的 `module.hot.accept` 接口

2. 浏览器加载页面后，与 WDS 建立 WebSocket 连接 （socket连接是长连接，客户端和服务端可以互发信息）

   1. 经过 `HotModuleReplacementPlugin` 处理后，构建产物中即包含了所有运行 HMR 所需的客户端运行时与接口。这些 HMR 运行时会在浏览器执行一套基于 WebSocket 消息的时序框架
   2. <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h6a7ck9ss8j20u00uv40t.jpg" style="zoom:50%;" />

3. Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 `hash` 事件

4. 浏览器接收到 `hash` 事件后，请求 `manifest` 资源文件，确认增量变更范围

   1. 客户端接受到 `hash` 消息后，首先发出 `manifest` 请求获取本轮热更新涉及的 chunk
   2. `manifest` 文件：JSON 格式文件，包含所有发生变更的模块列表
   3. 模块变更文件：js 格式，包含编译后的模块代码

5. 浏览器加载发生变更的增量模块

   1. `manifest` 请求完成后，客户端 HMR 运行时开始下载发生变化的 chunk 文件，将最新模块代码加载到本地

6. Webpack 运行时触发变更模块的 `module.hot.accept` 回调，执行代码变更逻辑

   1. 浏览器加载完最新模块代码后，HMR 运行时会继续触发 `module.hot.accept` 回调，将最新代码替换到运行环境中

7. done

8. ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h6a71atjwwj20zk0k0go3.jpg)

   