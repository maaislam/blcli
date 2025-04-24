/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup, getPageData } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, logMessage } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

const checkSizes = () => {

	let allSizesArray = [].slice.call(document.querySelectorAll('#ulSizes li'));
	let sizeHolder = document.getElementById('divSize');
	let sizeGuideHolder = document.getElementById('divPopupSizeGuide');
	let atbHolder = document.querySelector('.BasketWishContainer');

	if(allSizesArray.length == 1) {


		let sizeText = allSizesArray[0].getAttribute('data-text');
	
		if(sizeText == "One Size") {
			sizeHolder.classList.add('sizes-hidden');
			sizeGuideHolder.classList.add('sizes-hidden');
			atbHolder.classList.add('sizes-hidden-atb');
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}

}

export default () => {
	setup();

	const { ID, VARIATION } = settings;

	logMessage("HOF-112");


	pollerLite([
    () => {
      return window?.DY?.ServerUtil?.getProductsData;
    },
    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

		let pageData = getPageData();
		
		logMessage(pageData);

      	if(pageData.productBrand.toLowerCase() != "chanel") {

			let sizeCheck = checkSizes();

			if(sizeCheck == true) {
				logMessage('sizecheck true - hidden');
				events.send(ID, `${settings.ID} Variation 1`, 'size sections hidden as only 1 size detected and it was one-size');
			} else {
				logMessage('sizecheck false - left visible')
				events.send(ID, `${settings.ID} Variation 1`, 'size sections left visible');
			}
		} else {

			logMessage("chanel product - skipped");

			events.send(ID, `${settings.ID} Variation 1`, 'chanel product, experiment not run');
			return false;
		}

    });


	

  

};

