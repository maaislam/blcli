import { pollerLite } from "../../../../../../lib/utils";

const fetchReviews = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Return a promise that resolves when the ratingsSummary is found
        return new Promise((resolve, reject) => {
            pollerLite([() => doc.querySelector('.bv_ratings_summary')], () => {
                const ratingsSummary = doc.querySelector('.bv_ratings_summary');
                if (ratingsSummary) {
                    console.log('Ratings Summary Element Found:', ratingsSummary);
                    resolve(ratingsSummary);  // Resolve with the element
                } else {
                    console.log('Ratings Summary Element Not Found:', ratingsSummary);
                    reject('Ratings Summary Element Not Found');
                }
            });
        });

    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        throw error;  // Re-throw to propagate the error
    }
};

export default fetchReviews;
