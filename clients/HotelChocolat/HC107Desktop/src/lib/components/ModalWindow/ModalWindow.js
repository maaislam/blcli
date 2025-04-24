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

	#renderData(data) {
		this.#removeLoader();
		console.log(data);
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
							this.isEdible
								? /* html */ `
							<details>
								<summary>
									Ingredients
									<span class="${ID}-accordion__cross"></span>
								</summary>
								<div class="${ID}-accordion__content pdp-main product-tabs" data-accordion-ingredients></div>
							</details>
						`
								: ""
						}
						${
							data.menu.length !== 0
								? /* html */ `
							<details open>
								<summary>
									Menu
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
						<!--<details>
							<summary>
								Reviews
								<span class="${ID}-accordion__cross"></span>
							</summary>
							<div class="${ID}-accordion__content" data-accordion-reviews></div>
						</details>-->
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

		const ingredientsBlock = modalContainer.querySelector(
			"[data-accordion-ingredients]"
		);

		if (ingredientsBlock) ingredientsBlock.append(data.ingredients);

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
