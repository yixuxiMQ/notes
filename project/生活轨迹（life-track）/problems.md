# problems encountered in project development

------

## problem 1

- problem description

  ```js
  在城市列表选择城市跳转主页面后，请求返回的数据中含有其他城市的推荐内容。
  ```

- reason

  ```js
  post请求时发送的参数data为对象，只发送字符串出现问题。
  ```

------

## problem 2

- problem description

  ```js
  在城市列表选择城市跳转主页面后，会发送请求，即使选择选择相同的城市依然会发送请求。
  ```

- reason

  ```js
  没有组件缓存
  ```

- solution

  ```js
  keep-alive
  使用keep-alive缓存组件，使用缓存的组件会触发activated钩子函数，在钩子函数中规定“当选择城市不同时重新调用数据”。
  ```

------

## problem 3

- problem description

  ```js
  移动端适配
  ```

- 内容二

  ```js
  //code...
  ```

- 内容三

  ```js
  //code...
  ```

------

## problem 4

