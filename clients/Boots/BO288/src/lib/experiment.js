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
import sizes from "./data";

const { ID, VARIATION } = shared;

const getProductFromAPI = (sapCode) => {
	return new Promise((resolve, reject) => {
		pollerLite(['#cvosVariantId_1'], () => {
			const url = 'https://optimisation-api.co.uk/multiple-search';
			// fetch with post
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// converting data to json
				body: JSON.stringify({
					"0": { sapcode: "" + sapCode + "" },
				}),
			})
				.then((response) => {
					return response.json();
				})
				.then((responseJSON) => {
					resolve(responseJSON); // Resolve the promise with the response data
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					reject(error); // Reject the promise with the error
				});
		});
	});
};


const addItems = (productSizes) => {
	productSizes.sort((a, b) => {
		let aSizeValue = parseInt(a.size.replace("ml", ""));
		let bSizeValue = parseInt(b.size.replace("ml", ""));
		return aSizeValue - bSizeValue;
	});

	const getAllPricesPromise = new Promise((resolve, reject) => {
		const promises = [];
		[].slice.call(productSizes).forEach((el, index) => {
			const promise = getProductFromAPI(el.sapCode).then((response) => {
				el.size = response[0].ppuVolume.trim().replace("ML", "ml");
				el.currentPrice = response[0].regularPrice;
			});
			promises.push(promise);
		});

		Promise.all(promises).then(() => {

			// Calculate price per unit for each product
			productSizes.forEach((el) => {
				const sizeInMl = parseFloat(el.size.replace("ml", ""));
				const valuePerUnit = el.currentPrice / sizeInMl;
				el.pricePerUnit = `£${(valuePerUnit * 100).toFixed(2)} / 100ml`;
				el.pricePerUnitAmount = valuePerUnit;
			});

			// Find the index of the product with the lowest price per unit
			const indexOfBestValue = productSizes.reduce(
				(minIndex, el, currentIndex, arr) => {
					return el.pricePerUnitAmount < arr[minIndex].pricePerUnitAmount
						? currentIndex
						: minIndex;
				},
				0
			);

			// Set bestValue to true for the product with the lowest price per unit
			productSizes.forEach((el, index) => {
				el.bestValue = index === indexOfBestValue;
			});
			resolve(productSizes);
		})
			.catch((error) => {
				console.error('Error fetching data:', error);
				reject(error); // Reject the promise with the error
			});
	});


	getAllPricesPromise.then((productSizes) => {

		const sizeOfCurrent = document
			.querySelector("#estore_product_title")
			.textContent.match(/(\d+(?:\.\d+)?)\s?(ml)\b/i)[0];
		let savingPriceBestValue = 0;
		[].slice.call(productSizes).forEach((element, index) => {
			const sizeEl = document.createElement("a");
			sizeEl.classList.add(`${ID}-size`);
			sizeEl.setAttribute("href", element.url);
			if (productSizes[index].size == sizeOfCurrent) {
				let smallSizeSaving = productSizes[index].pricePerUnitAmount;
				let biggerSizeSaving =
					productSizes[productSizes.length - 1].pricePerUnitAmount;
				smallSizeSaving = parseFloat(smallSizeSaving);
				biggerSizeSaving = parseFloat(biggerSizeSaving);


				savingPriceBestValue = ((smallSizeSaving - biggerSizeSaving) * 100).toFixed(
					2
				);
			}
			// if (element.bestValue) {

			// 	let smallSizeSaving = productSizes[0].pricePerUnitAmount;
			// 	let biggerSizeSaving =
			// 		productSizes[productSizes.length - 1].pricePerUnitAmount;
			// 	smallSizeSaving = parseFloat(smallSizeSaving);
			// 	biggerSizeSaving = parseFloat(biggerSizeSaving);

			// 	savingPriceBestValue = ((smallSizeSaving - biggerSizeSaving)*100).toFixed(
			// 		2
			// 	);

			// }

			let domString = ``;

			if (VARIATION !== "3") {
				domString = `
      <span ${element.bestValue ? `id="${ID}-bestvalue"` : ``
					} class="${ID}-sizeML ${element.bestValue
						? `${ID}-bestvalue ${ID}-bestvalue--active`
						: ``
					}"><span class="${ID}-sizeMLinner">${element.pricePerUnit}</span>
      `;
			}

			sizeEl.innerHTML = `
    <div class="${ID}-size_inner ${productSizes.length > 1 && VARIATION !== "3" ? `multiple` : ``
				}">
		</span>${element.bestValue
					? `<span class="${ID}-sizeMLbestvalue">Best Value</span>`
					: ""
				} 
		<div>	
      <p class="${ID}-sizevalue">${element.size}</p>
      <h3>£${element.currentPrice.toFixed(2)}</h3>
	  </div>
      ${domString}
	  ${element.bestValue &&
					savingPriceBestValue != 0 &&
					productSizes.length > 1
					? `<span class="${ID}-valueSave">Save £${savingPriceBestValue} / 100ml</span>`
					: ``
				}
    </div>
`;
			if (element.size === sizeOfCurrent) {
				sizeEl.classList.add(`${ID}-current`);
				sizeEl.removeAttribute("href");
			}
			if (element.bestValue) {
				sizeEl.classList.add(`${ID}-bestValue`);
			}

			document.querySelector(`.${ID}-container`).appendChild(sizeEl);
			if (VARIATION == "2") {
				sizeEl.querySelector(`.${ID}-sizeML`).remove();
				if (sizeEl.querySelector(`.${ID}-sizeMLbestvalue`)) {
					sizeEl.querySelector(`.${ID}-sizeMLbestvalue`).remove();
				}
				document.querySelector(`.${ID}-container`).style["justify-content"] = "flex-start";
				sizeEl.querySelector(`.${ID}-size_inner div h3`).remove();
				sizeEl.style.width = "60px";
				sizeEl.style.flex = "none";
				sizeEl.style.height = "unset";
				sizeEl.querySelector(`.${ID}-size_inner`).style["min-height"] = "unset";
				sizeEl.querySelector(`.${ID}-size_inner`).style["width"] = "auto";
				sizeEl.querySelector(`.${ID}-size_inner`).style["padding"] = "10px";

				if (sizeEl.classList.contains(`${ID}-bestValue`)) {
					sizeEl.querySelector(`.${ID}-size_inner`).style["margin-left"] = "5px";
				}

				if (sizeEl.classList.contains(`${ID}-current`)) {

					if (element.bestValue) {
						const targetContainer = document.querySelector(`#estore_product_title`);
						const bestValueEl = `
				<div class="${ID}-bestValueTitle ${ID}-bestvalue--active">
					<span class="${ID}-bestvalue__text">Best Value</span>
				</div>
				`
						targetContainer.insertAdjacentHTML("afterend", bestValueEl);

						let smallSizeSaving = productSizes[0].pricePerUnitAmount;
						let biggerSizeSaving =
							productSizes[productSizes.length - 1].pricePerUnitAmount;
						smallSizeSaving = parseFloat(smallSizeSaving);
						biggerSizeSaving = parseFloat(biggerSizeSaving);


						savingPriceBestValue = ((smallSizeSaving - biggerSizeSaving) * 100).toFixed(2);
						2

						const bestValueContext = `
				<div class="${ID}-bestValueContext ${ID}-bestvalue--active ${ID}-display-none">
					<span class="${ID}-valueSave">Save £${savingPriceBestValue} per 100ml</span>
				</div>`
						// targetContainer.insertAdjacentHTML("afterend", bestValueContext)
						const bestValueElDOM = document.querySelector(`.${ID}-bestValueTitle`);
						bestValueElDOM.insertAdjacentHTML("beforeend", bestValueContext);
						const bestValueContextEl = document.querySelector(`.${ID}-bestValueContext`);

						bestValueElDOM.addEventListener("mouseenter", () => {
							bestValueContextEl.classList.remove(`${ID}-display-none`);
							fireEvent('Mouse enter - best value shown', true);
						});
						bestValueElDOM.addEventListener("mouseleave", () => {
							bestValueContextEl.classList.add(`${ID}-display-none`);
						});

						bestValueElDOM.addEventListener("click", () => {
							bestValueContextEl.classList.toggle(`${ID}-display-none`);
							if (!bestValueContextEl.classList.contains(`${ID}-display-none`)) {
								fireEvent('Click - best value shown', true);
							}
						});
					}
				}
			}
		});

		if (VARIATION == "2") {
			const sizeHeader = `<div class="${ID}-sizeHeader">
		<h3 class="${ID}-sizeHeader__text">Size:</h3>
		</div>`;

			const targetContainer = document.querySelector(`.${ID}-root`);
			targetContainer.insertAdjacentHTML("afterbegin", sizeHeader);
		}
		// if (VARIATION !== "2") {
		// 	setInterval(() => {
		// 		document
		// 			.getElementById(`${ID}-bestvalue`)
		// 			.classList.toggle(`${ID}-bestvalue--active`);
		// 	}, 5000);
		// }
		// });
	});
};

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

	if (VARIATION == "control") {
		const productName = document
			.querySelector("#estore_product_title")
			.textContent.trim()
			.replace(
				/25ml|30ml|50ml|60ml|75ml|80ml|85ml|90ml|100ml|125ml|150m|200ml/,
				""
			)
			.replace(/^\s+|\s+$/g, "");

				

		const productSizes = sizes[productName];

		if (productSizes) {
			const sizeOfCurrentP = document
				.querySelector("#estore_product_title")
				.textContent.match(/(\d+(?:\.\d+)?)\s?(ml)\b/i)[0];
			fireEvent(`Current product size is ${sizeOfCurrentP}`);
		}

		// return 0;
	}

	let productName = document
		.querySelector("#estore_product_title")
		.textContent.trim()
		.replace(
			/25ml|30ml|50ml|60ml|75ml|80ml|85ml|90ml|100ml|110ml|125ml|150m|200ml/,
			""
		)
		.replace(/^\s+|\s+$/g, "")
		.replace("  ", " ").toLowerCase();

	let allSizes = Object.entries(sizes);

	let productSizes = allSizes.filter((size) => {

		if(size[0].toLowerCase() == productName) {
			return true;
		} else {
			return false;
		}

	});

	productSizes = productSizes[0][1];
	
	if (productSizes) {
		let testProductSizes = productSizes;
		testProductSizes.sort((a, b) => {
			let aSizeValue = parseInt(a.size.replace("ml", ""));
			let bSizeValue = parseInt(b.size.replace("ml", ""));
			return aSizeValue - bSizeValue;
		});

		testProductSizes = testProductSizes.filter((size) => {
			if(size.name.indexOf('SET') > - 1) {
				return false;
			} else {
				return size;
			}
		});
		
		let prodToBeAdded = [];

		const sizeOfCurrentP = document
			.querySelector("#estore_product_title")
			.textContent.match(/(\d+(?:\.\d+)?)\s?(ml)\b/i)[0];

		// if (VARIATION == "2" || VARIATION == "3") {
		if (VARIATION == "3") {
			testProductSizes = testProductSizes.filter(
				(element) =>
					parseInt(element.size.replace("ml", "")) >=
					parseInt(sizeOfCurrentP.replace("ml", ""))
			);
		}
		let shouldRenderComponent = true;
		if (testProductSizes.length <= 1) {
			shouldRenderComponent = false;
		}

		if (shouldRenderComponent) {
			fireEvent(`Interaction - Sizes ${VARIATION == "control" ? `would have been shown on page but this is the control` : `shown on page`}`);

			if(VARIATION !== "control") {
				const root = `
					<div class="${ID}-root">
						<div class="${ID}-container">
						</div>
					</div>
				`;

				document
					.querySelector("#estore_pdp_trcol_2")
					.insertAdjacentHTML("afterend", root);

				let totalProductLength = testProductSizes.length;
				for (const key in testProductSizes) {
					if (Object.hasOwnProperty.call(testProductSizes, key)) {

						const element = testProductSizes[key];
						const sapCode = element.sku;

						const client = window.__algolia.algoliasearch(
							"89JDFPR8F6",
							"057d489220f6a6a7675568b41438c324"
						);
						let bestValue = element.bestValue;

						const index = client.initIndex("prod_live_products_uk");
						index.search(sapCode).then(({ hits }) => {
							if (hits[0].pricePerUnit && hits[0].currentPrice) {
								if (VARIATION == "1" || VARIATION == "2") {
									bestValue = false;
								}

								prodToBeAdded.push({
									sapCode: sapCode,
									size: element.size,
									pricePerUnit: hits[0].pricePerUnit,
									currentPrice: hits[0].currentPrice,
									pricePerUnitAmount: parseFloat(
										hits[0].pricePerUnit
											.split(" ")[0]
											.replace("£", "")
									),
									bestValue: bestValue ? true : false,
									url: hits[0].actionURL,
								});
								if (prodToBeAdded.length === totalProductLength) {
									if (VARIATION == "1" || VARIATION == "2") {
										const lowest = prodToBeAdded.reduce(
											(prev, cur) =>
												cur.pricePerUnitAmount <
													prev.pricePerUnitAmount
													? cur
													: prev
										);
										lowest.bestValue = true;
									}

									// getProductFromAPI();
									addItems(prodToBeAdded);
								}
							}
						});
					}
				}
				document.body.addEventListener("click", (e) => {
					if (
						e.target.closest(`.${ID}-size`) ||
						e.target.classList.contains(`.${ID}-size`)
					) {
						fireEvent(
							`Click - size button ${e.target
								.closest(`.${ID}-size`)
								.querySelector(`.${ID}-sizevalue`).innerText
								? e.target
									.closest(`.${ID}-size`)
									.querySelector(`.${ID}-sizevalue`)
									.innerText
								: `no size found`
							} clicked, this was ${e.target
								.closest(`.${ID}-size`)
								.classList.contains(`${ID}-current`)
								? "the current size"
								: "not the current size"
							}`,
							true
						);
					}
				});

				pollerLite([`.${ID}-current .${ID}-sizevalue`], () => {
					let currSize = document.querySelector(
						`.${ID}-current .${ID}-sizevalue`
					).innerText;
					fireEvent(
						`Interaction - the current size is ${currSize}`,
						true
					);
				});
			}
			
		}
	}
};
