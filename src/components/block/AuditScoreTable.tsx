"use client";

import { useState } from "react";
import AuditDetailModal from "./AuditDetailModal";
import { AuditSummaryItem } from "@/lib/types";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
              <h3 className="font-semibold text-base z-index-10">
                {item.title}
              </h3>
              {item.estimatedScoreGain > 0 && (
                <>
                  <div
                    id={`tip-anchor-${item.id}`}
                    className="text-xs text-green-600"
                  >
                    <span className="font-bold text-green-500 mr-1">
                      +{item.estimatedScoreGain}
                    </span>
                    pts score weight
                  </div>
                  <Tooltip
                    anchorId={`tip-anchor-${item.id}`}
                    place="top-end"
                    content="This score reflects the relative contribution to performance."
                  />
                </>
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
