/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';
import debounce from 'lodash/debounce';
import paymentSteps from './components/paymentSteps';
import imageContainer from './components/imageContainer';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const btnType = e.target.innerText;
      if (btnType === 'Learn more') {
        fireEvent('Customer clicked current "Learn more" cta');
      } else if (btnType === 'Sign Up') {
        fireEvent('Customer clicked current "Sign Up" cta');
      }
    });
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  document.querySelector('#mainContent').classList.add(`${ID}__mainContent`);

  const currentPage = location.pathname;

  const currentPageData = gco005Data
    .reduce((item, currItem) => {
      const data = currItem.valueProps.filter((valProp) => valProp.url == currentPage);

      if (data.length > 0) {
        item.push({
          stepData: {
            header: currItem.header,
            step1: currItem.step1,
            step2: currItem.step2,
            step3: currItem.step3,
            tablePos: data[0].tablePosition,
          },
          imgData: data[0],
        });
      }
      return item;
    }, [])
    .filter(Boolean)[0];
  console.log(currentPageData);
  // select the target node
  var target = document.querySelector('article');

  // create an observer instance
  var observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      if (
        (document.querySelectorAll('.GCO005_button').length === 0 ||
          document.querySelectorAll('.GCO005__payment-steps--signup-cta__btn').length === 0) &&
        mutation.removedNodes.length === 0
      ) {
        paymentSteps(currentPageData.stepData, fireEvent);
        imageContainer(currentPageData.imgData, fireEvent);
        const newImageContainer = document.querySelector('.GCO005__valueprop');
        const paymentStepsContainer = document.querySelector('.GCO005__payment-steps');

        if (elementIsInView(newImageContainer, false)) {
          fireEvent('newImageContainer In View', true);
        }
        if (elementIsInView(paymentStepsContainer, false)) {
          fireEvent('paymentStepsContainer In View', true);
        }
        window.addEventListener(
          'scroll',
          debounce(() => {
            if (elementIsInView(newImageContainer, false)) {
              fireEvent('newImageContainer In View', true);
            } else if (elementIsInView(paymentStepsContainer, false)) {
              fireEvent('paymentStepsContainer In View', true);
            }
          }, 100)
        );
      }
    });
  });

  // configuration of the observer:
  var config = { attributes: false, childList: true, characterData: false, subtree: true };

  observer.observe(target, config);
};
