import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import VelvetiserSteps from "./components/stepMarkup";
import MainImageCarousel from "./components/imageCarousel";
import { countdown } from "./../../../../../lib/uc-lib";
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
import { pollerLite } from "../../../../../lib/utils";
import addedToBag from "./components/addedToBag";
import basketPage from "./components/basketPage";
import bottomContent from "./components/bottomContent";

export default () => {
	const { ID, VARIATION } = shared;

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

		pollerLite([".recommendations"], () => {
			uspCircles();
		});

		if (window.innerWidth > 767) {
			new ProductTabs();
		}

		// Logic
		stepLogic();
		runYoutube();
		reviewSmoothScroll();

		// Once everything is loaded, preselect the colour
		// once colours loaded, select matching one
		const idOfCurrent = document.querySelector("#pid").value;
		makeActiveColour(idOfCurrent);

		// show add to bag on mobile once in view

		window.addEventListener("scroll", () => {
			const starterKits = document.querySelector(`.${ID}-kits`);
			if (elementInViewport(starterKits)) {
				document
					.querySelector(`.${ID}-addToBagMobile`)
					.classList.add("show");
			}
		});
		pollerLite([`.${ID}-topContent .${ID}-left a.${ID}-subLink`], () => {
			const subLink = document.querySelector(
				`.${ID}-topContent .${ID}-left a.${ID}-subLink`
			);
			subLink?.addEventListener("click", () => {
				fireEvent(`Click - User clicks the subscription box CTA`);
			});
		});
		pollerLite([`.${ID}-accordionSteps .${ID}-colours`], () => {
			const accordion = `<div class="${ID}-acc-container">
					<div class="acc">
						<div class="acc-head">
						<p><b>SAVE £15 today,</b> find out more</p>
						</div>
						<div class="acc-content">
						<p class="velvitiser-msg">
							Get your Velvetiser and Starter Kit for only <span class="large-font">*£94.95 <span style="text-decoration: line-through;">£109.95</span></span>. <br/>
							<span>Add both items to bag to redeem this offer.</span><br/>
							<span>SAVE £15. Limited time offer.</span>
						</p>
						<p>Use code <span class="text-bold">VELVKIT15OFF</span> at checkout.</p>
						<p>Offers end Sunday 18th September 2022</p>
						</div>
					</div>
              </div>`;
			accordion &&
				document
					.querySelector(`.${ID}-accordionSteps .${ID}-colours`)
					?.insertAdjacentHTML("beforebegin", accordion);

			$(`.${ID}-acc-container .acc-head`).on("click", function () {
				fireEvent(`Click - user interacts with the accordian`);
				if ($(this).hasClass("active")) {
					$(this).siblings(".acc-content").slideUp();
					$(this).removeClass("active");
				} else {
					$(".acc-content").slideUp();
					$(".acc-head").removeClass("active");
					$(this).siblings(".acc-content").slideToggle();
					$(this).toggleClass("active");
				}
			});
		});
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
	}
};
