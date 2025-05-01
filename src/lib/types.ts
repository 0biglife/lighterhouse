import { LighthouseCategoryKey } from "./constants";

export type AnalyzedForm = {
  categories: {
    [key in LighthouseCategoryKey]?: {
      score: number;
      title: string;
      description?: string;
    };
  };
};
