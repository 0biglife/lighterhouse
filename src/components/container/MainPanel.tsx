"use client";

import { useLighthouseAudit } from "@/app/hooks";
import {
  AnalyzingInput,
  CategoryScoreChart,
  ImprovementsPanel,
} from "@/components";

export default function MainPanel() {
  const { data, isPending, isSuccess } = useLighthouseAudit();

  return (
    <main className="w-full">
      <div className="max-w-xl mx-auto py-10 px-4 flex flex-col space-y-4 mb-[120px]">
        <AnalyzingInput />
      </div>

      {isPending && (
        <p className="mt-8 text-center text-gray-500 animate-pulse">
          분석 중입니다... 잠시만 기다려 주세요.
        </p>
      )}

      {isSuccess && data && (
        <div className="mt-10 space-y-6 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-bold">{data.finalUrl}</h2>
            <p className="text-sm text-gray-500">
              측정 시간: {new Date(data.fetchTime).toLocaleString()}
            </p>
          </div>

          <CategoryScoreChart result={data} />
          <ImprovementsPanel audits={data.audits} />
        </div>
      )}
    </main>
  );
}
