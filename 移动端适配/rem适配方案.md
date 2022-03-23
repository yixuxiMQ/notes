# 

------

## 一、使用rem模拟vw特性适配

- rem

  ```js
  //code...
  rem以根元素的字体大小为基准
  html 的 font-size:16 px；则 1 rem = 16 px。
  ```

- flexible

  ```js
  //code...
  flexible将页面的宽度切成 10 份，然后计算出的页面宽度的 1/10 设置为 html 的 fontSize
  
  const docEl = document.documentElement;
  function setRemUnit () {
    const rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  ```

------

## 二、项目中使用

- 安装插件

  ```js
  //code...
  // yarn add -D postcss-pxtorem
  // -D 是 --save-dev 的简写
  npm install postcss-pxtorem -D
  
  // yarn add amfe-flexible
  npm i amfe-flexible
  ```

- 在根目录下新建`postcss.config.js`

  ```js
  // PostCSS 配置文件
  
  module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: {
      // 配置使用 autoprefixer 插件
      // 作用：生成浏览器 CSS 样式规则前缀
      // VueCLI 内部已经配置了 autoprefixer 插件
      // 所以又配置了一次，所以产生冲突了
      // 'autoprefixer': { // autoprefixer 插件的配置
      //   // 配置要兼容到的环境信息
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
  
      // 配置使用 postcss-pxtorem 插件
      // 作用：把 px 转为 rem
  
      /*如果你使用的是基于 lib-flexable 的 REM 适配方案，则应该设置为你的设计稿的十分之一。
      例如设计稿是 750 宽，则应该设置为 75。
      但是 Vant 是基于 375 写的，所以如果你设置为 75 的话，Vant 的样式就小了一半。*/
  
      // 如果是vant的样式，则按照37.5来转换
      // 如果是自己的样式，按照75来转换
      'postcss-pxtorem': {
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        propList: ['*']
      }
    }
  }
  
  
  ```

- 配置完毕，重新启动服务


------

## 
