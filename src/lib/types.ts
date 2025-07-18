export const BROWSER_METRICS = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

export const CATEGORY_KEYS = [
  "performance",
  "accessibility",
  "seo",
  "best-practices",
] as const;

export type CruxMetricKey =
  | "FIRST_CONTENTFUL_PAINT_MS"
  | "LARGEST_CONTENTFUL_PAINT_MS"
  | "FIRST_INPUT_DELAY_MS"
  | "CUMULATIVE_LAYOUT_SHIFT_SCORE"
  | "INTERACTION_TO_NEXT_PAINT"
  | "TIME_TO_FIRST_BYTE"
  | "SPEED_INDEX_MS";

export type LighthouseCategoryKey = (typeof CATEGORY_KEYS)[number];

export type LighthouseResponse = {
  requestedUrl: string;
  finalUrl: string;
  fetchTime: string;
  lighthouseVersion: string;
  runWarnings: string[];

  configSettings?: {
    emulatedFormFactor: "mobile" | "desktop";
    formFactor: "mobile" | "desktop";
    locale: string;
    onlyCategories?: LighthouseCategoryKey[];
    channel: string;
  };

  categoryGroups?: {
    [groupId: string]: {
      title: string;
      description: string;
    };
  };

  audits: {
    [id: string]: AuditItem;
  };

  timing?: {
    total: number;
  };

  categories: {
    [key in LighthouseCategoryKey]?: {
      score: number;
      title: string;
      description?: string;
      auditRefs: {
        id: string;
        weight: number;
        group?: string;
        acronym?: string;
      }[];
    };
  };

  loadingExperience?: CruxExperience;
  originLoadingExperience?: CruxExperience;
};

export type CruxMetric = {
  percentile: number;
  category: "FAST" | "AVERAGE" | "SLOW";
  distributions?: {
    min: number;
    max: number;
    proportion: number;
  }[];
};

export type CruxExperience = {
  metrics: {
    [key in CruxMetricKey]?: CruxMetric;
  };
  overall_category?: "FAST" | "AVERAGE" | "SLOW";
  initial_url?: string;
  origin_fallback?: boolean;
};

//* Audit Item
export type AuditItem = {
  id: string;
  title: string;
  score: number | null;
  description?: string;
  displayValue?: string;
  numericValue?: number;
  numericUnit?: string;
  scoreDisplayMode?:
    | "binary"
    | "numeric"
    | "informative"
    | "notApplicable"
    | "manual"
    | "error";
  details?: AuditDetails;
  warnings?: string[];
};

export type AuditSummaryItem = {
  id: string;
  title: string;
  score: number | null;
  description?: string;
  displayValue?: string;
  estimatedScoreGain: number;
  weight: number;
  learnMoreLink: string;
};

export type AnalyzedAuditResult = {
  critical: AuditSummaryItem[];
  general: AuditSummaryItem[];
};

//* TableDetails -> 없는 케이스 존재
type AuditDetails = TableDetails | OpportunityDetails | null;

type TableDetails = {
  type: "table";
  headings: {
    key: string;
    label: string;
    valueType?: string;
    displayUnit?: string;
    granularity?: number;
  }[];
  items: Record<string, unknown>[];
  sortedBy?: string[];
  skipSumming?: string[];
};

type OpportunityDetails = {
  type: "opportunity";
  overallSavingsMs: number;
  headings: {
    key: string;
    label: string;
    valueType?: string;
    displayUnit?: string;
  }[];
  items: Record<string, unknown>[];
};
