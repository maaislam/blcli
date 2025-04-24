import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import HelloWeek from './calendar';

export default () => {
  const { ID, VARIATION } = shared;

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
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  let newHTML = `
  
    <div class="${ID}-new-calendar">
    

        <div class="calendar"></div>
    
    </div>
  
  
  `;

  let insertionPoint = document.body;

  insertionPoint.insertAdjacentHTML('beforeend', newHTML);

  pollerLite(['.calendar'], () => {
    new HelloWeek({
      selector: '.calendar',
    });
  });
};
