# 🎲 **dice-roller** ⚔️🛡️

🎲 **D20 Ready** | ⚔️ **Combat Friendly** | 🛡️ **RPG Toolkit**

**Roll dice like a pro for Dungeons & Dragons & tabletop RPGs!**  
Supports **standard dice notation**, **advantage/disadvantage**, **exploding dice**, **drop/keep rules**, and **probability simulations** with ASCII histograms.

[![npm](https://img.shields.io/npm/v/@rmjjjt/dice-roller?color=brightgreen&label=npm)](https://www.npmjs.com/package/@rmjjjt/dice-roller)
[![Build Status](https://img.shields.io/github/actions/workflow/status/rmjjjt/dice-roller/ci.yml?label=build&logo=github&color=blue)](https://github.com/rmjjt/dice-roller/actions/workflows/ci.yml)

[![GitHub Pages](https://img.shields.io/badge/demo-live-blue?style=for-the-badge)](https://rmjjjt.github.io/dice-roller/)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE.md)
---
# 🎯 Features
✅ Works as both a **Node.js library** and a **CLI tool**.

---

## 📦 Installation

Install via **npm**:

```bash
npm install dice-roller

```

Or use directly with npx (no install needed):

```bash
npx @rmjjjt/dice-roller "2d20kh1+5" 20000
```

---

# 🚀 Usage

## Library Usage

```ts
import { roll, simulate, expectedValue } from "dice-roller";

// Single roll
const singleRoll = roll("4d6dl1+2");
console.log(singleRoll);

// Probability distribution
const distribution = simulate("2d20kh1+5", 10000);
console.log(distribution);

// Expected value
const avg = expectedValue("1d6!+3");
console.log(avg);
```

---

## CLI Usage

```bash
# Single roll
roll "1d20+5"

# Probability histogram (20,000 trials)
roll "4d6dl1" 20000
```

---

# 📝 Supported Syntax
* Basic rolls: d20, 3d6+2, 2d10-1 
* Drop/Keep rules:
  * dl1 → drop lowest 1 die 
  * dh1 → drop highest 1 die 
  * kh1 → keep highest 1 die (advantage)
  * kl1 → keep lowest 1 die (disadvantage)
* Exploding dice: 1d6! (reroll on max and add to total)
* Shorthand:
  * adv → advantage (2d20 keep highest 1)
  * dis → disadvantage (2d20 keep lowest 1)

---

# 🔮 Roadmap

- [ ]  Support reroll rules (r1)
- [ ]  Success/failure counting (10d6>=5)
- [ ]  Additional dice systems (Fate dice, etc.)
- [ ]  Export to WASM for browser and serverless use

---

# 🤝 Contributing

Contributions are welcome! 🎉
* Fork the repository & submit a PR 
* Add new dice rules or operators via extensions 
* Improve tests and documentation

---

# 📜 License
This project is licensed under the MIT License — free to use, modify, and share.

---

# 🌐 Live Demo

Try the dice roller in your browser:
https://rmjjjt.github.io/dice-roller/

