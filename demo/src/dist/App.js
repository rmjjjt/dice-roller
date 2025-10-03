"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = __importDefault(require("react"));
const DiceRoller_1 = __importDefault(require("./components/DiceRoller"));
function App() {
    return (react_1.default.createElement("div", { style: { fontFamily: "monospace", padding: "1rem" } },
        react_1.default.createElement("h1", null, "\uD83C\uDFB2 Dice Roller Demo"),
        react_1.default.createElement("p", null,
            "Powered by ",
            react_1.default.createElement("code", null, "dice-roller")),
        react_1.default.createElement(DiceRoller_1.default, null)));
}
