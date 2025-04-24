import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage } from "../../../../../lib/utils";
import { displaySlider } from "./display-slider.function";
import { getStorage, setStorage } from "./get-product-data.function";

const { ID } = shared;

/**
 * @param {string} price
 * @returns {string}
 */
const formatPrice = (price) => {
	let currencyCode = "£";

	if (document.querySelector(".spanCurrencyLanguageSelector > p")) {
		const currencyText = document.querySelector(
			".spanCurrencyLanguageSelector > p"
		).innerHTML;

		currencyCode = currencyText
			.substring(currencyText.indexOf(" "), currencyText.length)
			.trim();
	}

	const alteredPrice = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: currencyCode,
	}).format(price);

	return currencyCode == "EUR"
		? alteredPrice.replace(".", ",")
		: alteredPrice;
};

/**
 * @param {string} sku
 */
const onQuickBuyStorageChange = (sku) => {
	const storage = getStorage();
	const selectedProduct = storage.products[sku];
	const firstVariant = selectedProduct.variantsData[0];
	setStorage({
		...storage,
		modal: {
			active: { ...firstVariant, sku },
			variants: selectedProduct.variantsData.map((variant) => ({
				...variant,
				sku,
			})),
		},
	});
};

const onSizeButtonClick = () => {
	for (const sizeButton of document.querySelectorAll(
		`.${ID}-quick-buy-modal-select-size-single-size`
	)) {
		sizeButton.addEventListener("click", (e) => {
			e.preventDefault();

			const sizeVarId = e.target.dataset.sizevarid;

			// Change styles on chosen element
			document
				.querySelector(
					`.${ID}-quick-buy-modal-select-size-single-size.chosen-size`
				)
				?.classList.remove("chosen-size");
			document
				.querySelector(`[data-sizevarid='${sizeVarId}']`)
				?.classList.add("chosen-size");
		});
	}
};

export const populateCarousel = (items) => {
	// Create and insert HTML for each slot
	const htmlItemsToInsert = items.reduce(
		(acc, slot) =>
			acc +
			`
  <div data-product-sku="${
		slot.item.sku
  }" class="swiper-slide ${ID}-carousel-slide">
        
        <div class="${ID}-carousel-brand"><a href="/brand/${slot.item.brand
				.toLowerCase()
				.replaceAll(" ", "-")}" class="${ID}-product-brand">${
				slot.item.brand
			}</a></div>
        <div class="${ID}-carousel-content">
          <a href="${slot.item.url}" class="${ID}-carousel-image">
            <img src="${
				slot.item.image_url
			}" class="${ID}-carousel-image-element" alt="${
				slot.item.name
			} image" />
          </a>
          <div class="${ID}-carousel-product-info">
            <a href="${slot.item.url}">
            
            <p class="${ID}-product-name">${slot.item.name}</p>
            <p class="${ID}-prices ${
				slot.item.price == slot.item.ticket_price ||
				slot.item.ticket_price == "0.00"
					? "equal-prices"
					: ""
			}"><span class="now-price">${formatPrice(
				slot.item.price
			)}</span> <span class="was-price">${formatPrice(
				slot.item.ticket_price
			)}</span> </p> </a>
            <button data-sku=${
				slot.item.sku
			} class="${ID}-quick-buy-button"><span class="${ID}-atb-text">Add to Bag</span><svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.827 7.17096H0.822021V17.889H15.827V7.17096Z" stroke="#0000DA" stroke-miterlimit="10"/><path d="M4.85706 7.17097C4.85706 4.01897 6.37005 1.37097 8.25705 1.37097C10.1441 1.37097 11.6571 4.01897 11.6571 7.17097" stroke="#0000DA" stroke-miterlimit="10"/></svg></button></div>
      </div>
  </div>
`,
		""
	);

	// Get the carousel wrapper
	const carouselWrapper = document.querySelector(
		`#${ID}-recs-carousel-inner .swiper-wrapper`
	);

	carouselWrapper.insertAdjacentHTML("beforeend", htmlItemsToInsert);

	// On QUICK BUY click
	for (const button of document.querySelectorAll(`.${ID}-quick-buy-button`)) {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			fireEvent(
				`Click - customer clicks on 'add to bag' on item ${e.currentTarget.getAttribute(
					"data-sku"
				)}`
			);

			onQuickBuyStorageChange(e.currentTarget.dataset.sku);
			const storage = getStorage();

			// Main info about the product
			const selectedProduct =
				storage.products[e.currentTarget.dataset.sku];
			// Main info about the chosen color
			const activeVariant = storage.modal.active;
			// All avaiable variants
			const allVariants = storage.modal.variants;

			document.querySelector("body").insertAdjacentHTML(
				"beforeend",
				`
      <div class="${ID}-quick-buy-modal-wrapper ${
					e.currentTarget.dataset.sku
				}-modal">
        <div class="${ID}-quick-buy-modal-content">
          <svg class="x-close-button" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
            <g>
              <g>
                  <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                    L284.286,256.002z"/>
              </g>
            </g>
          </svg>
          <div class="${ID}-quick-buy-modal-img-holder">
            <img class="${ID}-quick-buy-modal-img" src="${
					activeVariant.imageUrl
				}"></img>
          </div>
          
          <div class="${ID}-quick-buy-modal-inner">
            <div class="${ID}-quick-buy-modal-text">
              <p class="${ID}-quick-buy-modal-text-name">${
					selectedProduct.brand
				} ${selectedProduct.name}</p>
              <p class="${ID}-quick-buy-modal-text-price">${
					activeVariant.prodVarPrices.sellPrice
				}${
					activeVariant.prodVarPrices.sellPrice !==
					activeVariant.prodVarPrices.refPrice
						? `<span>${activeVariant.prodVarPrices.refPrice}</span>`
						: ``
				}</p>
              <a class="${ID}-quick-buy-modal-text-view-details" href="${
					activeVariant.detailsUrl
				}">View full product details</a>
            </div>
            <div class="${ID}-quick-buy-modal-select-colour">
              <div class="${ID}-quick-buy-modal-select-colour-images ${
					allVariants.length > 1 ? "colours-displayed" : ""
				}">
                ${
					allVariants.length > 1
						? `
                <select name="${ID}-colour-dropdown" id="${ID}-colour-dropdown" class="${ID}-modal-dropdown">
                ${allVariants.reduce(
					(acc, currentVariant) =>
						acc +
						`
                    <option data-colvarid="${currentVariant.colVarId}">${currentVariant.colourName}</option>
                `,
					""
				)}
                </select>`
						: `<p class="${ID}-single-item">Colour: ${allVariants[0].colourName}</p>`
				}
              </div>
            </div>
            <div class="${ID}-quick-buy-modal-select-size">
              <div class="${ID}-quick-buy-modal-select-size-sizes ${
					activeVariant.sizeVariants.length > 1
						? "sizes-displayed"
						: ""
				}">
                ${
					activeVariant.sizeVariants.length > 1
						? `
                <select name="${ID}-size-dropdown" id="${ID}-size-dropdown" class="${ID}-modal-dropdown">
                ${activeVariant.sizeVariants.reduce(
					(acc, currentVariant) =>
						acc +
						`<option class="${ID}-quick-buy-modal-select-size-single-size" data-sizevarid="${currentVariant.sizeVarId}">${currentVariant.sizeName}</option>`,
					""
				)}
                </select><a class="${ID}-size-guide-link" href="https://help.houseoffraser.co.uk/en/support/articles/80000495593-size-guide" target="_blank">Size Guide</a>`
						: `<p class="${ID}-single-item" id="${ID}-single-size-item" data-size="${activeVariant.sizeVariants[0].sizeVarId}">Size: ${activeVariant.sizeVariants[0].sizeName}</p>`
				}
              </div>
            </div>
            <div class="${ID}-add-to-bag-container">
              <button class="${ID}-add-to-bag">ADD TO BAG</button>
            </div>
          </div>
        </div>
      </div>
      `
			);

			// Show slowly
			const modalElement = document.querySelector(
				`.${ID}-quick-buy-modal-wrapper`
			);

			setTimeout(() => {
				modalElement.classList.add("slowly-show");
			}, 50);

			// On X click
			document
				.querySelector(".x-close-button")
				.addEventListener("click", () => {
					modalElement.classList.add("slowly-hide");

					setTimeout(() => {
						modalElement.remove();
					}, 510);
				});

			// On change color
			if (document.getElementById(`${ID}-colour-dropdown`)) {
				let colorButton = document.getElementById(
					`${ID}-colour-dropdown`
				);
				colorButton.addEventListener("change", (e) => {
					const storage = getStorage();
					const colVarId =
						colorButton[colorButton.selectedIndex].getAttribute(
							"data-colvarid"
						);
					const allVariants = storage.modal.variants;
					const newActive = allVariants.find(
						(variant) => variant.colVarId === colVarId
					);

					// Change chosen image
					document.querySelector(`.${ID}-quick-buy-modal-img`).src =
						newActive.imageUrl;

					// Change chosen image on scroll
					document
						.querySelector(
							`.${ID}-quick-buy-modal-select-colour-images-single.chosen-img`
						)
						?.classList.remove("chosen-img");
					document
						.querySelector(`[data-colvarid='${colVarId}']`)
						?.classList.add("chosen-img");

					// Remove size buttons
					for (const sizeButton of document.querySelectorAll(
						`.${ID}-quick-buy-modal-select-size-single-size`
					))
						sizeButton.remove();

					// Add new size buttons
					document.querySelector(
						`.${ID}-quick-buy-modal-select-size-sizes`
					).innerHTML = "";
					document
						.querySelector(
							`.${ID}-quick-buy-modal-select-size-sizes`
						)
						.insertAdjacentHTML(
							"afterbegin",
							newActive.sizeVariants.length > 1
								? `
              <select name="${ID}-size-dropdown" id="${ID}-size-dropdown" class="${ID}-modal-dropdown">
              ${newActive.sizeVariants.reduce(
					(acc, currentVariant) =>
						acc +
						`<option class="${ID}-quick-buy-modal-select-size-single-size" data-sizevarid="${currentVariant.sizeVarId}">${currentVariant.sizeName}</option>`,
					""
				)}
              </select>`
								: `<p class="${ID}-single-item" data-size="${newActive.sizeVariants[0].sizeVarId}">Size: ${newActive.sizeVariants[0].sizeName}</p>`
						);
					// On change size
					onSizeButtonClick();
				});
			}

			// On change size
			onSizeButtonClick();

			// Add to bag functionality
			document
				.querySelector(`.${ID}-add-to-bag`)
				.addEventListener("click", (e) => {
					e.preventDefault();

					const dropdown = document.querySelector(
						`#${ID}-size-dropdown`
					);
					let chosenSize = "";
					if (dropdown) {
						chosenSize =
							dropdown[dropdown.selectedIndex].dataset.sizevarid;
					} else if (
						document.getElementById(`${ID}-single-size-item`)
					) {
						chosenSize = document
							.getElementById(`${ID}-single-size-item`)
							.getAttribute("data-size");
					} else {
						chosenSize = document
							.querySelector(
								`.${ID}-quick-buy-modal-select-size .${ID}-single-item`
							)
							.getAttribute("data-size");
					}

					if (!chosenSize) {
						document
							.querySelector(`.${ID}-quick-buy-modal-select-size`)
							?.classList.add("shake");

						setTimeout(() => {
							document
								.querySelector(".shake")
								?.classList.remove("shake");
						}, 1000);

						return;
					}

					const sizeVarId = chosenSize;

					const bagContent = [
						{
							sizeVariantId: sizeVarId,
							quantity: "1",
							personalisation: [],
							isProductRec: false,
						},
					];

					$.ajax({
						type: "POST",
						url: "/api/basket/v1/add",
						data: JSON.stringify(bagContent),
						dataType: "json",
						contentType: "application/json",
						xhrFields: {
							withCredentials: true,
						},
						success: function (data, error) {
							fireEvent(
								`Success - product sizeVarId: ${sizeVarId} added to basket.`
							);

							window.location.reload();
						},
					});
				});
		});
	}

	setTimeout(() => {
		displaySlider();
	}, 500);
};
