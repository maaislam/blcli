import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import UspComponent from './lib/usp-component';
import SocialButtons from './lib/social-buttons';

let $ = null;

const eventSender = utils.events.setDefaultCategory('BI013---Gifting-Made-Easy');

/**
 * Entry point for running app once polling conditions met
 */
const run = () => {
    // -----------------------------------------------------------
    // Setup
    // -----------------------------------------------------------
    document.body.classList.add('bi013');

    if(document.querySelector('.bi013_info')) {
        return;
    }
    
    // ---------------------------------------------
    // Reusable fixed elms
    // ---------------------------------------------
    const elements = (function() {
        const body = document.querySelector('main.app-body'),
            productDesc = document.querySelector('.product-content__description'),
            productImgs = document.querySelector('#product-carousel').parentElement.parentElement,
            pressieReminder = productDesc.querySelector('.product-content__pressie-reminder'),
            pressieReminderLink = pressieReminder.querySelector('a[ng-click="pressieReminder()"]');

        return {
            body: body,
            productDesc: productDesc,
            productImgs: productImgs,
            pressieReminder: pressieReminder,
            pressieReminderLink: pressieReminderLink
        };
    }());

    // ---------------------------------------------
    // Create usp component
    // ---------------------------------------------
    var uspComponent = UspComponent.create(elements);

    var pressieContainer = elements.pressieReminder.parentElement;
    pressieContainer.appendChild(uspComponent, elements.pressieReminder);
    
    // ---------------------------------------------
    // Handle social buttons
    // Note: Unable to just move the existing
	//		buttons as the image container gets refreshed on quick view
	//		(which removes the social buttons)
    // ---------------------------------------------
    SocialButtons.init();
        
    // ---------------------------------------------
    // Orientation change => refresh page
    // Workaround for DOM rebuliding
    // ---------------------------------------------
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    });
};

// -----------------------------------------------------------
// Poll elements required for *all* tests
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.JQSG,
    '.product-content__description .product-content__pressie-reminder',
    '#product-carousel'
], () => {
    utils.fullStory('BI013---Gifting-Made-Easy', 'Variant 1');

    $ = window.JQSG;

    run();
}); 
