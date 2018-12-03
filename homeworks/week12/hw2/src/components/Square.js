import React, { Component } from 'react';

class Square extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         value: null
    //     }
    // }
    handleClick = () => {
        const {color} = this.props;
        if(color) return;
        const {index, onChangePlayer, nowPlayer, onSetHistory, gameover} = this.props;
        
        if(!gameover){
            // this.setState({
            //     color: nowPlayer
            // })
            onSetHistory(index);
            onChangePlayer(index);
        }
    }
    render() {
        const {color} = this.props;

        return (
            <div className="btn-square" onClick={this.handleClick}>
                <div className={"piece " + color} />
            </div>
        );
    }
}

export default Square;
