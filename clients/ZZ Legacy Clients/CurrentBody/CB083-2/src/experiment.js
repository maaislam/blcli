/*eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let _CB083 = (function() {
	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	let _activate = function() {
		let $ = window.jQuery;
		let quitExperiment = false;
		let bodyClasses = document.body.classList;
		let isCB085 = bodyClasses.contains('CB085') || bodyClasses.contains('CB085v2') || bodyClasses.contains('CB085v3');

		/*
			Cache reusable elements
		*/
		let elements = (function() {	
			let body = document.body;
			let header = document.querySelector('.header-container');
			let oldCurrencySelectorLi = header.querySelectorAll('.links li')[2];
			let oldCurrencySelector = oldCurrencySelectorLi.querySelector('#currency_chooser');
			let basketTrigger = document.getElementById('cart-block');
			let basketPopup = document.getElementById('cart-block-content');
			let uvps, uvp1, uvp2, uvp3;
			if (isCB085) {
				uvps = document.querySelector('.CB85-usp_bar');
				uvp1 = uvps.querySelector('.cb85-usp1 > span');
				uvp2 = uvps.querySelector('.cb85-usp2 > span');
				uvp3 = uvps.querySelector('.cb85-usp3 > span');
			} else {
				uvps = document.querySelector('.CB003_top-banner');
				uvp1 = uvps.querySelector('.one-banner.test_value.test_value_1 a');
				uvp2 = uvps.querySelector('.one-banner.test_value.test_value_2 > span');
				uvp3 = uvps.querySelector('.one-banner.test_value.test_value_3');
			}

			return {
				body: body,
				header: header,
				oldCurrencySelectorLi: oldCurrencySelectorLi,
				oldCurrencySelector: oldCurrencySelector,
				basketTrigger: basketTrigger,
				basketPopup: basketPopup,
				uvps: uvps,
				uvp1: uvp1,
				uvp2: uvp2,
				uvp3: uvp3,
			};
		}());


		/*
			Data object
			- Promise because SiteGainer location API needs to be polled for
		*/
		let getData = new Promise(function(resolve, reject) {	
			var resolved = false;

			/*
				Get user country
			*/
			let getUserCountry = new Promise(function(resolve, reject) {
				/* 
					Priority for determining user country:
						1) Cookie 'country_user_selected' exists
						2) If on product page, check delivery element
						3) Use SiteGainer geolocation - need to poll for the api to exist first
				*/

				// 1)
				let cookie = utils.getCookie('country_user_selected');
				if (cookie) {
					resolve(cookie.toUpperCase());
				}

				// 2)
				let isProductPage = document.body.classList.contains('catalog-product-view');
				if (isProductPage) {
					// Get country code from .flag element
					UC.poller([
						'.eta-country-link .flag'
					], function() {
						let flag = document.querySelector('.eta-country-link .flag');
						let flagCode = flag.className.match(/flag-([\w]{2})/)[1];
	
						if (flagCode) {
							if (!resolved) {
								resolve(flagCode.toUpperCase());
								resolved = true;
							}
						}
					});
				}

				// 3)
				UC.poller([
					function() {
						try {
							return !!window.sg_api.lib.lsGetdata('Website', 'geoData');
						} catch(err) {
						}
					}
				], function() {
					let locationCode = window.sg_api.lib.lsGetdata('Website', 'geoData').countryCode;
					if (locationCode) {
						if (!resolved) {
							resolve(locationCode);
							resolved = true;
						}
					}
				});
			});

			/*
				When user country exists, continue building data object
			*/
			getUserCountry.then(function(userCountry) {
				/*
					All available delivery options for each country.
					Note: As of 27/11/17, some of the delivery options have been
					updated manually at the request of the client as they are not
					correct
				*/
				let allCountryData = {
					"AL": {
						"country": "Albania",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"AD": {
						"country": "Andorra",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"AE": {
						"country": "United Arab Emirates",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"AR": {
						"country": "Argentina",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"AU": {
						"country": "Australia",
						"deliveryOptions": [{
							"days": 9,
							"price": 14
						}, {
							"days": 5,
							"price": 22
						}]
					},
					"AT": {
						"country": "Austria",
						"deliveryOptions": [{
							"days": 4,
							"price": 7.95
						}, {
							"days": 2,
							"price": 9.95
						}]
					},
					"BE": {
						"country": "Belgium",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 11
						}]
					},
					"BG": {
						"country": "Bulgaria",
						"deliveryOptions": [{
							"days": 6,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"BH": {
						"country": "Bahrain",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"BA": {
						"country": "Bosnia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"BY": {
						"country": "Belarus",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"BR": {
						"country": "Brazil",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"BN": {
						"country": "Brunei",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"CA": {
						"country": "Canada",
						"deliveryOptions": [{
							"days": 15,
							"price": 0
						}, {
							"days": 12,
							"price": 10
						}, {
							"days": 7,
							"price": 24.5
						}]
					},
					"CH": {
						"country": "Switzerland",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 5,
							"price": 24
						}]
					},
					"CN": {
						"country": "China",
						"deliveryOptions": [{
							"days": 9,
							"price": 9.95
						}, {
							"days": 4,
							"price": 11.95
						}]
					},
					"KY": {
						"country": "Cayman Islands",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"CY": {
						"country": "Cyprus",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"CZ": {
						"country": "Czech Republic",
						"deliveryOptions": [{
							"days": 6,
							"price": 7.95
						}, {
							"days": 3,
							"price": 11.95
						}]
					},
					"DE": {
						"country": "Germany",
						"deliveryOptions": [{
							"days": 4,
							"price": 7.95
						}, {
							"days": 2,
							"price": 9.95
						}]
					},
					"DK": {
						"country": "Denmark",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"ES": {
						"country": "Spain",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"EE": {
						"country": "Estonia",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"FI": {
						"country": "Finland",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"FK": {
						"country": "Falkland Islands",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"FR": {
						"country": "France",
						"deliveryOptions": [{
							"days": 4,
							"price": 7.95
						}, {
							"days": 2,
							"price": 9.95
						}]
					},
					"FO": {
						"country": "Faroe Islands",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"GB": {
						"country": "UK",
						"deliveryOptions": [{
							"days": 0,
							"price": 2.95
						}, {
							"days": 0,
							"price": 0
						}]
					},
					"GE": {
						"country": "Georgia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"GG": {
						"country": "Guernsey",
						"deliveryOptions": [{
							"days": 3,
							"price": 0
						}, {
							"days": 1,
							"price": 4.5
						}]
					},
					"GI": {
						"country": "Gibraltar",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"GR": {
						"country": "Greece",
						"deliveryOptions": [{
							"days": 7,
							"price": 11
						}, {
							"days": 5,
							"price": 15
						}]
					},
					"GF": {
						"country": "French Guiana",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"HK": {
						"country": "Hong Kong",
						"deliveryOptions": [{
							"days": 9,
							"price": 0
						}, {
							"days": 7,
							"price": 10
						}, {
							"days": 4,
							"price": 20
						}]
					},
					"HR": {
						"country": "Croatia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"HU": {
						"country": "Hungary",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"IM": {
						"country": "Isle of Man",
						"deliveryOptions": [{
							"days": 3,
							"price": 0
						}, {
							"days": 1,
							"price": 4.5
						}]
					},
					"IN": {
						"country": "India",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"IE": {
						"country": "Ireland",
						"deliveryOptions": [{
							"days": 4,
							"price": 6.95
						}, {
							"days": 2,
							"price": 8.95
						}]
					},
					"IR": {
						"country": "Iran",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"IS": {
						"country": "Iceland",
						"deliveryOptions": [{
							"days": 12,
							"price": 9.95
						}, {
							"days": 6,
							"price": 15.95
						}]
					},
					"IL": {
						"country": "Israel",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"IT": {
						"country": "Italy",
						"deliveryOptions": [{
							"days": 6,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"JE": {
						"country": "Jersey",
						"deliveryOptions": [{
							"days": 3,
							"price": 0
						}, {
							"days": 1,
							"price": 4.5
						}]
					},
					"JP": {
						"country": "Japan",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"KR": {
						"country": "South Korea",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"KW": {
						"country": "Kuwait",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"LI": {
						"country": "Liechtenstein",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"LT": {
						"country": "Lithuania",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"LU": {
						"country": "Luxembourg",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"LV": {
						"country": "Latvia",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"MC": {
						"country": "Monaco",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"MD": {
						"country": "Moldova",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"MX": {
						"country": "Mexico",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"MK": {
						"country": "Macedonia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"MT": {
						"country": "Malta",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"MY": {
						"country": "Malaysia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"NL": {
						"country": "Netherlands",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"NO": {
						"country": "Norway",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"NZ": {
						"country": "New Zealand",
						"deliveryOptions": [{
							"days": 12,
							"price": 12
						}, {
							"days": 6,
							"price": 22
						}]
					},
					"OM": {
						"country": "Oman",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"PL": {
						"country": "Poland",
						"deliveryOptions": [{
							"days": 6,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"PT": {
						"country": "Portugal",
						"deliveryOptions": [{
							"days": 6,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"QA": {
						"country": "Qatar",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"RE": {
						"country": "Réunion",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"RO": {
						"country": "Romania",
						"deliveryOptions": [{
							"days": 7,
							"price": 24
						}]
					},
					"SA": {
						"country": "Saudi Arabia",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"SG": {
						"country": "Singapore",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"SM": {
						"country": "San Marino",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"SK": {
						"country": "Slovakia",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"SI": {
						"country": "Slovenia",
						"deliveryOptions": [{
							"days": 8,
							"price": 12.5
						}, {
							"days": 5,
							"price": 17.5
						}]
					},
					"SE": {
						"country": "Sweden",
						"deliveryOptions": [{
							"days": 5,
							"price": 7.95
						}, {
							"days": 3,
							"price": 9.95
						}]
					},
					"TR": {
						"country": "Turkey",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"TW": {
						"country": "Taiwan",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"UA": {
						"country": "Ukraine",
						"deliveryOptions": [{
							"days": 7,
							"price": 7.95
						}, {
							"days": 4,
							"price": 9.95
						}]
					},
					"US": {
						"country": "US",
						"deliveryOptions": [{
							"days": 12,
							"price": 0
						}, {
							"days": 8,
							"price": 10
						}, {
							"days": 4, // Updated from 5
							"price": 22
						}]
					},
					"YE": {
						"country": "Yemen",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					},
					"ZA": {
						"country": "South Africa",
						"deliveryOptions": [{
							"days": 14,
							"price": 14
						}, {
							"days": 7,
							"price": 24
						}]
					}
				};

				/*
					If delivery is not available for found user's country, quit experiment
					and report error to GA
				*/
				if (userCountry && !allCountryData[userCountry]) {
					quitExperiment = true;
					utils.events.send('CB083', 'Error', 'Delivery not available for pre-selected country');
					return false;
				}

				/*
					Find cheapest and fastest delivery options for this country
				*/
				let countryData = allCountryData[userCountry];
				let countryDeliveryOptions = countryData.deliveryOptions;
				let countryName = countryData.country;

				let bestDeliveryOpts = (function() {
					let option, cheapest, fastest;

					for (let i = 0; i < countryDeliveryOptions.length; i++) {
						option = countryDeliveryOptions[i];

						if (fastest === undefined || option.days < fastest) {
							fastest = option.days;
						}

						if (cheapest === undefined || option.price < cheapest) {
							cheapest = option.price;
						}
					}

					/* 
						Delivery days is the value in the JSON +1 day for
						the time it takes to dispatch items
					*/
					fastest++;

					let bestDeliveryOptions = {
						cheapest: cheapest,
						fastest: fastest
					};

					countryData.bestDeliveryOptions = bestDeliveryOptions;

					return bestDeliveryOptions;
				}());

				/*
					The shipping message shown depends on delivery cost
				*/
				let deliveryCostMsg = (function() {	
					if (bestDeliveryOpts.cheapest === 0) {
						/* 
							Free delivery available
						*/
						return '<strong>FREE</strong> ' + countryName + ' delivery';
					} else {
						/* 
							Free delivery not available
						*/
						return '<span class="CB083_usp--delivery">Delivery to ' + countryName + ' from <span class="CB083_delivery-price">£' + bestDeliveryOpts.cheapest.toFixed(2) + '</span></span>';
					}

				}());

				
				/*
					Countries to prefix with word 'the'
				*/
				let prefixedCountries = ['UK', 'US'];
				let countryString = (prefixedCountries.indexOf(countryName) > -1 ? ('the ' + countryName) : (countryName));
				countryData.countryString = countryString;


				/*
					1st UVP in top banner
				*/
				let deliveryTimeMsg = 'We can deliver to <span class="CB083_name">' + countryString + '</span> in as little as ' + bestDeliveryOpts.fastest + ' day' + (bestDeliveryOpts.fastest > 1 ? 's' : '');
				resolve({
					userCountry: userCountry,
					allCountryData: allCountryData,
					countryData: countryData,
					deliveryCostMsg: deliveryCostMsg,
					deliveryTimeMsg: deliveryTimeMsg
				});
			});
		});


		/*
			When the data object is resolved, start building the experiment
		*/
		getData.then(function(data) {
			/*
				Failsafe
				This is to ensure the country selector is working
				- Due to issues with some cookies being innaccessible at
				times the country selector may no longer work. The known
				scenarios have been accounted for but it's possible there 
				may be more. 
				
				A cookie is set when the user attempts to change country, 
				if it doesn't change exit the experiment and store a cookie 
				to prevent it from triggering again.
			*/
			let failsafe = (function() {
				let status = true;
				let countryChange = utils.getCookie('CB083_country-change');
				if (countryChange) {
					if (data.userCountry !== countryChange) {
						/*
							User attempted to change country but it was unsuccessful.
							Don't run this experiment for this user anymore
						*/
						utils.setCookie('CB083_exclude', true);
						utils.events.send('CB083', 'Error', 'Changing country was unsuccessful - user bucketed out of experiment');
						status = false;
					}
				}

				return status;
			}());

			if (!failsafe) return false;

			/* 
				User country could not be found or delivery is 
				not available for selected country
			*/
			if (quitExperiment) return false;


			/*
				Namespace CSS
			*/
			elements.body.className += ' CB083';


			/*
				Build top banner
			*/
			let banner = (function() {
				let countryData = data.countryData;
				let fastestDelivery = countryData.bestDeliveryOptions.fastest;
				let deliveryDaysLabel = fastestDelivery > 1 ? 'days' : 'day';

				let html = document.createElement('div');
				html.className = 'CB083_banner';
				html.innerHTML = `
					<div class="CB083_banner__inner">
						<div class="CB083_shipping CB083_column">
							<span class="CB083_icon">
								<div class="CB083_icon--delivery">
									<em>${fastestDelivery}</em>
									${deliveryDaysLabel}
								</div>
							</span>
							<span>
								${data.deliveryTimeMsg}
							</span>
						</div>
						<div class="CB083_usps CB083_column">
							<div class="CB083_usp CB083_usp--1">
								<span class="CB083_icon"></span>
								${data.deliveryCostMsg}
							</div>
							<div class="CB083_usp CB083_usp--2" style="display: none;">
								<span>We accept: </span>
								<img src="https://www.sitegainer.com/fu/up/1jm3mam8oietezm.jpg">
								<img src="https://www.sitegainer.com/fu/up/h05j0yefhpwl24l.jpg">
								<img src="https://www.sitegainer.com/fu/up/d2hog6cywns7jg8.jpg">
								<img src="https://www.sitegainer.com/fu/up/c2e927vq87xolmv.jpg">
								<img src="https://www.sitegainer.com/fu/up/ldnqo7o15fixzc8.jpg">
							</div>
						</div>
						<div class="CB083_preferences CB083_column">
							<span>Change: </span>
						</div>
						<span class="CB083_banner__close">×</span>
					</div>
				`;

				/* 
					Cache elements
				*/
				elements.close = html.querySelector('.CB083_banner__close');
				elements.usps = html.querySelectorAll('.CB083_usp');

				/*
					Cycle through USPs
				*/
				let animateUsps = (function() {
					let activeIdx = 0;
					let usps = elements.usps;
					
					setInterval(function() {				
						$(usps[activeIdx]).fadeOut(400, function() {
							activeIdx++;

							/*
								If next usp to load in has exceeded array length
								restart from beginning
							*/
							if (activeIdx+1 > usps.length) activeIdx = 0;
					
							$(usps[activeIdx]).fadeIn(400);
						});
					}, 4000);
				}());


				/*
					Build preferences selectors
				*/
				let preferencesSelectors = (function() {
					/*
						Create elements
					*/
					let container = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__selector-wrap';

						return div;
					}());

					let selector = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__selector';
						div.innerHTML = `
							<img class="flag flag-${data.userCountry.toLowerCase()}" />
							<span id="CB083_selected-preferences"></span>
							<i class="CB083_arrow_down"></i>
						`;

						return div;
					}());

					let popup = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__selector__popup';
						div.style.display = 'none';

						return div;
					}());

					let countryLabel = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__label';
						div.innerHTML = `Country:`;

						return div;
					}());

					let currencyLabel = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__label';
						div.innerHTML = `Currency:`;

						return div;
					}());

					let countrySelector = (function() {
						let select = document.createElement('select');
						select.className = 'CB083_preferences__select CB083_preferences__select--country';
						/*
							Create an option element for each country
						*/
						for (let country in data.allCountryData) {
							(function() {
								let option = document.createElement('option');
								option.value = country;
								
								let countryName = data.allCountryData[country].country;
								let countryText;

								/* Customise some country names to long form in dropdown */
								switch (countryName) {
									case 'UK':
									countryText = 'United Kingdom';
									break;

									case 'US':
									countryText = 'United States';
									break;

									default:
									countryText = countryName;
								}

								option.innerText = countryText;
								
								select.appendChild(option);
							}());
						}


						/*
							Set selected value to user country
						*/
						select.value = data.userCountry;


						/*
							Alphabetise dropdown options by long-form name
						*/
						utils.sortSelectOptions($, $(select), false);

						return select;
					}());


					let currencySelector = (function() {
						let select = document.createElement('select');
						select.className = 'CB083_preferences__select CB083_preferences__select--currency';
						select.innerHTML = ``;
						/*
							Create an option element for each currency
						*/
						let oldSelector = elements.oldCurrencySelector;
						let currencies = oldSelector.options;
						for (let i = 0; i < currencies.length; i++) {
							let text = currencies[i].innerText.trim();
							
							let option = document.createElement('option');
							option.value = text;
							option.innerText = text;
							
							select.appendChild(option);
						}
						

						/*
							Set selected value to value from original currency selector
						*/
						data.userCurrency = currencies[oldSelector.selectedIndex].innerText.trim();
						select.value = data.userCurrency;

						return select;
					}());

					let confirm = (function() {
						let div = document.createElement('div');
						div.className = 'CB083_preferences__confirm';
						div.innerHTML = `Confirm`;

						return div;
					}());


					/*
						Add to container
					*/
					popup.appendChild(countryLabel);
					popup.appendChild(countrySelector);
					popup.appendChild(currencyLabel);
					popup.appendChild(currencySelector);
					popup.appendChild(confirm);
					container.appendChild(selector);
					container.appendChild(popup);


					/*
						Update text to match currently selected options
						- Change text to UK if value is GB
					*/
					let text = selector.querySelector('#CB083_selected-preferences');
					if (countrySelector.value === 'GB') {
						text.innerText = 'UK (' + currencySelector.value + ')';
					} else {
						text.innerText = countrySelector.value + ' (' + currencySelector.value + ')';
					}

					/*
						Cache elements
					*/
					elements.banner = html;
					elements.popup = popup;
					elements.countrySelector = countrySelector;
					elements.currencySelector = currencySelector;
					elements.confirm = confirm;
					elements.preferencesSelector = selector;

					return container;
				}());


				/* 
					Event handlers
				*/
				let events = (function() {
					/*
						On confirm, check for changes and store country cookie
						and/or trigger change on old currency selector where applicable
					*/
					$(elements.confirm).on('click', function() {
						let countryChanged, currencyChanged;

						/*
							Check if country has changed
						*/
						let userCountry = data.userCountry;
						let selectedCountry = elements.countrySelector.value;
						let reloadFunc = function() {
							window.location.reload();
						};

						if (userCountry !== selectedCountry) {
							/*
								Force country change with cookie
							*/
							utils.setCookie('country_user_selected', selectedCountry);
							utils.events.send('CB083', 'Change', 'User changed country');
							countryChanged = true;
						}

						/*
							Check if currency has changed
						*/
						let userCurrency = data.userCurrency;
						let currencySelector = elements.currencySelector;
						let selectedCurrency = currencySelector.value;

						if (userCurrency !== selectedCurrency) {
							/*
								Trigger change on original element which will force a 
								page refresh
							*/
							let currencyChangeURL = elements.oldCurrencySelector.options[currencySelector.selectedIndex].value;
							utils.events.send('CB083', 'Change', 'User changed currency');
							currencyChanged = true;
							reloadFunc = function() {
								window.location.href = currencyChangeURL;
							};
						}

						if (countryChanged) {
							/*
								Set failsafe cookie
							*/
							utils.setCookie('CB083_country-change', selectedCountry);
						}

						if (countryChanged || currencyChanged) {
							reloadFunc();
						}
					});

					/*
						Toggle preferences popup visibility on click
					*/
					$(elements.preferencesSelector).on('click', function() {
						utils.events.send('CB083', 'Click', 'User opened preferences dialog');

						$(elements.popup).toggle();
					});

					/*
						Close banner on click of close button and store in sessionStorage
						to prevent it coming back this session
					*/
					$(elements.close).on('click', function() {
						utils.events.send('CB083', 'Click', 'User closed banner');
						sessionStorage.setItem('CB083_closed', 'true');

						$(html).slideUp();
					});

					/*
						Force hover delay on basket as the default behaviour is very
						sensitive. It's too easy to accidentally hover over it whilst
						going for the currency selector
					*/
					let basketHover = (function() {
						let popup = elements.basketPopup;
						popup.classList.add('CB083_minibasket');

						let ctrls = {
							show: function() {
								popup.classList.add('CB083_minibasket--show');
							},
							hide: function() {
								if (popup.classList.contains('CB083_minibasket--show')) {
									popup.classList.remove('CB083_minibasket--show');
								}
							}
						};

						/*
							Re-enable close button functionality
						*/
						$(popup.querySelector('.close')).on('click', function() {
							ctrls.hide();
						});

						let timer;
						$(elements.basketTrigger).hover(function() {
							if (timer) {
								clearTimeout(timer);
								timer = null;
							}
							timer = setTimeout(function() {
								ctrls.show();
							}, 500);
						}, function() {
							clearTimeout(timer);
							timer = null;
							ctrls.hide();
						});

					}());
					
				}());


				/* 
					Render elements
				*/
				html.querySelector('.CB083_preferences').appendChild(preferencesSelectors);
				elements.header.parentElement.insertBefore(html, elements.header);

			}());

			
			/*
				Make other changes to page
			*/
			let pageChanges = (function() {
				let countryName = data.countryData.country;

				/*
					IMPORTANT
					If on product page - disable country selection in delivery container
					
					Using this feature on Chrome (potentially other browsers too) creates a version of
					the 'country_user_selected' cookie on a different domain that is inaccessible from the front-end
					(.currentbody.com rather than www.currentbody.com). This means the newly created country selector 
					won't work
				*/
				if (elements.body.classList.contains('catalog-product-view')) {
					UC.poller([
						'.eta-country-selector',
						'.eta-popup'
					], function() {
						document.querySelector('.eta-country-selector').classList.add('CB083_force-hide');
						document.querySelector('.eta-popup').classList.add('CB083_force-hide');
					});
				}

				/*
					Modify UVP wrap to enable full-width
				*/
				if (!isCB085) {
					let uvpWrap = elements.uvps.parentElement;
					uvpWrap.classList.remove('container-fluid');
					uvpWrap.classList.add('CB083_uvp-wrap');
				}
				

				/*
					Create custom USPs for specific countries
				*/
				let modifyUVP = (function() {

					// Custom icons to use in USPs for CB085
					let allCountryUVP = {
						'IE': {
							first: 'Delivery in as little as <strong>3 days</strong>',
							second: '<strong>PayPal</strong> option available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> Shipping starts from just <strong><span class="CB083_delivery-price">€6.50</span></strong>',
							icons: ['delivery', 'paypal', 'heart']
						},
						'FR': {
							first: 'Delivery in as little as <strong>3 days</strong>',
							second: '<strong>PayPal</strong> option available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> Shipping starts from just <strong><span class="CB083_delivery-price">€8.50</span></strong>',
							icons: ['delivery', 'paypal', 'heart']
						},
						'NL': {
							first: 'Delivery in as little as <strong>4 days</strong>',
							second: '<strong>PayPal</strong> option available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> Shipping starts from just <strong><span class="CB083_delivery-price">€8.50</span></strong>',
							icons: ['delivery', 'paypal', 'heart']
						},
						'US': {
							first: 'UPS express delivery in just <strong>5 days</strong>',
							second: '<strong>Free</strong> tracked shipping available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong>PayPal</strong> payment option',
							icons: ['delivery', 'heart', 'paypal']
						},
						'HK': {
							first: 'UPS express delivery in just <strong>5 days</strong>',
							second: '<strong>Free</strong> tracked shipping available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong>PayPal</strong> payment option',
							icons: ['delivery', 'heart', 'paypal']
						},
						'CN': {
							first: 'UPS express delivery in just <strong>5 days</strong>',
							second: '<strong>Free</strong> tracked shipping available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong>PayPal</strong> payment option',
							icons: ['delivery', 'heart', 'paypal']
						},
						'CH': {
							first: 'UPS express delivery in just <strong>6 days</strong>',
							second: '<strong>Free</strong> tracked shipping available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong>PayPal</strong> payment option',
							icons: ['delivery', 'heart', 'paypal']
						},
						'AU': {
							first: 'UPS express delivery in just <strong>6 days</strong>',
							second: '<strong>Free</strong> tracked shipping available',
							third: '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong>PayPal</strong> payment option',
							icons: ['delivery', 'heart', 'paypal']
						}
					};

					/*
						If user country has custom UVPs, use those
						else use generic ones
					*/
					let userCountry = data.userCountry;
					let countryUVP = allCountryUVP[userCountry];
					if (countryUVP) {
						/*
							Replace with country specific UVPs
						*/
						if (countryUVP.first) elements.uvp1.innerHTML = countryUVP.first;
						if (countryUVP.second) elements.uvp2.innerHTML = countryUVP.second;
						if (countryUVP.third) elements.uvp3.innerHTML = countryUVP.third;

						/*
							Change icons if CB085
						*/
						if (isCB085) {
							let icons = countryUVP.icons;
							let hasIcons = elements.uvp1.parentElement.querySelector('.CB85-usp_icon');
							if (hasIcons) {
								if (icons[0]) elements.uvp1.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_${icons[0]}-icon`)
								if (icons[1]) elements.uvp2.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_${icons[1]}-icon`)
								if (icons[3]) elements.uvp3.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_${icons[2]}-icon`)
							}
						}
					} else {
						/*
							Use generic UVPs
						*/
						elements.uvp1.innerHTML = (function() {
							var country = data.countryData.countryString;
							var deliveryDays = data.countryData.bestDeliveryOptions.fastest;

							return 'Delivered to ' + country + ' in as little as  <strong>' + deliveryDays + ' day' + (deliveryDays > 1 ? 's' : '') + '</strong>';
						}());
						elements.uvp2.innerHTML = data.deliveryCostMsg;
						elements.uvp3.innerHTML = (function() {
							var price;

							switch (data.userCurrency) {
								case 'GBP':
								price = '£50';
								break;

								case 'EUR':
								price = '€59';
								break;

								case 'USD':
								price = '$69';
								break;
							}

							return '<img alt="" src="//www.sitegainer.com/fu/up/l0xla4d4ybt3zrq.png" style="height: 34px;"> <strong style="font-weight: bold;">Free Gift</strong> on all orders over ' + price;
						}());

						/*
							Change icons if CB085
						*/
						let hasIcons = elements.uvp1.parentElement.querySelector('.CB85-usp_icon');
						if (isCB085 && hasIcons) {
							elements.uvp1.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_delivery-icon`)
							elements.uvp2.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_heart-icon`)
							elements.uvp3.parentElement.querySelector('.CB85-usp_icon').classList.add(`CB083_gift-icon`)
						}
					}

				}());


				/*
					Hide original currency selector
				*/
				elements.oldCurrencySelectorLi.style.display = 'none';
				

				/*
					Nav z-index fix
					When hovering over the nav, increase the z-index
					of the nav and page overlay
				*/
				// let navFix = (function() {
				// 	UC.poller([
				// 		'.uc-newnav-bar',
				// 		'.ucnewnavempty'
				// 	], function() {
				// 		let $nav = $('.uc-newnav-bar');
				// 		let $overlay = $('.ucnewnavempty');
				// 		let $popup = $(elements.popup);

				// 		$nav.hover(function() {
				// 			$nav.add($overlay).addClass('CB083_nav--hover');
				// 			if ($popup.css('display') !== 'none') {
				// 				$popup.hide();
				// 			}
				// 		}, function() {
				// 			$nav.add($overlay).removeClass('CB083_nav--hover');
				// 		});
				// 	});
				// }());

				/*
					Delivery price in top banner is currently shown in GBP due to 
					limited data available in the JSON. If the currency is something
					other than GBP, check if this delivery price has previously been stored
					in localStorage. If not, make a GET request to the delivery information
					URL for Clarisonic Mia 2 (product ID: 874) and extract the price in 
					the chosen currency from the HTML response
				*/
				let updateDeliveryPrice = (function() {

					/*
						Function to update all price elements
					*/
					function updatePriceElements(price) {
						var priceElements = document.querySelectorAll('.CB083_delivery-price');
						[].forEach.call(priceElements, function(item, idx) {
							item.innerText = price;
						});
					}

					/*
						Do nothing if currency is GBP because price is already accurate.
						Also do nothing if free delivery is available because message will 
						be different
					*/
					let currency = elements.currencySelector.value;
					if (currency === 'GBP') return false;
					if (data.countryData.bestDeliveryOptions.cheapest === 0) return false;

					if (localStorage.getItem('CB083_del')) {
						// localStorage object exists, check that
						let dataObj = JSON.parse(localStorage.getItem('CB083_del'));
						let country = dataObj[data.userCountry];
						if (country && country[currency]) {
							
							/* 
								Country/Currency combination exists in localStorage so update all
								price elements with cached price
							*/
							updatePriceElements(country[currency]);
							
							return;
						}
					}

					/*
						Doesn't exist in cache, make AJAX request to get delivery price
						Protocol - If current page is https, make request to https also
					*/
					let protocol = window.location.protocol;
					$.ajax({
						type: 'GET',
						dataType: 'html',
						url: protocol + '//www.currentbody.com/spb/product/estimate/id/874/country/' + data.userCountry,
						success: function(response) {
							let priceNotAvailable;
							/*
								Update price in banner
							*/
							let $price = $(response).find('.price');
							let price;

							/*
								Ensure price is available from the response
								if not, hide the first UVP
							*/
							if ($price.length) {
								price = $price[0].innerText;
								let priceStr = price.match(/[\d\.]+/g);
								if (priceStr && priceStr.length) {
									let priceFloat = parseFloat(priceStr[0]);

									if (typeof priceFloat !== 'number') {
										priceNotAvailable = true;
									}
								} else {
									priceNotAvailable = true;	
								}
							} else {
								priceNotAvailable = true;
							}

							if (priceNotAvailable) {
								utils.events.send('CB083', 'Error', 'Could not get price for country: ' + data.userCountry);
								elements.banner.querySelector('.CB083_usp--delivery').innerHTML = 'Delivery to ' + data.countryData.country;
								return false;
							}

							updatePriceElements(price);

							/*
								Store this delivery price in localStorage to avoid having
								to make repeat requests on future page loads
							*/
							let dataObj = localStorage.getItem('CB083_del') || '{}';
							dataObj = JSON.parse(dataObj);
							dataObj[data.userCountry] = {};
							dataObj[data.userCountry][currency] = price;

							localStorage.setItem('CB083_del', JSON.stringify(dataObj));


						},
						error: function() {
							elements.banner.querySelector('.CB083_usp--delivery').innerHTML = 'Delivery to ' + data.countryData.country;
							return;
						}
					});
					
				}());

			}());


			utils.events.send('CB038', 'Page View', 'Experiment shown');

		});
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	let _triggers = function(options) {
		/*
			Don't run if:
			- web storage isn't available
			- user closed bar in this session
			- changing country failed previously
		*/
		if (!sessionStorage || sessionStorage.getItem('CB083_closed') || utils.getCookie('CB083_exclude')) {
			return false;
		}

		utils.fullStory('CB083', 'Variation 1');

		// Run if either CB003 or CB085 is running
		UC.poller([
			'#currency_chooser',
			() => document.querySelector('.CB003_top-banner') || document.querySelector('.CB85-usp_bar')
		], _activate);
	};


	/*
		Run experiment
	*/
	_triggers();

})();