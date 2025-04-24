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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
    const data = {
        '1': {
            title: 'With your local optician or audiologist',
        },
        '2': {
            title: 'Caring for your eyes and ears within the local community',
        },
        '3': {
            title: 'With your local opticians, audiologists and retailers',
        },
        '4': {
            title: 'Prefer to shop at local businesses? We’ve got 850 nationwide',
        },
    };
    pollerLite(['section.bg-mono-light'], () => {
        const btn1 = document.querySelector('section.bg-mono-light .cta-btn-set .cta-btn:first-child');
        const btn2 = document.querySelector('section.bg-mono-light .cta-btn-set .cta-btn:last-child');
        if (btn1) {
            btn1.addEventListener('click', () => {
                fireEvent(`Click CTA - ${btn1.innerText.trim()}`)
            })
        }
        if (btn2) {
            btn2.addEventListener('click', () => {
                fireEvent(`Click CTA - ${btn2.innerText.trim()}`)
            })
        }
    })
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
        return;
    }
    document.body.classList.add(`${ID}`)
    pollerLite(['section.bg-mono-light'], () => {
            const heading = document.querySelector('section.bg-mono-light h1')
            if (heading) {
                heading.insertAdjacentHTML('afterend', `<p class="local-store-ref">${data[VARIATION]['title']}</p>`)
            }
        })
        // -----------------------------
        // Write experiment code here
        // -----------------------------
        // ...
};