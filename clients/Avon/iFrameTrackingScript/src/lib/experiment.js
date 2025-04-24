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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  function inViewport(element) {
    if (!element) return false;
    if (1 !== element.nodeType) return false;

    var html = document.documentElement;
    var rect = element.getBoundingClientRect();

    return (
      !!rect &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.left <= html.clientWidth &&
      rect.top <= html.clientHeight
    );
  }

  if (inViewport(document.querySelector(".shopify-bar-wrapper"))) {
    fireEvent('Did See iFrame', true);
  } else
    window.addEventListener("scroll", () => {
      if (inViewport(document.querySelector(".shopify-bar-wrapper"))) {
        //send event once
        fireEvent('Did See iFrame', true);
      }
    });

};
