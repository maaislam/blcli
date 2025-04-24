/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import SingleScarcity from './singleScarcityBar';
import AnimatedScarcity from './animatedBar';


export default () => {
  setup();

  if(shared.VARIATION === '1') {
    new SingleScarcity();
  }else if (shared.VARIATION === '2') {
    new AnimatedScarcity();
  }
};
