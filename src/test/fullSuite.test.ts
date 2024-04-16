import test from "ava";
import { execa } from "execa";
import appRoot from "app-root-path"; // Import app-root-path to determine the root directory
import { getReview } from "../api";

test("CodeQC can be run via API", async (t) => {
  const review = await getReview("blabalaa");
  t.pass();
});

test.skip("CodeQC can be run from the command line", async (t) => {
  const name = "exampleName"; // Replace 'exampleName' with a valid name argument for your use case
  const cliPath = appRoot.resolve("/dist/cli.js"); // Resolves the path to the CLI script relative to the app root
  const { stdout } = await execa("node", [cliPath, "review", name]); // Use the resolved path in execa

  // Example test condition: check if the output incddludes the expected name
  // This assumes your getReviedw function outputs something containing 'name'
  t.true(stdout.includes(name));

  // More specific tests can be added depending on what output your `getReview` function produces
  // For instance, if getReview prints a review found in a database or an API response, you could mock this data and check against it
});
