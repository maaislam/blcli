/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';
//import gridData from './grid-data';
import bestsellers from './bestsellers';

/**
 * Helper determine if is brand page
 */
const isBrandPage = () => !!document.body.classList.contains('ambrand-index-index');

/**
 * Reform brand title
 */
const reformBrandTitle = (elmToWrapSelector = '.main-title') => {
  const title = document.querySelector(elmToWrapSelector);

  if(title) {
    const newWrapper = document.createElement('div');
    newWrapper.classList.add(`${shared.ID}-brand-title-wrapper`);

    title.insertAdjacentElement('afterend', newWrapper);
    
    newWrapper.insertAdjacentElement('beforeend', title);

    if(!isMobile()) {
      const brandBylineText = document.querySelector('.brand-byline-text');
      const inner = document.createElement('div');
      inner.classList.add('main-title-wrap');

      newWrapper.insertAdjacentElement('afterbegin', inner);
      inner.insertAdjacentElement('afterbegin', title);

      if(brandBylineText) {
        inner.insertAdjacentElement('beforeend', brandBylineText);
      }
    }
  }

};

// Review banner changes
const reviewBanner = () => {
    const reviewBlocks = document.querySelectorAll('.review-banner-conveyor-belt .slick-slide');
    for (let index = 0; index < reviewBlocks.length; index += 1) {
        const element = reviewBlocks[index];
        
        const stars = element.querySelector('.review-star-rating');
        const quote = element.querySelector('.review-quote');

        quote.insertAdjacentElement('beforebegin', stars);
        
    }
}

// featured banner changes
const featuredInBanner = () => {
    const featuredBanner = document.querySelector('.as-seen-block .review-banner-fade');
    featuredBanner.insertAdjacentHTML('afterbegin', `<span class="${shared.ID}-featured_title">We've been featured in:</span>`);
    
    document.querySelector('.review-banner-text div:last-of-type').textContent = 'Fans say';
}

/**
 * Helper is mobile
 */
const isMobile = () => window.innerWidth < 768;

/**
 * Helper create sort and filters bar
 *
 * Style consistent between brand vs non-brand PLPs
 */
const createSortAndFilterBar = (elmToInsertBefore) => {
  const html = `
    <div class="${shared.ID}-filter-sort">
      <div class="${shared.ID}-filter-sort__filter"><a>Filter</a></div>
      <div class="${shared.ID}-filter-sort__sort">
        <a>Sort</a>
      </div>

      <div class="${shared.ID}-filter-sort__sort-opts">
        <ul>
          <li>
            <a target="product_list_dir=asc">Recommended</a>
          </li>
          <li>
            <a target="product_list_order=price&product_list_dir=desc">Price (High to Low)</a>
          </li>
          <li>
            <a target="product_list_order=price&product_list_dir=asc">Price (Low to High)</a>
          </li>
          <li>
            <a target="product_list_order=name&product_list_dir=asc">Product Name</a>
          </li>
          <li>
            <a target="product_list_order=popularity&product_list_dir=desc">Popularity</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  elmToInsertBefore.insertAdjacentHTML('beforebegin', html);
};

/**
 * Create grid images
 
const createGridImages = () => {

  if(!isBrandPage()) {
    const gridDataCloned = JSON.parse(JSON.stringify(gridData));

    // Replace the images already there
    [].forEach.call(
      document.querySelectorAll('.product-item > .product-item-info > img'),
      (img) => {
        img.parentElement.innerHTML = `
          <div class="${shared.ID}-custom-grid-item">
            <span class="${shared.ID}-rhombusbg"></span>
            <img src="${gridDataCloned[0].image}">
            <hr>
            <span>${gridDataCloned[0].text}</span>
          </div>
        `;

        gridDataCloned.shift();
      }
    );
  } else {
    const gridDataCloned = JSON.parse(JSON.stringify(gridData));
    const productItems = document.querySelectorAll('.product-item');
    [].forEach.call(productItems, (item, idx) => {
      if(gridDataCloned.length && (idx + 3) % 4 == 0) {
        item.insertAdjacentHTML('afterend', `
          <li class="item product product-item">
            <div class="product-item-info" data-container="product-grid">
              <div class="${shared.ID}-custom-grid-item">
                <img src="${gridDataCloned[0].image}">
                <hr>
                <span>${gridDataCloned[0].text}</span>
              </div>
            </div>
          </li>
        `);

        gridDataCloned.shift();
      }
    });
  }
};*/

/**
 * carousel reset
 */
const rebuildOwl = () => {
  jQuery('#brands_slider .slick').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
  jQuery('#brands_slider .slick').find('.owl-stage-outer').children().unwrap();
  jQuery('#brands_slider .slick').owlCarousel({
      loop: true,
      dots: true,
      responsive: {
          0: {
              items: 4,
              nav: false,
              dots: true
          },
          500: {
              items: 4,
              nav: false,
              dots: true
          },
          768: {
              items: 6,
              nav: true,
              dots: false
          },
          991: {
              items: 8,
              dots: false,
              nav: true
          },
          1200: {
              items: 10,
              dots: false,
              nav: true
          }
      }
  });
};



/**
 * Entry point for experiment
 */
export default () => {
  setup();

  document.body.classList.add(`${shared.ID}-${isBrandPage() ? 'brand' : 'nonbrand'}`);

  // -----------------------------------------------------------
  // Review / feature banners
  // -----------------------------------------------------------
  pollerLite([
    '.review-banner-conveyor-belt .slick-slide',
    '.as-seen-block .review-banner-fade .label',
  ], () => {
    reviewBanner();
    featuredInBanner();
  });

  // -----------------------------------------------------------
  // Reform the page title
  // -----------------------------------------------------------
  if(isBrandPage()) {
    reformBrandTitle();

    const mainContent = document.querySelector('#maincontent');
    const brandTitleWrapper = document.querySelector(`.${shared.ID}-brand-title-wrapper`);
    if(mainContent && brandTitleWrapper) {
      mainContent.insertAdjacentElement('beforebegin', brandTitleWrapper);
    }
  }
  
  // -----------------------------------------------------------
  // Brand slider after title
  // -----------------------------------------------------------
  if(isMobile()) {
    const pageTitle = document.querySelector('.page-title-wrapper');
    const brandsBarContainer = document.querySelector('.brands-bar-container');
    if(pageTitle && brandsBarContainer) {
      pageTitle.insertAdjacentElement('afterend', brandsBarContainer);
    }

    const breadcrumbs = document.querySelector('.breadcrumbs');
    if(isBrandPage() && breadcrumbs) {
      brandsBarContainer.insertAdjacentElement('afterbegin', breadcrumbs);
    }

    pollerLite(['#brands_slider .owl-loaded'], () => {
      rebuildOwl();

      // Image set as background on the slider balls
      jQuery('#brands_slider .slick .owl-item').each((idx, item) => {
        const a = jQuery(item).find('a');
        const img = jQuery(item).find('img');
        a[0].style.backgroundImage = 'url(' + img.attr('src') + ')';
      });

    });
  }
  
  // -----------------------------------------------------------
  // On non-brand pages, move categories into the menu
  // -----------------------------------------------------------
  if(!isBrandPage()) {
    const menu = document.querySelector('#narrow-by-list');
    const subcategoriesLinks = document.querySelectorAll('.subcategories-filters .subcategory-link a');

    if(menu && subcategoriesLinks.length) {
      const headerHtml = `<dt role="heading" aria-level="3" 
        class="filter-options-title ${shared.ID}-cats"
        >Category</dt>`;

      let filterOptsHtml = `<dd class="filter-options-content ${shared.ID}-custom-opts"><ol class="items">`;

      [].forEach.call(subcategoriesLinks, (link) => {
        filterOptsHtml += `
          <li class="item">
            <a href="${link.href}">${link.innerText.trim()}</a>
          </li>
        `;
      });

      filterOptsHtml += `</ol></dd>`;

      menu.insertAdjacentHTML('afterbegin', filterOptsHtml);
      menu.insertAdjacentHTML('afterbegin', headerHtml);
    }
  }

  // -----------------------------------------------------------
  // Sort and filter bars
  // -----------------------------------------------------------
  if(isMobile()) {
    let elmToInsertBefore = null;
    if(isBrandPage()) {
      elmToInsertBefore = document.querySelector('.brand-list-wrapper');
    } else {
      elmToInsertBefore = document.querySelector('.subcategory-filters');
    }

    if(elmToInsertBefore) {
      // Create sort / filter bar
      createSortAndFilterBar(elmToInsertBefore);

      // Show page x of y summary
      const filterSortWrapper = document.querySelector(`.${shared.ID}-filter-sort`);
      const toolbarAmount = document.querySelector('#toolbar-amount');

      if(toolbarAmount && filterSortWrapper) {
        filterSortWrapper.insertAdjacentHTML('afterend', `
          <div class="${shared.ID}-toolbar-amount">
            ${toolbarAmount.innerText.trim().replace('Items', 'Showing')} items
          </div>
        `);
      }
    }
  }
  
  // -----------------------------------------------------------
  // Create grid images
  // -----------------------------------------------------------
  //createGridImages();

  // -----------------------------------------------------------
  // Best Sellers
  // -----------------------------------------------------------
  if(isBrandPage()){
    const bestSellingBlock = document.createElement('div');
    bestSellingBlock.classList.add(`${shared.ID}-bestSellers`);
    bestSellingBlock.innerHTML = `
    <div class="${shared.ID}-container">
    <h3>Best Sellers</h3>
    <div class="${shared.ID}-products"></div>
    </div>`;

    document.querySelector('#maincontent').insertAdjacentElement('afterbegin', bestSellingBlock);

    bestsellers();

    // put in carousel
    const buildBestsellingCarousel = () => {
        jQuery(`.${shared.ID}-bestSellers .${shared.ID}-products`).slick({
          dots: true,
          mobileFirst: true,
          slidesToShow: 1,
          responsive: [{

            breakpoint: 400,
            settings: {
              slidesToShow: 2,
            }
      
          }, {
      
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
            }
      
          }, {
      
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            }
      
          }]
        });
                 
    }

    if(document.querySelector(`.${shared.ID}_bestSelling`)) {
         /* Put best selling in a carousel*/
         pollerLite(['.reviews.slick-initialized'], () => {
          buildBestsellingCarousel();
        });
    }
  }
  
  // -----------------------------------------------------------
  // Product items prefix
  // -----------------------------------------------------------
  const changeProductTitle = () => {
    const productNameElms = document.querySelectorAll('.product-item-details .product-item-name');
    [].forEach.call(productNameElms, (productNameElm) => {
      const link = productNameElm.querySelector('.product-item-link');
      if(link) {
        const text = link.innerText.trim();
        const regex = /^([^:]+:)/i;
        const regexMatches = text.match(regex);
  
        if(regexMatches && regexMatches[1]) {
          const newTitle = text.replace(regex, '');
          link.innerHTML = newTitle;
  
          link.insertAdjacentHTML('afterbegin', `
            <span class="${shared.ID}-cat-name">${regexMatches[1].replace(/:$/, '')}</span>
          `);
        }
      }
    });
  }
  changeProductTitle();
   
  // -----------------------------------------------------------
  // Filter handling
  // -----------------------------------------------------------
  if(isMobile()) {
    const filterButton = document.querySelector(`.${shared.ID}-filter-sort__filter a`);
    const sortButton = document.querySelector(`.${shared.ID}-filter-sort__sort a`);
    const filterBlock = document.querySelector('.page-products .block.filter');
    const sortOpts = document.querySelector(`.${shared.ID}-filter-sort__sort-opts`);
    const refineButton = document.querySelector('#refine-products-button');

    // Mod filter block
    if(filterBlock && filterButton) {
      filterButton.addEventListener('click', () => {
        filterBlock.classList.add(`${shared.ID}-block-filter-active`);
      });

      const filterTitle = filterBlock.querySelector(`.filter-title`);
      if(filterTitle) {
        filterTitle.innerHTML = `<strong>Filter by</strong><span class="${shared.ID}-filter-close">&times;</span>`;

        filterTitle.addEventListener('click', () => {
          filterBlock.classList.remove(`${shared.ID}-block-filter-active`);
        });
      }

      // options headings
      const opts = filterBlock.querySelector('.filter-options');
      if(opts) {
        const optsHeadings = opts.querySelectorAll('.filter-options-title');
        [].forEach.call(optsHeadings, (heading) => {
          heading.addEventListener('click', () => {
            const nextContent = heading.nextElementSibling;
            if(nextContent) {
              if(nextContent.classList.contains('xhide')) {
                nextContent.classList.remove('xhide');
              } else {
                nextContent.classList.add('xhide');
              }

              if(heading.classList.contains('xactive')) {
                heading.classList.remove('xactive');
              } else {
                heading.classList.add('xactive');
              }
            }
          });
        });
      }
    } else if(filterButton && isBrandPage() && refineButton) {
      filterButton.addEventListener('click', () => {
        refineButton.click();
      });
    }

    // MOd sort block
    if(sortButton && sortOpts) {
      sortButton.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('xactive')) {
          e.currentTarget.classList.remove('xactive');
        } else {
          e.currentTarget.classList.add('xactive');
        }

        if(sortOpts && sortOpts.classList.contains(`${shared.ID}-filter-sort__sort-opts--active`)) {
          sortOpts.classList.remove(`${shared.ID}-filter-sort__sort-opts--active`);
        } else if(sortOpts && !sortOpts.classList.contains(`${shared.ID}-filter-sort__sort-opts--active`)) {
          sortOpts.classList.add(`${shared.ID}-filter-sort__sort-opts--active`);
        }
      });

      [].forEach.call(sortOpts.querySelectorAll('li'), (opt) => {
        const optLink = opt.querySelector('a');

        if(optLink) {
          optLink.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('target');
            if(target) {
              window.location.search = target;
            }
          });

          // On page load prepopulate sort opts
          const target = optLink.getAttribute('target');

          if(target == window.location.search.replace('?', '')) {
            // Is active
            opt.classList.add(`xactive`);
          }
        }
      });
    }
  } else {
    const filterBlock = document.querySelector('.page-products .block.filter');
    if(filterBlock) {
      const opts = filterBlock.querySelector('.filter-options');
      if(filterBlock && opts) {
        const optsHeadings = opts.querySelectorAll('.filter-options-title');
        [].forEach.call(optsHeadings, (heading) => {
          heading.addEventListener('click', () => {
            const nextContent = heading.nextElementSibling;
            if(nextContent) {
              if(nextContent.classList.contains('xhide')) {
                nextContent.classList.remove('xhide');
              } else {
                nextContent.classList.add('xhide');
              }

              if(heading.classList.contains('xactive')) {
                heading.classList.remove('xactive');
              } else {
                heading.classList.add('xactive');
              }
            }
          });
        });
      }
    }
  }
  
  // -----------------------------------------------------------
  // Sticky filter on scroll
  // -----------------------------------------------------------
  if(isMobile()) {
    const sort = jQuery(`.${shared.ID}-filter-sort`);
    let sortPos = sort.offset().top;
    jQuery(window).on('scroll', () => {
      if(window.scrollY >= sortPos) {
        sort.addClass(`${shared.ID}-sticky`);
      } else {
        sort.removeClass(`${shared.ID}-sticky`);
        sortPos = sort.offset().top;
      }
    });
  }

  // -----------------------------------------------------------
  // Other Desktop changes
  // -----------------------------------------------------------
  if(!isMobile()) {
    // bc
    const breadcrumbs = document.querySelector('.breadcrumbs');
    const reviewFans = document.querySelector('.review-fans');
    if(reviewFans && breadcrumbs) {
      reviewFans.insertAdjacentElement('afterend', breadcrumbs);
    }

    // title non brand
    if(!isBrandPage()) {
      const mainContent = document.querySelector('#maincontent');
      const ptw = document.querySelector('.page-title-wrapper');
      const txt = document.querySelector('.category-description');

      if(mainContent && ptw) {
        mainContent.insertAdjacentElement('beforebegin', ptw);
      }

      if(txt) {
        ptw.insertAdjacentElement('beforeend', txt);
      }

      const tp = document.querySelector('.toolbar-products');
      if(tp && ptw) {
        const d = document.createElement('div');
        d.classList.add(`${shared.ID}-toolbarwrap`);

        d.insertAdjacentElement('afterbegin', tp);
        ptw.insertAdjacentElement('afterend', d);
      }
    }
  }


  // Trigger resize fixes any failed lazy loaded plp images
  setTimeout(() => {
    window.jQuery(window).trigger('resize');
  }, 2000);
};
