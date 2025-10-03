import {DiceExpression} from './types'

export function parseDice(expr: string): DiceExpression {
  const clean = expr.toLowerCase().trim();

  // Advantage/disadvantage shorthand
  if (clean === "adv") return { count: 2, sides: 20, keepHighest: 1 };
  if (clean === "dis") return { count: 2, sides: 20, keepLowest: 1 };

  // Regex for NdM with modifiers
  const match = clean.match(
    /(\d*)d(\d+)(!?)(kh\d+|kl\d+|dh\d+|dl\d+)?([+-]\d+)?/
  );
  if (!match) throw new Error(`Invalid expression: ${expr}`);

  const [, countStr, sidesStr, explode, modRule, modNum] = match;
  const count = countStr ? parseInt(countStr, 10) : 1;
  const sides = parseInt(sidesStr, 10);

  const result: DiceExpression = { count, sides };

  // Exploding dice
  if (explode === "!") result.exploding = true;

  // Drop/keep
  if (modRule) {
    const type = modRule.slice(0, 2);
    const num = parseInt(modRule.slice(2), 10);
    if (type === "dl") result.dropLowest = num;
    if (type === "dh") result.dropHighest = num;
    if (type === "kh") result.keepHighest = num;
    if (type === "kl") result.keepLowest = num;
  }

  // Modifier
  if (modNum) result.modifier = parseInt(modNum, 10);

  return result;
}
