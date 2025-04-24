import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function TonerInfo(prices) {
	const el = document.createElement("div");
	el.classList.add(`${ID}-toner-info`);

	el.innerHTML = /*html*/ `
		<h3>Toner Cartridge Costs</h3>
		<div class="${ID}-toner-info__pricing">
			<div class="${ID}-toner-info__pricing-image"></div>
			<ul>
				${prices.map((price) => `<li>${price}</li>`).join("")}
			</ul>
		</div>
		<button class="${ID}-toner-info__cta">View Cartridges</button>
	`;

	el.querySelector(`.${ID}-toner-info__cta`).addEventListener("click", () => {
		document.querySelector(".scroll-to.cartridges__link").click();
	});

	return el;
}
