/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import AnimatedScarcity from '../scarcity';
import { setup, fireEvent } from './services';

export default () => {

  setup();
  fireEvent('Scarcity Exists');
    
  new AnimatedScarcity();

};
