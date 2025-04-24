/**
 * AV035 - Samples Shop Returning User
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import SamplesFullProductBar from './components/SamplesFullProductBar';
import shared from './shared';

export default () => {
  setup();
  new SamplesFullProductBar(shared.fullProductIds);
};
