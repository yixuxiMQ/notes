# 环境配置

------

```js
// vite创建vue项目
// config/index.js
const env = import.meta.env.MODE || "production";
const envConfig = {
  development:{
    baseApi: "",
    mockApi: ""
  },
  production:{
    baseApi: "",
    mockApi: ""
  },
  test:{
    baseApi: "",
    mockApi: ""
  }
};

export default {
  env,
  mock: true,
  namespace: 'manager',
  ...envConfig[env]
}
```

