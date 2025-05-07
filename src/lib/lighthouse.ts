import {
  AnalyzedAuditResult,
  AuditSummaryItem,
  LighthouseResponse,
} from "@/lib/types";
export async function analyzeWithPSI(url: string, key: string) {
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=desktop&category=performance&category=accessibility&category=seo&category=best-practices&key=${key}`;

  const res = await fetch(endpoint);
  let json;

  try {
    json = await res.json();
  } catch {
    throw new Error(
      "Failed to parse response from Google PSI. Please contact support at 0biglife@gmail.com."
    );
  }

  if (!res.ok || json.error) {
    const msg = json.error?.message || "Failed to call Google PSI Request.";
    const code = json.error?.code || res.status;
    const status = json.error?.status || "UNKNOWN";

    throw new Error(`[${status}-${code}] ${msg}`);
  }

  if (!json.lighthouseResult) {
    throw new Error(`Empty Lighthouse Response.`);
  }

  return json.lighthouseResult;
}

export function analyzeAuditData(
  data: LighthouseResponse
): AnalyzedAuditResult {
  const auditRefs = data.categories?.performance?.auditRefs ?? [];
  const critical: AuditSummaryItem[] = [];
  const general: AuditSummaryItem[] = [];

  for (const ref of auditRefs) {
    const audit = data.audits[ref.id];
    if (!audit) continue;

    const totalWeight = auditRefs.reduce((sum, ref) => sum + ref.weight, 0);

    const estimatedScoreGain = Math.round((ref.weight / totalWeight) * 100);

    const item: AuditSummaryItem = {
      id: audit.id,
      title: audit.title,
      score: audit.score,
      description: audit.description,
      displayValue: audit.displayValue,
      estimatedScoreGain,
      weight: ref.weight,
      learnMoreLink: `https://web.dev/${audit.id.replace(/-/g, "-")}/`,
    };

    if ((audit.score ?? 1) < 0.5 && ref.weight > 0) critical.push(item);
    else general.push(item);
  }

  return {
    critical: critical.sort((a, b) => b.weight - a.weight),
    general,
  };
}
