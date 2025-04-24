import shared from "../../../../../../core-files/shared";
// import { pollerLite } from "../../../../../../lib/utils";

const { ID } = shared;

export default () => {
	// Page title
	// const pageTitle = document.querySelector("#main h1");
	// if (pageTitle) {
	//   pageTitle.textContent = 'The Velvetiser Hot Chocolate Maker';
	// }

	// change into text
	const introText = document.querySelector("#page_heading h3");
	if (introText) {
		introText.textContent =
			"Become a VIP.ME member for access to exclusive benefits including the Velvetiser at a special member price.";
	}

	// move price
	const price = document.querySelector(".price-wrapper");
	if (price) {
		price.insertAdjacentHTML(
			`beforeend`,
			`<div class="${ID}-delivery">FREE delivery</div>`
		);
	}

	// move qty
	const inStockMessage = document.querySelector(".availability-block");
	if (inStockMessage) {
		const qty = document.querySelector(".inventory");
		qty.insertAdjacentElement("beforeend", inStockMessage);
	}

	// add new CTA
	const addBtn = `<div class="${ID}-add">Add to bag</a>`;
	document.querySelector(".inventory").insertAdjacentHTML("afterend", addBtn);

	// move reviews
	const reviews = document.querySelector(
		".product-review-links.product-review-links-top"
	);
	const reviewRating = reviews.querySelector(".bv-rating span");
	if (reviews) {
		introText.insertAdjacentElement("afterend", reviews);
		reviews.insertAdjacentHTML(
			"beforeend",
			`<div class="${ID}-reviewRating">${
				reviewRating ? reviewRating.innerText : 0
			}</div><div class="${ID}-readReviews">Read Reviews</div>`
		);
	}

	// add YT video
	const video = `<div class="${ID}-video"><div id="player"></div></div>`;
	document
		.querySelector(`.${ID}-vid`)
		.insertAdjacentHTML("afterbegin", video);

	// add warranty banner
	// const warrantyBanner = document.createElement('a');
	// warrantyBanner.classList.add(`${ID}-warrantyBanner`);
	// let banner;
	// if (window.innerWidth <= 767) {
	//   banner = 'https://editor-assets.abtasty.com/48343/6005b52e513c41610986798.jpg'
	// } else {
	//   banner = 'https://editor-assets.abtasty.com/48343/6005b557db0691610986839.jpg';
	// }
	// warrantyBanner.setAttribute('target', '_blank');
	// warrantyBanner.setAttribute('href', 'https://www.hotelchocolat.com/uk/velvetiser-warranty.html');
	// warrantyBanner.innerHTML = `<img src="${banner}"/>`;

	// document.querySelector(`.${ID}-video`).insertAdjacentElement('afterend', warrantyBanner);

	// remove ingredients on mobile
	const mobileTab = document.querySelectorAll(".tab-mobile-title");
	if (mobileTab) {
		for (let index = 0; index < mobileTab.length; index += 1) {
			const element = mobileTab[index];
			if (element.textContent.trim() === "INGREDIENTS") {
				element.style.display = "none";
			}
		}
	}
};
