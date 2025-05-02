"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import clsx from "clsx";

type Toast = {
  id: number;
  message: string;
  isVisible: boolean;
};

const ToastContext = createContext<{
  showToast: (message: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, isVisible: true }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isVisible: false } : t))
      );
    }, 9000);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 10000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full  max-w-xl px-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "bg-gray-800 text-white px-4 py-2 rounded shadow transition-opacity duration-1000",
              toast.isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToastProvider = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToastProvider must be used within ToastProvider");
  return context;
};
