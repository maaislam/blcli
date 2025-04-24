import { pollerLite } from "../../../../../../lib/utils";
import shared from "../shared";
import settings from "../shared";
import { events } from "../../../../../../lib/utils";
const { ID, VARIATION } = settings;
let notificationHolder, productTimeout;
export const showSocialProof = (number, socialType) => {
	if (document.querySelector(`.${ID}-social-notification`)) {
		notificationHolder.remove();
	}
	// console.log(number, socialType);
	let iconHTML = `<svg class="${ID}-eye-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#666" d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>`;
	if (VARIATION == 2 || VARIATION == 4) {
		iconHTML = `<svg class="${ID}-shop-icon" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.8889 4.63141H2.1111L1 12.8519H11L9.8889 4.63141Z" stroke="black" stroke-miterlimit="10"/>
    <path d="M4.05151 6.21442V2.9555C4.05151 2.67617 4.14464 2.3968 4.23774 2.1175C4.42394 1.6519 4.88951 1 6.00686 1" stroke="black" stroke-miterlimit="10"/>
    <path d="M7.85625 6.21442V2.9555C7.85625 2.67617 7.76313 2.3968 7.67003 2.1175C7.48378 1.6519 7.01823 1 5.90088 1" stroke="black" stroke-miterlimit="10"/>
    <path d="M7.85146 6.18669C7.95435 6.18669 8.03776 6.10328 8.03776 6.00039C8.03776 5.8975 7.95435 5.81409 7.85146 5.81409C7.74857 5.81409 7.66516 5.8975 7.66516 6.00039C7.66516 6.10328 7.74857 6.18669 7.85146 6.18669Z" stroke="black" stroke-miterlimit="10"/>
    <path d="M4.05605 6.18656C4.15894 6.18656 4.24235 6.10316 4.24235 6.00026C4.24235 5.89737 4.15894 5.81396 4.05605 5.81396C3.95316 5.81396 3.86975 5.89737 3.86975 6.00026C3.86975 6.10316 3.95316 6.18656 4.05605 6.18656Z" stroke="black" stroke-miterlimit="10"/>
    </svg>`;
	}

	if (VARIATION == "1" || VARIATION == "2") {
		let socialNotificationHTML = `
        <div class="${ID}-social-notification">
          <div class="${ID}-social-notification-holder">
            ${iconHTML}
            <p> <span class="${ID}-text-red">${number} others </span>${
			socialType == "views" ? "viewed" : "bought"
		} this today</p>
          </div>
          <div class="${ID}-social-notification-close">
            <a href="#" id="${ID}-hide-notification" class="${ID}-hide-notification"><svg class="${ID}-close-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15" height="15" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g></svg></a>
          </div>
        </div>
      `;
		let imageContainer = document.getElementById("productImageContainer");
		imageContainer.insertAdjacentHTML("afterbegin", socialNotificationHTML);

		notificationHolder = document.querySelector(
			`.${ID}-social-notification`
		);

		let hideNotification = document.querySelector(
			`.${ID}-social-notification-close`
		);

		hideNotification.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			events.send(
				ID,
				`${shared.ID} Variation ${shared.VARIATION}`,
				"user closed the social notification with the close arrow"
			);
			notificationHolder.classList.add("fading");
			let removeTimeout = setTimeout(() => {
				notificationHolder.remove();
			}, 500);
		});

		clearTimeout(productTimeout);
		productTimeout = setTimeout(() => {
			notificationHolder.classList.add("fading");
			let removeTimeout = setTimeout(() => {
				notificationHolder.remove();
			}, 500);
		}, 4000);
	} else {
		let socialNotificationHTML = `
        <div class="${ID}-social-notification">
          <div class="${ID}-social-notification-holder">
            ${iconHTML}
            <p> <span class="${ID}-text-red">${number} others </span>${
			socialType == "views" ? "viewed" : "bought"
		} this today</p>
          </div>
        </div>
      `;
		let container;
		if (document.querySelector(`.HOF-135-stock-message-holder`)) {
			container = document.querySelector(`.HOF-135-stock-message-holder`);
			container &&
				container.insertAdjacentHTML(
					"afterend",
					socialNotificationHTML
				);
		} else {
			container = document.querySelector(`.addToBasketContainer`);
			container &&
				container.insertAdjacentHTML(
					"beforebegin",
					socialNotificationHTML
				);
		}
		pollerLite([`.HOF-135-stock-message-holder`], () => {
			let container = document.querySelector(
				`.HOF-135-stock-message-holder`
			);
			if (
				container.nextElementSibling.matches(
					`.${ID}-social-notification`
				)
			) {
				container.insertAdjacentElement(
					"beforebegin",
					document.querySelector(`.${ID}-social-notification`)
				);
			}
		});
	}
};

// const removeMessage = () => {
// 	// remove the element
// 	notificationHolder.remove();
// };
