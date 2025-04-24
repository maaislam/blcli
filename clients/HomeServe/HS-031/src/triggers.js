import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
  [
    () =>
      document.querySelector('form[action="/search"]') || document.querySelector('[action="https://www.homeserve.co.uk/search"]'),
  ],
  () => {
    setTimeout(activate, 500);
  }
);
