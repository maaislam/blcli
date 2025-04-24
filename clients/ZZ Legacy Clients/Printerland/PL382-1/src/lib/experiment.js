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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	pollerLite(
		[`.category-results-container .category-result-container-banner`],
		() => {
			// Generate the DOM element

			if (!document.querySelector(`.${ID}-price-promise-bar`)) {
				const pricePromiseBar = `
				<div class="${ID}-price-promise-bar desktop-only">
					<div class="${ID}-price-promise-bar__inner">
						<img class="${ID}-bar-image" src="https://blcro.fra1.digitaloceanspaces.com/PL382/doller_small.svg" alt="Price Promise" />
						<div class="${ID}-price-promise-bar__text">
							<span>The Printerland Promise... </span> 
							<span>We Won't Be Beaten on Price!</span>
						</div>
						<div class="${ID}-price-promise-bar__cta"><a href="#">Find out more</a></div>
					</div>
				</div>
			`;

				const pricePromiseBarMobile = `
				<div class="${ID}-price-promise-bar mobile-only">
					<div class="${ID}-price-promise-bar__inner">
						<img class="${ID}-bar-image" src="https://blcro.fra1.digitaloceanspaces.com/PL382/doller_small.svg" alt="Price Promise" />
						<div class="${ID}-price-promise-bar__text">
							<span>The Printerland Promise... </span> 
							<span>We Won't Be Beaten on Price!</span>
						</div>
						<img class="${ID}-mobile-arrow" src="https://blcro.fra1.digitaloceanspaces.com/PL382/arrow-right.svg" alt="Price Promise" />
					</div>
				</div>
			`;

				const referenceDom = document.querySelector(
					`.category-results-container .category-result-container-banner #pnlSubDepartments`
				);

				const referenceDomFallBack1 = document.querySelector(
					`.category-results-container .category-result-container-banner .text-center .control-bar`
				);
				const referenceDomFallBack = document.querySelector(
					`.category-results-container .category-result-container-banner .text-center`
				);

				if (referenceDom) {
					referenceDom.insertAdjacentHTML(
						"beforebegin",
						pricePromiseBar
					);
					referenceDom.insertAdjacentHTML(
						"beforebegin",
						pricePromiseBarMobile
					);
					fireEvent(`Visible - User sees the price promise bar`);
				} else if (referenceDomFallBack1) {
					referenceDomFallBack1.insertAdjacentHTML(
						"beforebegin",
						pricePromiseBar
					);
					referenceDomFallBack1.insertAdjacentHTML(
						"beforebegin",
						pricePromiseBarMobile
					);
					fireEvent(`Visible - User sees the price promise bar`);
				} else if (referenceDomFallBack) {
					referenceDomFallBack.insertAdjacentHTML(
						"beforeend",
						pricePromiseBar
					);
					referenceDomFallBack.insertAdjacentHTML(
						"beforeend",
						pricePromiseBarMobile
					);
					fireEvent(`Visible - User sees the price promise bar`);
				}

				const pricePromiseModal = `
				<div class="${ID}-price-promise-modal">
					<div class="${ID}-price-promise-modal__inner">
						<div class="${ID}-price-promise-modal__header">
							<div class="${ID}-price-promise-modal__header__text">
								<span>The Printerland Promise... </span>
							</div>
							<div class="${ID}-price-promise-modal__header__close">
								<img src="https://blcro.fra1.digitaloceanspaces.com/PL382/Close.svg" alt="Close" />
							</div>
						</div>
						<div class="${ID}-price-promise-modal__body">
							<div class="${ID}-price-promise-modal__bar">
								<div class="${ID}-price-promise-modal__bar__heading">
									<img class="${ID}-modal-bar-image" src="https://blcro.fra1.digitaloceanspaces.com/PL382/doller_small.svg" alt="Price Promise" />
									<span>We Won't Be Beaten on Price!</span>
									<img class="${ID}-modal-bar-image" src="https://blcro.fra1.digitaloceanspaces.com/PL382/doller_small.svg" alt="Price Promise" />
								</div>

								<div class="${ID}-price-promise-modal__bar__subtext">
									We check our closest competitors every day to make sure you get the best deal possible!
								</div>
							</div>
							<div class="${ID}-price-promise-modal__promo">
								<div class="${ID}-price-promise-modal__promo__heading">
									<span>If you still find anyone cheaper, we'll match the price on request..</span>
									<span>Even on ink and toner cartridges!</span>
								</div>

								<div class="${ID}-price-promise-modal__promo__subtext">
									<span>To request a price match, call us on <a href="tel:0800 840 1992" class="${ID}-tel">0800 840 1992</a> or email us at <a href="mailto:sales@printerland.co.uk" class="${ID}-mailto">sales@printerland.co.uk</a></span>
								</div>
							</div>

							<div class="${ID}-price-promise-modal__features">
								<ul>
									<li>
										<i class="icon-checkmark"></i>
										<span>The competitor must have the identical product in stock and available immediately to the general public.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i> 
										<span>Offer does not include stock based outside of the UK.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>The competitors product price must include any charges for next day delivery.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>Offer does not apply to special order items, special offers, cash-backs, display models, clearance sales, refurbished printers, typographical errors and exclusive or limited quantity items.
										</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>Printerland cannot match the price where a manufacturer or distributor sells directly to the public.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>We reserve the right to verify or ask for written proof of a competitors offer before we beat the price.</span>
									</li>
									
									<li>
										<i class="icon-checkmark"></i>
										<span>The price promise cannot be used in conjunction with any other offer.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>Price matches must be agreed prior to the purchase being made.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>Any price match will be limited to one unit per customer within a 30 day period.</span>
									</li>

									<li>
										<i class="icon-checkmark"></i>
										<span>Where special offers provided by Printerland and/or the manufacturer applies, the competitor must also be providing the same offer/s for the price match to be valid.</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="${ID}-price-promise-modal__footer">
							<div class="${ID}-price-promise-modal__footer__item">
								<span class="modal__footer-check__icon"><i class="icon-checkmark"></i></span>
								<p>100% Genuine Manufacturer Cartridges</p>
							</div>
							<div class="${ID}-price-promise-modal__footer__item">
								<span class="modal__footer-check__icon"><i class="icon-checkmark"></i></span>
								<p>Return Unopened Cartridges Within 6 Months</p>
							</div>
							<div class="${ID}-price-promise-modal__footer__item">
								<span class="modal__footer-check__icon"><i class="icon-checkmark"></i></span>
								<p>FREE Next Day Delivery On Orders Overs £125 ex VAT*</p>
							</div>
							<div class="${ID}-price-promise-modal__footer__item">
								<span class="modal__footer-check__icon"><i class="icon-checkmark"></i></span>
								<p>Genuine Cartridges Protect Your Warranty</p>
							</div>
						</div>
					</div>
				</div>					
			`;

				const overlay = `<div class="${ID}-price-promise-modal__overlay"></div>`;

				// Create a div element
				document.body.insertAdjacentHTML(
					"beforeend",
					pricePromiseModal
				);
				document.body.insertAdjacentHTML("beforeend", overlay);

				pollerLite(
					[
						`.${ID}-price-promise-bar`,
						`.${ID}-price-promise-modal`,
						`.${ID}-price-promise-modal__overlay`,
					],
					() => {
						const windowHeight = window.innerHeight;

						const pricePromiseBarDesktop = document.querySelector(
							`.${ID}-price-promise-bar.desktop-only .${ID}-price-promise-bar__cta a`
						);
						const pricePromiseBarMobile = document.querySelector(
							`.${ID}-price-promise-bar.mobile-only`
						);

						const pricePromiseModal = document.querySelector(
							`.${ID}-price-promise-modal`
						);

						const pricePromiseModalClose = document.querySelector(
							`.${ID}-price-promise-modal .${ID}-price-promise-modal__header__close`
						);

						const pricePromiseModalOverlay = document.querySelector(
							`.${ID}-price-promise-modal__overlay`
						);

						pricePromiseModal.style.maxHeight = `${
							windowHeight - 60
						}px`;

						window.addEventListener("resize", () => {
							const windowHeight = window.innerHeight;
							pricePromiseModal.style.maxHeight = `${
								windowHeight - 60
							}px`;
						});

						pricePromiseBarDesktop.addEventListener(
							"click",
							(e) => {
								e.preventDefault();
								pricePromiseModal.classList.add("active");
								pricePromiseModalOverlay.classList.add(
									"active"
								);
								fireEvent(
									`Click - User opens the price promise modal`
								);
							},
							false
						);

						pricePromiseBarMobile.addEventListener(
							"click",
							() => {
								pricePromiseModal.classList.add("active");
								pricePromiseModalOverlay.classList.add(
									"active"
								);
								fireEvent(
									`Click - User opens the price promise modal`
								);
							},
							false
						);

						pricePromiseModalOverlay.addEventListener(
							"click",
							() => {
								pricePromiseModal.classList.remove("active");
								pricePromiseModalOverlay.classList.remove(
									"active"
								);
								fireEvent(
									`Click - User closes the price promise modal`
								);
							},
							false
						);
						pricePromiseModalClose.addEventListener(
							"click",
							() => {
								pricePromiseModal.classList.remove("active");
								pricePromiseModalOverlay.classList.remove(
									"active"
								);
								fireEvent(
									`Click - User closes the price promise modal`
								);
							},
							false
						);
					}
				);
			}
		}
	);
};
