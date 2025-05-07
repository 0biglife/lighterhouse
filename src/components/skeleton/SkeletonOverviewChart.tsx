import { ANALYSIS_OVERVIEW_TITLE } from "@/app/constants";
import { BROWSER_METRICS } from "@/lib/types";
import Skeleton from "react-loading-skeleton";

export default function SkeletonOverviewChart() {
  return (
    <div className="w-full bg-gray-100 dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl mt-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h3 className="text-slate-600 text-lg font-semibold">
          {ANALYSIS_OVERVIEW_TITLE}
        </h3>
      </div>
      <div className="w-full h-[200px] flex flex-col justify-around">
        {BROWSER_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 w-full max-w-[85%] mx-auto"
          >
            <span className="text-[14px] text-slate-600 w-[94px] text-right">
              {metric.label}
            </span>
            <div className="flex-1">
              <Skeleton
                height={16}
                borderRadius={12}
                baseColor="#1f2937"
                highlightColor="#374151"
                style={{ willChange: "transform" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
