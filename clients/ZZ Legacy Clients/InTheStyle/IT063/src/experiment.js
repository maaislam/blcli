import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ---------------------------------------------------------
// The most sane way of doing this (?) appears to be:
//
// - run test all the time across all pages
// - set a cookie for a non-logged-in user
// - when the user does log in, if the cookie exists, show lightbox
//
// This ensures that it only fires once and immediately after successful
// login, otherwise we'd have it firing on existing session (at point
// at which test goes live)
//
// ---------------------------------------------------------

// ---------------------------------------------------------
// Event sender
// ---------------------------------------------------------
const eventSender = utils.events.setDefaultCategory('IT063-checkout-merged-baskets');

/**
 * Entry point for experiment run
 */
const run = () => {
    utils.fullStory('IT063', 'Variation 1');

    document.body.classList.add('it063');

    /*
    *   Check if user is on the app, if so don't run the test.
    */
    const fromApp = utils.getUrlParameter('utm_medium');
    if (fromApp == 'app') {
        utils.setCookie('onAppUser', '1', 700);
    }
    const appUserCookie = utils.getCookie('onAppUser');
    if (fromApp == 'app' || appUserCookie == '1') {
        return
    }


    if(!isUserLoggedIn()) {
        utils.setCookie('it63-user-is-anonymous', '1', 700);
    } else {
        const cookieExists = utils.getCookie('it63-user-is-anonymous');
        if(cookieExists) {
            utils.deleteCookie('it63-user-is-anonymous');

            if(getBasketCount()) {
                showLightbox();

                eventSender.send(null, 'did-show-lightbox', '', {
                    sendOnce: true    
                });
            }
        }
    }

    // Attach any event handlers
    [].forEach.call(document.querySelectorAll('.it63-lightbox__close'), (item) => {
        item.addEventListener('click', () => {
            closeLightbox();
        });
    });
};

/**
 * Is user logged in?
 */
const isUserLoggedIn = () => {
    return !(document.querySelector('.header-customer-links a.login') || document.querySelector('.left-off-canvas-menu a.login'));
};

/**
 * Helper count basket items
 */
const getBasketCount = () => {
    const bagCountElm = document.querySelector('.header-bag .bag-count');
    if(bagCountElm) {
        return parseInt(bagCountElm.innerText);
    }

    return 0;
};

/**
 * Helper show lightbox
 */
const showLightbox = () => {
    const lightboxHtml = `
        <div class="it63-lightbox">
            <div class="it63-lightbox__content">
                <a class="it63-lightbox__close">✕</a>
                <p class="it63-text-center">
                    <strong>FYI Babe, we're merging your basket now that you're logged in!</strong>
                </p>
                <p class="it63-text-center">
                    <img class="it63-infographic" src="//d191y0yd6d0jy4.cloudfront.net/ugisni3zn47nnti.jpg">
                </p>
                <p class="it63-text-center">
                    You can edit your order in your basket too.
                </p>
                <p class="it63-text-center">
                    <a href="/checkout/onepage" ${window.location.pathname.match(/checkout\/onepage/i) ? 'onclick="window.IT063.closeLightbox(); return false;' : ''}" class="it63-btn">Continue</a>
                </p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', lightboxHtml);
};

/**
 * Helper hide lightbox
 */
const closeLightbox = () => {
    const lightbox = document.querySelector('.it63-lightbox');
    if(lightbox) {
        lightbox.remove();
    }
};

// ----------------------------------------
// Helpers
// ----------------------------------------
window.IT063 = {
    showLightbox: showLightbox,
    closeLightbox: closeLightbox
};

// ----------------------------------------
// Run on script execution
// ----------------------------------------
run();
