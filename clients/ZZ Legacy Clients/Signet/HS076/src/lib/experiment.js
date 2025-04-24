/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import getData from './brandData';
import { events, pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = shared;


  /**
   * Create the brand bar wrapper
   */
  const createBrandBar = () => {
    const brandBar = document.createElement('div');
    brandBar.className = `${ID}__brandBar ${ID}__carouselBar`;
    brandBar.innerHTML = ` <div class="${ID}__carousel__inner"></div>`;

    if(window.location.href.indexOf('watches.do') > -1) {
      if(VARIATION !== '3') {
        document.querySelector('.hero-banner').insertAdjacentElement('afterend', brandBar);
      } else if(VARIATION === '3') {
        document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', brandBar);
      }
    } else {
      pollerLite(['.HS050-heroBanner'], () => {
        if(VARIATION !== '3') {
          document.querySelector(`.HS050-heroBanner`).insertAdjacentElement('afterend', brandBar);
        } else if(VARIATION === '3') {
          document.querySelector('.HS050-heroBanner').insertAdjacentElement('beforebegin', brandBar);
        }    
      });
    }
  }


  const addBrands = () => {
    const catData = getData();
    

    Object.keys(catData).forEach((i) => {
      const data = catData[i];
      const brandEl = document.createElement('div');
      brandEl.classList.add(`${ID}__brandBox`);
      brandEl.innerHTML = `<div class="${ID}__image" style="background-image:url(${data.logo})"><a name="${[i][0]}" href="${shared.VARIATION === '1' ? `${data.brandLink}` : `${data.plpLink}`}"></a></div>`;
  
      document.querySelector(`.${ID}__brandBar .${ID}__carousel__inner`).appendChild(brandEl);
    });
  }

  const slickBrandBar = () => {
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
        jQuery(`.${ID}__brandBar .${ID}__carousel__inner`).slick({
            infinite: true,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            rows: 0,
        });
      });
  }

  const brandEvents = () => {
    const allbrands = document.querySelectorAll(`.${ID}__brandBox`);

    for (let index = 0; index < allbrands.length; index += 1) {
      const element = allbrands[index];
      const brandName = element.querySelector('a').getAttribute('name');

      element.querySelector('a').addEventListener('click', () => {
        if(brandName) {
          console.log(brandName);
          events.send(`${ID} variation: ${VARIATION}`, 'click', `brand: ${brandName}`);
        }
      });
    }
  }

  if(VARIATION !== 'control') {
    createBrandBar();
    addBrands();

    if(window.innerWidth > 1100) {
      document.querySelector(`.${ID}__brandBar .${ID}__carousel__inner`).classList.add('container');
      slickBrandBar();
    }

    brandEvents();
  }

};
