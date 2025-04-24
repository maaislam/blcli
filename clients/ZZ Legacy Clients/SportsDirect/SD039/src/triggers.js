/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#BreadcrumbGroup .breadcrumb', 'li.MoreFromLinksRow:last-of-type a.MoreFromLink:last-of-type'], activate);
