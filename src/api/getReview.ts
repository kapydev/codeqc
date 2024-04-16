import Listr from "listr";
import { getClaudeReview } from "./reviewers/ai/claude";
import { getGeminiReview } from "./reviewers/ai/gemini";
import { getGPTReview } from "./reviewers/ai/gpt";
import { Folder, filterRelevantFiles, getFolderFromPath } from "../helpers";
import { FullReview } from "./reviewers/reviewScore";
// import { getLightHouseReview } from "./reviewers/lighthouse";
// import { getWallaceReview } from "./reviewers/wallace";

export async function getReview(folder: string | Folder) {
  console.log("✨ Running Code Review");

  let resolvedFolder: Folder | undefined = undefined;
  let relevantFiles: Folder = undefined!;
  const reviews: FullReview[] = [];

  const tasks = new Listr(
    [
      {
        title: "Reading Folder",
        task: async () => {
          if (typeof folder === "string") {
            resolvedFolder = await getFolderFromPath(folder);
          } else {
            resolvedFolder = folder;
          }
        },
      },
      {
        title: "Filtering Relevant Files",
        task: () => {
          if (resolvedFolder === undefined) {
            throw Error("MISSING_RESOLVED_FOLDER");
          }
          relevantFiles = filterRelevantFiles(resolvedFolder);
        },
      },
      {
        title: "Review Code",
        task: () => {
          return new Listr(
            [
              {
                title: "Running GPT Review",
                task: async () => {
                  const review = await getGPTReview(relevantFiles);
                  reviews.push(review);
                },
              },
              {
                title: "Running Claude Review",
                task: async () => {
                  const review = await getClaudeReview(relevantFiles);
                  reviews.push(review);
                },
              },
              {
                title: "Running Gemini Review",
                task: async () => {
                  const review = await getGeminiReview(relevantFiles);
                  reviews.push(review);
                },
              },
              // Uncomment and modify the following lines for other reviews you might want to include:
              // {
              //   title: 'Running LightHouse Review',
              //   task: () => getLightHouseReview(relevantFiles),
              // },
              // {
              //   title: 'Running Wallace Review',
              //   task: () => getWallaceReview(relevantFiles),
              // },
            ],
            {
              concurrent: true, // Run all tasks concurrently
              exitOnError: false, // Do not stop other tasks if one fails
            }
          );
        },
      },
    ],
    {
      exitOnError: false,
    }
  );

  try {
    await tasks.run();
  } catch (error) {
    //TODO: Make sure listr doesn't exit on error
  }

  return {
    reviews,
  };
}
