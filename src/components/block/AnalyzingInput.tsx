"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLighthouseAudit } from "@/app/hooks";
import { LANDING_PAGE_SUBTITLE, LANDING_PAGE_TITLE } from "@/app/constants";
import { Button } from "@/components";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyzingInput({
  audit,
  isSubmitted,
  onReset,
  setIsSubmitted,
}: {
  audit: ReturnType<typeof useLighthouseAudit>;
  isSubmitted: boolean;
  onReset: () => void;
  setIsSubmitted: (v: boolean) => void;
}) {
  const [domain, setDomain] = useState("");
  const [protocol, setProtocol] = useState<"https://" | "http://">("https://");

  const fullUrl = `${protocol}${domain}`;
  const isDomainValid = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/.test(
    domain
  );
  const isLocalhost = /^localhost(:\d{1,5})?(\/.*)?$/.test(domain);
  const isIPv4 =
    /^(127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(:\d{1,5})?(\/.*)?$/.test(
      domain
    );

  const isValid =
    protocol === "https://"
      ? isDomainValid
      : isDomainValid || isLocalhost || isIPv4;

  const handleSubmit = () => {
    if (isSubmitted) {
      handleReset();
      return;
    }
    setIsSubmitted(true);
    audit.mutate(fullUrl);
  };

  const toggleProtocol = () => {
    if (!isSubmitted) {
      setProtocol((prev) => (prev === "https://" ? "http://" : "https://"));
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDomain("");
    setProtocol("https://");
    onReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDomain(e.target.value.slice(0, 50));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) handleSubmit();
  };

  // 분리하는게 더 좋은가 고민..
  const InputBox = (
    <div className="flex h-12 overflow-hidden rounded-md bg-[#111827] text-white items-center">
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
        disabled={audit?.isPending || isSubmitted}
        className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-gray-500 disabled:cursor-default disabled:opacity-50"
        placeholder="example.com"
        value={domain}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="mr-[6px]">
        <Button
          label={
            audit?.isPending ? "Analyzing" : isSubmitted ? "Reset" : "Analyze"
          }
          onClick={handleSubmit}
          disabled={!isValid || audit?.isPending}
        />
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.section
            key="submitted-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0, duration: 0.6 }}
            className="flex z-50 w-full h-[80px] fixed bottom-0 text-center flex-col items-center justify-center py-2 px-4 bg-[rgb(var(--background))]"
          >
            <motion.div className="relative w-full max-w-lg min-w-[400px]">
              {InputBox}
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            key="initial-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex w-full px-4 py-10 text-center flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {LANDING_PAGE_TITLE}
              </h1>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                {LANDING_PAGE_SUBTITLE}
              </p>
            </motion.div>

            <motion.div
              key="input-box"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg min-w-[400px]"
            >
              {InputBox}

              <AnimatePresence>
                {protocol === "http://" && (
                  <motion.div
                    key="http-warning"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-[calc(100%+10px)] w-full text-sm text-red-500 opacity-0.2"
                  >
                    <strong className="font-medium">Caution:</strong>{" "}
                    <span>
                      &quot;http://&quot; sites may be blocked or provide
                      incomplete data in some browsers. However, we support
                      &quot;http://localhost&quot; for development and testing
                      purposes.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
