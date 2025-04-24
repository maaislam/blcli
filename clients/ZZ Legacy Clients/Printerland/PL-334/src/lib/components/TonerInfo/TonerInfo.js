import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function TonerInfo(prices) {
  //   console.log(prices);
  const el = document.createElement("div");
  el.classList.add(`${ID}-toner-info`);
  let priceList = "";
  if (prices && prices.length > 0) {
    priceList = `
	<ul>
		${prices.map((price) => `<li>${price}</li>`).join("")}
	</ul>
	`;
  }

  el.innerHTML = /*html*/ `
		<h3>Toner Cartridge Costs <div aria-label="Cost per page" class="tooltip-link tooltip-CostPerPage" data-target="dialog-CostPerPage"><i class="text-info ico icon-help-circle tooltip-CostPerPage-icon"></i></div></h3>
		<div class="${ID}-toner-info__pricing">
			<div class="${ID}-toner-info__pricing-image"></div>
				${priceList}
		</div>
		<button class="${ID}-toner-info__cta">View Cartridges</button>
	`;

  el.querySelector(`.${ID}-toner-info__cta`).addEventListener("click", () => {
    document.querySelector(".scroll-to.cartridges__link").click();
  });

  return el;
}
