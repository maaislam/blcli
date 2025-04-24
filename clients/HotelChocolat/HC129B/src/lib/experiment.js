import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import VelvetiserSteps from "./components/stepMarkup";
import MainImageCarousel from "./components/imageCarousel";
import {
	addYTapi,
	elementInViewport,
	klarnaAdditon,
	makeActiveColour,
	reviewSmoothScroll,
	runYoutube,
} from "./helpers";
import options from "./components/options";
import pageChanges from "./components/pageChanges";
import uspCircles from "./components/uspCircles";
import ProductTabs from "./components/productTabs";
import stepLogic from "./stepLogic";
import { poller, pollerLite } from "../../../../../lib/utils";
import addedToBag from "./components/addedToBag";
import basketPage from "./components/basketPage";
import bottomContent from "./components/bottomContent";
import subscriptionPanel from "./components/subscriptionPanel";

export default () => {
	const { ID, VARIATION } = shared;
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-B37NQR1RWZ";

	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-B37NQR1RWZ";

	setup();

	fireEvent("Conditions Met");

	// if (VARIATION == "control") {
	// 	fireEvent(`User is part of the control`);
	// } else {
	// 	fireEvent(`User is part of the variation-${VARIATION}`);
	// }
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// pollerLite(["#mini-cart .mini-cart-wrapper"], () => {
	// 	const miniCart = document.querySelector(
	// 		"#mini-cart .mini-cart-wrapper"
	// 	);
	// 	miniCart.addEventListener("click", (e) => {
	// 		const target = e.target;
	// 		if (
	// 			target.closest("button[type='submit']") &&
	// 			target.closest(".mini-cart-product-remove")
	// 		) {
	// 			const sku = target
	// 				.closest("button[type='submit']")
	// 				.getAttribute("data-pid");
	// 			const name = target
	// 				.closest("tbody")
	// 				.querySelector(".item-details .name a")
	// 				?.textContent.trim();
	// 			fireEvent(
	// 				`Click - User removes item from basket: ${JSON.stringify({
	// 					name: name,
	// 					sku: sku,
	// 				})}`
	// 			);
	// 		}
	// 	});
	// });

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		//return;
	}

	// const wouldHaveSeen = (element, level) => {
	// 	pollerLite([element], () => {
	// 		var isFired = false;
	// 		if (!isFired) {
	// 			const targetDom = document.querySelector(element);
	// 			if (targetDom) {
	// 				var position = targetDom.getBoundingClientRect();
	// 				if (
	// 					position.top > 100 &&
	// 					position.bottom < window.innerHeight - 100
	// 				) {
	// 					fireEvent(`${level}`);
	// 					isFired = true;
	// 				}
	// 			}
	// 		}

	// 		document.addEventListener("scroll", (e) => {
	// 			if (!isFired) {
	// 				const targetDom = document.querySelector(element);

	// 				if (targetDom) {
	// 					var position = targetDom.getBoundingClientRect();
	// 					if (
	// 						position.top > 100 &&
	// 						position.bottom < window.innerHeight - 100
	// 					) {
	// 						fireEvent(`${level}`);
	// 						isFired = true;
	// 					}
	// 				}
	// 			}
	// 		});
	// 	});
	// };

	// if (window.location.href.includes("/choose-your-machine")) {
	// 	pollerLite(
	// 		[
	// 			`#main .steps_section .steps_description`,
	// 			`#main .configurator-container`,
	// 			`.dynamic-content-slot`,
	// 			`div.configurator-landing`,
	// 			`.right_container.visible #nextStep`,
	// 			`label[for^="sachets-"]`,
	// 			`div[step-id="refills"] input[name="quantity"]`,
	// 			`div[step-id="addons"] input[name="quantity"]`,
	// 		],
	// 		() => {
	// 			const configuratorLanding = document.querySelector(
	// 				`div.configurator-landing`
	// 			);
	// 			let step = window.location.href?.split("=")[1];
	// 			configuratorLanding.addEventListener("click", function (e) {
	// 				const target = e.target;
	// 				if (
	// 					target.matches(`.right_container.visible #nextStep`) ||
	// 					target.closest(`.right_container.visible #nextStep`)
	// 				) {
	// 					if (step == "Addons") {
	// 						fireEvent(
	// 							`User adds item to the bag from the subscriptions page`
	// 						);
	// 					}
	// 					step = window.location.href?.split("=")[1];
	// 				}
	// 			});
	// 		}
	// 	);
	// } else
	if (window.location.href.indexOf(".html") > -1) {
		document.documentElement.classList.add(`${ID}-velvetiser`);
		// Helpers
		addYTapi();
		klarnaAdditon();

		// New content
		new VelvetiserSteps();
		new MainImageCarousel();
		bottomContent();
		options();
		pageChanges();

		// pollerLite([".recommendations"], () => {
		// 	uspCircles();
		// });

		// if (window.innerWidth > 767) {

		// }
		new ProductTabs();

		// Logic
		stepLogic();
		runYoutube();
		reviewSmoothScroll();
		subscriptionPanel();
		// Once everything is loaded, preselect the colour
		// once colours loaded, select matching one
		const idOfCurrent = document.querySelector("#pid").value;
		makeActiveColour(idOfCurrent);

		// pollerLite([`.${ID}-topContent .${ID}-left a.${ID}-subLink`], () => {
		// 	const subLink = document.querySelector(
		// 		`.${ID}-topContent .${ID}-left a.${ID}-subLink`
		// 	);
		// 	subLink?.addEventListener("click", () => {
		// 		fireEvent(`Click - User clicks the Find Out More CTA`);
		// 	});
		// });
		// if (VARIATION == "control") {
		// 	wouldHaveSeen(
		// 		`.${ID}-accordionStep.${ID}-colours`,
		// 		`User would see the changes for V1 or V2`
		// 	);
		// } else if (VARIATION == 1) {
		// 	wouldHaveSeen(
		// 		`.${ID}-accordionStep.${ID}-kits`,
		// 		`User would see the changes for V2`
		// 	);
		// } else if (VARIATION == 2) {
		// 	wouldHaveSeen(
		// 		`.${ID}-accordionStep.${ID}-colours`,
		// 		`User would see the changes for V1`
		// 	);
		// }

		// After add to bag
		if (
			window.location.href.indexOf("?addtobasket=true") > -1 &&
			sessionStorage.getItem(`${ID}-productsAdded`)
		) {
			addedToBag();
		}
	} else {
		// Basket page
		basketPage();
		// pollerLite(["#primary .cart-items-form"], () => {
		// 	const miniCart = document.querySelector(
		// 		"#primary .cart-items-form"
		// 	);
		// 	miniCart.addEventListener("click", (e) => {
		// 		const target = e.target;
		// 		if (
		// 			target.closest("button.remove[type='submit']") &&
		// 			target.closest(".item-user-actions")
		// 		) {
		// 			const sku = target.closest("tr").getAttribute("data-pid");
		// 			const name = target
		// 				.closest("tr")
		// 				.querySelector(".item-details .parent-product-name")
		// 				?.textContent.trim();
		// 			fireEvent(
		// 				`Click - User removes item from basket: ${JSON.stringify(
		// 					{
		// 						name: name,
		// 						sku: sku,
		// 					}
		// 				)}`
		// 			);
		// 		}
		// 	});
		// });
		// pollerLite(["button[value='Checkout']"], () => {
		// 	const checkoutBtn = document.querySelectorAll(
		// 		"button[value='Checkout']"
		// 	);
		// 	checkoutBtn.forEach((btn) => {
		// 		btn.addEventListener("click", () => {
		// 			const cartTotal = document
		// 				.querySelector(
		// 					".cart-total .order-totals-table .order-total td:last-child"
		// 				)
		// 				?.textContent.trim();
		// 			fireEvent(
		// 				`Checkout - User clicks the Checkout button with basket value - ${cartTotal}`
		// 			);
		// 		});
		// 	});
		// });
		// pollerLite([".cart-total .paypal-cart-button .paypal-buttons"], () => {
		// 	let isFired = false;
		// 	const payPalOverlayObserver = new MutationObserver(
		// 		(mutationList, observer) => {
		// 			if (!isFired) {
		// 				if (
		// 					document.querySelector(".paypal-checkout-sandbox")
		// 				) {
		// 					const cartTotal = document
		// 						.querySelector(
		// 							".cart-total .order-totals-table .order-total td:last-child"
		// 						)
		// 						?.textContent.trim();
		// 					fireEvent(
		// 						`Checkout - User clicks the PayPal button with basket value - ${cartTotal}`
		// 					);
		// 					isFired = true;
		// 				}
		// 			} else if (
		// 				!document.querySelector(".paypal-checkout-sandbox")
		// 			) {
		// 				isFired = false;
		// 			}
		// 		}
		// 	);
		// 	payPalOverlayObserver.observe(document.body, {
		// 		childList: true,
		// 		subtree: true,
		// 	});
		// });

		// pollerLite(["#AmazonPayButtonCheckout"], () => {
		// 	const checkoutBtn = document.querySelector(
		// 		"#AmazonPayButtonCheckout"
		// 	);
		// 	checkoutBtn.addEventListener("click", () => {
		// 		const cartTotal = document
		// 			.querySelector(
		// 				".cart-total .order-totals-table .order-total td:last-child"
		// 			)
		// 			?.textContent.trim();
		// 		fireEvent(
		// 			`Checkout - User clicks the Amazon Pay button with basket value - ${cartTotal}`
		// 		);
		// 	});
		// });
	}
};
