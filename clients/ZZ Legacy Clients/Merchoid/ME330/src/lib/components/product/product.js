import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function product(
  url,
  brand,
  title,
  image,
  price,
  oldPrice,
  fastSelling,
  filter
) {
  const root = document.createElement("li");
  root.classList.add(`${ID}-product`);
  root.setAttribute("data-filter", filter);
  root.innerHTML = /* html */ `
		<a href="${url}">
			<div class="${ID}-product__image-container">
				<img src="${image}" alt="${title}" />
			</div>
			<div class="${ID}-product__content-container">
			${
        fastSelling
          ? /* html */ `<span class="${ID}-product__selling-fast">Selling fast</span>`
          : ""
      }
				<h3 class="${ID}-product__heading">
					<span class="${ID}-product__heading-brand">${brand}:</span>
					<span class="${ID}-product__heading-title">${title}</span>
				</h3>
				<div class="${ID}-product__price-container">
					${
            oldPrice
              ? /* html */ `<span class="${ID}-product__old-price">${oldPrice}</span>`
              : ""
          }
					<span class="${ID}-product__price">${price}</span>
				</div>
			</div>
		</a>
	`;
  return root;
}
