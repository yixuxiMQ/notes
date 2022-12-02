# axios二次封装

------

```js
// utils/request.js

import axios from 'axios';
import config from '../config';
import router from '../router'

const TOKEN_INVALID = 'Token验证失败，请重新登录';
const NETWORK_ERROR = '网络连接失败，请稍后重试';

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

service.interceptors.request.use(req=>{
  const headers = req.headers;
  if(!headers.Authorization) headers.Authorization = 'Bear Tober';
  return req;
})

service.interceptors.response.use(res=>{
  const { code, data, desc } = res.data;
  if(code === 200){
    return data;
  }else if(code === 40001){
    setTimeout(()=>{
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID);
  }else{
    return Promise.reject(desc || NETWORK_ERROR)
  }
  
  // 这种形式是为了通过 request({url: '/login',data:{name: "Tober"}})
  function request(options){
    options.method = options.method || 'get';
    if(options.method.toLowerCase() === 'get'){
      options.params = options.data;
    }
    if(config.env === 'production'){
      service.defaults.baseURL = config.baseApi;
    }else{
      service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
    }
    return service(options);
  }
  
  // 这种形式是为了通过 request.get('/login',{name:"Tober"},{mock:true,loading: true})
  ['get', 'post', 'delete', 'put', 'patch'].forEach(item => {
    request[item] = (url, data, options) => {
      return request({
        url,
        data,
        method: item,
        ...options
      })
    }
  })
  
  export default request;
})
```

