# setState

---

## 一、基本使用

```jsx
// 第一种写法
btnClick() {
    this.setState({
      message: "hello Tober",
    });
 }

// 第二种写法
// 优点一：可以在回调函数中编写新的state逻辑
// 优点二：可以接收state和props参数
 btnClick() {
    this.setState((state, props) => {
      // console.log(state, props);
      // console.log(this.state, this.props);
      return {
        message: "hello Tober",
      };
    });
  }

// 第三种写法

  btnClick() {
    this.setState(
      {
        message: "hello Tober",
      },
      () => {
        // 回调函数中获取到的是已经更新的数据
        console.log(this.state.message);  // hello Tober
      }
    );
    // 同步代码获取到的message是还没有更新的数据，所以说明setState在React事件中是异步的
    console.log(this.state.message);  // Hello World
  }
```

---

## 二、为什么要使用setState？

当在state中修改了数据之后，希望React能够根据最新的state中的值来渲染页面，但是这种方式React并不知道数据发生了变化；这是因为在React中并没有实现类似Vue中数据劫持的方法来监测数据的变化，所以必须要通过setState的方式来主动告知React去渲染页面。

---

## 三、setState异步更新

1. ### setState是异步更新的吗？

   ```jsx
   import React, { Component } from "react";
   
   export class HelloWorld extends Component {
     constructor() {
       super();
       this.state = {
         message: "Hello World",
       };
     }
   
     btnClick() {
       this.setState({
         message: "hello Tober",
       });
       console.log(this.state.message); // Hello World，所以从这里判断是异步更新的。
     }
   
     render() {
       const { message } = this.state;
       return (
         <div>
           <h1>{message}</h1>
           <button onClick={() => this.btnClick()}>点击</button>
         </div>
       );
     }
   }
   
   export default HelloWorld;
   ```

   

2. ### 为什么setState要设计为异步的？

   为了性能。如果设计为同步的，那么每次调用setState都会进行一次更新，意味着要频繁的调用Render函数，频繁的渲染页面，效率太低。

   设计为异步的，可以获取到多次更新，然后进行批量更新，从而提高性能。

   如果同步更新了state，但是还没执行Render函数，那么state中的数据就和传入子组件中的props不能保持统一了，不统一在开发中会出现很多问题。

3. ### setState一定是异步的吗？

   1. 在React18之前：

      1. 在组件生命周期中或者React合成事件中，setState是异步的；

      2. 在setTimeout中活着原生DOM事件中，setState是同步的；

         ```jsx
         // setTimeout
         changeText(){
           setTimeout(()=>{
             this.setState({
               message: 'hello Tober'
             })
             console.log(this.state.message)	// hello Tober
           },0)
         }
         
         // 原生DOM事件
         componentDidMount(){
           const oBtn = document.getElementById('btn');
           oBtn.addEventListener('click',()=>{
             this.setState({
               message: 'hello Tober'
             })
           })
           console.log(this.state.message); // hello Tober
         }
         ```

   2. 在React18之后：默认所有的操作都被放到批处理中（异步处理）

      如果希望可以同步拿到数据，则需要执行特殊的`flushSync`操作

      ```jsx
      import { flushSync } from "react-dom";  
      
      btnClick() {
          flushSync(() => {
            this.setState({
              message: "hello Tober",
            });
          });
          console.log(this.state.message); // hello Tober
        }
      ```

      

   

   