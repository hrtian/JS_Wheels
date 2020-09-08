## 实现Vue的数据双向绑定
### 1. 实现方法1
> **文件名：** Vue_2.x.js
> 利用defineProperty实现数据劫持，利用EventTarget进行数据发布；
> ```javascript
> defineProperty
> Object.keys(srcObj).forEach(key => {
>     let val = srcObj[key];
>     Object.defineProperty(srcObj, key, {
>         enumerable: true,
>         configurable: true,
>         get() {
>             return val;
>         },
>         set(newVal) {
>             val = newVal;
>             return true;
>     	}
>     });
> });
>```
### 2. 实现方法2
> **文件名：** watch_notify.js
> 利用发布订阅实现

### 3. 实现方法3
> **文件名：** Vue_3.x.js
> Vue3.0 的新特性，利用Proxy代理数据劫持
> ```js
> proxy:
> let dstObj = new Proxy(srcObj, {
>     get(target, key) {
>         return target[key];
>     },
>     set(target, key, newVal) {
>     	target[key] = newVal;
>     	return ttrue
> 	}
> })
> ```
**注意：**
1. 仅作了数据的第一层代理，深层代理并未递归实现；
2. 递归实现节点的深层编译；