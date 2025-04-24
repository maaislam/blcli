/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

pollerLite(['body',
'.optanon-alert-box-wrapper',
'.optanon-toggle-display.cookie-settings-button',
'.optanon-allow-all.accept-cookies-button',
() => {
    return !!window.Optanon
},
() => {
    if(!getCookie('OptanonAlertBoxClosed')) {
        return true
    }
}
], activate);
