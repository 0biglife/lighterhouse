"use client";

import { useLighthouseAudit } from "@/app/hooks";
import {
  AnalyzingInput,
  CategoryScoreChart,
  ImprovementsPanel,
} from "@/components";
import sample from "../../../sample.json";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ANALYZING } from "@/app/constants";
import { useEffect, useState } from "react";

export default function MainPanel() {
  const audit = useLighthouseAudit();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (audit?.isPending) timer = setTimeout(() => setShowLoading(true), 1000);
    else setShowLoading(false);
    return () => clearTimeout(timer);
  }, [audit?.isPending]);

  return (
    <main className="flex flex-col w-full h-full justify-center items-center mb-[44px]">
      <AnalyzingInput audit={audit} />

      {showLoading && (
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-500 animate-pulse font-medium">
            {ANALYZING}
          </p>
          <AiOutlineLoading3Quarters className="mx-auto h-5 w-5 text-gray-400 animate-spin" />
        </div>
      )}
      {showLoading && (
        <>
          <CategoryScoreChart result={sample} />
          <ImprovementsPanel audits={sample.audits} />
        </>
      )}
    </main>
  );
}
