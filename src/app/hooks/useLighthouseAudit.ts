import { useMutation } from "@tanstack/react-query";
import { LighthouseResponse } from "@/lib/types";
import { useToast } from "./useToast";

const fetchAudit = async (url: string): Promise<LighthouseResponse> => {
  const res = await fetch("/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

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
      toast(error);
      onFail?.();
    },
  });
};
