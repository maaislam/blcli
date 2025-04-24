import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export function Tooltip(individualPrice, currentPrice, saving) {
	const el = document.createElement("button");
	el.setAttribute("type", "button");
	el.classList.add(`${ID}-tooltip`);
	el.textContent = `Save £${saving}`;

	el.addEventListener("click", () => {
		const info = document.querySelector(`.${ID}-info`);

		if (info.getAttribute("data-expanded") === "true") {
			info.setAttribute("data-expanded", "false");
			fireEvent("Price Saving Collapsed");
		} else {
			info.setAttribute("data-expanded", "true");
			fireEvent("Price Saving Expanded");
		}
	});

	new IntersectionObserver((i) => {
		if (i[0].isIntersecting) {
			fireEvent("Element in View");
		}
	}).observe(el);

	return el;
}

export function Info(individualPrice, currentPrice, saving, pieceCount) {
	const el = document.createElement("div");
	el.classList.add(`${ID}-info`);
	el.setAttribute("data-expanded", VARIATION == "2" ? "false" : "true");
	el.innerHTML = /* html */ `
	<div class="${ID}-info__container">
		<p><strong>SAVE</strong> £${saving} with this ${pieceCount} Piece Set</p>
		<p>(£${individualPrice} if items are bought individually)</p>
	</div>
	`;

	return el;
}
