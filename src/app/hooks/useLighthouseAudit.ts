import { useMutation } from "@tanstack/react-query";
import { LighthouseResponse } from "@/lib/types";
import { useToast } from "./useToast";

const fetchAudit = async (url: string): Promise<LighthouseResponse> => {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/analyze?url=${encodeURIComponent(url)}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to analyze the URL");
  }

  return res.json();
};

export const useLighthouseAudit = (key: number, onFail?: () => void) => {
  const toast = useToast();

  return useMutation({
    mutationKey: ["lighthouse-audit", key],
    mutationFn: fetchAudit,
    onError: (error) => {
      const rawMsg =
        error instanceof Error ? error.message : "An unknown error occurred.";

      console.log("~ rawMsg", rawMsg);

      // const isTimeout =
      //   rawMsg.includes("Timeout") ||
      //   rawMsg.includes("504") ||
      //   rawMsg.includes("network timeout") ||
      //   rawMsg.includes("fetch") ||
      //   rawMsg.includes("end of JSON") ||
      //   rawMsg.includes("Failed to") ||
      //   rawMsg.includes("Failed to execute 'json'");

      // const userMsg = isTimeout
      //   ? "The PSI analysis request timed out due to AWS Amplify serverless function limits. We are currently working on improving this issue."
      //   : rawMsg;

      toast(rawMsg);
      onFail?.();
    },
  });
};
