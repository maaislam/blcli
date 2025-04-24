import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import VelvetiserUpsell from "./velvetiserUpsell";

const { ID } = shared;

export default () => {
	const checkBasketItems = () => {
		const kitSachetSkus = [
			"503879",
			"503897",
			"503771",
			"503770",
			"503772",
			"503773",
			"503802",
			"503780",
			"503885",
			"503808",
			"503886",
			"503884",
			"503777",
			"503776",
			"503779",
			"503805",
			"503775",
			"503774",
			"503803",
			"503839",
			"503835",
			"503950",
			"504167",
			"504168",
		];
		const allBasketItems = document.querySelectorAll(".cart-row");

		let velvetiserExists = false;
		let kitSkuExists = false;

		for (let index = 0; index < allBasketItems.length; index++) {
			const element = allBasketItems[index];

			if (
				element
					.querySelector(".name")
					.textContent.indexOf("The Velvetiser") > -1
			) {
				velvetiserExists = true;
			}

			if (kitSachetSkus.includes(element.getAttribute("data-pid"))) {
				kitSkuExists = true;
			}
		}

		return {
			velvetiserExists: velvetiserExists,
			kitItemsExist: kitSkuExists,
			numItemsInBasket: allBasketItems.length,
		};
	};

	const result = checkBasketItems();
	console.log("Basket Page", result);
	if (result.velvetiserExists && result.kitItemsExist) {
		pollerLite([".cart-recommendations"], () => {
			document.querySelector(".cart-recommendations")?.remove();
		});
		// upsell
		document.documentElement.classList.add(`${ID}-velvetiserInBag`);
		new VelvetiserUpsell();
	} else if (result.velvetiserExists) {
		pollerLite([".cart-recommendations"], () => {
			document.querySelector(".cart-recommendations")?.remove();
		});
	}

	pollerLite(
		[() => window.dataLayer, () => document.readyState == "complete"],
		() => {
			const pageData = dataLayer.filter(
				(item) => item.event == "pageLoad"
			);
			const subscriberStatus = pageData[0].subscriber_status
				.trim()
				.toLowerCase();

			if (
				subscriberStatus !== "" ||
				subscriberStatus.indexOf("inactive") === -1
			) {
				if (subscriberStatus.indexOf("active") > -1) {
					document
						.querySelector("#impulse-upsell-container")
						?.remove();
				}
			}
		}
	);
};
