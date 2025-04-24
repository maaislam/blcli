/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const links = [
	"/collections/pushchairs-prams",
	"/collections/mamas-papas-ocarro",
	"/collections/mamas-papas-strada",
	"/collections/mamas-papas-airo",
	"/collections/mamas-papas-flip-xt",
	"/collections/buggies-strollers",
	"/collections/shop-pushchairs-by-brand",
];

const pushchairPLPPage = () => {
	let pushchairRoundelHTML = `
	<div class="${ID}-pushchair-roundels-container">
		<button class="roundel-arrows roundel-arrow-left">
		<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-left" viewBox="0 0 40 32">
		<path d="M879.7,892.373q-.771-.05-.977-.049a4.229,4.229,0,0,0-1.336-.551,16.413,16.413,0,0,0-2.006-.4q-1.08-.15-1.954-.3a5.53,5.53,0,0,1-1.079-.25q-2.573-.3-5.707-.451t-6.119-.15h-8.492c.477-.313.947-.641,1.4-1q.824-.7,2.262-2.1a36.622,36.622,0,0,0,2.828-3.106,25.539,25.539,0,0,0,2.416-3.5,6.775,6.775,0,0,0,1.028-3.306q0-1.1-.772-1.352a4.571,4.571,0,0,0-.976-.25,1.9,1.9,0,0,0-.669.1q-.258.1-.462.2h.206a.71.71,0,0,1-.514.2,69.807,69.807,0,0,0-6.889,5.809l-4.01,3.6a4.839,4.839,0,0,1-1.028,1.2l-1.9,1.853a7.506,7.506,0,0,0-1.389,1.653h-.1q-.824.6-1.337,1.051a2.565,2.565,0,0,0-.721,1.453v1.6a4.015,4.015,0,0,0,.155,1.253,9.982,9.982,0,0,0,1.183,1.852,2.691,2.691,0,0,1,2.159,1.152q.719,1.052,1.44,2.254l.823,1.3v-.1a10.786,10.786,0,0,0,3.7,3.355,18.933,18.933,0,0,0,4.73,1.954h.308v.1l.362-.439a2.54,2.54,0,0,0,1.18.59l-.2-.1v-.2l.187-.274c.022.008.054.008.07.024a.419.419,0,0,0,.258.05l-.309-.3-.069.134-.034-.034.206-.5h-.617v-.35q.925,0,.771.05c-.1.033-.12.051-.051.051a2.876,2.876,0,0,0,1.131.5.422.422,0,0,1,.308-.1h.514a.212.212,0,0,0,.155-.049.207.207,0,0,1,.154-.05l.1-.1a1.934,1.934,0,0,0,1.954.7,4.7,4.7,0,0,0-1.49-1.6q-1.185-.9-2.623-1.9-1.337-.9-2.776-2a9.474,9.474,0,0,1-2.057-2,6.214,6.214,0,0,0-.72-1.1,11.151,11.151,0,0,0-.823-.9c-.522-.559-.99-1.13-1.432-1.708.069,0,.14,0,.2,0q1.439,0,3.754-.1t3.651-.3a.427.427,0,0,0,.309.1q1.131,0,2.159-.049c.685-.035,1.371-.051,2.056-.051q7.3-.5,10.591-.451t3.292-.751a2.883,2.883,0,0,1,1.49-.351,2.838,2.838,0,0,0,1.7-.55c.548-.133.925-.216,1.13-.251a10.451,10.451,0,0,0,1.029-.251A5.147,5.147,0,0,0,879.7,892.373Zm-22.982,14.073v.25a.744.744,0,0,1-.309-.051.462.462,0,0,0-.206-.05c-.068.133-.068.2,0,.2l-.012.01-.3-.36Z" transform="translate(-841.401 -875.597)" fill="#24394d"></path>
		</svg></button>	
	  	<button class="roundel-arrows roundel-arrow-right active"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-right" viewBox="0 0 40 32">
		  <path d="M940.675,891.236a3.97,3.97,0,0,0-.739-1.355,7.665,7.665,0,0,0-1.528-1.548,6.964,6.964,0,0,0-1.971-1.6,33.117,33.117,0,0,0-3.056-1.6q-.591-.289-1.084-.483t-1.084-.484a14.212,14.212,0,0,1-1.281-.726,13.178,13.178,0,0,1-1.577-1.21l-.3-.1h.1q-.986-.773-2.02-1.5a5.548,5.548,0,0,0-2.514-.919,6.993,6.993,0,0,0-1.527.145q-.642.145-.641.629a6.093,6.093,0,0,0,1.233,3.434,26.343,26.343,0,0,0,2.612,3.24,20.7,20.7,0,0,0,2.169,1.113q1.38.63,2.464,1.015,1.085.485,2.416,1.016a12.388,12.388,0,0,1,1.573.786c-.437-.1-.89-.19-1.376-.258q-1.035-.145-1.873-.29a5.293,5.293,0,0,1-1.035-.241q-2.465-.292-5.471-.436t-5.865-.145h-9.267a25.607,25.607,0,0,0-3.153.145,16.9,16.9,0,0,0-1.677.29,2.31,2.31,0,0,0-.837.338.75.75,0,0,1-.443.194q-1.774.386-2.12,1.064a1.138,1.138,0,0,0,.247,1.353,4.6,4.6,0,0,0,1.873,1.161,7.739,7.739,0,0,0,2.76.485c.065.129.46.225,1.183.29s1.248.1,1.576.1q1.381,0,3.6-.1a35.1,35.1,0,0,0,3.5-.29.407.407,0,0,0,.3.1q1.084,0,2.07-.047c.656-.034,1.314-.049,1.97-.049q7-.485,10.154-.436a14.8,14.8,0,0,0,1.693-.057l-.215.159h.1l-.2.192-2.366,1.839q-1.38,1.159-3.006,2.467a24.141,24.141,0,0,0-2.957,2.8,17.4,17.4,0,0,0-2.218,3.1,6.6,6.6,0,0,0-.887,3.24,5.557,5.557,0,0,0,.3,1.692q.3.919,1.084.823l-.2.967a2.039,2.039,0,0,0,1.38.1,2.188,2.188,0,0,0,.69-.29l-.69-.193a3.384,3.384,0,0,0,1.084-.871l.4-.193c.393,0,.574.015.542.048s-.017.081.05.146c.065.257.2.387.393.387a1.937,1.937,0,0,0,1.282-.677,11.164,11.164,0,0,0,1.38-1.693q.69-1.016,1.331-2.176t1.133-2.031l.3-.58q1.381-1.645,2.464-2.806t1.971-2.031c.329-.322.64-.612.936-.871s.609-.548.937-.871q.395-.579,1.38-1.789l1.774-2.176.2-.195a.424.424,0,0,0-.05-.192.67.67,0,0,1-.049-.29,2.394,2.394,0,0,1,.591-1.064v.193Z" transform="translate(-900.675 -879.724)" fill="#24394d"></path>
		</svg></button>
		<div class="${ID}-pushchair-roundels">
		  <a href="${links[1]}" class="${ID}-pushchair-roundels--button">
			<div class="${ID}-pushchair-roundels--img--container">
				<img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/ocarro.jpg" alt="ocarro pushchair image" />
			</div>
			<h2>Ocarro</h2>  
		  </a>
		  <a href="${links[2]}" class="${ID}-pushchair-roundels--button">
			  <div class="${ID}-pushchair-roundels--img--container">
			  <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/strada.jpg" alt="strada pushchair image" />
			</div>
			<h2>Strada</h2>
		  </a>
		  <a href="${links[3]}" class="${ID}-pushchair-roundels--button">
			  <div class="${ID}-pushchair-roundels--img--container">
			  <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/airo.jpg" alt="airo pushchair image" />
			</div>
			<h2>Airo</h2>  
		  </a>
		  <a href="${links[4]}" class="${ID}-pushchair-roundels--button">
			  <div class="${ID}-pushchair-roundels--img--container">
				  <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/flipxt.jpg" alt="flip xt pushchair image" />
			</div>
			<h2>Flip XT</h2>  
		  </a>
		  <a href="${links[5]}" class="${ID}-pushchair-roundels--button">
			  <div class="${ID}-pushchair-roundels--img--container">
			  <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/buggies.jpg" alt="buggies pushchair image" />
			</div>
			<h2>Buggies</h2>
		  </a>
		  <a href="${links[6]}" class="${ID}-pushchair-roundels--button">
			  <div class="${ID}-pushchair-roundels--img--container">
			  <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/brands.jpg" alt="Brands pushchair image" />
			</div>
			
			<h2>Brands</h2>  
		  </a>
		</div>	
	</div>
  `;

	let filtersWrapper = document.querySelector(".filters-toolbar-wrapper");
	let insertionPoint = document.querySelector(".boost-pfs-filter-right-col");

	insertionPoint.insertAdjacentElement("afterbegin", filtersWrapper);

	filtersWrapper.classList.add(`${ID}-filters-wrapper`);

	insertionPoint.insertAdjacentHTML("afterbegin", pushchairRoundelHTML);

	const leftArrow = document.querySelector(
		`.${ID}-pushchair-roundels-container button.roundel-arrow-left`
	);
	const rightArrow = document.querySelector(
		`.${ID}-pushchair-roundels-container button.roundel-arrow-right`
	);

	let scrollLeftDepth;

	rightArrow?.addEventListener("click", (e) => {
		const roundelCarousel = document.querySelector(
			`.${ID}-pushchair-roundels`
		);
		const carouselRect = roundelCarousel?.getBoundingClientRect();
		scrollLeftDepth = carouselRect.width / 2 + roundelCarousel.scrollLeft;
		roundelCarousel?.scroll({
			left: scrollLeftDepth,
			top: 0,
			behavior: "smooth",
		});
		leftArrow?.classList.add("active");
		setTimeout(() => {
			const lastChild = document.querySelector(
				`.${ID}-pushchair-roundels .${ID}-pushchair-roundels--button:last-child`
			);

			if (
				lastChild &&
				lastChild.getBoundingClientRect().right <= window.innerWidth
			) {
				rightArrow.classList.remove("active");
			}
		}, 200);
	});

	leftArrow?.addEventListener("click", (e) => {
		const roundelCarousel = document.querySelector(
			`.${ID}-pushchair-roundels`
		);
		const carouselRect = roundelCarousel?.getBoundingClientRect();
		scrollLeftDepth = carouselRect.width / 2 - roundelCarousel.scrollLeft;
		roundelCarousel?.scroll({
			left: -scrollLeftDepth,
			top: 0,
			behavior: "smooth",
		});
		rightArrow?.classList.add("active");

		setTimeout(() => {
			const firstChild = document.querySelector(
				`.${ID}-pushchair-roundels .${ID}-pushchair-roundels--button:first-child`
			);
			if (firstChild && firstChild.getBoundingClientRect().left >= 10) {
				leftArrow.classList.remove("active");
			}
		}, 200);
	});

	const roundelCarousel = document.querySelector(`.${ID}-pushchair-roundels`);
	roundelCarousel.addEventListener("scroll", (e) => {
		setTimeout(() => {
			const firstChild = document.querySelector(
				`.${ID}-pushchair-roundels .${ID}-pushchair-roundels--button:first-child`
			);
			if (firstChild && firstChild.getBoundingClientRect().left >= 10) {
				leftArrow.classList.remove("active");
			} else {
				leftArrow.classList.add("active");
			}
			const lastChild = document.querySelector(
				`.${ID}-pushchair-roundels .${ID}-pushchair-roundels--button:last-child`
			);

			if (
				lastChild &&
				lastChild.getBoundingClientRect().right <= window.innerWidth
			) {
				rightArrow.classList.remove("active");
			} else {
				rightArrow.classList.add("active");
			}
		}, 100);
	});
	const roundels = document.querySelectorAll(
		`.${ID}-pushchair-roundels--button`
	);
	if (roundels.length > 0) {
		roundels.forEach((elm) => {
			elm.addEventListener("click", (e) => {
				let title = elm.querySelector("h2")?.innerText.trim();
				fireEvent(`Customer clicks ${title} roundel`);
			});
		});
	}
	document.body.addEventListener("click", (e) => {
		const target = e.target;
		if (
			(target.matches("a.grid-view-item__link") ||
				target.closest("a.grid-view-item__link")) &&
			target.closest("#bc-sf-filter-products")
		) {
			fireEvent("Customer views product from All Pushchairs page");
		}
	});
};

const pushchairInnerPage = () => {
	var status = false;
	for (let index = 0; index < links.length; index++) {
		if (links[index] === location.pathname) {
			status = true;
			break;
		}
	}
	if (status) {
		document.body.addEventListener("click", (e) => {
			const target = e.target;
			if (
				(target.matches("a.grid-view-item__link") ||
					target.closest("a.grid-view-item__link")) &&
				target.closest(".boost-pfs-filter-products")
			) {
				fireEvent(
					"Customer views product from Pushchair specific page"
				);
			}
		});
	} else if (window.location.pathname.indexOf("/products/") > -1) {
		var innerStatus = false;
		for (let index = 0; index < links.length; index++) {
			if (document.referrer.includes(links[index])) {
				innerStatus = true;
				break;
			}
		}

		const submit = document.querySelector(
			"button.product-form__cart-submit"
		);
		if (innerStatus) {
			submit?.addEventListener("click", (e) => {
				fireEvent(
					"Customer adds product to basket after visiting the Pushchair specific page"
				);
			});
		} else if (document.referrer.includes("collections/pushchairs")) {
			submit?.addEventListener("click", (e) => {
				fireEvent(
					"Customer adds product to basket after visiting the All Pushchairs and didn’t interact with roundels"
				);
			});
		}
	}
	// pollerLite([".collection-header .section-header"], () => {
	// 	let newHeaderHTML = `
	//     <div class="${ID}-seo-section--left">
	//     </div>
	//     <div class="${ID}-seo-section--right">
	//       <button class="${ID}-video-play-button" id="${ID}-video-play-button"><svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="48.5" cy="48.5" r="47.5" stroke="white" stroke-width="2"/><path d="M73.5 46.4019C75.5 47.5566 75.5 50.4434 73.5 51.5981L37.5 72.3827C35.5 73.5374 33 72.094 33 69.7846L33 28.2154C33 25.906 35.5 24.4626 37.5 25.6173L73.5 46.4019Z" fill="white"/></svg></button>
	//       <video id="${ID}-video" poster="https://blcro.fra1.digitaloceanspaces.com/MAM-441/videobg.jpg">
	//           <source src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/placeholder.mov" type="video/mp4" />
	//           Sorry, your browser doesn't support embedded videos.
	//       </video>
	//     </div>
	//   `;
	// 	// <iframe width="560" height="315" src="https://www.youtube.com/embed/XIMLoLxmTDw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	// 	let insertionPoint = document.querySelector(
	// 		".collection-header .section-header"
	// 	);
	// 	insertionPoint.insertAdjacentHTML("afterbegin", newHeaderHTML);
	// 	insertionPoint.classList.add(`${ID}-seo-section`);
	// 	let videoPlayButton = document.getElementById(
	// 		`${ID}-video-play-button`
	// 	);
	// 	let videoSource = document.getElementById(`${ID}-video`);
	// 	videoPlayButton.addEventListener("click", (e) => {
	// 		videoPlayButton.remove();
	// 		videoSource.controls = "controls";
	// 		videoSource.play();
	// 	});
	// 	let seoCopy = insertionPoint.querySelector(".page-width");
	// 	let seoLinks = insertionPoint.querySelector(".sub-category");
	// 	insertionPoint
	// 		.querySelector(`.${ID}-seo-section--left`)
	// 		.insertAdjacentElement("beforeend", seoCopy);
	// 	insertionPoint
	// 		.querySelector(`.${ID}-seo-section--left`)
	// 		.insertAdjacentElement("beforeend", seoLinks);
	// 	let bottomBannerHTML = `
	//     <div class="${ID}-bottom-seo">
	//       <div class="${ID}-bottom-seo--benefits">
	//         <ul>
	//           <li><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.10566L6.07916 11.1853L15.4504 1.8147" stroke="#47BB9C" stroke-width="3"/></svg><p>Class leading comfort</p></li>
	//           <li><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.10566L6.07916 11.1853L15.4504 1.8147" stroke="#47BB9C" stroke-width="3"/></svg><p>One hand fold</p></li>
	//           <li><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.10566L6.07916 11.1853L15.4504 1.8147" stroke="#47BB9C" stroke-width="3"/></svg><p>Stress free storage</p></li>
	//         </ul>
	//       </div>
	//       <div class="${ID}-bottom-seo--awards">
	//         <h2> Awards: </h2>
	//         <ul>
	//           <li><img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/award1.png" alt="award image" /></li>
	//           <li><img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/award2.png" alt="award image" /></li>
	//           <li><img src="https://blcro.fra1.digitaloceanspaces.com/MAM-441/award3.png" alt="award image" /></li>
	//         </ul>
	//       </div>
	//     </div>
	//   `;
	// 	insertionPoint.insertAdjacentHTML("afterend", bottomBannerHTML);
	// });
};

const startExperiment = () => {
	if (window.location.pathname === "/collections/pushchairs") {
		pushchairPLPPage();
	} else {
		pushchairInnerPage();
	}
};

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	if (window.location.pathname.includes("pushchairs")) {
		fireEvent("Conditions Met");
	} else {
		var status = false;
		for (let index = 0; index < links.length; index++) {
			if (
				window.location.pathname.includes(links[index]) ||
				window.location.pathname.indexOf("/products/") > -1
			) {
				status = true;
				break;
			}
		}
		if (status) {
			fireEvent("Conditions Met");
		}
	}

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

	startExperiment();
};
