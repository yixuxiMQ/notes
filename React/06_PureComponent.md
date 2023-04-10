# 为什么要使用PureComponent？

---

## 一、render函数被调用

在使用正常的类组件时，当存在父子组件时，只要父组件中的数据发生变化，不论子组件是否依赖该数据，都将会重新渲染子组件。

---

## 二、shouldComponentUpdate生命周期的使用

1. 接收两个参数：nextProps、nextState（二者都是修改之后最新的值）

   ```jsx
   shouldComponentUpdate(nextProps, nextState){
     //...code
   }
   ```

2. 返回值是一个boolearn类型

   1. return true 代表调用render函数
   2. return false 代表不调用render函数
   3. 默认返回true

3. 通过在shouldComponentUpdate生命周期函数中对比新旧props和新旧state，可以决定是否返回true，也就是决定是否调用render函数。

---

## 三、PureComponent

如果所有组件中都需要利用shouldComponentUpdate生命周期函数来判断是否需要更新，那就会造成很大的工作量。所以出现了PureComponent。

```jsx
class App extends React.PureComponent {
  // ...code
}
```

---

## 四、高阶组件memo

memo组件是为了函数组件而生，只需要用memo组件将函数组件进行包裹即可。

```jsx
import { memo } from 'react';

const App = memo(function(){
  // ...code
})
```

