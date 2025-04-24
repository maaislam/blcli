/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#maincontent .columns .column.main', '.form.subscribe.footer-newsletter__form', '.fieldset.create.address .legend span'], activate);
