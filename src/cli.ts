#!/usr/bin/env node
import { Command } from "commander";
import { getReview } from "./api/getReview";

const program = new Command();

// Configure the 'review' command
program
  .command("review <name>") // <name> indicates that 'name' is a required parameter
  .description("Fetch and display the review for the given name") // Optional description
  .action((name) => {
    getReview(name); // Call your function with the name argument
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
