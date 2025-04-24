/**
 * BO105 - Homepage tiles
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup, clickEvents, fireEvent } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if (VARIATION == 'control') {
    fireEvent(`Experiment Fired`);

    const heroBannerSlides = document.querySelectorAll(`.oct-carousel-hero__inner .swiper-slide a`);
    const paydaySlides = document.querySelectorAll(`#cu_2021_pay_day a`);
    if (heroBannerSlides){
    for (let index = 0; index < heroBannerSlides.length; index += 1) {
      const element = heroBannerSlides[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Hero Banner');
      });
    }
  }
  if (paydaySlides){
    for (let index = 0; index < paydaySlides.length; index += 1) {
      const element = paydaySlides[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Hero Banner Payday');
      });
    }
  }

  } else {
    /**
     * @desc Banner/Tile images
     */
    let expData;
    if(VARIATION === '1') {
      expData = {
        1: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/42CEC6F0CBEDFC6E42653671F8A13453BF179C5049EDA9E6B099BA86CF87A213.jpg?meta=/Image-Upload/ABTesting_Version1_No7_3for2_removed_product.jpg',
          title: '3 for 2',
          text: 'on selected No7 Skincare',
          url: 'https://www.boots.com/no7/no7-skincare#facet:-10504949515350585132102111114325032111110321151011081019911610110032781115532831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
        },
        2: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A43AD05966F618C1C3D0E28F23C07976A31653C3EC81451A1B27D51669FCAD97.jpg?meta=/Image-Upload/ABTesting_Version1_Beauty_Nav.jpg',
          title: 'Shop',
          text: 'Beauty',
          url: 'https://www.boots.com/beauty',
        },
        3: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/43208132B2D1EBC983196611251A00479FEA0CC997D5228B20E12941FE7A600F.jpg?meta=/Image-Upload/ABTesting_Version1_Health_Nav.jpg',
          title: 'Shop',
          text: 'Health & Pharmacy',
          url: 'https://www.boots.com/health-pharmacy',
        },
        
      }
    }
    if(VARIATION === '2') {
      expData = {
        1: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/42CEC6F0CBEDFC6E42653671F8A13453BF179C5049EDA9E6B099BA86CF87A213.jpg?meta=/Image-Upload/ABTesting_Version1_No7_3for2_removed_product.jpg',
          title: '3 for 2',
          text: 'on selected No7 Skincare',
          url: 'https://www.boots.com/no7/no7-skincare#facet:-10504949515350585132102111114325032111110321151011081019911610110032781115532831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
        },
        2: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/40DAA98397D9903BEF81B90ED514C4454CD0E2E6271F35218AAB1A1352FCA8C2.jpg?meta=/Image-Upload/ABTesting_Version2_Beauty_Nav.jpg',
          title: 'Shop',
          text: 'Beauty',
          url: 'https://www.boots.com/beauty',
        },
        3: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B7DC51D1F4DB7DFEBAF8A5B3725085E27899A7D09C92BD7D88B10BB21A51504C.jpg?meta=/Image-Upload/ABTesting_Version2_Health_Nav.jpgg',
          title: 'Shop',
          text: 'Health & Pharmacy',
          url: 'https://www.boots.com/health-pharmacy',
        },
      }
    }
    if(VARIATION === '3') {
      expData = {
        1: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/42CEC6F0CBEDFC6E42653671F8A13453BF179C5049EDA9E6B099BA86CF87A213.jpg?meta=/Image-Upload/ABTesting_Version1_No7_3for2_removed_product.jpg',
          title: '3 for 2',
          text: 'on selected No7 Skincare',
          url: 'https://www.boots.com/no7/no7-skincare#facet:-10504949515350585132102111114325032111110321151011081019911610110032781115532831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
        },
        2: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9D6C736E38EBF11AE159B4609E150685D6134E46C48559DCD9DC1D4AA5D95894.jpg?meta=/Image-Upload/ABTesting_Version3_Beauty_Nav.jpg',
          title: 'Shop',
          text: 'Beauty',
          url: 'https://www.boots.com/beauty',
        },
        3: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B53D68E912F97DB77DA1A1A10A2158EFA0BE3249A97206DCECE60A10978A54EC.jpg?meta=/Image-Upload/ABTesting_Version3_Health_Nav.jpg',
          title: 'Shop',
          text: 'Health & Pharmacy',
          url: 'https://www.boots.com/health-pharmacy',
        },
        4: {
          img: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/6EDB58ADF25F57BABBDEB38B75577A0B86FBF1CF9F6A5D10A82FDA43506135CC.jpg?meta=/Image-Upload/ABTesting_Version3_3for2_Vits.jpg',
          title: '3 for 2',
          text: 'on selected vitamins and supplements',
          url: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=3+for+2+on+selected+vitamins%2C+supplements%2C+health+foods+and+complementary+medicines+-+cheapest+free',
        },
      }
    }

    let homepagetilesContainer = '';

    if (VARIATION == '1') {
      homepagetilesContainer = `<div class="${ID}-tiles__wrapper">
      <div class="${ID}-tiles__container">
          <a href="${expData[1].url}" class="${ID}-tile__item medium tall" data-event="main-banner" >
            <div class="${ID}-bg" style="background-image: url('${expData[1].img}')"></div>
            <div class="${ID}-textBlock">
              <h2 style="color: rgb(204, 0, 51);">${expData[1].title}</h2>
              ${expData[1].text ? `<p>${expData[1].text}</p>` : ''}
            </div>
          </a>
          <a href="${expData[2].url}" class="${ID}-tile__item small tall" data-event="vertical-banner"><div class="${ID}-bg" style="background-image: url(${expData[2].img})"></div>
          <div class="${ID}-textBlock">
              <h2>${expData[2].title}</h2>
              ${expData[2].text ? `<p>${expData[2].text}</p>` : ''}
            </div>
          </a>
          <a href="${expData[3].url}" class="${ID}-tile__item small tall" data-event="vertical-banner"><div class="${ID}-bg" style="background-image: url(${expData[3].img})"></div>
          <div class="${ID}-textBlock">
              <h2>${expData[3].title}</h2>
              ${expData[3].text ? `<p>${expData[3].text}</p>` : ''}
            </div>
          </a>
        </div>
      </div>`;
    } else if (VARIATION == '2') {
      homepagetilesContainer = `<div class="${ID}-tiles__wrapper">
      <div class="${ID}-tiles__container">
          <a href="${expData[1].url}" class="${ID}-tile__item medium tall" data-event="main-banner" ><div class="${ID}-bg" style="background-image: url(${expData[1].img})"></div>
          <div class="${ID}-textBlock">
              <h2 style="color: rgb(204, 0, 51);" >${expData[1].title}</h2>
              ${expData[1].text ? `<p>${expData[1].text}</p>` : ''}
            </div>
            </a>
          <a href="${expData[2].url}" class="${ID}-tile__item medium" data-event="horizontal-banner"><div class="${ID}-bg" style="background-image: url(${expData[2].img})"></div>
          <div class="${ID}-textBlock">
              <h2>${expData[2].title}</h2>
              ${expData[2].text ? `<p>${expData[2].text}</p>` : ''}
            </div></a>
          <a href="${expData[3].url}" class="${ID}-tile__item medium" data-event="horizontal-banner"><div class="${ID}-bg" style="background-image: url(${expData[3].img})"></div>
          <div class="${ID}-textBlock">
              <h2>${expData[3].title}</h2>
              ${expData[3].text ? `<p>${expData[3].text}</p>` : ''}
            </div>
            </a>
        </div>
      </div>`;
    } else if (VARIATION == '3') {
      homepagetilesContainer = `<div class="${ID}-tiles__wrapper">
      <div class="${ID}-tiles__container">
          <a href="${expData[1].url}" class="${ID}-tile__item medium tall" data-event="main-banner"><div class="${ID}-bg" style="background-image: url(${expData[1].img})"></div>
            <div class="${ID}-textBlock">
              <h2 style="color: rgb(204, 0, 51);">${expData[1].title}</h2>
              ${expData[1].text ? `<p>${expData[1].text}</p>` : ''}
            </div>
          </a>
          <a href="${expData[2].url}" class="${ID}-tile__item small" data-event="tile-banner"><div class="${ID}-bg" style="background-image: url(${expData[2].img})"></div>
            <div class="${ID}-textBlock">
              <h2>${expData[2].title}</h2>
              ${expData[2].text ? `<p>${expData[2].text}</p>` : ''}
            </div>
          </a>
          <a href="${expData[3].url}" class="${ID}-tile__item small" data-event="tile-banner"><div class="${ID}-bg" style="background-image: url(${expData[3].img})"></div>
            <div class="${ID}-textBlock">
              <h2>${expData[3].title}</h2>
              ${expData[3].text ? `<p>${expData[3].text}</p>` : ''}
            </div>
            </a>
          <a href="${expData[4].url}" class="${ID}-tile__item medium last" data-event="horizontal-banner"><div class="${ID}-bg" style="background-image: url(${expData[4].img})"></div>
          <div class="${ID}-textBlock">
              <h2 style="color: rgb(204, 0, 51);">${expData[4].title}</h2>
              ${expData[4].text ? `<p>${expData[4].text}</p>` : ''}
            </div>
          </a>
        </div>
      </div>`;

    }

    // document.querySelector(`#main`).insertAdjacentHTML('afterbegin', homepagetilesContainer);
  if(document.querySelector('.cu-ticker')) {
    document.querySelector('.cu-ticker').insertAdjacentHTML('afterend', homepagetilesContainer);
  }  else {
    document.querySelector('.oct-carousel-hero').parentNode.insertAdjacentHTML('beforebegin', homepagetilesContainer);
  }
    
    //
    // --- Append new tiles below red sale banner
    //document.querySelector('.cu-ticker').closest('.oct-grid__row.oct-grid__row--full-width').insertAdjacentHTML('afterend', homepagetilesContainer);

    clickEvents();
  }
  
  
};
