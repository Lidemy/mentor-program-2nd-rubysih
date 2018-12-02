import React, { Component } from 'react';

class TodoItem extends Component {
    //刪除按鈕
    removeTodo = (e) => {
        const {onDelete} = this.props;
        onDelete(e.target.parentNode.id);
    }
    //完成按鈕
    finishedTodo = (e) => {
        const {onFinished} = this.props;
        onFinished(e.target.parentNode.id);
    }
    render() {
        const {todoItem} = this.props;
        return (
            <div className={"todo__item " + (todoItem.finished ? "finished" : "")} id={todoItem.id}>
                <label >{todoItem.value}</label>
                <button type="button" className="btn btn-dark js__delete" onClick={this.removeTodo}>刪除</button>
                <button type="button" className="btn btn-dark js__finished" onClick={this.finishedTodo}>完成</button>
        </div>
        );
    }
}
export default TodoItem;
