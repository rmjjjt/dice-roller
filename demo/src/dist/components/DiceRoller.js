"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiceRoller;
const react_1 = __importStar(require("react"));
// @ts-ignore
// const { roll, simulate } =require("@rmjjjt/dice-roller");
const roll = (a) => { };
const simulate = (a, b) => a + b;
function DiceRoller() {
    const [expr, setExpr] = (0, react_1.useState)("4d6dl1");
    const [result, setResult] = (0, react_1.useState)(null);
    const [dist, setDist] = (0, react_1.useState)(null);
    const handleRoll = () => {
        setResult(roll(expr));
        setDist(null);
    };
    const handleSimulate = () => {
        setDist(simulate(expr, 5000));
        setResult(null);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { type: "text", value: expr, onChange: (e) => setExpr(e.target.value), style: { fontSize: "1rem", padding: "0.25rem", width: "200px" } }),
        react_1.default.createElement("button", { onClick: handleRoll, style: { marginLeft: "0.5rem" } }, "Roll"),
        react_1.default.createElement("button", { onClick: handleSimulate, style: { marginLeft: "0.5rem" } }, "Simulate"),
        result && (react_1.default.createElement("pre", { style: { marginTop: "1rem" } }, JSON.stringify(result, null, 2))),
        dist && (react_1.default.createElement("div", { style: { marginTop: "1rem" } },
            react_1.default.createElement("h3", null, "Simulation (5000 trials)"),
            react_1.default.createElement("ul", null, Object.entries(dist)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                .map(([val, prob]) => (react_1.default.createElement("li", { key: val },
                val,
                ": ",
                (prob * 100).toFixed(2),
                "%"))))))));
}
