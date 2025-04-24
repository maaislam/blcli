import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import lastVisitedData from './prestigeWatchesSKUs';
import brandData from './brandBannerData';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Get Site from hoestname
 * EJ or HS
 */
export const getSiteFromHostname = () => {
  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }
};

export const scrapeDataFromPDP = () => {
  const { ID, VARIATION } = shared;

  const prodSku = digitalData.product[0].productInfo.masterSku;
  const listOfMensPrestigeWatches = lastVisitedData.mensPrestigeWatches;
  const listOfWomensPrestigeWatches = lastVisitedData.womensPrestigeWatches;

  if (listOfMensPrestigeWatches.indexOf(`${prodSku}`) > -1 || listOfWomensPrestigeWatches.indexOf(`${prodSku}`) > -1) {
    
    const prodBrand = digitalData.product[0].productInfo.brand;
    localStorage.setItem(`${ID}-last-visited-watch-brand`, `${prodBrand}`);
    let gender = '';
    
    if (listOfMensPrestigeWatches.indexOf(`${prodSku}`) > -1) {
      gender = 'male';
    } else if (listOfWomensPrestigeWatches.indexOf(`${prodSku}`) > -1) {
      gender = 'female';
    }

    localStorage.setItem(`${ID}-last-visited-watch-gender`, `${gender}`);
  }
};

export const generateNewContent = () => {
  const { ID, VARIATION } = shared;

  const lastViewedBrand = localStorage.getItem(`${ID}-last-visited-watch-brand`);
  const lastViewedGender = localStorage.getItem(`${ID}-last-visited-watch-gender`);
  let bannerImg = '';
  let bannerImgTablet = '';
  let gender = '';

/**
 * @desc Sets up main banner image based on last PDP gender
 */
  if (lastViewedGender == 'male') {
    bannerImg = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/Male.jpg';
    bannerImgTablet = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/Male%20-%20tablet.png';
  } else if (lastViewedGender == 'female') {
    bannerImg = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/Female.jpg';
    bannerImgTablet = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/Female%20-%20tablet.png';
  }

  const brandImg = brandData[`${lastViewedBrand}`].img;
  const brandUrl = brandData[`${lastViewedBrand}`].url;
  const forHerUrl = `/webstore/l/ladies-watches/`;
  const forHimUrl = `/webstore/l/mens-watches/`;
  const helperGuideImg = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/ae52a6e2-ca6a-4d8e-8944-532f952aae85/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/BuyersGuide.jpg';
  
// --- MAIN BANNER
  const mainBanner = document.querySelector('.home-tile-grid__large-tile');
  
  pollerLite(['.home-tile-grid__large-tile a'], () => {
    const mainBannerLinks = mainBanner.querySelectorAll('a');
    [].forEach.call(mainBannerLinks, (link) => {
      link.setAttribute('href', 'javascript:void(0)');
    });
  });

  mainBanner.querySelector('img').setAttribute('src', `${bannerImg}`);
  
  const bannerImgSources = mainBanner.querySelectorAll('source');
  [].forEach.call(bannerImgSources, (source) => {
    // source.setAttribute('srcset', `${bannerImg}`);
    // source.setAttribute('alt', `Prestige Watches`);
    source.parentNode.removeChild(source);
  });
  const mainBannerPicture = mainBanner.querySelector('picture');
  if(window.innerWidth < 767) {
   mainBannerPicture.setAttribute('style', `background-image: url(${bannerImg})`);
  } else {
    mainBannerPicture.setAttribute('style', `background-image: url(${bannerImgTablet})`);
  }
  // --- Desktop
 // mainBannerPicture.insertAdjacentHTML(`afterbegin`, `<source media="(min-width:1024px)" srcset="${bannerImg}" alt="Prestige Watches">`);
  // --- Tablet
  //mainBannerPicture.insertAdjacentHTML(`afterbegin`, `<source media="(max-width:1023px)" srcset="${bannerImgTablet}" alt="Prestige Watches">`);
  // --- Mobile
  //mainBannerPicture.insertAdjacentHTML(`afterbegin`, `<source media="(max-width:572px)" srcset="${bannerImg}" alt="Prestige Watches">`);
  
  const mainBannerOverlay = `<div class="${ID}-bannerBtn__wrapper">
    <div class="${ID}-bannerBtn__container">
      <div class="label">Luxury Watches</div>
      <a href="${forHimUrl}"><div class="${ID}-btn first">For Him</div></a>
      <a href="${forHerUrl}"><div class="${ID}-btn">For Her</div></div></a>
  </div>`;
  mainBanner.querySelector('.home-tile-grid__image-link').insertAdjacentHTML('beforeend', mainBannerOverlay);

// --- BRAND BANNER
  const brandBanner = document.querySelectorAll('.home-tile-grid__small-tile')[0];
  brandBanner.querySelector('a.home-tile-grid__image-link').setAttribute('href', 'javascript:void(0)');
  //brandBanner.querySelector('img').setAttribute('src', `${brandImg}`);
  brandBanner.setAttribute('style', `background-image: url(${brandImg})`);

  const brandBannerOverlay = `<a href="${brandUrl}"><div class="${ID}-bannerBtn__wrapper">
    <div class="${ID}-bannerBtn__container brand">
      <div class="label">${lastViewedBrand} Watches</div>
      <div class="${ID}-btn">Shop Now</div>
  </div></a>`;
  brandBanner.querySelector('img').insertAdjacentHTML('afterend', brandBannerOverlay);

// --- HELPER BANNER
  const helperBanner = document.querySelectorAll('.home-tile-grid__small-tile')[1];
  helperBanner.querySelector('a.home-tile-grid__image-link').setAttribute('href', 'javascript:void(0)');
  helperBanner.setAttribute('style', `background-image: url(${helperGuideImg})`);
  //helperBanner.querySelector('img').setAttribute('src', `${helperGuideImg}`);

  const helperBannerOverlay = `<a href="/webstore/guide/watch-buyers-guide/"><div class="${ID}-bannerBtn__wrapper">
    <div class="${ID}-bannerBtn__container">
      <div class="label">Watches Buyer’s Guide</div>
      <div class="${ID}-btn">More Info</div>
  </div></a>`;
  helperBanner.querySelector('img').insertAdjacentHTML('afterend', helperBannerOverlay);

// --- TEXT TILE
  const textTile = document.querySelector('.home-tile-grid__text-tile');
  const ifcMessageContainer = `<div class="${ID}-textContent">
    <p>Up To 5 Years Interest Free Credit</br>
    On All Luxury Watches Over £999*</p>
  </div>`;
  textTile.insertAdjacentHTML('afterbegin', ifcMessageContainer);
  textTile.classList.add(`${ID}-ifcMessageBanner`);

/**
 * @desc When banners have been updated, show section
 */
  document.querySelector('.home-tile-grid').setAttribute('style', 'min-height: unset !important; filter: blur(0); visibility: visible;');
};