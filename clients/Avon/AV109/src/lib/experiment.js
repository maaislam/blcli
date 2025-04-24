/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderKit from './components/welcomekit';
import { kitDataMay } from './data';
import obsIntersections from './observeIntersection';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  fireEvent('Test Code Fired');
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const intersectionCallback = (entry) => {
    //console.log(entry);
    if (entry.isIntersecting && !entry.target.classList.contains(`${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };

  const anchoringSection = [...document.querySelectorAll('h2')]
    .filter((item) => item.innerText === 'YOUR CHOICE OF WELCOME KIT')[0]
    .closest('.WMNSection');

  anchoringSection.classList.add(`${ID}__welcomekit-section`);

  obsIntersections(anchoringSection, 0.3, intersectionCallback);

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  const kitSection = document.querySelector(`.${ID}__welcomekit-section`);
  const oldKitContent = kitSection.querySelector('.WMNcolumn-group.WMNtwo');

  oldKitContent.classList.add(`${ID}__hide`);

  oldKitContent.parentElement.querySelectorAll('a').forEach((item) => {
    item.innerText === 'APPLY TODAY' && item.classList.add(`${ID}__hide`);
  });

  //render new content

  const welcomeKitContainer = document.createElement('div');
  welcomeKitContainer.className = `${ID}__welcomekit--container`;

  oldKitContent.insertAdjacentElement('beforebegin', welcomeKitContainer);

  renderKit(ID, kitDataMay['welcome kit'], welcomeKitContainer);
  renderKit(ID, kitDataMay['ultimate welcome kit'], welcomeKitContainer);

  kitSection.addEventListener('click', (e) => {
    if (e.target.matches(`.${ID}__apply-anchor-btn`)) {
      fireEvent(`Customer clicks ${e.target.parentElement.querySelector('.title').innerText} CTA`);
    }
  });
};
