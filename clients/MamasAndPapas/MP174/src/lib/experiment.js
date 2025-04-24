/**
 * MP174  - Compatible Mattresses/Cots at PDP
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './settings';
import { config } from './config';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  const { ID, VARIATION } = settings;

  let cat = '';
  let counterCat = '';
  let linkCatTitle = '';
  let run = false;
  let showSlider = true;
  let theCopy = '';

  // Check if we're on a cot or mattress
  if (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].ecommerce && window.dataLayer[0].ecommerce.detail && window.dataLayer[0].ecommerce.detail.products) {
    const { products } = window.dataLayer[0].ecommerce.detail;
    if (products[0]) {
      const { category } = products[0];
      const { name } = products[0];
      if (category && category.match(/cot|cots/gi) || category.match(/crib|cribs/gi) || name && name.match(/cot|cots/gi) || name.match(/Cotbed/gi)) {
        cat = 'cot';
        counterCat = 'mattress';
        linkCatTitle = 'Mattresses';
      } 
      if (name && name.match(/Pocket\sSpring/gi) || category && category.match(/Mattresses|Mattress/gi) || name && name.match(/Mattresses|Mattress/gi)) {
        cat = 'mattress';
        counterCat = 'Cot';
        linkCatTitle = 'Cots';
      }
    }
  }


  if (cat.length && config[cat][window.location.pathname]) {
    
    theCopy = config[cat][window.location.pathname].copy;
    
    const colour = config[cat][window.location.pathname].colour;
    console.log(colour);
    if (colour == 'none') {
      showSlider = false;
    } else {
      showSlider = true;
    }
    // Check the copy and colour
    if (theCopy.length) {
      run = true;

      events.send(ID, 'MP174 Seen', 'MP174 Users who view a compatible product PDP');
    }
  }

  console.log({
    cat,
    counterCat,
    linkCatTitle,
    theCopy,
  });

  if (run) {
    
    let showTitle = true;
    if (theCopy.match(/^Mattress included/i)) {
      showTitle = false;
    }

    // Add top message CTA
    const topRef = document.querySelector('.call_to_action.pdp__btn-group');
    if (topRef) {
      topRef.insertAdjacentHTML('afterend', `
        <div class="MP174-topCTA" id="scrollTo">
          <div class="wrap">
            ${showTitle ? `<h2>Don't forget your perfect ${counterCat}!</h2>` : ''}

            <p>${theCopy}</p>

            ${showSlider ? `<a id="ScrollToLink" href="#scrollTo">See compatible ${linkCatTitle}!</a>` : ''}
          </div>
        </div>
      `);
    }

    if (showSlider) {
  
      const ref = document.querySelector('.pdp_product_details.col-pdp');
  
      // Add loader where carousel will go
      ref.insertAdjacentHTML('afterend', `
        <div class="MP174-loader">
          <div class="loading">Loading&#8230;</div>
        </div>
      `);
  
  
    
      config.init(window.location.pathname, cat, ref);
  


      pollerLite(['.MP174-next', '.MP174-prev', '.MP174-related'], () => {
        const nextBtn = document.querySelector('.MP174-next');
        const prevBtn = document.querySelector('.MP174-prev');
    
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            events.send(ID, 'MP174 Scroll', 'MP174 Users who scroll through compatible products', { sendOnce: true });
          });
        }
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            events.send(ID, 'MP174 Scroll', 'MP174 Users who scroll through compatible products', { sendOnce: true });
          });
        }

        const slideToEl = document.querySelector('.MP174-related');
        const scrollToLink = document.querySelector('#ScrollToLink');
        if (scrollToLink) {
          scrollToLink.addEventListener('click', () => {
            events.send(ID, 'MP174 Click', 'MP174 Users who click the ‘see compatible ____’ link on the banner');
          });
        }

        const moreInfos = document.querySelectorAll('.MP174-related .cta > a');
        if (moreInfos.length) {
          for (let i = 0; moreInfos.length > i; i += 1) {
            moreInfos[i].addEventListener('click', () => {
              events.send(ID, 'MP174 Click', 'MP174 User clicked More Info');
            });
          }
        }

        const imageLinks = document.querySelectorAll('.MP174-related .image a');
        if (imageLinks.length) {
          for (let i = 0; imageLinks.length > i; i += 1) {
            imageLinks[i].addEventListener('click', () => {
              events.send(ID, 'MP174 Click', 'MP174 User clicked compatible Image');
            });
          }
        }

      });

    }  


  }
};

export default activate;
