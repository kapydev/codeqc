import { calculate } from "@projectwallace/css-code-quality";

export async function getWallaceReview() {
  let css = `my_css { /* ... */ }`;
  let result = calculate(css);
}
