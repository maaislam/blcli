/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite, events, throttle } from '../../../../../lib/utils';
import { setup, afterJQueryLoads } from './services';
import panels from './panels';
import shared from './shared';

export default () => {

  // See whether we want to inject anything on this page.
  const matchPageToPanel = () => {
    const { pathname } = window.location;
    let panel = null;

    panels.forEach((page) => {
      page.url.forEach((slug) => {
        if (pathname.indexOf(slug) !== -1) {
          panel = page.panel;
        }
      });
    });

    return panel;
  };

  // Event tracking - detect if the panel is scrolled into view
  let tracked = false;
  const elementScrolled = (elem) => {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    const elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
  };


  // Write experiment code here
  const runExperiment = () => {
    // Prevent duplication.
    if ($(`.${shared.ID}_wrapper`).length) return;

    const panel = matchPageToPanel();
    const localeUrl = document.querySelector('.home-link').getAttribute('href'); // /uk/, /ca/, etc.
    const baseUrl = `https://www.wolfandbadger.com${localeUrl}christmas/`;

    // Load in Xmas panels from the Xmas gift page.
    $('.product-list').after(`<aside class="${shared.ID}_wrapper"></aside>`);
    $(`.${shared.ID}_wrapper`).load(`${baseUrl} ${panel}`, () => {

      // Add event tracking to link clicks in the loaded panel.
      $(`.${shared.ID}_wrapper`).find('a').click(() => {
        events.send(shared.ID, 'Click', 'Panel link clicked');
      });
    });

    // On scroll, check if the test is now in view.
    $(window).scroll(throttle(() => {
      // Run only once per page view.
      if (!tracked) {
        if (elementScrolled(`.${shared.ID}_wrapper`)) {
          events.send(shared.ID, 'View', 'Customer has seen the test');
          tracked = true;
        }
      }
    }, 100));
  };

  const init = () => {
    pollerLite([
      '.product-list',
    ], () => {
      afterJQueryLoads(runExperiment);
    });
    setup();
  };

  init();
};
