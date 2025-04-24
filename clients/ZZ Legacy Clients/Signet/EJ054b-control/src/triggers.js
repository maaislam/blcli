/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock', '.product-name', '#basketForm', '.product-description__guides','.email-sign-up',
    () => {
        return !!window.digitalData.product[0].price.currentPrice;
    },
    () => {
        if(window.digitalData.product[0].price.currentPrice > 99.99) {
            return true;
        }
    },
    () => {
        return !!window.digitalData.page.category.subCategory1;
    },
    () => {
        if(window.digitalData.page.category.subCategory1 === 'Rings') {
            return true
        }
    },
    () => {
    // if not engagment ring
        let engagement = [];

        const engagementGuide = document.querySelectorAll('.product-description__guides li');
        for (let index = 0; index < engagementGuide.length; index += 1) {
            const element = engagementGuide[index];

            if(element.querySelector('.product-description__link').textContent.indexOf('Engagement Ring Guide') > -1){
                engagement = [];
                engagement.push('true');
                break;
            } else {
                engagement = [];
                engagement.push('false');
            }
        }    

        if(engagement.indexOf('false') > -1) {
            return true;
        }  
    },    
    
], 
activate);
