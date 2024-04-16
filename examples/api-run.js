import { getReview } from "../dist/index.js";
import path from "path";

await getReview(path.join(__dirname, "../samples/login-screen"));
