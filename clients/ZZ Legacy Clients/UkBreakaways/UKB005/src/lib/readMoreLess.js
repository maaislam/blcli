import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

export default (readMoreLink) => {
  if (window.location.pathname !== "/destination/london") {
    const paragraphs = document.querySelectorAll('.UKB005-destinationDetails__wrapper p');
          
    let count = 1;
    if (!readMoreLink.classList.contains('UKB005-readLess')) {
      [].forEach.call(paragraphs, (el) => {
        if (count === 1) {
          el.setAttribute('style', 'display: block !important; overlow: auto !important; max-height: none !important');
        } else {
          el.setAttribute('style', 'display: block !important;');
        }
        count += 1;
      });

      // Hide Read More
      // readMoreLink.setAttribute('style', 'display: none !important;');
      readMoreLink.innerText = 'read less';
      readMoreLink.classList.add('UKB005-readLess');
    } else if (readMoreLink.classList.contains('UKB005-readLess')) {
      [].forEach.call(paragraphs, (el) => {
        if (count === 1) {
          el.setAttribute('style', 'display: block !important; overlow: hidden !important; max-height: 50px !important');
        } else {
          el.setAttribute('style', 'display: none !important;');
        }
        count += 1;
      });

      // Hide Read Less
      readMoreLink.innerText = 'read more';
      readMoreLink.classList.remove('UKB005-readLess');
    }
  } else {
    const paragraphs = document.querySelectorAll('.UKB005-londonDestinationDetails__wrapper p');
          
    // Hide Read More
    if (!readMoreLink.classList.contains('UKB005-readLess')) {
      paragraphs[0].setAttribute('style', 'display: block !important; overlow: auto !important; max-height: none !important');
      paragraphs[1].setAttribute('style', 'display: block !important;');

      // Hide Read More
      readMoreLink.innerText = 'read less';
      readMoreLink.classList.add('UKB005-readLess');
    } else if (readMoreLink.classList.contains('UKB005-readLess')) {
      paragraphs[0].setAttribute('style', 'display: block !important; overlow: hidden !important; max-height: 50px !important');
      paragraphs[1].setAttribute('style', 'display: none !important;');

      // Hide Read Less
      readMoreLink.innerText = 'read more';
      readMoreLink.classList.remove('UKB005-readLess');
    }
  }
  
};