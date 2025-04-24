/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import {
  cookieOpt,
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  console.log(VARIATION)

  setup();
  cookieOpt();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION === "control") {
    //control - no change

    function addSwogoContainers() {
      const pdpMarkUp = '<div class="swogo-box" id="swogo-bundle-1"></div>';
      const basketMarkUp = '<div class="swogo-box" id="swogo-bundle-0"></div>';
      if (window.location.pathname.indexOf('OrderItemDisplay') > -1) {
        const basketEl = document.getElementById('basket_widget_right_bar');
        basketEl.insertAdjacentHTML('afterend', basketMarkUp);
      } else {
        const pdpEL = document.querySelector('.row.template_row_spacer')
        pdpEL.insertAdjacentHTML('beforebegin', pdpMarkUp);
      }
    }

    const addJsToPage = (src, id, dv, cb, classes) => {
      if (document.querySelector('#' + id)) {
        return;
      }

      var s = document.createElement('script');
      if (typeof cb == 'function') {
        s.onload = cb;
      }

      if (classes) {
        s.className = classes;
      }

      s.src = src;
      s.setAttribute('data-variant', dv);
      s.setAttribute('id', id);
      document.head.appendChild(s);
    }

    addSwogoContainers();
    addJsToPage('https://ui.swogo.net/bundles/v4/bootsCom/swogo.js', 'BO052', 'C')

  }

  if (VARIATION === "1") {
    //increasingly - horizontally stacked

var versionUpdate = (new Date()).getTime();
function loadAssets(incre_fileListToLoad) {
   var script = document.createElement("script")
   script.type = "text/javascript";
   script.src = incre_fileListToLoad[0].url;
   script.async = true;
   document.getElementsByTagName("head")[0].appendChild(script);
}
var incre_fileListToLoad = [{
   url: 'https://www.increasingly.co/Implementation/bTSx98/js/increasingly_bTSx98.js?v=' + versionUpdate,
   type: 'js'
}]
loadAssets(incre_fileListToLoad)

  }

  if (VARIATION === "2") {
    //increasingly - vertically stacked

    var versionUpdate = (new Date()).getTime();
function loadAssets(incre_fileListToLoad) {
   var script = document.createElement("script")
   script.type = "text/javascript";
   script.src = incre_fileListToLoad[0].url;
   script.async = true;
   document.getElementsByTagName("head")[0].appendChild(script);
}
var incre_fileListToLoad = [{
   url: 'https://www.increasingly.co/Implementation/bTSx98/js/increasingly_bTSx98v2.js?v=' + versionUpdate,
   type: 'js'
}]
loadAssets(incre_fileListToLoad)

  }

  if (VARIATION === "3") {
    //swogo - v1
    function addSwogoContainers() {
      const pdpMarkUp = '<div class="swogo-box" id="swogo-bundle-1"></div>';
      const basketMarkUp = '<div class="swogo-box" id="swogo-bundle-0"></div>';
      if (window.location.pathname.indexOf('OrderItemDisplay') > -1) {
        const basketEl = document.getElementById('basket_widget_right_bar');
        basketEl.insertAdjacentHTML('afterend', basketMarkUp);
      } else {
        const pdpEL = document.querySelector('.row.template_row_spacer')
        pdpEL.insertAdjacentHTML('beforebegin', pdpMarkUp);
      }
    }

    const addJsToPage = (src, id, dv, cb, classes) => {
      if (document.querySelector('#' + id)) {
        return;
      }

      var s = document.createElement('script');
      if (typeof cb == 'function') {
        s.onload = cb;
      }

      if (classes) {
        s.className = classes;
      }

      s.src = src;
      s.setAttribute('data-variant', dv);
      s.setAttribute('id', id);
      document.head.appendChild(s);
    }

    addSwogoContainers();
    addJsToPage('https://ui.swogo.net/bundles/v4/bootsCom/swogo.js', 'BO052', 'A')

    if (window.location.pathname.indexOf('OrderItemDisplay') > -1) {

  var checkSwogo = setInterval(function () {
      if (document.querySelector('.swogo-box')) {
        //do nothing, swogo exists
      }
      else {
        addSwogoContainers();
      }
  }, 1000)
  
  }
  
  }

  if (VARIATION === "4") {
    //swogo v2
    function addSwogoContainers() {
      const pdpMarkUp = '<div class="swogo-box" id="swogo-bundle-1"></div>';
      const basketMarkUp = '<div class="swogo-box" id="swogo-bundle-0"></div>';
      if (window.location.pathname.indexOf('OrderItemDisplay') > -1) {
        const basketEl = document.getElementById('basket_widget_right_bar');
        basketEl.insertAdjacentHTML('beforeend', basketMarkUp);
      } else {
        const pdpEL = document.querySelector('.row.template_row_spacer')
        pdpEL.insertAdjacentHTML('beforebegin', pdpMarkUp);
      }
    }

    const addJsToPage = (src, id, dv, cb, classes) => {
      if (document.querySelector('#' + id)) {
        return;
      }

      var s = document.createElement('script');
      if (typeof cb == 'function') {
        s.onload = cb;
      }

      if (classes) {
        s.className = classes;
      }

      s.src = src;
      s.setAttribute('data-variant', dv);
      s.setAttribute('id', id);
      document.head.appendChild(s);
    }

    addSwogoContainers();
    addJsToPage('https://ui.swogo.net/bundles/v4/bootsCom/swogo.js', 'BO052', 'B')

    if (window.location.pathname.indexOf('OrderItemDisplay') > -1) {

      var checkSwogo = setInterval(function () {
          if (document.querySelector('.swogo-box')) {
            //do nothing, swogo exists
          }
          else {
            addSwogoContainers();
          }
      }, 1000)
      
      }

  }

};
