"use client";

import { AnalyzedForm } from "@/lib/types";

function ImprovementsPanel({ audits }: { audits: AnalyzedForm["audits"] }) {
  const failed = Object.entries(audits)
    .filter(([, audit]) => audit.score !== null && audit.score < 1)
    .slice(0, 10);

  return (
    <div className="mt-6 space-y-2">
      <h3 className="text-lg font-bold">개선이 필요한 항목</h3>
      {failed.map(([id, audit]) => (
        <div key={id} className="border rounded p-3">
          <p className="font-semibold">{audit.title}</p>
          <p className="text-sm text-gray-600">{audit.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ImprovementsPanel;
