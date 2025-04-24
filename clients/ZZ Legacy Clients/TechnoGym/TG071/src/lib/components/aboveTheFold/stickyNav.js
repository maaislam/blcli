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
  stickyNavigation.classList.add('TG071-sticky_nav_wrapper');
  stickyNavigation.innerHTML =
  `<div class="TG071-container">
    <ul>
      <li><a href="#TG071-overview">${__('Overview')}</a></li>
      <li><a href="#TG071-blocks">${__('Features')}</a></li>
      <li><a href="#TG071-app">App</a></li>
      <li><a href="#TG071-specification">${__('Specifications')}</a></li>
    </ul>
    <div class="TG071-cta">
      <div class="TG071-secondary_button TG071-button"><a class="TG071-request" target="_blank" href="${contactLink}">${__('Brochure')}</a></div>
      <div class="TG071-primary_button TG071-button"><a href="#product-options-wrapper">${__('Buy')}</a></div>
    </div>
  </div>`;

  const headerContainer = document.querySelector('.TG071-topContainer');
  headerContainer.appendChild(stickyNavigation);

  /**
   * @desc Add the back to the top button
   */
  const backToTop = () => {
    const backToTopButton = document.createElement('div');
    backToTopButton.classList.add('TG071-top_button');
    backToTopButton.innerHTML = `<span></span><p>${__('Back to top')}</p>`;

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
      scrollToElement(document.body);
    });
  };

  /**
   * @desc make the links in to a slider
   */
  const linkSlider = () => {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      jQuery('.TG071-container ul').slick({
        infinite: true,
        slidesToShow: 3,
        adaptiveHeight: true,
        arrows: true,
        centerMode: true,
        centerPadding: '25px',
      });
    });
  };
  /**
   * @desc make the navigation sticky
   */
  const stickyFormTrigger = () => {
    const nav = document.querySelector('.TG071-sticky_nav_wrapper');
    const belowFold = document.querySelector('.TG071-belowFold_wrapper');
    const backToTopButton = document.querySelector('.TG071-top_button');

    window.onscroll = () => {
      const navOffset = (belowFold.getBoundingClientRect().y + window.scrollY) - 63;
      const scrollTop = (document.documentElement && document.documentElement.scrollTop)
      || document.body.scrollTop;
      if (scrollTop >= navOffset) {
        nav.classList.add('TG071-nav_fixed');
        backToTopButton.classList.add('TG071_back-active');
      } else {
        nav.classList.remove('TG071-nav_fixed');
        backToTopButton.classList.remove('TG071_back-active');
      }
    };
  };

  const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll('.TG071-sticky_nav_wrapper a:not(.TG071-request)');
    for (let index = 0; index < anchorLinks.length; index += 1) {
      const element = anchorLinks[index];
      const sectionLink = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement(document.querySelector(sectionLink));
        [].forEach.call(document.querySelectorAll('.TG071-link_active'), (item) => {
          item.classList.remove('TG071-link_active');
        });
        element.classList.add('TG071-link_active');
      });
    }
  };

  backToTop();

  pollerLite(['.TG071-belowFold_wrapper'], () => {
    stickyFormTrigger();
  });

  smoothScroll();
  linkSlider();
};
