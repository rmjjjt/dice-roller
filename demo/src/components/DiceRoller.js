"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiceRoller;
var react_1 = require("react");
// @ts-ignore
// const { roll, simulate } =require("@rmjjjt/dice-roller");
var roll = function (a) { };
var simulate = function (a, b) { return a + b; };
function DiceRoller() {
    var _a = (0, react_1.useState)("4d6dl1"), expr = _a[0], setExpr = _a[1];
    var _b = (0, react_1.useState)(null), result = _b[0], setResult = _b[1];
    var _c = (0, react_1.useState)(null), dist = _c[0], setDist = _c[1];
    var handleRoll = function () {
        setResult(roll(expr));
        setDist(null);
    };
    var handleSimulate = function () {
        setDist(simulate(expr, 5000));
        setResult(null);
    };
    return (<div>
      <input type="text" value={expr} onChange={function (e) { return setExpr(e.target.value); }} style={{ fontSize: "1rem", padding: "0.25rem", width: "200px" }}/>
      <button onClick={handleRoll} style={{ marginLeft: "0.5rem" }}>
        Roll
      </button>
      <button onClick={handleSimulate} style={{ marginLeft: "0.5rem" }}>
        Simulate
      </button>

      {result && (<pre style={{ marginTop: "1rem" }}>
          {JSON.stringify(result, null, 2)}
        </pre>)}

      {dist && (<div style={{ marginTop: "1rem" }}>
          <h3>Simulation (5000 trials)</h3>
          <ul>
            {Object.entries(dist)
                .sort(function (a, b) { return parseInt(a[0]) - parseInt(b[0]); })
                .map(function (_a) {
                var val = _a[0], prob = _a[1];
                return (<li key={val}>
                  {val}: {(prob * 100).toFixed(2)}%
                </li>);
            })}
          </ul>
        </div>)}
    </div>);
}
