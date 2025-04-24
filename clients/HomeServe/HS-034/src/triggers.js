import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const pollForElem = document.querySelector('.row.has-bg-teal') || document.querySelector('#get-started');
pollerLite([() => pollForElem], () => {
  setTimeout(activate, 2000);
});

