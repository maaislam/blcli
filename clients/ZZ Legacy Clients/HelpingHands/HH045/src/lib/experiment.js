/**
 * HH044 - Mobile Call CTA Update
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID } = shared;
  const $ = window['j' + ''.trim() + 'Query'];

  // Remove existing carousel if it exists
  const existingCarousel = document.querySelector('.HH005_Wrap');
  if (existingCarousel) {
    existingCarousel.parentElement.removeChild(existingCarousel);
  }

  const trustbar = () => {
    const pageContainer = document.querySelector('#hero');
    pageContainer.insertAdjacentHTML('beforebegin', `
      <div class="HH005_Wrap">
        <section class="HH005_landing_wrap HH005_Content_Carousel HH045-amended">
          <div class="HH005_Content_Wrap container">
              <a href="/about-us/cqc-regulated-service/" class="HH005_USP_Link" data-hh005="USP 1">
                <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-5.png" alt="care quality commission" class="cqc-icon wrap-icon" />
                <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-4.png" alt="care inspectorate wales" class="ciw-icon wrap-icon" />
                <span class="icon-text">CQC &amp; CIW <span class="bold">Regulated</span></span>
              </a>
              <a href="/home-care-services/" class="HH005_USP_Link" data-hh005="USP 2">
                <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-3.png" alt="timepiece icon" class="time-icon wrap-icon" />
                <span class="icon-text"><span class="bold">Fast</span> response &amp; <span class="bold">immediate</span> start</span>
              </a>
              <a href="/home-care-services/" rel="noopener, noreferrer" target="_blank" class="HH005_USP_Link" data-hh005="USP 3">
                <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-1.png" alt="Trustpilot icon" class="trust-icon wrap-icon" />
                <span class="icon-text">Rated <span class="bold">excellent</span> on Trustpilot</span></span>
              </a>
              <a href="/about-us/why-choose-helping-hands/" class="HH005_USP_Link managed-link-disappear" data-hh005="USP 4">
                <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-2.png" alt="Managed Service Icon" class="service-icon wrap-icon" />
                <span class="icon-text"><span class="bold">Locally</span> managed service</span>
              </a>
          </div>
        </section>
      </div>
    `);

    if (shared.VARIATION === '2') {
      pollerLite([() => !!document.querySelector('.HH035_stickyNav > .HH035_stickyBar') || !!document.querySelector('.mobile .HH035_stickyNav')], () => {
        const stickybar = document.querySelector('.HH035_stickyNav > .HH035_stickyBar') || document.querySelector('.mobile .HH035_stickyNav');
        stickybar.insertAdjacentHTML('beforeend', `
          <div class="HH005_Wrap">
            <section class="HH005_landing_wrap HH005_Content_Carousel HH045-amended">
              <div class="HH005_Content_Wrap container">
                  <a href="/about-us/cqc-regulated-service/" class="HH005_USP_Link" data-hh005="USP 1">
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-5.png" alt="care quality commission" class="cqc-icon wrap-icon" />
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-4.png" alt="care inspectorate wales" class="ciw-icon wrap-icon" />
                    <span class="icon-text">CQC &amp; CIW <span class="bold">Regulated</span></span>
                  </a>
                  <a href="/home-care-services/" class="HH005_USP_Link" data-hh005="USP 2">
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-3.png" alt="timepiece icon" class="time-icon wrap-icon" />
                    <span class="icon-text"><span class="bold">Fast</span> response &amp; <span class="bold">immediate</span> start</span>
                  </a>
                  <a href="/home-care-services/" rel="noopener, noreferrer" target="_blank" class="HH005_USP_Link" data-hh005="USP 3">
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-1.png" alt="Trustpilot icon" class="trust-icon wrap-icon" />
                    <span class="icon-text">Rated <span class="bold">excellent</span> on Trustpilot</span></span>
                  </a>
                  <a href="/about-us/why-choose-helping-hands/" class="HH005_USP_Link managed-link-disappear" data-hh005="USP 4">
                    <img src="https://ab-test-sandbox.userconversion.com/experiments/HH045-2.png" alt="Managed Service Icon" class="service-icon wrap-icon" />
                    <span class="icon-text"><span class="bold">Locally</span> managed service</span>
                  </a>
              </div>
            </section>
          </div>
        `);
      });
    }

    // Configure Slick
    $('.HH005_Wrap > section > .HH005_Content_Wrap').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 890,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 4000,
          },
        },
      ],
    });

    pollerLite(['.HH041-hero'], () => {
      // HH041 is running so move USP bar
      $('#hero').prev('.HH005_Wrap').insertBefore('.HH041-hero');
    });
  };

  // Initialise Slick slider
  if ($.fn.slick) {
    trustbar();
  } else {
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
      trustbar();
    });
  }
};
