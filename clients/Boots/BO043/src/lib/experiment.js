/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  const wellnessLink = document.querySelector('.departmentMenuListItem #departmentLink_1860697').parentNode;
  const healthLink = document.querySelector('.departmentMenuListItem #departmentLink_1595014').parentNode;

  if(wellnessLink && healthLink) {
    healthLink.insertAdjacentElement('afterend', wellnessLink);
  }
};
