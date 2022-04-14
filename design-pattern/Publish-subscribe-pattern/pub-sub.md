1. ## 定义

   1. 这种模式就是一对多，多依赖于一。
   2. `订阅者`（subscriber）在`调度中心`（event channel）订阅相关消息，当`发布者`（publisher）将消息发布到订阅中心，由调度中心统一调度订阅者注册的消息。
   3. 代码实现：

   ```js
   const dispatch = (function () {
     // 用户列表
     const clientList = {};
   
     // 订阅消息
     const listen = function (eventType, callback) {
       if (!clientList[eventType]) {
         clientList[eventType] = [];
       }
       clientList[eventType].push(callback);
     };
   
     // 取消订阅
     const remove = function (eventType, callback) {
       if (!clientList[eventType] || !callback) return;
       clientList[eventType].map((fn, index) => {
         if (fn === callback) {
           clientList[eventType].splice(index, 1);
         }
       });
     };
   
     // 发布消息
     const publish = function (eventType, data) {
       clientList[eventType].map((fn) => {
         fn(data);
       });
     };
   
     return {
       listen,
       remove,
       publish,
     };
   })();
   
   // 以下是测试代码
   // 订阅测试
   function xiaoMing(data) {
     console.log("xiaoMing");
   }
   dispatch.listen("facialMask", xiaoMing);
   
   function xiaoHong(data) {
     console.log("xiaoHong");
   }
   dispatch.listen("facialMask", xiaoHong);
   
   function xiaoLan(data) {
     console.log("xiaoLan");
   }
   dispatch.listen("facialMask", xiaoLan);
   
   // 取消订阅测试
   // dispatch.remove("facialMask", xiaoMing);
   // dispatch.remove("facialMask", xiaoHong);
   // dispatch.remove("facialMask", xiaoLan);
   
   // 发布测试
   const data = {
     type: "N95",
     price: "5￥",
     stock: 3000,
   };
   dispatch.publish("facialMask", data);
   ```

   