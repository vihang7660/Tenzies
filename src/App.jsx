import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let dieInfo = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
      newDice.push(dieInfo);
    }
    return newDice;
  }

  const [diceNum, setDiceNum] = React.useState(allNewDice());

  function holdDice(id) {
    setDiceNum((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item
      );
    });
  }

  let die = diceNum.map((item) => {
    return (
      <Die
        value={item.value}
        isHeld={item.isHeld}
        key={item.id}
        holdDice={() => holdDice(item.id)}
      />
    );
  });

  function roll() {
    setDiceNum((prevState) => {
      return prevState.map((item) =>
        item.isHeld
          ? item
          : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            }
      );
    });
  }

  return (
    <main>
      <div className="box">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{die}</div>
        <button className="roll-dice" onClick={roll}>
          Roll
        </button>
      </div>
    </main>
  );
}

export default App;
