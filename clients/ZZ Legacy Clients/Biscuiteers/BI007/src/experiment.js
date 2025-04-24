import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import reviews from './lib/reviews';

window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || {};

/**
 * Helper get normalised window path name
 */
const getPathName = () => window.location.pathname.replace(/\/$/, '');

// -----------------------------------------------------------
// Poll required elements
//
// - Path name must have an associated review
// -----------------------------------------------------------
let poller = UC.poller([
    '.product-content__pressie-reminder',
    () => {
        const pathName = getPathName();

        return typeof reviews[pathName] != 'undefined' && reviews[pathName].review;
    },
    () => !!window.JQSG
], () => {
    window.UC.experiments.BI007.run()
}); 

/**
 * BI007
 */
window.UC.experiments.BI007 = (() => {
    let $ = null;

    const eventSender = utils.events.setDefaultCategory('BI007---People-Reviews'),
        eventsSent = [];

    /**
     * Entry point for experiment, called every time sitegainer.newPage() is called
     */
    const run = () => {
        if(document.querySelector('main').classList.contains('bi007')) {
            return;
        }
        document.querySelector('main').classList.add('bi007');

        $ = JQSG;

        $('.bi7-person-review').remove(); // Prevent duplicate content sitegainer.newPage()

        if(eventsSent.indexOf('did-show-reviews-on-product-page') === -1) {
            eventsSent.push('did-show-reviews-on-product-page');
            eventSender.send(null, 'did-show-reviews-on-product-page', window.location.pathname);
        }

        buildReview();

    };

    /**
     * Build review on page
     */
    const buildReview = () => {
        const pathName = getPathName();

        const reviewText = reviews[pathName].review,
            reviewAvatar = reviews[pathName].avatar,
            reviewPerson = reviews[pathName].person;

        const pressieReminder = $('.product-content__pressie-reminder').parent('.pos-relative');
        pressieReminder.before(`
            <div class="bi7-person-review">
                <p class="bi7-person-review__small-heading">Congratulations, you've stumbled across...</p>
                <div class="bi7-person-review__content">
                    <div class="bi7-person-review__avatar">
                        <img src="${reviewAvatar}" />
                    </div>
                    <div class="bi7-person-review__text">
                        <h3>${reviewPerson}'s favourite biscuit</h3>
                        <p>${reviewText}</p>
                    </div>
                </div>
            </div>
        `);
    };

    // Return
    return {
        run: run
    };

})();
