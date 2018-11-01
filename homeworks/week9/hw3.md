```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

輸出順序應為 : 1 ,3 ,5 ,2 ,4
setTimeout 會先到 Web API，等時間到才會被放到 Callback Queue。
1. 當 Call Stack 內的東西全部執行完
2. Event Loop 才會到 Callback Queue 檢查是否有東西
3. 有的話把東西丟到 Call Stack 裡
4. 接著又回頭檢查 Call Stack 是否有東西
5. Call Stack 有東西的話優先執行，沒有的話就去檢查 Callback Queue
6. 以上步驟一直重複。

所以雖然範例中 setTimeout 秒數給 0，但還是最後才出現，因為要先等 Call Stack 內的東西全部執行完，Event Loop 才會檢查 Callback Queue，這時候才發現他已經完成了並處理他。