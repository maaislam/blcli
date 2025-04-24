/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, whatPage, toggle } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, viewabilityTracker } from './../../../../../lib/utils';
import store from './store';
import slider from './slider';
import settings from './settings';

let $ = null;
events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  if (settings.VARIATION === '3') {
    // Control
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  if (settings.VARIATION === '2') {
    // Hide top banner
    document.body.classList.add('FL051-v2');
    events.send(settings.ID, 'V2', 'Variation 2 is active');
  }

  // Check if on basket page.
  if (whatPage() === 'basket') {
    const basketItems = cacheDom.getAll('#BasketDiv .col-xs-12 table tr');
    const basketRef = cacheDom.get('.FooterWrap');
    const topBrand = store.basketProducts();
    const topBrandLink = topBrand.toLowerCase().replace(/\s/g, '-');
    const { gender } = JSON.parse(localStorage.getItem('brandStorage'));
    const mode = (arr) => {
      return arr.sort((a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
    };
    const topGender = mode(gender);
    // Add HTML Container
    const generateMarkup = () => {
      const html = `
        <div class="FL051-container">
          <h1>Our Recommendations</h1>
      
          <div class="FL051-tabs">
            <div class="FL051-title">
              <button id="tab-1" class="FL051-tabs--title FL051-active" type="button">YOU MAY LIKE</button>
            </div>
            <div class="FL051-title">
              <button id="tab-2" class="FL051-tabs--title" type="button">RECENTLY VIEWED</button>
            </div>
      
            <div id="FL051-similar" class="FL051-tabs--content">
              <div class="slick"></div>
            </div>
            <div id="FL051-recently" class="FL051-tabs--content FL051-hide">
              <div class="slick"'></div>
            </div>
          </div>

          ${topBrand ? `<div class="FL051-brand-link">
            <a href="${topGender.toLowerCase()}/brands/${topBrandLink}">View All ${topBrand.toLowerCase()}</a>
          </div>` : ''}
        </div>
      `;
      return html;
    };

    const html = generateMarkup();
    basketRef.insertAdjacentHTML('beforebegin', html);

    /**
     * Similar
     */
    const simContainer = document.querySelector('#FL051-similar .slick');
    const recContainer = document.querySelector('#FL051-recently .slick');
    slider(basketItems, simContainer, recContainer);
    // Check it's been added and run slick.
    pollerLite(['#FL051-similar .slick div', '#FL051-recently .slick div',
      () => {
        let checkjQuery = false;
        if (window.jQuery) {
          checkjQuery = true;
          $ = window.jQuery;
        }
        return checkjQuery;
      },
    ], () => {
      $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
        // $(simContainer).slick('reInit');
        $(simContainer).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          adaptiveHeight: false,
          responsive: [
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
        });
        $(recContainer).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          adaptiveHeight: false,
          responsive: [
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
        });
      });
    });

    const addedContainer = document.querySelector('.FL051-tabs');
    toggle(addedContainer);

    viewabilityTracker(addedContainer, () => {
      events.send(settings.ID, 'Seen', 'User has seen the component');
    });

    const addedProducts = document.querySelectorAll('.FL051 .FL051-tabs .FL051-tabs--content .FL051-slide .SuggestedProduct');
    if (addedProducts) {
      for (let i = 0; addedProducts.length > i; i += 1) {
        addedProducts[i].addEventListener('click', () => {
          events.send(settings.ID, 'Click', 'User clicked a product');
        });
      }
    }
  }

  // Check if page is PDP
  if (whatPage() === 'pdp') {
    // Collect PDP information
    const title = document.querySelector('.FlanProdDet .AltProdDet .title #lblProductName');
    const img = document.querySelector('#productImages #productImageContainer .productImage img#imgProduct');
    const price = document.querySelector('.AltProdDet .pdpPriceRating');
    const { productId } = window.dataLayer[1];
    const { productBrand } = window.dataLayer[1];
    const { rollupURL } = window.dataLayer[1];
    const imgUrl = img.getAttribute('src');
    const name = title.textContent.trim();
    const brandItem = {
      Name: name,
      ImageUrl: imgUrl,
      priceEl: price.outerHTML,
      ProductId: productId,
      Brand: productBrand,
      Url: rollupURL,
    };
    const { colourVariantId } = window.dataLayer[1];
    store.storeBrand('RecentViewed', colourVariantId, brandItem);
  }
};

export default activate;
