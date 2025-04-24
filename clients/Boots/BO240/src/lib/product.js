import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

let node = 1;

const recProduct = (
  currentProduct,
  image,
  title,
  price,
  oldPrice,
  url,
  reviewScore,
  reviewCount,
  advantagePoints,
  promotionalText,
  productID
) => {
  const card = document.createElement("a");
  if(url !== '') {
    card.href = url;
  }
  card.classList.add(`${ID}-card`);

  if(VARIATION === '1' || VARIATION === '3') {
    card.innerHTML = `
    <div class="${ID}-card-image">
      ${currentProduct ? `<span class="${ID}-card-current">Current Product</span>` : ''}
      <img src="${image}" alt="${title}" />
    </div>
    <h4 class="${ID}-card-title">${title}</h4>
    <div class="${ID}-card-content">
        <div class="${ID}-row ${ID}-card-pricing">
          ${
            oldPrice > price
              ? `<span class="${ID}-card-price">Now £${price}</span><span class="${ID}-card-old-price">Was £${oldPrice}</span>`
              : `<span class="${ID}-card-price">£${price}</span>`
          }
        </div>
        <div class="${ID}-row ${ID}-card-reviews">
          <span class="${ID}-card-stars" style="--rating: ${reviewScore};" aria-label="${reviewScore} out of 5."></span>
          <span class="${ID}-card-review-count">(${reviewCount})</span>
        </div>
        <div class="${ID}-row ${ID}-advantage-points">
          <span>${advantagePoints} points</span>
        </div>
        <div class="${ID}-row ${ID}-offer">
          ${promotionalText ? `<span class="${ID}-card-promo">${promotionalText}</span>` : `<span class="${ID}-card-promo">-</span>`}
        </div>
        <div class="${ID}-row ${ID}-ppu">
        <span class="${ID}-card-ppu">-</span>
      </div>
    </div>`

    fetch(`https://optimisation-api.co.uk/product-feed?id=${productID}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then((response) => {
          var ppuCard = document.querySelectorAll('.BO240-card-ppu')[node];
          var size = response.ppuvolume;
          if (size === undefined){
            size = "-";
          }
          ppuCard.innerHTML = size;
          node ++;
        }); 
  
  } else if (VARIATION === '2' || VARIATION === '4'){
    card.innerHTML = /* html */ `
    <div class="${ID}-card-image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-card-content">
      <h4 class="${ID}-card-title">${title}</h4>
      <div class="${ID}-card-pricing">
				${
          oldPrice > price ? `<span class="${ID}-card-price">£${price}</span><span class="${ID}-card-old-price">£${oldPrice}</span>`
            : `<span class="${ID}-card-price">£${price}</span>`
        }
			</div>
      <div class="${ID}-card-reviews">
				<span class="${ID}-card-stars" style="--rating: ${reviewScore};" aria-label="Rating of this product is ${reviewScore} out of 5."></span>
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
  }
  return card;
};


export default recProduct;
