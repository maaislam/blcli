/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const { ID } = shared;
const regex = new RegExp(`${ID}_persona`, 'g');
const hasCookie = regex.test(document.cookie);

if (!hasCookie) {
  pollerLite(['body'], activate);
}
