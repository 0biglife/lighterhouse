import { LighthouseCategoryKey } from "./constants";

export type AnalyzedForm = {
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
    [id: string]: {
      id: string;
      title: string;
      score: number | null;
      description?: string;
      displayValue?: string;
      numericValue?: number;
    };
  };

  categories: {
    [key in LighthouseCategoryKey]?: {
      score: number;
      title: string;
      description?: string;
    };
  };
};
