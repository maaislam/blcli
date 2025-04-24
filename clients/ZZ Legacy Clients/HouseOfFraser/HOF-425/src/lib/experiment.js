/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
import { IsMobileView, IsTabletView, IsDesktopView } from "./helper/viewPort";
import debounce from "lodash/debounce";
import { cond } from "lodash";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	var isPLP = false;
	pollerLite(["#productlistcontainer #navlist"], () => {
		isPLP = document.querySelector("#productlistcontainer #navlist")
			? true
			: false;
	});

	if (isPLP) {
		fireEvent("conditions met - user views PLP on desktop device");
	}

	var isPDP = pageMeta_PageType === "ProductDetail" ? true : false;
	if (isPDP) {
		fireEvent("conditions met - user views PDP on desktop device");
	}

	// interaction with the Quick view element on PLP
	document.body.addEventListener("click", (e) => {
		if (e.target.classList.contains("QuickLookIcon")) {
			fireEvent(`click- interaction with the Quick view element on PLP`);
		}
	});
	// add to bag from the Quick view element on PLP
	document.body.addEventListener("click", (e) => {
		var status = false;
		var items = document.querySelectorAll("#hotspotModal select");
		for (let index = 0; index < items.length; index++) {
			if (items[index].value != "") {
				status = true;
			} else {
				status = false;
				break;
			}
		}

		if (
			e.target.getAttribute("id") == "addHotspotToBag" &&
			status &&
			e.target.closest("#hsAddToBagWrapper")
		) {
			fireEvent(`click - add to bag from the Quick view element on PLP`);
		} else if (
			e.target.classList.contains("innerHotSpotLine") &&
			status &&
			e.target.closest("#hsAddToBagWrapper")
		) {
			fireEvent(`click - add to bag from the Quick view element on PLP`);
		}
	});

	document.body.addEventListener("click", (e) => {
		var status = false;
		var items = document.querySelectorAll("#hotspotModal select");
		for (let index = 0; index < items.length; index++) {
			if (items[index].value != "") {
				status = true;
			} else {
				status = false;
				break;
			}
		}
		if (e.target.classList.contains(`WishIcon`)) {
			fireEvent(`click - interaction with the wishlist element on PLP`);
		} else if (
			e.target.getAttribute("id") == "addHotspotToWishList" &&
			status
		) {
			fireEvent(
				`click - interaction with the wishlist from the quick view on PLP`
			);
		}
	});

	const scrollNode = document.querySelector("#productlistcontainer");
	if (isPLP) {
		document.querySelector("body").onscroll = debounce((e) => {
			const winHeight = window.innerHeight;
			const docHeight = document.body.scrollHeight;
			const trackLength = docHeight - winHeight;
			const scrollTop = window.scrollY;
			const percentCalculation = parseInt(
				(scrollTop / trackLength) * 100
			);
			const percent = `${percentCalculation}%`;
			fireEvent(`page scroll on PLP- ${percent}`, true);
		}, 100);
	}

	if (isPDP) {
		pollerLite([".ThumbProdWrap.row"], () => {
			document
				.querySelector(".ThumbProdWrap.row")
				.addEventListener("click", (e) => {
					console.log(e.target);
					if (e.target.closest("div.ThumbProdWrap.row")) {
						console.log("init", e.target);
						fireEvent(
							`PDP Page which is ${window.location.pathname}`
						);
						fireEvent(
							`Click - interaction with the product images on the PDP`
						);
					}
				});
		});
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...
	if (shared.VARIATION == "1") {
		// write variation 1
		let products;

		function productUpdate() {
			document
				.querySelector("#productlistcontainer #navlist")
				.classList.add(`${ID}-productsContainer`);
			products = document.querySelectorAll("#navlist li[li-productid]");
			products.forEach(function (product) {
				if (!product.querySelector(".HOF-425-hoverImg")) {
					var prodImg = product
						.querySelector(".MainImage")
						.cloneNode(true);
					prodImg.removeAttribute("loading");
					prodImg.classList.add(`${ID}-hoverImg`);
					var path = product.getAttribute("li-url");
					var pId = product.getAttribute("li-productid");

					fetch(path)
						.then(function (response) {
							return response.text();
						})
						.then(function (html) {
							var parser = new DOMParser();
							var doc = parser.parseFromString(html, "text/html");

							var productDetailsVariants = doc.querySelector(
								".ProductDetailsVariants"
							);

							var prods = JSON.parse(
								productDetailsVariants.dataset.variants
							);

							prods.forEach(function (prod) {
								if (prod.ColVarId === pId) {
									var imgs = prod.ProdImages.AlternateImages;
									if (imgs.length > 1) {
										prodImg.setAttribute(
											"src",
											imgs[1].ImgUrlLarge
										);
									} else if (
										!prodImg.getAttribute("src") &&
										prodImg.getAttribute("data-src")
									) {
										prodImg.setAttribute(
											"src",
											prodImg.getAttribute("data-src")
										);
									}
								}
							});
							if (!product.querySelector(".HOF-425-hoverImg")) {
								product
									.querySelector(".MainImage")
									.insertAdjacentElement("afterend", prodImg);
							}
						});
				}
			});
		}

		pollerLite(["#productlistcontainer"], () => {
			productUpdate();
			var elementToObserve = document.querySelector(
				"#productlistcontainer #navlist"
			);
			var observer = new MutationObserver(productUpdate);
			observer.observe(elementToObserve, {
				attributes: false,
				subtree: false,
				childList: true,
			});
		});
	} else if (shared.VARIATION == "2") {
		// write variation 2
		let products;
		var cnt = 0;
		const arrowRight = `
            <svg class="HOF-425-arrowRight" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.9" width="30" height="30" fill="white"/>
                <path d="M11 8.74997L18.5 15.3125L11 21.875" stroke="black" stroke-width="1" stroke-linecap="round"/>
            </svg>
            `;

		const arrowLeft = `
            <svg class="HOF-425-arrowLeft" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.9" width="30" height="30" transform="matrix(-1 0 0 1 30 0)" fill="white"/>
                <path d="M19 8.75006L11.5 15.3126L19 21.8751" stroke="black" stroke-width="1" stroke-linecap="round"/>
            </svg>
            `;

		function productUpdate() {
			products = document.querySelectorAll("#navlist li[li-productid]");
			document
				.querySelector("#productlistcontainer #navlist")
				.classList.add(`${ID}-productsContainerV2`);
			products.forEach(function (product) {
				if (!product.querySelector(".hoverImg")) {
					let prodImg1 = product
						.querySelector(".MainImage")
						.cloneNode(true);
					let prodImg2 = product
						.querySelector(".MainImage")
						.cloneNode(true);
					let path = product.getAttribute("li-url");
					let pId = product.getAttribute("li-productid");

					prodImg1.removeAttribute("loading");
					prodImg2.removeAttribute("loading");
					prodImg1.classList.add(`${ID}-hoverImg`);
					prodImg2.classList.add(`${ID}-hoverImg`);

					fetch(path)
						.then(function (response) {
							return response.text();
						})
						.then(function (html) {
							let parser = new DOMParser();
							let doc = parser.parseFromString(html, "text/html");
							let productDetailsVariants = doc.querySelector(
								".ProductDetailsVariants"
							);
							let prods = JSON.parse(
								productDetailsVariants.dataset.variants
							);

							prods.forEach(function (prod) {
								if (prod.ColVarId === pId) {
									let imgs = prod.ProdImages.AlternateImages;
									if (imgs.length > 2) {
										prodImg1.setAttribute(
											"src",
											imgs[1].ImgUrlLarge
										);
										prodImg1.classList.add(
											`${ID}-displayNone`
										);
										product
											.querySelector(".MainImage")
											.closest("div")
											.insertAdjacentElement(
												"beforeend",
												prodImg1
											);

										prodImg2.setAttribute(
											"src",
											imgs[2].ImgUrlLarge
										);
										prodImg2.classList.add(
											`${ID}-displayNone`
										);
										product
											.querySelector(".MainImage")
											.closest("div")
											.insertAdjacentElement(
												"beforeend",
												prodImg2
											);
									} else if (imgs.length > 1) {
										prodImg1.setAttribute(
											"src",
											imgs[1].ImgUrlLarge
										);
										prodImg1.classList.add(
											`${ID}-displayNone`
										);
										product
											.querySelector(".MainImage")
											.closest("div")
											.insertAdjacentElement(
												"beforeend",
												prodImg1
											);
									}
								}
							});

							return product.querySelectorAll(".MainImage");
						})
						.then(function (imageNodes) {
							if (imageNodes.length > 1) {
								if (
									!product
										.querySelector(".MainImage")
										.closest("div")
										.querySelector(".HOF-425-arrowLeft")
								) {
									product
										.querySelector(".MainImage")
										.closest("div")
										.insertAdjacentHTML(
											"afterbegin",
											arrowLeft
										);
								}
								if (
									!product
										.querySelector(".MainImage")
										.closest("div")
										.querySelector(".HOF-425-arrowRight")
								) {
									product
										.querySelector(".MainImage")
										.closest("div")
										.insertAdjacentHTML(
											"beforeend",
											arrowRight
										);
								}

								cnt = 0;
								let numberOFImages = 0;

								product
									.querySelector(".HOF-425-arrowLeft")
									.addEventListener("click", function (e) {
										fireEvent(
											"interaction with the image carousel in the experience?"
										);
										e.preventDefault();
										imageNodes[cnt].classList.add(
											`${ID}-displayNone`
										);
										if (imageNodes.length > 2) {
											cnt = (cnt - 1 + 3) % 3;
										} else {
											cnt = (cnt - 1 + 2) % 2;
										}
										imageNodes[cnt].classList.remove(
											`${ID}-displayNone`
										);
									});

								product
									.querySelector(".HOF-425-arrowRight")
									.addEventListener("click", function (e) {
										fireEvent(
											"interaction with the image carousel in the experience?"
										);
										e.stopPropagation();
										e.preventDefault();
										imageNodes[cnt].classList.add(
											`${ID}-displayNone`
										);

										if (imageNodes.length > 2) {
											cnt = (cnt + 1 + 3) % 3;
											if (
												imageNodes.length ==
												numberOFImages + 1
											) {
												fireEvent(
													`Number of images users are viewing on the image carousel in the experience- ${imageNodes.length}`
												);
											} else {
												fireEvent(
													`Number of images users are viewing on the image carousel in the experience- ${
														(numberOFImages++ % 3) +
														1
													}`
												);
											}
										} else {
											cnt = (cnt + 1 + 2) % 2;
											if (
												imageNodes.length ==
												numberOFImages + 1
											) {
												fireEvent(
													`Number of images users are viewing on the image carousel in the experience- ${imageNodes.length}`
												);
											} else {
												fireEvent(
													`Number of images users are viewing on the image carousel in the experience- ${
														(numberOFImages++ % 2) +
														1
													}`
												);
											}
										}

										imageNodes[cnt].classList.remove(
											`${ID}-displayNone`
										);
									});
							}
						});
				}
			});
		}

		pollerLite(["#productlistcontainer"], () => {
			productUpdate();
			var elementToObserve = document.querySelector(
				"#productlistcontainer #navlist"
			);
			var observer = new MutationObserver(productUpdate);
			observer.observe(elementToObserve, {
				attributes: false,
				subtree: false,
				childList: true,
			});
		});

		pollerLite(["ul#navlist"], () => {
			var status = true;
			document.addEventListener("mouseover", (e) => {
				const target = e.target;

				if (
					status &&
					target.closest("li") &&
					target.closest("ul#navlist li")
				) {
					const images = target
						.closest("li")
						.querySelectorAll(".rtimg");
					if (images.length > 1) {
						const firstImg = images[0];
						const secondImg = images[1];
						if (!firstImg.classList.contains(`${ID}-displayNone`)) {
							firstImg.classList.add(`${ID}-displayNone`);
							secondImg.classList.remove(`${ID}-displayNone`);
							cnt = 1;
						}
					}
					status = false;
				}
			});
			document.addEventListener("mouseout", (e) => {
				const target = e.target;

				if (target.closest("li") && target.closest("ul#navlist li")) {
					const images = target
						.closest("li")
						.querySelectorAll(".rtimg");
					if (images.length > 1) {
						images.forEach((element) => {
							element.classList.add(`${ID}-displayNone`);
						});
						const firstImg = images[0];
						firstImg.classList.remove(`${ID}-displayNone`);
					}
					status = true;
				}
			});
		});
	}
};
