/**
 * TP137d - Online Brochure PDP
 * @author User Conversion
 */
import { setup, addBrochure } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';

const activate = () => {
  setup();

  const ref = document.querySelector('.ccButton');
  addBrochure(ref);

  const brochure = document.querySelector('.TP137m-brochure');
  if (brochure) {
    brochure.addEventListener('click', () => {
      events.send('TP137m', 'Click', 'Brochure was clicked');
    });
  }
};

export default activate;
