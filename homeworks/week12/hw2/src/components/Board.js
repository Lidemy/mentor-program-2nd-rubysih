import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            black: [],
            white: []
        }
    }

    renderSquare = (i) => {
        console.log('rendersquare');
        return <Square value={i} />;
    }
    handlePlayer = (index) => {
        const {onChangePlayer} = this.props;
        onChangePlayer(index);
    }
    handleHistory = (index) => {
        const {onSetHistory} = this.props;
        onSetHistory(index);
    }
    render() {
        const {size,nowPlayer, gameover} = this.props;
        let sizeArr = [];
        for(let i=0;i<size;i++){
            sizeArr[i] = [];
            for(let j=0;j<size;j++){
                sizeArr[i][j]=i*19+j+1;
                
            }
        }
        // console.log(sizeArr);

        return (
            <div className="board">
                {
                    sizeArr.map(x => (
                        x.map(y => (
                            <Square key={y} index={y} onChangePlayer={this.handlePlayer} nowPlayer={nowPlayer}  onSetHistory={this.handleHistory} gameover={gameover}/>
                        ))
                    ))
                }
            </div>
        );
    }
}

export default Board;
