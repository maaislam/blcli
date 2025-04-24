/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

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

	const TITLE = "You're better off with Specsavers";
	const ICON_COLOUR = "#222";

	const subheading = document.createElement("h2");
	subheading.classList.add(`${ID}-subheading`);
	subheading.textContent = TITLE;

	const root = document.createElement("div");
	root.className = `${ID}-root`;
	root.innerHTML = /* html */ `
		<div class="${ID}-container">
			<h2>${TITLE}</h2>
			<ul>
				<li data-icon="glasses">
					<a href="https://www.specsavers.co.uk/offers/complete-glasses-from-gbp19">
						<span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><circle cx="6.39795" cy="14.5" r="3.7" stroke="${ICON_COLOUR}" stroke-width="1.6"/><circle cx="17.5" cy="14.5" r="3.7" stroke="${ICON_COLOUR}" stroke-width="1.6"/><path d="M10 13c.4789-.6777 2.4082-1.8979 4 0" stroke="${ICON_COLOUR}" stroke-width="1.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2796 6.5c.5467 0 1.03.35531 1.1931.87716L22.2299 13H21.25c-.4142 0-.75.3358-.75.75s.3358.75.75.75h2c.2386 0 .4629-.1135.6043-.3057.1413-.1923.1827-.4403.1116-.668l-2.0615-6.59656C21.5457 5.78169 20.4824 5 19.2796 5H17.75c-.4142 0-.75.33579-.75.75s.3358.75.75.75h1.5296ZM4.72039 6.5c-.54673 0-1.03003.35531-1.1931.87716L1.77015 13h.97986c.41421 0-.25.3358-.25.75s.66421.75.25.75H.750006c-.238589 0-.462943-.1135-.604268-.3057-.14132484-.1923-.182757-.4403-.111592-.668L2.09557 6.92974C2.45434 5.78169 3.51758 5 4.72039 5h1.52962c.41421 0 .75.33579.75.75s-.33579.75-.75.75H4.72039Z" fill="${ICON_COLOUR}"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>
						</span>
						Complete glasses from £19
					</a>
				</li>
				<li data-icon="ticket">
					<a href="https://www.specsavers.co.uk/offers/2-for-1-glasses-from-gbp69">
						<span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m17.0288 4.39056.4857-.48438L14.6002.999917 1 14.5625l2.91432 2.9063.48572-.4844c.38647-.3854.91062-.6019 1.45717-.6019.54654 0 1.07069.2165 1.45716.6019.38646.3854.60357.9081.60357 1.4531 0 .5451-.21711 1.0678-.60357 1.4532l-.48572.4843 2.91432 2.9063L23.3431 9.71872l-2.9143-2.90627-.4857.48438c-.3865.3854-.9106.60191-1.4572.60191-.5465 0-1.0707-.21652-1.4571-.60191-.3865-.38539-.6036-.9081-.6036-1.45313s.2171-1.06774.6036-1.45314ZM13.6287 17.4688l-.9714.9687-.9714-.9687.9714-.9688.9714.9688Zm-1.9428-1.9375-.9715.9687-.97143-.9687.97143-.9688.9715.9688Zm-1.94293-1.9376-.97144.9688-.97144-.9688.97144-.9687.97144.9687Zm-1.94288-1.9375-.97144.9688-.97144-.9688.97144-.9687.97144.9687Z" fill="${ICON_COLOUR}"/></svg>
						</span>
						2 for 1 glasses & sunglasses
					</a>
				</li>
				<li data-icon="eye">
					<a href="https://www.specsavers.co.uk/offers/free-varifocal-lenses">
						<span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Z" fill="${ICON_COLOUR}"/></svg>
						</span>
						Free varifocal lenses
					</a>
				</li>
			</ul>
		</div>
	`;

	const entry = document.querySelector(
		"section.bg-mono-light.centered > .cta-btn-set"
	);
	entry.insertAdjacentElement("beforebegin", subheading);
	entry.insertAdjacentElement("afterend", root);

	entry.parentElement.classList.add(`${ID}-outer`);

	(function setupTracking() {
		const callToActionButtons = document.querySelectorAll(
			"section.bg-mono-light.centered .cta-btn-set a.cta-btn"
		);

		callToActionButtons.forEach((button) => {
			button.addEventListener("click", () => {
				fireEvent(`Click CTA - ${button.textContent}`);
			});
		});

		const offerLinks = root.querySelectorAll("a");
		offerLinks.forEach((link) =>
			link.addEventListener("click", (e) => {
				e.preventDefault();
				fireEvent(`Click Offer - ${link.textContent.trim()}`);
			})
		);
	})();
};
