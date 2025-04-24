/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents, bootsEvents, fireBootsEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import AddToBag from "./addToBag";
import shared from "../../../../../core-files/shared";
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}|Recommendations on Brand / Category Pages`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;


export default () => {

	newEvents.initiate = true;
	newEvents.method = ['ga4'];
	newEvents.property = 'G-C3KVJJE2RH';
	bootsEvents.testID = testIDAndVariant;
  
	const data = {
		"/beauty": "1590591-1595015",
		"/beauty/luxury-beauty-skincare": "1590591-1595015-1603833",
		"/beauty/makeup": "1590591-1595015-1595036",
		"/beauty/hair": "1590591-1595015-1595040",
		"/health-pharmacy": "1590591-1595014-1595014",
		"/health-pharmacy/vitaminsandsupplements": "1590591-1595014-1595166",
		"/wellness": "1590591-1860697",
		"/fragrance": "1590591-1595016",
		"/fragrance/perfume": "1590591-1595016-1595043",
		"/fragrance/aftershave": "1590591-1595016-1595044",
		"/baby-child": "1590591-1595017",
		"/baby-child/pushchairs-car-seats": "1590591-1595017-1595053",
		"/electrical": "1590591-1595019",
		"/electrical/electrical-dental": "1590591-1595019-1595063",
		"/toiletries": "1590591-1595018",
		"/photo": "1590591-1595021",
		"/gift": "1590591-1595023",
		"/no7": "1597590-1611239",
		"/liz-earle": "1597590-1605230",
		"/soap-and-glory": "1597590-1611284",
	};

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------

	if (VARIATION == "control") {
		let url = window.location.pathname;

		if (url[url.length - 1] === "/") {
			url = url.substring(0, url.length - 1);
		}
		pollerLite(['#productRecommendationsABTest'], () => {
			if (data.hasOwnProperty(url)) {
				setup();

				// fireEvent("Conditions Met");

				if (window.usabilla_live) {
					window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
				}
			}
		})
		
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const getProductsFromAPI = (sapCode) => {
		return new Promise((resolve, reject) => {
				fetch('https://www.boots-optimisation.co.uk/prod-info/model/' + sapCode, {
					method: 'GET',
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
	};

	const renderModal = () => {
		const modal = `
			<div class="${ID}-modal_overlay" id="${ID}-modal_overlay"></div>
			<div class="${ID}-modal plpRedesignOverlay" id="${ID}-modal">
				<a title="Close overlay" class="modal-close-btn" href="javascript:void(0)">x</a>
				<div class="modal-content dijitContentPane">

				</div>
			</div>
		`;

		document.body.insertAdjacentHTML("beforeend", modal);
		fireBootsEvent('Modal rendered', true, eventTypes.experience_render, {
			render_element: elementTypes.Modal,
			render_detail: 'Carousel modal rendered',
		})
	};
	// console.log("BO333");

	pollerLite(["#AT-1884-Recommendations"], () => {
	// pollerLite(["#productRecommendationsABTest"], () => {
		// console.log("BO333");

		let url = window.location.pathname;
		if (url[url.length - 1] === "/") {
			url = url.substring(0, url.length - 1).toLowerCase();
		}

		if (data.hasOwnProperty(url)) {
			setup();
			// fireEvent("Conditions Met");

			if (window.usabilla_live) {
				window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
			}

			renderModal();

			const rscript = document.createElement("script");
			document.body.prepend(rscript);
			rscript.src = "//media.richrelevance.com/rrserver/js/1.2/p13n.js";

			rscript.addEventListener("load", function () {
				function getCookie(cname) {
					let name = cname + "=";
					let decodedCookie = decodeURIComponent(document.cookie);
					let ca = decodedCookie.split(";");
					for (let i = 0; i < ca.length; i++) {
						let c = ca[i];
						while (c.charAt(0) == " ") {
							c = c.substring(1);
						}
						if (c.indexOf(name) == 0) {
							return c.substring(name.length, c.length);
						}
					}
					return "";
				}
				

				var R3_COMMON = new window.r3_common();
				R3_COMMON.setApiKey("021e247385c72eb5");
				R3_COMMON.setBaseUrl(
					window.location.protocol +
						"//recs.richrelevance.com/rrserver/"
				);
				R3_COMMON.setClickthruServer(
					window.location.protocol + "//" + window.location.host
				);

				var sessionID = getCookie("userVisitId");

				if (sessionID.length > 0) {
					R3_COMMON.setSessionId(sessionID);
				}

				// Use this code if you are not requesting placement(s) for personalization
				R3_COMMON.addPlacementType("category_page.department_rec1");

				var R3_CATEGORY = new window.r3_category();
				// Category ID must match a category id as passed in catalog feed
				R3_CATEGORY.setId(data[url]);

				window.rr_flush_onload();

				window.r3();
			});



			pollerLite([() => window.RR?.data?.JSON], () => {
				const rrData = window.RR.data.JSON.placements;
				const productData = rrData[0].items;
				const productCodes = productData.map((product) => {
					// console.log(product);
					return product.id;
				});
				const promises = productCodes.map(productCode => {
					// console.log(productCode, 'productCode');
					return getProductsFromAPI(productCode);
				});

				Promise.all(promises).then((data) => {
					// console.log(data, 'data');
					let element =
						document
							.querySelector(".oct-carousel-hero")
							?.closest(`div[data-testid="row"]`)
							?.parentElement?.closest(
								`div[data-testid="row"]`
							) ||
						document
							.querySelector(".oct-carousel-horizontalnav")
							?.closest(`div[data-testid="row"]`)
							?.parentElement?.closest(
								`div[data-testid="row"]`
							) ||
						document
							.querySelector(".oct-teaser")
							?.closest(`div[data-testid="row"]`)
							?.parentElement?.closest(
								`div[data-testid="row"]`
							) ||
						document
							.querySelector(".oct-teaser__contents")
							?.closest(`div[data-testid="row"]`)
							?.parentElement?.closest(`div[data-testid="row"]`)
							?.nextElementSibling;

					let referenceElement = document.querySelector(
						// "#productRecommendationsABTest"
						"#AT-1884-Recommendations"
					);

					let items = "";
					data.forEach((product, index) => {
						product = product[0];

						let ratingClass;

						let conditions =
							product.averageReviewScore === 5 ||
							product.averageReviewScore === 0 ||
							product.averageReviewScore === 0.5 ||
							product.averageReviewScore === 1 ||
							product.averageReviewScore === 1.5 ||
							product.averageReviewScore === 2 ||
							product.averageReviewScore === 2.5 ||
							product.averageReviewScore === 3 ||
							product.averageReviewScore === 3.5 ||
							product.averageReviewScore === 4 ||
							product.averageReviewScore === 4.5 ||
							product.averageReviewScore === 5.0;

						if (conditions) {
							ratingClass = product.averageReviewScore
								.toString()
								.replace(".", "_");
						} else {
							let x = Math.round(
								product.averageReviewScore - 0.5
							);
							let y = x + 0.5;
							ratingClass = y.toString().replace(".", "_");
						}

						let rating = product.averageReviewScore;

						let isDiscounted = false;
						if (product.currentPrice < product.regularPrice) {
							isDiscounted = true;
						}

						let entitledItemId;

						if (product.entitledItemID) {
							entitledItemId = product.entitledItemID;
						} else {
							entitledItemId = parseInt(product.catID, 10) - 1;
						}

						items += `
								<div class="swiper-slide product_card estore_product_container">
									<div class="product-image">
										<a href="${rrData[0].items[index].link_url}">
											<img src="${product.referenceImageURL}" alt="${product.offerName}" />
										</a>
										${
											product.hasOtherPromotion
												? `<span class="product_offer_notify">Offer</span>`
												: ""
										}
										
									</div>
									<div class="product-details">
										<div class="product-title">
											<a href="${rrData[0].items[index].link_url}" title="${product.offerName}">
												${product.offerName}
											</a>
										</div>
										<div class="product_rating" data-product-link-reviews="10276083.P">
											<span class="rating${ratingClass}" alt="${rating} (out of 5) Star Rating" title="${rating} (out of 5) Star Rating" aria-label="${rating} (out of 5) Star Rating" style="color:#FFCC00;"></span>
											<a class="product_review_count" id="product_rating" aria-label="Product Rating, ${
												product.numberOfReviews
											}" href="${
							rrData[0].items[index].link_url
						}#BVRRContainer">
												(${product.numberOfReviews})
											</a>
										</div>
										${
											product.hasOtherPromotion
												? `<div class="product-offer">
														<span class="plp-promotion" data-id="${product.entitledItemID}">
															${product.promotionalText}
														</span>
													</div>`
												: ""
										}
										
										<div class="product-price">
											<div class="price-left ${isDiscounted ? `discounted` : ``}">
												<span class="current-price">£${parseFloat(product.currentPrice).toFixed(
													2
												)}</span>
												${
													isDiscounted
														? `<span class="was-price">Was £${parseFloat(
																product.regularPrice
														  ).toFixed(2)}</span>`
														: ""
												}
											</div>
											<div class="price-right">
												${
													isDiscounted
														? `<span class="save-price">Save £${(
																product.regularPrice -
																product.currentPrice
														  ).toFixed(2)}</span>`
														: ""
												}
											</div>
										</div>
										${
											product.ppuVolume !== "" &&
											product.ppuVolume !== null &&
											product.ppuVolume !== 0
												? `<div class="product-volume">
													<span class="product-volume__text">${product.ppuVolume}</span>
												</div>`
												: ""
										}
										${
											VARIATION == "2"
												? `<a href="${rrData[0].items[index].link_url}" class="view_details_cta">
														View product
													</a>`
												: `<button class="add-to-basket" data-sap="${product.SAPCode}" data-name="${product.offerName}" data-catentry="${product.catID}" data-entitledId="${entitledItemId}">Add to basket</button>
												`
										}
									</div>
								</div>	
							`;
					});

					const newProductsElementHTML = `
							<div data-testid="row" class="oct-grid__row oct-grid__row--full-width ${ID}_recommendations">
								<h3>Recommended Products</h3>
								<div class="swiper-container">
									<div class="swiper-wrapper product_list">
										${items}
									</div>
									<div class="swiper-button-prev"></div>
									<div class="swiper-button-next"></div>
								</div> 
							</div>
						`;

					referenceElement.insertAdjacentHTML(
						"afterbegin",
						newProductsElementHTML
					);
				});
			});

			pollerLite([`.${ID}_recommendations`], () => {
				const allAnchorTags = document.querySelectorAll(
					`.${ID}_recommendations .product_card`
				);

				allAnchorTags.forEach((anchor) => {
					const title = anchor
						.querySelector(".product-title a")
						.innerText.trim();
					anchor.addEventListener("click", (e) => {
						const target = e.target;
						if (target.closest("a")) {
							// fireEvent(`Click - User clicked a product on the recommendations: ${title}`);
							fireBootsEvent(`Click - User clicked a product on the recommendations: ${title}`, true, eventTypes.experience_action, {
								action: actionTypes.click_product,
								action_detail: 'User clicked a product on the recommendations',
							})
						}
					});
				});

				if (VARIATION == "2") {
					const allATBButtons = document.querySelectorAll(
						`.${ID}_recommendations .product_card button.add-to-basket`
					);
					allATBButtons.forEach((button) => {
						const sapCode = button.getAttribute("data-sap");
						const name = button.getAttribute("data-name");
						const catentryId = button.getAttribute("data-catentry");
						const entitleId =
							button.getAttribute("data-entitledId");
						const addToBag = new AddToBag(
							catentryId,
							entitleId,
							sapCode,
							name
						);
						button.addEventListener("click", (e) => {
							e.preventDefault();
							addToBag.add();
							// fireEvent(`Click - User clicked add to basket from the recommendations`);
							fireBootsEvent(`Click - User clicked add to basket from the recommendations`, true, eventTypes.experience_action, {
								action: actionTypes.add_to_cart,
								action_detail: 'User clicked add to basket from the recommendations',
							})
						});
					});
				} else {
					const allDetailsCta = document.querySelectorAll(
						`.${ID}_recommendations .product_card a.view_details_cta`
					);
					allDetailsCta.forEach((button) => {
						button.addEventListener("click", (e) => {
							// fireEvent(`Click - User clicked view details CTA from the recommendations`);
							fireBootsEvent(`Click - User clicked view details CTA from the recommendations`, true, eventTypes.experience_action, {
								action: actionTypes.click_cta,
								action_detail: 'User clicked view details CTA from the recommendations',
							})
						});
					});
				}

				const allPromoCTAs = document.querySelectorAll(
					`.${ID}_recommendations .product_card .product-offer .plp-promotion`
				);

				allPromoCTAs.forEach((button) => {
					button.addEventListener("click", (e) => {
						e.preventDefault();
						const productId = button.getAttribute("data-id");

						let url = `/displayPromotionListViewRedesign?catalogId=${window.WCParamJS?.catalogId}&storeId=${window.WCParamJS?.storeId}&langId=${window.WCParamJS?.langId}`;

						fetch(url, {
							method: "POST",
							body: `productId=${productId}&objectId=&requesttype=ajax`,
							headers: {
								"X-Requested-With": "XMLHttpRequest",
								"Content-Type":
									"application/x-www-form-urlencoded",
							},
						}).then((response) => {
							response.text().then((html) => {
								html = html.replaceAll("�", "£");

								const modal = document.querySelector(
									`#${ID}-modal .modal-content`
								);
								modal.innerHTML = "";
								modal.insertAdjacentHTML("afterbegin", html);
								modal
									.closest(`#${ID}-modal`)
									.classList.add("open");
								document
									.querySelector(`#${ID}-modal_overlay`)
									.classList.add("open");
							});
						});
					});
				});

				const modalClose = document.querySelector(
					`#${ID}-modal .modal-close-btn`
				);
				modalClose?.addEventListener("click", (e) => {
					e.preventDefault();
					const modal = document.querySelector(
						`#${ID}-modal .modal-content`
					);
					modal.innerHTML = "";
					modal.closest(`#${ID}-modal`).classList.remove("open");
					document
						.querySelector(`#${ID}-modal_overlay`)
						.classList.remove("open");
				});

				document
					.querySelector(`#${ID}-modal_overlay`)
					?.addEventListener("click", (e) => {
						e.preventDefault();
						const modal = document.querySelector(`#${ID}-modal`);
						modal.classList.remove("open");
						document
							.querySelector(`#${ID}-modal_overlay`)
							.classList.remove("open");
					});
				var scriptElement = document.createElement("script");
				// Set the source URL of the script
				scriptElement.setAttribute(
					"src",
					"https://blcro.fra1.digitaloceanspaces.com/KG-234/swiper-bundle.min.js"
				);
				// Append the script element to the document's head
				document.head.appendChild(scriptElement);
				// Handle the script load event
				scriptElement.addEventListener("load", function () {
					// Script has finished loading and executing

					const swiper = new Swiper(
						`.${ID}_recommendations .swiper-container`,
						{
							slidesPerView: 4,
							loop: false,
							//slidesPerGroup: 1,
							spaceBetween: 22,
							//centerInsufficientSlides: true,

							navigation: {
								nextEl: `.${ID}_recommendations .swiper-container .swiper-button-next`,
								prevEl: `.${ID}_recommendations .swiper-container .swiper-button-prev`,
							},
							breakpoints: {
								300: {
									slidesPerView: "2",
									//slidesPerGroup: 4,
									spaceBetween: 8,
								},
								576: {
									slidesPerView: "3",
									//slidesPerGroup: 4,
									spaceBetween: 14,
								},
								1281: {
									slidesPerView: "4",
									//slidesPerGroup: 4,
									spaceBetween: 22,
								},
							},
						}
					);

					window.addEventListener("resize", () => {
						swiper.update();
					});
				});
			});
		}
	});
};
