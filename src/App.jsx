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

  let [tenzies, setTenzies] = React.useState(false);

  const [diceNum, setDiceNum] = React.useState(allNewDice());

  React.useEffect(() => {
    let heldDies = diceNum.filter((item) => {
      if (item.isHeld === true) {
        return item;
      }
    });

    function sameNums() {
      let someArr = diceNum.map((item) => item.value);
      for (let i = 0; i < someArr.length; i++) {
        if (someArr[0] === someArr[i]) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }
    if (heldDies.length === 10 && sameNums()) {
      setTenzies(true);
      console.log("won");
    }
  }, [diceNum]);

  /* React.useEffect(() => {
  if (tenzies === true) {
    setTenzies(false)
    setDiceNum(allNewDice())
  }
}, [tenzies]) */

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
    if (tenzies === false) {
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
    } else {
      setTenzies(false)
      setDiceNum(allNewDice())
    }
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
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
