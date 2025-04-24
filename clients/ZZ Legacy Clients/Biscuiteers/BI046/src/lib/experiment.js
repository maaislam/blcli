/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';
import carouselConfig from './carousel-config';

/**
 * Entry point for experiment
 */
export default () => {
  if(window.location.href.match(/#filters/ig)) {
    return;
  }

  setup();

  // ---------------------------------------------------------
  // Render experiment
  // ---------------------------------------------------------
  const run = () => {
    const target = document.querySelector('category-view .wrap');
    if(target) {
      let html = `<div class="${shared.ID}-carousel-wrapper ${shared.ID}-DOD">`;
      html += `
        <h2>all biscuits</h2>
        <h3>unique biscuits by occasion</h3>
        <div class="${shared.ID}-carousel-wrapper__scroll">
        <div class="${shared.ID}-carousel-wrapper__carousel">
      `;

      carouselConfig.forEach((item) => {
        html += `
          <a data-ident="${item.title.replace(/\s/g, '')}" href="${item.link}" class="${shared.ID}-carousel-wrapper__carousel-item">
            <div class="${shared.ID}-carousel-wrapper__carousel-item-imgwrap">
              <img src="${item.image}">
            </div>
            <span class="${shared.ID}-carousel-wrapper__carousel-item-title">
              ${item.title}
            </span>
          </a>
        `;
      });

      html += '</div></div></div>';

      target.insertAdjacentHTML('beforebegin', html);
    }
  };

  run();

  const grid = document.querySelector('category-view .grid');
  if(grid) {
    addObserver(grid, () => {
      const carouselWrapper = document.querySelector(`.${shared.ID}-carousel-wrapper`);

      if(window.location.href.match(/#filters/ig)) {
        if(carouselWrapper) {
          carouselWrapper.parentNode.removeChild(carouselWrapper);
        } 
      } else {
        if(!carouselWrapper) {
          run();
        }  
      }
    });
  }
};
