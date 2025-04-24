import { fullStory, setCookie, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

/**
 * @param {Elements} brandListEle
 */
function getBrandList(brandListEle) {
  let returnedBrandList;
  if (brandListEle.length) {
    returnedBrandList = Array.from(brandListEle).map((brand) => {
      const brandTitle = brand.getAttribute('data-productname');
      return brandTitle;
    });
  }
  return returnedBrandList;
}

/**
 * @desc Create a select element with the brands as options.
 * @param {Array} brandArray
 */
function buildSelectBox(brandArray) {
  const html = document.createElement('select');
  html.innerHTML = '<option value="" selected disabled>Select Brand</option>';
  if (brandArray && brandArray.length) {
    const brandOptions = brandArray.map((brand) => {
      return `<option value="${brand}">${brand}</option>`;
    }).join('');
    html.insertAdjacentHTML('beforeend', brandOptions);
  }
  return html;
}

/**
 * @desc Builds up the fixed popup element.
 * @param {SelectHTMLElement} selectOne
 * @param {SelectHTMLElement} selectTwo
 * @param {SelectHTMLElement} selectThree
 */
function buildPopup(selectOne, selectTwo, selectThree) {
  let html = null;
  let toggleTitle = 'Find Your Favourite Brands Quicker';
  if (window.innerWidth < 479) {
    toggleTitle = 'Brand<br />Finder';
  }
  if (VARIATION === '2') { 
    toggleTitle = 'Filter by brand';
    if (window.innerWidth < 479) {
      toggleTitle = 'Find Brands';
    }
    if (selectOne && selectTwo && selectThree) {
      html = `
      <div class="FL043-favourite-brands">
        <div class="FL043-closed-brands">
          <div class="FL043-closed-brandsWrap">
            <div id="FL043-mobile-toggle">
              <span></span>
              <span></span>
            </div>
            <h1 class="FL043-closed-brands-title FL043-toggle">${toggleTitle} </h1><span class="FL043-toggle"></span>
          </div>
        </div>
        <div class="FL043-brand-options">
          <span class="FL043-show-mobile FL043-toggle">Hide</span>
          <span class="FL043-toggle"></span>
          <h1>Want to find your favourite brands quicker?</h1>
          <p>Tell us here!</p>

          <div class="FL043-select-wrap">
            ${selectOne.outerHTML}
          </div>
          <div class="FL043-select-wrap">
            ${selectTwo.outerHTML}
          </div>
          <div class="FL043-select-wrap">
            ${selectThree.outerHTML}
          </div>

          <p class="FL043-toggle" id="FL043-close">No thanks. I'm open to all brands</p>

          <button class="FL043-toggle" id="FL043-filter">Apply</button>
        </div>
      </div>
    `;
    }
  } else if (VARIATION === '1') {
    if (selectOne && selectTwo && selectThree) {
      html = `
      <div class="FL043-closed-brands">
        <div class="FL043-closed-brandsWrap">
          <div id="FL043-mobile-toggle">
            <span></span>
            <span></span>
          </div>
          <h1 class="FL043-closed-brands-title">${toggleTitle} <span class="FL043-toggle"></span></h1>
        </div>
      </div>
      <div class="FL043-favourite-brands">
        <div class="FL043-brand-options">
          <span class="FL043-show-mobile FL043-toggle">Hide</span>
          <span class="FL043-toggle"></span>
          <h1>Want to find your favourite brands quicker?</h1>
          <p>Tell us here!</p>

          <div class="FL043-select-wrap">
            ${selectOne.outerHTML}
          </div>
          <div class="FL043-select-wrap">
            ${selectTwo.outerHTML}
          </div>
          <div class="FL043-select-wrap">
            ${selectThree.outerHTML}
          </div>

          <p class="FL043-toggle" id="FL043-close">No thanks. I'm open to all brands</p>

          <button class="FL043-toggle" id="FL043-filter">Apply</button>
        </div>
      </div>
    `;
    }
  }
  return html;
}

/**
 * @desc Toggle the popup 
 * @param {Element} popup
 */
function togglePopup(popup) {
  const clearAll = document.querySelector('#clrallfltrs > a');
  if (popup) {
    Array.from(popup).forEach((item) => {
      item.addEventListener('click', (e) => {
        // Standard toggle
        document.querySelector('.FL043-favourite-brands').classList.toggle('FL043-open');
        events.send(ID, 'Click', 'Component was toggled');
        // Remove all filters
        if (clearAll) {
          clearAll.click();
        }
        // Perm close
        if (e.target.getAttribute('id') === 'FL043-close') {
          document.querySelector('.FL043-favourite-brands').classList.remove('FL043-open');
          setCookie('FL043-no-show', true, 999);
          // Remove all filters
          if (clearAll) {
            clearAll.click();
          }
          events.send(ID, 'Click', 'User has permanently closed the component');
        }
        // Apply
        if (e.target.getAttribute('id') === 'FL043-filter') {
          if (!document.body.classList.contains('FL043-2')) {
            document.querySelector('.FL043-closed-brands').classList.add('FL043-closed-brands--small');
          }
          document.querySelector('.FL043-favourite-brands').classList.remove('FL043-open');
          events.send(ID, 'Click', 'Applied Brand Filters');
        }
        // Mobile toggle (perm close)
        if (e.target.getAttribute('id') === 'FL043-close') {
          // Remove popup
          document.querySelector('.FL043-closed-brands').classList.add('FL043-hide');
          e.target.parentElement.classList.add('FL043-hide');
          setCookie('FL043-no-show', true, 999);
          events.send(ID, 'Click', 'User has permanently closed the component');
        }
      });
    });
  }
}

/**
 * @desc Adds the Popup to the page.
 * @param {Element} html
 * @param {Element} ref
 */
function addHtml(html, ref) {
  if (html && ref) {
    ref.insertAdjacentHTML('beforeend', html);
    if (VARIATION === '2') {
      events.send(ID, 'Added', 'Variation 2 has been added');
    }
    if (VARIATION === '1') {
      events.send(ID, 'Added', 'Variation 1 has been added');
    }
  }
}

/**
 * @desc On click of 'Apply' match the select values to filters and click.
 * @param {Element} applyCta
 * @param {NodeList} brandSelects
 * @param {NodeList} siteBrandList
 */
function applyFilters(applyCta, brandSelects, siteBrandList) {
  if (applyCta && siteBrandList) {
    // Watch for click and collect brand values from selects.
    applyCta.addEventListener('click', (e) => {
      const appliedBrands = [];
      e.preventDefault();
      Array.from(brandSelects).filter((brandSelect) => {
        if (brandSelect.value !== '') {
          if (appliedBrands.indexOf(brandSelect.value) === -1) {
            appliedBrands.push(brandSelect.value);
          }
        }
      });
      if (siteBrandList) {
        // Loop over the existing site brands and match.
        appliedBrands.forEach((brand) => {
          Array.from(siteBrandList).filter((siteBrand) => {
            const siteBrandDataname = siteBrand.getAttribute('data-productname');
            if (siteBrandDataname === brand) {
              const brandLink = siteBrand.querySelector('a');
              const activeFilter = siteBrand.querySelector('a span.SelectedFilter');
              if (brandLink) {
                if (!activeFilter) {
                  brandLink.click();
                }
              }
            }
          });
        });

        const numberOfBrands = appliedBrands.length;
        events.send(settings.ID, 'Click', `${numberOfBrands} brands filters have been added`);
      }
      if (appliedBrands.length) {
        // Save brand list for future visits to the PLP.
        const brandListString = `#dcp=1&dppp=100&OrderBy=rank&Filter=ABRA%5E${appliedBrands.join(',').replace(/\s/g, '+')}`;
        localStorage.setItem('FL043-prevBrands', brandListString);
      }
    });
  }
}

/**
 * @desc If previously selected brands via new filter then apply those filters to all PLP.
 */
function addBrands() {
  const storedBrandList = localStorage.getItem('FL043-prevBrands');
  // Check if page is PLP
  if (document.body.classList.contains('flanProdList') && storedBrandList) {
    // Check if already has brand filters applied
    window.location.href.indexOf('Filter') > 1 ? null : window.location.href = `${window.location.href}${storedBrandList}`;
  }
}

export { setup, getBrandList, buildSelectBox, buildPopup, addHtml, togglePopup, applyFilters, addBrands }; // eslint-disable-line
