"use client";
import { CATEGORY_KEYS } from "@/lib/constants";
import { AnalyzedForm } from "@/lib/types";
import { useState } from "react";

export default function MainPanel() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalyzedForm>();
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("res : ", data);
      setResult(data);
    } catch (err) {
      console.error("오류:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <input
        type="text"
        className="w-full border px-4 py-2 rounded"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleAudit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "분석 중..." : "Lighthouse 실행"}
      </button>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">분석 결과</h2>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORY_KEYS.map((key) => {
              const category = result.categories[key];
              return (
                <div key={key} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold capitalize">{key}</h3>
                  {category ? (
                    <>
                      <h3>{category.title}</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(category.score * 100)}점
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">데이터 없음</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
