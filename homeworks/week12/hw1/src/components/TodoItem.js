import React, { Component } from 'react';

class TodoItem extends Component {
    //刪除按鈕
    removeTodo = (e) => {
        const {onDelete} = this.props;
        const itemId = e.target.parentNode.className.split(' ')[1]; //第二個 class

        onDelete(itemId);
    }
    //完成按鈕
    finishedTodo = (e) => {
        const {onFinished} = this.props;
        const itemId = e.target.parentNode.className.split(' ')[1]; //第二個 class
        console.log(e.target.parentNode.className.split(' ')[1]);
        onFinished(itemId);
    }
    render() {
        const {todoItem} = this.props;
        return (
            <div className={"todo__item " + todoItem.id + (todoItem.finished ? " finished" : " ") }>
                <label >{todoItem.value}</label>
                <button type="button" className="btn btn-dark js__delete" onClick={this.removeTodo}>刪除</button>
                <button type="button" className="btn btn-dark js__finished" onClick={this.finishedTodo}>完成</button>
        </div>
        );
    }
}
export default TodoItem;
