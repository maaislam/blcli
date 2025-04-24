/**
 * MP167 - Description
 * @author User Conversion
 */
import { setup, getCat } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  // Get breadcrumbs and pull the main ones. Remove any #Sale.
  const breadCrumbs = document.querySelectorAll('.breadcrumb_category_item:not(.breadcrumb-active)');

  const breadcrumbDupe = Array.from(breadCrumbs).filter((newCrumb) => {
    const crumbAnchor = newCrumb.querySelector('a');
    const anchorTitle = crumbAnchor.textContent;
    if (anchorTitle === 'Sale' || anchorTitle === 'Home') {
      return false;
    }
    return true;
  }).map((crumb) => {
    return crumb.cloneNode(true);
  });


  // Get gender and add that in.
  const hashtagObj = getCat();
  const encodedGender = encodeURI(hashtagObj.gender);
  

  // Where we adding it.
  let ref = document.querySelector('.pdp_product_zone1.col-pdp .relatedItems');
  if (!ref) {
    ref = document.querySelector('.pdp_recently_viewed.col-pdp .relatedItems');
  }
  
  if (!document.querySelector('.MP167-hashtags')) {
    ref.insertAdjacentHTML('beforebegin', `
      <div class="MP167-hashtags">
        ${encodedGender !== 'null' ? `<div class="MP167-hashtag">
          <p>#<a href="https://www.mamasandpapas.com/en-gb/c/clothing/${encodedGender.toLowerCase()}-clothing">${encodedGender}</a></p>
        </div>` : ''}
        ${Array.from(breadcrumbDupe).map((link) => `
          <div class="MP167-hashtag">
            <p>#${link.innerHTML}</p>
          </div>
        `).join(' ')}
      </div>
    `);
  }


  // Add events
  const addedHashtags = document.querySelectorAll('.MP167-hashtag');
  if (addedHashtags) {
    for (let i = 0; addedHashtags.length > i; i += 1) {
      addedHashtags[i].addEventListener('click', () => {
        events.send(ID, 'Click', 'User clicked Hashtag');
      });
    }
  }

};

export default activate;
