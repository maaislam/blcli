// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _BI002 = (function() {
	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		/*
			Cache elements
		*/
		var elements = (function() {
			var body = document.querySelector('main.app-body');
			var productDesc = document.querySelector('.product-content__description');
			var productImgs = document.querySelector('#product-carousel').parentElement.parentElement;
			var pressieReminder = productDesc.querySelector('.product-content__pressie-reminder');
			var pressieReminderLink = pressieReminder.querySelector('a[ng-click="pressieReminder()"]');

			return {
				body: body,
				productDesc: productDesc,
				productImgs: productImgs,
				pressieReminder: pressieReminder,
				pressieReminderLink: pressieReminderLink
			};
		}());


		/*
			Namespace CSS
		*/
		if (!elements.body.classList.contains('BI002')) {
			elements.body.className += ' BI002';
		}


		/*
			Only build info block if it don't already exist
		*/
		if (!document.querySelector('.BI002_info')) {
			/*
				Create USP component
			*/
			var createUSPComponent = function() {

				var usps = [
					'Add a gift messsage',
					'Deliver next day or plan ahead with nominated day delivery',
					'Select international delivery'
				];

				var container = document.createElement('div');
				container.className = 'BI002_info w-12-x w-12-l pos-relative b-a b-col-grey-60 p bg-col-w p-t-2 p-r-1-s p-r-1-m p-r-4-x p-r-2-l p-r-8 p-b-2 p-l-4-x p-l-2-l p-l-16 lh-14';
				container.innerHTML = `
					<div class="BI002_usp-block">
						<h3 class="m-b-4 fs-12 fs-11-s fs-11-l col-pink">sending your perfect gift</h3>
						<p class="col-grey-40 fs-09-s fs-09 lh-10">At the checkout, you'll have a chance to:</p>
						<div class="BI002_usps"></div>
						<div>
							<a class="col-pink" href="#" id="BI002_delivery-info-link">more delivery information</a>
						</div>
					</div>
				`;

				var createUSPList = (function() {
					var list = document.createElement('ul');

					var createListItem = function(text) {
						var li = document.createElement('li');
						li.innerHTML = `
							<span class="BI022_usp-icon"></span>
							<p class="col-grey-40 fs-09-s fs-09 lh-10">${text}</p>
						`;
						return li;
					};

					for (var i = 0; i < usps.length; i++) {
						list.appendChild(createListItem(usps[i]));
					}


					container.querySelector('.BI002_usps').appendChild(list);
				}());

				container.innerHTML += `
					<div class="BI002_pressie-reminder">
						<span class="BI002_pressie-reminder__icon"></span>
						<h3 class="m-b-4 fs-12 fs-11-s fs-11-l col-pink">pressie reminder service</h3>
						<p class="col-grey-40 fs-09-s fs-09 lh-10"> 
							Never forget a gift. Let us remind you with our <a class="col-pink" href="#" id="BI002_pressie-reminder">pressie reminder service</a>
						</p>
					</div>
				`;

				/*
					On click of delivery information link, simulate click on delivery
					tab and scroll page
				*/
				var deliveryLink = container.querySelector('#BI002_delivery-info-link');
				var deliveryTab = document.querySelector('[ng-click="setCurrent(\'delivery\')"]');
				var deliveryTabMobile = document.querySelector('[ng-click="showAccordion(\'delivery\')"]');

				utils.addEvent(deliveryLink, 'click', function(e) {
					e.preventDefault();
					utils.events.send('BI002', 'Click', 'Clicked more delivery information', {sendOnce: true});

					var element = window.innerWidth >= 520 ? deliveryTab : deliveryTabMobile;

					// Simulate click
					utils.eventFire(element, 'click');

					// Scroll
					var deliveryTop = JQSG(element).offset().top;
					JQSG('html, body').animate({
						scrollTop: deliveryTop-100
					}, 500);
				});

				/*
					Simulate clicks on old pressie reminder link
				*/
				var newPressieReminderLink = container.querySelector('#BI002_pressie-reminder');
				utils.addEvent(newPressieReminderLink, 'click', function(e) {
					e.preventDefault();
					utils.eventFire(elements.pressieReminderLink, 'click');
					utils.events.send('BI002', 'Click', 'Clicked pressie reminder', {sendOnce: true});
				});
				elements.uspBlock = container;
				return container;
			};
			var uspComponent = createUSPComponent();


			/*
				Append to DOM
			*/
			var pressieContainer = elements.pressieReminder.parentElement;
			pressieContainer.appendChild(uspComponent, elements.pressieReminder);
		}


		/*
			Create new social buttons element and replicate functionality 
			of existing buttons. Note: Unable to just move the existing
			buttons as the image container gets refreshed on quick view
			(which removes the social buttons)
		*/
		var socialButtons = (function() {
			// Don't do anything if new buttons still exist
			if (document.querySelector('.BI002_social')) return false;

			UC.poller(['.social-buttons'], function() {
				var socialLinks = document.getElementsByTagName('social-buttons')[0];
				elements.socialLinks = socialLinks;

				var createSocialComponent = function() {
					var container = document.createElement('div');
					container.className = 'BI002_social';

					var socialContext = document.createElement('div');
					socialContext.className = 'BI002_social__context c-10 m-t-10 m-b-4 fs-12 fs-11-s fs-11-l m-r-0 col-pink';
					socialContext.innerHTML = `
						Love what you see? <br>
						Tell a friend, a colleague, tell everyone!
					`;

					var newSocialLinks = document.createElement('div');
					newSocialLinks.className = 'BI002_social__links';
					newSocialLinks.innerHTML = `
						<social-buttons model="::product" factory-name="product" ng-if="!$root.isS &amp;&amp; !$root.isM"><div class="social-buttons"><ng-transclude></ng-transclude><!----><div ng-include="template"><!----><ul class="m-t-0 m-b fs-25 fs-20-s social-icons" ng-controller="SocialButtonsController" ng-if="factoryName == 'product'"><li class="inline-block m-r cursor-pointer social-icons__item" ng-click="share('facebook')"><span class="icon icon--facebook"></span></li><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="share('twitter')"><span class="icon icon--twitter"></span></li><!----><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="share('pinterest')"><span class="icon icon--pinterest"></span></li><!----><!----><li class="inline-block m-r cursor-pointer social-icons__item" ng-if="factoryName == 'product'" ng-click="shareByEmail()"><span class="icon icon--mail"></span></li><!----></ul><!----><!----></div></div></social-buttons>
					`;

					// Events
					var newSocialIcons = newSocialLinks.querySelectorAll('.social-icons__item');
					var oldSocialIcons = socialLinks.querySelectorAll('.social-icons__item');
					
					for (var i = 0; i < newSocialIcons.length; i++) {
						(function(newIcon, oldIcon) {
							utils.addEvent(newIcon, 'click', function() {
								utils.eventFire(oldIcon, 'click');
							});
						}(newSocialIcons[i], oldSocialIcons[i]));
					}

					container.appendChild(socialContext);
					container.appendChild(newSocialLinks);

					return container;
				};

				var productImgs = document.querySelector('#product-carousel').parentElement.parentElement;
				var productContainer = productImgs.parentElement;
				productContainer.className += ' BI002_product';
				productContainer.appendChild(createSocialComponent());
			});
		}());
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('BI002', 'Variation 1');

		UC.poller([
			'.product-content__description .product-content__pressie-reminder',
			'#product-carousel'
		], _activate);
	};


	// Run experiment
	_triggers();

})();