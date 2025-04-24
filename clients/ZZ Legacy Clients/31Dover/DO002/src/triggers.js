import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.product--buybox', () => {
    let run = false;
    // Check if on PDP.
    const dL = window.dataLayer;
    if (dL) {
      const { pageCategory } = dL[0]
      if (pageCategory && pageCategory === 'Detail') {
        run = true;
      }
    }
    return run;
  },
], activate);
