/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '.header__logo .logo__link .logo__img',
    '.main-nav a',
    '.shopping-bag',
], activate);
