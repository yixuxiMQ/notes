## 1. verflow属性

`overflow`是一个CSS属性，当元素内容太大超过所设置的高度时，overflow可以设置元素的该如何呈现出来。

`overflow`可以设置五个值，分别是：`visible`, `hidden`, `scroll`, `auto`, `inherit`.
1. `visible`代表：默认值，内容不会被修改，会呈现在所设置高度之外；
2. `hidden代`表：内容会被修改，超出高度之外的部分会被隐藏；
3. `scroll代`表：内容会被修改，浏览器会以滚动条的方式显示多余的内容；
4. `auto代表`：由浏览器来决定，如果内容需要修改，则会以滚动条的方式来显示；
5. `inherit`代表：会继承父元素overflow属性的值

例1：内容溢出后显示为省略号
```css
div{
    height: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

例2：清除浮动
```css
div::after{
    content: "";
    display: block;     //只有块级元素可以清除浮动
    clear: both;
}
```

例3：解决边距塌陷（给父元素设置overflow：hidden；）


---

## 2. 前端尺寸

### em
`em` 是一个相对长度单位。其相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

- `em`的值并不是固定的
- `em`会继承父级元素的字体大小

### rem
`rem`全名`root em`,也是一个相对长度单位，但只相对于根元素，可以简单的通过更改根元素大小，从而调整所有字体大小。

- 只相对于根元素（html）
- 通过修改根元素可成比例的调整页面字体大小
- 其适配方案通过js脚本设置像素点来实现

其与em的基本用法是一致的，唯独不一致的是，所有元素都是相对于根元素，而不是父级元素，减少了我们的计算成本

> 总结：用rem，不用em，尺寸清晰，易于维护

### 视口单位

`vw（Viewport Width）、vh(Viewport Height)`是基于视图窗口的单位，是css3的一部分，基于视图窗口的单位，除了`vw`、`vh`还有`vmin`、`vmax`。

vw: 1vw 等于视口宽度的1%

Vh: 1vh 等于视口高度的1%

vmin:选取 vw 和 vh 中最小的那个,即在手机竖屏时，1vmin=1vw

vmax:选取 vw 和 vh 中最大的那个 ,即在手机竖屏时，1vmax=1vh


---


## 3. transition参数意义

`transition`: 属性 持续时间 过渡函数 开始时间

---

## 4. @media响应式布局，简单使用方法

```css
@media screen and (max-width: 480px){
    body{
        background-color: #000;
    }
}
```
`screen`代表：用于电脑屏幕，平板电脑，智能手机等。
`(max-width：480px)`代表：当屏幕尺寸小于480px 时，执行花括号里面的代码

---

## 5. 类数组转换数组

```javascript
const aArrayLikeList = document.getElementsByClassName('panel');
const bArrayLikeList = document.querySelectorAll('.panel');

// aArrayLikeList 和 bArrayLikeList 都是类数组，当使用forEach时，
//需要转换为数组，但是querySelectorAll原型方法中带有forEach方法，故可以不用转换

const aArrayList = Array.prototype.slice.call(aArrayLikeList); //[].slice.call()

aArrayList.forEach(element => {
    //执行代码
})

```

