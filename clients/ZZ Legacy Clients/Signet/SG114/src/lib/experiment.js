/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import FinderBox from './finderMarkup';
import finderFunctionality from './questionLogic';


const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    
    const fullWidthBanner = () => {
      const homepageBanner = document.createElement('div');
      homepageBanner.classList.add(`${ID}-finderBanner`);
      homepageBanner.innerHTML = `
      <div class="${ID}-textContent">
        <h3>Valentines Day Gift Finder</h3>
        <p>We'll help you find the perfect gift</p>
        <div class="${ID}-finderTrigger">Get started</div>
      </div>`;
      document.querySelector('.home-tile-grid').insertAdjacentElement('afterend', homepageBanner);
    }
    const HSBanner = () => {
      const HShomepageBanner = document.querySelector('.home-tile-grid__text-tile');
      HShomepageBanner.classList.add(`${ID}-finderBanner`);
      HShomepageBanner.innerHTML = `
      <div class="${ID}-textContent">
        <h3>Valentines Day Gift Finder</h3>
        <p>We'll help you find the perfect gift</p>
        <div class="${ID}-finderTrigger">Get started</div>
      </div>`;
    }


    /**
     * Create banner for PLPs
     */
    const PLPbanner = () => {
      const finderBanner = document.createElement('div');
      finderBanner.classList.add(`${ID}-finderBanner`);
      finderBanner.innerHTML = `
      <div class="${ID}-textContent">
        <h3>Valentines Day Gift Finder</h3>
        <p>We'll help you find the perfect gift</p>
        <div class="${ID}-finderTrigger">Get started</div>
      </div>`;

      document.querySelector('.browse__header-section').insertAdjacentElement('beforebegin', finderBanner);
    }

     /**
     * Create banner for PLPs
     */
    const xmasBanner = () => {
      const finderBanner = document.createElement('div');
      finderBanner.classList.add(`${ID}-finderBanner`);
      finderBanner.innerHTML = `
      <div class="${ID}-textContent">
        <h3>Valentines Day Gift Finder</h3>
        <p>We'll help you find the perfect gift</p>
        <div class="${ID}-finderTrigger">Get started</div>
      </div>`;

      document.querySelector('.hero-banner').insertAdjacentElement('afterend', finderBanner);
    }

    /**
     * No results page
     */
    const noResults = () => {
      document.body.classList.add(`${ID}-noResults`);
      const notFoundTitle = document.querySelector('.l-not-found-page .c-page-title.l-not-found-page__title');
      notFoundTitle.textContent = "We don't have a match for your search";

      const searchAgainButton = `<div class="${ID}-finderTrigger">Search again</div>`;
      document.querySelector('.l-not-found-page__subtitle').outerHTML = searchAgainButton;
      
    }

    //Add overlay for all pages
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-finderOverlay"></div>`);


    // if homepage
    if(window.digitalData.page.pageInfo.pageType === 'Landing') {
      document.body.classList.add(`${ID}-landing`);
       HSBanner();
      new FinderBox();
      finderFunctionality();
      
    }
    // if PLPs
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      PLPbanner();
      new FinderBox();
      finderFunctionality();
    }
    
    // if no results page
    if(window.location.href.indexOf('&finder=1') > -1 && document.querySelector('.l-not-found-page')) {
      noResults();
      new FinderBox();
      finderFunctionality();
    }

    // if email query, auto start gift finder

    if (window.location.href.indexOf('showgiftfinder=true') > -1){

      document.querySelector('.SG114-finderTrigger').click();
    
    }

  }
};
