import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      nowPlayer: 'black',
      winner: '',
      gameover: false,
      black: [],
      white: []
    }
  }
  //set now player
  handlePlayer = (index) => {
    const {nowPlayer, gameover} = this.state;
    if(gameover) return;    
    const nextPlayer = (nowPlayer === 'black')?'white':'black';
    this.setState({
      nowPlayer:nextPlayer
    })
    this.handleWinner(nowPlayer,index);

  }
  //黑白棋歷史紀錄
  handleHistory = (index) => {
    const {nowPlayer, gameover, black, white} = this.state;
    if(gameover) return;
    if(nowPlayer === 'black'){
      this.setState({
        black: [... black, index]
      })
    }else{
      this.setState({
        white: [... white, index]  
      })
    }
  }
  handleWinner = (nowPlayer, index) => {
    const {black,white} = this.state;
    const history = (nowPlayer === 'black')?black:white;
    const horizontal=1, //橫向
          vertical=19,  //直向
          obliqueLeftUp=20,//斜左上
          obliqueRightUp=18;//斜右上
    this.checkLine(index, history, horizontal);
    this.checkLine(index, history, vertical);
    this.checkLine(index, history, obliqueLeftUp);
    this.checkLine(index, history, obliqueRightUp);
  }

  //連線檢查
  checkLine = (index, history, direction) => {
    //以防有最後子在中間這種情形，因此同一條直線的兩邊都會檢查
    let count = 1;
    for(let i=1;i<5;i++){
      if(history.some(x => x===(index+i*direction))){
        count++;
      }else{
        break;
      }
    }
    if(this.checkWin()){return;}
      for(let i=1;i<5;i++){
        if(history.some(x => x===(index-i*direction))){
          count++;
        }else{
          break;
        }
      }
    this.checkWin(count);
  }

  //連線棋子數檢查
  checkWin = (count) => {
    if(count === 5){
      const {nowPlayer} = this.state;
      this.setState({
        winner: nowPlayer,
        nowPlayer: "",
        gameover: true
      })
      return true;
    }
    return false;
  }
  handleClick = () => {
    this.setState({
      nowPlayer: 'black',
      winner: '',
      gameover: false,
      black: [],
      white: []
    })
  }
  render() {
    const {nowPlayer, winner, gameover} = this.state;
    return (
      <div className="game">
        <p>目前輪到: <span >{nowPlayer}</span></p>
        <p>獲勝者: <span >{winner}</span></p>
        <div className="btn btn-again" onClick={this.handleClick}>重新開始</div>
        <Board size={19} nowPlayer={nowPlayer} onChangePlayer={this.handlePlayer}  onSetHistory={this.handleHistory} gameover={gameover} black={this.state.black} white={this.state.white}/>
      </div>
    );
  }
}

export default Game;
