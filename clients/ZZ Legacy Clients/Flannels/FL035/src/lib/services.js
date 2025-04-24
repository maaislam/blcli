import { fullStory, getCookie, setCookie, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

events.analyticsReference = '_gaUAT';

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
}

export { setup }; // eslint-disable-line

/**
 * @desc Adds 'Top Brands' to the top of the page
 * dependant on cookies
 * @param {Element} ref
 */
export const topBrands = (ref) => {
  const origin = 'https://www.flannels.com/';
  let brandList = null;
  // let brand = getCookie('FL035-brand');
  // if (!brand) {
  //   brand = '';
  // }
  const currentTitle = document.querySelector('h1.BrandsHead');
  let title;
  if (currentTitle) {
    title = currentTitle.textContent.toLowerCase();
    title = title.match(/^\w+/)[0];
  }
  if (ref) {
    switch (title) {
      case 'mens':
        brandList = `
          <h1 class="FL035-brand-title">MENS TOP BRANDS</h1>
          <ul class="FL035-brandList">
            <li><a href="${origin}men/brands/moncler">Moncler</a></li>
            <li><a href="${origin}men/brands/stone-island">Stone Island</a></li>
            <li><a href="${origin}men/brands/cp-company">CP Company</a></li>
            <li><a href="${origin}men/brands/gucci">Gucci</a></li>
            <li><a href="${origin}men/brands/dsquared2">Dsquared2</a></li>
          </ul>
        `;
        break;
      case 'womens':
        brandList = `
          <h1 class="FL035-brand-title">WOMENS TOP BRANDS</h1>
          <ul class="FL035-brandList">
            <li><a href="${origin}women/brands/moncler">Moncler</a></li>
            <li><a href="${origin}women/brands/gucci">Gucci</a></li>
            <li><a href="${origin}women/brands/canada-goose">Canada Goose</a></li>
            <li><a href="${origin}women/brands/valentino">Valentino</a></li>
            <li><a href="${origin}women/brands/saint-laurent">Saint Laurent</a></li>
          </ul>
        `;
        break;
      case 'kids':
        brandList = `
          <h1 class="FL035-brand-title">KIDS TOP BRANDS</h1>
          <ul class="FL035-brandList">
            <li><a href="${origin}kids/view-all#dcp=1&dppp=100&OrderBy=recent&Filter=ABRA%5EStone+Island ">Stone Island</a></li>
            <li><a href="${origin}kids/view-all#dcp=1&dppp=100&OrderBy=recent&Filter=ABRA%5EGucci ">Gucci</a></li>
            <li><a href="${origin}kids/kids-brands/cp-company">CP Company</a></li>
            <li><a href="${origin}kids/view-all#dcp=1&dppp=100&OrderBy=recent&Filter=ABRA%5EDSquared2">Dsquared2</a></li>
            <li><a href="${origin}kids/view-all#dcp=1&dppp=100&OrderBy=recent&Filter=ABRA%5EBoss+Smart+Casual ">Boss</a></li>
          </ul>
        `;
        break;
      default:
        brandList = `
          <h1 class="FL035-brand-title">TOP BRANDS</h1>
          <ul class="FL035-brandList">
            <li><a href="${origin}moncler">Moncler</a></li>
            <li><a href="${origin}stone-island">Stone Island</a></li>
            <li><a href="${origin}cp-company">CP Company</a></li>
            <li><a href="${origin}gucci">Gucci</a></li>
            <li><a href="${origin}dsquared2">Dsquared2</a></li>
          </ul>
        `;
        break;
    }
  }
  ref.insertAdjacentHTML('beforebegin', brandList);
  events.send(settings.ID, 'Active', 'Brand list is active');
};

/**
 * @desc Adds event listener to add cookie on click
 * @param {Element} navEl
 */
export const setCookies = (navEl) => {
  if (navEl) {
    navEl.addEventListener('click', () => {
      const navElText = navEl.textContent;
      if (navElText) {
        navElText.toLowerCase();
      }
      const navElLink = navEl.href;
      
      // Text Content
      if (navElText) {
        if (navElText === 'men') {
          setCookie('FL035-brand', 'men', 999);
        }
        if (navElText === 'mens') {
          setCookie('FL035-brand', 'men', 999);
        }
        if (navElText === 'women') {
          setCookie('FL035-brand', 'women', 999);
        }
        if (navElText === 'womens') {
          setCookie('FL035-brand', 'women', 999);
        }
        if (navElText === 'kids') {
          setCookie('FL035-brand', 'kids', 999);
        }
      }
      // Link href
      if (navElLink) {
        if (navElLink.match(/women/g)) {
          setCookie('FL035-brand', 'women', 999);
        }
        if (navElLink.match(/men/g)) {
          setCookie('FL035-brand', 'men', 999);
        }
        if (navElLink.match(/kids/g)) {
          setCookie('FL035-brand', 'kids', 999);
        }
      }
    });
  }
};

/**
 * Contains functions related to the search brands element
 */
export const searchBrands = {
  addInput(ref, searchForm) {
    if (ref) {
      const html = `
        <div class="FL035-brandSearch">
          <div class="FL035-searchWrap">
            <input type="text" id="FL035-search" placeholder="Search Brands"/>
          </div>
        </div>
      `;
      ref.insertAdjacentHTML('afterend', html);
      events.send(settings.ID, 'Active', 'Brand search is active');
    }
  },
  addInputEvent(searchInput) {
    const brandTitles = document.querySelectorAll('.lettersBoxesColumn table tbody > tr td .letItems a');
    const brandRows = document.querySelectorAll('.lettersBoxesColumn table tbody > tr');

    /**
     * @desc Toggles Brand Titles
     * @param {} key
     */
    const filterBrands = (key) => {
      // Filter Row first
      for (let i = 0; brandTitles.length > i; i += 1) {
        let brandText = brandTitles[i].textContent.trim();
        if (brandText.match(/\(\d+\)/gi)) {
          brandText = brandText.replace(/\(\d+\)/gi, '');
        }
        const parentTd = brandTitles[i].parentElement;
        const parentRow = parentTd.parentElement.parentElement;

        // Hide TD's if not matching
        if (brandText && brandText.toLowerCase().indexOf(key) > -1) {
          if (parentTd) {
            parentTd.style.display = '';
            parentRow.style.display = '';
          }
        } else if (parentTd) {          
          parentTd.style.display = 'none';
        }
      }
    };

    const isHidden = (el) => {
      const style = window.getComputedStyle(el);
      return (style.display === 'none');
    };

    const filterRows = () => {
      if (brandRows.length) {
        for (let i = 0; brandRows.length > i; i += 1) {
          const brandItems = brandRows[i].querySelectorAll('td .letItems');
          const numberOfBrands = brandItems.length;
          let count = 0;
          if (brandItems.length) {
            for (let k = 0; brandItems.length > k; k += 1) {
              const isBrandHidden = isHidden(brandItems[k]);
              if (isBrandHidden === true) {
                count += 1;
              }
              if (count === numberOfBrands) {
                brandRows[i].style.display = 'none';
                const lineBreak = brandRows[i].previousElementSibling;
                if (lineBreak) {
                  lineBreak.style.display = 'none';
                }
              } else {
                brandRows[i].style.display = '';
                const lineBreak = brandRows[i].previousElementSibling;
                if (lineBreak) {
                  lineBreak.style.display = '';
                }
              }
            }
          }
        }
      }
    };

    if (searchInput) {
      searchInput.addEventListener('keyup', () => {
        const searchValue = searchInput.value.toLowerCase();
        filterBrands(searchValue);
        filterRows();
      });
    }
  },
};

/**
 * Adds click events to targeted elements.
 */
export const clickEvents = () => {
  const brandLinks = document.querySelectorAll('.FL035 ul.FL035-brandList li a');
  const searchInput = document.querySelector('.FL035 .FL035-brandSearch input[type="text"]');

  if (brandLinks.length) {
    for (let i = 0; brandLinks.length > i; i += 1) {
      brandLinks[i].addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'User clicked brand');
      });
    }
  }
  if (searchInput) {
    searchInput.addEventListener('click', () => {
      events.send(settings.ID, 'Clicked', 'User clicked brand search input');
    });
  }
};

