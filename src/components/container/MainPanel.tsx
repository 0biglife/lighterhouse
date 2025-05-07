"use client";

import { useLighthouseAudit } from "@/app/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnalyzingInput,
  AuditScoreTable,
  CoreMetricsPanel,
  OverviewChart,
  SkeletonCoreMetricsPanel,
  SkeletonOverviewChart,
} from "@/components";
import { analyzeAuditData } from "@/lib/lighthouse";
import { useEffect, useState } from "react";
// import sample from "../../../sample.json";

export default function MainPanel() {
  const [auditKey, setAuditKey] = useState<number>(0);
  const audit = useLighthouseAudit(auditKey);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [activeTab, setActiveTab] = useState<"critical" | "general">(
    "critical"
  );

  // Animation Duration 때문에 300ms 후에 Skeleton을 보여줌
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (audit.isPending) {
      timer = setTimeout(() => setShowSkeleton(true), 800);
      document.body.style.overflow = "hidden";
    } else {
      setShowSkeleton(false);
      document.body.style.overflow = "";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [audit.isPending]);

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
      <AnalyzingInput audit={audit} onReset={() => setAuditKey((k) => k + 1)} />

      <AnimatePresence mode="wait">
        {showSkeleton && (
          <motion.div
            key="skeleton-ui"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mt-8 space-y-4"
          >
            <SkeletonOverviewChart />
            <SkeletonCoreMetricsPanel />
          </motion.div>
        )}
      </AnimatePresence>

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
