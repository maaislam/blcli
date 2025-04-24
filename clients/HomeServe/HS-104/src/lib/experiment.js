/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { fireEvent, newEvents, obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__visibleCheckBox`)) {
      VARIATION === 'control'
        ? fireEvent('checkbox is first visible (below fold)')
        : fireEvent('checkbox is first visible (above the fold)');
      document.body.classList.add(`${ID}__visibleCheckBox`);
    }
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, handleIntersection);
  }
};

const init = () => {
  const { search } = window.location;
  if (search.includes('step=your-payment')) {
    setup();
    fireEvent('Conditions Met');
    pollerLite(['.payment-details-wrapper'], () => {
      const targetPoint = document.querySelector('.payment-details-wrapper');
      const checkBoxRenewalElement = targetPoint.querySelector('div[role="group"] > div:last-child > .input-group');

      if (!document.querySelector(`.${ID}__checkBoxRenewal`) && VARIATION !== 'control') {
        targetPoint.insertAdjacentElement('afterbegin', checkBoxRenewalElement);
      }

      checkBoxRenewalElement.classList.add(`${ID}__checkBoxRenewal`);

      pollerLite([`.${ID}__checkBoxRenewal`], () => {
        handleObserver(`.${ID}__checkBoxRenewal`);
      });

      if (VARIATION == 'control') {
        return;
      }
    });
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.closest('#paymentDetails') && target.closest('button[type="button"]')) {
      const button = target.closest('button[type="button"]'); // or any selector
      const renewalCheckBox = document.querySelector(`#renewConfirmation`);
      if (!button.disabled && renewalCheckBox.checked) {
        fireEvent('Click on checkout submit where checkbox remains ticked');
        fireEvent('checkout success event');
      } else if (!button.disabled && !renewalCheckBox.checked) {
        fireEvent('Click on checkout submit where checkbox remains unticked');
        fireEvent('checkout success event');
      }
    }
  });

  init();

  onUrlChange(() => {
    init();
  });
};
