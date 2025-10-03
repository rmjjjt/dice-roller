export interface DiceExpression {
  count: number;
  sides: number;
  dropLowest?: number;
  dropHighest?: number;
  keepLowest?: number;
  keepHighest?: number;
  modifier?: number;
  exploding?: boolean;
  advantage?: boolean;
  disadvantage?: boolean;
}


// Result of a single dice expression evaluation
export interface RollResult {
  expression: string;      // Original input (e.g. "4d6dl1+2")
  rolls: number[];         // All raw rolls
  kept: number[];          // Rolls after applying modifiers (drop/keep)
  total: number;           // Final sum after modifiers
}
