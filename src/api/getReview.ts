import Listr from "listr";
import { getClaudeReview } from "./reviewers/ai/claude";
import { getGeminiReview } from "./reviewers/ai/gemini";
import { getGPTReview } from "./reviewers/ai/gpt";
import { Folder, filterRelevantFiles, getFolderFromPath } from "../helpers";
// import { getLightHouseReview } from "./reviewers/lighthouse";
// import { getWallaceReview } from "./reviewers/wallace";

export async function getReview(folder: string | Folder): Promise<void> {
  console.log("✨ Running Code Review");

  let resolvedFolder: Folder | undefined = undefined;

  let relevantFiles: Folder = undefined!;

  const tasks = new Listr([
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
              task: () => getGPTReview(relevantFiles),
              skip: (ctx) => ctx.isError,
            },
            {
              title: "Running Claude Review",
              task: () => getClaudeReview(relevantFiles),
              skip: (ctx) => ctx.isError,
            },
            {
              title: "Running Gemini Review",
              task: () => getGeminiReview(relevantFiles),
              skip: (ctx) => ctx.isError,
            },
            // Uncomment and modify the following lines for other reviews you might want to include:
            // {
            //   title: 'Running LightHouse Review',
            //   task: () => getLightHouseReview(relevantFiles),
            //   skip: ctx => ctx.isError,
            // },
            // {
            //   title: 'Running Wallace Review',
            //   task: () => getWallaceReview(relevantFiles),
            //   skip: ctx => ctx.isError,
            // },
          ],
          {
            concurrent: true, // Run all tasks concurrently
            exitOnError: false, // Do not stop other tasks if one fails
          }
        );
      },
    },
  ]);

  try {
    const result = await tasks.run();
    console.log("All reviews completed:", result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
