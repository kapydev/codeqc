import { getReview } from "../dist/index.js";
import path from "path";

const { reviews } = await getReview(
  path.join(__dirname, "../samples/login-screen")
);

console.log(reviews);
