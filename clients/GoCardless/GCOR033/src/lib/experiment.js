/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './helper/observeDOM';
import { addCssToPage, addJsToPage } from './helper/injectSliderLibrary';
import { pollerLite } from "../../../../../lib/utils";
import { newPayment, payment, paymentRequest } from './files/data';
import { initSlick } from './helper/initSlick';
import { videoSection } from './component/videoModal';
import clickHandler from './helper/clickHandler';
import { checkUrls } from './files/checkUrls';

const { ID, VARIATION } = shared;

const init = () => {

  if (document.querySelector(`.${ID}__learn-more-content`)) {
    document.querySelector(`.${ID}__learn-more-content`).remove();
  }

  if (VARIATION == 'control') {
    return;
  }

  //add slick js

  const JQueryCDN = "https://code.jquery.com/jquery-3.6.4.js";
  const slickJs = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js";
  const slickCss = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css";

  addJsToPage(JQueryCDN, `${ID}__jquery`);
  setTimeout(function () {
    addCssToPage(slickCss, `${ID}__slickcss`);
    addJsToPage(slickJs, `${ID}__slickjs`);
  }, 1000)


  setTimeout(() => {

    if (
      checkUrls() &&
      !window.location.href.includes("https://gocardless.com/solutions/learn-more/")
    ) {

      // Make a GET request to the URL using the Fetch API
      fetch('https://gocardless.com/solutions/learn-more/')
        // When the response is received, convert the response body to text
        .then(response => response.text())
        .then(html => {
          // Main markup
          const myHTML = `<div id="${ID}__learn-more" class="${ID}__learn-more-content">${html}</div>`;

          // Add markup
          if (!document.querySelector(`.${ID}__learn-more-content`)) {

            document.querySelector('.css-ij8wv0').insertAdjacentHTML("beforebegin", myHTML);

            // Load lazy load images
            document.querySelectorAll(`.${ID}__learn-more-content img[loading="lazy"]`).forEach(function (lazyImg) {
              if (lazyImg.hasAttribute('data-src')) {
                let loadImg = lazyImg.getAttribute('data-src');
                lazyImg.setAttribute('src', loadImg);
              }
            });

            // poll  for slick slider
            pollerLite([
              'body',
              `.css-12afgtl a[href="https://gocardless.com/solutions/learn-more/"]`,
              () => window.jQuery !== undefined,
              () => jQuery.fn.slick,
            ], () => {

              // add new class to the slider parent element
              document.querySelector('ul.css-lfnp7').classList.add('new-slider');
              document.querySelector('ul.css-lfnp7').classList.remove('css-lfnp7');

              setTimeout(() => {
                // initiate slick slider
                initSlick('ul.new-slider');
              }, 1000);

              // Add markup of the video section
              document.querySelector('#our-customers-love-us .css-x135zj').innerHTML = videoSection(ID);

              // Modify Learn more cta ad add anchor ID
              document.querySelectorAll('.css-12afgtl a[href="https://gocardless.com/solutions/learn-more/"]')[0].setAttribute('href', '#GCOR033__learn-more');

              // set initial stage for custom arrordion
              document.querySelectorAll('.css-159a7dd').forEach(function (target, i) {

                if (i === 0) {
                  target.querySelector('button').classList.add(`active-button`);
                  target.querySelector('button+div').classList.add(`active-dropdown`);
                }
                target.querySelector('button').classList.add(`custom-button${i}`, `custom-button`);
                target.querySelector('button+div').classList.add(`custom-copy${i}`, 'custom-copy');

              })


              // click event listener
              document.addEventListener("click", function (event) {

                const { target } = event;

                // click handler for slider prev button
                if (target.closest('.css-f1v3ns')) {
                  document.querySelector(`.${ID}__learn-more-content .slick-prev`).click();

                }

                // click handler for slider next button
                if (target.closest(`.${ID}__learn-more-content .css-5nsdc9`)) {
                  document.querySelector('.slick-next').click();
                }

                // Click handler for custom accordion
                if (target.closest(`.custom-button`) && !target.closest(`.active-button`)) {
                  document.querySelector('.custom-button.active-button+div').classList.remove(`active-dropdown`);
                  document.querySelector('.custom-button.active-button').classList.remove(`active-button`);

                  if (target.closest(`.custom-button0`)) {

                    document.querySelector('.custom-button0').classList.add(`active-button`);
                    document.querySelector('.custom-button0+div').classList.add(`active-dropdown`);
                    document.querySelectorAll('.css-jxhqf3 picture img')[0].setAttribute('src', newPayment());
                    document.querySelectorAll('.custom-copy0 picture img')[0].setAttribute('src', newPayment());
                  }

                  if (target.closest(`.custom-button1`)) {

                    document.querySelector('.custom-button1').classList.add(`active-button`);
                    document.querySelector('.custom-button1+div').classList.add(`active-dropdown`);
                    document.querySelectorAll('.css-jxhqf3 picture img')[0].setAttribute('src', paymentRequest());
                    document.querySelectorAll('.custom-copy1 picture img')[0].setAttribute('src', paymentRequest());

                  }

                  if (target.closest(`.custom-button2`)) {

                    document.querySelector('.custom-button2').classList.add(`active-button`);
                    document.querySelector('.custom-button2+div').classList.add(`active-dropdown`);
                    document.querySelectorAll('.css-jxhqf3 picture img')[0].setAttribute('src', payment());
                    document.querySelectorAll('.custom-copy2 picture img')[0].setAttribute('src', payment());

                  }

                }

              })

            });

          }
        })
        // If an error occurs during the request, log it to the console
        .catch(error => console.error(error));
    }

  }, 2000);

}

export default () => {

  setup();
  fireEvent('Conditions Met');

  init();
  observeDOM('body', init);

  //alert('check 01')
  document.body.addEventListener('click', clickHandler);

};
