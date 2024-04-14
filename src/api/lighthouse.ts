import lighthouse, { Flags } from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function getLightHouseReview() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options: Flags = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse("https://example.com", options);

  if (!runnerResult || !runnerResult.lhr.categories.performance.score) return;

  const finalPercentageScore =
    runnerResult.lhr.categories.performance.score * 100;

  await chrome.kill();

  return finalPercentageScore;
}
