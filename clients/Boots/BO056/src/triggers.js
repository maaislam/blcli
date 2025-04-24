/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','.heroCarousel','.slick-track',

() => {
    if(localStorage.getItem('previousPagePaths') && localStorage.getItem('previousPagePaths') !== '') {
        const previousPages = localStorage.getItem('previousPagePaths');
        const lastVisited = JSON.parse(previousPages);
        if(lastVisited.slice(-1)[0] === '/') {
            return true;
        }
    }
}
], activate);
