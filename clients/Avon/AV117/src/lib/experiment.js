import { setup, fireEvent } from '../../../../../core-files/services';
import allSteps from './components/allSteps';
import { stepsCopy } from './data';
import { obsIntersection } from './helpers/obsIntersection';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  console.log(ID);
  //const controlStepsSection = document.querySelector('.tiles__item--colored1').closest('section');
  const controlStepsSection = document.querySelectorAll('.WMNSection')[2];
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    const intersectionConfig = {
      threshold: 0.3,
    };
    const intersectingCalbackCtrl = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        fireEvent('Conditions Met');
        fireEvent('Customer scroll to the “Rep journey” element on the BAR page');
        document.body.classList.add(`${ID}__seen`);
      }
    };
    obsIntersection(controlStepsSection, intersectingCalbackCtrl, intersectionConfig);
    controlStepsSection.addEventListener('click', (e) => {
      if (e.target.matches('[href="#apply"]') || e.target.closest('[href="#apply"]')) {
        fireEvent('Customer clicks this specific “Join Now” button after the element');
      }
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  controlStepsSection.classList.add(`${ID}__hide`);

  //render new section

  document.querySelector(`.${ID}__steps--section`)?.remove();

  controlStepsSection.insertAdjacentHTML('afterend', allSteps(ID, stepsCopy));

  const newStepsElm = document.querySelector(`.${ID}__steps--section`);
  const intersectingCalback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      fireEvent('Conditions Met');
      fireEvent('User has seen the new element');
      document.body.classList.add(`${ID}__seen`);
      document.querySelectorAll(`.${ID}__step`).forEach((stepElm, index) => {
        stepElm.classList.add(`${ID}__animate--${index + 1}`);
      });
    }
  };

  const intersectionConfig = {
    threshold: 0.3,
  };

  obsIntersection(newStepsElm, intersectingCalback, intersectionConfig);

  newStepsElm.addEventListener('click', (e) => {
    if (e.target.matches(`.${ID}__join--btn`) || e.target.closest(`.${ID}__join--btn`)) {
      fireEvent('User clicks the “Join Today” button after the new steps element');
    }
  });
};
