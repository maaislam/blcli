/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {

  pollerLite(['.pd3-deivery-banner__countdown'], () => {
    setup();
  });

  pollerLite(['#pd5-countdown'], () => {
    setup();
  });

  pollerLite(['.pd6-countdown'], () => {
    setup();
  });
};
