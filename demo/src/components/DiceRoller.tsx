import React, { useState } from "react";
// @ts-ignore
// const { roll, simulate } =require("@rmjjjt/dice-roller");
const roll = (a) => {}
const simulate = (a: any, b: any) => a+b

export default function DiceRoller() {
  const [expr, setExpr] = useState("4d6dl1");
  const [result, setResult] = useState<any>(null);
  const [dist, setDist] = useState<Record<number, number> | null>(null);

  const handleRoll = () => {
    setResult(roll(expr));
    setDist(null);
  };

  const handleSimulate = () => {
    setDist(simulate(expr, 5000));
    setResult(null);
  };

  return (
    <div>
      <input
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        style={{ fontSize: "1rem", padding: "0.25rem", width: "200px" }}
      />
      <button onClick={handleRoll} style={{ marginLeft: "0.5rem" }}>
        Roll
      </button>
      <button onClick={handleSimulate} style={{ marginLeft: "0.5rem" }}>
        Simulate
      </button>

      {result && (
        <pre style={{ marginTop: "1rem" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {dist && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Simulation (5000 trials)</h3>
          <ul>
            {Object.entries(dist)
              .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
              .map(([val, prob]) => (
                <li key={val}>
                  {val}: {(prob * 100).toFixed(2)}%
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
