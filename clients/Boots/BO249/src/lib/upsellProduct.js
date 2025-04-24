import shared from "../../../../../core-files/shared";

const { ID } = shared;

const product = (
  objectid,
  sapCode,
  image,
  title,
  price,
  oldPrice,
  url,
  promotionalText
) => {
  const card = document.createElement("a");
  if(url !== '') {
    card.href = url;
  }
  card.classList.add(`${ID}-product`);

  card.innerHTML = /* html */ `
    <div class="${ID}-card-image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-card-content">
      <h4 class="${ID}-card-title">${title}</h4>
      <div class="${ID}-card-pricing">
				${
          oldPrice > price
            ? /* html */ `<span class="${ID}-card-price">Now £${price}</span><span class="${ID}-card-old-price">Was £${oldPrice}</span>`
            : /* html */ `<span class="${ID}-card-price">£${price}</span>`
        }
			</div>
			${promotionalText ? /* html */ `<p class="${ID}-card-promo">${promotionalText}</p>` : "" }

      <div class="${ID}-card-cta" objectid="${objectid}" sap="${sapCode}" btn-name="${title}">Add to basket</div>
    </div>
  `;

  return card;
};

export default product;