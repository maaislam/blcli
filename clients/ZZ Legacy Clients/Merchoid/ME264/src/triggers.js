/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', 'meta[property="og:brand"]', '#maincontent',
() => {
    return !!window.dataLayer[0].google_tag_params["ecomm_category"]
}
], activate);
