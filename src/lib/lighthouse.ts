import {
  AnalyzedAuditResult,
  AuditSummaryItem,
  LighthouseResponse,
} from "@/lib/types";

const webDevLinkMap: Record<string, string> = {
  "total-blocking-time": "tbt",
  "first-contentful-paint": "fcp",
  "largest-contentful-paint": "lcp",
  "cumulative-layout-shift": "cls",
  "speed-index": "si",
};

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
    // const estimatedScoreGain = Math.round((ref.weight / totalWeight) * 100);
    const estimatedScoreGain = Number(
      ((ref.weight / totalWeight) * 100).toFixed(1)
    );
    const learnMoreLink = `https://web.dev/${
      webDevLinkMap[audit.id] ?? audit.id
    }/`;

    const item: AuditSummaryItem = {
      id: audit.id,
      title: audit.title,
      score: audit.score,
      description: audit.description,
      displayValue: audit.displayValue,
      estimatedScoreGain,
      weight: ref.weight,
      // learnMoreLink: `https://web.dev/${audit.id.replace(/-/g, "-")}/`,
      learnMoreLink,
    };

    const actualScore = audit.score === null ? 0 : audit.score;

    if (actualScore < 0.5 && ref.weight > 0) critical.push(item);
    else general.push(item);
  }

  return {
    critical: critical.sort((a, b) => b.weight - a.weight),
    general,
  };
}
