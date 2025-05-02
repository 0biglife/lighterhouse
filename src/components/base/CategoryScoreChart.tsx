"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AnalyzedForm } from "@/lib/types";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryScoreChart({ result }: { result: AnalyzedForm }) {
  const labels = Object.keys(result.categories);
  const scores = labels.map(
    (key) =>
      Math.round(
        (result.categories[key as keyof typeof result.categories]?.score ?? 0) *
          100
      ) || 0
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="text-sm font-semibold w-[120px]">
              {label.toUpperCase()}
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-2 rounded bg-blue-500"
                style={{ width: `${scores[i]}%` }}
              />
            </div>
            <div className="w-12 text-right text-sm font-bold">
              {scores[i]}%
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
export default CategoryScoreChart;
