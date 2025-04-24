/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION} = shared;
  
  if (VARIATION === '1'){
    (console.log('v1 running'))
    var inputEl = document.querySelector('.adv_card_input');
    inputEl.setAttribute("value", "Enter your advantage card number");
    inputEl.onclick = function(){
    inputEl.setAttribute("value", "");
    };

  }
  else if (VARIATION === '2'){

    var textEl = document.querySelectorAll('.adv_points')[1];
    var pointsTxt = document.querySelector('.adv_points .bold').innerText.trim();
    var newText = `<span> Enter the number on your card to collect <span class='bold'> ` + pointsTxt + ` </span> once you receive this order.</span>`;

    textEl.innerHTML = newText;

  }
  
};
