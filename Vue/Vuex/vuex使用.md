1. ## Vuex的安装

   1. 这里使用的是vuex4.x，安装的时候需要添加 next 指定版本：

      ```js
      npm install vuex@next
      ```

2. ## 创建Store

   1. 每一个Vuex应用的核心就是store（仓库）：

      1. `store`本质上是一个容器，它包含着你的应用中大部分的状态（state）；

   2. Vuex和单纯的全局对象有什么区别呢？

      1. Vuex的状态存储是响应式的：

         - 当Vue组件从`store`中读取状态的时候，若`store`中的状态发生变化，那么相应的组件也会被更新；

      2. 不能直接改变store中的状态：

         - 改变`store`中的状态的唯一途径就显示**提交 `(commit) mutation`**； 
         - 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态；

      3. 使用步骤：

         - 创建`Store`对象；

           ```js
           import { createStore } from 'vuex';
           
           const store = createStore({
             state(){
               return {
                 counter: 0
               };
             }
           });
           
           export default store;
           ```

           

         - 在`main.js`中通过插件安装；

           ```js
           import { createApp } from 'vue';
           import store from './store';
           import App from './App.vue';
           
           const app = createApp(App);
           app.use(store);
           
           app.mount("#app");
           ```

           

      4. 在组件中使用store，我们按照如下的方式：

         - 在模板中使用；

           ```html
           <template>
             <div>
               <h2>{{ $store.state.counter }}</h2>
             </div>
           </template>
           ```

           

         - 在`options api`中使用，比如`computed`； 

           ```js
           computed: {
             counter(){
               return this.$store.state.counter;
             }
           }
           ```

           

         - 在`setup`中使用；

           ```js
           import { computed } from 'vue';
           import { useStore } from 'vuex';
           	
           	export default{
           		setup(){
             		const store = useStore();
                 const counter = computed(() => store.state.counter);
             		return {
                   couter
                 };
           		}    
             }
           ```

           

3. ## 单一状态树

   1. Vuex 使用**单一状态树**： 

      - 用一个对象就包含了全部的应用层级的状态；

      - 采用的是SSOT，Single Source of Truth，也可以翻译成单一数据源； 

      - 这也意味着，每个应用将仅仅包含一个 store 实例；

      - 单状态树和模块化并不冲突，后面还有`module`这个概念； 

   2. 单一状态树的优势： 

      - 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便的管理和维护；

4. ## 组件获取状态

   1. 在模板中可以使用`$store`获取，如果觉得那种方式有点繁琐（表达式过长），我们可以使用计算属性，但是，如果我们有很多个状态都需要获取话，可以使用mapState的辅助函数：

      ```js
      import { mapState } from 'vuex';
      
      	export default {
          computed: {
            // 对象写法
            ...mapState({
              counter: (state) => state.counter,
              name: (state) => state.name,
              age: (state) => state.age,
            }),
            
            // 数组写法
            ...mapState(['counter', 'name', 'age'])
          }
        }
      ```

   2. 在`setup`中使用`mapState`：

      1. 在`setup`中如果我们单个获取装是非常简单的：

         - 通过`useStore`拿到`store`后去获取某个状态即可；

      2. 为了能够在`setup`中方便的使用`mapState`，需要封装函数，`useState.js`文件：

         ```js
         import { mapState, useStore } from "vuex";
         import { computed } from "vue";
         
         export function useState(mapper) {
           const store = useStore();
           const storeStateFns = mapState(mapper);
         
           // 数据转换
           // 创建空对象，存储转换后的数据
           const storeState = {};
           Object.keys(storeStateFns).forEach((fnKey) => {
             // 使用bind是因为mapState的返回值是通过this.$store来获取的，setup中没有this
             const fn = storeStateFns[fnKey].bind({ $store: store });
             storeState[fnKey] = computed(fn);
           });
           return storeState;
         }
         ```

         - 为什么使用bind？

           mapState的返回值是个对象，对象中是函数，而函数中是通过this.$store来获取state的

         ```js
           computed:
               { // 这个对象就是mapState的返回值
                   counter: funciton () {
                     return this.$store.state.counter
                   },
                   name: funciton () {
                       return this.$store.state.name
                   },
                   age: funciton () {
                       return this.$store.state.age
                   }
               }
         ```

      3. 在setup中使用封装好的`useState.js`文件：

         ```js
         import { useState } from '../hook/useState.js';
         
         export default {
           setup(){
             const storeState = useState(['counter', 'name', 'age']);
             
             return {
               ...storeState
             }
           }
         }
         ```

   3. getters的基本使用：

      1. Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性），某些属性可能需要经过变化后来使用，这个时候可以使用getters：

         ```js
         import { createStore } from 'vuex';
         
         const store = createStore({
           state(){
             return {
               books: [
                 { name: 'vue', count: 2, price: 110 },
                 { name: 'react', count: 5, price: 130 },
                 { name: 'webpack', count: 3, price: 120 }
               ]
             }
           },
           getters: {
             totalPrice(state) {
               let totalPrice = 0;
               for(const book in state.books) {
                 totalPrice += book.count * book.price;
               }
               return totalPrice;
             }
           }
         });
         
         export default store;
         ```

      2. 使用

         ```html
         <div>
             <h2>getter:{{ $store.getters.totalPrice }}</h2>
         </div>
         ```

      3. getters可以接收第二个参数：

         ```js
         getters: {
           totalPrice(state) {
             let totalPrice = 0;
             for(const book in state.books) {
               totalPrice += book.count * book.price;
             }
             return totalPrice;
           },
            myName(state, getters) {
              return `${state.name}, ${getters.totalPrice}`;
            }
         }
         ```

      4. getters中的函数本身，可以返回一个函数，那么在使用的地方相当于可以调用这个函数：

         ```js
         conditionTotalPrice(state) {
           return function (price) {
             let totalPrice = 0;
             for (const book of state.books) {
               if (book.price < price) {
                 totalPrice += book.count * book.price;
               }
             }
             return totalPrice;
           };
         }
         ```

      5. mapGetters的辅助函数

         ```js
         computed: {
         	// 数组写法
         	...mapGetters(['totalPrice', 'myName'])
         	// 对象写法
         	...mapGetters({
         		total: 'totalPrice',
         		name: 'myName'
         	})
         }
         ```

         setup中使用mapGetters辅助函数：

         为了能够在`setup`中方便的使用`mapGetters`，需要封装函数，`useGetters.js`文件：

         ```js
         import { computed } from "vue";
         import { mapGetters, useStore } from "vuex";
         export function useGetters(mapper) {
           const store = useStore();
           const storeGettersFns = mapGetters(mapper);
           const storeGetters = {};
           Object.keys(storeGettersFns).forEach((fnKey) => {
             const fn = storeGettersFns[fnKey].bind({ $store: store });
             storeGetters[fnKey] = computed(fn);
           });
           return storeGetters;
         }
         
         
         // 使用
         import { useGetters } from "../hook/useGetters.js";
         export default {
           setup() {
             const storeGetters = useGetters(["totalPrice", "myName"]);
         
             return {
               ...storeGetters,
             };
           },
         };
         ```

   4. mutation的基本使用：

      1. 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation：

         ```js
         mutations: {
           increment(state) {
             state.counter++;
           },
           decrement(state) {
             state.decrement--;
           }
         }
         ```

      2. mutation携带数据，第二个参数是携带的数据

         ```js
         mutations: {
           incrementPayload(state, payload) {
             state.counter += payload.n;
           },
           decrementPayload(state, payload) {
             state.counter -= payload.n;
           },
         },
         ```

      3. 提交方式：

         ```js
         incrementPayload() {
           // 下面两种提交方式都可以
           // this.$store.commit("incrementPayload", { n: 5 });
           this.$store.commit({
             type: "incrementPayload",
             n: 5,
           });
         },
         decrementPayload() {
           this.$store.commit("decrementPayload", { n: 5 });
         },
         ```

      4. 定义常量，避免拼写错误

         1. 在`store`文件下创建`mutation-types.js`文件，

         2. 定义常量：

            ```js
            export const INCREMENTPAYLOAD = "incrementPayload";
            export const DECREMENTPAYLOAD = "decrementPayload";
            ```

         3. 提交：

            ```js
            incrementPayload() {
              // this.$store.commit("incrementPayload", 5);
              this.$store.commit({
                type: INCREMENTPAYLOAD,
                n: 5,
              });
            },
            decrementPayload() {
              this.$store.commit(DECREMENTPAYLOAD, { n: 5 });
            },
            ```

      5. mapMutations辅助函数：

         1. vue2中使用方法：

            ```js
            methods: {
            	// ...mapMutations(['increment', 'decrement']),
              ...mapMutations({
                oIncrement: 'increment',
                oDecrement: 'decrement'
              })
            }
            ```

         2. setup中使用方法：

            ```js
            export default {
            	setup() {
            		...mapMutations(['increment', 'decrement']),
            		...mapMutations({
            			oIncrement: 'increment',
                	oDecrement: 'decrement'
            		})
            	}
            }
            ```

      6. mutation的重要原则

         1. 一条重要的原则就是要 **mutation 必须是同步函数**
            - 因为devtool工具会记录mutation的日记，
            - 每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照；
            - 但是在mutation中执行异步操作，就无法追踪到数据的变化；
            - 所以Vuex的重要原则中要求 mutation必须是同步函数；

   5. actions的基本使用

      1. `action`类似于mutation，不同在于：

         1. action提交的是mutation，而不是直接变更状态；

         2. action可以包含任意异步操作； 

            ```js
            actions: {
            	increment(context)
                context.commit('increment');
              },
              decrement(context) {
                context.commit('decrement');
              }
            }
            ```

         3. action中有一个重要的参数`context`：

            1. context是一个和store实例拥有相同方法和属性的对象；
            2. 可以从其中获取到`commit`方法来提交一个`mutation`，或者通过`context.state` 和`context.getters` 来获取 `state` 和 `getters`；

      2. action的分发操作：

         1. 分发使用的是 store 上的dispatch函数；

            ```js
            methods: {
              objIcrement() {
                this.$store.dispatch("incrementAct");
              },
              objDcrement() {
                this.$store.dispatch("decrementAct");
              },
            },
            ```

         2. 可以携带参数

            ```js
            methods: {
              objIcrement() {
                // 常规方式
                // this.$store.dispatch('incrementPayload', { n: 5 });
                //对象方式
                this.$store.dispatch({
                  type: 'incrementPayload',
                  n: 5
                });
              },
              objDcrement() {
                this.$store.dispatch('decrementPayload', { n: 5 });
              },
            }
            
            // actions
            actions: {
              incrementPayload(context, payload) {
                context.commit(incrementPayload, payload);
              },
              decrementPayload(context, payload) {
                context.commit(decrementPayload, payload);
              },
            }
            ```

         3. action的辅助函数：

            1. Vue2的写法：

               ```js
               methods: {
                 // 数组写法
                 // ...mapActions(["incrementAct", "decrementAct"]),
                 // 对象写法
                 ...mapActions({
                   add: "incrementAct",
                   sub: "decrementAct",
                 }),
               },
               ```

            2. setup中的写法：

               ```js
               setup() {
                 // 数组写法
                 const storeActions = mapActions(["incrementAct", "decrementAct"]);
                 // 对象写法
                 // const storeActions = mapActions({
                 //   add: "incrementAct",
                 //   sub: "decrementAct",
                 // });
               
                 return {
                   ...storeActions,
                 };
               },
               ```

         4. actions的异步操作：

            1. action 通常是`异步`的，可以通过让action返回`Promise`，在`Promise`的`then`中来处理完成后的操作；

               ```js
               actions: {
                 incrementAct(context) {
                   return new Promise((resolve, reject) => {
                     setTimeout(() => {
                       context.commit("increment");
                       resolve("异步完成");
                     }, 1000);
                   });
                 }
               }
               
               // 在setup中实现
               setup() {
                 const store = useStore();
                 const add = () => {
                   store.dispatch("incrementAct").then((res) => {
                     console.log(res);
                   });
                 };
               
                 return {
                   add,
                 };
               }
               ```

   6. module的基本使用

      1. 什么是Module？ 

         1. 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当臃肿； 

         2. 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**； 

         3. 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块；

            ```js
            // store/index.js
            import { createStore } from "vuex";
            import home from "./modules/homeModule";
            import user from "./modules/userModule";
            
            const store = createStore({
              state() {
                return {};
              },
              mutations: {},
              modules: {
                home,
                user,
              },
            });
            export default store;
            ```

            ```js
            // modules/homeModule.js
            const homeModule = {
              state() {
                return {};
              },
              getters: {},
              mutations: {},
              actions: {},
            };
            export default homeModule;
            ```

            ```js
            // modules/userModule.js
            const userModule = {
              state() {
                return {};
              },
              getters: {},
              mutations: {},
              actions: {},
            };
            export default userModule;
            ```

      2. module的局部状态：

         1. 对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**：

            ```js
            getters: {
            	doubleHomeCounter(state, getters, rootGetters) {
            		return state.homeCounter * 2;
            	},
            },
            mutations: {
            	increment(state) {
            		state.homeCounter++;
            	},
            },
            ```

      3. module的命名空间：

         1. 默认情况下，模块内部的action和mutation仍然是注册在**全局的命名空间**中的：

            1. 这样使得多个模块能够对同一个 action 或 mutation 作出响应；
            2. Getter 同样也默认注册在全局命名空间；

         2. 如果希望模块具有更高的封装度和复用性，可以添加 `namespaced: true` 的方式使其成为带命名空间的模块：

            1. 当模块被注册后，它的所有 `getter`、`action` 及 `mutation` 都会自动根据模块注册的路径调整命名；

               ```js
               methods: {
                 increment() {
                 //   this.$store.commit("home/increment");
                 this.$store.dispatch("home/incrementAction");
                 },
               },
               ```

      4. module修改或派发根组件:

         1. 如果希望在action中修改root中的state，那么有如下的方式：

            ```js
            actions: {
              increment({commit, dispatch, state, rootState, getters, rootGetters}) {
                context.commit("increment");
                context.commit("increment", null, { root: true });
              },
            },
            ```

      5. module的辅助函数：

         1. 方式一：通过完整的模块空间名称来查找

            ```js
            computed: {
              ...mapState({
                home: (state) => state.home.homeCounter,
                user: (state) => state.user.userCounter,
                root: (state) => state.rootCounter,
              }),
              ...mapGetters({
                doubleHomeCounter: "home/doubleHomeCounter",
              }),
            },
            methods: {
              ...mapMutations({
                increment: "home/homeIncrement",
              }),
              ...mapActions({
                incrementAct: "home/incrementAction",
              }),
            },
            ```

         2. 方式二：第一个参数传入模块空间名称，后面写上要使用的属性；

            ```js
            computed: {
              // ...mapState("home", ["homeCounter"]),
              ...mapState("home", {
                home: "homeCounter",
              }),
              ...mapGetters("home", ["doubleHomeCounter"]),
            },
            methods: {
              // ...mapMutations("home", ["homeIncrement"]),
              ...mapMutations("home", {
                increment: "homeIncrement",
              }),
              // ...mapActions("home", ["incrementAction"]),
              ...mapActions("home", {
                incrementAct: "incrementAction",
              }),
            },
            ```

         3. 方式三：通过 createNamespacedHelpers 生成一个模块的辅助函数；

            ```js
            import { createNamespacedHelpers } from "vuex";
            const { mapState, mapGetters, mapMutations, mapActions } =
              createNamespacedHelpers("home");
            
            export default {
              computed: {
                // ...mapState(['homeCounter']),
                ...mapState({
                  home: "homeCounter",
                }),
                // ...mapGetters(["doubleHomeCounter"]),
                ...mapGetters({
                  double: "doubleHomeCounter",
                }),
              },
              methods: {
                // ...mapMutations(["homeIncrement"]),
                ...mapMutations({
                  increment: "homeIncrement",
                }),
                // ...mapActions(["incrementAction"]),
                ...mapActions({
                  incrementAct: "incrementAction",
                }),
              },
            };
            ```

         4. 在setup中使用：

            ```js
            import { createNamespacedHelpers } from "vuex";
            const { mapState, mapGetters, mapMutations, mapActions } =
              createNamespacedHelpers("home");
            import { useState, useGetters } from "../hook";
            export default {
              setup() {
                const state = useState("home", ["homeCounter"]);
                const getters = useGetters("home", ["doubleHomeCounter"]);
                const mutations = mapMutations(["homeIncrement"]);
                const acitions = mapActions(["incrementAction"]);
            
                return {
                  ...state,
                  ...getters,
                  ...mutations,
                  ...acitions,
                };
              },
            };
            ```

            ```js
            // useState.js
            import { createNamespacedHelpers, mapState } from "vuex";
            import { useMapper } from "./useMapper";
            
            export function useState(moduleName, mapper) {
              let mapFn = mapState;
              if (typeof moduleName === "string" && moduleName.length > 0) {
                mapFn = createNamespacedHelpers(moduleName).mapState;
              }
              return useMapper(mapper, mapFn);
            }
            ```

            ```js
            // useGetters.js
            import { createNamespacedHelpers, mapGetters } from "vuex";
            import { useMapper } from "./useMapper";
            export function useGetters(moduleName, mapper) {
              let mapFn = mapGetters;
              if (typeof moduleName === "string" && moduleName.length > 0) {
                mapFn = createNamespacedHelpers(moduleName).mapGetters;
              }
              return useMapper(mapper, mapFn);
            }
            ```

            ```js
            // useMapper.js
            import { computed } from "vue";
            import { mapGetters, useStore } from "vuex";
            export function useMapper(mapper, mapFn) {
              const store = useStore();
              const storeGettersFns = mapFn(mapper);
              const storeGetters = {};
              Object.keys(storeGettersFns).forEach((fnKey) => {
                const fn = storeGettersFns[fnKey].bind({ $store: store });
                storeGetters[fnKey] = computed(fn);
              });
              return storeGetters;
            }
            ```

            