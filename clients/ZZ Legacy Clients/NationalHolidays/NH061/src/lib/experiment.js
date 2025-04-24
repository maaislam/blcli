/**
 * NH061 - NH037 Iteration - Pushing trips to new users
 * @author User Conversion
 */
import globals from './global';
import { setup } from './services';
import settings from './settings';
import ExitIntent from '../components/ExitIntent/ExitIntent';
import { getClosest } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const experiment = {
  settings: {
    ID: settings.ID,
    $: window.jQuery,
  },

  cacheDOM: () => {
    const { $ } = experiment.settings;

    const topSection = document.querySelector('#main-body');
    const topContainer = topSection.parentElement;
    const content = topContainer.querySelector('#ctl00_ContentPane');
    const upcomingBreaks = Array.prototype.filter.call(document.querySelectorAll('h2'), el => el.innerText.trim() === 'Upcoming breaks & holidays').map(title => getClosest(title, 'section').parentElement)[0];
    const slider = document.querySelector('.price-slider').parentElement;
    const sliderArrows = slider.querySelectorAll('.slick-arrow');
    const $slider = $('.price-slider.slick-slider');

    experiment.cacheDOM = {
      topSection,
      topContainer,
      content,
      upcomingBreaks,
      slider,
      sliderArrows,
      $slider,
    };
  },

  changes: {
    /** Moves "Upcoming breaks & holidays" under top section */
    moveUpcomingBreaksSection: () => {
      const {
        topContainer,
        content,
        upcomingBreaks,
      } = experiment.cacheDOM;

      const {
        ID,
      } = experiment.settings;

      const newContainer = document.createElement('div');
      newContainer.className = `container ${ID}_contentWrap`;
      newContainer.appendChild(content);
      topContainer.insertAdjacentElement('afterend', newContainer);

      if (topContainer && upcomingBreaks) {
        topContainer.insertAdjacentElement('afterend', upcomingBreaks);
      }
    },
  },

  init: () => {
    setup();
    experiment.cacheDOM();
    globals.cacheDOM = experiment.cacheDOM;

    const pageInit = {
      /** Changes to apply to all pages */
      all: () => {
        pollerLite([
          '.price-slider.slick-slider',
          () => !!window.jQuery.fn.slick,
        ], () => {
          const exitIntent = new ExitIntent();
        });
      },

      /** Category page specific changes */
      category: () => {
        experiment.changes.moveUpcomingBreaksSection();
      },
    };
    pageInit.all();
    if (typeof pageInit[globals.pageType] === 'function') pageInit[globals.pageType]();
  },
};

export default experiment.init;
