/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION} = shared;

const startExperiment = () => {
  




  
pollerLite([' .main-header'], () => {
 
  // to add class in the header
    var header = document.querySelector('.main-header');
 
   // Add the 'fixed_header' class to the header element
   
    header.classList.add('fixed_header');

  });

  pollerLite(['.kr-footer'], () => {
    const elem= `<div id="banner" class="kg-sticky-banner"><a class="kg_1S">Calculate you tax-free amount</a></div>`
    const heading = document.querySelector('.kr-footer');
    heading.insertAdjacentHTML('beforeend', elem);
   
      function getScrollPercentage() {
        return (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      }
      
      // Function to show or hide the banner based on scroll percentage
      function checkScrollAndShowBanner() {
        const scrollThreshold = 11; // Set your scroll percentage threshold
        const banner = document.getElementById('banner'); //banner id or class
        
       // Check if the device width is less than or equal to 768px (mobile breakpoint)
        if (banner && window.innerWidth <= 768 && getScrollPercentage() > scrollThreshold) {
          banner.style.display = 'block';
        } else {
          banner.style.display = 'none'; // Ensure the banner is hidden on larger screens
        }
        
      }
      
      // Event listeners for scroll and page load
      window.addEventListener('scroll', checkScrollAndShowBanner);
      window.addEventListener('load', checkScrollAndShowBanner);
    });
  

 
 
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if ((target.closest('.fixed_header') || target.closest('.kg-sticky-banner')) && target.closest('a')) {
      fireEvent('Sticky Banner Clicked');
    }
  });

  if (isMobile()) {
    document.body.insertAdjacentHTML('afterbegin', elem);
    //use intersection observer
    const elementToObserver = document.querySelector('#who-is-key + h2');

    const callback = (entry) => {
      const { isIntersecting, boundingClientRect } = entry;

      const stickyBanner = document.querySelector('.kg-sticky-banner');

      if (isIntersecting || boundingClientRect.y < 0) {
        stickyBanner.classList.add('slide-in-bottom');
        fireEvent('Conditions Met');
      } else {
        stickyBanner.classList.remove('slide-in-bottom');
      }
    };

    obsIntersection(elementToObserver, 0.5, callback);

    return;
  }

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const nav = document.querySelector('.navigation');
    if (scrollTop > lastScrollTop && !isMobile()) {
      // Scrolling down

      nav.classList.remove('fixed_header');
    } else if (scrollTop < lastScrollTop && !isMobile()) {
      // Scrolling up

      nav.classList.add('fixed_header');
      fireEvent('Conditions Met');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });
};
