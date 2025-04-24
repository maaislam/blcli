/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.ME263-gender',
'.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img img',
() => {
  let poller = false;
  if (document.querySelectorAll('.fotorama__stage__frame.fotorama__active.fotorama_vertical_ratio.fotorama__loaded.fotorama__loaded--img').length > 1) {
    poller = true;
  } 
  return poller;
},
], activate);
