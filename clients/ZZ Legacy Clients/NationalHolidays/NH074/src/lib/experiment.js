/**
 * NH074 - Itinerary Highlights in Search Results (Desktop)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // ------ Gets Latest Deals from Offers page ------
  const getHighlights = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;
        const items = temp.querySelector('.bullets');

        const highlightDetails = items;
        callback(highlightDetails);
      }
    };
    request.send();
  };

  const whatsIncludedAccordion = `<div class="${settings.ID}-filter-category filter-category">
    <h3 id="getincluded" class="" type="button" style="" background:none;">
      What's included in this coach holiday <i class="far fa-question-circle tooltip"></i>
    </h3>
    <ul style="display:none;">
      <div class="itinerary-bullets">
      </div>
    </ul>
  </div>`;

  const allResults = document.querySelectorAll('.result-item');
  [].forEach.call(allResults, (item) => {
    if(window.innerWidth > 767) {
      item.insertAdjacentHTML('beforeend', whatsIncludedAccordion);
    } else {
      item.querySelector('.buttons').insertAdjacentHTML('beforebegin', whatsIncludedAccordion);
    }

   


    const itemMoreInfoBtn = item.querySelector('.buttons a.btn-more-info.more-info');
    let itemUrl = '';
    if (itemMoreInfoBtn) {
      itemUrl = itemMoreInfoBtn.getAttribute('href');
    }
    const accordion = item.querySelector(`div.${settings.ID}-filter-category.filter-category`);
    if (accordion) {
      const accordionTitle = accordion.querySelector('h3');
      const accordionList = accordion.querySelector('ul');
      accordion.addEventListener('click', () => {
        accordionTitle.classList.toggle('open');

        if (accordionList.querySelector('div.itinerary-bullets') && !accordionList.querySelector('div.itinerary-bullets div.bullets')) {
          getHighlights(`${itemUrl}`, (highlightDetails) => {
            accordionList.querySelector('div.itinerary-bullets').insertAdjacentElement('afterbegin', highlightDetails);
          });
        }
        
        if (accordionTitle.classList.contains('open')) {
          accordionList.setAttribute('style', 'display: block;');
        } else {
          accordionList.setAttribute('style', 'display: none;');
        }
      });
    }
  });

};

export default activate;
