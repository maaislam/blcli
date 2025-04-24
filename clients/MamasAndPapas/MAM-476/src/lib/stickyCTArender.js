import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const stickyCTARender = (options) => {
	const observerOptions = {
		childList: true,
		attributes: true,
		subtree: true,
	};
	const stickyATBContainer = document.querySelector(`.${ID}-stickyATB`);
	const duplicateStickyCTA = options.atbCta.cloneNode(true);
	duplicateStickyCTA.classList.remove("product-form__cart-submit");
	duplicateStickyCTA.addEventListener("click", (e) => {
		fireEvent(`User clicks on sticky add to bag button`);
		options.atbCta.click();
	});

	stickyATBContainer
		.querySelector(`.${ID}-stickyATB-col-right`)
		.append(duplicateStickyCTA);

	const atbCtaObserver = new MutationObserver((mutationsList, observer) => {
		observer.disconnect();
		duplicateStickyCTA.innerHTML = options.atbCta.innerHTML;
		duplicateStickyCTA.setAttribute(
			"aria-label",
			options.atbCta.getAttribute("aria-label")
		);
		if (!options.atbCta.getAttribute("disabled")) {
			duplicateStickyCTA.removeAttribute("disabled");
		}
		if (!options.atbCta.getAttribute("aria-disabled")) {
			duplicateStickyCTA.removeAttribute("aria-disabled");
		}
		observer.observe(options.atbCta, observerOptions);
	});
	atbCtaObserver.observe(options.atbCta, observerOptions);
};

export default stickyCTARender;
