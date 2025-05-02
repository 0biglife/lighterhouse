import { useToastProvider } from "@/components";

export function useToast() {
  const { showToast } = useToastProvider();

  return (error: unknown) => {
    let message = "Exceptional Error Occurred";

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }

    showToast(message);
  };
}
