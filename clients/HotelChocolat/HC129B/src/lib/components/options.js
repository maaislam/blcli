import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
//import { colours, flakes, starterKits } from "../data";
import { slickProducts } from "../helpers";

/**
 * Create options
 */

const { ID, VARIATION } = shared;

export default () => {
	/**
	 *
	 * @param {*} object - data object
	 * @param {*} type - product type
	 * @param {*} parentEl - element new items will be added to
	 */
	const createOptions = (object, type, parentEl) => {
		Object.keys(object).forEach((i) => {
			const el = object[i];
			const newEl = document.createElement("div");
			newEl.classList.add(`${ID}-product`);
			newEl.classList.add(`${ID}-${type}`);
			newEl.setAttribute("prod-id", el.id);
			newEl.setAttribute("prod-price", el.price);
			if (el.no) {
				newEl.setAttribute("slideNo", el.no);
			}
			newEl.setAttribute("prod-name", el.dataLayerName);
			newEl.innerHTML = `
            <div class="${ID}-productimage" style="background-image:url(${
				el.image
			})"></div>
			${
				VARIATION == 2
					? `<div class="${ID}-selected-icon">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="20" height="20" rx="10" fill="black"/>
				<path d="M8.35997 15.7733L3.64664 10.3333C3.47997 10.14 3.49997 9.84667 3.6933 9.67334C3.88664 9.50001 4.17997 9.52667 4.3533 9.72001L8.30664 14.28L15.6266 4.41334C15.78 4.20667 16.0733 4.16001 16.28 4.31334C16.4866 4.46667 16.5333 4.76001 16.38 4.96667L8.35997 15.7733Z" fill="white"/>
			</svg>
		</div>`
					: ""
			}
            <p>
                <span class="${ID}-name">${[i][0]}</span>
                ${
					el.wasPrice
						? `
                <div class="${ID}-priceBlock">
                    <span class="${ID}-wasPrice">${el.wasPrice}</span> 
                    <span class="${ID}-price">${el.price}</span>
                </div>`
						: `<span class="${ID}-price">${el.price}</span>`
				}
            </p>`;

			document.querySelector(parentEl).appendChild(newEl);
		});
	};

	const createColours = (object, type, parentEl) => {
		Object.keys(object).forEach((i) => {
			const el = object[i];
			const newEl = document.createElement("div");
			newEl.classList.add(`${ID}-product`);
			newEl.classList.add(`${ID}-${type}`);
			newEl.setAttribute("prod-id", el.id);
			if (el.no) {
				newEl.setAttribute("slideNo", el.no);
			}

			var request = new XMLHttpRequest();
			request.open("GET", el.url, false); // `false` makes the request synchronous
			request.send(null);

			if (request.status === 200) {
				const html = request.responseText;
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, "text/html");
				const backInStockNotification =
					doc.querySelector(".back-in-stock-notification") ||
					doc.querySelector("#add-to-cart").value == "Out of stock";
				if (backInStockNotification) {
					newEl.setAttribute("prod-stock", false);
				} else {
					newEl.setAttribute("prod-stock", true);
				}
			}

			newEl.setAttribute("prod-name", el.dataLayerName);
			newEl.setAttribute("prod-price", el.price);
			newEl.setAttribute("prod-url", el.url);
			newEl.innerHTML = `<div class="${ID}-productimage ${ID}-${i}" title="${i}"></div>`;

			document.querySelector(parentEl).appendChild(newEl);
		});

		// pollerLite([`.check-store-stock`], () => {
		// 	if (!document.querySelector(`.back-in-stock-notification`)) {
		// 		document.querySelector(`.check-store-stock`).insertAdjacentHTML(
		// 			"afterend",
		// 			`<a href="/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Product-BackInStockDialog?pid=${pid}" title="Notify when in stock" class="back-in-stock-notification button hide">
		// 					Notify when in stock
		// 				</a>`
		// 		);
		// 	}
		// });
	};

	createColours(
		window.HCcolours,
		"colour",
		`.${ID}-colours .${ID}-carousel-colours`
	);
	createOptions(window.HCkits, "kit", `.${ID}-kits .${ID}-carousel`);
	// createOptions(
	// 	window.HCflakes,
	// 	"flake",
	// 	`.${ID}-flakesSlider .${ID}-carousel`
	// );

	// createOptions(colours, 'colour', `.${ID}-colours .${ID}-carousel`);
	// createOptions(starterKits, 'kit', `.${ID}-kits .${ID}-carousel`);
	// createOptions(flakes, 'flake', `.${ID}-flakesSlider .${ID}-carousel`);

	const idOfCurrent = document.querySelector("#pid").value;
	const showSlide = document
		.querySelector(`.${ID}-colour[prod-id="${idOfCurrent}"]`)
		.getAttribute("slideNo");

	slickProducts(`.${ID}-kits .${ID}-carousel`, 0);
	slickProducts(`.${ID}-colours .${ID}-carousel`, parseFloat(showSlide));
	slickProducts(`.${ID}-flakesSlider .${ID}-carousel`, 0);

	// Kit change event

	pollerLite([`.${ID}-kits .${ID}-carousel.slick-initialized`], () => {
		let isFirst = true;
		let prevSlide = $(`.${ID}-kits .${ID}-carousel`)[0].slick.currentSlide;
		$(`.${ID}-kits .${ID}-carousel`).on(
			"afterChange",
			function (event, slick, currentSlide) {
				//console.log("Kit change", slick, currentSlide);
				if (!isFirst && prevSlide !== currentSlide) {
					fireEvent(`User slides through the starter kit carousel`);
				}
				prevSlide = currentSlide;
				isFirst = false;
			}
		);
	});
	window.jQuery(`.${ID}-carousel`).slick("resize");
};
