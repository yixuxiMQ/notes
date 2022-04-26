1. ## 认识vue-router

   1. 目前前端流行的三大框架，都有自己的路由实现：

      1. Angular的ngRouter
      2. React的ReactRouter
      3. Vue的vue-router

   2. vue-router是基于路由和组件的：

      1. 路由用于设定访问路径，将路由和组件映射起来
      2. 在vue-router的单页面应用中，页面路径的改变就是组件的切换

   3. 安装vue-router：

      1. `npm install vue-router@4`
      
      

2. ## 路由的基本使用流程：

      1. ```js
         import { createRouter, createWebHashHistory } from "vue-router";
         ```

      2. 导入创建的组件

         ```js
         import Home from "../pages/Home.vue";
         import About from "../pages/About.vue";
         ```

      3. 配置路由的映射

         ```javascript
         const routes = [
           { path: "/", component: Home },
           { path: "/about", component: About },
         ];
         ```

      4. 创建router对象

         ```javascript
         const router = createRouter({
           routes,
           history: createWebHashHistory(),
         });
         ```

      5. 导出router对象

         ```js
         export default router;
         ```

      
      
      
3. ## 路由的默认路径

      1. 可以让路由默认跳转到首页：

            ```js
            const routes = [
            	{ path: "/", redirect: '/home' },
            	{ path: "/home", component: Home },
            	{ path: "/about", component: About }
            ];
            ```

      2. 在routes中又配置了一个映射：

            - `path`配置的是根路径`"/"`
            - `redirect`是重定向，也就是将路径重定向到`"/home"`的路径下

      

4. ## router-link

      1. `to`属性：
            - 一个字符串，或者一个对象
      2. `replace`属性：
            - 设置replace属性时，会调用`router.replcae()`，而不是`router.push()`
      3. `active-class`属性：
            - 设置激活`<a>`标签后所应用的class，默认是`router-link-active`
      4. `exact-active-class`属性：
            - 链接精准激活时，应用于渲染`<a>`标签的class，默认是`router-link-exact-active`

