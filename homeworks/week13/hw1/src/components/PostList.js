import React, { Component } from 'react';
import axios from 'axios';
import PostListItem from './PostListItem';

class PostList extends Component {
  constructor(){
    super();
    this.state = {
      postList: [],
      clickAdd: false,
      titleValue: '',
      authorValue: '',
      contentValue: ''
    }
  }
  //取得文章列表
  getPostList = () => {
    return axios.get('http://45.55.26.18:3310/posts');
  }
  componentDidMount(){
    this.getPostList()
    .then(function(response) {
      return response.data;
    })
    .then(postList => {
      this.setState( {
        postList: postList
      })
    })
    .catch(err => {
      console.log(err);
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    const {clickAdd} = this.state;
    if(prevState.clickAdd && clickAdd === false){
      this.getPostList()
      .then(function(response) {
        return response.data;
      })
      .then(postList => {
        this.setState( {
          postList: postList
        })
      })
      .catch(err => {
        console.log(err);
      });
      console.log('didupdate',prevState.clickAdd);

    }
  }
  //新增貼文
  handleAddPost = () => {
    const {titleValue, authorValue, contentValue} = this.state;    
    axios.post('http://45.55.26.18:3310/posts', {
      title: titleValue,
      author: authorValue,
      body: contentValue
    })
    .then(function (response) {      
      return response;
    })
    .then(response => {
      console.log(this);
      this.setState({
        clickAdd: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //按鈕 返回文章列表
  handleClickBack = () => {
    this.setState({
      clickAdd: false
    })
  }
  //按鈕(到新增貼文頁面的)
  handleClick = () => {
    this.setState({
      clickAdd: true
    })
  }
  //input change
  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    })
  }
  handleAuthorChange = (e) => {
    this.setState({
      authorValue: e.target.value
    })
  }
  handleContentChange = (e) => {
    this.setState({
      contentValue: e.target.value
    })
  }

  render() {

    const {postList, clickAdd, titleValue, authorValue, contentValue} = this.state;
    if(clickAdd){

      return (
        <div className="layout addPost">
      <form>
        <h2 className="title">新增貼文 : </h2>
        <div className="form-group">
          <label>標題 :</label>
          <input type="text" className="form-control" id="title" value={titleValue} placeholder="Enter title" onChange={this.handleTitleChange}/>
        </div>
        <div className="form-group">
          <label>作者 :</label>
          <input type="text" className="form-control" id="author" value={authorValue} placeholder="Enter author" onChange={this.handleAuthorChange} />
        </div>
        <div className="form-group">
          <label>內容 :</label>
          <textarea className="form-control" rows="6" value={contentValue} onChange={this.handleContentChange}/>
        </div>
        <div className="btn-block">
        </div>
      </form>
      <div className="btn-block">
          <button type="button" className="btn btn-primary" onClick={this.handleClickBack}>BACK</button>
          <button type="submit" className="btn btn-primary" onClick={this.handleAddPost}>新增</button>
      </div>
    </div>
      );
    }
    if(postList !== undefined){
    console.log('render');

      return (
        <div>
          <ul className="list-group list-group-flush">
            { 
              postList.map(post => (
                post.title && post.body &&
              (<PostListItem key={post.id} id={post.id} title={post.title}/>)
            ))}

          </ul>
          <div className="btn-add" onClick={this.handleClick}>+</div>
        </div>
      );
    }
    
  }
}

export default PostList;
