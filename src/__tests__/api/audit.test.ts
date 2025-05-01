import { POST } from "@/app/api/audit/route";
import { describe, it, expect } from "vitest";

describe("API: /api/audit", () => {
  it("should return 400 for invalid url", async () => {
    const res = await POST(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify({ url: "invalid" }),
      })
    );

    expect(res.status).toBe(400);
  });
});
