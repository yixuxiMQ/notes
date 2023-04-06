# React中的插槽

---

##  一、children实现插槽

每个组件都可以获取到props.children：它包含组件的`开始标签`和`结束标签`之间的内容。

```jsx
// App.jsx
import React, { Component } from "react";
import NavBar from "./NavBar";

export class App extends Component {
  render() {
    return (
      <div>
        {/* 缺点：当在<NavBar>组件中传入多个元素时，<NavBar>组件的props.children的类型是一个数组；只传入一个元素时，不是数组 */}
        <NavBar>
          <button>按钮</button>
          <h2>title</h2>
          <i>斜体</i>
        </NavBar>
      </div>
    );
  }
}

export default App;


// NavBar.jsx
import React, { Component } from "react";
import "./index.css";

export class NavBar extends Component {
  render() {
    console.log(this.props)
    const { children } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    );
  }
}

export default NavBar;
```

---

##  二、props实现插槽（推荐）

```jsx
// App.jsx
import React, { Component } from "react";
import NavBar2 from "./NavBar2";

export class App extends Component {
  render() {
    return (
      <div>
        // 插入元素
        <NavBar2
          leftSlot={<button>按钮</button>}
          centerSlot={<h2>title</h2>}
          rightSlot={<i>斜体</i>}
        />
      </div>
    );
  }
}

export default App;


// NavBar.jsx
import React, { Component } from "react";
import "./index.css";

export class NavBar extends Component {
  render() {
    // 取出传入的元素
    const { leftSlot, centerSlot, rightSlot } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{leftSlot}</div>
        <div className="center">{centerSlot}</div>
        <div className="right">{rightSlot}</div>
      </div>
    );
  }
}

export default NavBar;
```

---

## 三、作用域插槽

```jsx
// App.jsx
import React, { Component } from "react";
import NavBar3 from "./NavBar3";

export class App extends Component {
  getTabItem(item) {
    if (item === "按钮") {
      return <button>{item}</button>;
    } else if (item === "title") {
      return <h2>{item}</h2>;
    } else if (item === "斜体") {
      return <i>{item}</i>;
    }
  }

  render() {
    return (
      <div>
        <NavBar3 itemType={(item) => this.getTabItem(item)} />
      </div>
    );
  }
}

export default App;


// NavBar.jsx
import React, { Component } from "react";
import "./index.css";

export class NavBar extends Component {
  render() {
    const { itemType } = this.props;
    return (
      <div className="nav-bar">
        <div className="left">{itemType("斜体")}</div>
        <div className="center">{itemType("按钮")}</div>
        <div className="right">{itemType("title")}</div>
      </div>
    );
  }
}

export default NavBar;
```

