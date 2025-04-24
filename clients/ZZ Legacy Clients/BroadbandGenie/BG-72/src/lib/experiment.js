/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import data from './data';
import { pollerLite } from '../../../../../lib/uc-lib';
import { observer, elementIsInView } from '../../../../../lib/utils';
import debounce from 'lodash/debounce';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Run label replacement
 */
const init = () => {
  const results = {};
        
  // ---
  // Initially move deal labels
  // ---
  [].forEach.call(document.querySelectorAll(`${ID}-deal-labels`), elm => elm.remove());

  // ---
  // Iterate over table deals
  // ---
  const table = document.querySelector('#js--deals');
  if(table) {
    const deals = table.querySelectorAll('.deal');
    [].forEach.call(deals, d => {

      const dealName = d.querySelector('.deal__name');
      if(dealName) {
        // ---
        // Clone and remove text that isn't relevant, so we can get actual deal name
        // ---
        const dealNameClone = dealName.cloneNode(true, true);

        [].forEach.call(dealNameClone.querySelectorAll('*'), elm => elm.remove());

        const dealNameText = dealNameClone.innerText.trim();

        // ---
        // Against deals, hold label store
        // ---
        if(!results[dealNameText]) {
          results[dealNameText] = [];
        }

        // ---
        // Flag exclusives
        // ---
        if(d.querySelector('.broadband-genie-exclusive')) {
          d.classList.add(`${ID}-has-exclusive`);

          results[dealNameText].push({
            className: 'exclusive',
            label: 'Broadband Genie Exclusive'
          });
        }

        // ---
        // Flag hardcoded labels
        // ---
        if(data[dealNameText]) {
          results[dealNameText].push({
            className: 'message',
            label: data[dealNameText],
          });
        }

        // ---
        // Flag Amazon labels
        // ---
        const amazonGift = d.querySelector('.roundel.amazon-gift');
        if(amazonGift) {
          const amazonGiftValue = amazonGift.innerText.trim();
          if(amazonGiftValue) {
            results[dealNameText].push({
              className: 'amazon',
              label: amazonGiftValue + ' Amazon.co.uk Giftcard'
            });
          }
        }
      }
    });

    [].forEach.call(deals, d => {
      const dealName = d.querySelector('.deal__name');
      if(dealName) {
        // ---
        // Get deal name
        // ---
        const dealNameClone = dealName.cloneNode(true, true);

        [].forEach.call(dealNameClone.querySelectorAll('*'), elm => elm.remove());

        const dealNameText = dealNameClone.innerText.trim();
      
        if(results[dealNameText]?.length) {
          // ---
          // Add grid class
          // ---
          if(!d.className.match(/special/)) {
            d.classList.add('-expiring-special');
          }

          // ---
          // Add a new full width row conforms to deal__exclusive
          // ---
          d.insertAdjacentHTML('afterbegin', `
            <td class="deal__special ${ID}-deal-labels">
              ${results[dealNameText].map(r => {
                return `<span class="${ID}-label ${ID}-label--${r.className}">${r.label}</span>`;
              }).join('')}
            </td>
          `);
        }
      }
    });

    // Track label clicks
    [].forEach.call(document.querySelectorAll(`.${ID}-label`), l => {
      l.addEventListener('click', e => {
        fireEvent('Click Label - ' + e.currentTarget.innerText.trim());
      });
    });
  }
};

/**
 * Entry point for running experiment
 */
export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
	document.body.addEventListener('click', e => {
    if(e.target.closest('.deal__go')) {
      const deal = e.target.closest('.deal');
      if(deal) {
        const dealName = deal.querySelector('.deal__name');

        const dealNameClone = dealName.cloneNode(true, true);
        [].forEach.call(dealNameClone.querySelectorAll('*'), elm => elm.remove());
        const dealNameText = dealNameClone.innerText.trim();

        if(dealNameText) {
          let eventLabel = 'Click Go Deal - ' + dealNameText;

          if(deal.querySelector(`.${ID}-deal-labels`)) {
            eventLabel += ' - Has Labels';
          }

          fireEvent(eventLabel);
        }
      }
    }
  });

	const element = document.querySelector('#js--deals');

  if(elementIsInView(element, false)) {
    fireEvent('In View - Deals List', true);
  }

  window.addEventListener('scroll', debounce(() => {
    if(elementIsInView(element, false)) {
      fireEvent('In View - Deals List', true);
    }
  }, 100));

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  init();
  
  observer.connect(document.querySelector('#js--deals'), () => {
    setTimeout(() => {
      init();
    }, 1000);
  }, {
    childList: true,
    attributes: false
  });
};
