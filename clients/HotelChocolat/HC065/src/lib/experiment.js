/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import Accordion from './components/accordions';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();


  if(VARIATION !== 'control') {
    new Accordion();

    // move klarna
    const klarna = document.querySelector('#klarna-placement-cart');
    if(klarna) {
      document.querySelector('.pdpForm').appendChild(klarna);
    }

    if(document.querySelector('.HC064-valueMessaging')) {
      document.querySelector('.HC065-accordion').insertAdjacentElement('afterend', document.querySelector('.HC064-valueMessaging')); 
    }

    // on window resize
    /*window.addEventListener('resize', function(event){
     
      if( document.querySelectorAll('.component-wrapper .component-content') &&  document.querySelectorAll('.component-wrapper .component-content').length > 1) {
        for (let index = 0; index < allMenus.length; index += 1) {
          const element = document.querySelectorAll('.component-wrapper .component-content')[index];
          if(index === 0) {
            console.log(element)
          } else {
            element.remove();
          } 
        }
      }
    }, true);*/
   
  }

};
