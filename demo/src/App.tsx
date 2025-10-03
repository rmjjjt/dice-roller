import React from 'react';
import DiceRoller from "./components/DiceRoller";

export default function App() {
  return (
    <div style={{ fontFamily: "monospace", padding: "1rem" }}>
      <h1>🎲 Dice Roller Demo</h1>
      <p>Powered by <code>dice-roller</code></p>
      <DiceRoller />
    </div>
  );
}
