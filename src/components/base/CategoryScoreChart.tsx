"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AnalyzedForm } from "@/lib/types";
import { Doughnut } from "react-chartjs-2";

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

  const data = {
    labels,
    datasets: [
      {
        data: scores,
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
        borderColor: "transparent",
      },
    ],
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Doughnut data={data} />
    </div>
  );
}
export default CategoryScoreChart;
