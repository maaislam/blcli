import { pollerLite } from "../../../../../../lib/utils";
import shared from "../../../../../../core-files/shared";
const { ID, VARIATION } = shared;
const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
  <line y1="-0.5" x2="13.6089" y2="-0.5" transform="matrix(0.712079 0.702099 -0.712079 0.702099 0 1.57663)" stroke="black"/>
  <line x1="20.3536" y1="0.643135" x2="9.84937" y2="11.1473" stroke="black"/>
  </svg>`;

const stickyOrderSummery = () => {
	pollerLite([".newBasketSummary .OrderSumm"], () => {
		const TotalDom = document.querySelector(
			".newBasketSummary .OrderSumm #TotalRow.TotalSumm"
		);
		const orderSumItems = document.querySelectorAll(
			".newBasketSummary .OrderSumm .SubSumm"
		);
		let activeItems = [];

		if (orderSumItems.length > 0) {
			for (let index = 0; index < orderSumItems.length; index++) {
				const style = orderSumItems[index].getAttribute("style");
				if (style && style.indexOf("display:none") > -1) {
					continue;
				} else {
					activeItems.push(orderSumItems[index]);
				}
			}
		}

		const domToRender = `
            <div class="${ID}-sticky-order-sum-wrapper">
                <div class="sticky-order-sum-header">
                    <span class="sticky-order-sum-heading">Order Summary</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 21 12" fill="none">
                        <line y1="-0.5" x2="13.6089" y2="-0.5" transform="matrix(0.712079 0.702099 -0.712079 0.702099 0 1.57663)" stroke="black"/>
                        <line x1="20.3536" y1="0.643135" x2="9.84937" y2="11.1473" stroke="black"/>
                    </svg>
                </div>
                <div class="sticky-order-sum-body">
                    <div class="sticky-order-sum-items">
                        ${activeItems
							.map((item) => {
								return `
                                <div class="sticky-order-sum-item">
                                    <span class="sticky-order-sum-item-title">
                                        ${item
											.querySelector(
												`div:not(.text-right) span`
											)
											.innerText.trim()}
                                    </span>
                                    <span class="sticky-order-sum-item-value">
                                        ${item
											.querySelector(`div.text-right`)
											.innerText.trim()}
                                    </span>
                                </div>`;
							})
							.join("\n")}
                    </div>
                    <div class="sticky-order-sum-total">
                        <span class="order-sum-total-title">${TotalDom.querySelector(
							`div:not(.text-right) span`
						).innerText.trim()}</span>
                        <span class="order-sum-total-value">${TotalDom.querySelector(
							`div.text-right`
						).innerText.trim()}</span>
                    </div>
                </div>
                <div class="sticky-order-sum-footer">
                    <a href="#" class="sticky-order-sum-button ${
						document.querySelector("#buttonWrapperMobile")
							? ""
							: "disabled"
					}"><span>Continue Securely</span></a>
                </div>
            </div>
        `;
		document
			.querySelector("body")
			.insertAdjacentHTML("beforeend", domToRender);

		// pollerLite(["#buttonWrapperMobile"], () => {
		// 	document
		// 		.querySelector(
		// 			`.${ID}-sticky-order-sum-wrapper .sticky-order-sum-footer a.sticky-order-sum-button`
		// 		)
		// 		?.classList.remove("disabled");
		// });
	});
};

export default stickyOrderSummery;
