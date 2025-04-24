import scrollToElement from './scrollTo';
import { pollerLite } from '../../../../../../../lib/uc-lib';
import { __ } from '../../helpers';
/** 
 * @desc Create the stick navigation
 */
export default () => {
  let contactLink = 'https://www.technogym.com/gb/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf';

  if (window.location.href.indexOf('/it/tapis-roulant') > -1){
    contactLink = 'https://www.technogym.com/it/contacts/?reason=catalogue&sku=MYRUN-CONFIGURABLE-EUROPE&type=conf'
  }

  const stickyNavigation = document.createElement('div');
  stickyNavigation.classList.add('TG069-sticky_nav_wrapper');
  stickyNavigation.innerHTML =
  `<div class="TG069-container">
    <ul>
      <li><a href="#TG069-overview">${__('Overview')}</a></li>
      <li><a href="#TG069-blocks">${__('Features')}</a></li>
      <li><a href="#TG069-app">App</a></li>
      <li><a href="#TG069-specification">${__('Specifications')}</a></li>
    </ul>
    <div class="TG069-cta">
      <div class="TG069-secondary_button TG069-button"><a class="TG069-request" target="_blank" href="${contactLink}">${__('Request a brochure')}</a></div>
      <div class="TG069-primary_button TG069-button"><a href="#TG069-mainProduct">${__('Buy online')}</a></div>
    </div>
  </div>`;

  const headerContainer = document.querySelector('.TG069-topContainer');
  headerContainer.appendChild(stickyNavigation);

  /**
   * @desc Add the back to the top button
   */
  const backToTop = () => {
    const backToTopButton = document.createElement('div');
    backToTopButton.classList.add('TG069-top_button');
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
    /* const stickyNav = document.querySelector('.TG069-sticky_nav_wrapper');
    const stop = stickyNav.getBoundingClientRect().top;
    const backToTopButton = document.querySelector('.TG069-top_button');
    console.log(stop);
    window.addEventListener('scroll', () => {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (scrollTop >= stop) {
        stickyNav.classList.add('TG069-nav_fixed');
        backToTopButton.classList.add('TG069_back-active');
      } else {
        stickyNav.classList.remove('TG069-nav_fixed');
        backToTopButton.classList.remove('TG069_back-active');
      }
    }, false); */
    const nav = document.querySelector('.TG069-sticky_nav_wrapper');
    const belowFold = document.querySelector('.TG069-belowFold_wrapper');
    const backToTopButton = document.querySelector('.TG069-top_button');

    window.onscroll = () => {
      const navOffset = (belowFold.getBoundingClientRect().y + window.scrollY) - 63;
      const scrollTop = (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;
      if (scrollTop >= navOffset) {
        nav.classList.add('TG069-nav_fixed');
        backToTopButton.classList.add('TG069_back-active');
      } else {
        nav.classList.remove('TG069-nav_fixed');
        backToTopButton.classList.remove('TG069_back-active');
      }
    };
  };

  const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll('.TG069-sticky_nav_wrapper a:not(.TG069-request)');
    for (let index = 0; index < anchorLinks.length; index += 1) {
      const element = anchorLinks[index];
      const sectionLink = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement(document.querySelector(sectionLink));

        [].forEach.call(document.querySelectorAll('.TG069-link_active'), (item) => {
          item.classList.remove('TG069-link_active');
          // Code here
        });
        element.classList.add('TG069-link_active');
      });
    }
  };

  backToTop();

  pollerLite(['.TG069-belowFold_wrapper'], () => {
    stickyFormTrigger();
  });

  smoothScroll();
};
