import React from 'react';
import { DiceRoller } from "./components/DiceRoller";

export default function App() {
  return (
    <div style={{ fontFamily: "monospace", padding: "1rem" }}>
      <h1>🎲 Dice Roller Demo</h1>
      <p>Powered by <a href="https://github.com/rmjjjt/dice-roller" target="_blank"><code>dice-roller</code></a></p>
      <DiceRoller />
    </div>
  );
}
