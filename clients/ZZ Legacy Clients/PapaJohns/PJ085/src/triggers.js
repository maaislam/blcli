/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.header.header_pj.mobileHeaderPJ .hInner .botOptions',
'#ctl00__objHeader_divSubMenProductMobile .offersMobileBtnContainer .offersBoxC',
() => {
  let poller = false;
  if (document.querySelector('#ctl00__objHeader_divSubMenProductMobile ul.sectionsMenu li') 
   && document.querySelectorAll('#ctl00__objHeader_divSubMenProductMobile ul.sectionsMenu li').length > 5) {
    poller = true;
  }

  return poller;
},
() => {
  let poller = false;
  if (window.location.pathname.indexOf('/pizzas') > -1
  || window.location.pathname.indexOf('/sides') > -1
  || window.location.pathname.indexOf('/drinks') > -1
  || window.location.pathname.indexOf('/desserts') > -1
  || window.location.pathname.indexOf('/vegan') > -1
  || window.location.pathname.indexOf('/offers') > -1
  || window.location.pathname.indexOf('/basket') > -1) {
    poller = true;
  }

  return poller;
},
() => !!window.jQuery,

], activate);
