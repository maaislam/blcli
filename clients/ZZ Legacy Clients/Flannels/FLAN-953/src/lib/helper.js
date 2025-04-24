import shared from "../../../../../core-files/shared";
const { ID, VARIATION } = shared;

const updateVisualData = (variantData, isSlider) => {
	const currentColourDom = document.querySelector(
		`#${ID}-divColour-inner #colourName`
	);
	const currentPriceDOM = document.querySelector(
		"#productDetails .product-detail__price #lblSellingPrice"
	);
	const prevPriceDOM = document.querySelector(
		"#productDetails .product-detail__price #TicketPriceDiv2"
	);

	currentColourDom.innerText = variantData[0].ColourName;
	currentPriceDOM.innerText = variantData[0].ProdVarPrices.SellPrice;

	if (variantData[0].ProdVarPrices.ShowRefPrice) {
		prevPriceDOM.querySelector("#lblTicketPrice").innerText =
			variantData[0].ProdVarPrices.RefPrice;
		prevPriceDOM.classList.remove("add-no-visibility");

		currentPriceDOM.classList.add("productHasRef");
		document
			.querySelector(
				"#productDetails .product-detail__price .discount-percentage-off"
			)
			.classList.remove("hide");
	} else {
		prevPriceDOM.querySelector("#lblTicketPrice").innerText =
			variantData[0].ProdVarPrices.RefPrice;
		prevPriceDOM.classList.add("add-no-visibility");

		currentPriceDOM.classList.remove("productHasRef");
		document
			.querySelector(
				"#productDetails .product-detail__price .discount-percentage-off"
			)
			.classList.add("hide");
	}

	if (!isSlider) {
		$(".productImageCarousel .productRollOverPanel")
			.removeClass("active")
			.addClass("hide");
		$(
			`.productImageCarousel #productRollOverPanel_${variantData[0].ColVarId}`
		)
			.removeClass("hide")
			.addClass("active");
	} else {
		productImageCarousel.initializeSwiper(
			variantData[0].ColVarId,
			productDetailVideo.getShowVideosInAltImages()
		);
	}
};
export const updateVerticalGellery = (selectedColurVariant) => {
	const VerticalGellery = document.querySelector(
		`.productImageCarousel #productRollOverPanel_${selectedColurVariant}`
	);
	const swiperWrapper = VerticalGellery.querySelector(".swiper-wrapper");
	const swiperSlides = swiperWrapper.querySelectorAll("a.zoomMainImage");
	if (!swiperWrapper.querySelector("a.viewMoreNumber")) {
		let viewMoreNumber;
		if (swiperSlides.length > 3) {
			viewMoreNumber = document.createElement("a");
			if (swiperSlides.length > 5) {
				viewMoreNumber.insertAdjacentHTML(
					"afterbegin",
					`<span>+${swiperSlides.length - 5}</span>`
				);
			} else {
				viewMoreNumber.insertAdjacentHTML(
					"afterbegin",
					`<span>+${swiperSlides.length - 3}</span>`
				);
			}

			viewMoreNumber.classList.add("viewMoreNumber");
			viewMoreNumber.addEventListener("click", () => {
				fireEvent(
					`Interaction - User clicks on view more tiles to open the full gallery`
				);
			});
		}

		if (swiperSlides.length > 0) {
			swiperSlides.forEach((slide, index) => {
				const anchor = slide;
				const img = anchor.querySelector("img");

				if (swiperSlides.length > 5 && index > 4) {
					anchor.classList.add("viewMoreHide");
					if (index <= 8) {
						viewMoreNumber.insertAdjacentHTML(
							"beforeend",
							`<img class="viewMoreImageGrid" src="${
								img.src
							}" alt="${img.getAttribute("alt")}">`
						);
					}
				} else if (
					swiperSlides.length > 3 &&
					swiperSlides.length <= 5 &&
					index > 2
				) {
					anchor.classList.add("viewMoreHide");
					if (index <= 4) {
						viewMoreNumber.insertAdjacentHTML(
							"beforeend",
							`<img class="viewMoreImageGrid" src="${
								img.src
							}" alt="${img.getAttribute("alt")}">`
						);
					}
				}
			});
			if (viewMoreNumber) {
				swiperWrapper.appendChild(viewMoreNumber);
			}
		}
	}
};

export const changeColourVariantImageOnHover = (element, isHover, isSlider) => {
	var hoverColourVariantId = element.attr("data-value"),
		selectedColourVariantId =
			$(element).parent().find("li.selected").attr("data-value") ||
			$("span.ProductDetailsVariants").attr("data-selectedcolour");

	const colorVariantsData = productDetailsShared.getColourVariants();

	const selectedColorVariantData = colorVariantsData.filter((item) => {
		return item.ColVarId === selectedColourVariantId;
	});

	const hoverColourVariantData = colorVariantsData.filter((item) => {
		return item.ColVarId === hoverColourVariantId;
	});

	if (hoverColourVariantId !== selectedColourVariantId) {
		if (isHover) {
			updateVisualData(hoverColourVariantData, isSlider);
			updateVerticalGellery(hoverColourVariantId);
		} else {
			updateVisualData(selectedColorVariantData, isSlider);
		}
	}
};
