import {destroyPollers} from '../../../../../lib/utils';

export default (ID) => {
  // Set up experiment on the window
  window.UC = window.UC || {};
  window.UC.experiments = window.UC.experiments || {};
  window.UC.experiments[ID] = {};
  if(!(window.UC.experiments[ID] || {}).pollers) {
      window.UC.experiments[ID].pollers = [];
  }

  /* 
   * Destroy any pollers that were running from previous page run
   * Remove any previously created nodes and event handlers in 
   * order to prevent duplication
   */
  window.UC.experiments[ID].destroyOnPageChange = true;
  window.UC.experiments[ID].destroy = () => {
    destroyPollers();

    // Remove all elements with class starting with PU003
    [...document.querySelectorAll('.PU003_toRemove')].forEach((el) => {
      el.remove();
    });
  };

  return window.UC.experiments[ID];
};