/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import settings from './lib/shared';
import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

const {ID, VARIATION} = settings;

pollerLite([
  'body', 
  '.main .hero',
  () => {
    let run = false;
    if (window.dataLayer) {
        run = true;
    }
    return run;
  }
], () => {
  events.send(`${ID} Mobile Home Navigation V-${VARIATION}`, 'Did Show');

  if(settings.VARIATION == 'control') {
    return;
  }

  activate();
});
