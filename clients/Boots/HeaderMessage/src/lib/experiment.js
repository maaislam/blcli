/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

// example
var newEl = document.createElement('div');
newEl.className = "errorBanner";
newEl.innerHTML = '<p class="updateText">We\'re currently experiencing some problems taking credit & debit card payments. Please use PayPal or Advantage Card points to pay at this time.</p>';

var ref = document.getElementById('header');

insertAfter(newEl, ref);

};
