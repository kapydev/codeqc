#!/usr/bin/env node

import { greet, sayGoodbye } from "./index";

const [, , ...args] = process.argv;
const command = args[0];
const name = args[1];

if (command === "greet") {
  greet(name);
} else if (command === "goodbye") {
  sayGoodbye(name);
} else {
  console.log("Unknown command");
}
