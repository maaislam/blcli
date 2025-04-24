import shared from "../../../../../core-files/shared";

const { ID } = shared;

const card = (
  image,
  title,
  price,
  oldPrice,
  url,
  reviewScore,
  reviewCount,
  hasAdvantagePrice,
  promotionalText
) => {
  const card = document.createElement("a");
  card.href = url;
  card.classList.add(`${ID}-card`);
  card.innerHTML = /* html */ `
    <div class="${ID}-card-image ${
    hasAdvantagePrice ? "has-advantage-price" : ""
  }">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-card-content">
      <h4 class="${ID}-card-title">${title}</h4>
      <div class="${ID}-card-pricing">
				${
          oldPrice > price
            ? /* html */ `<span class="${ID}-card-old-price">£${oldPrice}</span><span class="${ID}-card-price">£${price}</span>`
            : /* html */ `<span class="${ID}-card-price">£${price}</span>`
        }
			</div>
      <div class="${ID}-card-reviews">
				<span
					class="${ID}-card-stars"
					style="--rating: ${reviewScore};"
					aria-label="Rating of this product is ${reviewScore} out of 5."
				></span>
				<span class="${ID}-card-review-count">(${reviewCount})</span>
			</div>
			${
        promotionalText
          ? /* html */ `
      	<p class="${ID}-card-promo">${promotionalText}</p>
			`
          : ""
      }
    </div>
  `;

  return card;
};

export default card;
