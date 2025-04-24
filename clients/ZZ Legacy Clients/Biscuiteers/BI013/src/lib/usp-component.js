import * as UC from '../../../../../lib/uc-lib';
import * as utils from '../../../../../lib/utils';

/**
 * USP Component Creator
 *
 * Amended from BI002
 */
const UspComponent = {
    create(elements) {
        var container = document.createElement('div');
        container.className = 'bi013_info w-12-x w-12-l pos-relative b-a b-col-grey-60 p bg-col-w p-t-2 p-r-1-s p-r-1-m p-r-4-x p-r-2-l p-r-8 p-b-2 p-l-4-x p-l-2-l p-l-16 lh-14';
        container.innerHTML = `
            <div class="bi013_usp-block">
                <h3 class="m-b-4 fs-12 fs-11-s fs-11-l col-pink">gifting made easy</h3>
                <p class="col-grey-40 fs-09-s fs-09 lh-10 italic">All of our biscuits will have at least 1 month’s shelf life from the moment they leave our kitchens for delivery</p>
                <div class="bi013_usps">
                    <ul>
                        <li>
                            <span class="BI013_usp-icon BI013_usp-icon--basket"></span>
                            <p class="col-grey-40 fs-09-s fs-09 lh-10">choose your pressie</p>
                        </li>
                        <li>
                            <span class="BI013_usp-icon BI013_usp-icon--globe"></span>
                            <p class="col-grey-40 fs-09-s fs-09 lh-10">send anywhere in the world, inc. UK, USA & Australia</p>
                        </li>
                        <li>
                            <span class="BI013_usp-icon BI013_usp-icon--calendar"></span>
                            <p class="col-grey-40 fs-09-s fs-09 lh-10">choose delivery date - next day or months ahead! Delivery 7 days/week</p>
                        </li>
                        <li>
                            <span class="BI013_usp-icon BI013_usp-icon--note"></span>
                            <p class="col-grey-40 fs-09-s fs-09 lh-10">add a gift message for the lucky recipient</p>
                        </li>
                        <li>
                            <span class="BI013_usp-icon BI013_usp-icon--payment"></span>
                            <p class="col-grey-40 fs-09-s fs-09 lh-10">place order, then sit back and wait for the compliments!</p>
                        </li>
                    </ul>
                </div>

                <p class="bi013_disclaimer">
                  Only single item orders of our letterbox biscuits can be posted through the letterbox. 
                  All larger items and multiple orders will require a signature.
                </p>
            </div>
        `;

        /**
         * Pressie reminder HTML
         */
        container.innerHTML += `
            <div class="bi013_pressie-reminder">
                <span class="bi013_pressie-reminder__icon"></span>
                <h3 class="m-b-4 fs-12 fs-11-s fs-11-l col-pink">pressie reminder service</h3>
                <p class="col-grey-40 fs-09-s fs-09 lh-10"> 
                    Never forget a gift. Let us remind you with our <a class="col-pink" href="#" id="bi013_pressie-reminder">pressie reminder service</a>
                </p>
            </div>
        `;

        /*
            Simulate clicks on old pressie reminder link
        */
        var newPressieReminderLink = container.querySelector('#bi013_pressie-reminder');
        utils.addEvent(newPressieReminderLink, 'click', function(e) {
            e.preventDefault();
            utils.eventFire(elements.pressieReminderLink, 'click');
            utils.events.send('bi013', 'Click', 'Clicked pressie reminder', {sendOnce: true});
        });
        return container;
    }
};

export default UspComponent;
