import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

export { setup }; // eslint-disable-line

export const tracking = () => {  
  events.send(settings.ID, 'Active', 'Test is active and applied');

  const refine = document.querySelector('.AC018 .AC018_refine-mb');
  const addRole = document.querySelector('.AC018 .AC022_match_wrap a.AC022_add-role');
  const addLocation = document.querySelector('.AC018 .AC022_match_wrap a.AC022_add-loc');
  const website = document.querySelectorAll('#search-results-container .agency-result .contact-option-container[data-action="website"]');
  const number = document.querySelectorAll('#search-results-container .agency-result .contact-option-container[data-action="telfax"]');
  const email = document.querySelectorAll('#search-results-container .agency-result .contact-option-container[data-action="email"]');

  const clickEvent = (el, label) => {
    if (el && label) {
      for (let i = 0; el.length > i; i += 1) {
        el[i].addEventListener('click', () => {
          events.send(settings.ID, 'Clicked', label);
        });
      }
    }
  };

  clickEvent(refine, 'Refine');
  clickEvent(addRole, 'Add your job role link');
  clickEvent(addLocation, 'Add your location link');
  clickEvent(website, 'Website contact info');
  clickEvent(number, 'Contact number info');
  clickEvent(email, 'Email contact info');
};
