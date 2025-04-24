// import { set } from "lodash";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { products } from "./data";

const { ID, VARIATION } = shared;

/**
 *
 * @returns discounted price
 */
const discountPrice = (currentPrice, discount) => {
	const parseprice = parseFloat(
		currentPrice.textContent.trim().replace("£", "")
	);
	const newPrice = parseFloat(parseprice - discount);
	currentPrice.textContent = `£${newPrice.toFixed(2)}`;
};
export const reduceDropDownPrices = (sku, elPrice) => {
	const options = document.querySelectorAll(".sleeveContent li");
	if (options) {
		const matchingSKU = products[sku];

		if (matchingSKU) {
			for (let index = 0; index < options.length; index++) {
				const element = options[index];

				const price = element.querySelector(".col-2 span");
				price.innerHTML = elPrice.innerHTML;
			}
		}
	}
};

export const HideNavLinks = (el) => {
	const allLinks = document.querySelectorAll(el);
	for (let index = 0; index < allLinks.length; index++) {
		const element = allLinks[index];

		if (element.textContent.indexOf("Special Offers") > -1) {
			element.style.display = "none";
		}
	}
};

export const QuickView = (el, productPrice) => {
	document.querySelector(`#QuickViewDialog .price-sales`).style.display =
		"none";

	const plpSku = document.querySelector(`#QuickViewDialog #pid`).value;

	// setTimeout(() => {
	// 	const pollForPrice = setInterval(() => {
	// 		if (document.querySelector("#QuickViewDialog .price-sales")) {
	// 			const elPrice = el.querySelector(productPrice);
	// 			console.log(el, el.querySelector(productPrice), elPrice);
	// 			console.log(
	// 				document.querySelector("#QuickViewDialog .price-sales")
	// 			);
	// 			document.querySelector(
	// 				"#QuickViewDialog .price-sales"
	// 			).style.display = "block";
	// 			document.querySelector(
	// 				"#QuickViewDialog .price-sales"
	// 			).innerHTML = elPrice.innerHTML;

	// 			reduceDropDownPrices(
	// 				plpSku,
	// 				document.querySelector(`#QuickViewDialog .price-sales`)
	// 			);

	// 			hidePromotions(
	// 				document.querySelector("#QuickViewDialog"),
	// 				plpSku
	// 			);
	// 			clearInterval(pollForPrice);
	// 		}
	// 	}, 500);
	// }, 700);

	setTimeout(() => {
		const elPrice = el.querySelector(productPrice);
		document.querySelector("#QuickViewDialog .price-sales").style.display =
			"block";
		document.querySelector("#QuickViewDialog .price-sales").innerHTML =
			elPrice.innerHTML;

		reduceDropDownPrices(
			plpSku,
			document.querySelector(`#QuickViewDialog .price-sales`)
		);

		hidePromotions(document.querySelector("#QuickViewDialog"), plpSku);
	}, 700);
};
/**
 *
 * @returns Hide the promotion offer
 */
// export const hidePromotions = () => {
//     const allPromotionText = el.querySelectorAll('.promotion');

//     if (allPromotionText) {
//         for (let index = 0; index < allPromotionText.length; index++) {
//             const element = allPromotionText[index];

//             if (element.querySelector('.promotion-callout').textContent.trim().indexOf('MIX & MATCH') > -1) {
//                 element.style.display = 'none';
//             }
//         }
//     }
// }

/**
 *
 * @returns Hide the promotion offer
 */
export const hidePromotions = (el, sku) => {
	const allPromotionText = el.querySelector(".promotion");

	const alcoholSKUs = ["503845", "504059", "504060", "503844", "504109"];
	if (allPromotionText && alcoholSKUs.indexOf(sku) === -1) {
		if (
			allPromotionText.querySelector(".promotion-callout") &&
			allPromotionText
				.querySelector(".promotion-callout")
				.textContent.trim()
				.indexOf("MIX & MATCH") > -1
		) {
			allPromotionText.style.display = "none";
		}
	}
};

/**
 *
 * @returns If sku matches any elements looped though
 */
export const checkProducts = (elToLoop) => {
	for (let index = 0; index < elToLoop.length; index += 1) {
		const element = elToLoop[index];

		let sku;
		if (element.querySelector("#pid")) {
			sku = element.querySelector("#pid").value;
		} else if (element.classList.contains("cart-row")) {
			sku = element.getAttribute("data-pid");
		} else if (element.classList.contains("recommendation-item")) {
			sku = JSON.parse(
				element.nextElementSibling.value
			).impression_product_SKU;
		} else if (
			element.querySelector("input") &&
			JSON.parse(element.querySelector("input").value)
				.impression_product_SKU
		) {
			sku = JSON.parse(
				element.querySelector("input").value
			).impression_product_SKU;
		} else if (
			element.querySelector("input") &&
			JSON.parse(element.querySelector("input").value).productID
		) {
			sku = JSON.parse(element.querySelector("input").value).productID;
		} else if (element.querySelector(".mini-cart-product-remove")) {
			sku = element
				.querySelector(".mini-cart-product-remove .button-text")
				.getAttribute("data-pid");
		}

		hidePromotions(element, sku);

		Object.keys(products).forEach((i) => {
			const data = products[i];
			const datasku = [i][0];

			if (datasku === sku) {
				// hide matching basket prices
				if (element.classList.contains("cart-row")) {
					element.querySelector(".item-total").style.display = "none";
					element.querySelector(".price-sales").style.display =
						"none";
				}

				let priceDeduction;

				if (VARIATION === "1") {
					priceDeduction = data.v1;
				}

				let price;

				if (element.querySelector(".price-sales")) {
					price = element.querySelector(".price-sales");
				} else if (element.querySelector(".product-sales-price")) {
					price = element.querySelector(".product-sales-price");
				} else if (element.querySelector(".mini-cart-price")) {
					price = element.querySelector(".mini-cart-price");
				}

				if (!element.classList.contains(`${ID}-priceChanged`)) {
					element.classList.add(`${ID}-priceChanged`);
					discountPrice(price, priceDeduction);

					setTimeout(() => {
						if (element.classList.contains("cart-row")) {
							element.querySelector(".item-total").style.display =
								"table-cell";
							element.querySelector(
								".price-sales"
							).style.display = "table-cell";
						}
					}, 100);
				}
			}
		});
	}
};

/**
 *
 * @returns checking and applying the voucher
 */

let voucherCode;

if (VARIATION === "1") {
	voucherCode = "HFFS45";
}

const checkBasketItems = () => {
	const allBasketItems = document.querySelectorAll(".cart-row");

	let qualifyingProduct = false;

	for (let index = 0; index < allBasketItems.length; index++) {
		const element = allBasketItems[index];
		const productSKU = element.getAttribute("data-pid");

		Object.keys(products).forEach((i) => {
			const data = products[i];
			const datasku = [i][0];

			if (datasku === productSKU) {
				qualifyingProduct = true;
			}
		});
	}

	return qualifyingProduct;
};

const checkVoucher = () => {
	let apply = true;

	const allVouchersApplied = document.querySelectorAll(".applied-coupon");
	if (allVouchersApplied) {
		for (let index = 0; index < allVouchersApplied.length; index++) {
			const element = allVouchersApplied[index];

			// if error
			if (
				document.querySelector(".coupon-error") &&
				document
					.querySelector(".coupon-error")
					.textContent.indexOf(voucherCode) > -1
			) {
				apply = false;
			}

			if (
				element
					.querySelector(".applied-coupon-code")
					.textContent.indexOf(voucherCode) > -1
			) {
				apply = false;
			}
		}
		return apply;
	}
};
export const addVoucher = () => {
	const result = checkBasketItems();

	// const couponError = document.querySelector(".coupon-error");
	// let code = "";
	// if (couponError) {
	// 	code = couponError.textContent?.trim().split(`"`)[1];
	// }

	if (result === true && checkVoucher() === true) {
		document.querySelector("#dwfrm_cart_couponCode").value = voucherCode;
		document.querySelector("#add-coupon").click();
	} else if (document.querySelector(".applied-coupon") && result === false) {
		console.log("result false");
		const allVouchersApplied = document.querySelectorAll(
			"form.cart-coupon-code .applied-coupon"
		);
		if (allVouchersApplied.length > 1) {
			for (let index = 0; index < allVouchersApplied.length; index++) {
				const element = allVouchersApplied[index].querySelector(
					".applied-coupon-code"
				);
				if (element) {
					const code = element.textContent?.trim().split(`"`)[1];
					if (code === voucherCode) {
						allVouchersApplied[index]
							.querySelector("button.button-text.remove-coupon")
							.click();
						break;
					}
				}
			}
		}
		// document.querySelector("#dwfrm_cart_couponCode").value = "";
		// document.querySelector("button.button-text.remove-coupon")?.click();
	}
};

const basketNotice = () => {
	const basketMessage = document.createElement("div");
	basketMessage.classList.add(`${ID}-offerText`);
	basketMessage.innerHTML = `
        <div class="${ID}-message">
            <p>Special offer applied<span></span></p>
        </div>
        <div class="${ID}-tooltipMsg"> 
            <div class="${ID}-close"></div>
            <p>This product pricing is on special offer by using the voucher code <b>${voucherCode}</b> which is automatically applied</p>
        </div>`;

	document
		.querySelector(".order-totals-table")
		.insertAdjacentElement("afterend", basketMessage);

	const msg = document.querySelector(`.${ID}-offerText`);
	msg.querySelector(`.${ID}-message`).addEventListener("click", () => {
		if (msg.classList.contains("active")) {
			msg.classList.remove("active");
		} else {
			msg.classList.add("active");
		}
	});
};

export const voucherApplied = () => {
	const allVouchersApplied = document.querySelectorAll(".applied-coupon");
	if (allVouchersApplied) {
		for (let index = 0; index < allVouchersApplied.length; index += 1) {
			const element = allVouchersApplied[index];

			if (
				element
					.querySelector(".applied-coupon-code")
					.textContent.indexOf(voucherCode) > -1
			) {
				checkProducts(document.querySelectorAll(".cart-row"));
				if (
					document
						.querySelector(".cart-coupon-code .toggle-title")
						.classList.contains("on")
				) {
					document
						.querySelector(".cart-coupon-code .toggle-title")
						.click();
				}
				// if (VARIATION == "1") {
				// 	basketNotice();
				// }
			}
		}
	}
};
