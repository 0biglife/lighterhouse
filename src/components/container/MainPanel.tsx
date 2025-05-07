"use client";

import { useLighthouseAudit } from "@/app/hooks";
import {
  AnalyzingInput,
  AuditScoreTable,
  CoreMetricsPanel,
  OverviewChart,
  SkeletonCoreMetricsPanel,
  SkeletonOverviewChart,
} from "@/components";
import { analyzeAuditData } from "@/lib/lighthouse";
import { useState } from "react";
// import sample from "../../../sample.json";

export default function MainPanel() {
  const audit = useLighthouseAudit();
  // const audit = sample;
  const [activeTab, setActiveTab] = useState<"critical" | "general">(
    "critical"
  );

  const renderTab = () => {
    if (!audit.data) return null;

    const { critical, general } = analyzeAuditData(audit.data);

    const audits = activeTab === "critical" ? critical : general;

    return (
      <div className="w-full space-y-6">
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("critical")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "critical"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-white"
              }`}
            >
              🚨 반드시 해결해야 할 이슈 ({critical.length})
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "general"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-white"
              }`}
            >
              ✅ 일반적인 개선사항 ({general.length})
            </button>
          </div>
        </div>

        <AuditScoreTable audits={audits} />
      </div>
    );
  };

  return (
    <main className="flex flex-col w-full h-full justify-center items-center mb-[88px] px-5">
      <AnalyzingInput audit={audit} />

      {audit.isPending && (
        <>
          <SkeletonOverviewChart />
          <SkeletonCoreMetricsPanel />
        </>
      )}

      {audit.isSuccess && audit.data && (
        <div className="w-full max-w-4xl mt-8 space-y-4">
          <OverviewChart data={audit.data} isLoading={audit.isPending} />

          <CoreMetricsPanel data={audit.data} />

          {renderTab()}
        </div>
      )}
    </main>
  );
}
