/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// '.menuList',
// 'a.greenButton',
'.basketIcon',
() => {
  let poller = false;
  if (window.location.pathname.indexOf("/sides.aspx") > -1
  || window.location.pathname.indexOf("/pizzas.aspx") > -1
  || window.location.pathname.indexOf("/vegan.aspx") > -1
  || window.location.pathname.indexOf("/drinks.aspx") > -1
  || window.location.pathname.indexOf("/desserts.aspx") > -1) {
    poller = true;
  }

  return poller;
},
], activate);
