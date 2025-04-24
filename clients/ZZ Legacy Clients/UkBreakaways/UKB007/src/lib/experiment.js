/**
 * UKB007 - Per Person Pricing Clarity
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = () => {
  // Experiment code
  // Get device type
  let device = '';
  if (window.innerWidth > 500) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  if (window.location.pathname.indexOf('/search-results') > -1 ) {
    setup();
    const results = document.querySelectorAll('.result-item');
    [].forEach.call(results, (item) => {
      const title = item.querySelector('.details h2.itin-title');
      const titleText = title.innerText.trim().toLowerCase();
      if (titleText.indexOf('self catering') === -1) {
        // Check if Break is Web Offer and replace text
        const webOffer = item.querySelector('.web-offer');
        if (webOffer) {
          webOffer.innerHTML = 'per person';
          webOffer.setAttribute('style', 'display: block;');
        }
      }
    });
  } else if (window.location.pathname.indexOf('/itineraries/') > -1) {
    const itineraryTitle = document.querySelector('h1.mt0.itin-title-h');
    const itineraryTitleText = itineraryTitle.innerText.trim().toLowerCase();
    if (itineraryTitleText.indexOf('self catering') === -1) {
      setup();
      const destinationDetailsContent = document.querySelector('.destination-box .row');
      let count = 1;
      if (destinationDetailsContent) {
        const rows = destinationDetailsContent.querySelectorAll('div.col-xs-12');
        if (device === 'desktop') {
          [].forEach.call(rows, (row) => {
            if (row.querySelector('.blue-line.large.orange')) {
              row.setAttribute('style', 'width: 62%;');
            } else if (row.querySelector('a.orange-btn.book.pull-right')) {
              row.setAttribute('style', 'width: 38%;');
            }
          });
        }
        const pp = document.querySelector('.container .fromtext.selfc');
        pp.innerHTML = 'per person';
        // Check if there is a "was" price
        const wasPrice = document.querySelector('.container span.strike');
        if (wasPrice) {
          pp.classList.add('UKB007-perPerson');
        }
      }
      
    }
  }
};

export default activate;
