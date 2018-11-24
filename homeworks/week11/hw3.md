## 什麼是 MVC？
Model-View-Controller(MVC)是一種系統的設計模式，將系統架構區分為三個部分，分別是 Model、View、Controller，區分後讓系統更好維護。
- View: 用來顯示資料，即為使用者看到的畫面。
- Controller: 作為 View 及 Model 溝通的管道，負責跟 Model 要資料，及處理使用者的 Request。
- Model: 資料庫的定義及相關操作。
- *問題*: 找到的資料很多都有點不同，目前理解為 Model 放跟資料庫有關的所有操作，邏輯及資料處理都寫在 Controller，請問這樣正確嗎?

- 參考資料: 
https://ithelp.ithome.com.tw/articles/10191216
https://expect7.pixnet.net/blog/post/36446413-%5B%E8%B3%87%E8%A8%8A%5D-%E4%BB%80%E9%BA%BC%E6%98%AFmvc%EF%BC%9Fwhat's-model-view-controller%EF%BC%9F
https://dotblogs.com.tw/dog0416/2016/05/20/131644
https://hk.saowen.com/a/7f04deff9eb17b629521ba8244878b04e64d900522993cc3f6fa6ad71f59f29b
## 什麼是 ORM？
Object Relational Mapping，將關聯式資料庫的操作及連線，用操作物件的方式來完成，將資料或語法條件作為物件內的內容來使用。因為不是直接下 SQL 語法來操作資料庫，因此不管資料庫用哪一種，都可以用同樣的 ORM 語法來操作資料庫。

- 參考資料: 
https://www.itread01.com/content/1502895483.html
http://blog.twbryce.com/what-is-orm/
