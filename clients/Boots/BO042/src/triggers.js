/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','#userControlLinksBar #loggedIn_name', '#page #contentWrapper', 
() => {
    if(window.userObj && window.userObj.isLoggedIn === "true") {
        return true;
    }
}, 
() => {
    if(window.userObj && window.userObj.advantageCardFlag === "false") {
        return true;
    }
},
], activate);

