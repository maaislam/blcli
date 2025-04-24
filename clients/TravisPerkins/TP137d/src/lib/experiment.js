/**
 * TP137d - Online Brochure PDP
 * @author User Conversion
 */
import { setup, addBrochure } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';

const activate = () => {
  setup();

  const ref = document.getElementById('addToCartForm');
  addBrochure(ref);

  const brochure = document.querySelector('.TP137d-brochure');
  if (brochure) {
    brochure.addEventListener('click', () => {
      events.send('TP137d', 'Click', 'Brochure was clicked');
    });
  }
};

export default activate;
