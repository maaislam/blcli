/**
 * @desc New customisation options - only show on logo select
 */

import settings from '../../settings';
import { events } from '../../../../../../../lib/utils';

const { ID } = settings;

export default class LogoPlacement {
  constructor() {
    this.render();
  }

  render() {
    const location = document.querySelector('#application_location');
    location.querySelector('h2').outerHTML = '<h2>Where would you like your logo?</h2>';
    location.querySelector('p').textContent = 'You can choose more than one!';

    const allLocations = document.querySelectorAll('#application_location .location');

    // loop through all locations, add active if selected
    [].forEach.call(allLocations, (element) => {
      const locationRadio = element.querySelector('input');
      locationRadio.addEventListener('click', () => {
        if (locationRadio.checked) {
          element.classList.add(`${ID}-location_active`);
          const locationName = element.querySelector('span').textContent;
          events.send('WW006', 'Click', `Clicks on ${locationName} location`);
        } else {
          element.classList.remove(`${ID}-location_active`);
        }
      });
    });
  }
}
