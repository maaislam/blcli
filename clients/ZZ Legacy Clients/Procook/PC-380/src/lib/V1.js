import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default function V1(
	typicalPrice,
	currentPrice,
	individualPrice,
	saving,
	pieceCount
) {
	const el = document.createElement("div");
	el.classList.add(`${ID}-price-container`);

	el.innerHTML = /* html */ `
	<div class="${ID}-price">
		<div class="${ID}-price__typical">
			<p>Typically £${typicalPrice}</p>
		</div>
		<div class="${ID}-price__current" data-expanded="${
		VARIATION == "1" ? "false" : "true"
	}">
			<p>Only <span>£${currentPrice}</span></p>
			<button class="${ID}-price__tooltip">
				Set Saving <span>£${saving}</span>
			</button>
		</div>
		<div class="${ID}-price__savings">
			<p><strong>SAVE £${saving}</strong> with this ${pieceCount} Piece Set</p>
			<p>£${individualPrice} when purchased individually</p>
		</div>
	</div>
	`;

	const tooltip = el.querySelector(`.${ID}-price__tooltip`);

	tooltip.addEventListener("click", () => {
		const parent = tooltip.parentElement;

		if (parent.getAttribute("data-expanded") === "true") {
			parent.setAttribute("data-expanded", "false");
			fireEvent("Price Saving Collapsed");
		} else {
			parent.setAttribute("data-expanded", "true");
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
