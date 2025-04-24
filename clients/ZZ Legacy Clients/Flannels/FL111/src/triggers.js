/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

if(window.location.pathname.match(/Cart/i)) {
  pollerLite([
    'body.Basket',
    '#main-content',
  ], () => {

    if (VARIATION == 'control') {
      events.send(ID, `${ID} Control`, `${ID} user in control`);
    } else {
      events.send(ID, `${ID} Variation 1`, `${ID} user in variation 1`);    

      activate();
    }
  });
}
