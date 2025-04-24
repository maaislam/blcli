import scrollToElement from './scrollTo';
import { pollerLite } from '../../../../../../../../../lib/uc-lib';
import { __ } from '../../../../helpers';
/** 
 * @desc Create the stick navigation
 */
export default () => {
  const stickyNavigation = document.createElement('div');
  stickyNavigation.classList.add('TG103-sticky_nav_wrapper');
  stickyNavigation.innerHTML =
  `<div class="TG103-container">
    <ul>
      <li><a href="#TG103-overview">${__('Overview')}</a></li>
      <li><a href="#TG103-blocks">${__('Features')}</a></li>
      <li><a href="#TG103-app">${__('Catalogue')}</a></li>
      <li><a href="#TG103-specification">${__('Specifications')}</a></li>
    </ul>
    <div class="TG103-cta">
      <div class="TG103-secondary_button TG103-button"><a class="TG103-request" target="_blank" href="https://www.technogym.com/gb/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf">${__('Request a catalogue')}</a></div>
      <div class="TG103-primary_button TG103-button"><a href="#TG103-mainProduct">${__('Buy online')}</a></div>
    </div>
  </div>`;

  const headerContainer = document.querySelector('.TG103-topContainer');
  headerContainer.appendChild(stickyNavigation);

  /**
   * @desc Add the back to the top button
   */
  const backToTop = () => {
    const backToTopButton = document.createElement('div');
    backToTopButton.classList.add('TG103-top_button');
    backToTopButton.innerHTML = `<span></span><p>${__('Back to top')}</p>`;

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
      scrollToElement(document.body);
    });
  };
  /**
   * @desc make the navigation sticky
   */
  const stickyFormTrigger = () => {

    const nav = document.querySelector('.TG103-sticky_nav_wrapper');
    const belowFold = document.querySelector('.TG103-belowFold_wrapper');
    const backToTopButton = document.querySelector('.TG103-top_button');

    window.onscroll = () => {
      const navOffset = (belowFold.getBoundingClientRect().y + window.scrollY) - 63;
      const scrollTop = (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;
      if (scrollTop >= navOffset) {
        nav.classList.add('TG103-nav_fixed');
        backToTopButton.classList.add('TG103_back-active');
      } else {
        nav.classList.remove('TG103-nav_fixed');
        backToTopButton.classList.remove('TG103_back-active');
      }
    };
  };

  const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll('.TG103-sticky_nav_wrapper a:not(.TG103-request)');
    for (let index = 0; index < anchorLinks.length; index += 1) {
      const element = anchorLinks[index];
      const sectionLink = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement(document.querySelector(sectionLink));

        [].forEach.call(document.querySelectorAll('.TG103-link_active'), (item) => {
          item.classList.remove('TG103-link_active');
          // Code here
        });
        element.classList.add('TG103-link_active');
      });
    }
  };

  backToTop();

  pollerLite(['.TG103-belowFold_wrapper'], () => {
    stickyFormTrigger();
  });

  smoothScroll();
};
