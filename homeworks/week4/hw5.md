## 什麼是 DOM？
Document Object Model，會將 HTML 文件定義為樹狀結構，每個元素都是一個節點，讓 javascript 可以存取並控制 HTML。

## 什麼是 Ajax？
透過瀏覽器提供的 API，來達到不換業就跟 server 溝通。

## HTTP method 有哪幾個？有什麼不一樣？
- GET : 最常用的方法之一，用來存取資料。
- POST : 最常用的方法之一，用來傳資料給 server。
- PATCH : 會修改部分的資料。
- PUT : 新增一項資料，如果存在就覆蓋過去。
- DELETE : 用來刪除資料。
- OPTIONS : 看 server 支援哪些 method。
- HEAD : 與 get 相同，但是沒有 response body。

## `GET` 跟 `POST` 有哪些區別，可以試著舉幾個例子嗎？
- GET : 資料會被代入在網址後方，所以會有資料安全性的問題，且能傳送的資料會受到 url 長度限制的影響。
- POST : 會將資料存在 body 中再進行傳送。

## 什麼是 RESTful API？
Representational State Transfer 是一種網路架構風格， RESTful API 即為這種架構風格的 API 撰寫方式。RESTful API 充份利用HTTP協定的特點，包括 method 的命名等。

## JSON 是什麼？
是一種資料格式。

## JSONP 是什麼？
是透過 javascript 可以跨網域的這個特性，延伸出來的存去資料的方式，將 JSON 資料放在 .js 檔案中，並用 <script> 標籤來存取。

## 要如何存取跨網域的 API？
- JSONP
- Server 必須在 Response 的 Header 裡面加上Access-Control-Allow-Origin。