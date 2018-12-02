import React, { Component } from 'react';
class Post extends Component {
    constructor(){
        super();
        this.state = {
            post: ''
        }
    }
    //取得文章
    getPost = (id) => {
        return fetch('https://jsonplaceholder.typicode.com/posts/' + id);
    }
    componentDidMount(){
        const {postId} = this.props;
        this.getPost(postId)
        .then(function(response) {
        return response.json();
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
        const {showPost} = this.props;
        showPost('');
    }
    render() {
        // const {postId} = this.props;
        const {post} = this.state;
        if(post.title){
            return (
                <div>
                    <h1>{post.title}</h1>
                    <p>
                        {post.body}
                    </p>
                    <button type="button" class="btn btn-primary" onClick={this.handleClick}>BACK</button>
                </div>
            );
        }else{
            return (
                <p>Loading ...</p>
            );
        }
    }
}

export default Post;
