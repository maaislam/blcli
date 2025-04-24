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
  
  var pdpSKU = document.getElementById('productId').innerText;
  
  const addJsToPage = (src, id, cb, classes) => {
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
    s.setAttribute('id', id);
    s.setAttribute('data-flix-distributor', '109');
    s.setAttribute('data-flix-language', 'en');
    s.setAttribute('data-flix-mpn', pdpSKU);
    s.setAttribute('data-flix-inpage', 'flix-inpage');
    s.setAttribute('data-flix-button', 'flix-minisite');
    document.head.appendChild(s);
  }

  addJsToPage("//media.flixfacts.com/js/loader.js", 'BO055');

  //<script type="text/javascript" src="//media.flixfacts.com/js/loader.js" data-flix-distributor="109" data-flix-language="en" data-flix-brand="" data-flix-mpn="" data-flix-ean="" data-flix-sku="" data-flix-button="flix-minisite" data-flix-inpage="flix-inpage" data-flix-button-image="" data-flix-price="" data-flix-fallback-language="" async></script>
  
  const addBelowCTA = () => {
    
    var flixHTML = `<div id="flix-minisite"></div>`;
    var targetEl = document.querySelector('.pdp_shopperActions_redesign');
    targetEl.insertAdjacentHTML('afterend', flixHTML);

  }

  const addMainContent = () => {
  
    var flixHTML = `<div id="flix-inpage"></div>`;
    var targetEl = document.querySelector('.template_row_spacer');
    targetEl.insertAdjacentHTML('afterend', flixHTML);


  }

  addMainContent();
  
  // Write experiment code here
};
