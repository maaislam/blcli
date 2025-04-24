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
import Swiper from "swiper/swiper-bundle";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let timeout;

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------

	pollerLite([`button.bookNow[type="submit"]`], () => {
		document
			.querySelector(`button.bookNow[type="submit"]`)
			.addEventListener("click", () => {
				fireEvent(`Click - User progresses to /extras page`);
			});
	});

	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const copyLinkToClipboard = (button) => {
		navigator.clipboard.writeText(
			document.getElementById(`${ID}-share--linkboxinput`).value
		);
		fireEvent(
			`Click - user copied link: ${
				document.getElementById(`${ID}-share--linkboxinput`).value
			} to clipboard using the ${button} button`,
			true
		);
		document
			.querySelector(`.${ID}-share--copybutton`)
			.classList.add(`${ID}-share--copybutton--copied`);
		if (!document.querySelector(`.${ID}-share--copycompletetext`)) {
			document
				.querySelector(`.${ID}-share--copybutton`)
				.insertAdjacentHTML(
					"afterend",
					`<p class="${ID}-share--copycompletetext">Link copied to clipboard</p>`
				);
		}

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			document
				.querySelector(`.${ID}-share--copybutton`)
				.classList.remove(`${ID}-share--copybutton--copied`);
			document.querySelector(`.${ID}-share--copycompletetext`).remove();
		}, 5000);
	};

	const shareFunctionality = () => {
		document.documentElement.classList.add(`${ID}-share--active`);

		let theCopyingURL =
			VARIATION == 1
				? window.location.href +
				  `${
						window.location.href.indexOf("?") > -1 ? `&` : `?`
				  }blcopy=${ID}`
				: "https://www.travelodge.co.uk" +
				  decodeURIComponent(window.globalDataLayer.ocb1) +
				  `${
						window.globalDataLayer.ocb1.indexOf("?") > -1
							? `&`
							: `?`
				  }blcopy=${ID}`;
		let fbCopyingURL = `http://www.facebook.com/dialog/send?app_id=700976514890467&name=${encodeURIComponent(
			`A post from Travelodge`
		)}&link=${theCopyingURL}&redirect_uri=${encodeURIComponent(
			theCopyingURL
		)}`;
		if (window.outerWidth < 992) {
			fbCopyingURL = `fb-messenger://share/?link=${encodeURIComponent(
				theCopyingURL
			)}`;
		}

		let newShareBoxHTML = `
	  
		<div class="${ID}-share">
	
		  <div class="${ID}-share--button ${
			window.location.href.indexOf("/ocb/") > -1
				? `ocb-button`
				: `normal-button`
		}"><span class="${ID}-share--buttonsvg">
			<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
		<circle cx="18.72" cy="4.76002" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<circle cx="18.72" cy="18.2" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<circle cx="4.79994" cy="11.48" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M7.92004 10.024L15.6 6.44M7.92004 12.936L15.6 16.28" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg></span></div>
	
		  <div class="${ID}-share--social">
	
			<div class="${ID}-share--linkbox">
			
			  <button class="${ID}-share--linkboxcopybutton">
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 8H7C4.79086 8 3 9.79086 3 12V12C3 14.2091 4.79086 16 7 16H10M14 8H17C19.2091 8 21 9.79086 21 12V12C21 14.2091 19.2091 16 17 16H14M9 12H15" stroke="#008CC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
			  </button>
	
			  <input type="text" id="${ID}-share--linkboxinput" value="${theCopyingURL}" readonly>
	
			</div>
	
			<button class="${ID}-share--copybutton" id="${ID}-share--copybutton">
			  <span class="${ID}-share--copybuttoninnertext">Copy</span>
			  <span class="${ID}-share--copybuttontick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>          
			</button>
	
			<div class="${ID}-share--socialbuttons">
	
			  <a href="https://wa.me/?text=I%20found%20a%20great%20deal%20with%20Travelodge,%20what%20do%20you%20think?%20${encodeURIComponent(
					theCopyingURL
				)}" data-action="share/whatsapp/share" target="_blank" data-share-button="whatsapp" class="${ID}-share--socialbutton ${ID}-share--socialbutton--whatsapp"><svg fill="#fff" width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path></svg></a>
			  <a href="mailto:?subject=A link from Travelodge&amp;body=Here's the link you requested: ${encodeURIComponent(
					theCopyingURL
				)}" target="_blank" data-share-button="email" class="${ID}-share--socialbutton ${ID}-share--socialbutton--email"><svg height="30" width="30" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve"><style type="text/css">.st0{fill:#fff;}</style><g><path class="st0" d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"/></g></svg></a>
			  <a href="https://telegram.me/share/url?url=${encodeURIComponent(
					theCopyingURL
				)}" data-share-button="telegram" target="_blank" class="${ID}-share--socialbutton ${ID}-share--socialbutton--telegram"><svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/><path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/><defs><linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#37BBFE"/><stop offset="1" stop-color="#007DBB"/></linearGradient></defs></svg></a>
	
			</div>
	
		  </div>
	
		</div>
	  
	  
	  `;

		if (window.location.href.indexOf("/ocb/") > -1) {
			pollerLite([".hotel-det-container"], () => {
				document
					.querySelector(".hotel-det-container")
					.insertAdjacentHTML("afterbegin", newShareBoxHTML);

				addTracking("ocb");
			});
		} else {
			pollerLite([".hotel-details-right-content"], () => {
				document
					.querySelector(
						".hotel-details-right-content .rebase-hotel-name"
					)
					.insertAdjacentHTML("beforeend", newShareBoxHTML);

				addTracking("normal");
			});
		}
	};

	const addTracking = (placement) => {
		let shareButton = document.querySelector(`.${ID}-share--button`);

		if (VARIATION !== "control") {
			fireEvent(`Visible - share button + share box added`, true);
		}

		shareButton.addEventListener("click", () => {
			document
				.querySelector(`.${ID}-share--social`)
				.classList.toggle(`${ID}-active`);
			fireEvent(`Click - user clicked the share button`, true);
		});

		let linkCopyButton = document.querySelector(
			`.${ID}-share--linkboxcopybutton`
		);
		linkCopyButton.addEventListener("click", (e) => {
			e.preventDefault();
			copyLinkToClipboard("link");
		});

		let bigCopyButton = document.querySelector(`.${ID}-share--copybutton`);
		bigCopyButton.addEventListener("click", (e) => {
			e.preventDefault();
			copyLinkToClipboard("bigcopy");
		});

		let allShareButtons = document.querySelectorAll(
			`.${ID}-share--socialbutton`
		);
		[].slice.call(allShareButtons).forEach((button) => {
			button.addEventListener("click", () => {
				fireEvent(
					`Click - user clicked the: ${button.getAttribute(
						"data-share-button"
					)} share button to go to link: ${button.href}`,
					true
				);
			});
		});
	};

	const getDateData = (checkInDate) => {
		checkInDate = checkInDate.split("/");
		checkInDate[2] = 2000 + parseInt(checkInDate[2]);
		const date = new Date(
			checkInDate[2],
			checkInDate[1] - 1,
			checkInDate[0]
		);
		const checkInData = date.toDateString().split(" ");
		const data = {
			day: checkInData[0],
			date: checkInData[2],
			month: checkInData[1],
		};

		return data;
	};

	const getProccessedString = () => {
		let guest = document.querySelector(`input#mGuest`).value;
		guest = parseInt(guest) > 1 ? `${guest} Guests` : `${guest} Guest`;
		let room = document.querySelector(`input#mRoom`).value;
		room = parseInt(room) > 1 ? `${room} Rooms` : `${room} Room`;

		return `${guest}, ${room}`;
	};

	pollerLite([".container.rebaseContainer"], () => {
		// if (document.referrer.includes("/results?")) {
		// 	const loc = document.referrer
		// 		.split("location=")[1]
		// 		.split("&")[0]
		// 		.replace("+", " ")
		// 		.replace("%20", " ");

		// 	const content = `
		// 		<div class="${ID}-back-content">
		// 			<div class="${ID}-back-content__text">
		// 				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
		// 					<path d="M17.1 8.99998H1.07996M1.07996 8.99998L6.47996 3.59998M1.07996 8.99998L6.47996 14.4" stroke="#0A2C44" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
		// 				</svg>
		// 				<span>View more stays in ${loc}</span>
		// 			</div>
		// 		</div>
		// 	`;

		// 	document
		// 		.querySelector("#section-img-with-hotel-details .top-of-page")
		// 		.insertAdjacentHTML("afterbegin", content);
		// 	document
		// 		.querySelector(`.${ID}-back-content__text`)
		// 		.addEventListener("click", () => {
		// 			location.href = document.referrer;
		// 			//window.history.back();
		// 		});
		// }

		shareFunctionality();
		const mainContainer = document.querySelector(
			".container.rebaseContainer"
		);
		const searchToggleMini = mainContainer.querySelector(
			"section .toggle-mini-search"
		);
		const firstChild = mainContainer.querySelector("section");

		if (firstChild) {
		// Check if the firstChild exists before appending
		mainContainer.insertBefore(searchToggleMini.closest("section"), firstChild.nextSibling);
		}
		// mainContainer.prepend(searchToggleMini.closest("section"));


		pollerLite(
			["#hotel-address-content .address-text", ".trip-advisor-rating"],
			() => {
				const addressContent = document.querySelector(
					"#hotel-address-content .address-text"
				);

				let stationText =
					addressContent
						.querySelector("li span:nth-child(2)")
						?.textContent.trim() ||
					document
						.querySelector(
							".key-points-border[title^='Nearest'] span:nth-child(2)"
						)
						?.textContent.trim();

				const stationIconId =
					addressContent
						.querySelector("li span svg")
						?.getAttribute("id") ||
					document
						.querySelector(
							".key-points-border[title^='Nearest'] span svg"
						)
						?.getAttribute("id");
				let stationIcon = "";
				if (stationIconId && stationIconId.includes("underground")) {
					stationIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
				<path d="M14.0886 7.5001C14.0886 10.5876 11.5886 13.0876 8.50107 13.0876C5.41357 13.0876 2.91357 10.5876 2.91357 7.5001C2.91357 4.4126 5.41357 1.9126 8.50107 1.9126C11.5886 1.9126 14.0886 4.4126 14.0886 7.5001Z" stroke="#DC241F" stroke-width="2"/>
				<path d="M0.5 7.49927H16.5" stroke="#0019A8" stroke-width="2"/>
			  </svg>`;
				} else {
					stationIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
				<path d="M0.695312 0.675781L9.40233 5.04296L3.59765 7.95702L12.3047 12.3242" stroke="#ED1C24" stroke-width="1.19552"/>
				<path d="M0.5 5.04297H12.5M12.5 7.95703H0.5" stroke="#ED1C24" stroke-width="1.27522"/>
			  </svg>`;
				}

				const telephone = document.querySelector("a.telephone");
				const telephoneNumber = telephone.textContent.trim();

				const ratingElement = document.querySelector(
					".trip-advisor-rating"
				);
				ratingElement.insertAdjacentHTML(
					"afterbegin",
					`
				<span class="new_address_toggle">View address</span>
				<div class="new_address_container">
					<div class="new_address_content" id="new_hotel-address-content">
						<div class="location_address">
							<span class="new_address_icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="19" viewBox="0 0 13 19" fill="none">
									<path d="M6.50403 1.5C3.63132 1.5 1.30406 3.72609 1.30406 6.47391C1.30406 6.47391 0.871338 11.5313 6.50403 17.5C6.50403 17.5 11.704 13.5209 11.704 6.47391C11.704 3.72609 9.37673 1.5 6.50403 1.5Z" stroke="#464646" stroke-width="1.70455" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M6.50412 6.88759C6.9821 6.88759 7.36957 6.51696 7.36957 6.05976C7.36957 5.60256 6.9821 5.23193 6.50412 5.23193C6.02615 5.23193 5.63867 5.60256 5.63867 6.05976C5.63867 6.51696 6.02615 6.88759 6.50412 6.88759Z" stroke="#464646" stroke-width="1.70455" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
							<span class="new_address">${addressContent.childNodes[0].textContent
								.trim()
								.replaceAll("United Kingdom", "UK")
								.replaceAll("united kingdom", "UK")}
							</span>
						</div>
	
						${
							stationText
								? `<div class="new_station">
										<span class="new_station_icon">
											${stationIcon}
										</span>
										<span class="new_station_text">${stationText}</span>
									</div>`
								: ``
						}
						
						<div class="new_telephone">
							<span class="new_telephone_icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
									<path d="M12.2425 15.8598C11.1251 15.8422 10.0615 15.5713 9.06055 15.0981C5.73561 13.5265 3.29586 11.0715 1.79989 7.70394C1.37317 6.74367 1.12826 5.73039 1.14058 4.67121C1.15066 3.78819 1.36421 2.96637 1.93392 2.26174C2.3319 1.76947 2.87958 1.53323 3.45527 1.33841C3.6845 1.26078 3.91634 1.19323 4.1549 1.14956C4.40243 1.10403 4.63688 1.22159 4.73022 1.45336C5.22116 2.67265 5.70948 3.89268 6.19631 5.11347C6.31354 5.40719 6.23253 5.66321 6.0186 5.88042C5.70911 6.19467 5.3955 6.50518 5.08115 6.81458C4.72462 7.1654 4.68094 7.40351 4.93145 7.83868C5.7106 9.19195 6.74661 10.3198 7.97564 11.276C8.37361 11.5854 8.7925 11.863 9.23229 12.1086C9.56344 12.2937 9.83672 12.2557 10.11 11.9862C10.4419 11.6589 10.7708 11.3286 11.1005 10.999C11.3458 10.7542 11.6202 10.6919 11.9502 10.8255C13.1228 11.3006 14.2996 11.7671 15.4745 12.2366C15.787 12.3617 15.9113 12.5688 15.8411 12.892C15.7142 13.4764 15.5368 14.0467 15.202 14.5487C14.7483 15.2279 14.0659 15.5638 13.2968 15.7471C12.9518 15.8292 12.5983 15.862 12.2429 15.8598H12.2425Z" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
							<span class="new_telephone_number">${telephoneNumber}</span>
						</div>
						
					</div>
				</div>`
				);

				ratingElement
					.querySelector(".location_address")
					?.addEventListener("click", (e) => {
						document.querySelector("#showOnMap").click();
					});
				ratingElement
					.querySelector(".new_station")
					?.addEventListener("click", (e) => {
						document.querySelector("#showOnMap").click();
					});
				ratingElement
					.querySelector(".new_telephone")
					?.addEventListener("click", (e) => {
						document.querySelector("a.telephone").click();
					});

				ratingElement
					.querySelector(".new_address_toggle")
					?.addEventListener("click", (e) => {
						if (
							document
								.querySelector(".new_address_container")
								.classList.contains("active")
						) {
							document
								.querySelector(".new_address_container")
								.classList.remove("active");
							e.target.closest(
								".new_address_toggle"
							).textContent = "View address";
						} else {
							document
								.querySelector(".new_address_container")
								.classList.add("active");
							e.target.closest(
								".new_address_toggle"
							).textContent = "Hide address";
						}
					});
			}
		);
		const keyPoints = document.querySelector(".key-points-margin");

		keyPoints.querySelectorAll("ul.trv-bullets li").forEach((element) => {
			if (element.querySelector("span.hide")) {
				let text = element
					.querySelector("span:not(.hide)")
					.textContent.trim();
				if (text.toLowerCase() === "superrooms") {
					text = "SuperRooms";
				} else {
					text = text.toLowerCase();
				}
				element.querySelector("span:not(.hide)").textContent =
					text.charAt(0).toUpperCase() + text.slice(1);
			} else {
				element.classList.add("normal-lozenge");
			}
		});
		// ratingElement.insertAdjacentElement("afterend", keyPoints);

		// const facilities = document.querySelectorAll(
		// 	"#main-carousel-image .c-facilities .c-facilities__item"
		// );
		// for (let index = facilities.length; index > 0; index--) {
		// 	const element = facilities[index - 1];
		// 	keyPoints.querySelector("ul.trv-bullets").prepend(element);
		// }

		const strapLine = document.querySelector(
			".strapline-margin span.cell-strapline-text"
		);
		strapLine.innerHTML = strapLine.getAttribute("title");

		const straplineMargin = document.querySelector(".strapline-margin");
		keyPoints.insertAdjacentElement("afterend", straplineMargin);

		const thumnails = document.querySelectorAll(
			"#carousel-tumbnail button"
		);

		if (thumnails.length > 4) {
			const dom = document.createElement("div");

			dom.type = "button";
			dom.classList.add("show_more");
			//dom.setAttribute("data-bs-target", "");
			thumnails.forEach((element, index) => {
				if (index > 2) {
					element.classList.add("hide");
				}
			});

			dom.insertAdjacentHTML(
				"afterbegin",
				`<img class="new_image" src="${
					thumnails[3].querySelector("img")?.src
				}">
				<h5>+${thumnails.length - 3}</h5>`
			);

			dom.addEventListener("click", (e) => {
				const modal = document.querySelector(`.${ID}-modal_wrapper`);
				if (modal && !modal.classList.contains("active")) {
					modal.classList.add("active");
				}
			});
			thumnails[3].insertAdjacentElement("beforebegin", dom);

			const carousel = document.querySelector("#main-carousel-image");
			const carouselImages = carousel.querySelectorAll(".carousel-item");
			let slides = "";

			carouselImages.forEach((element) => {
				const image = element.querySelector(
					"img:not(.badge-style-image)"
				);
				const isBadge = element.querySelector(".badge-style");
				slides += `
					<div class="swiper-slide">
						${isBadge ? isBadge.parentNode.outerHTML : ""}
						<img src="${image.src}" alt="${image.getAttribute("alt")}">
					</div>
				`;
			});

			const carouselDom = `
				<div class="${ID}-modal_wrapper">
					<div class="${ID}-modal">
						<div class="${ID}-modal_close">
							<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
								<mask id="mask0_371_1170" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="50">
									<rect width="50" height="50" fill="#D9D9D9"/>
								</mask>
								<g mask="url(#mask0_371_1170)">
									<path d="M3.5 3.5L46.5 46.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M46.5 3.5L3.49999 46.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
								</g>
							</svg>
						</div>
						<div class="${ID}-modal_content">
							<div class="swiper-container">
								<div class="swiper-wrapper">
									${slides}
								</div>
								<div class="swiper-pagination"></div>
							</div>
						</div>
					</div>
				</div>
				
				`;

			document.body.insertAdjacentHTML("beforeend", carouselDom);

			pollerLite([`.${ID}-modal_wrapper`], () => {
				// Create a new script element
				const swiper = new Swiper(
					`.${ID}-modal_content .swiper-container`,
					{
						slidesPerView: 1.5,
						centeredSlides: true,
						allowTouchMove: true,
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
						},
					}
				);
				swiper.slideTo(3, 0, false);
				const modal = document.querySelector(`.${ID}-modal_wrapper`);
				const modalClose = modal.querySelector(`.${ID}-modal_close`);

				modalClose.addEventListener("click", () => {
					modal.classList.remove("active");
				});
			});
		}

		pollerLite([".hotel-details-right-content"], () => {
			document
				.querySelector(".hotel-details-right-content")
				.append(document.querySelector("#carousel-tumbnail"));
		});
		pollerLite(["#carouselExampleIndicatorsLeft"], () => {
			const carouselItems = document.querySelectorAll(
				"#main-carousel-image .carousel-item"
			);

			let slides = "";

			carouselItems.forEach((element) => {
				const image = element.querySelector(
					"img:not(.badge-style-image)"
				);
				const isBadge = element.querySelector(".badge-style");
				slides += `
						<div class="swiper-slide">
							${isBadge ? isBadge.parentNode.outerHTML : ""}
							<img src="${image.src}" alt="${image.getAttribute("alt")}">
						</div>
					`;
			});

			const carouselDom = `
					<div class="${ID}-mobile_slider">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								${slides}
							</div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
					`;

			const ratingElement = document.querySelector(
				".trip-advisor-rating"
			);

			setTimeout(() => {
				ratingElement.insertAdjacentHTML("afterend", carouselDom);
			}, 400);

			pollerLite([`.${ID}-mobile_slider`], () => {
				// Create a new script element
				const swiper = new Swiper(
					`.${ID}-mobile_slider .swiper-container`,
					{
						slidesPerView: 1.2,
						centeredSlides: true,
						allowTouchMove: true,
						loop: true,
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
						},
					}
				);
			});
		});
		pollerLite(["#show-address"], () => {
			const ratingElement = document.querySelector(
				".trip-advisor-rating"
			);
			setTimeout(() => {
				ratingElement.insertAdjacentElement(
					"afterend",
					document.querySelector("#show-address")
				);
			}, 400);
		});

		pollerLite([".wrapAll.xvertical"], () => {
			let data = document.querySelectorAll(
				".container.rebaseContainer .c-table .c-table__cell span strong"
			);

			let guest = document.querySelector(`input#mGuest`).value;
			guest =
				parseInt(guest) > 1
					? `${guest} <span class="desktop-only">Guests</span>`
					: `${guest} <span class="desktop-only">Guest</span>`;
			let room = document.querySelector(`input#mRoom`).value;
			room =
				parseInt(room) > 1
					? `${room} <span class="desktop-only">Rooms</span>`
					: `${room} <span class="desktop-only">Room</span>`;

			let nights = data[2].textContent.trim().split(" ");
			nights = `${nights[0]} <span class="desktop-only">${nights[1]}</span>`;

			const miniSearchDom = `
				<section class="c-section new_mini_search">
					<div class="new_mini_search_container">
						<div class="new_mini_search_content">
							<div class="mini_search_item location-item">
								<div class="mini_search_item_content">
									<span class="location_icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="28" viewBox="0 0 18 28" fill="none">
											<path d="M9.00599 1.5C4.51737 1.5 0.881012 4.97828 0.881012 9.27178C0.881012 9.27178 0.204877 17.174 9.00599 26.5001C9.00599 26.5001 17.131 20.2827 17.131 9.27178C17.131 4.97828 13.4946 1.5 9.00599 1.5Z" stroke="#464646" stroke-width="1.70455" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M9.0059 9.91827C9.75273 9.91827 10.3582 9.33915 10.3582 8.62478C10.3582 7.91041 9.75273 7.3313 9.0059 7.3313C8.25906 7.3313 7.65363 7.91041 7.65363 8.62478C7.65363 9.33915 8.25906 9.91827 9.0059 9.91827Z" stroke="#464646" stroke-width="1.70455" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</span>
									<span class="mini_search_item_text" title="${
										document.querySelector(
											`input[name="location"]`
										).value
									}">
										${document.querySelector(`input[name="location"]`).value}
									</span>
								</div>
							</div>
							<div class="mini_search_item details-item">
								<div class="mini_search_item_content">
									<ul class="mini_search_item_list">
										<li class="mini_search_item_list_item">
											<div class="item_details">
												<span class="mini_search_item_list_item_icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
														<path d="M25.9972 4.44507H1.00269V26.5001H25.9972V4.44507Z" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M25.9972 4.44507H1.00269V13.2692H25.9972V4.44507Z" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M8.50195 1.5V8.85166" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M13.5042 1.5V8.85166" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M18.4982 1.5V8.85166" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>
												</span>
												<span class="mini_search_item_list_item_text">${data[1].textContent
													.trim()
													.replace(
														" 2023",
														""
													)}</span>
											</div>
										</li>

										<li class="mini_search_item_list_item">
											<div class="item_details">
												<span class="mini_search_item_list_item_icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28" fill="none">
														<path d="M20.9475 20.1467C14.2844 20.1467 8.88226 14.7446 8.88226 8.08152C8.88226 5.65217 9.60509 3.3913 10.8442 1.5C5.33878 2.8913 1.2627 7.86413 1.2627 13.7989C1.2627 20.8152 6.94748 26.5 13.9638 26.5C19.0073 26.5 23.3551 23.5489 25.404 19.288C24.0236 19.837 22.5236 20.1467 20.9529 20.1467H20.9475Z" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>
												</span>
												<span class="mini_search_item_list_item_text">${nights}</span>
											</div>	
										</li>

										<li class="mini_search_item_list_item">
											<div class="item_details">
												<span class="mini_search_item_list_item_icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
														<path d="M17.459 13.8545C19.4751 12.4199 20.676 9.92011 20.225 7.17038C19.7848 4.46412 17.66 2.21435 14.9755 1.65462C10.5683 0.730795 6.68286 4.07286 6.68286 8.317C6.68286 10.6048 7.81318 12.6264 9.5467 13.8599C10.0195 14.1969 9.87276 14.9196 9.32934 15.1207C4.68849 16.8216 1.37903 21.2723 1.37903 26.5H25.6212C25.6212 21.2723 22.3118 16.8162 17.6709 15.1207C17.1275 14.9196 16.9862 14.1969 17.459 13.8599V13.8545Z" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>
												</span>
												<span class="mini_search_item_list_item_text">${guest}</span>
											</div>
										</li>
										<li class="mini_search_item_list_item">
											<div class="item_details">
												<span class="mini_search_item_list_item_icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="37" height="28" viewBox="0 0 37 28" fill="none">
														<path d="M1.03601 16.3605V23.2294H36.2974V16.3605C36.2974 16.3605 33.8349 10.8076 18.6667 10.8076C11.8361 10.8076 7.58268 11.9324 4.96729 13.1718C1.77859 14.6843 1.03601 16.3605 1.03601 16.3605Z" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M4.72632 13.1664V6.73987C4.72632 6.73987 8.00784 1.85308 18.666 1.50909C26.867 1.247 31.7866 6.73987 31.7866 6.73987V12.9207" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M10.0887 11.5503C10.0887 11.5503 14.3039 3.31104 18.612 10.8187" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M26.8733 11.5503C26.8733 11.5503 22.9202 3.31104 18.6122 10.8187" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M6.20203 23.2837V26.4997L9.09043 23.2236" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M32.082 23.2842V26.5002L29.1991 23.2241" stroke="#464646" stroke-width="1.152" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
												</span>
												<span class="mini_search_item_list_item_text">${room}</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="mini_search_item refine-item">
								<div class="mini_search_item_content">
									<button class="mini_search_item_button">Edit search</button>
								</div>
							</div>
						</div>
					</div>
					
				</section>				
			`;

			// document
			// 	.querySelector(".wrapAll.xvertical header")
			// 	.insertAdjacentHTML("afterend", miniSearchDom);

			pollerLite([`#default-date-message-mobile`], () => {
				let dateLessSearchMsg = document.querySelector(
					"#default-date-message-mobile"
				)?.childNodes[3]?.data;
				dateLessSearchMsg = dateLessSearchMsg
					? dateLessSearchMsg.replaceAll(" 23", "")
					: "";

				const content = `<div class="date_less_search_msg">
					<div class="date_less_search_content">
						<span class="date_less_search_msg_icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<circle cx="8" cy="8" r="7.36" stroke="#464646" stroke-width="1.28"/>
								<path d="M8.96004 4.15578C8.96004 4.43735 8.863 4.66704 8.66892 4.84487C8.47484 5.0227 8.25304 5.11162 8.0035 5.11162C7.74935 5.11162 7.52524 5.02764 7.33116 4.85969C7.13708 4.6868 7.04004 4.45711 7.04004 4.1706C7.04004 3.87916 7.13477 3.64452 7.32423 3.4667C7.51369 3.28887 7.74011 3.19995 8.0035 3.19995C8.26228 3.19995 8.48639 3.2864 8.67585 3.45929C8.86531 3.63218 8.96004 3.86434 8.96004 4.15578ZM8.86993 6.43052V13.0621C8.86993 13.1954 8.84221 13.2918 8.78675 13.351C8.7313 13.4103 8.64119 13.44 8.51643 13.44H7.52524C7.39585 13.44 7.30112 13.4103 7.24105 13.351C7.18098 13.2918 7.15094 13.1954 7.15094 13.0621V6.43052C7.15094 6.19835 7.27571 6.08227 7.52524 6.08227H8.51643C8.63657 6.08227 8.72437 6.10697 8.77982 6.15636C8.83989 6.20576 8.86993 6.29715 8.86993 6.43052Z" fill="#464646"/>
							</svg>
						</span>
						<p class="date_less_search_msg_text">
							Showing rates for <span class="search_applied_date">${dateLessSearchMsg}.</span> <span class="edit_search_date">Enter your search dates for pricing.</span>
						</p>
					</div>
				</div>`;
				document
					.querySelector(".new_mini_search")
					.insertAdjacentHTML("afterend", content);
			});

			const oldMiniSearch = document.querySelector(
				"#main .c-section.mini-search"
			);

			// oldMiniSearch
			// 	.querySelector(".fieldLocation")
			// 	.insertAdjacentHTML(
			// 		"beforeend",
			// 		"<label class='location_label'>- Use a postcode or a landmark to refine your search</label>"
			// 	);

			const checkInInputGroup = oldMiniSearch.querySelector(
				".fieldCheckIn .input-group"
			);
			let checkInDate = checkInInputGroup.querySelector("input").value;

			pollerLite(
				[
					() => {
						return checkInInputGroup
							.querySelector("input")
							.getAttribute("id");
					},
				],
				() => {
					let checkInInputId = checkInInputGroup
						.querySelector("input")
						.getAttribute("id");

					let checkInCopy = "";

					if (checkInDate) {
						const checkInData = getDateData(checkInDate);
						checkInCopy = `${checkInData.day} ${checkInData.date} ${checkInData.month}`;
					} else {
						checkInCopy = "Check in";
					}

					// checkInInputGroup.insertAdjacentHTML(
					// 	"beforeend",
					// 	`<label class="checkIn_text" for="${checkInInputId}">${checkInCopy}</label>`
					// );

					const checkInAddon =
						checkInInputGroup.querySelector(".input-group-addon");
					const checkInAddonObserver = new MutationObserver(
						(mutations) => {
							let checkInDate =
								checkInInputGroup.querySelector("input").value;
							let checkInCopy = "";

							if (checkInDate) {
								const checkInData = getDateData(checkInDate);
								checkInCopy = `${checkInData.day} ${checkInData.date} ${checkInData.month}`;
							} else {
								checkInCopy = "Check in";
							}

							// checkInInputGroup.querySelector(
							// 	".checkIn_text"
							// ).textContent = checkInCopy;
						}
					);
					checkInAddonObserver.observe(checkInAddon, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			);

			const checkOutInputGroup = oldMiniSearch.querySelector(
				".fieldCheckOut .input-group"
			);
			let checkOutDate = checkOutInputGroup.querySelector("input").value;

			pollerLite(
				[
					() => {
						return checkOutInputGroup
							.querySelector("input")
							.getAttribute("id");
					},
				],
				() => {
					let checkOutInputId = checkOutInputGroup
						.querySelector("input")
						.getAttribute("id");

					let checkOutCopy = "";

					if (checkOutDate) {
						const checkOutData = getDateData(checkOutDate);
						checkOutCopy = `${checkOutData.day} ${checkOutData.date} ${checkOutData.month}`;
					} else {
						checkOutCopy = "Check out";
					}

					// checkOutInputGroup.insertAdjacentHTML(
					// 	"beforeend",
					// 	`<label class="checkOut_text" for="${checkOutInputId}">${checkOutCopy}</label>`
					// );

					const checkOutAddon =
						checkOutInputGroup.querySelector(".input-group-addon");

					const checkInAddonObserver = new MutationObserver(
						(mutations) => {
							let checkOutDate =
								checkOutInputGroup.querySelector("input").value;
							let checkOutCopy = "";

							if (checkOutDate) {
								const checkOutData = getDateData(checkOutDate);
								checkOutCopy = `${checkOutData.day} ${checkOutData.date} ${checkOutData.month}`;
							} else {
								checkOutCopy = "Check out";
							}

							// checkOutInputGroup.querySelector(
							// 	".checkOut_text"
							// ).textContent = checkOutCopy;
						}
					);
					checkInAddonObserver.observe(checkOutAddon, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			);

			const roomAndGuest = oldMiniSearch.querySelector(".roomGuestWrap");

			// roomAndGuest.insertAdjacentHTML(
			// 	"beforeend",
			// 	`<span class="roomAndGuest_text">${getProccessedString()}</span>`
			// );

			const roomAndGuestObserver = new MutationObserver(
				(mutations, observer) => {
					observer.disconnect();
					const roomAndGuestText =
						roomAndGuest.querySelector(".roomAndGuest_text");
					// roomAndGuestText.textContent = getProccessedString();
					roomAndGuestObserver.observe(roomAndGuest, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			);
			roomAndGuestObserver.observe(roomAndGuest, {
				attributes: true,
				childList: true,
				subtree: true,
			});

			const roomAndGuestText =
				roomAndGuest.querySelector(".roomAndGuest_text");
			let isInitiated = false;
			// roomAndGuestText.addEventListener("click", () => {
			// 	if (!isInitiated) {
			// 		const targetInterval = setInterval(() => {
			// 			const target = roomAndGuest.getAttribute("data-target");
			// 			if (target) {
			// 				clearInterval(targetInterval);
			// 				isInitiated = true;

			// 				pollerLite([`#${target}`], () => {
			// 					const popOver = document.querySelector(
			// 						`#${target}`
			// 					);

			// 					const popOverObserver = new MutationObserver(
			// 						(mutations, observer) => {
			// 							observer.disconnect();
			// 							const roomAndGuestText =
			// 								roomAndGuest.querySelector(
			// 									".roomAndGuest_text"
			// 								);
			// 							roomAndGuestText.textContent =
			// 								getProccessedString();
			// 							popOverObserver.observe(popOver, {
			// 								attributes: true,
			// 								childList: true,
			// 								subtree: true,
			// 							});
			// 						}
			// 					);
			// 					popOverObserver.observe(popOver, {
			// 						attributes: true,
			// 						childList: true,
			// 						subtree: true,
			// 					});
			// 				});
			// 			}
			// 		}, 200);
			// 	}
			// });

			// oldMiniSearch.querySelector(
			// 	"#bookingSearch_search .searchBtnSearchAgain"
			// ).textContent = "Edit search";
			// document
			// 	.querySelector(".new_mini_search .new_mini_search_container")
			// 	.append(oldMiniSearch);
		});
	});

	pollerLite([`.mini_search_item_button`], () => {
		document
			.querySelector(`.mini_search_item_button`)
			.addEventListener("click", () => {
				if (window.innerWidth > 767) {
					if (
						document
							.querySelector(".new_mini_search")
							.classList.contains("active")
					) {
						document
							.querySelector(".new_mini_search")
							.classList.remove("active");
					} else {
						document
							.querySelector(".new_mini_search")
							.classList.add("active");
					}
				} else {
					let element = document.querySelector(
						"#main .mini-search .miniSearch .colEdit a"
					);
					element.click();
				}
			});
	});

	pollerLite([`.edit_search_date`], () => {
		document
			.querySelector(`.edit_search_date`)
			.addEventListener("click", () => {
				if (window.innerWidth > 767) {
					if (
						document
							.querySelector(".new_mini_search")
							.classList.contains("active")
					) {
						document
							.querySelector(".new_mini_search")
							.classList.remove("active");
					} else {
						document
							.querySelector(".new_mini_search")
							.classList.add("active");
					}
				} else {
					let element = document.querySelector(
						"#main .mini-search .miniSearch .colEdit a"
					);
					element.click();
				}

			});
			
	});


};
