import shared from "../../../../../core-files/shared";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const renderSingleProductInfo = (options) => {
	const stickyATBContainer = document.querySelector(`.${ID}-stickyATB`);
	let imageSrc = options.productImage.getAttribute("src");
	if (!imageSrc) {
		imageSrc = document
			.querySelector(
				".media-gallery-wrapper .slick-track .media-gallery__image:first-child img.product-featured-img[src]"
			)
			?.getAttribute("src");
	}

	let content = "";

	if (
		options.stockAndDeliveryMessage
			.toLowerCase()
			.includes("order now for delivery")
	) {
		content = ` <div class="${ID}-left-info-price has-pre-order">
                        <span class="${ID}-nowPrice">${price}</span>
                        <span class="${ID}-pre-order">${options.stockAndDeliveryMessage}</span>
                    </div>`;
	} else if (options.discount) {
		content = ` <div class="${ID}-left-info-price">
                        <span class="${ID}-nowPrice">${options.price}</span>
                        <span class="${ID}-discount">${options.discount}</span>
                    </div>`;
	} else {
		content = ` <div class="${ID}-left-info-price">
                        <span class="${ID}-nowPrice">${options.wasPrice}</span>
                    </div>`;
	}

	const infoDom = `
        <div class="${ID}-left-image-container">
            <img src="${imageSrc}" alt="${options.productTitle}"/>
        </div>
        <div class="${ID}-left-info-container">
            <p class="${ID}-left-info-title">${options.productTitle}</p>
           ${content}
        </div>
    `;

	stickyATBContainer
		.querySelector(`.${ID}-stickyATB-col-left`)
		?.insertAdjacentHTML("afterbegin", infoDom);
};

export default renderSingleProductInfo;
