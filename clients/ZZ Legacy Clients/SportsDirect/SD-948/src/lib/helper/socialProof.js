import { boughtIcon, eyeIcon } from "../assets/icon";
import shared from "../shared";
import settings from "../shared";
import { fireEvent } from "../../../../../../core-files/services";
const { ID, VARIATION } = settings;
export const showSocialProof = (number, socialType) => {
	if (document.querySelector(`.${ID}-social-notification`)) {
		document.querySelector(`.${ID}-social-notification`).remove();
	}
	// console.log(number, socialType);
	let iconHTML = boughtIcon;
	if (VARIATION == 2) iconHTML = eyeIcon;
	const socialNotificationHTML = (orientation = "addToBasket") => `
        <div class="${ID}-social-notification ${ID}-${orientation}">
          <div class="${ID}-social-notification-holder">
            ${iconHTML}
            <p> <span class="${ID}-text-bold">${number} others </span>${
		socialType == "views" ? "viewed" : "bought"
	} this today</p>
          </div>
        </div>
      `;
	(function appendInDom() {
		const basketWishContainer =
			document.querySelector(`.BasketWishContainer`);
		const imageContainer = document.getElementById("productImageContainer");
		basketWishContainer &&
			basketWishContainer.insertAdjacentHTML(
				"beforeend",
				socialNotificationHTML()
			);
		imageContainer.insertAdjacentHTML(
			"beforeend",
			socialNotificationHTML("imageContainer")
		);
	})();
	fireEvent("User meets threshold and sees social proof");
};
