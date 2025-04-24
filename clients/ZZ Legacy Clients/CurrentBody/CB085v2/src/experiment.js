/*eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import mobileNav from './lib/mobile-nav-CB18.js';
import desktopNav from './lib/desktop-nav-CB11.js';

var _CB085 = (function() {
	/* 
	 * Performance Optimisation / Flicker Prevention 
	 */

	// Hide header as soon as it exists
	UC.poller(['.header-container'], () => {
		const element = document.querySelector('.header-container');	
		element.classList.add('CB085_forceHide');

		// Fallback to unhide after 3s
		setTimeout(() => {
			element.classList.remove('CB085_forceHide');
		}, 1000);
	}, { wait: 20 });	

	const isMobile = window.innerWidth < 768;
	if (!isMobile) {
		document.body.classList.add('CB85-desktop');

		// Hide mobile header elements as soon as they exist
		UC.poller(['.fullwidth #show-main-nav'], () => {
			const container = document.querySelector('#show-main-nav').parentElement.parentElement.parentElement;
			if (container.classList.contains('fullwidth')) {
				container.style.display = 'none';
			}
		}, { wait: 20 });
	}

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		
		//Caching elements
		var $body = $('body');
		$body.addClass('CB085v2');
	

		//variables that will be used on both
		var $searchBar = $('header .col-xs-12.col-sm-6.col-md-5:last'),
				$basket = $('.links.list-inline #cart-block');
		
		var $topImages = {
				cblogo:'https://www.currentbody.com/skin/frontend/bootstrap/currentbody/images/logo.png',
				trustpilot:'//www.sitegainer.com/fu/up/0sbzm9urpyiu954.jpg'
		}

		function changeBasketText(){
			//remove all the text except the item amount
			var cartText = $('#cart-block-view');
			var newBasketText = cartText.text().replace(/(Basket)/g,"").replace(/.\d+.\d+/g, "").replace('(','').replace(')','');
			cartText.text(newBasketText);
		}

		/*USPS*/
		//Add USP content
		var $USPS = [
			['cb85-usp1','Free UK delivery & simple returns'],
			['cb85-usp2','Free gift on orders over £100'],
			['cb85-usp3','Over 200,000 customers'],
			['cb85-usp4','Fast checkout available with PayPal Express']
		]


	/*--------------------------------------
	Device variations
	---------------------------------------*/
		function mobileHeader() {
			/*create two top logos*/
			var $headerWrapper = $('.header-container'),
					$headerBar = $headerWrapper.find('.topheader');
			
			$headerBar.prepend(`
			<div class="CB85-header-top">
				<div class="CB85-logo">
			    	<a href="https://www.currentbody.com/"><img src="${$topImages.cblogo}"/></a>
				</div>
				<div class="CB85-trustpilot">
					<img src="${$topImages.trustpilot}"/>
				</div>
			</div>`); 


		/*bar with search and icons*/
			var iconsBar = $('.fullwidth > .container-fluid > .nav-container');

			var icons = {
				phone:'CALL',
				phoneIcon:'//www.sitegainer.com/fu/up/nc7hso1q0nayx6n.png',
				basketIcon:'//www.sitegainer.com/fu/up/n852gfwufyakppi.png',
				phoneLink: 'tel:08009596565',
				basketLink: '//www.currentbody.com/checkout/cart/'
			}

			iconsBar.after(
				`<div class="CB85-newBar">
					<a href="${icons.phoneLink}">
						<div class="CB85-icon CB85-phone">
							<img src="${icons.phoneIcon}"/>
								<span>${icons.phone}</span>
						</div>
					</a>
					<div class="CB85-search"/>
					<a class="CB85-basket-link" href="${icons.basketLink}">
						<div class="CB85-icon CB85-basket"/>
					</a>
				</div>`);
			
			var $newBar = $('.CB85-newBar');
			var searchIcon = $newBar.find('.CB85-search');
				$searchBar.addClass('CB85-search_bar').prependTo(searchIcon);
			//add placeholder to searchbar
			$searchBar.find('#search').attr('placeholder','Search for top products');

			//Move basket
			$newBar.find('.CB85-icon.CB85-basket').prepend($basket);

			// Unhide header
			document.querySelector('.header-container').classList.remove('CB085_forceHide');

			//remove all the text except the item amount
			changeBasketText();
					
			/*--------------------------------------
			Mobile USPS
			---------------------------------------*/
			function USPs(){
				var newUSPbar = $('<div class="CB85-usp_bar"/>');
				$newBar.after(newUSPbar);

				$.each($USPS,function(){
					var uspName = this[0],
						uspText = this[1];
					
					var $USPdivs = $(`<div class="CB85-usp ${uspName}">
						<div class="CB85-usp_icon"></div>
						<span>${uspText}</span>
					<div>`).appendTo(newUSPbar);
				});
					
				var $usps = $('.CB85-usp_bar');
				if ($.fn.owlCarousel) {
					$usps.owlCarousel({
						pagination: false,
						navigation: false,
						margin: 0,
						singleItem: true,
						autoPlay: 5000,
						loop:true
					});
				} else {
					$usps.hide();
					$.get('https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js', function() {
						$usps.show();
						$usps.owlCarousel({
							pagination: false,
							navigation: false,
							margin: 0,
							singleItem: true,
							autoPlay: 5000,
							loop:true
						});
					})
				}
				//TO DO - ipad and desktop

			}
			USPs();

			/*--------------------------------------
			Add mobile navigation
			---------------------------------------*/
			UC.poller(['.menu_a_1', '.menu_b_1'], mobileNav);
		}

		function desktopHeader(){
			$body.addClass('CB85-desktop');

			/*--------------------------------------
			create the two new rows
			---------------------------------------*/
			var $desktopWrap = $('<div class="CB85-topBar_desktop"/><div class="CB85-searchRow"/>'),
				quickLinks = $('.quick-access.container-fluid .links.list-inline');
			$desktopWrap.prependTo('.header-container');

			/*--------------------------------------	
			create search/logo/basket bar
			---------------------------------------*/
			$desktopWrap.filter('.CB85-searchRow').html(
				`<div class="CB85-desktoplogo"><a href="https://www.currentbody.com/"><img src="${$topImages.cblogo}"/></div></a>
				 <div class="CB85-desktopsearchContainer"/>
				 <div class="CB85-desktop-basket"/>`
			)
			
			$searchBar.prependTo('.CB85-desktopsearchContainer');
			$searchBar.removeAttr('class');
			$basket.prependTo('.CB85-desktop-basket');
			changeBasketText();
			$searchBar.find('#search').attr('placeholder','Search for top products and expert advice');


			/*--------------------------------------
			addTopbar for account
			---------------------------------------*/

		     //create top row
			var $accountBar = $desktopWrap.filter('.CB85-topBar_desktop'),
				$middleRow = $desktopWrap.filter('.CB85-searchRow');

				$accountBar.html(`<div class="container-fluid"><div class="CB85-left"/><div class="CB85-right"/></div>`);


			/*--------------------------------------
			Currency Selector
			---------------------------------------*/
			function currencyDropdown() {
				const currencySelector = document.createElement('div');
				currencySelector.classList.add('CB85-currency');

				const countryFlag = document.createElement('div');
				countryFlag.classList.add('CB85-countryFlag');
				currencySelector.appendChild(countryFlag);

				const currencySymbol = document.createElement('span');
				currencySelector.appendChild(currencySymbol);

				const currencyBox = document.createElement('div');
				currencyBox.classList.add('CB85-currencyBox');
				currencySelector.appendChild(currencyBox);

				const selectedCurrency = document.querySelector('.links.list-inline .block-content .sb.selectbox .display .text span');
				const currency = selectedCurrency.className;
				const selectedCurrencySymbol = selectedCurrency.innerText;

        // add currency here
				const countryClass = (() => {
					switch (currency) {
						case 'aud':
						return 'CB85-au';
						
						case 'gbp':
						return 'CB85-gb';

						case 'eur':
						return 'CB85-eu';

						case 'usd':
            return 'CB85-us';
            
            case 'aed':
            return 'CB85-aed';
            
            case 'cad':
            return 'CB85-cad';
            
            case 'chf':
            return 'CB85-chf';
            
            case 'cny':
            return 'CB85-cny';
            
            case 'czk':
            return 'CB85-czk';
            
            case 'dkk':
            return 'CB85-dkk';
            
            case 'hkd':
            return 'CB85-hkd';
            
            case 'ils':
            return 'CB85-ils';
            
            case 'nzd':
            return 'CB85-nzd';
            
            case 'sar':
            return 'CB85-sar';
            
            case 'sek':
            return 'CB85-sek';
            
            case 'try':
            return 'CB85-try';
            
            case 'twd':
            return 'CB85-twd';
            
            case 'zar':
						return 'CB85-zar';
					} 
				})();

				countryFlag.classList.add(countryClass);
				currencySymbol.innerText = selectedCurrencySymbol;

				// Render
				$accountBar[0].querySelector('.CB85-left').appendChild(currencySelector);
	
				const currencyOpts = [...document.querySelector('#currency_chooser').options];

				// Create the dropdown options
				const countryFlags = [
					['AUD','CB85-AUD'],
					['GBP','CB85-GBP'],
					['EUR','CB85-EUR'],
          ['USD','CB85-USD'],
          ['AED','CB85-AED'],
          ['CAD','CB85-CAD'],
          ['CHF','CB85-CHF'],
          ['CNY','CB85-CNY'],
          ['CZK','CB85-CZK'],
          ['DKK','CB85-DKK'],
          ['HKD','CB85-HKD'],
          ['ILS','CB85-ILS'],
          ['NZD','CB85-NZD'],
          ['SAR','CB85-SAR'],
          ['SEK','CB85-SEK'],
          ['TRY','CB85-TRY'],
          ['TWD','CB85-TWD'],
          ['ZAR','CB85-ZAR'],
				];

				for (let i = 0; i < countryFlags.length; i++) {
					const flag = countryFlags[i];
					const currencySymbol = flag[0];
					const currencyName = flag[1];

					const option = document.createElement('a');
					option.href = 'javascript:void(0)';
					option.innerHTML = `
						<div class="CB85-dropList ${currencyName}">
							<div class="CB85-countryFlag"></div>
							<span>${currencySymbol}</span>
						</div>
					`;

					option.addEventListener('click', () => {
						const currencyChangeURL = currencyOpts[i].value;
						if (currencyChangeURL) {
							window.location.href = currencyChangeURL;
						}
					});

					currencyBox.appendChild(option);
				} 

				//show currency list on click
				currencySelector.addEventListener('click', () => {
					currencyBox.classList.toggle('cb85-currencyShowing');			
				});
			}
			currencyDropdown();


			/*--------------------------------------
			Add account & freephone
			---------------------------------------*/
			$accountBar.find('.CB85-left').append(`<a class="CB85-account" href="https://www.currentbody.com/customer/account/">My Account</a>`);
			$accountBar.find('.CB85-right').append(`<div class="CB85-desktopPhone">Freephone <span>0800 959 6565</span></div>`);
			
			/*--------------------------------------
			desktop USPS
			---------------------------------------*/

			function desktopUSPs(){
				var desktopUSPbar = $('<div class="container-fluid CB85-bottomrow"><div class="CB85-usp_bar"/></div>');
				desktopUSPbar.insertAfter('.uc-newnav-wrapfullwidth:last');

				$.each($USPS,function(){
					var uspName = this[0],
						uspText = this[1];
					
					var $USPdivs = $(`<div class="CB85-usp ${uspName}">
						<span>${uspText}</span>
						<div class="CB85-uspbreak">/</div>
					<div>`).appendTo('.CB85-usp_bar');
				});

				var trustpilotDesktop = $(`<div class="CB85-trustpilot-desktop"><img src="${$topImages.trustpilot}"/><span>Rated 9.6 out of 10</span><div>`);

				trustpilotDesktop.insertAfter('.CB85-usp_bar');
				
				$('.CB85-usp').hover(function(){
					utils.events.send('CB085 V2', 'Usp hover', 'CB085 V2 USP Hover', {
                        sendOnce: true
                    });
				});
				$('.CB85-usp').click(function(){
					utils.events.send('CB085 V2', 'Usp click', 'CB085 V2 USP Click', {
                        sendOnce: true
                    });
				});
		    }
			desktopUSPs();
			
		}
		
		if (isMobile) {
			mobileHeader();
		} else {
			UC.poller(['.menu_a_1', '.menu_b_1'], () => {
				desktopNav();
				desktopHeader();
				// Unhide header
				document.querySelector('.header-container').classList.remove('CB085_forceHide');
			});
		}



	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('CB085', 'Variation 2');
		UC.poller([
			'.header-container',
			'.quick-access.container-fluid .links.list-inline',
			'.topheader',
		], _activate);

	};

	// Run experiment
	_triggers();

})();
