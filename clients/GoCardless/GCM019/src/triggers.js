/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { pageConfig } from './lib/data';

const targetPage = JSON.stringify(pageConfig[window.location.pathname]);
const isValidPage = targetPage !== '{}' && targetPage !== undefined;
const pageData = pageConfig[window.location.pathname];
const waitFormElem = pageData?.attachTo;

if (isValidPage) {
  pollerLite(['body', 'main', waitFormElem], () => {
    activate(pageData);
  });
}