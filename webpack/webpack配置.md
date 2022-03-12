```js
const path = require('path')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'bundle.js',
    path.resolve(__dirname, 'dist') 
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            // limit限制生成文件还是编译为64位编码，当文件大小大于20kb时，打包成文件，否则编译为64位编码
            limit: 20480
          }
        },
      }
    ]
  },
  // 模式，有development和production两种
  mode: 'development',
}
```

