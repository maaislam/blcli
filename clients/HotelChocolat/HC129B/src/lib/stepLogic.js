import { flakePrices, kitPrices, updatePrice } from "./helpers";
import shared from "../../../../../core-files/shared";
import { fireEvent } from "../../../../../core-files/services";

export default () => {
	const { ID, VARIATION } = shared;

	let currentTab = 0;

	function showTab(n) {
		// tab to show
		const tab = document.getElementsByClassName(`${ID}-accordionStep`);
		tab[n].classList.add(`${ID}-stepShow`);
	}

	/**
	 * Choose Starter Kit
	 */

	const kitSwichter = document.querySelector(`.${ID}-starter-kit-switch`);

	if (kitSwichter) {
		kitSwichter.addEventListener("click", (e) => {
			const switcher = e.target.closest(".switcher");
			if (!switcher.classList.contains("active")) {
				kitSwichter.querySelectorAll(".switcher").forEach((el) => {
					el.classList.remove("active");
				});
				switcher.classList.add("active");

				if (switcher.classList.contains("without-s-kit")) {
					// switcher
					// 	.closest(`.${ID}-kits`)
					// 	.querySelector(`.${ID}-stepContent`)
					// 	.classList.add("no-kit");
					fireEvent(
						"Click - User clicked without starter kit option"
					);
					const kitproduct = document.querySelectorAll(
						`.${ID}-accordionStep.${ID}-kits .${ID}-product`
					);
					kitproduct.forEach((el) => {
						if (el.classList.contains(`${ID}-selected`)) {
							el.classList.remove(`${ID}-selected`);
							kitPrices.pop();

							updatePrice();
						}
					});
					document.querySelector("#price-with-Kit").innerHTML = ``;
				} else {
					fireEvent("Click - User clicked with starter kit option");
					// switcher
					// 	.closest(`.${ID}-kits`)
					// 	.querySelector(`.${ID}-stepContent`)
					// 	.classList.remove("no-kit");

					let prevSlide = $(`.${ID}-kits .${ID}-carousel`).slick(
						"slickGoTo",
						0
					);
					//prevSlide.slick("slickGoTo", 0);
					// console.log(prevSlide, "prevSlide");
					const element = document.querySelector(
						`.${ID}-kits .${ID}-kit:first-child`
					);

					const price = parseFloat(
						element
							.querySelector(`.${ID}-price`)
							.textContent.replace("£", "")
					);
					element.classList.add(`${ID}-selected`);
					kitPrices.push(price);
					updatePrice();
				}
			}
		});
	}

	const chooseKit = () => {
		const kitproduct = document.querySelectorAll(
			`.${ID}-accordionStep.${ID}-kits .${ID}-product`
		);

		// const makeActive = (e) => {
		//     const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));
		//     e.preventDefault();

		//     window.jQuery(`.${ID}-carousel`).slick('refresh');

		//     // // remove if deselected
		//     // if (e.currentTarget.classList.contains(`${ID}-selected`)) {
		//     //     e.currentTarget.classList.remove(`${ID}-selected`);
		//     //     kitPrices.pop();
		//     //     updatePrice();

		//     //     // add active, remove any other actives
		//     // } else if (!e.currentTarget.classList.contains(`${ID}-selected`)) {

		//     //     for (let index = 0; index < kitproduct.length; index += 1) {
		//     //         const element = kitproduct[index];
		//     //         element.classList.remove(`${ID}-selected`);
		//     //         kitPrices.pop();
		//     //         updatePrice();
		//     //     }

		//     //     e.currentTarget.classList.add(`${ID}-selected`);
		//     //     fireEvent('Clicked starter kit option');
		//     //     kitPrices.push(price);
		//     //     updatePrice();
		//     // }

		// }

		// for (let x = 0; x < kitproduct.length; x += 1) {
		//     const el = kitproduct[x];
		//     el.addEventListener('click', makeActive);
		// }
		let isFirst = true;
		let isFirstPre = true;
		for (let index = 0; index < kitproduct.length; index += 1) {
			const element = kitproduct[index];
			element.addEventListener("click", () => {
				const price = parseFloat(
					element
						.querySelector(`.${ID}-price`)
						.textContent.replace("£", "")
				);

				if (element.classList.contains(`${ID}-selected`)) {
					element.classList.remove(`${ID}-selected`);
					kitPrices.pop();

					updatePrice();

					if (
						VARIATION == 2 &&
						element.getAttribute("preselected") &&
						isFirstPre
					) {
						fireEvent(
							`Click - User unselects the preselected starter kit`
						);
						isFirstPre = false;
					}
					fireEvent(
						`Click - User unselected starter kit: ${
							element.querySelector(`.${ID}-name`).textContent
						}`
					);
				} else {
					element.classList.add(`${ID}-selected`);
					kitPrices.push(price);

					updatePrice();
					if (VARIATION == 2) {
						if (!isFirst) {
							fireEvent(
								`Click - User selected starter kit: ${
									element.querySelector(`.${ID}-name`)
										.textContent
								}`
							);
						}
						isFirst = false;
					} else {
						fireEvent(
							`Click - User selected starter kit: ${
								element.querySelector(`.${ID}-name`).textContent
							}`
						);
					}
				}
				setTimeout(() => {
					const selectedKits = document.querySelectorAll(
						`.${ID}-accordionStep.${ID}-kits .${ID}-product.${ID}-selected`
					);

					if (
						selectedKits.length > 0 &&
						!document
							.querySelector(".switcher.with-s-kit")
							.classList.contains("active")
					) {
						document
							.querySelector(".switcher.with-s-kit")
							.classList.add("active");
						document
							.querySelector(".switcher.without-s-kit")
							.classList.remove("active");
					} else if (
						selectedKits.length === 0 &&
						!document
							.querySelector(".switcher.without-s-kit")
							.classList.contains("active")
					) {
						kitPrices.pop();
						updatePrice();
						document.querySelector(
							"#price-with-Kit"
						).innerHTML = ``;
						document
							.querySelector(".switcher.with-s-kit")
							.classList.remove("active");
						document
							.querySelector(".switcher.without-s-kit")
							.classList.add("active");
					}
				}, 10);
			});

			if (VARIATION == 2 && index == 0) {
				element.setAttribute("preselected", "true");
				element.click();
			}
		}
	};

	/**
	 * Choose Flakes
	 */
	const chooseFlakes = () => {
		const product = document.querySelectorAll(
			`.${ID}-accordionStep.${ID}-flakesSlider .${ID}-product`
		);
		for (let index = 0; index < product.length; index += 1) {
			const element = product[index];
			element.addEventListener("click", () => {
				const price = parseFloat(
					element
						.querySelector(`.${ID}-price`)
						.textContent.replace("£", "")
				);

				if (element.classList.contains(`${ID}-selected`)) {
					element.classList.remove(`${ID}-selected`);
					flakePrices.pop();

					updatePrice();
				} else {
					element.classList.add(`${ID}-selected`);
					flakePrices.push(price);

					updatePrice();
					fireEvent("Clicked add a little more option");
				}
			});
		}
	};

	/**
	 * Show colour options first
	 */
	showTab(currentTab);
	const pageTitle = document.querySelector("#main h1");
	if (currentTab === 0) {
		const colourChoice = document.querySelectorAll(
			`.${ID}-product.${ID}-colour`
		);
		let isStatus = false;
		//make one active
		const makeActive = (e) => {
			e.preventDefault();
			for (let index = 0; index < colourChoice.length; index += 1) {
				const element = colourChoice[index];
				element.classList.remove(`${ID}-selected`);
			}
			e.currentTarget.classList.add(`${ID}-selected`);
			pageTitle.textContent = `${e.currentTarget.getAttribute(
				"prod-name"
			)}`;
			document
				.querySelector(`.back-in-stock-notification`)
				?.classList.add(`${ID}-hidden`);
			const atbCta = document.querySelector(`.${ID}-add`);
			if (e.currentTarget.getAttribute("prod-stock") === "false") {
				if (atbCta) {
					atbCta.classList.add(`${ID}-disabled`);
					atbCta.setAttribute("disabled", "true");
					atbCta.innerText = "Out of stock";
				}
			} else {
				if (atbCta) {
					atbCta.classList.remove(`${ID}-disabled`);
					atbCta.setAttribute("disabled", "false");
					atbCta.innerText = "Add to bag";
				}
			}

			showTab(1);
			// showTab(2);

			updatePrice();

			const selectedColor = e.currentTarget.querySelector("div");
			if (VARIATION == 1) {
				document.querySelector(
					`#${ID}-selected-color`
				).innerText = `${selectedColor?.getAttribute("title").trim()}`;
			}

			if (isStatus) {
				fireEvent(
					`Click - User chooses colour: ${selectedColor?.getAttribute(
						"title"
					)} Edition`
				);
			} else {
				isStatus = true;
			}

			// enable add button, including mobile
			const addButton = document.querySelectorAll(`.${ID}-add`);
			for (let index = 0; index < addButton.length; index++) {
				const element = addButton[index];
				element.classList.add(`${ID}-buttonShow`);
			}
			const klarnaBox = document.querySelector(
				`.${ID}-priceBox klarna-placement`
			);
			if (klarnaBox) {
				klarnaBox.classList.add(`${ID}-klarnaShow`);
				window.KlarnaOnsiteService.push({
					eventName: "refresh-placements",
				});
			}

			// make image match slick slide
			const activeElID = e.currentTarget.getAttribute("prod-id");

			const matchingSlide = document.querySelector(
				`.${ID}-productSlider .${ID}-image[attr="${activeElID}"]`
			);
			window
				.jQuery(`.${ID}-productSlider .${ID}-images`)
				.slick(
					"slickGoTo",
					parseFloat(matchingSlide.getAttribute("data-slick-index"))
				);

			// resize carousel
			window.jQuery(`.${ID}-carousel`).slick("refresh");
		};

		for (let x = 0; x < colourChoice.length; x += 1) {
			const el = colourChoice[x];
			el.addEventListener("click", makeActive);
		}
	}

	const checkDiscount = () => {
		const allSelected = document.querySelectorAll(
			`.${ID}-product.${ID}-selected`
		);

		for (let index = 0; index < allSelected.length; index += 1) {
			const element = allSelected[index];
			if (
				element.classList.contains(`${ID}-kit`) ||
				element.classList.contains(`${ID}-flake`)
			) {
				return true;
			}
		}
	};

	const dataLayerPush = (product) => {
		window.dataLayer.push({ ecommerce: null });
		window.dataLayer.push({
			event: "addToBag",
			product,
		});
	};

	/**
	 * Add all to bag
	 */
	const addProductToBag = () => {
		//let sentDataLayer = false;

		const addButton = document.querySelector(`.${ID}-add`);

		const ajaxAdd = () => {
			const qty = document.querySelector("input[name=Quantity]").value;

			// get all added
			const allSelected = document.querySelectorAll(
				`.${ID}-product.${ID}-selected`
			);
			let names = [];
			if (allSelected) {
				let storedProducts = [];
				for (let index = 0; index < allSelected.length; index += 1) {
					const element = allSelected[index];
					const productSku = element.getAttribute("prod-id");
					//const elName = element.textContent.trim();

					const storedName = element.getAttribute("prod-name");
					const price = element.getAttribute("prod-price");
					if (productSku) {
						// push all the added products to object
						var product = {};
						product["productName"] = storedName;
						product["price"] = price.replace("£", "");
						product["productSKU"] = productSku;
						product["productID"] = productSku;
						(product["productBrand"] = "Hotel Chocolat"),
							(product["productHierarchy"] = "Product List"),
							(product["product_quantity"] = qty),
							storedProducts.push(product);
						dataLayerPush(product);

						let addurl = false;

						window.jQuery.ajax({
							url: "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
							type: "post",
							data: `Quantity=${qty}&cartAction=add&pid=${productSku}`,
							success: function () {
								window.scrollTo(0, 0);
								document
									.querySelector(`.${ID}-add`)
									.classList.remove(`${ID}-addingToBag`);
								sessionStorage.setItem(
									`${ID}-productsAdded`,
									JSON.stringify(storedProducts)
								);

								if (addurl === false) {
									window.location.href = `${window.location.pathname}?addtobasket=true`;
									addurl = true;
								}
							},
						});

						names.push({
							"Product Name": storedName,
							"Product SKU": productSku,
						});
					}
				}
				fireEvent(
					`Click - User clicks add to bag CTA with options: ${JSON.stringify(
						names
					)}`
				);
			}
		};

		addButton.addEventListener("click", () => {
			if (checkDiscount() === true) {
				sessionStorage.setItem("HC88discount", true);
			} else {
				sessionStorage.removeItem("HC88discount");
			}

			addButton.classList.add(`${ID}-addingToBag`);
			addButton.textContent = "Adding...";
			ajaxAdd();
		});
	};

	chooseKit();
	// chooseFlakes();
	addProductToBag();
};
