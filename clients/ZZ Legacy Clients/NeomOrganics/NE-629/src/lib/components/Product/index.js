import shared from '../../../../../../../core-files/shared';

export default function Product(url, range, name, price, images, oldPrice, productId) {
  const { ID } = shared;
  const element = document.createElement('div');
  element.classList.add(`${ID}-product`);

  element.innerHTML = /* html */ `
	<div class="${ID}-product-new-tag">New</div>
	<a href="${url}" class="${ID}-product-image-slider splide" role="group">
		<div class="splide__track">
			<ul class="splide__list">
				${images.map((i) => `<li class="splide__slide"><img src="${i}" alt="${name}" /></li>`).join('')}
			</ul>
		</div>
	</a>
	<a class="${ID}-product-content" href="${url}">
		<p class="${ID}-product-content-range">${range}</p>
		<h2 class="${ID}-product-content-name">${name}</h2>
		<p class="${ID}-product-content-price">
			${oldPrice ? `<span>${oldPrice}</span>` : ''} ${price}
		</p>
	</a>
	<button class="${ID}-product-content-cta button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold" data-product-id="${productId}">Add to bag</button>
	`;

  const addToCardButton = element.querySelector(`.${ID}-product-content-cta`);
  addToCardButton.onclick = () => window.CartJS.addItem(productId);

  return element;
}
