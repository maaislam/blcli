/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const addTracking = () => {
	if (window.location.href.indexOf('/results') == -1) {
		pollerLite(['.hero-banner__button'], () => {
			let continueButton = document.querySelector('.hero-banner__button');
			continueButton.addEventListener('click', () => {
				fireEvent(`Click - User clicks the calculate now CTA`, true);
			});
		});
	}
	pollerLite([`#er-calculator button[type='submit']`], () => {
		const calculateWrapper = document.querySelector('#er-calculator');
		let oldHref = document.location.href;
		const submitForm = () => {
			let calculateButton = calculateWrapper?.querySelector(`button[type='submit']`);
			let timeout;
			const clickHandler = () => {
				clearTimeout(timeout);
				fireEvent('Click - User clicks the calculate button', true);
				timeout = setTimeout(() => {
					if (document.querySelectorAll(`.form__message.form__message--error`).length == 0 && window.location.href.indexOf('/results') > -1) {
						fireEvent(`Interaction - User successfully submits the form`, true);
						calculateButton?.removeEventListener('click', clickHandler);
					}
				}, 2000);
			};
			calculateButton?.addEventListener('click', clickHandler);
		};
		submitForm();

		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function () {
				if (oldHref != document.location.href) {
					oldHref = document.location.href;
					submitForm();
				}
			});
		});
		observer.observe(calculateWrapper, {
			attributes: false,
			childList: true,
			subtree: false
		});
	});

	pollerLite([`input.form__field`], () => {
		document.querySelectorAll('input.form__field').forEach((ele) =>
			ele.addEventListener('click', (e) => {
				fireEvent(`Click - User clicks the form field: ${e.target.id}`);
			})
		);
	});
};

export default () => {
	setup();

	fireEvent('Conditions Met');

	// Needed for attribution to Adobe Dynamics - do not remove
	document.documentElement.classList.add(`experimentation-${VARIATION == 'control' ? `control` : `variant-${VARIATION}`}`);

	

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if ((window.location.href.indexOf('https://www.keyadvice.co.uk/campaigns/equity-release-calculator-ppc') > -1 
	|| window.location.href.indexOf('https://www.keyadvice.co.uk/campaigns/key-equity-release-calculator-ppc') > -1 
	|| window.location.href.indexOf('https://www.keyadvice.co.uk/campaigns/equity-release-calculator-fb') > -1 
	|| window.location.href.indexOf('https://www.keyadvice.co.uk/equity-release/calculator') > -1) && VARIATION == 1) {
		
		fireEvent('Redirect - user is redirected to the calculator page', true);
		window.location.href = 'https://www.keyadvice.co.uk/campaigns/calculator';

	}

	if (window.location.href.indexOf('https://www.keyadvice.co.uk/campaigns/calculator') > -1) {
		addTracking();
	}
};
