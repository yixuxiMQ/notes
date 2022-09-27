

# Tree Shaking

---

### 一、什么是`Tree Shaking`？

1. 这是一个术语，在计算机中表示消除死代码（ dead_code ）
2. 最早的起源于LISP，用于消除未调用的代码（纯函数无副作用，可以放心消除，这也是为什么要求我们在进行函数式编程时，尽量使用纯函数的原因之一）
3. 之后`Tree Shaking`也被应用于其他语言，比如JavaScript、Dart


---

### 二、JavaScript中的 Tree Shaking

1. 对JavaScript进行 Tree Shaking 是源自打包工具 rollup 
2. 因为 Tree Shaking  依赖于 ES Module 的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）
3. webpack2 正式内置支持了 ES2015 模块，和检测未使用模块的能力
4. webpack4 时正式扩展了这个能力，并且通过 package.json 的 sideEffects 属性作为标记，告知 webpack 在编译时哪里的文件可以安全的删除
5. webpack5 中，也提供了对部分 CommonJS 的 Tree Shaking 的支持


---

### 三、webpack 实现  Tree Shaking 

1. webpack实现 Tree Shaking 采用了两种不同的方案：
   1. **usedExports**：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的
      1. 将mode设置为development模式：
         - 为了可以看到 usedExports 带来的效果，需要设置为 development 模式
         - 因为在 production 模式下， webpack 默认的一些优化会带来很大的影响
      2. 设置 usedExports 为 true 和 false 对比打包后的代码：
         - 设置为 true 时，会有一段注释： unused harmony export mul 
         - 这段注释的意义就是为了告知 Terser 在优化时，可以删除掉这段代码
      3. 将 optimization中的minimize 设置为 true：
         - usedExports 设置为 false 时，mul 函数没有被移除掉
         - usedExports 设置为 true 时，mul 函数被移除掉了
      4. 总之，**usedExports 实现 Tree Shaking 是结合 Terser 来完成的**
   2. **sideEffects**：跳过整个模块/文件，直接检测文件是否有副作用
      1. sideEffects 用于告知 webpack compiler 哪些模块是有副作用的：
         - 副作用的意思是这里面的代码有执行一些特殊的任务，不能仅仅通过 export 来判断这段代码的意义
      2. 在 package.json 中设置 sideEffects 的值：
         - 如果将 sideEffects 设置为 false，就是告知 webpack 可以安全的删除未用到的 exports
         - 如果希望有一些保留，可以设置为数组
      3. 比如有一个 format.js和style.css文件：
         - 该文件在导入时没有使用任何变量来接收
         - 那么打包后的文件，不会保留 format.js、style.css 相关的代码


---

### 四、CSS 实现  Tree Shaking 

1. 认识 PurgeCSS

   1. PurgeCSS 是一个用来删除未使用的 CSS 代码的工具。可以将它作为你的开发流程中的一个环节。 当你构建一个网站时，你可能会决定使用一个 CSS 框架，例如 TailwindCSS、Bootstrap、MaterializeCSS、Foundation 等，但是，你所用到的也只是框架的一小部分而已，大量 CSS 样式并未被使用。
   2. PurgeCSS 通过分析你的内容和 CSS 文件，首先它将 CSS 文件中使用的选择器与内容文件中的选择器进行匹配，然后它会从 CSS 中删除未使用的选择器，从而生成更小的 CSS 文件。

2. webpack插件

   1. 安装

      ```sh
      npm install purgecss-webpack-plugin -D
      ```

   2. 使用：配合 mini-css-extract-plugin 插件使用

      ```js
      const path = require('path')
      const glob = require('glob')
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')
      const PurgecssPlugin = require('purgecss-webpack-plugin')
      
      const PATHS = {
        src: path.join(__dirname, 'src')
      }
      
      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: path.join(__dirname, 'dist')
        },
        optimization: {
          splitChunks: {
            cacheGroups: {
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
              }
            }
          }
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
              ]
            }
          ]
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
          new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
          }),
        ]
      }
      ```

      