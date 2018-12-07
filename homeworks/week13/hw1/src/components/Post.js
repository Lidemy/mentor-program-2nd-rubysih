import React, { Component } from 'react';
import { withRouter } from "react-router-dom"; 
import axios from 'axios';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            post: ''
        }
    }
    //取得文章
    getPost = (id) => {
        return axios.get('http://45.55.26.18:3310/posts/' + id);
    }
    componentDidMount(){
        const postId = this.props.match.params.postId;

        this.getPost(postId)
        .then(function(response) {
        return response.data;
        })
        .then(post => {
        this.setState( {
            post: post
        });

        })
        .catch(err => {
        console.log(err);
        });
    }
    handleClick = () => {
        const {history} = this.props;
        history.push('/postList');
    }
    render() {
        const {post} = this.state;
        if(post.title){
            return (
                <div className="layout post">
                    <h1 className="title">{post.title}</h1>
                    <p className="author">作者: {post.author}</p>
                    <p className="content">
                        {post.body}
                    </p>
                    <div className="btn-block">
                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>BACK</button>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="layout post">
                    <h1>Loading ...</h1>
                </div>
                
            );
        }
    }
}

export default withRouter(Post);
