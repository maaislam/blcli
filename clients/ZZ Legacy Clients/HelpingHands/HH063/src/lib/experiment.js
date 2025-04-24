/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

const runcChanges = () => {
  console.log('experiment running');
  const branchQualityCare = document.querySelector('.branch-quality-care');
  const meetTheTeam = document.querySelector('.branch-meet-team');
  meetTheTeam.insertAdjacentElement('beforebegin', branchQualityCare);

}

export default () => {

  const init = () => {
    setup();
    runcChanges();
  };

  init();

  // Write experiment code here
};
