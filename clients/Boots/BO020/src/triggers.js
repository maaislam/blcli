/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.button_footer_line.myAccountAddressButton',
'#WC__NameEntryForm_FormInput_postcode_1',
'.button_footer_line.myAccountAddressButton .button.primary',
'#MessageArea',
], activate);
