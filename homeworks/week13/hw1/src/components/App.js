import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import Home from './Home';
import NavItem from './/NavItem';
import { HashRouter as Router, Route, Link } from "react-router-dom";


const About = props => {
  return (
    <div className="layout aboutus">
      <form>
        <h2 className="title">聯絡我 : </h2>
        <div className="form-group">
          <label>電子郵件 :</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>內容 :</label>
          <textarea className="form-control" rows="6" />
        </div>
        <div className="btn-block">
          <button type="submit" className="btn btn-primary">送出</button>
        </div>
      </form>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <NavItem to="/postList" label='Posts' />
              <NavItem to="/about" label='About us' />
            </ul>
          </div>
        </nav>
        <div className='container'>
          <Route exact path="/postList" component={PostList} />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About}/>
          <Route path="/post/:postId" component={Post}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
