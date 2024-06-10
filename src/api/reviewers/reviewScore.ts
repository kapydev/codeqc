import { z } from "zod";
import { Folder } from "../../helpers";

export const reviewScoreSchema = z.object({
  quality: z.number().min(0).max(100),
  formatAndReadability: z.string(),
  componentStructure: z.string(),
  responsivenessAndStyling: z.string(),
  accessibility: z.string(),
  codeReusability: z.string(),
  performance: z.string(),
  bestPractices: z.string(),
})

// Type definition for TypeScript integration (optional)
export type ReviewScore = z.infer<typeof reviewScoreSchema>;
export type ReviewDetails = ReviewScore & { reviewer: string; details?: object };

export type Reviewer = (folder: Folder) => Promise<ReviewDetails>;
