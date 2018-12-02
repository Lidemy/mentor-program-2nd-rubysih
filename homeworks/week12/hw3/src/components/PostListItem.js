import React, { Component } from 'react';
class PostListItem extends Component {
    constructor(){
        super();
        // this.state = {
        //   postList: []
        // }
    }
    handleClick = () => {
        const {id,showPost} = this.props;
        showPost(id);
    }
  
    render() {
        const {title} = this.props;
        return (
            <li className="list-group-item" >
                <div style={{cursor:'pointer'}} onClick={this.handleClick} >{title}</div>
            </li>
            );
        }
}

export default PostListItem;
