import shared from "../../../../../core-files/shared";
const { ID } = shared;

const imgSourceUpdate = (img) => {
	let imgMainSrc = img?.src.split("?");
	let modifiedSrc = `${imgMainSrc[0]}?sw=130&sh=130&sm=fit`;
	img.src = modifiedSrc;
	//   console.log(img.src);
};

export const headerSearchModify = (node) => {
	let phraseSuggestion = node.querySelector(`.phrase-suggestions`);
	let productSuggestions = node.querySelector(`.product-suggestions`);
	let hitGroup = phraseSuggestion?.querySelector(`.hitgroup`);
	let viewAllBtn = node.querySelector("a.button");
	let header = hitGroup?.querySelector(".header");
	header.innerHTML = `Articles of interest`;
	viewAllBtn.innerHTML = `View all <span class="text-variable">results</span>`;

	let productSuggestionsLink = productSuggestions.querySelectorAll(
		`a.product-suggestion-link`
	);
	Array.from(productSuggestionsLink).forEach((link) => {
		let img = link.querySelector(".product-image img");
		// console.log(img);
		imgSourceUpdate(img);
	});

	document.querySelector(`${ID}-always-here-to-help-you`) &&
		document.querySelector(`${ID}-always-here-to-help-you`).remove();

	let alwaysHereToHelp = `<div class="${ID}-always-here-to-help-you">
  <h4 class="header">Always here to help you</h4>
  <a class="${ID}-hit" href="https://www.hotelchocolat.com/uk/help/FAQs.html">Help & FAQs</a>
  <a class="${ID}-hit" href="https://www.hotelchocolat.com/uk/help/delivery.html">Delivery details</a>
  <a class="${ID}-hit" href="https://www.hotelchocolat.com/uk/my-account">Order tracking</a>
</div>`;

	phraseSuggestion.insertAdjacentHTML("beforeend", alwaysHereToHelp);
};
