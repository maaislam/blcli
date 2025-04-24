/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { PLP, homepage } from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#results-container .af-card', '.af-accordion-element', () => !!window.convert.$], PLP);

pollerLite(['body', '.af-topbar-wrapper', '.slick-slider + section.af-white-bg', () => window.location.pathname == '/', () => !!window.convert.$], homepage);
