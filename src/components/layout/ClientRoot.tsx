"use client";
import { Footer, Header } from "@/components";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
