/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { getCategory } from './helpers';
import shared from './shared';
import { filterCategories, addLogos } from './components/filterData';
import priceSlider from './components/priceSlider';

export default () => {
  setup();

  const { ID } = shared;


  /**
   * Recreate the title
   */
  const recreateHeader = () => {
    const title = document.querySelector('.page-heading');

    let pageDesc;

    if(document.querySelector('.browse__main-content .seo-intro')) {
      pageDesc = document.querySelector('.browse__main-content .seo-intro').textContent;
    } else if(document.querySelector('.seo-text-block__text-container') && document.querySelector('.seo-text-block__text-container').textContent.trim().match(/^(.*?)[.?!]\s/)[0]) {
      pageDesc = document.querySelector('.seo-text-block__text-container').textContent.trim().match(/^(.*?)[.?!]\s/)[0];
    } else {
      pageDesc = '';
    }

    const newHeader = document.createElement('div');
    newHeader.classList.add(`${ID}-categoryHeader`);
    newHeader.innerHTML = `<h1>${title.textContent}</h1>
    ${pageDesc !== '' ? `<p>${pageDesc}</p>` : ''}`;

    document.querySelector('.page-heading').insertAdjacentElement('afterend', newHeader);
  }


  /**
   * Create the filter block
   */
  const createFilterHeader = () => {
    const filterBlock = document.createElement('div');
    filterBlock.classList.add(`${ID}-filterBlock`);
    filterBlock.innerHTML = `<div class="${ID}-filters-inner"></div>
    <div class="${ID}-moreFilters"><span>More Filters</span></div>`;
    
    document.querySelector(`.${ID}-categoryHeader`).insertAdjacentElement('afterend', filterBlock);
  }

  /**
   * Create the 3 filter categories based on page
   */
  const addHeadlineFilterBlocks = () => {
    const filterObj = filterCategories[getCategory()];
    

    Object.keys(filterObj).forEach((i) => {
      const category = filterObj[i];

      const filterCat = document.createElement('div');
      filterCat.classList.add(`${ID}-category`);

      // add a class for the price section
      if([i][0] === 'Price') {
        filterCat.classList.add(`${ID}-priceFilter`);
      }

      filterCat.innerHTML = `<h3>${[i][0]}</h3>${[i][0] !== 'Price' ? `<div class="${ID}-cat-filters"></div>` : ''}`;
      document.querySelector(`.${ID}-filterBlock .${ID}-filters-inner`).appendChild(filterCat);

      if(category.filterTarget) {
        const matchingFilter = document.querySelector(`#filters-panel ${category.filterTarget}`);
       
        if(matchingFilter) {
          matchingFilter.style.display = 'none';
          const refinementLinks = matchingFilter.querySelectorAll('.filters-panel__refinement-link');
      

          [].forEach.call(refinementLinks, (link) => {
            link.classList.remove('filters-panel__refinement-link');
            link.classList.add(`${ID}-categoryLink`);

            // make icon background image
            const icon = link.querySelector('.filters-panel__swatch img');
            if(icon) {
              link.querySelector('.filters-panel__swatch').setAttribute('style', `background-image:url('${icon.getAttribute('src')}')`);
            }

            // add class to stone types
            if(category.filterTarget === '#refinement-stone-shape') {
              link.classList.add(`${ID}-stoneType`);
            }
            filterCat.querySelector(`.${ID}-cat-filters`).appendChild(link);
          });

        } else {
          filterCat.classList.add(`${ID}_nocontent`);
        }
      }
    });
  }


  const removeRefinementLink = () => {
    let subLinks;
    if(getCategory() === 'Watches') {
      subLinks = document.querySelectorAll('#refinement-recipient .filters-panel__sub-refinement');
    
      for (let index = 0; index < subLinks.length; index += 1) {
        const element = subLinks[index];
        element.remove();
      }
    }
  }

  /** 
   * More Filters click event
   */
  const clickMoreFilters = () => {
    const filters = document.querySelector('.browse__list-controls .js-modal-trigger');
    const desktopFilters = document.querySelector('.browse__header-section');

    const moreFiltersLink = document.querySelector(`.${ID}-moreFilters`);

    moreFiltersLink.addEventListener('click', () => {
      if(filters && window.innerWidth < 1024) {
          filters.click();
      } else if(desktopFilters && window.innerWidth >= 1024) {
        if(desktopFilters.classList.contains(`${ID}_filterShow`)) {
          desktopFilters.classList.remove(`${ID}_filterShow`);
          moreFiltersLink.querySelector('span').textContent = 'More Filters';
        } else {
          desktopFilters.classList.add(`${ID}_filterShow`);
          moreFiltersLink.querySelector('span').textContent = 'Less Filters';
        }
      }
    });
  }


  /**
   * put categories in slick slider
   */
  const slickFilters = () => {
    const initSlick = () => {

      window.jQuery(`.${ID}-cat-filters`).slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        rows: 0,
        nextArrow: `<button class="slide-arrow ${ID}-next"></button>`,
        responsive: [
        {
          breakpoint: 9999,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots:false,
          }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        }
        },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: true,
          dots: false,
          draggable: true,
        }
      }]
      }); 
    };

    if(document.querySelector(`.${ID}-cat-filters`)) {
      if(window.jQuery.fn.slick) {
        initSlick();
      } else {
        window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
          initSlick();
        });
      }
    }
  }



  if(shared.VARIATION === '1') {
    /**
     * Add icons to the filters
     */
    if(getCategory('Watches') || getCategory('Jewellery')) {
      addLogos();
    }


    recreateHeader();
    createFilterHeader();
    removeRefinementLink();
    addHeadlineFilterBlocks();
    clickMoreFilters();
    slickFilters();
    priceSlider();
  }

};
