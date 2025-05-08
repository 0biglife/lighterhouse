"use client";

import { useLighthouseAudit } from "@/app/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnalyzingInput,
  AuditPanel,
  CoreMetricsPanel,
  OverviewChart,
  SkeletonCoreMetricsPanel,
  SkeletonOverviewChart,
} from "@/components";
import { useEffect, useState } from "react";
// import sample from "../../../sample.json";

export default function MainPanel() {
  const [auditKey, setAuditKey] = useState<number>(0);
  const audit = useLighthouseAudit(auditKey, () => {
    setIsSubmitted(false);
  });
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleResetInput = () => {
    setAuditKey((k) => k + 1);
    setIsSubmitted(false);
  };

  return (
    <main className="flex flex-col w-full h-full justify-center items-center mb-[88px] px-5">
      <AnalyzingInput
        audit={audit}
        isSubmitted={isSubmitted}
        onReset={handleResetInput}
        setIsSubmitted={setIsSubmitted}
      />

      <AnimatePresence mode="wait">
        {showSkeleton && (
          <motion.div
            key="skeleton-ui"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mt-0 space-y-4"
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
          <AuditPanel data={audit.data} />
        </div>
      )}
    </main>
  );
}
