import React, { Component } from 'react';
import { withRouter} from "react-router-dom";

class PostListItem extends Component {
    handleClick = () => {
        const {id, history} = this.props;
        history.push('/post/'+id);
    }
  
    render() {
        const {title,id} = this.props;

        return (
            <li className="list-group-item" >
                <div style={{cursor:'pointer'}} onClick={this.handleClick} >{id}. {title}</div>
            </li>
            );
        }
}

export default withRouter(PostListItem) ;
