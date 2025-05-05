"use client";

import { useLighthouseAudit } from "@/app/hooks";
import { AnalyzingInput, CustomRadarChart } from "@/components";

export default function MainPanel() {
  const audit = useLighthouseAudit();
  // const audit = sample;

  return (
    <main className="flex flex-col w-full h-full justify-center items-center mb-[88px]">
      <AnalyzingInput audit={audit} />

      {audit?.isSuccess && audit.data && (
        <div className="w-full max-w-4xl mt-8 space-y-8">
          <CustomRadarChart data={audit?.data} isLoading={audit?.isPending} />
          {/* <MetricScoreTable data={audit} /> */}
          {/* <ImprovementSuggestions data={audit} /> */}
        </div>
      )}
    </main>
  );
}
