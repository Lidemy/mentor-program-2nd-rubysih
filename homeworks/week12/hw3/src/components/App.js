import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';

//route todo
// class Route extends Component {
//   render(){
//     const {tag, postId, Comp} = this.props;
//     if(tag === 'postList' && postId === ''){
//       const {showPost} = this.props;
//       return (
//         <Comp showPost={showPost}/>
//       );
//     }
//     if(tag === 'postList' && postId !== ''){
//       const {showPost} = this.props;
//       return (
//         <Comp showPost={showPost}/>
//       );
//     }
//   }
// }

const About = props => {
  return (
    <form>
      <h2>聯絡我 : </h2>
      <div className="form-group">
        <label>電子郵件 :</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label>內容 :</label>
        <input type="text" className="form-control" placeholder="" />
      </div>
      <button type="submit" className="btn btn-primary">送出</button>
    </form>
  );
}

class App extends Component {
  constructor(){
    super();
    // console.log(window.location.hash);
    this.state = {
      tag: this.removeHashTag(window.location.hash) || 'postList',
      postId: ''
    };
   
  }
  removeHashTag= (hash) => {
    return hash.slice(1);
  }
  hashChange = () => {
    this.setState({
      tag: this.removeHashTag(window.location.hash)
    })
  }
  handleClick = (e) => {
    this.setState({
      tag:e.target.name,
      postId: ''
    })
    console.log(this.state.tag,e.target.name);
  }
  showPost = (postId) => {
    this.setState({
      postId: postId
    })
  }

  componentDidMount(){
    window.addEventListener('hashchange',this.hashChange);
  }
  componentWillUnmount(){
    window.clearEventListener('hashchange',this.hashChange);
  }
  render() {
    const {tag,postId} = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#postList">Blog</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={"nav-item" + (tag === 'postList'?' active':'')}>
                <a className="nav-link" 
               href='#postList' >PostList</a>
              </li>
              <li className={"nav-item" + (tag === 'about'?' active':'')}>
                <a className="nav-link" href='#about'>About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          {(tag === 'about') && <About/>}
          {(tag === 'postList' && postId === '') && <PostList showPost={this.showPost}/>}
          {(tag === 'postList' && postId !== '') && <Post postId={postId} showPost={this.showPost}/>}
        </div>
      </div>
    );
  }
}

export default App;
