import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const startExperiment = () => {
  pollerLite(
    [
      '.product-images-wrapper',

      () => {
        return window.dataLayer;
      },
    ],
    () => {
      document.documentElement.classList.add(`${ID}-expbegins`);
      const paDivBottom = document.querySelector('.product-detail-wrapper') || document.querySelector('#product-detail-wrapper');

      const newATBHTML = `
  
      <div class="${VARIATION === 'control' ? `${ID}-controlrecs` : `${ID}-recs-holder`}">
      
        
      </div>`;

      const insertionPoint = VARIATION === 'control' ? paDivBottom : document.querySelector('.product-image-container');
      const insertPosition = VARIATION === 'control' ? 'beforeend' : 'beforeend';
      insertionPoint.insertAdjacentHTML(insertPosition, newATBHTML);
    }
  );
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
