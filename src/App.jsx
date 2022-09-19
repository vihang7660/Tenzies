import React from "react";
import Die from "./Die";

function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const [diceNum, setDiceNum] = React.useState(allNewDice());

  let die = diceNum.map((num, index) => {
    return <Die value={num} key={index} />;
  });

  function roll() {
    setDiceNum(allNewDice())
  }

  return (
    <main>
      <div className="box">
        <div className="dice-container">{die}</div>
        <button className="roll-dice" onClick={roll}>Roll</button>
      </div>
    </main>
  );
}

export default App;
