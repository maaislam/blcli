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

  function addSwogoContainers(){
  	const pdpMarkUp = '<div class="swogo-box" id="swogo-bundle-1"></div>';
    const basketMarkUp = '<div class="swogo-box" id="swogo-bundle-0"></div>';
    if (window.location.pathname.indexOf('OrderItemDisplay') > -1){
    	const basketEl = document.getElementById('basket_adcard');
      	basketEl.insertAdjacentHTML('afterend', basketMarkUp);
    }
    else {
      	const pdpEL = document.querySelector('.row.template_row_spacer')
      pdpEL.insertAdjacentHTML('beforebegin', pdpMarkUp);
    }
  }

  const addJsToPage = (src, id, dv, cb, classes) => {
    if(document.querySelector('#' + id)) {
      return;
    }
  
    var s = document.createElement('script');
    if(typeof cb == 'function') {
      s.onload = cb;
    }
  
    if(classes) {
      s.className = classes;
    }
  
    s.src = src;
    s.setAttribute('data-variant', dv);
    s.setAttribute('id', id);
    document.head.appendChild(s);
  }

  addSwogoContainers();
  addJsToPage('https://ui.swogo.net/bundles/v4/bootsCom/swogo.js', 'BO052', 'A')

  // Write experiment code here
};
