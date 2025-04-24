/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const checkStorage = name => window.localStorage.getItem(name);

pollerLite(['body', () => {
    let run = false;
    if (document.querySelector('#rptStoreId') || checkStorage('PJ-sid')) {
        run = true;
    }
    console.log('run = ', run);
    return run;
}], activate);

