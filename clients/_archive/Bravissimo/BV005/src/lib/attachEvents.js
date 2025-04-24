import { addEventListener } from './winstack';
import { events } from '../../../../../lib/utils';

const attachEvents = () => {
  const closeBtn = document.querySelector('button.BV005-close .c-icon__glyph');
  const sizeGuide = document.querySelector('.BV005-sizeGuide');
  if (closeBtn && sizeGuide) {
    addEventListener(closeBtn, 'click', () => {
      sizeGuide.classList.remove('BV005-showGuide');
      document.body.classList.remove('BV005-noScroll');
      events.send('BV005', 'Click', 'User clicked close');
    });
  }

  const learnMoreBtn = document.querySelector('button.BV005-learnMore');
  if (learnMoreBtn) {
    addEventListener(learnMoreBtn, 'click', () => {
      events.send('BV005', 'Click', 'User clicked learn more');
    });
  }

  // Outside of box to close
  const wrap = document.querySelector('.BV005-sizeGuide--wrap');
  if (sizeGuide && wrap) {
    sizeGuide.addEventListener('click', (e) => {
      var isClickInside = wrap.contains(e.target);
      if (!isClickInside) {
        sizeGuide.classList.remove('BV005-showGuide');
        document.body.classList.remove('BV005-noScroll');
        events.send('BV005', 'Click', 'User clicked close');
      }
      
    })
  }
 };

export default attachEvents;