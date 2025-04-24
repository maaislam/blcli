/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { sendHttpRequest, insertAfterElement, pollerLite, elementIsInView } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import Swiper from "swiper/swiper-bundle";
//import Swiper, { Navigation } from 'swiper';



export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const getTodaysDate = () => {
    const d = new Date();

    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const getDayDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d1.getTime() - d2.getTime());

    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const storedDate = localStorage.getItem(`${ID}-LastVisitedDate`);

  if (!storedDate) localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());

  if (storedDate && getDayDifference(storedDate, getTodaysDate()) > 7) {
    localStorage.setItem(`${ID}-LastVisitedDate`, getTodaysDate());
    localStorage.removeItem(`${ID}-RecentlyViewedItems`);
  }

  const recentlyViewedItems = JSON.parse(localStorage.getItem(`${ID}-RecentlyViewedItems`));

  if (!recentlyViewedItems) localStorage.setItem(`${ID}-RecentlyViewedItems`, '[]');

  pollerLite(['#estore_productpage_template_container'], () => {
    const isPDP = document.querySelector('#estore_productpage_template_container');

    if (isPDP) {
      if (recentlyViewedItems && recentlyViewedItems.length === 10) {
        recentlyViewedItems.shift();
      }
      if (recentlyViewedItems && recentlyViewedItems.length < 10) {
        const productURL = window.location.href;
        const newItems = [...recentlyViewedItems, productURL];

        if (!recentlyViewedItems.includes(productURL)) {
          localStorage.setItem(`${ID}-RecentlyViewedItems`, JSON.stringify(newItems));
        }
      }
    }
  });

  const isHomepage = window.location.pathname === '/' || window.location.pathname === '/TopCategoriesDisplay';

  if (isHomepage && !!recentlyViewedItems) {

    pollerLite(['.oct', '.oct-experience-fragment', '.oct-grid', '.oct-grid__row', '.oct-template', '.oct-grid__row.oct-grid__row--full-width .oct-grid__cell.oct-grid__cell--width-12.oct-grid-aem__cell.oct-grid-aem__cell__width--firstRow.oct-grid-aem__cell__width--lastRow .oct-carousel-horizontalnav'], () => {
      if (getDayDifference(storedDate, getTodaysDate()) < 7 && recentlyViewedItems.length > 2) {

        fireEvent('Customer Conditions met');

        if(VARIATION === '1') {
          //const entryElement = document.querySelectorAll('.oct-grid__row.oct-grid__row--full-width')[1];
          const entryElement = document.querySelector('.oct-grid__row.oct-grid__row--full-width .oct-grid__cell.oct-grid__cell--width-12.oct-grid-aem__cell.oct-grid-aem__cell__width--firstRow.oct-grid-aem__cell__width--lastRow .oct-carousel-horizontalnav').closest('.oct-experience-fragment').closest('.oct-grid__row');
          const rootElement = document.createElement('div');

          rootElement.classList.add(`${ID}-root`);
          rootElement.innerHTML = /* HTML */ `
            <div class="${ID}-header">
              <h4>You Recently Viewed</h4>
            </div>
            <div class="${ID}-swiper swiper-container">
              <div class="swiper-wrapper"></div>
              <div aria-label="next slide"role="button" tabindex="-1" class="swiper-button-next"></div>
              <div aria-label="previous slide" role="button"
                tabindex="-1"
                class="swiper-button-prev"
              ></div>
              <div class="${ID}-loader"></div>
            </div>
          `;

          insertAfterElement(entryElement, rootElement);

          // Swiper.use([Navigation]);

          if(recentlyViewedItems.length <= 4 && window.innerWidth >= 768) {
            rootElement.querySelector('.swiper-wrapper').style = 'justify-content: center;'
          }

          const swiper = new Swiper(`.${ID}-swiper`, {
            direction: 'horizontal',
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            slidesPerView: 1.5,
            spaceBetween: 10,
            breakpoints: {
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            },
            navigation: {
              loop: true,
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            },
          });

          // swiper.init();

          const promises = [];

          recentlyViewedItems.forEach((item) => {
            promises.unshift(
              sendHttpRequest('GET', item).then((res) => {
                const temp = document.createElement('html');
                temp.innerHTML = res;

                const itemId = item.match(/.*([\d]{8}).*/);
                const itemImageId = itemId[itemId.length - 1];
                let offer = false;

                const url = item;
                const name = temp.querySelector('#estore_product_title').innerText.trim();
                const image = `https://boots.scene7.com/is/image/Boots/${itemImageId}?wid=200&hei=200&op_sharpen=1`;
                if(temp.querySelector('.pdp_roundel_section .product_offer_notify') && temp.querySelector('.product_offer_notify').textContent === 'offer') {
                  offer = true;
                }

                return { url, name, image, offer };
              })
            );
          });

          Promise.all(promises).then((res) => {
            res.forEach((item) => {
              const productElement = document.createElement('div');
              productElement.classList.add('swiper-slide');
              productElement.innerHTML = /* HTML */ `
                <a class="${ID}-product" href="${item.url}">
                  <div class="${ID}-product-image">
                    ${item.offer ? `<div class="${ID}-product-offer">Offer</div>` : ''}
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <span>${item.name}</span>
                </a>
              `;

              swiper.addSlide(1, productElement);
            });

            document.querySelector(`.${ID}-loader`).remove();
          });
        }
      }
    });

    
    // Tracking
    if(VARIATION === '1') {
      pollerLite([`.${ID}-product`], () => {
        const recentProducts = document.querySelectorAll(`.${ID}-product`);

        recentProducts.forEach((product) =>
          product.addEventListener('click', (e) => {
            const prodName = e.currentTarget.querySelector('span').innerText;
            fireEvent(`Clicked Recently Viewed Product - ` + prodName);
          })
        );
      });

      pollerLite([`.${ID}-root`, `.${ID}-product`], () => {
        const noOfProd = document.querySelectorAll(`.${ID}-product`).length;

        function inViewport(element) {
          if (!element) return false;
          if (1 !== element.nodeType) return false;
    
          var html = document.documentElement;
          var rect = element.getBoundingClientRect();
    
          return (
            !!rect &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.left <= html.clientWidth &&
            rect.top <= html.clientHeight
          );
        }

        window.addEventListener("scroll", () => {
          if (inViewport(document.querySelector(`.${ID}-root`))) {
            fireEvent(`Component Rendered in view with ${noOfProd} products`, true);
          }
        });
      });
    }
  }
};
