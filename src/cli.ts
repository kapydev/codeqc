#!/usr/bin/env node
import { Command } from "commander";
import { getReview } from "./api/getReview";

const program = new Command();

// Configure the 'review' command
program
  .command("review <folderPath>") // <folderPath> indicates that 'folderPath' is a required parameter
  .description("Fetch and display the review for the given folder path") // Optional description
  .requiredOption("-o, --output <outputPath>", "Specify the output folder path where the review file will be saved")
  .action((folderPath, options) => {
    getReview(folderPath, options.output); // Pass the output name to your function
  });

// Error on unknown commands
program.on("command:*", function (operands) {
  console.error(`Error: unknown command '${operands[0]}'`);
  const availableCommands = program.commands.map((cmd) => cmd.name());
  console.log(`Available commands are: ${availableCommands.join(", ")}`);
  process.exit(1);
});

// Parse the command line arguments
program.parse(process.argv);
