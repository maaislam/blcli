/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '#departmentMenu',
    '.departmentMenuListItem #departmentLink_1860697',
    '.departmentMenuListItem #departmentLink_1595014',
], activate);
