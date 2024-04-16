import { calculate } from "@projectwallace/css-code-quality";
import { Reviewer } from "../reviewScore";
import { traverseFolder } from "../../../helpers";

export const getWallaceReview: Reviewer = (folder) => {
  traverseFolder(folder, (file) => {
    if (!/\.(css|scss|less)$/i.test(file.name)) return;
    const result = calculate(file.content);
    console.log(result);
  });
};
