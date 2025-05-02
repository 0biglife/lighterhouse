import { LighthouseCategoryKey } from "./constants";

export type AnalyzedForm = {
  requestedUrl: string;
  finalUrl: string;
  fetchTime: string;
  lighthouseVersion: string;
  categories: {
    [key in LighthouseCategoryKey]?: {
      score: number;
      title: string;
      description?: string;
    };
  };
  audits: {
    [id: string]: {
      id: string;
      title: string;
      score: number | null;
      description?: string;
      displayValue?: string;
      numericValue?: number;
    };
  };
};
