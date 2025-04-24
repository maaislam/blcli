/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'SD018 Control');
    return false;
  } else {
    events.send(ID, 'SD018 Active');
  }

  setup();

  const ref = document.querySelector('.ThreeHelpTips .container-fluid');
  ref.insertAdjacentHTML('afterbegin', `
    <div class="SD018-toggle">
      <h1>More Information</h1>
    </div>
  `);

  const ulEl = document.querySelectorAll('.ThreeHelpTips ul');
  // Move Inners of 2 into 1
  if (ulEl && ulEl[0]) {
    ulEl[0].insertAdjacentHTML('beforeend', ulEl[1] ? ulEl[1].innerHTML : null);
  }

  const links = document.querySelectorAll('.ThreeHelpTips ul li a');
  if (links.length) {
    for (let i = 0; links.length > i; i+= 1) {
      links[i].addEventListener('click', () => {
        events.send(ID, 'SD018 Click', 'SD018 Clicked on footer link');
      });
    }
  }
};
