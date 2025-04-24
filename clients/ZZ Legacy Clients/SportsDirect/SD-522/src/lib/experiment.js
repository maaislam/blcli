/**
 * SD-522 - Sports Quiz
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import debounce from "lodash/debounce";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
	events,
	logMessage,
	pollerLite,
	observer,
} from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
let mySwiper;
let headings = [
	"Find the Perfect Product",
	"Who are you shopping for?",
	"Choose Your Sport",
	"Choose Your Category",
	// "Choose Your Size",
	"We're getting your results",
	"Your Perfect Match! Shop Now",
];

let stageNumber = 0;

let urlQuiz = false;

let stage0,
	stage1,
	stage2,
	stage3,
	stage4,
	// stage5,
	quizFooter,
	restartQuizButton,
	quizProgressBarInner,
	carouselInner,
	prevQuizButton;

let plpCode = "";

const initiateSlider = (prodCount) => {
	// Run slick
	let slider = document.querySelector(`#${ID}-results--carousel`);

	if (prodCount > 4) {
		slider.classList.add("swiper-active");
	}

	mySwiper = new Swiper(slider, {
		// Optional parameters
		init: false,
		loop: false,
		// If we need pagination
		slidesPerView: 5,
		slidesPerGroup: 5,
		spaceBetween: 20,

		// Responsive breakpoints
		breakpoints: {
			200: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			310: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			767: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
			},
			1800: {
				slidesPerView: 5,
				slidesPerGroup: 5,
			},
		},
		pagination: {
			el: `#${ID}-carousel-pagination`,
			type: "bullets",
			clickable: true,
		},
		navigation: {
			nextEl: `.${ID}-button-next`,
			prevEl: `.${ID}-button-prev`,
		},
	});

	// Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

	setTimeout(function () {
		if (prodCount > 4) {
			mySwiper.init();
		} else {
			removeSlider();
		}
	}, 300);

	setTimeout(function () {
		stage4.classList.remove("getting-results");

		document.getElementById(`${ID}-heading`).innerHTML =
			"Your top results!";
	}, 1500);
};

const updateSlider = () => {
	// update slider method - if the items reach 0 then removeSlider() is called
	if (carouselInner.querySelector(".swiper-wrapper").childElementCount == 0) {
		localStorage.setItem(`${ID}-removed-items`, "");
		removeSlider();
	}
	// update the slider
	mySwiper.update();
	// remove the loader after 1/2 a sec
	setTimeout(() => {
		document
			.querySelector(`.${ID}-carousel-holder`)
			.classList.remove("loading");
	}, 500);
};

const removeSlider = () => {
	// hide/remove all carousel things
	carouselInner.querySelector(".swiper-wrapper").style.transform =
		"translate3d(0,0,0)";
	carouselInner.classList.remove("swiper-active");
};

const checkProgress = () => {
	document.getElementById(`${ID}-heading`).innerText = headings[stageNumber];

	if (stageNumber == 0) {
		quizFooter.classList.add("disabled");

		restartQuizButton.classList.add("disabled");

		prevQuizButton.classList.add(`${ID}-button-disabled`);

		checkQuizHeight();
	} else if (stageNumber == 1) {
		quizFooter.classList.remove("disabled");

		restartQuizButton.classList.remove("disabled");

		quizProgressBarInner.setAttribute("data-percent", 25);
		quizProgressBarInner.innerText = "25%";

		prevQuizButton.classList.remove(`${ID}-button-disabled`);

		checkQuizHeight();
	} else if (stageNumber == 2) {
		quizProgressBarInner.setAttribute("data-percent", 50);
		quizProgressBarInner.innerText = "50%";

		prevQuizButton.classList.remove(`${ID}-button-disabled`);
	} else if (stageNumber == 3) {
		quizProgressBarInner.setAttribute("data-percent", 75);
		quizProgressBarInner.innerText = "75%";

		prevQuizButton.classList.remove(`${ID}-button-disabled`);
	} else if (stageNumber == 4) {
		quizProgressBarInner.setAttribute("data-percent", 100);
		quizProgressBarInner.innerText = "100%";

		prevQuizButton.classList.remove(`${ID}-button-disabled`);
	}
	// else if (stageNumber == 5) {
	// 	quizProgressBarInner.setAttribute("data-percent", 100);
	// 	quizProgressBarInner.innerText = "100%";

	// 	prevQuizButton.classList.remove(`${ID}-button-disabled`);
	// }
};

const moveForwardStage = () => {
	checkProgress();

	if (stageNumber == 0) {
		// do stage 0 stuff
	} else if (stageNumber == 1) {
		// do stage 1 stuff

		stage0.classList.remove("active");
		stage1.classList.add("active");
	} else if (stageNumber == 2) {
		// do stage 2 stuff

		stage1.classList.remove("active");
		stage2.classList.add("active");
	} else if (stageNumber == 3) {
		// do stage 3 stuff

		let currSelectedSport = localStorage
			.getItem(`${ID}-sport-option`)
			.toLowerCase();
		let currSelectedGender = localStorage
			.getItem(`${ID}-gender-option`)
			.toLowerCase();

		stage3.setAttribute("data-selected-sport", currSelectedSport);
		stage3.setAttribute("data-selected-gender", currSelectedGender);

		stage2.classList.remove("active");
		stage3.classList.add("active");

		let allSpans = stage3.querySelectorAll(`.${ID}-category-option`);
		[].slice.call(allSpans).forEach((span) => {
			span.style.opacity = "1";
		});
	} else if (stageNumber == 4) {
		// do stage 5 stuff

		stage3.classList.remove("active");
		stage4.classList.add("active");
		stage4.classList.add("getting-results");

		let requestURL1 =
			"https://www.sportsdirect.com" +
			localStorage
				.getItem(`${ID}-selected-category-option`)
				.toLowerCase();
		const request = new XMLHttpRequest();
		request.open("GET", requestURL1, true);
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				// Success!
				const data = request.responseText;
				// const sizeVariantId = request.responseURL;
				if (data) {
					let brandPage = document.createElement("div");
					brandPage.classList.add("hidden");
					brandPage.id = "no-visual";
					brandPage.innerHTML = data;
					// Get page code
					plpCode = brandPage
						.querySelector("#productlistcontainer")
						.getAttribute("data-category");

					let filters = "";

					if (
						localStorage.getItem(`${ID}-gender-option`) ==
							"Ladies" ||
						localStorage.getItem(`${ID}-gender-option`) == "Mens"
					) {
						filters +=
							"AFLOR^Unisex Adults," +
							localStorage.getItem(`${ID}-gender-option`);

						if (
							localStorage.getItem(`${ID}-gender-option`) ==
							"Ladies"
						) {
							filters += ",Womens";
						}
					} else {
						filters += "AFLOR^Unisex Kids,Boys,Girls";
					}

					if (
						localStorage.getItem(`${ID}-selected-size-option`) !==
						"na"
					) {
						filters +=
							"|ACSIZE^" +
							localStorage.getItem(`${ID}-selected-size-option`);
					}

					let requestURL =
						"https://www.sportsdirect.com" +
						localStorage
							.getItem(`${ID}-selected-category-option`)
							.toLowerCase() +
						"#dcp=1&dppp=120&OrderBy=rank&Filter=" +
						filters;

					let theData = {
						categoryId: plpCode,
						page: 1,
						productsPerPage: 120,
						sortOption: "rank",
						selectedFilters: filters,
						isSearch: false,
						searchText: "",
						columns: 3,
						mobileColumns: 2,
						clearFilters: false,
						pathName: localStorage
							.getItem(`${ID}-selected-category-option`)
							.toLowerCase(),
						searchTermCategory: "",
						selectedCurrency: "GBP",
						portalSiteId: 12,
						searchCategory: "",
					};

					var productApiRequestUrl =
						"/api/productlist/v1/getforcategory";

					let currentGetProductsXhr = $.ajax({
						cache: true,
						type: "GET",
						url: productApiRequestUrl,
						data: theData,
						dataType: "json",
						success: function (returnedData) {
							if (returnedData) {
								let allProducts = [].slice.call(
									returnedData.products
								);

								let numProdsDisplayed = 25;
								if (window.outerWidth < 600) {
									numProdsDisplayed = 10;
								}

								if (
									allProducts.length > 0 &&
									allProducts.length <= numProdsDisplayed
								) {
									let newRequestURL = requestURL.substring(
										0,
										requestURL.indexOf("|AC")
									);
									document.getElementById(
										`${ID}-see-all-matches`
									).innerHTML =
										"See all products in other sizes";
									document.getElementById(
										`${ID}-see-all-matches`
									).href = newRequestURL;
									document
										.querySelector(`.${ID}-results`)
										.classList.remove("no-results");
								} else if (allProducts.length == 0) {
									document
										.querySelector(`.${ID}-results`)
										.classList.add("no-results");
								} else {
									document.getElementById(
										`${ID}-see-all-matches`
									).innerHTML = "See all matches";
									document.getElementById(
										`${ID}-see-all-matches`
									).href = requestURL;
									document
										.querySelector(`.${ID}-results`)
										.classList.remove("no-results");
								}

								allProducts = allProducts.slice(
									0,
									numProdsDisplayed
								);

								let insertionPoint = document.querySelector(
									`.${ID}-results--carousel .swiper-wrapper`
								);

								insertionPoint.innerHTML = "";

								allProducts.forEach((product) => {
									let prodImageSrc = product.image;

									let prodName = product.name;
									let prodBrand = product.brand;
									let prodPrice = product.price;
									let prodRRPPrice = product.ticketPrice;
									let prodURL = product.url;

									let slideHTML = `
              
                <a href="${prodURL}" class="${ID}-results--slide swiper-slide">
                
                  <img src="${prodImageSrc}" class="${ID}-results--image" alt="${prodName} image" />

                  <div class="${ID}-results--details">
                  
                    <p class="${ID}-results--brand">${prodBrand}</p>
                    <p class="${ID}-results--name">${prodName}</p>

                    <p class="${ID}-results--price ${
										prodRRPPrice != 0 &&
										parseInt(prodRRPPrice) >
											parseInt(prodPrice)
											? `${ID}-results--pricesale`
											: ""
									}"><span class="${ID}-results--pricenow">${prodPrice}</span>${
										prodRRPPrice != 0 &&
										parseInt(prodRRPPrice) >
											parseInt(prodPrice)
											? `<span class="${ID}-results--priceold">${prodRRPPrice}</span>`
											: ""
									}</p>
                  </div>

                </div>`;

									insertionPoint.insertAdjacentHTML(
										"beforeend",
										slideHTML
									);
								});

								setTimeout(() => {
									initiateSlider(allProducts.length);
									quizFooter.classList.add("disabled");

									let allCarouselItems =
										document.querySelectorAll(
											`.${ID}-results--slide`
										);
									[].slice
										.call(allCarouselItems)
										.forEach((item) => {
											item.addEventListener(
												"click",
												(e) => {
													fireEvent(
														"Click - user clicked on carousel item to go to " +
															e.currentTarget.href
													);
												},
												false
											);
										});

									fireEvent(
										"Visible - the user has reached stage 5 and has been shown products"
									);
								}, 1000);
							}
						},
						error: function (xhr, textStatus, errorThrown) {
							if (textStatus != "abort")
								console.error(textStatus + errorThrown);
						},
						complete: function (data) {
							currentGetProductsXhr = null;
						},
					});
				}
			}
		};
		request.onerror = () => {
			// There was a connection error of some sort
		};
		request.send();
		// do ajax call
	}
};

const moveBackwardsStage = () => {
	checkProgress();

	if (stageNumber == 0) {
		// do stage 0 stuff

		stage0.classList.add("active");
		stage1.classList.remove("active");
	} else if (stageNumber == 1) {
		// do stage 1 stuff

		stage1.classList.add("active");
		stage2.classList.remove("active");
	} else if (stageNumber == 2) {
		// do stage 2 stuff

		stage2.classList.add("active");
		stage3.classList.remove("active");
	} else if (stageNumber == 3) {
		// do stage 3 stuff

		stage3.classList.add("active");
		stage4.classList.remove("active");
		//stage4.classList.add("getting-sizes");
		quizFooter.classList.remove("disabled");
	} else if (stageNumber == 4) {
		// do stage 4 stuff
		stage4.classList.add("active");
	}
};

const addQuizEntryPoint = () => {
	let startPointHTML = `

    <div class="${ID}-quiz-entry loading">

      <div class="loading-spinner">
        <p> Loading... </p>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
        </svg>
      </div>
    
      <div class="${ID}-quiz-entry-text-holder">
      
        <p> Need some inspiration? We've got you covered! </p>

        <p class="smaller-text"> Use our Product Finder </p>

        <button id="${ID}-start-quiz" class="${ID}-start-quiz">Get Started</button>

      </div>    
    
    </div>
  
  `;

	let insertionPosition = 5;

	let insertionPoint = document.querySelector(
		"#productlistcontainer #navlist li:nth-of-type(" +
			insertionPosition +
			")"
	);

	insertionPoint.insertAdjacentHTML("beforebegin", startPointHTML);

	fireEvent("Visible - quiz entry point loaded onto plp");

	pollerLite([`.${ID}-quiz-entry`], () => {
		let quizStartCTA = document.getElementById(`${ID}-start-quiz`);

		quizStartCTA.addEventListener("click", (e) => {
			window.scrollTo(0, 1);
			document.documentElement.classList.add(`${ID}-noscroll`);
			document
				.querySelector(`.${ID}-sports-quiz`)
				.classList.remove(`${ID}-hidden`);
			setTimeout(() => {
				checkQuizHeight();
			}, 100);

			fireEvent("Visible - quiz has been viewed for the first time");
		});

		setTimeout(function () {
			// sets the height of the takeover element to match the ones around it.
			let element = document.querySelector(
				"#productlistcontainer #navlist li:nth-of-type(" +
					insertionPosition +
					")"
			);
			let prevEleOffsetHeight = element.clientHeight;
			let prevEleFullHeight = prevEleOffsetHeight;

			let messageHolderRef = document.querySelector(`.${ID}-quiz-entry`);
			messageHolderRef.style.height = prevEleFullHeight + "px";
			if (messageHolderRef.classList.contains("loading")) {
				messageHolderRef.classList.remove("loading");
			}
		}, 500);
	});
};

const checkQuizHeight = () => {
	// Get quiz height

	let outerHeightHeader,
		elementHeight,
		innerHeightHeader,
		screenHeight = 0;

	screenHeight = document.body.clientHeight;

	if (window.outerWidth > 767) {
		outerHeightHeader =
			document.getElementById("HeaderGroup").clientHeight +
			document.querySelector(".SD_SiteWideLV8").clientHeight;

		innerHeightHeader =
			screenHeight -
			outerHeightHeader -
			document.querySelector(`.${ID}-sports-quiz--header`).clientHeight -
			document.querySelector(`.${ID}-quiz-footer`).clientHeight;

		elementHeight = screenHeight - outerHeightHeader;

		document.querySelector(`.${ID}-sports-quiz`).style.height =
			elementHeight + "px";

		//document.querySelector(`.${ID}-sports-quiz--body`).style.height = innerHeightHeader + "px";
	} else {
		innerHeightHeader =
			screenHeight -
			document.querySelector(`.${ID}-sports-quiz--header`).clientHeight -
			document.querySelector(`.${ID}-quiz-footer`).clientHeight;

		document.querySelector(`.${ID}-sports-quiz--body`).style.height =
			innerHeightHeader + "px";
	}
};

const buildQuiz = () => {
	let quizHTML = `
  
    <div class="${ID}-sports-quiz ${
		urlQuiz == false ? `${ID}-hidden` : `${ID}-url-based-quiz`
	}">
    
      <div class="${ID}-sports-quiz--header">

        <div class="${ID}-sports-quiz--headerinner">
        
          <button id="${ID}-prev-question" class="${ID}-prev-question ${
		stageNumber == 0 ? `${ID}-button-disabled` : ""
	}"><svg width="7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"> <polyline class="cls-1" points="4.35 8.18 0.35 4.18 4.35 0.18"/></g></g></svg> <span class="${ID}-button-text-inner">Go back</span> </button>

          <div class="${ID}-display">
            <p>Sport Starts Here</p>
            <h2 id="${ID}-heading"> Find the perfect fit </h2>
          </div>
        
          <button id="${ID}-exit-quiz" class="${ID}-exit-quiz"> <span class="${ID}-button-text-inner">Exit</span> <svg width="20" fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><path fill="#000000" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></svg> </button>
        
        </div>
      
      </div>

      <div class="${ID}-quiz-footer disabled">
      
        <div class="${ID}-quiz-footer--progressbar"> 
        
          <div class="${ID}-quiz-footer--progressinner" data-percent="25">25%</div>
        
        </div>
      
      </div>

      <div class="${ID}-sports-quiz--body">
      
        <div class="${ID}-sports-quiz--stage ${ID}-sports-quiz--stage0 ${
		stageNumber == 0 ? "active" : ""
	}">
        
          <div class="${ID}-sports-quiz--stage0-question">
        
            <p> Take our ideal product finding quiz and kit yourself out as a champion by finding winning clothing, footwear and equipment. Personalise your shopping experience by answering a few short questions. </p>

            <button id="${ID}-stage0-next" class="${ID}-quiz-button-next">Get started</button>

          </div>
        
        </div>

        <div class="${ID}-sports-quiz--stage ${ID}-sports-quiz--stage1 ${
		stageNumber == 1 ? "active" : ""
	}">
        
          <button class="${ID}-gender-option option-mens"><span>Mens</span></button>
          <button class="${ID}-gender-option option-ladies"><span>Ladies</span></button>
          <button class="${ID}-gender-option option-kids"><span>Kids</span></button>
        
        </div>

        <div class="${ID}-sports-quiz--stage ${ID}-sports-quiz--stage2 ${
		stageNumber == 2 ? "active" : ""
	}">
        
          <button class="${ID}-sport-option option-football"><span>Football</span></button>
          <button class="${ID}-sport-option option-training"><span>Training</span></button>
          <button class="${ID}-sport-option option-walking"><span>Walking</span></button>
          <button class="${ID}-sport-option option-cycling"><span>Cycling</span></button>
          <button class="${ID}-sport-option option-running"><span>Running</span></button>
          <button class="${ID}-sport-option option-golf"><span>Golf</span></button>
          <button class="${ID}-sport-option option-swimming"><span>Swimming</span></button>
          <button class="${ID}-sport-option option-basketball"><span>Basketball</span></button>
        
        </div>

        <div class="${ID}-sports-quiz--stage ${ID}-sports-quiz--stage3 ${
		stageNumber == 3 ? "active" : ""
	}">
        
          <button class="${ID}-category-option option-football option-football-shirts-kits" data-url="/football-shirts/all-football-shirts"><span>Football shirts and kits</span></button>
          <button class="${ID}-category-option option-football option-football-boots" data-url="/football/football-boots"><span>Football Boots</span></button>
          <button class="${ID}-category-option option-football option-football-training-wear" data-url="/football/training-wear"><span>Football Training Wear</span></button>

          <button class="${ID}-category-option option-training option-training-clothing" data-url="/fitness-and-training/gym-clothes/"><span>Gym Clothing</span></button>
          <button class="${ID}-category-option option-training option-training-gymtrainers" data-url="/fitness-and-training/gym-trainers/"><span>Gym Trainers</span></button>
          <button class="${ID}-category-option option-training option-training-accessories" data-url="/fitness-and-training/gym-accessories"><span>Gym Accessories</span></button>


          
          <button class="${ID}-category-option option-walking option-walking-clothing option-mens" data-url="/outdoor-clothing/mens-outdoor-clothing"><span>Mens Outdoor Clothing</span></button>
          <button class="${ID}-category-option option-walking option-walking-clothing option-ladies" data-url="/outdoor-clothing/ladies-outdoor-clothing"><span>Ladies Outdoor Clothing</span></button>
          <button class="${ID}-category-option option-walking option-walking-clothing option-kids" data-url="/outdoor-clothing/kids-outdoor-clothing"><span>Kids Outdoor Clothing</span></button>
          <button class="${ID}-category-option option-walking option-walking-footwear option-mens" data-url="/outdoor-footwear/mens-outdoor-footwear"><span>Mens Outdoor Footwear</span></button>
          <button class="${ID}-category-option option-walking option-walking-footwear option-ladies" data-url="/outdoor-footwear/ladies-outdoor-footwear"><span>Ladies Outdoor Footwear</span></button>
          <button class="${ID}-category-option option-walking option-walking-footwear option-kids" data-url="/outdoor-footwear/kids-outdoor-footwear"><span>Kids Outdoor Footwear</span></button>
          <button class="${ID}-category-option option-walking option-walking-rucksacks" data-url="/outdoor-equipment/rucksacks/all-rucksacks-and-bags"><span>Rucksacks &amp; Bags</span></button>

          <button class="${ID}-category-option option-cycling option-cycling-clothing" data-url="/cycling/cycling-clothing"><span>Cycling Clothing</span></button>
          <button class="${ID}-category-option option-cycling option-cycling-shoes" data-url="/cycling/cycling-shoes"><span>Cycling Shoes</span></button>
          <button class="${ID}-category-option option-cycling option-cycling-accessories" data-url="/cycling/cycling-accessories"><span>Cycling Accessories</span></button>

          <button class="${ID}-category-option option-running option-running-shoes option-mens" data-url="/running/running-shoes/mens-running-shoes"><span>Mens Running Shoes</span></button>
          <button class="${ID}-category-option option-running option-running-shoes option-ladies" data-url="/running/running-shoes/ladies-running-shoes"><span>Ladies Running Shoes</span></button>
          <button class="${ID}-category-option option-running option-running-shoes option-kids" data-url="/running/running-shoes/kids-running-shoes"><span>Kids Running Shoes</span></button>
          <button class="${ID}-category-option option-running option-running-clothing option-mens" data-url="/running/running-clothes/mens-running-clothes"><span>Mens Running Clothing</span></button>
          <button class="${ID}-category-option option-running option-running-clothing option-ladies" data-url="/running/running-clothes/ladies-running-clothes"><span>Ladies Running Clothing</span></button>
          <button class="${ID}-category-option option-running option-running-clothing option-kids" data-url="/running/running-clothes/kids-running-clothes"><span>Kids Running Clothing</span></button>
          <button class="${ID}-category-option option-running option-running-accessories" data-url="/running/running-accessories"><span>Running Accessories</span></button>

          <button class="${ID}-category-option option-golf option-golf-clothing" data-url="/golf/clothing"><span>Golf Clothing</span></button>
          <button class="${ID}-category-option option-golf option-golf-shoes" data-url="/golf/golf-shoes"><span>Golf Shoes</span></button>
          <button class="${ID}-category-option option-golf option-golf-accessories" data-url="/golf/accessories"><span>Golf Accessories</span></button>

          <button class="${ID}-category-option option-swimming option-swimming-swimwear option-mens" data-url="/swimming/mens-swimwear"><span>Mens Swimwear</span></button>
          <button class="${ID}-category-option option-swimming option-swimming-swimwear option-ladies" data-url="/swimming/ladies-swimwear"><span>Ladies Swimwear</span></button>
          <button class="${ID}-category-option option-swimming option-swimming-swimwear option-kids" data-url="/swimming/kids-swimwear"><span>Kids Swimwear</span></button>
          <button class="${ID}-category-option option-swimming option-swimming-goggles-caps" data-url="/swimming/swimming-accessories/goggles-and-caps"><span>Goggles &amp; Caps</span></button>
          <button class="${ID}-category-option option-swimming option-swimming-pool-shoes" data-url="/swimming/pool-shoes"><span>Pool Shoes</span></button>

          <button class="${ID}-category-option option-basketball option-basketball-shoes" data-url="/basketball/basketball-shoes"><span>Basketball Shoes</span></button>
          <button class="${ID}-category-option option-basketball option-basketball-clothing" data-url="/basketball/basketball-clothing"><span>Basketball Clothing</span></button>
          <button class="${ID}-category-option option-basketball option-basketball-jerseys" data-url="/basketball/basketball-jerseys"><span>Basketball Jerseys</span></button>
        
        </div>

        <div class="${ID}-sports-quiz--stage ${ID}-sports-quiz--stage5 ${
		stageNumber == 4 ? "active" : ""
	} getting-results">
        
          
          <div class="${ID}-animated-section">
            <div class="${ID}-animated-circle">
              <div></div>
            </div>
            <div class="${ID}-calculating">Calculating</div>
          </div>        
          

          <div class="${ID}-results">

            
            
          
            <div id="${ID}-results--carousel" class="${ID}-results--carousel swiper-container">
            
              <div class="swiper-wrapper">
              

              
              </div>

              <button class="${ID}-button ${ID}-button-prev"> <svg width="8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="4.35 8.18 0.35 4.18 4.35 0.18"/></g></g></svg></button>
            
              <button class="${ID}-button ${ID}-button-next"> <svg width="8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="0.18 0.18 4.18 4.18 0.18 8.18"/></g></g></svg></button>
            
              <div class="${ID}-carousel-pagination" id="${ID}-carousel-pagination"></div>
            
            </div>

            

            <a href="#" id="${ID}-see-all-matches" class="${ID}-see-all-matches">See all matches <span id="${ID}-see-all-matches-count-text">(1959 Products)</span></a>
          
          
          </div>


        </div>

        <a href="#" id="${ID}-retake-quiz" class="${ID}-retake-quiz disabled">Restart</a>

      
      </div>

      

    </div>
      
  `;
	let insertionPoint = document.body;
	if (urlQuiz == true) {
		let mainContent = document.querySelector(
			"#main-content.ContentWrapper"
		);
		insertionPoint = mainContent;
		mainContent.classList.add(`${ID}-url-based-quiz`);
	}

	insertionPoint.insertAdjacentHTML("afterbegin", quizHTML);

	checkQuizHeight();

	window.addEventListener(
		"resize",
		debounce(
			() => {
				checkQuizHeight();
			},
			250,
			{ trailing: true }
		)
	);

	// assignations

	stage0 = document.querySelector(`.${ID}-sports-quiz--stage0`);
	stage1 = document.querySelector(`.${ID}-sports-quiz--stage1`);
	stage2 = document.querySelector(`.${ID}-sports-quiz--stage2`);
	stage3 = document.querySelector(`.${ID}-sports-quiz--stage3`);
	stage4 = document.querySelector(`.${ID}-sports-quiz--stage5`);
	//stage5 = document.querySelector(`.${ID}-sports-quiz--stage5`);
	carouselInner = document.querySelector(`#${ID}-results--carousel`);
	quizFooter = document.querySelector(`.${ID}-quiz-footer`);
	quizProgressBarInner = document.querySelector(
		`.${ID}-quiz-footer--progressinner`
	);

	// Event Handlers

	prevQuizButton = document.getElementById(`${ID}-prev-question`);

	prevQuizButton.addEventListener("click", (e) => {
		e.preventDefault();
		stageNumber--;
		moveBackwardsStage();

		fireEvent("Click - user has asked go back");
	});

	let exitQuizButton = document.getElementById(`${ID}-exit-quiz`);

	exitQuizButton.addEventListener("click", (e) => {
		e.preventDefault();

		window.location.href = document.referrer;

		fireEvent(
			"Click - user has closed quiz using the X to go back to referrer page: " +
				document.referrer
		);
	});

	restartQuizButton = document.getElementById(`${ID}-retake-quiz`);
	restartQuizButton.addEventListener("click", (e) => {
		e.preventDefault();

		stageNumber = 0;
		moveBackwardsStage();
		quizFooter.classList.add("disabled");
		quizProgressBarInner.setAttribute("data-percent", 25);
		quizProgressBarInner.innerText = "25%";
		let allStages = document.querySelectorAll(`.${ID}-sports-quiz--stage`);
		[].slice.call(allStages).forEach((stage) => {
			stage.classList.remove("active");
		});
		stage0.classList.add("active");
	});

	// Stage 0 event handler

	let stage0Button = document.getElementById(`${ID}-stage0-next`);

	stage0Button.addEventListener("click", (e) => {
		e.preventDefault();
		stageNumber = 1;
		moveForwardStage();

		fireEvent("Visible - user has got to stage 1");
	});

	// Stage 1 event handler

	let stage1Buttons = document.querySelectorAll(`.${ID}-gender-option`);

	[].slice.call(stage1Buttons).forEach((button) => {
		button.addEventListener("click", (e) => {
			stageNumber = 2;
			moveForwardStage();

			localStorage.setItem(`${ID}-gender-option`, e.target.innerText);

			fireEvent(
				"Visible - user has got to stage 2 and selected: " +
					e.target.innerText +
					" for their gender"
			);
		});
	});

	// Stage 2 event handler

	let stage2Buttons = document.querySelectorAll(`.${ID}-sport-option`);

	[].slice.call(stage2Buttons).forEach((button) => {
		button.addEventListener("click", (e) => {
			stageNumber = 3;
			localStorage.setItem(`${ID}-sport-option`, e.target.innerText);
			moveForwardStage();

			fireEvent(
				"Visible - user has got to stage 3 and selected: " +
					e.target.innerText +
					" for their sport"
			);
		});
	});

	// Stage 3 event handler

	let stage3Buttons = document.querySelectorAll(`.${ID}-category-option`);

	[].slice.call(stage3Buttons).forEach((button) => {
		button.addEventListener("click", (e) => {
			stageNumber = 4;
			localStorage.setItem(
				`${ID}-selected-category-option`,
				e.currentTarget.getAttribute("data-url")
			);
			moveForwardStage();

			fireEvent(
				"Visible - user has got to stage 4 and selected: " +
					e.currentTarget.getAttribute("data-url") +
					" for their category"
			);
		});
	});

	// Stage 4 event handler

	// // some stage 4 event handlers happen after ajax call.

	// let showMoreSizes = document.getElementById(`${ID}-see-all-sizes`);
	// let sizesHolder = document.querySelector(`.${ID}-sizes`);
	// showMoreSizes.addEventListener("click", (e) => {
	// 	if (e.target.classList.contains("active")) {
	// 		e.target.classList.remove("active");
	// 		e.target.innerHTML = "Show more";
	// 		sizesHolder.classList.add("all-sizes-hidden");
	// 	} else {
	// 		e.target.classList.add("active");
	// 		e.target.innerHTML = "Show less";
	// 		sizesHolder.classList.remove("all-sizes-hidden");
	// 	}

	// 	fireEvent("Click - user has asked to see all sizes");
	// });

	// let skipSizeStep = document.getElementById(`${ID}-skip-size-step`);
	// skipSizeStep.addEventListener("click", (e) => {
	// 	stageNumber = 5;
	// 	localStorage.setItem(`${ID}-selected-size-option`, "na");
	// 	moveForwardStage();

	// 	fireEvent("Click - user has asked to see all sizes");
	// });

	// Stage 5 event handler

	let seeAllMatchesButton = document.getElementById(`${ID}-see-all-matches`);

	seeAllMatchesButton.addEventListener(
		"click",
		(e) => {
			fireEvent(
				"Click - user wants to see all matches and was taken to " +
					e.currentTarget.href
			);
		},
		false
	);
};

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	// Make the experiment work on a single URL
	urlQuiz = true;

	pollerLite(["#HeaderGroup", ".SD_SiteWideLV8"], () => {
		buildQuiz();
	});

	if (urlQuiz == false) {
		pollerLite(["#productlistcontainer #navlist"], () => {
			addQuizEntryPoint();

			pollerLite(["#navlist li"], () => {
				const navlist = document.getElementById("navlist");
				observer.connect(
					navlist,
					() => {
						if (!document.querySelector(`.${ID}-quiz-entry`)) {
							addQuizEntryPoint();
						}
					},
					{
						config: {
							attibutes: true,
							childList: true,
							subTree: false,
						},
					}
				);
			});
		});
	}
};
