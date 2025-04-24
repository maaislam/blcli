/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','#cu_newsletter_signup','#container_3074457345619270755',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.Optanon;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
],activate);
