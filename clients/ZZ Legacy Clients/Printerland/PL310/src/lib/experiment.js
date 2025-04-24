/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const pTitleContainerElm = document.querySelector("h1#productTitle");

	pTitleContainerElm?.addEventListener("click", (e) => {
		fireEvent("Click - Product Title");
	});

	const reviewCountElm = document.querySelector(
		".product-page__actions span a.review-link"
	);

	reviewCountElm?.addEventListener("click", (e) => {
		fireEvent("Click - Review Stars");
	});

	document
		.querySelector(".product-page__actions .rating.rating--stars")
		?.addEventListener("click", (e) => {
			reviewCountElm.click();
		});

	const reviewStars = document.querySelectorAll(
		".product-page__actions .rating.rating--stars span"
	);

	if (reviewStars.length > 0) {
		for (let index = 0; index < reviewStars.length; index++) {
			if (reviewStars[index].classList.contains("is-selected")) {
				break;
			} else {
				const iconElm = reviewStars[index].querySelector("i");
				iconElm?.classList.remove("fa");
				iconElm?.classList.add("far");
			}
		}
	}
	const promotionLink = document.querySelector(
		"#pnlAction .promotions .title a"
	);

	if (promotionLink) {
		const text = promotionLink.innerText.trim();
		promotionLink.innerText = text.charAt(0).toUpperCase() + text.slice(1);
		promotionLink.insertAdjacentHTML(
			"beforeend",
			'<i class="fas fa-angle-right"></i>'
		);
		promotionLink.addEventListener("click", (e) => {
			fireEvent("Click - Special Offer Information");
		});
	}

	const lnkCompare = document.querySelector("#lnkCompare");

	lnkCompare?.addEventListener("click", (e) => {
		fireEvent("Click - Add To Compre");
	});

	const businesPriceTooltip = document.querySelector(
		"#pnlPrice .price__items .bus-price__header i"
	);
	let hoverTimer;
	businesPriceTooltip?.addEventListener("mouseover", (e) => {
		hoverTimer = setTimeout(() => {
			fireEvent("Visible - Busines Price Tooltip");
		}, 400);
	});
	businesPriceTooltip?.addEventListener("mouseout", (e) => {
		clearTimeout(hoverTimer);
	});

	const atb = document.querySelector("#lnkBuyProduct");
	atb?.addEventListener("click", (e) => {
		fireEvent("Click - Add to Basket");
	});

	const stickyAtb = document.querySelector("#lnkBuyProductSticky");
	stickyAtb?.addEventListener("click", (e) => {
		fireEvent("Click - Add to Basket");
	});

	const nextDayDelivey = document.querySelector("#pnlDelivery .next-day-pip");
	nextDayDelivey?.addEventListener("click", (e) => {
		fireEvent("Click - Order Date Tooltip");
	});
	let stockAvailable;
	const data = window.dataLayer;
	for (let index = 0; index < data.length; index++) {
		if (data[index].event && data[index].event === "EEproductDetail") {
			stockAvailable = parseInt(
				data[index].ecommerce.detail.products[0].stock
			);
			break;
		}
	}

	let stockMessage;
	const priceContainer = document.querySelector("#pnlPrice .price-container");
	if (stockAvailable > 0 && stockAvailable <= 10) {
		stockMessage = `<i class="fas fa-check"></i> In stock - <span>&nbsp; Only ${stockAvailable} left</span>`;
	} else if (stockAvailable > 10 && stockAvailable < 100) {
		stockMessage = `<i class="fas fa-check"></i> <span> ${stockAvailable} In stock</span>`;
	} else if (stockAvailable > 99) {
		stockMessage = `<i class="fas fa-check"></i> <span> 99+ In stock</span>`;
	}
	if (stockAvailable !== 0) {
		priceContainer?.classList.add("stockAvailable");
		const stockElm =
			document.querySelector("#pnlPrice .info__section div.in-stock") ||
			document.querySelector("#pnlPrice .info__section div.out-of-stock");
		if (stockElm) {
			stockElm.innerHTML = "";
			stockElm.insertAdjacentHTML("afterbegin", stockMessage);
		}
		const subscriptionDOM = document.querySelector(
			"#pnlPrice .info__section div.contracts__link.scroll-to-element"
		);
		if (subscriptionDOM) {
			subscriptionDOM.remove();
			document
				.querySelector("#pnlPrice .pricing__section")
				?.insertAdjacentElement("afterend", subscriptionDOM);
		}
	}

	const viewVideoNewElm = document.createElement("div");
	viewVideoNewElm.classList.add("new-view-video");
	viewVideoNewElm.insertAdjacentHTML(
		"afterbegin",
		`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M11.05 7.78999L8.00005 5.49999V14.5L11.05 12.21L14 9.99999L11.05 7.78999ZM11.05 7.78999L8.00005 5.49999V14.5L11.05 12.21L14 9.99999L11.05 7.78999ZM11.05 7.78999L8.00005 5.49999V14.5L11.05 12.21L14 9.99999L11.05 7.78999ZM9.00005 2.06999V0.0499878C6.99005 0.249988 5.16005 1.04999 3.68005 2.25999L5.10005 3.68999C6.21005 2.82999 7.54005 2.24999 9.00005 2.06999ZM3.69005 5.09999L2.26005 3.67999C1.05005 5.15999 0.250049 6.98999 0.0500488 8.99999H2.07005C2.25005 7.53999 2.83005 6.20999 3.69005 5.09999ZM2.07005 11H0.0500488C0.250049 13.01 1.05005 14.84 2.26005 16.32L3.69005 14.89C2.83005 13.79 2.25005 12.46 2.07005 11ZM3.68005 17.74C5.16005 18.95 7.00005 19.75 9.00005 19.95V17.93C7.54005 17.75 6.21005 17.17 5.10005 16.31L3.68005 17.74ZM20 9.99999C20 15.16 16.08 19.42 11.05 19.95V17.93C14.97 17.41 18 14.05 18 9.99999C18 5.94999 14.97 2.58999 11.05 2.06999V0.0499878C16.08 0.579988 20 4.83999 20 9.99999Z" fill="#05C2F5"/>
	</svg> <span> View video</span>`
	);

	const controlVideoElm = document.querySelector(
		".product_main__body .product-page__quick-links .container__body a.btn[aria-label='Product_All_Videos']"
	);
	if (controlVideoElm) {
		viewVideoNewElm.addEventListener("click", (e) => {
			fireEvent("Click - View Video");
			controlVideoElm.click();
		});
		document
			.querySelector(".product_main__body .imagezoom")
			?.insertAdjacentElement("beforeend", viewVideoNewElm);
	}

	document.body.addEventListener("click", (e) => {
		const target = e.target;
		if (target.closest(".mcs-wrapper") && target.closest("#zoom-fig")) {
			fireEvent("Click -  Gallery");
		}
	});
	const newQuickLinksConatiner = document.createElement("div");
	newQuickLinksConatiner.classList.add("new-quick-links-inner");

	const inBox = document.createElement("div");
	inBox.classList.add("new-in-box-container");
	inBox.classList.add("in-box-only");
	inBox.insertAdjacentHTML(
		"afterbegin",
		`
		<div class="icon-in-box">
			<svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.9663 0.440784C15.827 0.445464 15.6992 0.472464 15.5951 0.508284L1.19507 6.26828C0.795634 6.42989 0.515598 6.84994 0.520072 7.28078V26.7208C0.520076 27.1479 0.799133 27.5619 1.19507 27.722L15.5951 33.482C15.8516 33.5858 16.1485 33.5858 16.4051 33.482L30.8051 27.722C31.201 27.5619 31.4801 27.1479 31.4801 26.7208V7.28078C31.4845 6.84994 31.2045 6.42989 30.8051 6.26828L16.4051 0.508284C16.2566 0.454392 16.1057 0.436284 15.9663 0.440784ZM16.0001 2.67956L27.4751 7.26956L23.4251 8.90078L12.5801 4.05201L16.0001 2.67956ZM9.40755 5.32328L20.5901 10.0258L16.0001 11.8708L4.52505 7.28078L9.40755 5.32328ZM2.68005 8.87828L14.9201 13.772V30.8833L2.68005 25.9783V8.87828ZM29.3201 8.87828V25.9783L24.6401 27.857V22.7608L21.7601 23.8408V29.0046L17.0801 30.8833V13.772L21.7601 11.9046V17.0008L24.6401 15.9208V10.7458L29.3201 8.87828V8.87828Z" fill="black"/>
			</svg>
		</div>
		<div class="in-box-title">
			What’s in the box?
		</div>
	`
	);

	pollerLite([".limited-row .product-overview .inthebox"], () => {
		let controlInBoxElm = document
			.querySelector(".limited-row .product-overview .inthebox")
			.closest(".column._35");

		if (controlInBoxElm) {
			//let status = true;
			inBox.addEventListener("click", (e) => {
				fireEvent("Click - What's in the box?");
				// let offsetTop = 200;
				// if (window.innerWidth >= 960) {
				// 	offsetTop = 200;
				// } else if (window.innerWidth < 960) {
				// 	offsetTop = 120;
				// }

				if (window.innerWidth > 300) {
					controlInBoxElm
						.querySelector(".modal-section__container")
						?.classList.add(`${ID}-show-side-modal`);
					controlInBoxElm
						.querySelector(
							".modal-section__container .modal-section__body"
						)
						?.classList.add("show");
					document.body.classList.add("modal-visible");
					document
						.querySelector(".modal-shroud")
						.classList.add("is-active");
				}
				document
					.querySelector(".modal-shroud")
					?.addEventListener("click", () => {
						controlInBoxElm
							.querySelector(".modal-section__container")
							?.classList.remove(`${ID}-show-side-modal`);
					});
				controlInBoxElm
					.querySelector("button.modal-close")
					?.addEventListener("click", () => {
						controlInBoxElm
							.querySelector(".modal-section__container")
							?.classList.remove(`${ID}-show-side-modal`);
					});
				// else {
				// 	let y = document
				// 		.querySelector(
				// 			".limited-row .product-overview .inthebox"
				// 		)
				// 		.closest(".column._35")
				// 		.getBoundingClientRect().top;

				// 	if (!status) {
				// 		y = y + window.scrollY - offsetTop;
				// 	} else {
				// 		y =
				// 			y -
				// 			document.querySelector(
				// 				".limited-row .product-overview .inthebox"
				// 			).scrollHeight;
				// 	}

				// 	window.scroll({
				// 		top: y,
				// 		behavior: "smooth",
				// 	});
				// 	if (status) {
				// 		setTimeout(() => {
				// 			let x =
				// 				document
				// 					.querySelector(
				// 						".limited-row .product-overview .inthebox"
				// 					)
				// 					.closest(".column._35")
				// 					.getBoundingClientRect().top +
				// 				window.scrollY -
				// 				130;
				// 			if (window.innerWidth < 960) {
				// 				x = x + 250;
				// 			}
				// 			window.scroll({
				// 				top: x,
				// 				behavior: "smooth",
				// 			});
				// 			status = false;
				// 		}, 400);
				// 	}
				// }
			});
			if (!document.querySelector(".new-in-box-container.in-box-only")) {
				newQuickLinksConatiner.insertAdjacentElement(
					"afterbegin",
					inBox
				);
			}
		}
	});

	const cartridges = document.createElement("div");
	cartridges.classList.add("new-in-box-container");
	cartridges.insertAdjacentHTML(
		"afterbegin",
		`
		<div class="icon-in-box">
			<img src="https://blcro.fra1.digitaloceanspaces.com/PL310/cartridges.jpg" alt="cartridges icon"/>
		</div>
		<div class="in-box-title">
			Cartridges
		</div>
	`
	);

	const controlCartridges = document.querySelector(
		"#pnlRelatedLink button.cartridges__link"
	);

	if (controlCartridges) {
		cartridges.addEventListener("click", (e) => {
			fireEvent("Click - Cartridges");
			controlCartridges.click();
		});
		newQuickLinksConatiner.append(cartridges);
	}

	document
		.querySelector(".product_main__body .product-page__quick-links")
		?.insertAdjacentElement("afterbegin", newQuickLinksConatiner);
};
