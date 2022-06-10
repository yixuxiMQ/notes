## 如果后端返回给前端10万条数据，前端要怎么优雅地展示出来？

### 方案一：requestAnimationFrame + 文档片段（documentFragment）

```js
// 渲染
const renderList = async () => {
  console.time("列表");

  const list = await getList();
  // 数据总数量
  const total = list.length;
  // 页数
  let page = 0;
  // 每页数据数量
  const limit = 200;
  // 数据总页数
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page > totalPage) return;
    requestAnimationFrame(() => {
     // 创建文档片段
      const fragment = document.createDocumentFragment();
      for (let i = page * limit; i < page * limit + limit; i++) {
        let item = list[i];
        var div = document.createElement("div");
        div.className = "renderItem";
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        // 将生成的div放入文档片段
        fragment.appendChild(div);
      }
      // 将保存的文档片段插入DOM中
      container.appendChild(fragment);
      render(page + 1);
    });
  };
  render(page);

  console.timeEnd("列表");
};
```



- #### requestAnimationFrame 比起 setTimeout、setInterval的优势主要有两点：

  1. #### requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

  2. #### 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

- #### 为什么要使用文档片段（documentFragment）？

  1. #### 之前都是每次创建一个`div`标签就`appendChild`一次，但是有了`文档碎片`可以先把1页的`div`标签先放进`文档碎片`中，然后一次性`appendChild`到`container`中，这样减少了`appendChild`的次数，极大提高了性能

  2. #### 页面只会渲染`文档碎片`包裹着的元素，而不会渲染`文档碎片`

  3. #### `DocumentFragments` 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。

  4. #### 因为文档片段存在于**内存中**，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。