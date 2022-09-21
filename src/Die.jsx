import React from "react";

export default function Die(props) {
  let dieColor = props.isHeld
    ? { backgroundColor: "#59E391" }
    : { backgroundColor: "#FFFFFF" };
  return (
    <div className="die" style={dieColor} onClick={props.holdDice}>
      {props.value}
    </div>
  );
}
