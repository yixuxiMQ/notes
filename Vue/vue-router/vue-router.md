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

                 

5. ## 路由懒加载

      1. 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

      2. `component` (和 `components`) 配置接收一个返回 Promise 组件的函数，Vue Router **只会在第一次进入页面时才会获取这个函数**，然后使用缓存数据。

            ```js
            const routes = [
              { path: "/", redirect: "/home" },
              {
                path: "/home",
                component: () => import("../pages/Home.vue"),
              },
              {
                path: "/about",
                component: () => import("../pages/About.vue"),
              },
            ];
            ```

      3. 将组建按组分块

            1. 有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用[命名 chunk](https://webpack.js.org/guides/code-splitting/#dynamic-imports)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

                  ```js
                  const routes = [
                    { path: "/", redirect: "/home" },
                    {
                      path: "/home",
                      component: () =>
                        import(/* webpackChunkName: "home-chunk" */ "../pages/Home.vue"),
                    },
                    {
                      path: "/about",
                      component: () =>
                        import(/* webpackChunkName: "about-chunk" */ "../pages/About.vue"),
                    },
                  ];
                  ```

            

6. ## 动态路由匹配

      1. 很多时候需要将给定匹配模式的路由映射到同一个组件：

            1. 例如有一个`User`组件，它应该对所有用户进行渲染，但是用户的`ID`是不同的；

            2. 在vue-router中可以使用一个`动态字段`来实现，称之为`路径参数`；

                  ```js
                  const routes = [
                  	{
                      path: "/user/:id",
                      component: () => import("../pages/User.vue"),
                    }
                  ]
                  ```

      2. 在`router-link`进行跳转

            ```html
            <router-link to="/user/123">用户</router-link>
            ```

      3. 获取动态路由的值

            1. 在`User`组件中获取对应的值：

                  - 在`template`中，通过`$router.params`获取

                       ```html
                       <template>
                         <div>用户：{{ $route.params.user }}--{{ $route.params.id }}</div>
                       </template>
                       ```

                  - 在`created`中，通过`this.$router.params`获取

                       ```js
                       export default {
                         created(){
                           console.log(this.$router.params);
                         }
                       };
                       ```

                       

                  - 在`setup`中，通过vue-router库提供的hook --> `useRoute`

                       ```js
                       export default {
                         setup() {
                           const route = useRoute();
                           console.log(route);
                         },
                       };
                       ```

                       

7. ## NotFound

      1. 没有相关页面时，可以创建并展示`NotFound`页面

      2. 配置`NotFound`组件的路由

            ```js
            const routes = [
            	{
            		path: "/:pathMatch(.*)"
            		// path: "/:pathMatch(.*)*" ，多一个星号就会将匹配到的参数放在一个数组中
            	}
            ];
            ```

      3. 在`NotFound`组件中获取参数：

            ```html
            <h1>{{ $route.params.pathMatch }}</h1>
            ```

            

8. ## 嵌套路由

      1. 配置好路由后，只需在组件中需要展示的地方添加`<router-view></router-view>`

      ```js
      const routes = [
        {
          path: "/home",
          component: () => import("../pages/Home.vue"),
          children: [
            {
              path: "message",
              component: () => import("../pages/HomeMessage.vue"),
        		},
            {
              path: "goods",
              component: () => import("../pages/HomeGoods.vue"),
        		},
          ]
        }
      ];
      ```

9. 

