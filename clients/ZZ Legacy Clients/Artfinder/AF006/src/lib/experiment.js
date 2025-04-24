/**
 * AF006 - Increasing prominence of the recently viewed section
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { initiateSlick } from './AF006-Slick';

const { ID, VARIATION } = shared;

const activate = () => {
  // Write experiment code here
  let device = '';
  if (window.innerWidth < 565) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }
  // console.log(JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`)));
  // // const obj = JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`));
  // console.log(Object.keys(JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`))).length);
  // console.log('+ + + + + + + + + + +');
  const home = window.location.pathname === "/"
  && JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`)) !== null
  && Object.keys(JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`))).length > 0;
  if (home) {
    setup();
    pollerLite(['#main-offcanvas',
    '.af-square-buttons-carousel.slick-initialized'], () => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`));

        const recentlyViewdTiles = document.querySelectorAll('.af-square-product-cards.slick-initialized .slick-list .slick-track .slick-slide');
        
        if (recentlyViewdTiles.length > 0) {
          events.send(`${shared.ID}-${shared.VARIATION}`, 'recently viewed products exist');
        }

        let tilesList = '';
        let pdpLinks = [];
        let productTitles = [];
        let suggestions = 0;

        /**
         * @desc Add product from RECENTLY VIEWED
         */
        for (let i = 0; i < recentlyViewdTiles.length; i++) {
          const tile = recentlyViewdTiles[i];
          const img = tile.querySelector('.af-place-container img').getAttribute('src');
          const title = tile.querySelector('.af-truncate-text.af-picasso60-text').innerText.trim();
          // const interestLink = tile.querySelector('.text-right.af-interest a').outerHTML;
          const quickViewLink = tile.querySelector('.af-card.af-card-product-variant.af-show-element-on-hover > a').outerHTML;
          let link = tile.querySelector('.af-card.af-card-product-variant.af-show-element-on-hover > a').getAttribute('href');
          link = link.replace('#/quick-view', '');
          pdpLinks.push(`/product${link}/#/`);

          if (img.indexOf('data:image') === -1 && !productTitles.includes(`${title}`)) {
            let label = `<div class="af-card-padding af-place place-left place-bottom"><!----></div>`;
            if (tile.querySelector(`.af-card-padding.af-place.place-left.place-bottom`)) {
              label = tile.querySelector(`.af-card-padding.af-place.place-left.place-bottom`).outerHTML;
            }
            tilesList += `<div aria-hidden="false" class="${shared.ID}-tile">
              <div>
                <div class="af-column" style="width: 100%; display: inline-block;">
                  <div class="af-place-container pad pad-xs" show_favourite="true"><!----> 
                    <div class="af-card af-card-product-variant af-show-element-on-hover">
                      <div class="${shared.ID}-tileBanner ${shared.ID}-recentlyViewed"><div>Recently Viewed</div></div>
                      <div class="af-place-container">
                        <figure class="af-overflow-hidden" style="padding-top: 100%; background-color: rgb(122, 122, 122);">
                        <img src="${img}" class="small-12 af-place place-top" style="opacity: 1; left: 0px;"></figure> 
                        ${label}
                      </div>
                      <div class="af-card-padding af-white-bg clearfix">
                        <div class="medium-9 large-10 left">
                          <p class="${shared.ID}-title-text af-truncate-text af-picasso60-text margin margin-xxs">${title}</p>
                        </div>
                        <p class="medium-3 large-2 left show-for-medium-up text-right af-interest">
                          
                        </p>
                      </div> <!----> 
                      ${quickViewLink}
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

            productTitles.push(title);
            suggestions += 1;
          }
          

        }

        /**
         * @desc If Recently View are less than 5, 
         * then get more products from PDP suggestions
         */
        // alert(5 - recentlyViewdTiles.length);
        // alert(5 - suggestions);
        // alert(5 - recentlyViewdTiles.length > 0);
        if (5 - suggestions > 0) {
          const restOfProducts = 5 - suggestions;
          // console.log(restOfProducts);
          for (let i = 0; i < restOfProducts; i+= 1) {
            if (data[i]) {
              // console.log(data[i]);
              // const pdpUrl = pdpLinks[i];
              // console.log('== == == == ==');
              const img = data[i]['img'];
              const title = data[i]['title'];
              // const interestLink = data[i]['interest-link'];
              const quickViewLink = data[i]['quick-view-link'];

              tilesList += `<div aria-hidden="false" class="${shared.ID}-tile">
                <div>
                  <div class="af-column" style="width: 100%; display: inline-block;">
                    <div class="af-place-container pad pad-xs" show_favourite="true"><!----> 
                      <div class="af-card af-card-product-variant af-show-element-on-hover">
                        <div class="${shared.ID}-tileBanner ${shared.ID}-moreLike"><div>You might like</div></div>
                        <div class="af-place-container">
                          <figure class="af-overflow-hidden" style="padding-top: 100%; background-color: rgb(122, 122, 122);">
                          <img src="${img}" class="small-12 af-place place-top" style="opacity: 1; left: 0px;"></figure> 
                          <div class="af-card-padding af-place place-left place-bottom"><!----></div>
                        </div>
                        <div class="af-card-padding af-white-bg clearfix">
                          <div class="medium-9 large-10 left">
                            <p class="${shared.ID}-title-text af-truncate-text af-picasso60-text margin margin-xxs">${title}</p>
                          </div>
                          <p class="medium-3 large-2 left show-for-medium-up text-right af-interest">
                            
                          </p>
                        </div> <!----> 
                        ${quickViewLink}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
            }
          }
        }

        // document.querySelector('section.af-grey25-bg.pad.pad-l.only-v').insertAdjacentHTML('beforeend', tile);
        const tilesContainer = `<div class="${shared.ID}-white_space"></div>
        <div class="${shared.ID}-suggestedProducts__wrapper ${shared.ID}-suggestedProducts__v${shared.VARIATION}">
          <h2 class="h1 small-text-center">Suggested for you</h2>
          <div class="${shared.ID}-suggestedProducts__content">${tilesList}</div>
        </div>`;

        if (shared.VARIATION == '1') {
          document.querySelector('section.af-grey25-bg.pad.pad-l.only-v').insertAdjacentHTML('afterend', tilesContainer);
          events.send(`${shared.ID}-${shared.VARIATION}`, 'did-show-recommendations');


          const suggestions = document.querySelectorAll(`.${shared.ID}-tile`);
          if (suggestions.length >= 5) {
            events.send(`${shared.ID}-${shared.VARIATION}`, '5+ suggested products exist');
          }
        } else if (shared.VARIATION == '2') {
          document.querySelector('#main-offcanvas div.inner-wrap .af-topbar-wrapper.contain-to-grid').parentElement.nextElementSibling.insertAdjacentHTML('afterbegin', tilesContainer);
        }
        

        // jQuery(`.${shared.ID}-suggestedProducts__content`).slick();
        initiateSlick(recentlyViewdTiles.length);
      }, 500);
        
    }); 
    

  } else if (window.location.pathname.indexOf('/product/') > -1) {
    // alert('pdp');
    pollerLite(['#products-by-artist',
    '#products-by-artist .af-products-carousel.af-square-product-cards .slick-slide',
    '#products-by-artist .af-products-carousel.af-square-product-cards .slick-slide img[src^=http]'], () => {
      // alert('yes');
      setup();
      setTimeout(() => {
        const artistSection = document.querySelector('#products-by-artist');
        const tiles = artistSection.querySelectorAll('.af-products-carousel.af-square-product-cards .slick-slide');
        let products = [];
        let productTitles = [];
        const storage = JSON.parse(localStorage.getItem(`${shared.ID}-moreProducts`)) || null;
        for (let i = 0; i < tiles.length; i++) {
          let existsInLocalStorage = false;
          const tile = tiles[i];
          const img = tile.querySelector('.af-place-container img').getAttribute('src');
          const title = tile.querySelector('.af-truncate-text.af-picasso60-text').innerText.trim();
          if (storage) {
            storage.forEach(p => {
              if (p.title == title) {
                existsInLocalStorage = true;
              } else {
                existsInLocalStorage = false;
              }
            });
          }
          const quickViewLink = tile.querySelector('.af-card.af-card-product-variant.af-show-element-on-hover > a').outerHTML;
          if (img.indexOf('data:image') === -1
          && !productTitles.includes(`${title}`) && !existsInLocalStorage) {
            let tileDetails = {
              'img': img,
              'title': title,
              // 'interest-link': interestLink,
              'quick-view-link': quickViewLink,
            };
            products.push(tileDetails);
            productTitles.push(title);
          }
        }


    // localStorage.setItem(`${shared.ID}-moreProducts`, products);
        localStorage.setItem(`${shared.ID}-moreProducts`, JSON.stringify(products));
      }, 1000);
      
    });
    
  }

};


export default activate;
