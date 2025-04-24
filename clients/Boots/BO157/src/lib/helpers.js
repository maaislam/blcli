import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export const addOfferClickEvents = () => {
  let allOffers = document.querySelectorAll(`span.plp-promotion-redesign`);
  [].forEach.call(allOffers, (offer) => {
    if (!offer.classList.contains(`${ID}-event-added`)) {
      offer.classList.add(`${ID}-event-added`);
      offer.addEventListener('click', (e) => {
        fireEvent('Clicked - PLP Offer');
      });
    }
  });


  // --- SRP pages only
  if (window.location.href.indexOf('searchTerm') > -1
  && !document.querySelector('body').classList.contains(`${ID}-pageObserver`)) {
    observer.connect(document.querySelector('.product_listing_container ul.grid_mode'), () => {
      document.querySelector('body').classList.add(`${ID}-pageObserver`);
      setTimeout(() => {
        allOffers = document.querySelectorAll(`span.plp-promotion-redesign`);
        [].forEach.call(allOffers, (offer) => {
          if (!offer.classList.contains(`${ID}-event-added`)) {
            offer.classList.add(`${ID}-event-added`);
            offer.addEventListener('click', (e) => {
              fireEvent('Clicked - PLP Offer');
            });
          }
        });
      }, 1200);
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  }

  
}