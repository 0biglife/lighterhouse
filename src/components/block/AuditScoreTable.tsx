"use client";

import { useState } from "react";
import AuditDetailModal from "./AuditDetailModal";
import { AuditSummaryItem } from "@/lib/types";

export default function AuditScoreTable({
  audits,
}: {
  audits: AuditSummaryItem[];
}) {
  const [selected, setSelected] = useState<AuditSummaryItem | null>(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        {audits.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="bg-gray-100 dark:bg-[#18181b] cursor-pointer hober:bg-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base">{item.title}</h3>
              {item.estimatedScoreGain > 0 && (
                <span className="text-xs text-green-600">
                  <span className="text-xs font-bold text-green-500 mr-1">
                    +{item.estimatedScoreGain}
                  </span>
                  pts expected improvement
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <AuditDetailModal
          audit={selected}
          isOpen={true}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
