/**
 * MP171 - Furniture page rebuild
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import page from './page';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  if (window.location.href == 'https://www.mamasandpapas.com/en-gb/furniture') {
    pollerLite(['#page > .row'], () => {
      const ref = document.querySelector('#page > .row');
      page(ref);
    });
  }


  // Check for PPC link
  if (window.location.href == 'https://www.mamasandpapas.com/en-gb/c/nursery/nursery-furniture') { // Not visited Via the nav
    const prevPage = document.referrer;
    if (prevPage.indexOf('mamasandpapas') == -1) {
      // Not MP, redirect to https://www.mamasandpapas.com/en-gb/furniture
      window.location.href = 'https://www.mamasandpapas.com/en-gb/furniture';
    }
  }

  pollerLite(['header a'], () => {
    const furnitureLinks = document.querySelectorAll('header a');
    if (furnitureLinks) {
      for (let i = 0; furnitureLinks.length > i; i += 1) {
        if (furnitureLinks[i].getAttribute('href') == '/en-gb/c/nursery-furniture') {
          console.log(furnitureLinks[i]);
          furnitureLinks[i].setAttribute('href', '/en-gb/furniture');
        }
      }
    }
  });

  // Mobile links
  pollerLite(['.nav_group li a'], () => {
    const furnitureLinks = document.querySelectorAll('.nav_group li a');
    if (furnitureLinks) {
      for (let i = 0; furnitureLinks.length > i; i += 1) {
        if (furnitureLinks[i].getAttribute('href') == '/en-gb/c/nursery-furniture') {
          console.log(furnitureLinks[i]);
          furnitureLinks[i].setAttribute('href', '/en-gb/furniture');
        }
      }
    }
  });

};

export default activate;