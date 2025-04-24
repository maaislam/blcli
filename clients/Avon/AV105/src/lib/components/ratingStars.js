const ratingStars = (id, ratingData) => {
  const { average_score, total_reviews } = ratingData;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const rounderRating = Math.floor(average_score);
    if (i <= rounderRating) {
      stars.push(`<span class="${id}__yotpo-icon"></span>`);
    } else if (i === rounderRating + 1 && (average_score * 10) % 5) {
      stars.push(`<span class="${id}__yotpo-icon half-star"></span>`);
    } else {
      stars.push(`<span class="${id}__yotpo-icon empty-star"></span>`);
    }
  }

  const htmlStr = `
        <div class="${id}__yotpo-bottomline ">
            <div class="${id}__yotpo-stars">
               ${stars.map((star) => star).join('\n')}
            </div>
            <span class="${id}__total-review">${total_reviews} Reviews</span>
        </div>
    `;

  return htmlStr;
};

export default ratingStars;
