"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLighthouseAudit, useToast } from "@/app/hooks";
import { LANDING_PAGE_SUBTITLE, LANDING_PAGE_TITLE } from "@/app/constants";
import { Button } from "@/components";

export default function AnalyzingInput() {
  const [protocol, setProtocol] = useState<"https://" | "http://">("https://");
  const [domain, setDomain] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isPending } = useLighthouseAudit();
  const toast = useToast();

  const fullUrl = `${protocol}${domain}`;
  const isValid = /^https?:\/\/[^\s]+$/.test(fullUrl);

  const handleSubmit = () => {
    if (isSubmitted) {
      handleReset();
      return;
    }
    if (!isValid) {
      toast("유효한 URL을 입력해주세요.");
      return;
    }
    setIsSubmitted(true);
    mutate(fullUrl);
  };

  const toggleProtocol = () => {
    if (isSubmitted) return;
    setProtocol((prev) => (prev === "https://" ? "http://" : "https://"));
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDomain("");
    setProtocol("https://");
  };

  return (
    <section className="w-full px-4 py-10 text-center">
      <div
        className={clsx(
          "transition-opacity duration-400",
          isSubmitted && "opacity-0 pointer-events-none"
        )}
      >
        <h1 className="text-3xl font-bold text-foreground mb-[10px]">
          {LANDING_PAGE_TITLE}
        </h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-[18px]">
          {LANDING_PAGE_SUBTITLE}
        </p>
      </div>

      <div
        className={clsx(
          "relative w-full max-w-xl mx-auto min-w-[400px]",
          isSubmitted &&
            "translate-y-[-260px] transition-transform duration-700"
        )}
      >
        <div
          className={clsx(
            "flex h-12 overflow-hidden rounded-md bg-[#111827] text-white items-center",
            isPending && "opacity-50 pointer-events-none"
          )}
        >
          <button
            onClick={toggleProtocol}
            className={clsx(
              "relative ml-[8px] w-[12px] h-[32px] flex-shrink-0 rounded-[4px] transition-colors duration-300 focus:outline-none",
              isSubmitted ? "pointer-default" : "cursor-pointer",
              isSubmitted
                ? "bg-gray-500 dark:bg-gray-600"
                : protocol === "https://"
                ? "bg-green-500 dark:bg-green-600"
                : "bg-red-500 dark:bg-red-600"
            )}
          >
            <div
              className={clsx(
                "absolute left-[3px] w-[6px] h-[12px] bg-white rounded-full shadow-sm transition-transform duration-300",
                protocol === "https://"
                  ? "top-[4px] translate-y-0"
                  : "top-[4px] translate-y-[12px]"
              )}
            />
          </button>

          <span className="px-4 flex items-center text-sm font-mono text-gray-400 cursor-default">
            {protocol}
          </span>

          <input
            type="text"
            maxLength={50}
            disabled={isPending || isSubmitted}
            className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-gray-500 disabled:cursor-default disabled:opacity-50"
            placeholder="example.com"
            value={domain}
            onChange={
              (e) => setDomain(e.target.value.slice(0, 50)) // 실시간 자르기 안전장치
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValid) handleSubmit();
            }}
          />

          <div className="mr-[6px]">
            <Button
              label={
                isPending ? "Analyzing" : isSubmitted ? "Reset" : "Analyze"
              }
              onClick={handleSubmit}
              disabled={!isValid || isPending}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
