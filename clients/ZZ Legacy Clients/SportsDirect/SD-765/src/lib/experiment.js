/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  pollerLite(['.swiper-container-sitewideBanner'], () => {

    let siteWideBannerSlideCloseIcons = document.querySelectorAll('.swiper-container-sitewideBanner .swiper-slide .closingIcon');
    let siteWideBannerSlideLinks = document.querySelectorAll('.swiper-container-sitewideBanner .swiper-slide a');
    let bannerContainer = document.querySelector('.swiper-container-sitewideBanner');

    let currURL = window.location.href;

    // Banner Container Hover

    // CHECK THIS WORKS ON MOBILE - remove hover on mob


    let bannerHovered = false;
    bannerContainer.addEventListener('mouseenter', () => {
      if(bannerHovered == false) {
        let currActiveSlide = document.querySelector('.swiper-container-sitewideBanner .swiper-slide-active');
        let currHoveredLink = currActiveSlide.querySelector('a').href;
        let currHoveredText = currActiveSlide.querySelector('.swiper-text').innerText;
        fireEvent(`Hover - user has hovered on the element "${currHoveredText}" which has a link of "${currHoveredLink}" on page: "${currURL}"`, true);
        bannerHovered = true;
      }
    });
    
    [].slice.call(siteWideBannerSlideCloseIcons).forEach((closeIcon) => {

      closeIcon.addEventListener('click', (e) => {
        let clickedSlide = e.currentTarget.closest('.swiper-slide');
        let slideText = clickedSlide.querySelector('.swiper-text').innerText;
        fireEvent(`Click - user has clicked on the close X for slide: "${slideText}" to close and hide the carousel on page: "${currURL}"`);
      });

    });

    [].slice.call(siteWideBannerSlideLinks).forEach((link) => {

      link.addEventListener('click', (e) => {
        let slideText = e.currentTarget.querySelector('.swiper-text').innerText;
        fireEvent(`Click - user has clicked link for slide: "${slideText}" taking them to "${e.currentTarget.href}" from page: "${currURL}"`);
      });

    })

  })
};
