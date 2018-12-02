import React, { Component } from 'react';

class Square extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        }
    }
    handleClick = () => {
        const {value} = this.state;
        if(value) return;
        const {index, onChangePlayer, nowPlayer, onSetHistory, gameover} = this.props;
        
        if(!gameover){
            this.setState({
                value: nowPlayer
            })
            onSetHistory(index);
            onChangePlayer(index);
        }
    }
    render() {
        const {value} = this.state;
        return (
            <div className="btn-square" onClick={this.handleClick}>
                <div className={"piece " + value} />
            </div>
        );
    }
}

export default Square;
