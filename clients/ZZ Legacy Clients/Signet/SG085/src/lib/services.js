import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

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
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.body.classList.add(siteIdent);
  }
};

export const checkPageToRunExperiment = () => {
  const { ID, VARIATION } = shared;
  const page = window.location.pathname;
  let runExperiment = false;
  if(getSiteFromHostname() == 'ernestjones') {
    // EJ-specific JS
    const ejPages = ['/webstore/l/engagement-rings/',
    '/webstore/l/engagement-rings/select%7Csale/',
    '/webstore/l/ladies-necklaces/?icid=ej-tn-jewellery-her-necklaces',
    '/webstore/l/eternity-rings/',
    '/webstore/l/wedding-rings/',
    '/webstore/l/ladies-earrings/?icid=ej-tn-jewellery-her-earrings',
    '/webstore/l/rings/price%7con+sale/',
    '/webstore/l/ladies-bracelets/?icid=ej-tn-jewellery-her-bracelets'];

    if (ejPages.indexOf(`${page}`) > -1) {
      runExperiment = true;
    }
  }

  if(getSiteFromHostname() == 'hsamuel') {
    // HS-specific JS
    const hsPages = ['/webstore/l/earrings-for-ladies/',
    '/webstore/l/jewellery/category%7crings/recipient%7cher/?icid=hs-nv-jewellery-her-rings',
    '/webstore/l/diamonds/category%7crings/occasion%7cengagement/',
    '/webstore/l/jewellery/category%7cnecklaces/recipient%7cher/?icid=hs-nv-jewellery-her-necklaces',
    '/webstore/l/mens-bracelets/',
    '/webstore/l/jewellery/category%7cbangles%7cbracelets/recipient%7cher/?icid=hs-nv-jewellery-her-bracelets',
    '/webstore/l/jewellery/category%7cnecklaces/recipient%7chim/',
    '/webstore/l/jewellery/recipient%7cher/?icid=hs-jp-ladies-jewellery'];

    if (hsPages.indexOf(`${page}`) > -1) {
      runExperiment = true;
    }
  }

  return runExperiment;
};

export const getMostPopularMetalFilters = (metalFilterOptions, availableFilters, preSelectedFilters) => {
  const { ID, VARIATION } = shared;

  [].forEach.call(metalFilterOptions, (metal) => {
    const name = metal.querySelector('.filters-panel__refinement-title').innerText.trim().toLowerCase();
    if (name.indexOf('white gold') > -1) {
      metal.setAttribute('id', 'whiteGold');
      availableFilters.push('whiteGold');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('whiteGold');
      }
    } else if (name.indexOf('yellow gold') > -1) {
      metal.setAttribute('id', 'yellowGold');
      availableFilters.push('yellowGold');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('yellowGold');
      }
    } else if (name.indexOf('rose gold') > -1) {
      metal.setAttribute('id', 'roseGold');
      availableFilters.push('roseGold');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('roseGold');
      }
    } else if (name.indexOf('two colour gold') > -1) {
      metal.setAttribute('id', 'twoColourGold');
      availableFilters.push('twoColourGold');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('twoColourGold');
      }
    } else if (name.indexOf('all silver') > -1) {
      metal.setAttribute('id', 'allSilver');
      availableFilters.push('allSilver');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('allSilver');
      }
    } else if (name.indexOf('platinum') > -1) {
      metal.setAttribute('id', 'platinum');
      availableFilters.push('platinum');
      if (metal.classList.contains('checked')) {
        preSelectedFilters.push('platinum');
      }
    }
  });

};


export const generateFiltersContainer = (availableFilters, preSelectedFilters) => {
  const { ID, VARIATION } = shared;

  let filterHeader = 'Shop by Metal';
  if (VARIATION == '2') {
    filterHeader = 'Shop by Metal:';
  }

  const metalFiltersContainer = `<div class="${ID}-metalFilters__wrapper v${VARIATION}">
      <h2>${filterHeader}</h2>
      <div class="${ID}-list__wrapper">
        <ul class="${ID}-metalOptions">
          <li data-option="whiteGold">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="white-gold-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-white-gold.svg">
            <p>White Gold</p>
          </li>
          <li data-option="yellowGold">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="yellow-gold-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-yellow-gold.svg">
            <p>Yellow Gold</p>
          </li>
          <li data-option="roseGold">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="rose-gold-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-rose-gold.svg">
            <p>Rose Gold</p>
          </li>
          <li data-option="twoColourGold">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="two-colour-gold-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-two-colour-gold.svg">
            <p>Two Color Gold</p>
          </li>
          <li data-option="allSilver">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="all-silver-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-all-silver.svg">
            <p>All Silver</p>
          </li>
          <li data-option="platinum">
            <img onerror="this.onerror=null;this.src='//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/blank-swatch.svg';" alt="platinum-icon" src="//d2r6ga9xnxj9b6.cloudfront.net/icons/swatches/swatches-platinum.svg">
            <p>Platinum</p>
          </li>
        </ul>
      </div>
    </div>`;
  

  // document.querySelector('.browse__header-section.browse__header-section--filters-applied').insertAdjacentHTML('beforebegin', metalFiltersContainer);
  if (!document.querySelector(`.${ID}-page-heading`) && !document.querySelector(`.${ID}-metalFilters__wrapper`)) {
    document.querySelector('h1.page-heading').insertAdjacentHTML('afterend', metalFiltersContainer);

    const metallicFilters = document.querySelectorAll(`ul.${ID}-metalOptions li`);
    [].forEach.call(metallicFilters, (filter) => {
      const filterId = filter.getAttribute('data-option');
      if (availableFilters.indexOf(`${filterId}`) == -1) {
        filter.setAttribute('style', 'display: none;');
      }
      if (preSelectedFilters.indexOf(`${filterId}`) > -1) {
        filter.classList.add('selected');
      } 
      filter.addEventListener('click', () => {
        document.querySelector(`a.filters-panel__refinement-link#${filterId}`).click();
      });

    });
  }
};
