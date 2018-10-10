## 請說明 SQL Injection 的攻擊原理以及防範方法
- 透過 user 輸入的文字來與資料庫互動 (例如登入，修改資料等)，通常為在 SQL 語句中插入 user 輸入的參數，此時若 user 輸入特殊字元，被翻譯成  SQL 中的關鍵字，就有可能把 SQL 的搜尋條件改掉。

- 防範方法 : prepare statement
將 user 輸入的參數只當作參數來處理，不會變成語句的一部分

- 參考資料 : 
https://www.qa-knowhow.com/?p=4172
https://www.puritys.me/docs-blog/article-11-SQL-Injection-%E5%B8%B8%E8%A6%8B%E7%9A%84%E9%A7%AD%E5%AE%A2%E6%94%BB%E6%93%8A%E6%96%B9%E5%BC%8F.html

## 請說明 XSS 的攻擊原理以及防範方法
- Cross-Site Scripting 跨站腳本攻擊，與 SQL Injection 概念雷同，
分為反射型及儲存型，常發生在直接把 user 輸入的資料沒經過處來就拿來使用。

- 反射型 : user 輸入資料後，server 接收處理並回傳到 client 端畫面，像是留言、搜尋功能。透過輸入非正常的資料 (例如 html、js 語法)來達到竊取資料或重導頁面等。

- 儲存型 : 較反射型困難，駭客把他的程式碼儲存在 server 的資料庫中，因此每個 user 到那頁面時都會被影響。

-防範方法 : 在輸入或取用時把特殊字元跳脫掉。

- 參考資料 : https://www.gss.com.tw/index.php/focus/security/956-gss0067


## 請說明 CSRF 的攻擊原理以及防範方法
- Cross Site Request Forgery 跨站請求偽造，又稱作 one-click attack，偽造 user 身分並發送 request 給 server。

- 防範方法 : 
1. user 在使用完網站即登出，不要一直保持登入狀態。
2. 檢查 request 的 domain (request 的 header 裡面的 referer)
3. 加上圖形驗證碼、簡訊驗證碼 (很好但有點惱人的方法)
4. 加上 CSRF token (只有 user 知道，駭客不知道的資訊)
5. browser 本身的防禦 (目前只有 Chrome 才有)，在Set-Cookie 後方加上 SameSite=Lax (此模式較寬鬆)

- 參考資料 : 
https://blog.techbridge.cc/2017/02/25/csrf-introduction/

## 請舉出三種不同的雜湊函數
MD5 ,bcrypt , SHA-1

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
- Session : 儲存在 server 端，client 端會儲存 session id(唯一)，透過 session id 及資料庫中的來比對是否正確。
- Cookie : 儲存在 client 端，因此有可能被修改，常用來儲存 user 輸入的資料(帳號，資料欄位等)，有生命期限，只對本來的 domain 有效。

- 參考資料 : 
https://blog.hellojcc.tw/2016/01/12/introduce-session-and-cookie/
https://ithelp.ithome.com.tw/articles/10190233

## `include`、`require`、`include_once`、`require_once` 的差別
- require : 通常放在 .php 檔案的最上方，用來引入檔案，引入檔案錯誤時會程式終止。
- include : 用途與 require 相同，但通常用在判斷句中，引入檔案錯誤時只會顯示警告，不會程式終止。
- _once : 會先檢查是否已有引入此檔案，確保不重複引入。

- 參考資料 :
https://sanji0802.wordpress.com/2008/02/25/php%E5%BC%95%E7%94%A8%E6%AA%94%E6%A1%88%E7%9A%84%E5%87%BD%E6%95%B8%E5%8D%80%E5%88%A5requirerequire_onceincludeinclude_once/
http://syunguo.blogspot.com/2013/04/phpinclude-require.html