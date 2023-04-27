import React, { useState, useContext, createContext } from "react";

export const UserContext = createContext({});

export function useUserContext() {
  return useContext(UserContext);
}

export function ContextProvider({ children }) {
  const [order, setOrder] = useState([]);
  const [playerOrder, setPlayerOrder] = useState([]);
  const [flash, setFlash] = useState([]);
  const [turn, setTurn] = useState([]);
  const [good, setGood] = useState(false);
  const [compTurn, setCompTurn] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [strict, setStrict] = useState(false);
  const [noise, setNoise] = useState(true);
  const [on, setOn] = useState(false);
  // let onDisplay = "--"
  const [win, setWin] = useState();
  let bottomRight = document.getElementById("bottomRight");
  let bottomLeft = document.getElementById("bottomLeft");
  let topRight = document.getElementById("topRight");
  let topLeft = document.getElementById("topLeft");

  const strictMode = () => {
    if (strict.checked === true) {
      setStrict(true);
    } else {
      setStrict(false);
    }
  };

  const Power = () => {
    if (on.checked === true) {
      setOn(true);
    } else {
      setOn(false);
        clearColor();
      clearInterval(intervalId);
    }
  };

  const StartBtn = () => {
    if (on || win) {
      play();
    }
  };

  const play = () => {
    setWin(false);
    setOrder([]);
    setPlayerOrder([]);
    setFlash(0);
    setIntervalId(0);
    setTurn(1);
    setGood(true);
    for (let i = 0; i < 20; i++) {
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    setCompTurn(true);

    setIntervalId(gameTurn, 800);
  };

  const gameTurn = () => {
    setOn(false);
    if (flash === turn) {
      clearInterval(intervalId);
      setCompTurn(false);
      clearColor();
      setOn(true);
    }
    if (compTurn) {
     clearColor();
      setTimeout(() => {
        if (order[flash] === 1) one();
        if (order[flash] === 2) two();
        if (order[flash] === 3) three();
        if (order[flash] === 4) four();
        flash++;
      }, 200);
    }
  };

  const one = () => {
    if (noise) {
      let audio = document.getElementById("clip1");
      audio.play();
    }
    setNoise(true);
    topLeft.style.backgroundColor = "lightGreen";
  };

  const two = () => {
    if (noise) {
      let audio = document.getElementById("clip2");
      audio.play();
    }
    setNoise(true);
    topRight.style.backgroundColor = "tomato";
  };
  const three = () => {
    if (noise) {
      let audio = document.getElementById("clip3");
      audio.play();
    }
    setNoise(true);
    bottomLeft.style.backgroundColor = "yellow";
  };
  const four = () => {
    if (noise) {
      let audio = document.getElementById("clip4");
      audio.play();
    }
    setNoise(true);
    bottomRight.style.backgroundColor = "lightSkyBlue";
  };

  const clearColor = () =>{
    topLeft.backgroundColor = "darkGreen";
    topRight.backgroundColor = "darkRed";
    bottomLeft.backgroundColor = "goldenrod";
    bottomRight.backgroundColor = "darkblue";
  };

const topLeftBtn =  () => {
if(on){
    playerOrder.push(1);
    // check();
    one();
    if(!win){
        setTimeout(() => {
            clearColor();
        },300);
    }
}
};
const topRightBtn =  () => {};
const bottomLeftBtn =  () => {};
const bottomRightBtn =  () => {};

  return (
    <div>
      <UserContext.Provider value={{ strictMode, Power, strict, on, StartBtn, topLeftBtn,topRightBtn,bottomLeftBtn,bottomRightBtn }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}
