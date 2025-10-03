import {simulate} from './roller'

export function printHistogram(
  expr: string,
  trials = 10000,
  width = 50
): void {
  const probs = simulate(expr, trials);

  // Sort keys numerically
  const keys = Object.keys(probs)
    .map((k) => parseInt(k, 10))
    .sort((a, b) => a - b);

  const maxProb = Math.max(...keys.map((k) => probs[k]));

  for (const k of keys) {
    const prob = probs[k];
    const barLen = Math.round((prob / maxProb) * width);
    const bar = "█".repeat(barLen);
    console.log(`${k.toString().padStart(3)} | ${bar} ${(
      prob * 100
    ).toFixed(2)}%`);
  }
}

