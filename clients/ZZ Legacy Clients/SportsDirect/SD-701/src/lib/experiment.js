/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...

    const pagePath = location.pathname;

    if (pagePath === "/fitness-and-training" || pagePath === '/fitness-and-training/') {
        location.pathname = "/fitness-and-training/elevation";
    } else if (pagePath === "/fitness-and-training/elevation") {
        document.querySelector('.mainBody').addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('a') || target.closest('a')) {
                const path = target.getAttribute('href') || target.closest('a').getAttribute('href')
                fireEvent('Click on ' + path);
            }
        })
    }
};