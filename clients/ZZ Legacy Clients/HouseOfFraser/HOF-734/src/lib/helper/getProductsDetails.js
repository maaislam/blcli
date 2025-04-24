import { fireEvent } from "../../../../../../core-files/services";
import { getPageData } from "../services";
import shared from "../shared";
import settings from "../shared";
import { showSocialProof } from "./socialProof";

const { ID, VARIATION } = settings;

let productSKUs = [];
let interactions = [];
// let productSKU, colvarID;
let colvarID, prodData, productID, productSKU;
export const getProductDetails = () => {
	prodData = getPageData();
	let atbButton = document.querySelector("#aAddToBag > span");
	if (atbButton.innerText == "PRE-ORDER NOW") {
		events.send(
			ID,
			`${shared.ID} Variation ${shared.VARIATION}`,
			"this product is pre-order, not relevant"
		);
		return false;
	}

	colvarID = window.productDetailsShared.getCurrentColourVariant().ColVarId;
	// console.log("prodData", prodData);
	productID = prodData.productSequenceNumber;
	productSKU = colvarID + "-" + productID;
	// console.log("productSKU", productSKU);
	// console.log("colvarID", colvarID);
	if (productSKU && productSKUs.indexOf(productSKU) < 0) {
		productSKUs.push(productSKU);
		// console.log("productSKUs", productSKUs);
		window.DY.ServerUtil.getProductsData(
			[productSKU],
			["daily"],
			"",
			true,
			function (err, res) {
				if (typeof res !== undefined && res !== null) {
					// console.log(res[productSKU]);
					let numberOfInteractions = 0;
					if (VARIATION == 2 || VARIATION == 4) {
						numberOfInteractions =
							res[productSKU].productInterest.purchase.daily;
					} else {
						numberOfInteractions =
							res[productSKU].productInterest.view.daily;
					}
					window.numberOfInteractions = numberOfInteractions;
					if (interactions.indexOf(numberOfInteractions) < 0) {
						interactions.push(numberOfInteractions);

						if (VARIATION == 2 || VARIATION == 4) {
							numberOfInteractions > 10 &&
								setTimeout(() => {
									showSocialProof(
										numberOfInteractions,
										"purchases"
									);
									fireEvent(
										"The copy in the social message shown to the user"
									);
								}, 2500);
						} else if (VARIATION == 1 || VARIATION == 3) {
							numberOfInteractions > 50 &&
								setTimeout(() => {
									showSocialProof(
										numberOfInteractions,
										"views"
									);
									fireEvent(
										"The copy in the social message shown to the user"
									);
								}, 2500);
						}
					}
				}
			}
		);
	}
};
