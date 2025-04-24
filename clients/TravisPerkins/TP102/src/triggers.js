import { Run, signUp } from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerPrevention';

if (!document.body.classList.contains('TP102')) {
  flicker();

  poller([
    '#content',
    '#homepage_slider',
  ], Run);

  poller([
    '#postCode',
  ], signUp);
}
