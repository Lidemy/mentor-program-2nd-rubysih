import React, { Component } from 'react';
import TodoItem from './TodoItem';
class TodoList extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      value: ''
    }
    this.id = 0;
  }
  //新增按鈕
  handleAdd = () => {
    const {value,list} = this.state;
    this.setState({
      list: [...list,
        {
          id: this.id,
          value: value,
          finished: false
        }
      ],
      value: '',
    })
    this.id++;
  }
  //input 更新
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  //刪除項目
  removeTodo = (deleteId) => {
    const {list} = this.state;
    this.setState({
      list: list.filter((item) => {
        return item.id!==parseInt(deleteId)})
    })
  }
  //更新項目為完成
  finishedTodo = (finishedId) => {
    const {list} = this.state;
    const newList = list.map(item => {
      if(item.id === parseInt(finishedId) ){
        item.finished = true;
      }
      return item;
    })
    this.setState({
      list: newList
    })
  }
  render() {
    const {value,list} = this.state;
    return (
      <div className="todo-list">
          <div className="row new__todo">
              <div className="col-md-9 col-sm-10">
                  <input type="text" className="form-control" placeholder="新增 todo 項目" value={value} onChange={this.handleChange}/>                 
              </div>
              <div className="col-md-3 col-sm-2">
                  <button type="button" className="btn btn-secondary js__new-todo" onClick={this.handleAdd}>新增</button>
              </div>
          </div>
          <div className="todo__block">
              {list.map(item =><TodoItem todoItem={item} key={item.id} onDelete={this.removeTodo} onFinished={this.finishedTodo}>{item.value}</TodoItem>)}
          </div>
      </div>
    );
  }
}

export default TodoList;
