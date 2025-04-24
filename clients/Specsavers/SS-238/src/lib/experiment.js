/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');


  const btns = document.querySelectorAll('.sib-home .cta-btn-set .cta-btn');
  [].forEach.call(btns, b => {
    b.addEventListener('click', e => {
      fireEvent('Button Click - ' + (e.currentTarget?.innerText || '').trim());
    });
  });
  
};
