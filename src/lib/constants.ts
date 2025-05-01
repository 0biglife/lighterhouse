export const CATEGORY_KEYS = [
  "performance",
  "accessibility",
  "seo",
  "best-practices",
] as const;

export type LighthouseCategoryKey = (typeof CATEGORY_KEYS)[number];
