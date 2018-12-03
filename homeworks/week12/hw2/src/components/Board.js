import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

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
        const {size,nowPlayer, gameover, black, white} = this.props;
        let sizeArr = [];
        for(let i=0;i<size;i++){
            sizeArr[i] = [];
            for(let j=0;j<size;j++){
                sizeArr[i][j] = [];
                sizeArr[i][j][0]=i*19+j+1;
                sizeArr[i][j][1]='';
            }
        }
        console.log(black,'black');
        console.log(white,'white');
        sizeArr.map(x => {
            x.map(y => {
                if(black.find(blackItem => blackItem ===y[0])){
                    y[1] = 'black';
                }
                if(white.find(whiteItem => whiteItem ===y[0])){
                    y[1] = 'white';
                }
            })
        })
        console.log(sizeArr);
        return (
            <div className="board">
                {
                    sizeArr.map(x => (
                        x.map(y => (
                            //y[0] = id, y[1] = color
                            <Square key={y[0]} index={y[0]} onChangePlayer={this.handlePlayer} nowPlayer={nowPlayer}  onSetHistory={this.handleHistory} gameover={gameover} color={y[1]}/>
                        ))
                    ))
                }
            </div>
        );
    }
}

export default Board;
