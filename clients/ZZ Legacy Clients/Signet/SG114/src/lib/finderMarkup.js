/**
 * Markup for the gift finder box
 */

import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default class FinderBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-finderBox-wrapper`);

    element.innerHTML = 
    `<div class="${ID}-finderBox">
      <div class="${ID}-loader"><div class="${ID}-loaderContent"><span></span><p>Loading your gift results...</p></div></div>
      <div class="${ID}-closeFinder"></div>
        <div class="${ID}-finderTitle">
          <div class="${ID}-container">
            <span></span><h2>Gift Finder</h2>
          </div>
        </div>
        <div class="${ID}-finderOptions">
          <div class="${ID}-options ${ID}-question" step-no="">
            <p class="${ID}-optionsTitle"></p>
            <p class="${ID}-error">Please choose an option</p>
            <div class="${ID}-innerOptions"></div>
          </div>
          <div class="${ID}-buttons">
                <div class="${ID}-back ${ID}-button" data-step="0">Back</div>
                <div class="${ID}-next ${ID}-button" data-step="1">Next</div>
          </div>
        </div>
      </div>`;
    this.component = element;
  }

  bindEvents () {
    const { component } = this;

    const closeFinder = () => {
      component.classList.remove(`${ID}-finderActive`);
      document.body.classList.remove(`${ID}-noScroll`);
      document.querySelector(`.${ID}-finderOverlay`).classList.remove(`${ID}-overlayActive`);
      events.send(`${ID} variation:${VARIATION}`, 'click', 'close gift finder');

      if(document.querySelector(`.${ID}-loader`).classList.contains(`${ID}-loaderShow`)) {
        document.querySelector(`.${ID}-loader`).classList.remove(`${ID}-loaderShow`);
      }

    }

    const openFinder = () => {
      component.classList.add(`${ID}-finderActive`);
      document.body.classList.add(`${ID}-noScroll`);
      document.querySelector(`.${ID}-finderOverlay`).classList.add(`${ID}-overlayActive`);
      events.send(`${ID} variation:${VARIATION}`, 'click', 'open gift finder');
    }

    const closeFinderEl = component.querySelector(`.${ID}-closeFinder`);
    closeFinderEl.addEventListener('click', () => {
        closeFinder();
    });

    const overlay = document.querySelector(`.${ID}-finderOverlay`);
    overlay.addEventListener('click', () => {
        closeFinder();
    });

    const christmasBanner = document.querySelector(`.${ID}-finderTrigger`);
    christmasBanner.addEventListener('click', () => {
      openFinder();
    });
  }


  render() {
    const { component } = this;
    document.body.appendChild(component);    

    // move back button
    if(window.innerWidth >= 1024) {
      const back = document.querySelector(`.${ID}-buttons .${ID}-back`);
      document.querySelector(`.${ID}-finderTitle`).insertAdjacentElement('afterbegin', back);
    }
  }
}

