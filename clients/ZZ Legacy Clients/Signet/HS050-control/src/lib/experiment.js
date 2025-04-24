/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  document.querySelectorAll(`.button.hero-banner__button`)[0].addEventListener("click", function() {
    events.send(`HS050 Control Clicks`, `Clicked Banner`);
  });

  document.querySelectorAll(`.button.hero-banner__button`)[1].addEventListener("click", function() {
    events.send(`HS050 Control Clicks`, `Clicked Banner`);
  });

  document.querySelector(`.hero-banner__image`).addEventListener("click", function() {
    events.send(`HS050 Control Clicks`, `Clicked Banner Img`);
  });


};
