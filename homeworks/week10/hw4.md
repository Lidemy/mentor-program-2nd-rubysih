## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？
- gulp 主要是讓工作流程可以自動化，讓我們不用手動去執行很多指令，減少工作流程。
- webpack 是讓程式可以像 node.js 一樣用模組化開發，變得更容易維護。

## hw3 把 todo list 這樣改寫，可能會有什麼問題？
每次都要重新抓現有的資料重新產生畫面，會讓很多本來沒有更改不需要重新產生的畫面，也變成要再產生一次，比較浪費資源。

## CSS Sprites 與 Data URI 的優缺點是什麼？
- CSS Sprites 是把很多圖片集中在同一個圖檔中，多用在小 icon，或是切換變色的圖片，再用圖片定位的方式，使用其中不同的小圖。
    - 優點 : 減少要載入的圖片大小，也減少發 request 的次數。
    - 缺點 : 全部的圖都在同一張，只要一個 icon 要更改變動，就比較麻煩，每張圖的定位可能也要重新調整。
- Data URI 是把檔案用 base64 編碼後，引入網頁中。
    - 優點 : 減少要載入的檔案大小，也減少發 request 的次數。
    - 缺點 : 檔案要更新的話都要重新用 base64 編譯過，且是透過文字方式儲存在網頁檔中，所以沒辦法使用快取存取這樣形式的檔案，每次讀取網頁檔都會重新抓取這些檔案。

- 參考 :
    - CSS Sprites : 
        https://kknews.cc/other/aaaxopj.html
        https://stackoverflow.com/questions/4791807/data-uris-and-caching
    - Data URI : 
        https://blog.darkthread.net/blog/data-uri/
        https://blog.gtwang.org/web-development/minimizing-http-request-using-data-uri/