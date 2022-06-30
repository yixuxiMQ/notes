# LRU缓存算法

1. LRU，全称 `least recently used`, 就是**最近使用次数最少的**

2. 接下来用**浏览器的浏览历史记录**为例来解释：

   - 用户使用浏览器时，浏览器都会记录浏览历史，但是浏览器记录浏览历史需要存储空间（有限性）
   - 在使用过程中，浏览器会按照浏览**顺序**将历史记录保存下来
   - 每当用户访问一个新的网址，历史记录就会多一条，总有一天历史记录会超出存储，就需要删除一部分记录来腾出空间
   - 那么删除的这部分记录，必定是很久都没有访问的了

3. 还有**以下情况**：

   - 如果再一次访问了之前访问过的网址，历史记录就会刷新，这条记录会成为最新的历史记录

4. 实现需求：

   - 实现一个LRUCache类， 以此作为存储空间
   - 采用Map数据结构存储，因为它的存取时间复杂度为`o(1)`，数组为`o(n)`
   - 实现 `get` 和 `set` 方法，用来获取和添加数据
   - 我们的存储空间有长度限制，所以无需提供删除方法，存储满之后，自动删除最久远的那条数据
   - 当使用 `get` 获取数据后，该条数据需要更新到最前面

5. 代码实现：

   ```js
   class LRUCache {
     // length为设定的存储空间大小
     constructor(length) {
       this.length = length;
       // 用 Map 结构来存储数据，Map 实例会维护键值对的插入顺序，且存取时间复杂度为 o(1)
       this.data = new Map();
     }
   
     // 用键值对的方式来存储数据
     set(key, value) {
       let data = this.data;
       if (data.has(key)) {
         // 首先判断是否存储空间中是否存在这条数据，如果没有，直接存储，如果有，就删除这条数据，再重新存储，					防止数据内容变化
         data.delete(key);
       }
       data.set(key, value);
   
       // 判断是否超出内存大小
       if (data.size > this.length) {
         // 如果超出，则删除最久的那条数据
         // Map 实例可以提供迭代器，所以可以调用 next() 方法
         data.delete(data.keys().next().value);
       }
     }
   
     // 获取数据
     get(key) {
       let data = this.data;
       // 如果储存中不存在这条数据，就返回null
       if (!data.has(key)) {
         return null;
       }
   
       // 当在存储中访问了这条数据时，需要对这条数据刷新纪录
       const value = data.get(key);
       // 为什么要删除之后再设置？ 因为如果在 Map 实例中不删除这条记录，直接设置，就如同更新了数据，对应的 				key 在 Map 实例中位置是不会变化的
       data.delete(key);
       data.set(key, value);
     }
   }
   ```

   

