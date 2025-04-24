/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import {
	parentingClubSkus,
	// hairLossProducts,
	// erectileDysfunctionProducts,
	excludedSkus,
} from "./data";
export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	const healthCareProducts = {
		10084607: true,
		"10032893p": true,
		10173500: true,
		10083541: true,
		10236971: true,
		10032788: true,
	};

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(
			[".payPal3PDPMessage", () => document.readyState === "complete"],
			() => {
				// -----------------------------
				const hrefArray = location.pathname.split("-");
				const sku = hrefArray[hrefArray.length - 1]
					.replace(".p", "")
					.replace(".P", "");

				// const isHairLossProduct =
				// 	hairLossProducts.includes(sku) ||
				// 	hairLossProducts.includes(location.pathname);

				// const isErectileDysfunctionProduct =
				// 	erectileDysfunctionProducts.includes(sku);
				// If Baby Products

				if (!excludedSkus[sku]) {
					if (parentingClubSkus[sku]) {
						fireEvent("Parenting banner would've shown");
					} else if (
						document.querySelector(
							".pdp-promotion-redesign.member_price_advantage span.member_price_advantage"
						)
					) {
						fireEvent(
							"Advantage price product banner would've shown"
						);
					} else {
						fireEvent("Boots Advantage card banner shown");
					}
				}
			}
		);
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	pollerLite([".payPal3PDPMessage"], () => {
		// -----------------------------
		const hrefArray = location.pathname.split("-");
		const sku = hrefArray[hrefArray.length - 1]
			.replace(".p", "")
			.replace(".P", "");

		if (!excludedSkus[sku]) {
			// const isLoggedInAdcardUser =
			// 	window.userObj.isLoggedIn && window.userObj.advantageCardFlag;
			// console.log(isLoggedInAdcardUser, 'isLoggedInAdcardUser');

			const isLoggedIn = window.userObj.isLoggedIn;
			// console.log(isLoggedIn, 'isLoggedIn');

			// const isHairLossProduct =
			// 	hairLossProducts.includes(sku) ||
			// 	hairLossProducts.includes(location.pathname);

			// const isErectileDysfunctionProduct =
			// 	erectileDysfunctionProducts.includes(sku);

			// If Baby Products
			if (parentingClubSkus[sku]) {
				// const pointsAmount =
				// 	document.querySelector(".rwdPointsContent strong") ||
				// 	document.querySelector("#PDP_earnPointsOk strong");

				// const pointsNo = parseFloat(
				// 	pointsAmount.innerText.replace("points", "")
				// );

				// let newPoints = pointsNo * 2;

				let price = document
					.querySelector("#PDP_productPrice")
					.innerText.trim()
					.replaceAll("£", "");
				price = parseFloat(price);

				let pointsNo = Math.floor(price) * 8;

				const earnpounds = pointsNo / 100;

				const parentBanner = document.createElement("div");
				parentBanner.classList.add(`${ID}-pc-banner`);

				parentBanner.innerHTML = `<div class="pc-logo"></div>
                                <div class="pc-banner__points">
								<p>Collect <span class="points">${parseInt(
									pointsNo
								)}</span> points with this purchase when you join the Parenting Club = <span class="amount">£${earnpounds.toFixed(
					2
				)}</span> to spend online*</p>
                                </div>
								<div class="pc-terms">
									<p>*Join Boots Parenting Club & get 8 points for every £1 spend on eligible baby products</p>
									<p>*Ts & Cs apply. <a href="/advantage-card-terms-and-conditions" target="_blank">Read more here</a></p>
								</div>
                                <div class="parenting-club">
								 ${isLoggedIn == "true" ? `<a class="pc-button" href="/baby-child/parenting-club">Learn More</a>`:`<a class="pc-button" href="/AdvantageCardApply">Join Now</a>`
								}
                                </div>`;

				document
					.querySelector(
						"#estore_pdp_trcol section .payPal3PDPMessage"
					)
					.insertAdjacentElement("afterend", parentBanner);

				fireEvent("Parenting banner shown");

				document
					.querySelectorAll(`.${ID}-pc-banner .pc-button`)
					.forEach((button) => {
						button.addEventListener("click", () => {
							fireEvent(
								`Clicked parenting banner ${button.textContent.trim()} button`
							);
						});
					});
				
			// } else if (isHairLossProduct || isErectileDysfunctionProduct) {
				// const parentBanner = document.createElement("div");
				// parentBanner.classList.add(`${ID}-pc-banner`);
				// parentBanner.classList.add(`health-care`);

				// let healthcareMsg = "";
				// let url = "";
				// if (isHairLossProduct) {
				// 	healthcareMsg = `Did you know that Boots Online Doctor has a Hair Loss Treatment service?`;
				// 	url =
				// 		"https://onlinedoctor.boots.com/propecia-online?utm_source=boots&utm_medium=referral&utm_campaign=Boots_asset_hairloss_test&utm_term=pd";
				// } else if (isErectileDysfunctionProduct) {
				// 	healthcareMsg = `Boots has a dedicated Erectile Dysfunction Treatment service via Boots Online Doctor, which provides access to advice and if appropriate, treatment for Erectile Dysfunction*`;
				// 	url =
				// 		"https://onlinedoctor.boots.com/erectile-dysfunction?utm_source=boots&utm_medium=referral&utm_campaign=asset_ed_pdptest&utm_term=pdp";
				// }

				// parentBanner.innerHTML = `
				// 				<div class="pc-logo"></div>
                //                 <div class="pc-banner__points">
                //                   <p>${healthcareMsg}</p>
                //                 </div>
                //                 <div class="parenting-club">
                //                   <a class="pc-button" href="${url}">Find out more</a>
                //                 </div>
				// 				<div class="pc-terms">
				// 					<p>*Access to treatment is subject to an online consultation with a clinician to assess suitability. Subject to availability. Charges apply.</p>
				// 				</div>
				// 				`;

				// document
				// 	.querySelector(
				// 		"#estore_pdp_trcol section .payPal3PDPMessage"
				// 	)
				// 	.insertAdjacentElement("afterend", parentBanner);

				// fireEvent("Health services banner shown");

				// document
				// 	.querySelectorAll(`.${ID}-pc-banner .pc-button`)
				// 	.forEach((button) => {
				// 		button.addEventListener("click", () => {
				// 			fireEvent(
				// 				`Clicked Health services banner ${button.textContent.trim()} button`
				// 			);
				// 		});
				// 	});
				} else if (
				document.querySelector(
					".pdp-promotion-redesign.member_price_advantage span.member_price_advantage"
				)
			) {
				// const pointsAmount = document.querySelectorAll(
				// 	".rwdPointsContent strong"
				// );
				// const saveAmount = pointsAmount[1].innerText.trim();
				// const pointsNo = parseFloat(
				// 	pointsAmount[0].innerText.replace("points", "")
				// );
				// const earnpounds = pointsNo / 100;

				// const parentBanner = document.createElement("div");
				// parentBanner.classList.add(`${ID}-pc-banner`);
				// parentBanner.classList.add(`advantage-card`);
				// if (isLoggedInAdcardUser !== "false") {
				// 	parentBanner.innerHTML = `
				// 			<div class="pc-logo"></div>
				// 			<div class="pc-banner__points">
				// 				<p>You’re saving ${saveAmount} on this product by being a Boots Advantage Card member.</p>
				// 			</div>
				// 			<div class="parenting-club">
				// 				<a class="pc-button" href="/advantage-card">Learn More</a>
				// 			</div>`;
				// } else {
				// 	parentBanner.innerHTML = `
				// 			<div class="pc-logo"></div>
				// 			<div class="pc-banner__points">
				// 				<p>${
				// 					pointsAmount && VARIATION == "2"
				// 						? `Save ${saveAmount} on this product when you have an Advantage Card and earn ${pointsNo} points worth £${earnpounds}.`
				// 						: `Save ${saveAmount} on this product when you have an Advantage Card.`
				// 				}</p>
				// 			</div>
				// 			<div class="parenting-club">
				// 				<a class="pc-button" href="/advantage-card">Sign Up</a>
				// 				<a class="pc-button" href="/webapp/wcs/stores/servlet/BootsLogonForm">Login</a>
				// 			</div>`;
				// }

				// document
				// 	.querySelector(
				// 		"#estore_pdp_trcol section .payPal3PDPMessage"
				// 	)
				// 	.insertAdjacentElement("afterend", parentBanner);

				// fireEvent("Price Advantage banner shown");

				// document
				// 	.querySelectorAll(`.${ID}-pc-banner .pc-button`)
				// 	.forEach((button) => {
				// 		button.addEventListener("click", () => {
				// 			fireEvent(
				// 				`Clicked price advantage banner ${button.textContent.trim()} button`
				// 			);
				// 		});
				// 	});
			} else {
				// const pointsAmount = document.querySelector(
				// 	".rwdPointsContent strong"
				// );
				// const pointsNo = parseFloat(
				// 	pointsAmount.innerText.replace("points", "")
				// );
				// const earnpounds = pointsNo / 100;

				// const parentBanner = document.createElement("div");
				// parentBanner.classList.add(`${ID}-pc-banner`);
				// parentBanner.classList.add(`normal-card`);
				// if (isLoggedInAdcardUser !== "false") {
				// 	parentBanner.innerHTML = `
				// 				<div class="pc-logo"></div>
                //                 <div class="pc-banner__points">
                //                   <p>You will earn ${pointsNo} points with this purchase. Find out about your Advantage Card points and benefits in my account.</p>
                //                 </div>
                //                 <div class="parenting-club">
				// 					<a class="pc-button" href="/MyAdvantageCardHomeView">View my account</a>
									
                //                 </div>`;
				// } else {
				// 	parentBanner.innerHTML = `
				// 				<div class="pc-logo"></div>
                //                 <div class="pc-banner__points">
                //                 <p>
				// 				${
				// 					pointsAmount && VARIATION == "2"
				// 						? `Sign up for the Boots Advantage card to earn ${pointsNo} points worth £${earnpounds} with your purchase and save when you shop.`
				// 						: `Sign up for the Boots Advantage card to earn ${pointsNo} points with your purchase and save when you shop.`
				// 				}
				// 				</p>
                //                 </div>
                //                 <div class="parenting-club">
				// 				<a class="pc-button" href="/advantage-card">Learn More</a>
				// 				<a class="pc-button" href="/advantage-card">Sign Up</a>
                //                 </div>`;
				// }

				// document
				// 	.querySelector(
				// 		"#estore_pdp_trcol section .payPal3PDPMessage"
				// 	)
				// 	.insertAdjacentElement("afterend", parentBanner);

				// fireEvent("Boots Advantage card banner shown");

				// document
				// 	.querySelectorAll(`.${ID}-pc-banner .pc-button`)
				// 	.forEach((button) => {
				// 		button.addEventListener("click", () => {
				// 			fireEvent(
				// 				`Clicked Boots Advantage card banner ${button.textContent.trim()} button`
				// 			);
				// 		});
				// 	});
			}
		}
	});
};
