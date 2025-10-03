#!/usr/bin/env node
import { printHistogram, roll } from "./index";

const args = process.argv.slice(2);
const expr = args[0] || "1d20";
const trials = parseInt(args[1] || "0", 10);

if (trials > 0) {
  printHistogram(expr, trials);
} else {
  const result = roll(expr);
  console.log(JSON.stringify(result, null, 2));
}
