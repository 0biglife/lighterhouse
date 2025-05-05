"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { AnalyzedForm } from "@/lib/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  data: AnalyzedForm;
  isLoading?: boolean;
}

const METRICS = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function GradientHorizontalBarChart(props: Props) {
  const { data } = props;
  const isLoading = props.isLoading || !data;

  const chartData = METRICS.map((m) => ({
    name: m.label,
    value:
      (data?.categories[m.key as keyof typeof data.categories]?.score ?? 0) *
      100,
  }));

  const [animatedValues, setAnimatedValues] = useState<number[]>(
    chartData.map(() => 0)
  );

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      setAnimatedValues(chartData.map((d) => Math.round(d.value * eased)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [data]);

  const gradients = [
    ["#fcd34d", "#f87171"],
    ["#fb7185", "#f472b6"],
    ["#818cf8", "#60a5fa"],
    ["#a78bfa", "#c084fc"],
  ];

  const option = {
    grid: {
      left: "10%",
      right: "10%",
      top: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: chartData.map((d) => d.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: "#cbd5e1",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const idx = params.dataIndex;
        const label = params.name;
        const score = animatedValues[idx].toFixed(0);

        return `<div style="
          background: #1e293b;
          color: #f1f5f9;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.5;">
          <div><strong>${label} Score:</strong> ${score}</div>
          <div style="margin-top: 2px; opacity: 0.6;">Click to see more.</div>
        </div>`;
      },
      backgroundColor: "#1e293b",
      borderWidth: 0,
      extraCssText: "pointer-events: none;",
    },
    series: [
      {
        type: "bar",
        data: animatedValues.map((v, idx) => ({
          value: v,
          itemStyle: {
            borderRadius: 12,
            color: isLoading
              ? "rgba(255, 255, 255, 0.1)"
              : {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: gradients[idx][0] },
                    { offset: 1, color: gradients[idx][1] },
                  ],
                },
            shadowColor: "#1e293b",
            shadowBlur: 10,
          },
        })),
        barWidth: "40%",
        z: 2,
        label: {
          show: isLoading,
          position: "right",
          formatter: ({ dataIndex }: any) =>
            `${animatedValues[dataIndex].toFixed(0)}`,
          color: "rgba(241, 245, 249, 0.5)",
          fontSize: 12,
          fontWeight: 600,
          offset: [2, 2],
        },
      },
      {
        type: "bar",
        data: chartData.map(() => 100),
        barWidth: "40%",
        barGap: "-100%",
        itemStyle: {
          color: "rgba(255, 255, 255, 0.06)",
          borderRadius: 12,
        },
        z: 1,
        animation: false,
      },
    ],
    animation: false,
  };

  return (
    <div className="w-full bg-gray dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl">
      <h3 className="text-slate-200 text-lg font-semibold mt-2 mb-2 text-center">
        Browser Analysis Overview
      </h3>
      {isLoading ? (
        <div className="w-full h-[200px] flex flex-col justify-around">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="items-center gap-4 w-full max-w-[70%] mx-auto"
            >
              <span className="text-[14px] text-slate-400">
                {metric.label}
              </span>
              <Skeleton
                height={15}
                width="100%"
                borderRadius={12}
                baseColor="#3b3f46"
                highlightColor="#6b7280"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[200px]">
          <ReactECharts
            option={option}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
