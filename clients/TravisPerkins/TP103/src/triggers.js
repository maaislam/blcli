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

  /**
   * Amend 5/12/18
   * If on /login page && Postcode input contains #register
   * Remove #register from postocde input.
   */
  const postcodeInput = document.getElementById('postCode');
  poller([postcodeInput], () => {
    if (postcodeInput && postcodeInput.value === '#register') {
      postcodeInput.value = '';
    }
  });
}
