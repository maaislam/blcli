/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
events.analyticsReference = '_gaUAT';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	events.analyticsReference = window.ga ? 'ga' : '_gaUAT';
	setup();

	fireEvent('Conditions Met');

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == 'control') {
		if (location.pathname.includes('/checkoutsp')) {
			var activeStep = 0;
			var shownStatus = false;
			const checkCheckoutStepAndFireEvent = () => {
				if (document.querySelector('.sectionWrap .welcomeSection.activeSection') && activeStep != 1) {
					fireEvent('User reached to My Details Step of checkout');
					activeStep = 1;
				} else if (document.querySelector('.sectionWrap .deliverySection.activeSection')) {
					if (activeStep != 2) {
						activeStep = 2;
						fireEvent('User reached to Delivery Step of checkout');
						document.querySelector('.sectionWrap .deliverySection.activeSection').addEventListener('click', (e) => {
							const target = e.target;
							if (target.closest('a.changeLink') && target.closest('a.changeLink').textContent.includes('address manually')) {
								fireEvent('User clicked on Enter address manually');
							} else if (target.closest('a.changeLink') && target.closest('a.changeLink').textContent.includes('location')) {
								fireEvent('User clicked on change location');
							}
						});
					}
					const input = document.querySelector('.sectionWrap .deliverySection.activeSection #frmAddress .formWrap .form-group input#line1');
					if (input && input.getAttribute('placeholder').includes('postcode') && !shownStatus) {
						fireEvent('User would have seen the changes');
						shownStatus = true;
					}
				} else if (document.querySelector('.sectionWrap .paymentSection.activeSection') && activeStep != 3) {
					activeStep = 3;
					fireEvent('User reached to Payment Step of checkout');
				} else if (document.querySelector('.sectionWrap .confirmationSection.activeSection') && activeStep != 4) {
					activeStep = 4;
					fireEvent('User reached to Order Confirmation Step of checkout');
				}
			};

			pollerLite(['.sectionWrap .activeSection'], () => {
				checkCheckoutStepAndFireEvent();
				const target = document.querySelector('.leftMain .sectionWrap');

				const Observer = new MutationObserver((mutationList, observer) => {
					checkCheckoutStepAndFireEvent();
				});
				Observer.observe(target, {
					childList: true,
					subtree: true,
					attributes: true
				});
			});
		}
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if (location.pathname.includes('/checkoutsp')) {
		var activeStep = 0;
		var shownStatus = false;
		const checkCheckoutStepAndFireEvent = () => {
			if (document.querySelector('.sectionWrap .welcomeSection.activeSection') && activeStep != 1) {
				activeStep = 1;
				fireEvent('User reached to My Details Step of checkout');
			} else if (document.querySelector('.sectionWrap .deliverySection.activeSection')) {
				
				const container = document.querySelector('.sectionWrap .deliverySection.activeSection');
				const input = document.querySelector('.sectionWrap .deliverySection.activeSection #frmAddress .formWrap .form-group input#line1');
				const towncity = document.querySelector('.sectionWrap .deliverySection.activeSection #frmAddress .formWrap .form-group input#towncity');
				const postcode = document.querySelector('.sectionWrap .deliverySection.activeSection #frmAddress .formWrap .form-group input#postcode');

				if (activeStep != 2) {
					activeStep = 2;
					fireEvent('User reached to Delivery Step of checkout');
					document.querySelector('.sectionWrap .deliverySection.activeSection').addEventListener('click', (e) => {
						const target = e.target;
						if (target.closest('a.changeLink') && target.closest('a.changeLink').textContent.includes('address manually')) {
							fireEvent('User clicked on Enter address manually');
							console.log("addr manually clicked");
							container.classList.remove('hideItems');
							//input.closest('.form-group').querySelector('label').textContent = 'Address Search';


						} else if (target.closest('a.changeLink') && target.closest('a.changeLink').textContent.includes('Address Finder')) {
							fireEvent('User clicked on Find address using postcode');
							console.log("address finder clicked");
							container.classList.add('hideItems');
							//input.closest('.form-group').querySelector('label').textContent = 'Address Line 1';


						} else if (target.closest('a.changeLink') && target.closest('a.changeLink').textContent.includes('location')) {
							fireEvent('User clicked on change location');
						}
					});
				}


				if (input && input.getAttribute('placeholder').includes('postcode') && !shownStatus) {
					fireEvent('User sees the changes');
					shownStatus = true;
				}
				if (input && input.getAttribute('placeholder').includes('postcode') && !(postcode.value != '' || towncity.value != '')) {
					console.log("other one");
					container.classList.add('hideItems');
					input.closest('.form-group').querySelector('label').textContent = 'Address Search';
				} else if (input) {
					container.classList.remove('hideItems');
					input.closest('.form-group').querySelector('label').textContent = 'Address line 1';
					if (input.getAttribute('placeholder').includes('postcode')) {
						input.parentNode.querySelector('a.changeLink').textContent = 'Enter address manually';
					} else {
						input.parentNode.querySelector('a.changeLink').textContent = 'Use Address Finder';
					}
				}
			} else if (document.querySelector('.sectionWrap .paymentSection.activeSection') && activeStep != 3) {
				activeStep = 3;
				fireEvent('User reached to Payment Step of checkout');
			} else if (document.querySelector('.sectionWrap .confirmationSection.activeSection') && activeStep != 4) {
				activeStep = 4;
				fireEvent('User reached to Order Confirmation Step of checkout');
			}
		};

		pollerLite(['.sectionWrap .activeSection'], () => {
			checkCheckoutStepAndFireEvent();
			const target = document.querySelector('.leftMain .sectionWrap');

			const Observer = new MutationObserver((mutationList, observer) => {
				observer.disconnect();
				checkCheckoutStepAndFireEvent();
				observer.observe(target, {
					childList: true,
					subtree: true,
					attributes: true
				});
			});
			Observer.observe(target, {
				childList: true,
				subtree: true,
				attributes: true
			});
		});
	}
};
