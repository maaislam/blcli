/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import initSwiper from './helpers/initSwiper';
import initExternalLib from './helpers/addExternalLib';
import extractHighlights from './data/extractHighlights';
import highlightCarousel from './components/highlightCarousel';

import renderChannelSlider from './components/channelSlider';
import renderPackageSec from './components/renderPackageSection';
import renderTvAppsteps from './components/renderAppSection';
import renderHeroBannerContent from './components/renderheroBannerContent';
import heroBannerData from './data/extractHeroBanner';
import { channelsConfig, highlightConfig, newBannerConfig } from './helpers/swiperConfigs';
import sendClick from './helpers/dispatchClick';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const navs = document.querySelectorAll('nav');
  navs.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      if (e.target.matches('li > a')) {
        fireEvent(`user has clicked the menu item ${e.target.innerText}`);
      }
    });
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[href="/hardware/aktivieren/"]')) {
        fireEvent('user has clicked "Sender aktivieren" cta button');
      } else if (e.target.matches('[href="/hardware-bestellen/"]')) {
        fireEvent('user has clicked "Geräte bestellen" cta button');
      } else if (e.target.matches('[href="/pakete/tvapp/"]')) {
        fireEvent('user has clicked "TV-App aktivieren" cta button');
      }
    });

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const init = (id) => {
    const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
    const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';

    location.pathname === '/pakete/' && sendClick();
    initExternalLib(swiperJs, swiperCss);
    const packageSection = document.getElementById('packages');
    const contentContainer = document.getElementById('contentContainer');

    const domToHide = [packageSection, contentContainer];

    domToHide.forEach((item) => {
      item.classList.add(`${id}__hide`);
    });
  };
  init(ID);
  //part 1//
  highlightCarousel(extractHighlights(), ID, fireEvent);
  const highlightContainer = `.${ID}-highlight__container--carousel`;

  initSwiper(highlightContainer, highlightConfig);
  //part 1//

  //part 2//

  fetch('/m7actions/channelsapi/getcontent/?documenttype=channelItem')
    // Handle success
    .then((response) => response.json())
    .then((data) => {
      const channelsData = data.slice(0, 48).map((item) => {
        return {
          name: item.Name,
          imgUrl: `https://m7cdn.io/${item.Properties.$values[1].Value}`,
        };
      });

      renderChannelSlider(ID, channelsData);
      const channelsContainer = `#channels-list-table-new`;
      setTimeout(() => {
        initSwiper(channelsContainer, channelsConfig);
      }, 3000);
    })
    .catch((err) => console.log('Request Failed', err));

  setTimeout(() => {
    // const data = heroBannerData();
    const data = [
      'https://ucds.ams3.digitaloceanspaces.com/HDAustria/header_vernon_subutex_exklusiv%201.png',
      'https://ucds.ams3.digitaloceanspaces.com/HDAustria/header_dune_premium%201.png',
      'https://ucds.ams3.digitaloceanspaces.com/HDAustria/header_pennyworth_kombi%201.png',
    ];
    const dataMobile = ['https://ucds.ams3.digitaloceanspaces.com/HDAustria/header_vernon_subutex_exklusiv%201%20%282%29.png'];
    console.log('data', data);
    const bannerContainer = `.${ID}__herobanner--container`;

    if (window.matchMedia('(min-width: 1023px)').matches) {
      renderHeroBannerContent(ID, data);
      initSwiper(bannerContainer, newBannerConfig);
    } else {
      renderHeroBannerContent(ID, dataMobile);
    }
  }, 2000);

  renderPackageSec(ID, fireEvent);
  renderTvAppsteps(ID, fireEvent);
  fireEvent('customer has seen variation');
};
