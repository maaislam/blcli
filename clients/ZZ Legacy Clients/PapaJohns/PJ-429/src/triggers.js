/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { stringToHTML } from "../../../../lib/utils";
import { bindTriggerToBasket } from "./lib/utils";
import shared from "../../../../core-files/shared";
import { fireEvent } from "../../../../core-files/services";
import { events } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

const { VARIATION, CLIENT, ID } = shared;

if (
	!window.location.pathname.includes("/basket-confirmation.aspx") &&
	location.host !== "www2.papajohns.co.uk"
) {
	pollerLite(["body", ".header .basket .menuLinkTop"], () => {
		events.setDefaultCategory("Experimentation");
		events.setDefaultAction(CLIENT + " - " + ID);

		bindTriggerToBasket((e) => {
			e.preventDefault();

			fetch("/basket-confirmation.aspx")
				.then((res) => res.text())
				.then((data) => {
					const dom = stringToHTML(data);
					const page = dom.querySelector("#aspnetForm").action;
					const basketItems = dom.querySelectorAll(
						".intBasket td.pizzaName, .intBasket .pizza-title-b"
					);

					if (basketItems) {
						const basketItemsText = Array.from(basketItems).map((item) =>
							item.innerText.replace(/(\r\n|\n|\r|\s)/gm, "").trim()
						);

						const drinks = [
							"Pepsi",
							"PepsiMax",
							"PepsiMaxCherry",
							"PepsiMaxRaspberry",
							"OrangeTango",
							"BallygowanWater",
							"7UPFree",
							"RobinsonsRealFruitRaspberry&Apple",
							"RockstarOriginalSugar-Free",
						];

						if (page !== "https://www.papajohns.co.uk/" && !ieChecks) {
							let basketDrinks = [];

							for (let i = 0; i < basketItemsText.length; i += 1) {
								for (let j = 0; j < drinks.length; j += 1) {
									if (basketItemsText[i].includes(drinks[j])) {
										basketDrinks.push(true);
									}
								}
							}

							if (basketDrinks.length === 0 && basketItems.length > 0) {
								fireEvent("Conditions Met");

								if (VARIATION == "control") {
									window.location.pathname = "/basket-confirmation.aspx";
								} else {
									activate();
								}
							} else {
								window.location.pathname = "/basket-confirmation.aspx";
							}
						}
					}
				})
				.catch(() => {
					window.location.pathname = "/basket-confirmation.aspx";
				});
		});
	});
}
