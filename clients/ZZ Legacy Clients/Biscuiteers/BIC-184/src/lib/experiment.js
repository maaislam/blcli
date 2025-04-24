/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { logMessage, pollerLite, observer, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
let currHref = window.location.href;
let firstRun = true;

const makePageChanges = () => {

	firstRun = false;

	let cornerPeelHTML = `

		<div class="${ID}-newsletter-box" id="${ID}-newsletter-box">

			<div class="${ID}-section-close"> <a href="#" id="${ID}-section-close" class="${ID}-section-close-link"> <svg height='23px' width='23px' fill="#D7729B" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#D7729B" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>

			<h2> 10% off <br>your first order </h2>

			<p> Sign up to get exclusive offers and biscuit news </p>

			<div class="${ID}-newsletter-holder">



			</div>

			<div class="${ID}-biscloveoffer">

				<p> Thanks! Use code <span class="${ID}-offercode">BISC<span class="ten">10</span>LOVE</span> to redeem your offer </p>

			</div>

			<p class="tsandcs"> Discount subject to <a href="/boring-old-ts-and-cs">terms &amp conditions</a>. By signing up, you are accepting our terms and conditions and our <a href="/privacy-policy">privacy policy</a> and <a href="/cookie-policy">cookie policy</a>

		</div>


		

	`;

	addPoller(['footer newsletter-form'], (e) => {

		let timeout = setTimeout(() => {

			let eventMessage = "Conditions Met - page altered after 10s to show newsletter corner peel";
			logMessage(eventMessage);
			fireEvent(eventMessage);

			let insertionPoint = document.body;

			insertionPoint.insertAdjacentHTML('beforeend', cornerPeelHTML);

			if(!document.querySelector(`.${ID}-newsletter-inner form`)) {

				let newsletterHTML = `
					<newsletter-form id="${ID}-cornerpeel-form">

						
						<form class="p-t-6 p-r-4-x p-b p-l-4-x ng-pristine ng-valid-email ng-invalid ng-invalid-required" name="newsletter_form_uc" ng-submit="vm.submit(newsletter_form_uc)" novalidate="">
							<div class="flex flex-middle flex-wrap-s flex-justify-center-s">
								<div class="w-6-x w-5 w-10-s p-l-3-s p-r-3-s m-t-4-s form-small pos-relative ${ID}-newsletter-inner">
									<div class="flex">
										<input class="m-r-1 b-w-1-i input placeholder placeholder-col-12 ng-pristine ng-empty ng-valid-email ng-invalid ng-invalid-required ng-touched" type="email" name="email" ng-attr-placeholder="{{::vm.app.data.general.newsletter_placeholder}}" ng-model="vm.data.email" ng-enter="submit(newsletter_form)" required="" placeholder="pop your email here">
										<action class="p-r-1 p-l-1 b-radius-0 button" status="::vm.status" ng-click="vm.submit(newsletter_form)" role="button" tabindex="0">
											<span class="c-busy"><span class="bounce1"></span><span class="bounce2"></span></span><span class="icon icon-success c-success"></span><span class="icon icon-failure c-error"></span>
											<ng-transclude class="c-body"><span ng-bind="::vm.app.data.general.newsletter_button_text"><svg class=\"${ID}-newsletter-svg\" width=\"15px\" height=\"15px\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 129 129\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" enable-background=\"new 0 0 129 129\"><g><path d=\"m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z\"/></g></svg></span></ng-transclude>
										</action>
									</div>
									<field-notice class="pos-relative fs-3 ng-hide" field="email" form="newsletter_form"></field-notice>
									<result class="fs-3 col-11 ng-hide" status="::vm.status" success="<span style=&quot;color:#16A085&quot;>Thanks! You can unsubscribe at any time.</span>"></result>
								</div>
							</div>
							<div class="m-t-6 m-t-4-l fs-3 ta-center">
								<div class="ta-center lh-1 w-9-s" ng-init="vm.more = false" ng-bind-html="::vm.app.data.general.newsletter_policy_text">By signing up, you are accepting our terms and conditions and our <a class="link" href="/privacy-policy" target="_blank">privacy policy</a> and <a class="link" href="/cookie-policy" target="_blank">cookie policy</a>.</div>
								<!---->
								<div class="m-t-2 m-t-4-s" ng-if="!vm.more"><span class="fs-4 button-3 bg-col-t col-b" ng-click="vm.more = true" ng-bind="::'find out more' | ms">find out more</span></div>
								<!----><!---->
							</div>
						</form>
					</newsletter-form>
				`; 

				document.querySelector(`.${ID}-newsletter-holder`).insertAdjacentHTML('afterbegin', newsletterHTML);

				tco.get('app')
				.$compile(
				  angular.element(document.getElementById(`${ID}-cornerpeel-form`))
				)(
					angular.element(document.body).data()['$bodyController'].$scope
				);

				setTimeout(() => {

					let newsletterForm = document.getElementById(`${ID}-cornerpeel-form`);

					newsletterForm.querySelector('div[ng-bind="::vm.app.data.general.newsletter_text"]').remove();
					newsletterForm.querySelector('.m-t-6.m-t-4-l.fs-3.ta-center').remove();
					newsletterForm.querySelector('.pos-relative').classList = `${ID}-newsletter-inner`;
					newsletterForm.querySelector('span[ng-bind="::vm.app.data.general.newsletter_button_text"]').innerHTML = `<svg class=\"${ID}-newsletter-svg\" width=\"15px\" height=\"15px\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 129 129\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" enable-background=\"new 0 0 129 129\"><g><path d=\"m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z\"/></g></svg>`;
					newsletterForm.querySelector('form').name = 'newsletter_form_uc';
					newsletterForm.setAttribute('id', `${ID}-newsletter-form-component`);
					
					let newNewsletterBox = document.getElementById(`${ID}-newsletter-box`);
					

					let newsletterInput = document.querySelector('form[name="newsletter_form_uc"] input[name="email"]');
					let newsletterClose = document.querySelector(`#${ID}-section-close`);

					let fireMessage = true;

					let newsletterInputEvent = newsletterInput.addEventListener('click', (e) => {

						if(fireMessage == true) {
							let clickMessage = "Click - input form interacted with";
							logMessage(clickMessage);
							fireEvent(clickMessage);

							fireMessage = false;
						}

					});

					let newsletterCloseBoxEvent = newsletterClose.addEventListener('click', (e) => {

						newNewsletterBox.remove();
						setCookie(`${ID}-noshow`, true);

					});

				}, 1);
			}

			

			currHref = window.location.href;

			addPoller([`.${ID}-newsletter-inner`], () => {

				// Trigger re render on pagniation change
				const result = document.querySelector(`.${ID}-newsletter-inner result`);

				addObserver(result, () => {

					if(result.classList.contains('success')) {
						document.querySelector(`.${ID}-newsletter-holder`).classList.add('disabled');
						document.querySelector(`.${ID}-biscloveoffer`).classList.add('active');
						document.querySelector(`.${ID}-newsletter-holder`).previousElementSibling.remove();
					} 
	
				}, {
					throttle: 50,
					config: {
					  attributes: true,
					  childList: true,
					  subtree: true
					}
				});

			});

			

		}, 10000);

		

	});

	

}

export default () => {
	setup();

	logMessage(ID + " Variation: "+VARIATION);

	if(VARIATION == 1) {

		if(getCookie(`${ID}-noshow`)) {

			let noShowMessage = 'Conditions Met - user already saw and closed popup';
			logMessage(noShowMessage);
			fireEvent(noShowMessage);

		} else {

			if(firstRun == true) {
				makePageChanges();
			}

		}

		

	} else if (VARIATION == 2) {

		let eventMessage = 'Conditions Met - page not changed';
		logMessage(eventMessage);
		fireEvent(eventMessage);

	}

  
  
};
