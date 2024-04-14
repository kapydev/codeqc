#!/usr/bin/env node

import { getReview } from "./index";

const [, , ...args] = process.argv;
const command = args[0];
const name = args[1];

if (command === "review") {
  getReview(name);
} else {
  console.log("Unknown command");
}
