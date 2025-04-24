import { fireEvent } from "../../../../../../core-files/services";
import { getPageData } from "../services";
import shared from "../shared";
import settings from "../shared";
import { showSocialProof } from "./socialProof";
import { logMessage, poller } from "../../../../../../lib/utils";
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

	productID = prodData.productSequenceNumber;
	productSKU = colvarID + "-" + productID;

	if (productSKU && productSKUs.indexOf(productSKU) < 0) {
		productSKUs.push(productSKU);

		window.DY.ServerUtil.getProductsData(
			[productSKU],
			["daily"],
			"",
			true,
			function (err, res) {
				if (typeof res !== undefined && res !== null) {
					let numberOfInteractions = 0;
					if (VARIATION == 2) {
						numberOfInteractions =
							res[productSKU].productInterest.view.daily;
					} else {
						numberOfInteractions =
							res[productSKU].productInterest.purchase.daily;
					}
					window.numberOfInteractions = numberOfInteractions;
					if (interactions.indexOf(numberOfInteractions) < 0) {
						interactions.push(numberOfInteractions);

						if (VARIATION == 2) {
							numberOfInteractions > 50 &&
								// setTimeout(() => {
								showSocialProof(numberOfInteractions, "views");
							// fireEvent(
							// 	"The copy in the social message shown to the user"
							// );
							// }, 2500);
						} else {
							numberOfInteractions > 10 &&
								// setTimeout(() => {
								showSocialProof(numberOfInteractions, "bought");
							// fireEvent(
							// 	"The copy in the social message shown to the user"
							// );
							// }, 2500);
						}
					}
				}
			}
		);
	}
};
