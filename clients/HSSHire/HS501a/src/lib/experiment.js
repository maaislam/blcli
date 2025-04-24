/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { NavData } from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  console.log('Running...');
  //get navdata
  console.log(NavData);
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (document.querySelector('.main_nav ul')) {
    const nav_menu = (navData) => {
      return navData
        .map((data) => {
          console.log(data);
          return `
           <li>
             <a href="${data.href}" title="${data.title}">${data.title}</a>
           </li>
       `;
        })
        .join('\n');
    };

    //console.log(nav_menu(), 'menu');

    document.querySelector('#nav').insertAdjacentHTML('beforebegin', nav_menu(NavData));
  }
};
