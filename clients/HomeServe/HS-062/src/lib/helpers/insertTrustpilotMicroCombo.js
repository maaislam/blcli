const generateTrustpilotRating = (id, rating, totalReviews) => {
  rating = Math.min(5, Math.max(0, rating));

  const starImageUrl = `https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-${rating}.svg`;
  const trustpilotLogoUrl = 'https://cdn.trustpilot.net/brand-assets/4.3.0/logo-black.svg';

  return `
      <a class="trustpilot-rating" href="https://www.trustpilot.com/review/homeserve.co.uk?utm_medium=trustbox&utm_source=MicroCombo" target="_blank">
          <span class="trustpilot-excellent">Excellent</span>
          <div class="${id}__imageWrapper"><img src="${starImageUrl}" alt="Trustpilot ${rating} stars" class="trustpilot-stars"></div>
          <span class="review-count">${totalReviews.toLocaleString()} reviews on</span>
          <div class="${id}__logoWrapper"><img src="${trustpilotLogoUrl}" alt="Trustpilot Logo" class="trustpilot-logo"></div>
      </a>
  `;
};
export default generateTrustpilotRating;
