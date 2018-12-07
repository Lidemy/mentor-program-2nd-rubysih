## React Router 背後的原理你猜是怎麼實作的？
- hash router: 利用 url 上 hashtag　後方值變動不會換頁的特性，且瀏覽器有提供 onhashchange 這個監聽事件。
- browser router: history 也有更動 url 不會刷新頁面的特性(原本是用於多頁面跳轉)，利用 history.pushState、history.replaceState 和 onpopstate 來讓 location 跟 component 同步，最後只有跟 url 匹配的 component 會 render 出來，其他的就會 render null。

- 參考資料: https://github.com/youngwind/blog/issues/109 (推)
http://zhenhua-lee.github.io/react/history.html

## SDK 與 API 的差別是什麼？
- API: Application Programming Interface，定義方法讓外界可以取用內部的資料或資源，外界不需要知道它裡面是怎麼實作，只要按照規則使用，就可以取得資料。
- SDK: Software Development Kit，通常是由產品開發方釋出，讓其他開發者可以更方便的開發產品相關應用，會定義好很多 API 給其他開發者使用，所以 SDK 算是 API 的集合體。

- 參考資料: http://androchen.logdown.com/posts/2014/04/13/api-sdk-library
https://columns.chicken-house.net/2016/10/23/microservice4/

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？
如果發出 request 跟 設置cookie 是同源的話，ajax 會自動帶上 cookie，如果不同源，可以在 ajax 加上 
withCredentials: true，且 server 端要在 header 設定 Access-Control-Allow-Credentials = true 及 Access-Control-Allow-Origin。

- 參考資料: https://zhuanlan.zhihu.com/p/28818954
https://blog.csdn.net/wzl002/article/details/51441704
https://www.cnblogs.com/think-in-java/p/7285529.html