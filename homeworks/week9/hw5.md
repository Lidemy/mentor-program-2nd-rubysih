## CSS 預處理器是什麼？我們可以不用它嗎？
讓我們可以用程式的邏輯來寫 CSS .CSS 檔案，可以不使用 CSS 預處理器，寫法就比較繁瑣。

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
Cache-Control: no-cache 永遠都會發 request 問 sever 檔案是否有更新。
可以達到只要網站一更新，user 一定可以看到更新後的網站，且相較起來較不耗資源，唯一小缺點是每次造訪都會發 request ，不管檔案是否真的有更新。

- 參考 : https://blog.techbridge.cc/2017/06/17/cache-introduction/

## Stack 跟 Queue 的差別是什麼？
兩者最大的差別是，Stack是像疊餐盤一樣，先進後出，第一個進去的會最後一個出來。
Queue則是像排隊伍一樣，先進先出，第一個進去的會第一個出來。

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
- 大部分的選擇器權重是三位數 : 0-0-0
由左至右是 id、class、element
選擇器中有個別有幾個，該位數數字就是多少
例如 : 
    - .reply__block .content.self__message :有三個 class，所以權重是 0-3-0
    - ul>li : 有兩個element，所以權重是 0-0-2

越左邊的位數權重越大，可以直接蓋過權重較小的設定。
但若是在同個位數，就是比數字大小。

- 行內元素的話就是第四個位數 : 1-0-0-0
- 最後是大魔王，!important : 1-0-0-0-0，直接蓋過全部 CSS，只有 !important 可以蓋過 !important。

- 參考 :
http://muki.tw/tech/css-specificity-document/
https://ithelp.ithome.com.tw/articles/10196454
