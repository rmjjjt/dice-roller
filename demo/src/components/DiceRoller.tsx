import { useState, useEffect, useRef } from "react";
import { roll, simulate, expectedValue } from "@rmjjjt/dice-roller";

export const DiceRoller = () => {
  const [expression, setExpression] = useState("2d6");
  const [simulations, setSimulations] = useState(100);
  const [results, setResults] = useState<number[]>([]);
  const [histogram, setHistogram] = useState<Map<number, number>>(new Map());
  const [showFull, setShowFull] = useState(false);
  const [barWidth, setBarWidth] = useState(12);

  const topN = 5;
  const containerHeight = 200; // px
  const topPadding = 30; // px padding at top
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = ["1d20", "2d6", "2d6+3", "3d8", "1d100"];

  // Get roll value
  const getRollValue = (expr: string): number => {
    const res = roll(expr) as any;
    if (typeof res === "number") return res;
    if (res && typeof res.total === "number") return res.total;
    return 0;
  };

  const handleRoll = () => {
    const value = getRollValue(expression);
    setResults([value]);
    setHistogram(new Map([[value, 1]]));
    setShowFull(false);
  };

  const handleSimulate = () => {
    const simResults: number[] = [];
    const hist = new Map<number, number>();
    for (let i = 0; i < simulations; i++) {
      const val = getRollValue(expression);
      simResults.push(val);
      hist.set(val, (hist.get(val) || 0) + 1);
    }
    setResults(simResults);
    setHistogram(hist);
    setShowFull(false);
  };

  const maxCount = Math.max(...Array.from(histogram.values()), 1);

  const topOutcomes = [...histogram.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([val, count]) => ({
      val,
      count,
      percentage: ((count / simulations) * 100).toFixed(2),
    }));

  // Adjust bar width based on container and number of bars
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth - 16; // padding
    const numBars = histogram.size || 1;
    const calculatedWidth = Math.max(6, Math.min(24, containerWidth / numBars - 2)); // 2px gap
    setBarWidth(calculatedWidth);
  }, [histogram]);

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "100%", overflowX: "hidden" }}>
      <h2>Dice Roller</h2>
      <p>Use these suggestions, or try some of your own (&lt;numberOfDiceToRoll&gt;d&lt;numberOfSidesOnDice&gt;)!</p>
      {/* Suggestions */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setExpression(s)}
            style={{ padding: "4px 8px", cursor: "pointer" }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Dice expression e.g. 2d6"
          style={{ padding: "4px", width: "120px" }}
        />
        <input
          type="number"
          min={1}
          value={simulations}
          onChange={(e) => setSimulations(Number(e.target.value))}
          placeholder="Simulations"
          style={{ padding: "4px", width: "80px" }}
        />
        <button onClick={handleRoll} style={{ padding: "4px 8px" }}>Roll</button>
        <button onClick={handleSimulate} style={{ padding: "4px 8px" }}>Simulate</button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <strong>Results:</strong>{" "}
          {showFull ? results.join(", ") : results.slice(0, 20).join(", ")}
          {results.length > 20 && (
            <>
              {!showFull && `, ... (${results.length} total) `}
              <button
                onClick={() => setShowFull(!showFull)}
                style={{ marginLeft: "8px", textDecoration: "underline", cursor: "pointer" }}
              >
                {showFull ? "Hide" : "Show all"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Histogram */}
      {histogram.size > 0 && (
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {/* Bars */}
          <div
            ref={containerRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: `${containerHeight}px`,
              border: "1px solid #ccc",
              padding: "8px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              flex: 1
            }}
          >
            {[...histogram.entries()].sort((a,b)=>a[0]-b[0]).map(([val,count])=>{
              const barHeight = Math.max((count / maxCount) * (containerHeight - topPadding), 4);
              const percentage = ((count / simulations) * 100).toFixed(1);
              const blueIntensity = 100 + Math.round((count / maxCount) * 155);
              const color = `rgb(59,130,${blueIntensity})`;

              return (
                <div
                  key={val}
                  style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <span style={{ fontSize: "10px", marginBottom: "2px" }}>{percentage}%</span>
                  <div
                    style={{ width: `${barWidth}px`, height: `${barHeight}px`, backgroundColor: color }}
                    title={`${val}: ${count} times (${percentage}%)`} // tooltip added
                  />
                  <span style={{ fontSize: "12px", marginTop: "2px" }}>{val}</span>
                </div>
              )
            })}
          </div>

          {/* Top-N */}
          <div style={{ flex: 1 }}>
            <strong>Top {topN} outcomes:</strong>
            <ul>
              {topOutcomes.map((o) => (
                <li key={o.val}>
                  {o.val}: {o.count} times ({o.percentage}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
