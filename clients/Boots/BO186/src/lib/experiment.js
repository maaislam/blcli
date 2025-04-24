/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
// import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { insertAfterElement } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem(`${ID}`) !== 'Fired') {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, 'Fired');
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION === 'control') {
    // Tracking Start
    const { body } = document;

    const mutationObserver = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.addedNodes.length !== 0 &&
          entry.addedNodes[0].nodeName === 'DIV' &&
          entry.target.nodeName === 'DIV' &&
          entry.addedNodes[0].querySelectorAll('.modal-content').length > 0 &&
          entry.addedNodes[0].querySelectorAll('[data-eventaction="Click order using NHS login"]')
            .length > 0
        ) {
          const modalBody = entry.addedNodes[0].querySelector('.modal-body');
          const elements = modalBody.querySelectorAll('.modal-body > *');
          const nhsButton = elements[1].querySelector('button');
          const linkageKeyButton = elements[3].querySelector('button');
          const bootsButton = elements[6];

          fireEvent('Viewed Popup');

          nhsButton.addEventListener('click', () => {
            fireEvent('Order using NHS button clicked');
          });

          linkageKeyButton.addEventListener('click', () => {
            fireEvent('Order using Linkage Key button clicked');
          });

          bootsButton.addEventListener('click', () => {
            fireEvent('Order perscription Boots button clicked');
          });
        }
      });
    });

    mutationObserver.observe(body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    // Tracking End
  } else {
    const { body } = document;

    const mutationObserver = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.addedNodes.length !== 0 &&
          entry.addedNodes[0].nodeName === 'DIV' &&
          entry.target.nodeName === 'DIV' &&
          entry.addedNodes[0].querySelectorAll('.modal-content').length > 0 &&
          entry.addedNodes[0].querySelectorAll('[data-eventaction="Click order using NHS login"]')
            .length > 0
        ) {
          const modalContent = entry.addedNodes[0].querySelector('.modal-content');
          const modalHeader = entry.addedNodes[0].querySelector('.modal-header');
          const modalBody = entry.addedNodes[0].querySelector('.modal-body');
          const modalClose = modalHeader.querySelector('button');
          const elements = modalBody.querySelectorAll('.modal-body > *');

          modalBody.querySelector('#nhs-description').remove();
          elements.forEach((el, idx) => {
            if (idx === 2 || idx === 3 || idx === 4) {
              el.remove();
            }
          });

          const modalCloseImage = window.btoa(
            '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="42.3553" width="50" height="2" transform="rotate(-45 7 42.3553)" fill="#012169"/><rect x="42.3553" y="43.7696" width="50" height="2" transform="rotate(-135 42.3553 43.7696)" fill="#012169"/></svg>'
          );

          modalClose.style.background = `url(data:image/svg+xml;base64,${modalCloseImage})`;
          modalClose.style.width = '30px';
          modalClose.style.height = '30px';
          modalClose.style.backgroundSize = '100%';
          modalClose.style.backgroundRepeat = 'no-repeat';
          modalClose.style.cursor = 'pointer';
          modalContent.style.maxWidth = '400px';
          modalHeader.style.marginBottom = '-32px';
          modalHeader.style.zIndex = '1';

          const heading = elements[0];
          heading.innerText = 'How would you like to order?';
          heading.style.color = '#000';
          heading.style.fontWeight = '700';
          heading.style.paddingRight = '35px';

          const mediaQuery = window.matchMedia('(min-width: 720px)');

          const mediaQueryCallback = (e) => {
            if (e.matches) {
              heading.style.fontSize = '20px';
            } else {
              heading.style.fontSize = '18px';
            }
          };
          mediaQueryCallback(mediaQuery);
          mediaQuery.onchange = (e) => mediaQueryCallback(e);

          const nhsSection = document.createElement('div');
          nhsSection.classList.add(`${ID}-container`);
          nhsSection.innerHTML = /* HTML */ `${VARIATION === '1'
              ? '<h3>Order with NHS account <strong>(Recommended)</strong></h3>'
              : ''}
            <p>Sign in or create account online today. Select items directly from GP record.</p> `;

          insertAfterElement(heading, nhsSection);

          const nhsButton = elements[1];
          const nhsButtonElement = nhsButton.querySelector('button');
          const nhsButtonImage = nhsButton.querySelector('img');
          nhsButtonImage.style.width = '100%';
          nhsButtonImage.style.marginTop = '0';
          nhsButtonImage.style.marginBottom = '0';
          nhsButtonImage.style.cursor = 'pointer';

          nhsSection.appendChild(nhsButton);

          const nhsButtonDescription = document.createElement('p');
          nhsButtonDescription.classList.add(`${ID}-description`);
          nhsButtonDescription.innerText = 'Faster GP approval & always up to date';

          nhsSection.appendChild(nhsButtonDescription);

          const bootsSection = document.createElement('div');
          bootsSection.classList.add(`${ID}-container`);
          /* eslint-disable indent */
          bootsSection.innerHTML = /* HTML */ `${VARIATION === '1'
              ? '<h3>Order creating a Boots account</h3>'
              : ''}
            <p>
              Don't want to use NHS login? You can still order by searching for medicines you need.
              You may want to have these in front of you.
            </p> `;
          /* eslint-enable indent */

          const seperator = elements[5];
          seperator.style.margin = '2rem 0';
          insertAfterElement(seperator, bootsSection);

          const bootsButton = elements[6];
          bootsButton.style.borderRadius = '5px';
          bootsButton.style.height = '3.2rem';
          bootsButton.style.textTransform = 'uppercase';
          bootsButton.style.letterSpacing = '1px';
          bootsButton.style.marginBottom = '0';
          bootsButton.style.maxWidth = 'unset';

          bootsSection.appendChild(bootsButton);

          // Tracking Start
          fireEvent('Code Fired');

          nhsButtonElement.addEventListener('click', () => {
            fireEvent('Order using NHS button clicked');
          });

          bootsButton.addEventListener('click', () => {
            fireEvent('Order perscription Boots button clicked');
          });
          // Tracking End
        }
      });
    });

    mutationObserver.observe(body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
};
