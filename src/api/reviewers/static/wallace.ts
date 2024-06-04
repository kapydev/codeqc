import { calculate } from "@projectwallace/css-code-quality";
import { ReviewDetails, Reviewer } from "../reviewScore";
import { traverseFolder } from "../../../helpers";

export const getWallaceReview: Reviewer = async (folder) => {
  const reviewData: (ReturnType<typeof calculate> & { fileName: string })[] =
    [];

  traverseFolder(folder, (file, meta) => {
    if (!/\.(css|scss|less)$/i.test(file.name)) return;
    const result = calculate(file.content);
    reviewData.push({ ...result, fileName: meta.fullPath });
  });

  //Parse the review data into a single review object
  const fullReview: ReviewDetails = {
    reviewer: "Wallace CSS Code Quality",
    details: reviewData,
    quality: calculateAverage(reviewData.map((review) => review.score)),
    possibleImprovements: reviewData.flatMap((review) => {
      return review.violations.map((violation) => {
        return `${review.fileName} => ${JSON.stringify(violation)}`;
      });
    }),
    remarks: reviewData.flatMap((review) => {
      return review.passes.map((pass) => {
        return `PASS: ${review.fileName} => ${JSON.stringify(pass)}`;
      });
    }),
  };

  return fullReview;
};

function calculateAverage(numbers: number[]) {
  if (numbers.length === 0) {
    return 0;
  }

  let sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}
