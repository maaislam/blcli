/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#searchBar', '#main','.oct-grid-aem__cell__width--firstRow', '.oct-template',
() => {
    return !!window.BO115SearchTerms
}
], activate);


