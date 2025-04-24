/**
 * MP182 -  View All Quick Links
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import data from './quicklinksData';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here
  // --- Get Pathname
  const pathname = window.location.pathname;
  // --- Attach new container after the filters
  const filtersContainer = document.querySelector('.row.productFilter_filterSelectors.p-2');
  // --- Generate quicklinks container
  const quickLinksContainer = `<div class="${shared.ID}-quicklinks__wrapper">
    <div class="${shared.ID}-quicklinks__content">
      <ul class="${shared.ID}-quicklinks"></ul>
    </div>
  </div>`;

  filtersContainer.insertAdjacentHTML('afterend', quickLinksContainer);

  const quickLinksWrapper = document.querySelector(`.${shared.ID}-quicklinks__wrapper`);
  const quickLinksList = quickLinksWrapper.querySelector(`ul.${shared.ID}-quicklinks`);
  let quickLinks = '';

  let slideAmt = 0;

  // -- Get Quick Links and Populate list
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === pathname) {
        const el = data[key];
        for (const i in el) {
          const item = el[i];
          if (shared.VARIATION === '1') {
            quickLinks += `<a class="${shared.ID}-link__v${shared.VARIATION}" href="${item.link}">
              <div class="${shared.ID}-quicklink__wrapper">
                <div class="${shared.ID}-img" style="background-image: url('${item.img}')"></div>
                <li>${item.title}</li>
              </div>
            </a>`;

            quickLinksWrapper.classList.add(`v${shared.VARIATION}`);
          } else if (shared.VARIATION === '2') {
            quickLinks += `<a class="${shared.ID}-link__v${shared.VARIATION}" href="${item.link}">
              <div class="${shared.ID}-quicklink__wrapper">
                <li>${item.title}</li>
              </div>
            </a>`;
            quickLinksWrapper.classList.add(`v${shared.VARIATION}`);
          }

          slideAmt += 1;
        }

        quickLinksList.insertAdjacentHTML('afterbegin', quickLinks);
      }
      
    }
  }

  // --- Initiate Slick Carousel for VARIATION 1
  if (shared.VARIATION === '1') {
    
    // Slick Slider
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      $(`ul.${shared.ID}-quicklinks`).slick({
        dots: false,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: true,
        centerPadding: '40px',
        cssEase: 'linear',
        mobileFirst: true,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 679,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
        //   // You can unslick at a given breakpoint now by adding:
        //   // settings: "unslick"
        //   // instead of a settings object
        ]
      });
    });


  }


  // Add events
  const addedLinks = document.querySelectorAll('a[class*="MP182-link"]');
  const clickEvent = () => {
    events.send('MP182', 'MP182 Click', 'User clicked on category link');
  }
  if (addedLinks) {
    for (let i = 0; addedLinks.length > i; i += 1) {
      addedLinks[i].addEventListener('click', clickEvent);
    }
  }
};
