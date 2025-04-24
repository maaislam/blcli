/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  
  setup();
  // Has reviews?
  pollerLite(['.bv-inline-histogram-ratings'], () => {
    events.send(ID, 'SD034 Reviews', 'SD034 Page has reviews');
  });

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  if (VARIATION == 2) {
    events.send(ID, 'SD034 Control', 'SD034 Control is active');

    const reviewsEl = document.querySelector('div[data-bv-show="reviews"]');
    
    const hasSeen = () => {
      
      if (isScrolledIntoView(reviewsEl)) {
      
        events.send(ID, 'SD034 Seen', 'SD034 User seen reviews', {sendOnce: true});

        window.removeEventListener('scroll', hasSeen);
      }
    }
    
    window.addEventListener('scroll', hasSeen);
    
    return false;

  } else {
    events.send(ID, 'SD034 Variation', 'SD034 Variation is active');
  }


  // Write experiment code here
};
