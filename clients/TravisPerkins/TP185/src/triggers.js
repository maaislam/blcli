/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from './lib/shared';


pollerLite([
  'body',
  () => !!window.ga
], () => {
  document.body.classList.remove(`${shared.ID}`);

  const experimentElement = document.querySelectorAll(`.${shared.ID}-login-prompt`);

  if (experimentElement.length) {
    [].forEach.call(experimentElement, elm => {
      elm.parentNode.removeChild(elm);
    });
  }

  activate();
});
