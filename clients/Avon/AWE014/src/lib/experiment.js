/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, insertAfterElement } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  const isPLP = document.querySelector('.ProductListModule');
  const isPDP = document.querySelector('.ProductDetail');

  if (VARIATION === 'control') {
    // Tracking
    if (isPLP) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fireEvent('Conditions Met');
            fireEvent('Customer visited a PLP with an exclusive offer');
          }
        });
      });

      pollerLite(['.ProductList'], () => {
        const productList = document.querySelector('.ProductList');

        const mutationObserver = new MutationObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.type === 'childList' && entry.addedNodes.length !== 0) {
              const product = entry.addedNodes[0];
              const offer = product.querySelector('.ExclusiveOffers');

              if (offer) {
                intersectionObserver.observe(offer);
              }
            }
          });
        });

        mutationObserver.observe(productList, {
          attributes: false,
          childList: true,
          subtree: false,
        });
      });
    }

    if (isPDP) {
      pollerLite(['.SpecialOffer'], () => {
        const intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fireEvent('Conditions Met');
              fireEvent('The exclusive offer is in view');
            }
          });
        });

        fireEvent('Customer visited a PDP with an exclusive offer');

        const offer = document.querySelector('.SpecialOffer');

        offer.addEventListener('click', () => {
          fireEvent('Customer clicked an exclusive offer element on PDP');
        });

        intersectionObserver.observe(offer);
      });
    }
    // End Tracking
  } else {
    if (isPLP) {
      const findOffers = () => {
        pollerLite(['.ExclusiveOffers'], () => {
          const products = document.querySelectorAll('.ProductListCell');

          products.forEach((el) => {
            const productUrl = el.querySelector('.ProductName').href;
            const existingOffer = el.querySelector('.ExclusiveOffers');
            const newOffer = el.querySelector(`.${ID}-promo`);

            if (existingOffer && !newOffer) {
              const offerText = existingOffer.querySelector('.TooltipContent');
              let content = '';

              if (offerText) {
                content = offerText.innerText;
              } else {
                const existingOfferButton = existingOffer.querySelector('.ExclusiveOfferButton');
                const modal = document.querySelector('#ModalExclusiveOffers .ModalContent');
                existingOfferButton.click();
                const closeModal = document.querySelector('#ModalExclusiveOffers .ModalHeader');
                content = modal.innerText;
                closeModal.click();
              }

              existingOffer.remove();

              const newOfferBlock = document.createElement('div');
              newOfferBlock.classList.add(`${ID}-root`);
              newOfferBlock.classList.add('padding');

              newOfferBlock.innerHTML = /* HTML */ `
                <a href="${productUrl}" # class="${ID}-promo no-arrow">
                  <span class="${ID}-promo-icon tag"></span>
                  <div class="${ID}-promo-content">
                    <h4>Qualität zum Wow-Preis!</h4>
                    <p>${content}</p>
                  </div>
                </a>
              `;

              el.appendChild(newOfferBlock);
            }
          });
        });
      };

      window.addEventListener('load', () => findOffers());
      window.addEventListener('popstate', () => findOffers());
    }

    if (isPDP) {
      const renderNewOffer = () => {
        pollerLite(['.SpecialOffer'], () => {
          const newOffer = document.querySelector(`.${ID}-promo`);

          if (!newOffer) {
            const currentOffer = document.querySelector('.SpecialOffer');
            const currentOfferButton = currentOffer.querySelector('.Item');
            const content = currentOffer.querySelector('.Item').innerText;

            const newOfferBlock = document.createElement('div');
            newOfferBlock.classList.add(`${ID}-root`);
            newOfferBlock.classList.add('margin');

            newOfferBlock.innerHTML = /* HTML */ `
              <div class="${ID}-promo">
                <span class="${ID}-promo-icon tag"></span>
                <div class="${ID}-promo-content">
                  <h4>Qualität zum Wow-Preis!</h4>
                  <p>${content}</p>
                </div>
                <span class="${ID}-promo-icon arrow"></span>
              </div>
            `;

            insertAfterElement(currentOffer, newOfferBlock);
            newOfferBlock.appendChild(currentOfferButton);
            currentOffer.remove();
          }
        });
      };

      window.addEventListener('load', () => renderNewOffer());
      window.addEventListener('resize', () => renderNewOffer());
    }

    // Tracking
    if (isPLP) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fireEvent('Conditions Met');
            fireEvent('Customer visited a PLP with an exclusive offer');
          }
        });
      });

      pollerLite(['.ProductList'], () => {
        const productList = document.querySelector('.ProductList');

        const mutationObserver = new MutationObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.type === 'childList' && entry.addedNodes.length !== 0) {
              const product = entry.addedNodes[0];
              pollerLite([`.${ID}-root`], () => {
                const offer = product.querySelector(`.${ID}-root`);

                if (offer) {
                  intersectionObserver.observe(offer);
                  offer.addEventListener('click', () => {
                    fireEvent('Customer clicked an exclusive offer element on PLP');
                  });
                }
              });
            }
          });
        });

        mutationObserver.observe(productList, {
          attributes: false,
          childList: true,
          subtree: false,
        });
      });
    }

    if (isPDP) {
      fireEvent('Customer visited a PDP with an exclusive offer');

      pollerLite(['.SpecialOffer'], () => {
        const intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fireEvent('Conditions Met');
              fireEvent('The exclusive offer is in view');
            }
          });
        });

        pollerLite([`.${ID}-root`], () => {
          const offer = document.querySelector(`.${ID}-root`);

          offer.addEventListener('click', () => {
            fireEvent('Customer clicked an exclusive offer element on PDP');
          });

          intersectionObserver.observe(offer);
        });
      });
    }
    // End Tracking
  }
};
