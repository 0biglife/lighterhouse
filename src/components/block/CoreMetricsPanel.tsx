import { LighthouseResponse } from "@/lib/types";
import { Info } from "lucide-react";

interface Props {
  data: LighthouseResponse;
}

// TODO 분리.. 또는 i18n 관리
const METRIC_INFO: Record<
  string,
  {
    label: string;
    unit: string;
    good: number;
    needsImprovement: number;
    description: string;
    suggestion: string;
  }
> = {
  "first-contentful-paint": {
    label: "First Contentful Paint",
    unit: "s",
    good: 1.8,
    needsImprovement: 3.0,
    description: "페이지에서 처음으로 텍스트나 이미지가 렌더링되는 시점입니다.",
    suggestion:
      "이미지 최적화, 폰트 지연 로딩 방지, 렌더 블로킹 자원 제거를 고려해보세요.",
  },
  "largest-contentful-paint": {
    label: "Largest Contentful Paint",
    unit: "s",
    good: 2.5,
    needsImprovement: 4.0,
    description:
      "사용자가 볼 수 있는 가장 큰 콘텐츠(ex: 이미지, 큰 텍스트 블록)가 표시되는 시점입니다.",
    suggestion:
      "이미지 압축, SSR 도입, 콘텐츠 우선 순위 지정이 성능 개선에 효과적입니다.",
  },
  "total-blocking-time": {
    label: "Total Blocking Time",
    unit: "ms",
    good: 200,
    needsImprovement: 600,
    description:
      "사용자 입력(클릭, 키보드 등)을 차단한 총 시간입니다. 응답성이 느린 원인이 됩니다.",
    suggestion:
      "불필요한 JavaScript 제거, 코드 스플리팅, 요청 병렬화 등을 고려하세요.",
  },
  "cumulative-layout-shift": {
    label: "Cumulative Layout Shift",
    unit: "",
    good: 0.1,
    needsImprovement: 0.25,
    description: "페이지 내 요소가 예기치 않게 움직인 비율입니다.",
    suggestion:
      "width/height 명시, 폰트 지연 로딩 방지, 광고나 iframe 위치 고정 등이 고려되어야합니다.",
  },
  "speed-index": {
    label: "Speed Index",
    unit: "s",
    good: 3.4,
    needsImprovement: 5.8,
    description: "페이지가 시각적으로 얼마나 빨리 채워지는지를 측정합니다.",
    suggestion: "리소스 경량화, LCP 최적화, 브라우저 캐시 활용이 권장됩니다.",
  },
};

export default function CoreMetricsPanel({ data }: Props) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-xl">
      {Object.entries(METRIC_INFO).map(([key, info]) => {
        const audit = data.audits[key];
        if (!audit || typeof audit.numericValue !== "number") return null;

        const value = audit.numericValue;
        const unit = info.unit;
        const numeric = value / (unit === "s" ? 1000 : 1);
        const display =
          unit === "ms"
            ? `${Math.round(value)} ms`
            : `${numeric.toFixed(1)} ${unit}`;

        return (
          <div
            key={key}
            className="flex flex-col bg-gray-100 dark:bg-[#18181b] p-4 rounded-lg shadow bg-neutral-900 cursor-default"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-300 font-medium">
                {info.label}
              </span>
              <div className="relative group">
                <Info className="w-4 h-4 text-slate-500 cursor-pointer" />
                <div
                  className="absolute z-10 hidden group-hover:block 
             bg-zinc-800 text-xs text-white p-2 
             rounded-md shadow w-[240px] right-0 top-6"
                >
                  <div className="flex flex-col px-2">
                    <p className="font-semibold mb-1 text-green-300">
                      {info.label}
                    </p>
                    <p className="mt-2 mb-1 leading-5">{info.description}</p>
                    <p className="mt-1 leading-5 text-slate-400">
                      {info.suggestion}
                    </p>
                    <p className="mt-2 text-xs text-green-400">
                      우수: ≤ {info.good}
                      {unit}    권장: ≤ {info.needsImprovement}
                      {unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[1px] mb-[3px] rounded overflow-visible mt-4">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, #22c55e ${(
                    (info.good / info.needsImprovement) *
                    100
                  ).toFixed(1)}%, #facc15 ${(
                    ((info.needsImprovement - info.good) /
                      info.needsImprovement) *
                    100
                  ).toFixed(1)}%)`,
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, white 5%, white 95%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, white 5%, white 95%, transparent 100%)",
                }}
              />

              <span
                className="absolute text-[10px] text-green-400 -top-4"
                style={{
                  left: `0%`,
                }}
              >
                우수
              </span>

              <span
                className="absolute text-[10px] text-yellow-300 -top-4 whitespace-nowrap"
                style={{
                  left: `${(info.good / info.needsImprovement) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                권장
              </span>
            </div>

            <div className="relative w-full h-[4px] rounded bg-neutral-700 overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"
                style={{
                  width: "100%",
                  maskImage: `linear-gradient(to right, white ${Math.min(
                    (numeric / info.needsImprovement) * 100,
                    100
                  )}%, transparent ${Math.min(
                    (numeric / info.needsImprovement) * 100 + 1,
                    100
                  )}%)`,
                  WebkitMaskImage: `linear-gradient(to right, white ${Math.min(
                    (numeric / info.needsImprovement) * 100,
                    100
                  )}%, transparent ${Math.min(
                    (numeric / info.needsImprovement) * 100 + 1,
                    100
                  )}%)`,
                }}
              />

              <div
                className="absolute top-0 bottom-0 border-l border-green-300"
                style={{
                  left: `${(info.good / info.needsImprovement) * 100}%`,
                }}
              />

              <div
                className="absolute top-0 bottom-0 border-l border-yellow-300"
                style={{ left: `100%` }}
              />
            </div>

            <span
              className={`mt-2 text-lg font-semibold ${
                numeric > info.needsImprovement ? "text-red-500" : "text-white"
              }`}
            >
              {display}
            </span>
          </div>
        );
      })}
    </div>
  );
}
