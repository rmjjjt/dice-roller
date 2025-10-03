import {RollResult} from './types'
import {parseDice} from './parser'

function rollSingle(sides: number, exploding = false): number[] {
  const rolls: number[] = [];
  let value = Math.floor(Math.random() * sides) + 1;
  rolls.push(value);

  // Explode on max roll
  while (exploding && value === sides) {
    value = Math.floor(Math.random() * sides) + 1;
    rolls.push(value);
  }

  return rolls;
}

export function roll(expr: string): RollResult {
  const parsed = parseDice(expr);

  // Roll dice
  let rolls: number[] = [];
  for (let i = 0; i < parsed.count; i++) {
    rolls.push(...rollSingle(parsed.sides, parsed.exploding));
  }

  let kept = [...rolls];

  // Drop/keep rules
  if (parsed.dropLowest)
    kept = kept.sort((a, b) => a - b).slice(parsed.dropLowest);
  if (parsed.dropHighest)
    kept = kept.sort((a, b) => b - a).slice(parsed.dropHighest);
  if (parsed.keepLowest)
    kept = kept.sort((a, b) => a - b).slice(0, parsed.keepLowest);
  if (parsed.keepHighest)
    kept = kept.sort((a, b) => b - a).slice(0, parsed.keepHighest);

  // Total
  let total = kept.reduce((a, b) => a + b, 0);
  if (parsed.modifier) total += parsed.modifier;

  return {
    expression: expr,
    rolls,
    kept,
    total,
  };
}

export function simulate(expr: string, trials = 10000): Record<number, number> {
  const results: Record<number, number> = {};

  for (let i = 0; i < trials; i++) {
    const { total } = roll(expr);
    results[total] = (results[total] || 0) + 1;
  }

  // Normalize to probabilities
  const probabilities: Record<number, number> = {};
  for (const [key, value] of Object.entries(results)) {
    probabilities[+key] = value / trials;
  }

  return probabilities;
}

export function expectedValue(expr: string, trials = 10000): number {
  const probs = simulate(expr, trials);
  return Object.entries(probs).reduce(
    (sum, [val, p]) => sum + parseInt(val, 10) * p,
    0
  );
}
