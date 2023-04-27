import { Button, FormCheck } from "react-bootstrap";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [order, setOrder] = useState([]);
  const [playerOrder, setPlayerOrder] = useState([]);
  // const [flash, setFlash] = useState([]);
  let flash;
  // const [turn, setTurn] = useState([]);
  let turn;
  // const [good, setGood] = useState(false);
  let good;
 let compTurn;  
  let intervalId;
  // const [strict, setStrict] = useState(false);
  const [noise, setNoise] = useState(true);
  const [on, setOn] = useState(true);
  const [turnCounter, setTurnCounter] = useState("");
  const [win, setWin] = useState();
  const [isTopLeft, setIsTopLeft] = useState(false);
  const [topRight, setTopRight] = useState(false);
  const [bottomLeft, setBottomLeft] = useState(false);
  const [bottomRight, setBottomRight] = useState(false);

  // const strictMode = () => {
    // if (strict.checked === true) {
      // setStrict(true);
    // } else {
      // setStrict(false);
    // }
    // console.log("strict");
  // };

  // const Power = () => {
    // if (on.checked === true) {
      // setOn(true);
      // setTurnCounter("-")
    // } else {
      // setOn(true);
      // setTurnCounter("");
      // clearColor();
      // clearInterval(intervalId)
    // }
    // console.log("on", on);
    // console.log("on", turnCounter);
  // };

  const StartBtn = () => {
    if (on || win) {
      play();
    }
    console.log("start",on);
  };

  const play = () => {
    setWin(false);
    setOrder([]);
    setPlayerOrder([]);
    flash = 0;
    intervalId = 0;
    turn = 0;
    setTurnCounter(1);
    good = true;
    for (let i = 0; i < 20; i++) {
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
    console.log("order", order);
  };

  const gameTurn = () => {
    setOn(true);
    if (flash === turn) {
      console.log("flash", flash);
      clearInterval(intervalId);
      compTurn = true;
      clearColor();
      setOn(true);
    }
    else if (compTurn) {
      clearColor()
      setTimeout(() => {
        // switch () {
          // case (order[flash] === 1):
          // return one();
          // case (order[flash] === 2):
          // return two();
          // case (order[flash] === 3):
          // return three();
          // case (order[flash] === 4):
              // return four();
        // 
          // default:
            // return flash++;
            // }

            console.log("flash", flash);
        if (order[flash] === 1) {one()};
        if (order[flash] === 2) two();
        if (order[flash] === 3) three();
        if (order[flash] === 4) four();
        flash++;
      }, 200);
    }
  };
  const one = () => {
    console.log("top")
    if (noise) {
      let audio = document.getElementById("clip1");
      audio.play();
    }
    setNoise(true);
    setIsTopLeft(true);
  };
  const two = () => {
    console.log("top")
    if (noise) {
      let audio = document.getElementById("clip2");
      audio.play();
    }
    setNoise(true);
    setTopRight(true);
  };
  const three = () => {
    console.log("top")
    if (noise) {
      let audio = document.getElementById("clip3");
      audio.play();
    }
    setNoise(true);
    setBottomLeft(true);
  };
  const four = () => {
    console.log("top")
    if (noise) {
      let audio = document.getElementById("clip4");
      audio.play();
    }
    setNoise(true);
    setBottomRight(true);
  };

  const clearColor = () => {
    setIsTopLeft(false);
    setTopRight(false);
    setBottomLeft(false);
    setBottomRight(false);
  };

  const flashColor = () => {
    setIsTopLeft(true);
    setTopRight(true);
    setBottomLeft(true);
    setBottomRight(true);
  };

  const topLeftBtn = () => {
    if (on) {
      playerOrder.push(1);
      check();
      one();
      if (!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
    console.log("topLeftBtn", on);
  };

  const topRightBtn = () => {
    if (on) {
      playerOrder.push(2);
      check();
      two();
      if (!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
    console.log("topRightBtn");
  };
  const bottomLeftBtn = () => {
    if (on) {
      playerOrder.push(3);
      check();
      three();
      if (!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
    console.log("bottomLeftBtn");
  };
  const bottomRightBtn = () => {
    if (on) {
      playerOrder.push(4);
      check();
      four();
      if (!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
    console.log("bottomRightBtn");
  };

  const check = (start) => {
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
     good =false;
     if(playerOrder.length === 20 && good) {
      winGame();
    }
    if(good === false) {
      flashColor();
      setTimeout(() => {
        clearColor();
        if(start){
          play()
        }else{
          compTurn =true;
          flash = 0;
          setPlayerOrder([])
          good =true;
          intervalId = setInterval(gameTurn, 800);
        }
      }, 800);
      setNoise(false);
  }
  if(turn === playerOrder.length && good && !win){
   turn ++;
   setPlayerOrder([]);;
   compTurn = true;
   flash = 0;
  intervalId = setInterval(gameTurn, 800);
  }
}

const winGame = () => {
  flashColor();
  setOn(true);
  setWin(true);
}


  return (
    <div className="App">
      <h1>Simon Game</h1>

      <audio id="clip1">
        <source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"></source>
      </audio>
      <audio id="clip2">
        <source src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"></source>
      </audio>
      <audio id="clip3">
        <source src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"></source>
      </audio>
      <audio id="clip4">
        <source src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"></source>
      </audio>
      <div id="outer-circle">
        <Button
          id="topLeft"
          onClick={(event) => topLeftBtn(event)}
          style={{
            backgroundColor: isTopLeft ? "#90EE90" : "#013220",
          }}
        ></Button>
        <Button
          id="topRight"
          onClick={(event) => topRightBtn(event)}
          style={{
            backgroundColor: topRight ? "tomato" : "darkRed",
          }}
        ></Button>
        <Button
          id="bottomLeft"
          onClick={(event) => bottomLeftBtn(event)}
          style={{
            backgroundColor: bottomLeft ? "yellow" : "goldenrod",
          }}
        ></Button>
        <Button
          id="bottomRight"
          onClick={(event) => bottomRightBtn(event)}
          style={{
            backgroundColor: bottomRight ? "lightSkyBlue" : "darkblue",
          }}
        ></Button>
        <div id="inner-circle">
          <div id="title" className="font-effect-emboss">
            SIMON!
          </div>
          <div id="switches">
          

 
 
 
 
 
 
 
            <Button
              className="button"
              id="start"
              onClick={(event) => StartBtn(event)}
            >
              Start
            </Button>
          </div>
          <div id="turn">{turnCounter}</div>
          <div className="text2">COUNT</div>
        </div>
      </div>
    </div>
  );
}

export default App;
