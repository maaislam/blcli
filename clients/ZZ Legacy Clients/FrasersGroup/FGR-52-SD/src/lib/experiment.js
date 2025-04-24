/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, pollerLite } from '../../../../../lib/utils';

const { ID } = shared;

export default () => {

	events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

	setup();

	fireEvent('Conditions Met');

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	var activeStep = 0;

	const checkCheckoutStepAndFireEvent = () => {
		if (document.querySelector('.sectionWrap .welcomeSection.activeSection') && activeStep != 1) {
			fireEvent('User reached to checkout page My Details Step');

			pollerLite(['.sectionWrap .welcomeSection.activeSection'], () => {
				let myDetailsSubmitButton = document.querySelector(`.sectionWrap .welcomeSection.activeSection button[type="submit"]`);
				myDetailsSubmitButton?.addEventListener('click', () => {
					if (myDetailsSubmitButton.closest('.welcomeSection.activeSection').querySelector('.errorMessage').innerText == 'Please enter valid email address') {
						fireEvent('Invalid Email entered by user in My Details step of checkout');
					}
				});
			});

			activeStep = 1;
		} else if (document.querySelector('.sectionWrap .deliverySection.activeSection') && activeStep != 2) {
			activeStep = 2;
			fireEvent('User completed my details step of checkout', true);

			fireEvent('User reached to Delivery Step of checkout');

			pollerLite(['.sectionWrap .deliverySection.activeSection'], () => {
				const target = document.querySelector('.sectionWrap .deliverySection.activeSection');

				const Observer = new MutationObserver((mutationList) => {
					mutationList.forEach((mutation) => {
						if (mutation.type == 'childList' && (mutation.target.closest('.form-group')?.querySelector('#postcode') || mutation.target.closest('.form-group')?.querySelector('#line1'))) {
							setTimeout(() => {
								const addressErrorDom = document.querySelector('#line1')?.closest('.form-group')?.querySelector('.errorMessage');

								const postCodeErrorDom = document.querySelector('#postcode')?.closest('.form-group')?.querySelector('.errorMessage');

								if (!addressErrorDom.innerText == '' && addressErrorDom.closest('.formIncomplete')) {
									fireEvent('Invalid address entered by user in Delivery step of checkout');
								}
								if (postCodeErrorDom.innerText == 'Invalid postal code for address' && postCodeErrorDom.closest('.formIncomplete')) {
									fireEvent('Invalid postal code for address entered by user in Delivery step of checkout');
								}
							}, 500);
						}
					});
				});
				Observer.observe(target, {
					childList: true,
					subtree: true,
					attributes: true
				});
			});
		} else if (document.querySelector('.sectionWrap .paymentSection.activeSection') && activeStep != 3) {
			activeStep = 3;

			const selectedDeliveryOptions = document.querySelectorAll('.deliverySection.completedSection .progressContainer');
			let selectedDeliveryOptionsText = {};
			if (selectedDeliveryOptions.length > 0) {
				selectedDeliveryOptions.forEach((option) => {
					let title = option.querySelector('.progressTitle .progressTitleTop').innerText.trim();

					if (title.toLowerCase() !== 'delivery address') {
						let value = option.querySelector('.progressTitle .progressTitleSub') ? option.querySelector('.progressTitle .progressTitleSub').innerText.trim() : option.querySelector('.progressTitle .progressTitleSubundefined').childNodes[0].nodeValue.trim();

						selectedDeliveryOptionsText[`${title}`] = `${value}`;
					}
				});
			}
			fireEvent(`User completed Delivery step of checkout with Options: ${JSON.stringify(selectedDeliveryOptionsText)}`, true);

			fireEvent('User reached to Payment Step of checkout');

			let paymentSection = document.querySelector('.sectionWrap .paymentSection.activeSection');
			let currentSelection = document.querySelector('.sectionWrap .paymentSection.activeSection li.selectedRadioGroup');
			if (currentSelection) {
				let title = currentSelection.querySelector('.selectionDescription h3').innerText.trim();
				fireEvent(`User selected ${title} for payment`);
			}
			paymentSection?.addEventListener('click', (e) => {
				let target = e.target;
				if (target.closest('.paymentHeader') && !target.closest('li').classList.contains('selectedRadioGroup')) {
					let title = target.closest('li').querySelector('.selectionDescription h3').innerText.trim();
					fireEvent(`User selected ${title} for payment`);
				}
			});
		} else if (document.querySelector('.sectionWrap .confirmationSection.activeSection') && activeStep != 4) {
			activeStep = 4;
			fireEvent('User Completed Payment Step of checkout');
			fireEvent('User reached to Order Confirmation Step of checkout');
		}
	};

	pollerLite(['.sectionWrap .activeSection'], () => {
		checkCheckoutStepAndFireEvent();
		const target = document.querySelector('.leftMain .sectionWrap');

		const Observer = new MutationObserver(() => {
			checkCheckoutStepAndFireEvent();
		});
		Observer.observe(target, {
			childList: true,
			subtree: true,
			attributes: true
		});
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == 'control') {
		return;
	}

	// Write experiment code here
	// ...

	pollerLite(['footer'], () => {
		let footer = document.querySelector('footer');
		footer.classList.add(`${ID}-hidden`);
		fireEvent(`Interaction - footer hidden`, true);
	});
};
