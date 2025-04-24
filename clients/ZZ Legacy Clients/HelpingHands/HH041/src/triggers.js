/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import hh024 from './lib/hh024';


if(window.location.pathname.match(/our-locations\/[\w\d-_]+\/?(\?.+)?$/i)) {
  pollerLite([
    () => !!window['j' + ''.trim() + 'Query'],
    'html.mobile'
  ], () => {
    document.body.classList.add('HH024-is-in-HH041');
    hh024();
  });

  pollerLite([
    'body',
    '.contact .phone-number',
    '#hero h1',
    '.wpsl-location-address',
    '.bookhomevisit form .ui-datepicker-calendar',
    '.HH024_Box1 .HH024_Box_Elements',
    () => !!window['j' + ''.trim() + 'Query'],
  ], activate);
}
