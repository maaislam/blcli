/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let poller = false;
    const pagesToRun = ['/webstore/content/christmas/', '/webstore/watches.do', '/webstore/engagement.do',
    '/webstore/diamonds.do', '/webstore/jewellery.do', '/webstore/wedding.do', '/webstore/offers.do'];
    const pathname = window.location.pathname;

    if (pagesToRun.indexOf(`${pathname}`) > -1) {
      poller = true;
    }

    return poller;
  },
], activate);



