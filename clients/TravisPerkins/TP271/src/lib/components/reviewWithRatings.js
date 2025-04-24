import review from "./review";
import trustpilotRatings from "./trustpilotRatings";

const reviewWithRatings = (id, ratings) => {
    const htmlStr = `<div class='${id}__reviewWithRatings'>
        ${review(id)}
        ${trustpilotRatings(id, ratings)}
    </div>`;
    return htmlStr;
}
export default reviewWithRatings;
