import { z } from "zod";
import { Folder } from "../../helpers";

export const reviewScoreSchema = z.object({
  quality: z.number().min(0).max(100), // Ensures the number is between 0 and 1
  remarks: z.array(z.string()), // An array of strings
  possibleImprovements: z.array(z.string()), // Another array of strings
});

// Type definition for TypeScript integration (optional)
export type ReviewScore = z.infer<typeof reviewScoreSchema>;

export type Reviewer = (folder: Folder) => Promise<ReviewScore>;
