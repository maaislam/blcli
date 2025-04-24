/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { pageConfig } from './lib/data';

const geo = window.location.pathname.includes('/fr-fr/') ? 'fr' : 'es';
const isValidPage = JSON.stringify(pageConfig[geo][window.location.pathname]) !== '{}';
console.log(isValidPage);
const pageData = pageConfig[geo][window.location.pathname];
const waitFormElem = pageData.attachTo;

if (isValidPage) {
  pollerLite(['body', 'main', waitFormElem], () => {
    activate(pageData, geo);
  });
}
