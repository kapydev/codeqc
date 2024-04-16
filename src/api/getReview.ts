import ora from "ora";
import { getClaudeReview } from "./reviewers/claude";
import { getGeminiReview } from "./reviewers/gemini";
import { getGPTReview } from "./reviewers/gpt";
import { Folder, filterRelevantFiles, getFolderFromPath } from "../helpers";
// import { getLightHouseReview } from "./reviewers/lighthouse";
// import { getWallaceReview } from "./reviewers/wallace";

export async function getReview(folder: string | Folder): Promise<void> {
  console.log("✨ Running Code Review");
  const spinner = ora("Reviewing Code");
  try {
    spinner.start("Reading Folder");
    let resolvedFolder: Folder | undefined = undefined;

    if (typeof folder === "string") {
      resolvedFolder = await getFolderFromPath(folder);
    } else {
      resolvedFolder = folder;
    }

    if (resolvedFolder === undefined) {
      throw Error("COULD_NOT_RESOLVE_FOLDER");
    }

    spinner.succeed();
    spinner.start("Filtering Relevant Files");

    const relevantFiles = filterRelevantFiles(resolvedFolder);

    debugger;

    spinner.succeed();

    // AI
    // const gptReview = await getGPTReview();
    // // const claudeReview = await getClaudeReview();
    // const geminiReview = await getGeminiReview();

    // // NON-AI
    // // const lightHouseReview = await getLightHouseReview();
    // // const wallaceReview = await getWallaceReview();

    // const overallReview = [
    //   gptReview,
    //   // claudeReview,
    //   geminiReview,
    //   // lightHouseReview,
    //   // wallaceReview,
    // ];

    // console.log(`This is the file path, ${filePath}!`);
    // console.log(`This is the overall review, ${overallReview}!`);
    spinner.stop();
  } catch (e) {
    spinner.fail();
    throw e;
  }
}

/*
Google lighthouse - https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically
GPT - https://platform.openai.com/docs/quickstart?context=node
Claude - https://docs.anthropic.com/claude/reference/client-sdks#typescript
Gemini - https://ai.google.dev/tutorials/get_started_node#generate-text-from-text-input
Project Walace - https://github.com/projectwallace/css-code-quality 
*/
