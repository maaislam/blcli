/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const { ID } = shared;

pollerLite(['body', '[class^="PDPDemoUpButton__DemoUpButtonWrapper"]'], () => {
  document.body.classList.remove(`${ID}__validsku`);
  activate();
});
