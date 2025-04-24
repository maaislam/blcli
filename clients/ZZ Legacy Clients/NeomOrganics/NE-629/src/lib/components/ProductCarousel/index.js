import shared from '../../../../../../../core-files/shared';

export default function ProductCarousel(products) {
	const { ID } = shared;
	const element = document.createElement('div');
	element.classList.add(`${ID}-product-carousel`);
	const priceData = window[`${ID}__data`];

	const formatPrice = (amount, code = 'en-US', currency = 'USD') =>
		new Intl.NumberFormat(code, {
			style: 'currency',
			currency
		}).format(amount / 100);

	element.innerHTML = /* html */ `
	<h2>Perfectly Paired With...</h2>
	<div class="splide" role="group">
		<div class="splide__track">
			<ul class="splide__list">
				${products
			.map(
				(p, index) => {
					const price = priceData[index].price;
					const oldPrice = priceData[index].compare_at_price;
					const imageSrc = priceData[index].featured_image;
					const priceText = formatPrice(price);
					const oldPriceText = formatPrice(oldPrice);
					// const decimalConversion = price % 100 === 0 ? 0 : 2;
					// const formattedPrice = (price / 100).toFixed(decimalConversion);
					// const currency = p.price.match(/[^\d.,]+/);

					return `
				<li class="${ID}-product-carousel-product splide__slide">
					<a href="${p.url}">
						<div class="${ID}-product-carousel-product-image-container">
							<img src="${imageSrc}" alt="${p.name}" />
						</div>
						<div class="${ID}-product-carousel-product-content">
							<p class="${ID}-product-carousel-product-range">${p.range}</p>
							<h2 class="${ID}-product-carousel-product-name">${p.name}</h2>
							<p class="${ID}-product-carousel-product-price">
								${oldPrice ? `<span>${oldPriceText}</span>` : ''} ${priceText}
							</p>
						</div>
					</a>
					<button class="${ID}-product-carousel-product-cta button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold" data-product-id="${p.productId}">Add to bag</button>
				</li>
				`;
				}
			)
			.join('')}
			</ul>
		</div>
	</div>
	`;

	element.querySelectorAll(`.${ID}-product-carousel-product-cta`).forEach(
		(button) =>
		(button.onclick = () => {
			const productId = button.dataset.productId;
			window.CartJS.addItem(productId);
		})
	);

	return element;
}
