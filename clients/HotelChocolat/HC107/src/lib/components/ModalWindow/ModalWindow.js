import shared from "../../../../../../../core-files/shared";
import Loader from "../Loader/Loader";
import Accordion from "../Accordion/Accordion";
import Splide from "@splidejs/splide";
import { fireEvent } from "../../../../../../../core-files/services";
import { pollerLite } from "../../../../../../../lib/utils";

const { ID } = shared;

const nonEdibleItems = [
	"velvetiser-hot-chocolate-maker",
	"platinum-velvetiser",
	"velvetiser-hot-chocolate-machine",
	"velvetiser-hot-chocolate-pack",
	"podster",
	"podcycler",
	"gift-card",
	"restaurant-gift-card",
	"bean-to-bar-gift-card",
	"velvetiser-gift-card",
	"meaning-of-chocolate-book",
	"anatomy-bag-for-life",
	"grey-more-cocoa-less-sugar-bag",
	"plain-chocolate-factory-bag",
	"white-pod-bag",
	"piton-plain-bag-for-life",
	"more-cocoa-bag-for-life",
	"piton-bag-for-life",
	"spark-coffee-cup",
	"chat-coffee-cup",
	"petit-pod-cups",
	"hug-coffee-cup",
	"pod-cups-duo",
	"bean-to-bar",
	"childrens-chocolate-workshops",
	"secret-events",
	"chocolate-tasting-adventure",
	"virtual-tasting-experience",
	"472727",
	"472809",
	"472726",
	"472725",
	"472791",
	"472790",
	"356665",
	"356668",
	"356669",
	"358179",
	"503579",
	"170038",
	"170036",
	"170034",
	"170035",
	"170037",
	"170033",
	"170039",
	"472806",
	"472804",
	"472788",
	"472805",
	"472789",
	"582981",
];
class ModalWindow {
	constructor(onClose) {
		this.el = document.createElement("div");
		this.loader = Loader();
		this.onClose = onClose;
		this.isEdible = false;
		this.#init();
	}

	#init() {
		this.el.classList.add(`${ID}-modal`);
		this.el.innerHTML = /* html */ `
			<div class="${ID}-modal__outer">
				<div class="${ID}-modal__inner">
					<button class="${ID}-modal__close">
						<span>Close modal</span>
					</button>
					<div class="${ID}-modal__container"></div>
				</div>
			</div>
		`;

		const modalContainer = this.el.querySelector(`.${ID}-modal__container`);
		modalContainer.append(this.loader);

		const closeButton = this.el.querySelector(`.${ID}-modal__close`);
		closeButton.addEventListener("click", () => {
			this.onClose();
			this.el.remove();
		});

		const modalBackdrop = this.el.querySelector(`.${ID}-modal__outer`);
		modalBackdrop.addEventListener("click", () => {
			this.onClose();
			this.el.remove();
		});

		const modalInner = this.el.querySelector(`.${ID}-modal__inner`);
		modalInner.addEventListener("click", (e) => e.stopPropagation());
	}

	#checkEdible(string) {
		const str = string.match("uk/(.*).html")[1];

		if (nonEdibleItems.includes(str)) {
			this.isEdible = false;
		} else {
			this.isEdible = true;
		}
	}

	#removeLoader() {
		this.loader.remove();
	}

	#renderSleeveData(imageUrl) {
		let sleeveData = (sleeveData = Array.from(
			document.querySelectorAll(
				"#QuickViewDialog #product-detail-wrapper #pdpMain .product-variations .sleeveContent ul li"
			)
		));
		let imageSrc = document
			.querySelector(
				"#QuickViewDialog #product-detail-wrapper #pdpMain .product-image-container img.primary-image"
			)
			.getAttribute("src");

		document.querySelector(`.${ID}-modal__hero-image img`).src = imageSrc;

		if (sleeveData.length > 0) {
			for (let index = 0; index < sleeveData.length; index++) {
				if (
					sleeveData[index]
						.querySelector("span.value")
						.textContent.trim()
						.toLowerCase() === "NoSleeveNew".toLowerCase()
				) {
					sleeveData[index]
						.querySelector(".col-1 img")
						.setAttribute("src", imageUrl);
					let value = sleeveData[index];
					sleeveData.splice(index, 1);
					sleeveData.unshift(value);
					break;
				}
			}
		}
		const currentSleeve = document.querySelectorAll(
			`.${ID}-sleeve-splide .splide__list li`
		);

		if (currentSleeve.length !== 0) {
			console.log(currentSleeve);
			currentSleeve.forEach((sleeve, index) => {
				console.log($(sleeve));
				$(sleeve).off("click");
				$(sleeve).on("click", () => {
					$(`.${ID}-sleeve-splide .splide__slide`).removeClass(
						"active"
					);
					sleeve.classList.add("active");
					sleeveData[index].querySelector("button.sleeveBtn").click();
				});
			});
		} else {
			if (sleeveData.length !== 0) {
				const sleeveSlider = new Splide(`.${ID}-sleeve-splide`, {
					perPage: 4,
					mediaQuery: "min",
					pagination: false,
					padding: "1.5rem",
					gap: "10px",
					breakpoints: {
						480: {
							perPage: 2,
						},
						768: {
							perPage: 2,
						},
						1024: {
							perPage: 4,
						},
					},
				});
				sleeveSlider.mount();
				sleeveData.forEach((sleeve, index) => {
					let title = null;

					if (index === 0) {
						title = "No Sleeve";
					} else {
						title = sleeve
							.querySelector(".col-2 h4")
							.textContent.replace("With ", "")
							.replace(" Sleeve", "")
							.replace(" sleeve", "")
							.replace("with ", "")
							.trim();
					}

					const el = document.createElement("li");
					el.classList.add("splide__slide");
					if (
						sleeve
							.querySelector("button.sleeveBtn")
							.classList.contains("active")
					) {
						el.classList.add("active");
					}
					el.innerHTML = /* html */ `
						<div class="${ID}-menu-item">
							<div class="${ID}-menu-item__image">
								<img src="${sleeve
									.querySelector(".col-1 img")
									.getAttribute("src")}" alt="${sleeve
						.querySelector(".col-2 h4")
						.textContent.trim()}">
							</div>
							<h4 class="${ID}-menu-item__title">${title}</h4>
						</div>
					`;
					// el.addEventListener("click", () => {
					// 	$(`.${ID}-sleeve-splide .splide__slide`).removeClass(
					// 		"active"
					// 	);
					// 	el.classList.add("active");
					// 	sleeve.querySelector("button.sleeveBtn").click();
					// });
					$(el).on("click", function () {
						$(`.${ID}-sleeve-splide .splide__slide`).removeClass(
							"active"
						);
						el.classList.add("active");
						sleeve.querySelector("button.sleeveBtn").click();
					});
					sleeveSlider.add(el);
				});
			}
		}

		// const allArrows = document.querySelectorAll(".splide__arrow");
		// const config = { attributes: true, childList: true, subtree: true };
		// allArrows.forEach((arrow) => {
		// 	const arrowType = arrow.getAttribute("aria-label").split(" ")[0];
		// 	if (arrow.disabled === true) {
		// 		arrow
		// 			.closest(".splide.is-initialized")
		// 			.classList.add(`${arrowType}-disabled`);
		// 	} else {
		// 		arrow
		// 			.closest(".splide.is-initialized")
		// 			.classList.remove(`${arrowType}-disabled`);
		// 	}
		// 	const observer = new MutationObserver((mutationList, observer) => {
		// 		const arrowType = arrow
		// 			.getAttribute("aria-label")
		// 			.split(" ")[0];
		// 		if (arrow.disabled === true) {
		// 			arrow
		// 				.closest(".splide.is-initialized")
		// 				.classList.add(`${arrowType}-disabled`);
		// 		} else {
		// 			arrow
		// 				.closest(".splide.is-initialized")
		// 				.classList.remove(`${arrowType}-disabled`);
		// 		}
		// 	});
		// 	observer.observe(arrow, config);
		// });
	}

	#renderData(data) {
		this.#removeLoader();
		const isSleeveAvailable = document.querySelector(
			"#QuickViewDialog #product-detail-wrapper #pdpMain .product-variations"
		);
		const imageUrl = document
			.querySelector(
				"#QuickViewDialog #product-detail-wrapper #pdpMain .product-image-container img.primary-image"
			)
			.getAttribute("src");
		let sleeveData = null;
		if (isSleeveAvailable) {
			sleeveData = Array.from(
				document.querySelectorAll(
					"#QuickViewDialog #product-detail-wrapper #pdpMain .product-variations .sleeveContent ul li"
				)
			);
		}
		console.log(data.pid);

		// fetch(
		// 	`https://c7.ugc.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=f4YaIN4UP2JX9D6zBomdEmtMe&Filter=ProductId:${data.pid}&Sort=Rating:positive&Limit=10`
		// )
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 	});

		// $.getJSON(
		// 	`https://c7.ugc.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=f4YaIN4UP2JX9D6zBomdEmtMe&Filter=ProductId:${data.pid}&Sort=Rating:positive&Limit=10&callback=?`,
		// 	function (data) {
		// 		console.log(data);
		// 	}
		// );

		// $.getJSON(
		// 	"https://c7.ugc.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=f4YaIN4UP2JX9D6zBomdEmtMe&callback=?",
		// 	function (data) {
		// 		console.log(data);
		// 	}
		// );
		$.getJSON(
			"https://stg.api.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=kuy3zj9pr3n7i0wxajrzj04xo&callback=?",
			function (data) {
				console.log("Bazaar VOice", data);
			}
		);

		const modalContainer = this.el.querySelector(`.${ID}-modal__container`);

		modalContainer.insertAdjacentHTML(
			"beforeend",
			/* html */ `
				<div class="${ID}-modal__hero-container">
					<div class="${ID}-modal__hero-heading">
						<h2>${data.title}</h2>
						<p>${data.subtitle}</p>
						<div class="${ID}-modal__hero-image">
							<img src="${data.image}" alt="${data.title}">
						</div>
					</div>
				</div>
				<div class="${ID}-modal__info-container">
					<div class="${ID}-modal__info-container-inner">
						<details open>
							<summary>
								Description
								<span class="${ID}-accordion__cross"></span>
							</summary>
							<div class="${ID}-accordion__content">
								<p>${data.description}</p>
								<a class="${ID}-ghost-button" href="${
				data.url
			}" data-view-full-details>View full details</a>
							</div>
						</details>



						${
							isSleeveAvailable && sleeveData.length !== 0
								? /* html */ `
							<details>
								<summary>
									Free gifting sleeve
									<span class="${ID}-accordion__cross"></span>
								</summary>
								<div class="${ID}-accordion__content" data-accordion-menu>
									<div class="splide ${ID}-sleeve-splide">
										<div class="splide__track">
											<ul class="splide__list">
											</ul>
										</div>
									</div>
								</div>
							</details>
						`
								: ""
						}
						${
							data.menu.length !== 0
								? /* html */ `
							<details>
								<summary>
									<span class="accordion-heading">What's in the box?</span>
									<span class="${ID}-accordion__cross"></span>
								</summary>
								<div class="${ID}-accordion__content" data-accordion-menu>
									<div class="splide ${ID}-menu-splide">
										<div class="splide__track">
											<ul class="splide__list">
											</ul>
										</div>
									</div>
								</div>
							</details>
						`
								: ""
						}
						
						<details>
							<summary>
								Delivery & Gifting
								<span class="${ID}-accordion__cross"></span>
							</summary>
							<div class="${ID}-accordion__content" data-accordion-delivery>
								<div class="${ID}-accordion__content-delivery-grid">
									<div class="${ID}-accordion__content-delivery-card">
										<div class="${ID}-accordion__content-delivery-icon" data-message></div>
										<div class="${ID}-accordion__content-delivery-content">
											<h5>Add a Gift card</h5>
											<p>Write a Personalised message for FREE in checkout</p>
										</div>
									</div>
									<div class="${ID}-accordion__content-delivery-card">
										<div class="${ID}-accordion__content-delivery-icon" data-gift></div>
										<div class="${ID}-accordion__content-delivery-content">
											<h5>Wrap it up</h5>
											<p>Add a gift bag or box in checkout</p>
										</div>
									</div>
									<div class="${ID}-accordion__content-delivery-card">
										<div class="${ID}-accordion__content-delivery-icon" data-delivery></div>
										<div class="${ID}-accordion__content-delivery-content">
											<h5>UK delivery Available</h5>
											<p>Standard, next day and nominated day delivery options available</p>
										</div>
									</div>
									<div class="${ID}-accordion__content-delivery-card">
										<div class="${ID}-accordion__content-delivery-icon" data-collect></div>
										<div class="${ID}-accordion__content-delivery-content">
											<h5>Click & Collect</h5>
											<p>Available from over 100 locations</p>
										</div>
									</div>
								</div>
							</div>
						</details>
					</div>
					${
						data.price != null
							? /* html */ `
						<div class="${ID}-modal__info-container-basket">
							<div class="${ID}-modal__info-container-basket-price"></div>
							<div class="${ID}-modal__info-container-basket-actions">
								<div class="${ID}-modal__info-container-basket-quantity">
									<button data-modal-add-qty>-</button>
									<span data-modal-qty>1</span>
									<button data-modal-subtract-qty>+</button>
								</div>
								<div class="${ID}-modal__info-container-basket-cta">
									<button>Add to basket</button>
								</div>
							</div>
						</div>
					`
							: ""
					}
				</div>
			`
		);

		const accordionTabs = modalContainer.querySelectorAll("details");
		accordionTabs.forEach((el) => new Accordion(el));

		// const ingredientsBlock = modalContainer.querySelector(
		// 	"[data-accordion-ingredients]"
		// );

		if (isSleeveAvailable && sleeveData.length !== 0) {
			this.#renderSleeveData(imageUrl);
			const quickViewDialog = document.querySelector(
				"#QuickViewDialog #product-detail-wrapper"
			);
			const config = {
				attributes: true,
				childList: true,
				subtree: false,
			};
			const quickViewObserver = new MutationObserver(
				(mutationsList, observer) => {
					observer.disconnect();
					this.#renderSleeveData(imageUrl);
					quickViewObserver.observe(quickViewDialog, config);
				}
			);
			quickViewObserver.observe(quickViewDialog, config);
		}
		// if (ingredientsBlock) ingredientsBlock.append(data.ingredients);

		if (data.menu.length !== 0) {
			const menuSlider = new Splide(`.${ID}-menu-splide`, {
				perPage: 3,
				mediaQuery: "min",
				pagination: false,
				padding: "1.5rem",
				gap: "1rem",
				breakpoints: {
					480: {
						perPage: 4,
					},
					1024: {
						perPage: 5,
					},
				},
			});
			menuSlider.mount();

			data.menu.forEach((item) => {
				const el = document.createElement("li");
				el.classList.add("splide__slide");
				el.innerHTML = /* html */ `
					<div class="${ID}-menu-item">
						<div class="${ID}-menu-item__image">
							<img src="${item.image}" alt="${item.title}">
						</div>
						<h4 class="${ID}-menu-item__title">${item.title}</h4>
					</div>
				`;

				menuSlider.add(el);
			});
		}

		const priceBlock = modalContainer.querySelector(
			`.${ID}-modal__info-container-basket-price`
		);
		if (priceBlock) priceBlock.append(data.price);

		const OGaddToBasketButton =
			document.querySelector("#QuickViewDialog #pdpMain #add-to-cart") ||
			document.querySelector(
				"#QuickViewDialog #pdpMain button.add-to-cart"
			);
		const addToBasketButton = modalContainer.querySelector(
			`.${ID}-modal__info-container-basket-cta button`
		);

		if (addToBasketButton) {
			addToBasketButton.addEventListener("click", () => {
				if (
					document.querySelector(
						"#QuickViewDialog #pdpMain div.HC089-ageCheck"
					)
				) {
					document
						.querySelector(
							"#QuickViewDialog #pdpMain div.HC089-ageCheck"
						)
						?.click();

					pollerLite([".HC089-ageBox div.HC089-button"], () => {
						document
							.querySelector(".HC089-ageBox div.HC089-button")
							.addEventListener("click", () => {
								this.onClose();
								this.el.remove();
							});
					});
				} else {
					OGaddToBasketButton.click();
					this.onClose();
					this.el.remove();
				}
			});

			const addQuantityButton = modalContainer.querySelector(
				"[data-modal-add-qty]"
			);
			const OGaddQuantityButton = document.querySelector(
				'#QuickViewDialog #pdpMain .inventory .quantity button.btn-number[data-type="minus"]'
			);
			const subtractQuantityButton = modalContainer.querySelector(
				"[data-modal-subtract-qty]"
			);
			const OGsubtractQuantityButton = document.querySelector(
				'#QuickViewDialog #pdpMain .inventory .quantity button.btn-number[data-type="plus"]'
			);
			const quantityDisplay =
				modalContainer.querySelector("[data-modal-qty]");
			const OGquantity = document.querySelector(
				"#QuickViewDialog #pdpMain .inventory .quantity .input-group-qty"
			);

			addQuantityButton.addEventListener("click", () => {
				OGaddQuantityButton.click();
				quantityDisplay.textContent = OGquantity.value;
			});

			subtractQuantityButton.addEventListener("click", () => {
				OGsubtractQuantityButton.click();
				quantityDisplay.textContent = OGquantity.value;
			});
		}

		// Tracking
		modalContainer
			.querySelector("[data-view-full-details]")
			.addEventListener("click", () =>
				fireEvent("View full details CTA clicked")
			);

		if (addToBasketButton) {
			addToBasketButton.addEventListener("click", () =>
				fireEvent("Add to basket CTA clicked")
			);
		}

		accordionTabs.forEach((tab) => {
			tab.querySelector("summary").addEventListener("click", (e) => {
				fireEvent(
					`${e.target.textContent.trim()} accordion item clicked`
				);
			});
		});
	}

	set productData(d) {
		this.#checkEdible(d.url);
		this.#renderData(d);
	}
}

export default ModalWindow;
