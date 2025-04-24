/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '.product-specification .product-specification__item',
    '.email-sign-up',
    '.detail-page__right-column',
    '.product-ring-size',
    '.product-gallery__image-container img',
    () => {
        return !!window.Swiper;
    },
    () => {
        if(window.digitalData && window.digitalData.page.pageInfo.pageType === 'PDP' && window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Rings') {
            return true;
        }
    },
    () => {
        // make sure all the four c's exist
        const specs = document.querySelectorAll('.product-specification .product-specification__item');

        let numMatch = 0;
 
        for (let index = 0; index < specs.length; index += 1) {
            const element = specs[index];
            const specTitle = element.querySelector('.product-specification__info');
            if(specTitle) {
                if(specTitle.innerText.trim() === 'Diamond' || specTitle.innerText.trim() === 'Diamond colour' || specTitle.innerText.trim() === 'Stone shape' || specTitle.innerText.trim() === 'Diamond clarity') {
                    numMatch += 1;
                }
            }
        }
 
        if(numMatch === 4) {
            return true;
        } else {
            return false;
        }  
    }
], activate);
