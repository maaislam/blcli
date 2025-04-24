/**
 * PJ105 - Dips Upsell Experiment Consolidation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import PJ087 from './PJ087';
import PJ097 from './PJ097';

const { ID, VARIATION } = shared;

const activatePJ105 = () => {
  setup();

  // Write experiment code here
  if (VARIATION == '1') {
    // PJ087();
  } else if (VARIATION == '2') {
    // PJ097();
  }
};


export default activatePJ105;
