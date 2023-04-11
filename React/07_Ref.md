# ref

---

##  一、ref的基本使用

1. ### this.refs        （已废弃，不推荐）

   ```jsx
   import React, { PureComponent } from "react";
   
   export class HelloWorld extends PureComponent {
     getElement() {
       // 1.this.refs     （已废弃，不推荐）
       console.log(this.refs.testRef);
     }
     render() {
       return (
         <div>
           <h1 ref="testRef">HelloWorld</h1>
           <button onClick={(e) => this.getElement()}>dinaji</button>
         </div>
       );
     }
   }
   
   export default HelloWorld;
   ```

2. ### createRef        （官方推荐）

   ```jsx
   import React, { PureComponent, createRef } from "react";
   
   export class HelloWorld extends PureComponent {
     constructor() {
       super();
       this.testRef = createRef();
     }
     getElement() {
       // 2.createRef()    (官方推荐)
       console.log(this.testRef.current);
     }
     render() {
       return (
         <div>
           <h1 ref={this.testRef}>HelloWorld</h1>
           <button onClick={(e) => this.getElement()}>dinaji</button>
         </div>
       );
     }
   }
   
   export default HelloWorld;
   ```

3. ### 给元素ref传递函数获取目标元素

   ```jsx
   import React, { PureComponent, createRef } from "react";
   
   export class HelloWorld extends PureComponent {
     constructor() {
       super();
       this.testRef = createRef();
     }
     getElement() {
       // 3.给ref绑定函数
       console.log(this.titleRef);
     }
     render() {
       return (
         <div>
           <h1 ref={(el) => {this.titleRef = el}}>HelloWorld</h1>
           <button onClick={(e) => this.getElement()}>dinaji</button>
         </div>
       );
     }
   }
   
   export default HelloWorld;
   ```

---

## 二、在组件中使用ref

1. ### 类组件

   ```jsx
   import React, { PureComponent, createRef } from "react";
   
   // 子组件
   class HelloWorld extends PureComponent {
     constructor() {
       super();
       this.state = {
         title: "Hello World!",
       };
     }
     changeTitle() {
       this.setState({
         title: "hahahahh---",
       });
     }
     render() {
       const { title } = this.state;
       return <h1>HelloWorld---{title}</h1>;
     }
   }
   
   // 父组件
   export class App extends PureComponent {
     constructor() {
       super();
       this.helloRef = createRef();
     }
     getRefs() {
       console.log(this.helloRef.current.changeTitle());
     }
     render() {
       return (
         <div>
           <h1>App---App</h1>
           <HelloWorld ref={this.helloRef}></HelloWorld>
           <button onClick={(e) => this.getRefs()}>dianji</button>
         </div>
       );
     }
   }
   
   export default App;
   ```

2. ### 函数组件

   ```jsx
   import React, { PureComponent, createRef, forwardRef } from "react";
   
   const HelloWorld = forwardRef(function (props, ref) {
     return (
       <div>
         <h1 ref={ref}>HelloWorld</h1>
         <p>hahahahh</p>
       </div>
     );
   });
   
   export class App extends PureComponent {
     constructor() {
       super();
       this.helloRef = createRef();
     }
     getRefs() {
       console.log(this.helloRef.current);
     }
     render() {
       return (
         <div>
           <h1>App---App</h1>
           <HelloWorld ref={this.helloRef}></HelloWorld>
           <button onClick={(e) => this.getRefs()}>dianji</button>
         </div>
       );
     }
   }
   
   export default App;
   ```

   