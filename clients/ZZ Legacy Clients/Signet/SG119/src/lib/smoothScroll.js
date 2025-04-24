/**
 * Smooth scroll on clicked elements
 */

import scrollToElement from "./services";
import shared from "./shared"

export default () => {

    const { ID } = shared;

    const learnMore = document.querySelector(`.${ID}-introText .${ID}-button.${ID}-white`);
    const description = document.querySelector(`.${ID}-section.${ID}-description`);
    learnMore.addEventListener('click', () => {
        scrollToElement(description);
    });

    const shopNowEl = document.querySelector(`.${ID}-introText .${ID}-button.${ID}-whiteBorder`);
    const ecomSection = document.querySelector(`.${ID}-section.${ID}-ecom`);
    shopNowEl.addEventListener('click', () => {
        scrollToElement(ecomSection);
    });

    const reviewAnchor = document.querySelector('.product-customer-rating-summary__text');
    if(reviewAnchor) {
        const reviewSection = document.querySelector(`.${ID}-section.${ID}-reviews`);
        reviewAnchor.addEventListener('click', () => {
            scrollToElement(reviewSection);
        });
    }


    /** Scroll Effects */
    const addApi = () => {
        var tag = document.createElement('script');
        tag.className = `SGanimation`;
        tag.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    const runScript = () => {
        const script = document.querySelector('.SGanimation');
        script.addEventListener('load', function() {
            AOS.init();
        });
    }

    addApi();
    runScript();

   

    

}