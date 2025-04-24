/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import Progress from "./progress";

const { VARIATION, ID } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	const giftIcon = '<i class="icon-solid-gift"></i>';

	function getLocale() {
		switch (location.host) {
			case "www.neomorganics.com":
				return "uk";
			case "neomorganics.eu":
				return "eu";
			case "us.neomorganics.com":
				return "us";
			default:
				return "uk";
		}
	}

	const locale = getLocale();

	const content = {
		uk: {
			threshold: 40,
			currency: "£",
		},
		eu: {
			threshold: 80,
			currency: "€",
		},
		us: {
			threshold: 60,
			currency: "$",
		},
	};

	if (location.pathname === "/cart") {
		pollerLite(
			[
				"form[action='/cart'] .cart-items",
				".black-friday-promo-code",
				".black-friday-promo-button",
			],
			() => {
				const entry = document.querySelector(
					"form[action='/cart'] .cart-items"
				);
				const root = document.createElement("div");
				entry.insertAdjacentElement("afterbegin", root);

				const claimGiftCta = document.createElement("button");
				claimGiftCta.classList.add(`${ID}-success-cta`);
				claimGiftCta.innerText = "GET YOUR FREE GIFT NOW";
				claimGiftCta.insertAdjacentHTML("beforeend", giftIcon);
				claimGiftCta.addEventListener("click", () => {
					fireEvent("Get free gift CTA clicked (Basket)");
				});

				// eslint-disable-next-line no-inner-declarations
				function renderClaimGiftCta(el) {
					claimGiftCta.classList.remove("active");
					claimGiftCta.remove();

					el.insertAdjacentElement("beforeend", claimGiftCta);

					setTimeout(() => {
						claimGiftCta.classList.add("active");
					}, 1000);
				}

				function submitPromoCode() {
					const promoInput = document.querySelector(".black-friday-promo-code");
					const promoInputSubmit = document.querySelector(
						".black-friday-promo-button"
					);

					promoInput.value = "MAGIC";
					promoInputSubmit.click();
				}

				claimGiftCta.addEventListener("click", (e) => {
					e.preventDefault();
					submitPromoCode();
				});

				const ProgressEl = new Progress(
					root,
					`FREE Reed Diffuser when you spend ${content[locale].currency}${content[locale].threshold}`,
					false,
					{
						url: "/collections/black-friday-reed-diffuser",
						text: "See our Reed Diffusers",
					},
					"https://blcro.fra1.digitaloceanspaces.com/NE-606/ne606.png",
					0,
					content[locale].threshold,
					content[locale].currency,
					"away from a FREE GIFT",
					`Yippee! You get a FREE GIFT. Only 1 Free Gift can be in your ${
						locale === "us" ? "cart" : "basket"
					} at any time`,
					false,
					false,
					(el) => {
						// function basketHasGift() {
						// 	const basketItems = document.querySelectorAll(
						// 		".cart-items .item-title.content"
						// 	);

						// 	for (const item of basketItems) {
						// 		if (
						// 			item.querySelector("span.tag") &&
						// 			item.querySelector("span.tag").textContent.trim() ===
						// 				"Free Gift"
						// 		) {
						// 			return true;
						// 		}
						// 	}

						// 	return false;
						// }

						// if (!basketHasGift() && !document.referrer.includes("/cart")) {
						// 	submitPromoCode();
						// }

						renderClaimGiftCta(el);
					},
					false,
					500,
					true
				);

				const price = document.querySelector(".saso-cart-original-total");

				ProgressEl.updateValue(
					+price.textContent
						.replace(content[locale].currency, "")
						.replace(",", ".")
				);
			}
		);
	} else {
		pollerLite(
			[".mini-cart-items", ".mini-cart-footer .is-total span[rv-html]"],
			() => {
				const entry = document.querySelector(".mini-cart-items");
				const root = document.createElement("div");
				entry.insertAdjacentElement("afterbegin", root);

				const successCta = document.createElement("a");
				successCta.classList.add(`${ID}-success-cta`);
				successCta.href = "/cart";
				successCta.innerText = "GET YOUR FREE GIFT";
				successCta.insertAdjacentHTML("beforeend", giftIcon);
				successCta.addEventListener("click", () => {
					fireEvent("Get free gift CTA clicked (Mini Cart)");
				});

				// eslint-disable-next-line no-inner-declarations
				function renderSuccessCta(el) {
					successCta.classList.remove("active");
					successCta.remove();

					el.insertAdjacentElement("beforeend", successCta);

					setTimeout(() => {
						successCta.classList.add("active");
					}, 500);
				}

				const ProgressEl = new Progress(
					root,
					`FREE Reed Diffuser when you spend ${content[locale].currency}${content[locale].threshold}`,
					false,
					{
						url: "/collections/black-friday-reed-diffuser",
						text: "See our Reed Diffusers",
					},
					// "https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Happiness_Reed_Diffuser_Box_and_product_medium.jpg?v=1604330088",
					"https://blcro.fra1.digitaloceanspaces.com/NE-606/ne606.png",
					0,
					content[locale].threshold,
					content[locale].currency,
					"away from a FREE GIFT",
					`Yippee! Get your FREE GIFT in the ${
						locale === "us" ? "cart" : "basket"
					}`,
					false,
					false,
					(el) => {
						renderSuccessCta(el);
					},
					() => {
						successCta.remove();
					}
				);

				const price = document.querySelector(
					".mini-cart-footer .is-total span[rv-html]"
				);

				ProgressEl.updateValue(
					+price.textContent
						.replace(content[locale].currency, "")
						.replace(",", ".")
				);

				new MutationObserver(() => {
					setTimeout(
						() =>
							ProgressEl.updateValue(
								+price.textContent
									.replace(content[locale].currency, "")
									.replace(",", ".")
							),
						200
					);
				}).observe(price, {
					childList: true,
					subtree: true,
					attributes: true,
					characterData: true,
				});

				const cart = document.querySelector(".mini-cart");

				new MutationObserver(() => {
					if (cart.classList.contains("is-active")) {
						ProgressEl.refillBar(() => {
							if (document.querySelector(`.${ID}-success-cta`)) {
								document.querySelector(`.${ID}-success-cta`).remove();
							}
							setTimeout(
								() =>
									renderSuccessCta(
										ProgressEl.root.querySelector(`.${ID}-progress-bar`)
									),
								500
							);
						});
					} else {
						ProgressEl.emptyBar();
						if (document.querySelector(`.${ID}-success-cta`)) {
							document.querySelector(`.${ID}-success-cta`).remove();
						}
					}
				}).observe(cart, {
					attributes: true,
					attributeFilter: ["class"],
				});
			}
		);
	}

	// Tracking

	const progressEl = document.querySelector(`.${ID}-progress-bar`);
	if (progressEl) {
		const cta = progressEl.querySelector(`.${ID}-progress-bar__content-cta`);
		if (cta) {
			cta.addEventListener("click", () => {
				fireEvent("See our Reed Diffusers CTA clicked");
			});
		}
	}
};
