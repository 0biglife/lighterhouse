"use client";
import { Header, ToastProvider } from "@/components";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex w-full justify-center items-center">
              {children}
            </main>
          </div>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
