"use client";

import Skeleton from "react-loading-skeleton";

export default function SkeletonCoreMetricsPanel() {
  const METRIC_COUNT = 5;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 shadow-xl">
      {Array.from({ length: METRIC_COUNT }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-gray-100 dark:bg-[#18181b] p-4 rounded-lg shadow bg-neutral-900"
        >
          <div className="flex items-center justify-between mb-1">
            <Skeleton
              height={16}
              width="66%"
              borderRadius={4}
              baseColor="#1f2937"
              highlightColor="#374151"
            />
            <Skeleton
              circle
              height={16}
              width={16}
              baseColor="#1f2937"
              highlightColor="#374151"
            />
          </div>

          <Skeleton
            height={1}
            width="100%"
            className="my-0"
            baseColor="#1f2937"
            highlightColor="#374151"
          />

          <Skeleton
            height={8}
            width="100%"
            borderRadius={4}
            baseColor="#1f2937"
            highlightColor="#374151"
          />

          <Skeleton
            height={20}
            width="33%"
            borderRadius={4}
            className="mt-2"
            baseColor="#1f2937"
            highlightColor="#374151"
          />
        </div>
      ))}
    </div>
  );
}
