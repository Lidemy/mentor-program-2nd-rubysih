import React, { Component } from 'react';
// import Post from './Post';
import PostListItem from './PostListItem';

class PostList extends Component {
  constructor(){
    super();
    this.state = {
      postList: []
    }
  }
  //取得文章列表
  getPostList = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts');
  }
  componentDidMount(){
    this.getPostList()
    .then(function(response) {
      return response.json();
    })
    .then(postList => {
      this.setState( {
        postList: postList
      });

    })
    .catch(err => {
      console.log(err);
    });
  }
  showPost = (id) => {
    // console.log('showpost',post);
    this.props.showPost(id);
  }

  render() {
    const {postList} = this.state;
    console.log(postList,'dd');
    if(postList !== undefined){
      console.log('render');
      return (
        <ul className="list-group list-group-flush">
          { 
            postList.map(post => (
            // (<li className="list-group-item" key={post.id}>{post.title}</li>)
            (<PostListItem key={post.id} id={post.id} title={post.title} showPost={this.showPost}/>)
          ))}

        </ul>
      );
    }
    
  }
}

export default PostList;
