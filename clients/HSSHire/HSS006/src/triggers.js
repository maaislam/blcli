/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.item_row1 .row .col-md-4',
// -- Detects not logged in users
'ul.login_credential li.login a.drop_trigger > div.my_account',
], activate);
