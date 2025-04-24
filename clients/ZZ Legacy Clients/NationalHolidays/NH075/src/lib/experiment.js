/**
 * NH075 - Itinerary Highlights in Search Results (Mobile)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  // Experiment code
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

  const whatsIncludedAccordion = `<div class="${settings.ID}-filter-category filter-category" style="padding-top: 5px;">
    <h3 id="getincluded" class="" type="button" style="border-top: 1px solid #1891d5;border-bottom: 1px solid #1891d5; background:none;">What's Included</h3>
    <ul style="display:none; border-top: 0px; border-bottom: 1px solid #1891d5;"><!--#0a121c-->
      <div class="itinerary-bullets">
      </div>
    </ul>
  </div>`;

  const allResults = document.querySelectorAll('.result-item');
  [].forEach.call(allResults, (item) => {
    item.querySelector('.details ul').insertAdjacentHTML('beforebegin', whatsIncludedAccordion);
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
