# localStorage封装

------

```js
// utils/storage.js
import config from '../config';

export default {
  setItem(key,val){
    const storage = this.getStorage();
    storage[key] = val;
    this.setStorage(storage);
  },
  getItem(key){
    return this.getStorage()[key];
  },
  clearItem(key){
    const storage = this.getStorage();
    delete storage[key];
    this.setStorage(storage);
  },
  clearAll(){
    window.localStorage.clear();
  },
  getStorage(){
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}');
  },
  setStorage(storage){
		window.localStorage.setItem(config.namesapce,JSON.stringify(storage));
  }
}
```

