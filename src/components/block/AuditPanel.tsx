"use client";

import { useState } from "react";
import { analyzeAuditData } from "@/lib/lighthouse";
import { LighthouseResponse } from "@/lib/types";
import { AuditScoreTable } from "@/components";
import { AUDIT_FIRST_TAB_TITLE, AUDIT_SECOND_TAB_TITLE } from "@/app/constants";

interface Props {
  data: LighthouseResponse;
}

export default function AuditPanel({ data }: Props) {
  const [activeTab, setActiveTab] = useState<"critical" | "general">(
    "critical"
  );

  const { critical, general } = analyzeAuditData(data);
  const audits = activeTab === "critical" ? critical : general;

  return (
    <div className="w-full space-y-6 mt-4">
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("critical")}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === "critical"
                ? "bg-red-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {AUDIT_FIRST_TAB_TITLE + ` (${critical.length})`}
          </button>

          <button
            onClick={() => setActiveTab("general")}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === "general"
                ? "bg-sky-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {AUDIT_SECOND_TAB_TITLE + ` (${general.length})`}
          </button>
        </div>
      </div>
      <AuditScoreTable audits={audits} />
    </div>
  );
}
