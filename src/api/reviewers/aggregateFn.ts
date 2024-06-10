import { ReviewDetails } from "./reviewScore";

export const getAggregateScore = (reviews: ReviewDetails[]): number => {
    console.log("Getting aggregate score...");

    const totalScore = reviews.map((review) => review.quality).reduce((a, b) => a + b, 0);
    const averageScore = totalScore / reviews.length;

    return averageScore;
}