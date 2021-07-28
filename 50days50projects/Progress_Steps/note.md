## 1. CSS自定义属性

同样一个颜色值可能在成千上百个地方被使用到，如果这个值发生了变化，需要全局搜索并且一个一个替换，很麻烦。自定义属性在某个地方存储一个值，然后在其他许多地方引用它。另一个好处是语义化的标识。比如，--main-text-color 会比 #00ff00 更易理解，尤其是这个颜色值在其他上下文中也被使用到。

使用方法：
```css
:root{
    --line-border-fill: #3498db;
    --line-border-empty: #e0e0e0;
}

.progressContainer{
    background-color: var(--line-border-empty);
}

.progress{
    background-color: var(--line-border-fill);
}

```

---

## 2. transform

`transform` 属性向元素应用 `2D` 或 `3D`转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
[详细请查看](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

---
