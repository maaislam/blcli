/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import getGender from './helpers/gender';
import sizeGuide from './sizeGuide';
import getTerm from './helpers/terms';
import hover from './helpers/hover';

events.analyticsReference = '_gaUAT';

const activate = () => {

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  setup();
  const productGender = getGender();
  const productTerms = getTerm();
  const { productName } = window.dataLayer[1];
  const domRef = document.getElementById('BodyWrap');

  // Build new size guide.
  let ran = false;
  if (!ran) {
    const theSizeGuide = new sizeGuide(productTerms, productGender);
    ran = true;
    // Conditions to not run if either;
    // Kids / Babies or theSizeGuide.terms === null.
    if (theSizeGuide.gender === 'kids' || theSizeGuide.gender === 'babies' || theSizeGuide.terms === null) {  
      events.send(settings.ID, 'Fail', 'Test did not run, revent to old size guide', { sendOnce: true });
      events.send(settings.ID, 'Product', `Product Name: ${productName}. Gender: ${productGender}`, { sendOnce: true });
      document.body.classList.add('FL057-old-size');
      return false;
    }
  
    const sizeGuides = theSizeGuide.getSizeItems();
    const sizeGuideHTML = theSizeGuide.generateHTML(sizeGuides);
    
    theSizeGuide.render(domRef, sizeGuideHTML);
    events.send(settings.ID, 'Active', 'Size guide active', { sendOnce: true });
    
  
    // Click events
    const oldSizeLink = document.querySelector('a#LearnMore.sizeslink');
    const FL001SizeLinkDesktop = document.querySelector('.FL001_sizeGuideBtn.FL001_sizeGuideBtn--desktop a');
    const newSizeGuide = document.querySelector('.FL057-sizeGuide');
    const sizeGuideChart = document.querySelector('.FL057-size-guide');
    const closeSizeGuide = document.querySelector('.FL057-close');
    const bodyWrap = document.getElementById('BodyWrap');
    if (newSizeGuide) {
      // Close 
      newSizeGuide.addEventListener('click', (e) => {
        if (!sizeGuideChart.contains(e.target)) {
          newSizeGuide.classList.remove('FL057-open');
          document.body.classList.remove('FL057-noscroll');
        }
      });
      // Open
      if (oldSizeLink) {
        oldSizeLink.addEventListener('click', (e) => {
          e.preventDefault();
          newSizeGuide.classList.add('FL057-open');
          document.body.classList.add('FL057-noscroll');
          events.send(settings.ID, 'Click', 'Size guide shown');
        });
      }
      if (FL001SizeLinkDesktop) {
        FL001SizeLinkDesktop.addEventListener('click', (e) => {
          e.preventDefault();
          newSizeGuide.classList.add('FL057-open');
          document.body.classList.add('FL057-noscroll');
          events.send(settings.ID, 'Click', 'Size guide shown');
        });
      }

      // Close
      closeSizeGuide.addEventListener('click', () => {
        newSizeGuide.classList.remove('FL057-open');
        document.body.classList.remove('FL057-noscroll');
      });
      // Escpae key.
      document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          newSizeGuide.classList.remove('FL057-open');
          document.body.classList.remove('FL057-noscroll');
        }
      };
    }

    // Add widths and padding for vertical scroll.
  }

  const tableData = document.querySelectorAll('.FL057-size-part table tr.FL057-sizes td');
  hover(tableData);
};

export default activate;
