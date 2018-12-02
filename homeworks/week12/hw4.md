## 為什麼我們需要 React？可以不用嗎？
解決資料與 DOM 不同步的問題，可以不使用，但是用了會方便很多(大專案較明顯)
## React 的思考模式跟以前的思考模式有什麼不一樣？
以前傾向直接操作 DOM 物件，現在變成只操作資料，再依照資料來 render 畫面，每次只要資料更新就 rerender。

## state 跟 props 的差別在哪裡？
- state 是這個 component 內部的狀態，可用 setState() 修改狀態。
- props(參數) 是從外部傳進來 component 的，無法修改。

## 請列出 React 的 lifecycle 以及其代表的意義
- constructor(): component 新產生的時候會先 call，把這個 component 初始化
- componentDidMount(): 初始化後 component 還沒 mount 到 DOM 上，當被 mount 上去後會 call，通常只會 call 一次，如果有要向 server 取資料可以寫在這裡。
- shouldComponentUpdate(): 在 state 更新後，會由此來判斷是否要 rerender
- componentDidUpdate(): 當 component 已經在 DOM 上，資料(props 或 state)更新要 rerender 時會呼叫，參數是 prevProps、prevState，可以在這裡比較資料更新前後的狀況。
- componentWillUnmount(): 在component 即將從 DOM 上 unmount 時會呼叫，可在這裡回收監聽事件。

- 參考資料: https://reactjs.org/docs/react-component.html#componentdidmount
https://pbs.twimg.com/media/DZ-97vzW4AAbcZj.jpg:large
mtr02 12-2 上課影片

