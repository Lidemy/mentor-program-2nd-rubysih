(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(7),r=n.n(i),s=n(8),l=n(1),c=n(2),d=n(4),u=n(3),m=n(5),h=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).removeTodo=function(e){(0,n.props.onDelete)(e.target.parentNode.id)},n.finishedTodo=function(e){(0,n.props.onFinished)(e.target.parentNode.id)},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.todoItem;return o.a.createElement("div",{className:"todo__item "+(e.finished?"finished":""),id:e.id},o.a.createElement("label",null,e.value),o.a.createElement("button",{type:"button",className:"btn btn-dark js__delete",onClick:this.removeTodo},"\u522a\u9664"),o.a.createElement("button",{type:"button",className:"btn btn-dark js__finished",onClick:this.finishedTodo},"\u5b8c\u6210"))}}]),t}(a.Component),v=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(d.a)(this,Object(u.a)(t).call(this))).handleAdd=function(){var t=e.state,n=t.value,a=t.list;e.setState({list:Object(s.a)(a).concat([{id:e.id,value:n,finished:!1}]),value:""}),e.id++},e.handleChange=function(t){e.setState({value:t.target.value})},e.removeTodo=function(t){var n=e.state.list;e.setState({list:n.filter(function(e){return e.id!==parseInt(t)})})},e.finishedTodo=function(t){var n=e.state.list.map(function(e){return e.id===parseInt(t)&&(e.finished=!0),e});e.setState({list:n})},e.state={list:[],value:""},e.id=0,e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.value,a=t.list;return o.a.createElement("div",{className:"todo-list"},o.a.createElement("div",{className:"row new__todo"},o.a.createElement("div",{className:"col-md-9 col-sm-10"},o.a.createElement("input",{type:"text",className:"form-control",placeholder:"\u65b0\u589e todo \u9805\u76ee",value:n,onChange:this.handleChange})),o.a.createElement("div",{className:"col-md-3 col-sm-2"},o.a.createElement("button",{type:"button",className:"btn btn-secondary js__new-todo",onClick:this.handleAdd},"\u65b0\u589e"))),o.a.createElement("div",{className:"todo__block"},a.map(function(t){return o.a.createElement(h,{todoItem:t,key:t.id,onDelete:e.removeTodo,onFinished:e.finishedTodo},t.value)})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(v,null),document.getElementById("container")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(14)}},[[9,2,1]]]);
//# sourceMappingURL=main.932b6855.chunk.js.map