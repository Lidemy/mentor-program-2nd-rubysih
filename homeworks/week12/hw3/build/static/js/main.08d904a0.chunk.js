(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),s=a(7),l=a.n(s),c=a(1),i=a(2),r=a(4),u=a(3),h=a(5),m=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(r.a)(this,Object(u.a)(e).call(this))).handleClick=function(){var e=t.props,a=e.id;(0,e.showPost)(a)},t}return Object(h.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this.props.title;return o.a.createElement("li",{className:"list-group-item"},o.a.createElement("div",{style:{cursor:"pointer"},onClick:this.handleClick},t))}}]),e}(n.Component),p=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(r.a)(this,Object(u.a)(e).call(this))).getPostList=function(){return fetch("https://jsonplaceholder.typicode.com/posts")},t.showPost=function(e){t.props.showPost(e)},t.state={postList:[]},t}return Object(h.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.getPostList().then(function(t){return t.json()}).then(function(e){t.setState({postList:e})}).catch(function(t){console.log(t)})}},{key:"render",value:function(){var t=this,e=this.state.postList;if(console.log(e,"dd"),void 0!==e)return console.log("render"),o.a.createElement("ul",{className:"list-group list-group-flush"},e.map(function(e){return o.a.createElement(m,{key:e.id,id:e.id,title:e.title,showPost:t.showPost})}))}}]),e}(n.Component),d=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(r.a)(this,Object(u.a)(e).call(this))).getPost=function(t){return fetch("https://jsonplaceholder.typicode.com/posts/"+t)},t.handleClick=function(){(0,t.props.showPost)("")},t.state={post:""},t}return Object(h.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.postId;this.getPost(e).then(function(t){return t.json()}).then(function(e){t.setState({post:e})}).catch(function(t){console.log(t)})}},{key:"render",value:function(){var t=this.state.post;return t.title?o.a.createElement("div",null,o.a.createElement("h1",null,t.title),o.a.createElement("p",null,t.body),o.a.createElement("button",{type:"button",class:"btn btn-primary",onClick:this.handleClick},"BACK")):o.a.createElement("p",null,"Loading ...")}}]),e}(n.Component),v=function(t){return o.a.createElement("form",null,o.a.createElement("h2",null,"\u806f\u7d61\u6211 : "),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"\u96fb\u5b50\u90f5\u4ef6 :"),o.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"})),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"\u5167\u5bb9 :"),o.a.createElement("input",{type:"text",className:"form-control",placeholder:""})),o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"\u9001\u51fa"))},b=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(r.a)(this,Object(u.a)(e).call(this))).removeHashTag=function(t){return t.slice(1)},t.hashChange=function(){t.setState({tag:t.removeHashTag(window.location.hash)})},t.handleClick=function(e){t.setState({tag:e.target.name,postId:""}),console.log(t.state.tag,e.target.name)},t.showPost=function(e){t.setState({postId:e})},t.state={tag:t.removeHashTag(window.location.hash)||"postList",postId:""},t}return Object(h.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){window.addEventListener("hashchange",this.hashChange)}},{key:"componentWillUnmount",value:function(){window.clearEventListener("hashchange",this.hashChange)}},{key:"render",value:function(){var t=this.state,e=t.tag,a=t.postId;return o.a.createElement("div",null,o.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},o.a.createElement("a",{className:"navbar-brand",href:"#postList"},"Blog"),o.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNav"},o.a.createElement("ul",{className:"navbar-nav"},o.a.createElement("li",{className:"nav-item"+("postList"===e?" active":"")},o.a.createElement("a",{className:"nav-link",href:"#postList"},"PostList")),o.a.createElement("li",{className:"nav-item"+("about"===e?" active":"")},o.a.createElement("a",{className:"nav-link",href:"#about"},"About"))))),o.a.createElement("div",{className:"container"},"about"===e&&o.a.createElement(v,null),"postList"===e&&""===a&&o.a.createElement(p,{showPost:this.showPost}),"postList"===e&&""!==a&&o.a.createElement(d,{postId:a,showPost:this.showPost})))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},8:function(t,e,a){t.exports=a(13)}},[[8,2,1]]]);
//# sourceMappingURL=main.08d904a0.chunk.js.map