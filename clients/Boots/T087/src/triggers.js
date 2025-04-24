/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','#estore_Pagination_template_container','.plp_gridView_redesign ul li',
() => {
    return !!window.jQuery
},
], activate);
