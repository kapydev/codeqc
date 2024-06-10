import Listr from "listr";
import { getClaudeReview } from "./reviewers/ai/claude";
import { getGeminiReview } from "./reviewers/ai/gemini";
import { getGPTReview } from "./reviewers/ai/gpt";
import { Folder, filterRelevantFiles, getFolderFromPath } from "../helpers";
import { ReviewDetails } from "./reviewers/reviewScore";
import { getLightHouseReview } from "./reviewers/static/lighthouse";
import { getWallaceReview } from "./reviewers/static/wallace";
import { getAggregateScore } from "./reviewers/aggregateFn";
import fs from 'fs/promises';  // Import fs.promises module

export async function getReview(folderPath: string | Folder, outputName: string) {
  console.log("✨ Running Code Review");

  let resolvedFolder: Folder | undefined = undefined;
  let relevantFiles: Folder = undefined!;

  const fullReview = {
    reviews: [] as ReviewDetails[],
    aggregateScore: 0,
  }
  const reviews: ReviewDetails[] = [];

  const tasks = new Listr(
    [
      {
        title: "Reading Folder",
        task: async () => {
          if (typeof folderPath === "string") {
            resolvedFolder = await getFolderFromPath(folderPath);
          } else {
            resolvedFolder = folderPath;
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
              // {
              //   title: "Running LightHouse Review",
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
      {
        title: "Aggregating scores...",
        task: () => {
          const aggregateScore = getAggregateScore(reviews);
          fullReview.reviews = reviews;
          fullReview.aggregateScore = aggregateScore;
        },
      },
    ],
    {
      exitOnError: false,
    }
  );

  try {
    await tasks.run();
    await saveReviewToReadme(outputName, fullReview);  // Save the review details to a README file
  } catch (error) {
    throw error;
  }

  return {
    fullReview,
  };
}

// Function to save review details to README.md
async function saveReviewToReadme(outputName: string, review: { reviews: ReviewDetails[], aggregateScore: number }) {
  // Header for the README file
  let content = `# ${outputName} Code Review Report\n\n## Aggregate Score: ${review.aggregateScore}\n\n## Detailed Reviews\n`;

  // Adding each review details as a table
  review.reviews.forEach((r, index) => {
    content += `### ${r.reviewer} Review\n`;
    content += `| Metric                  | Comments           |\n`;
    content += `|-------------------------|--------------------|\n`;
    content += `| Quality                 | ${r.quality}       |\n`;
    content += `| Format and Readability  | ${r.formatAndReadability} |\n`;
    content += `| Component Structure     | ${r.componentStructure}   |\n`;
    content += `| Responsiveness and Styling | ${r.responsivenessAndStyling} |\n`;
    content += `| Accessibility          | ${r.accessibility} |\n`;
    content += `| Code Reusability       | ${r.codeReusability} |\n`;
    content += `| Performance            | ${r.performance}   |\n`;
    content += `| Best Practices         | ${r.bestPractices} |\n\n`;
  });

  // Write the content to README.md
  await fs.writeFile(`./sampleCodeReviews/${outputName}_CODE_REVIEW.md`, content);
}