/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


pollerLite([
  'body.store-uk', 'ul.header__links', '.header', '.link.menu__inner-link', '.showcart'
], activate);
