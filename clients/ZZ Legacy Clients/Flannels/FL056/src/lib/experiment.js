/**
 * FL056 - Brand Specific Sizing
 * NB. This test heavily relies on FL056 so
 * any updates to 57 will need to be updated here.
 * @author User Conversion
 */

import settings from './settings';
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import getGender from './helpers/gender';
import sizeGuide from './sizeGuide';
import getTerm from './helpers/terms';
import hover from './helpers/hover';

events.analyticsReference = '_gaUAT';


const activate = () => {
  if (document.querySelector('.FL057')) {
    events.send(settings.ID, 'Fail', 'Conflict with FL057');
    return false;
  }
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  events.send(settings.ID, 'Active', 'Test is active');

  setup();
  const productGender = getGender();
  const productTerms = getTerm();
  const { productName } = window.dataLayer[1];
  const { productBrand } = window.dataLayer[1];

  const domRef = document.getElementById('BodyWrap');

  // Build new size guide.
  let ran = false;
  if (!ran && !document.querySelector('.FL056-sizeGuide')) {
    const theSizeGuide = new sizeGuide(productTerms, productGender, productBrand);

    ran = true;
    // Conditions to not run if either;
    // Kids / Babies or theSizeGuide.terms === null.
    if (theSizeGuide.gender === 'kids' || theSizeGuide.gender === 'babies' || theSizeGuide.terms === null) {
      events.send(settings.ID, 'Fail', 'Test did not run, revent to old size guide', { sendOnce: true });
      events.send(settings.ID, 'Product', `Product Name: ${productName}. Gender: ${productGender}`, { sendOnce: true });
      document.body.classList.add('FL056-old-size');
      return false;
    }
  
    const sizeGuides = theSizeGuide.getSizeItems();
    
    const sizeGuideHTML = theSizeGuide.generateHTML(sizeGuides);
    
    theSizeGuide.render(domRef, sizeGuideHTML);
    events.send(settings.ID, 'Active', 'Size guide active', { sendOnce: true });
    
  
    // Click events
    let oldSizeLink = document.querySelector('a#LearnMore.sizeslink');
    const FL001SizeLinkDesktop = document.querySelector('.FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop a');
    const newSizeGuide = document.querySelector('.FL056-sizeGuide');
    const sizeGuideChart = document.querySelector('.FL056-size-guide');
    const closeSizeGuide = document.querySelector('.FL056-close');
    const bodyWrap = document.getElementById('BodyWrap');
    if (newSizeGuide) {

      // If mobile, swap element for click
      oldSizeLink.removeAttribute('href');
      if (window.innerWidth < 479) {
        oldSizeLink = document.querySelector('#dnn_ctr176031_ViewTemplate_ctl00_ctl14_divPopupSizeGuide');
        oldSizeLink.innerHTML = '';
        oldSizeLink.insertAdjacentHTML('beforeend', `
          <span class="FL056-fake-size--link">Size guide</span>
        `);
      }

      // Close 
      newSizeGuide.addEventListener('click', (e) => {
        if (!sizeGuideChart.contains(e.target)) {
          newSizeGuide.classList.remove('FL056-open');
          document.body.classList.remove('FL056-noscroll');
          
        }
      });
      // Open
      if (oldSizeLink) {
        oldSizeLink.addEventListener('click', (e) => {
          e.preventDefault();
          newSizeGuide.classList.add('FL056-open');
          document.body.classList.add('FL056-noscroll');
          events.send(settings.ID, 'Click', 'Size guide shown');
          
        });
      }
      if (FL001SizeLinkDesktop) {
        FL001SizeLinkDesktop.addEventListener('click', (e) => {
          e.preventDefault();
          newSizeGuide.classList.add('FL056-open');
          document.body.classList.add('FL056-noscroll');
          events.send(settings.ID, 'Click', 'Size guide shown');
          
        });
      }

      // Close
      closeSizeGuide.addEventListener('click', () => {
        newSizeGuide.classList.remove('FL056-open');
        document.body.classList.remove('FL056-noscroll');
        
      });
      // Escpae key.
      document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          newSizeGuide.classList.remove('FL056-open');
          document.body.classList.remove('FL056-noscroll');
          
        }
      };
    }

    // Add widths and padding for vertical scroll.
  }

  const tableData = document.querySelectorAll('.FL056-size-part table tr.FL056-sizes td');
  hover(tableData);
};

export default activate;
