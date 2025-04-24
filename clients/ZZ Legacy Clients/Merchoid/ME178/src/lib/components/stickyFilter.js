import { pollerLite } from '../../../../../../lib/uc-lib';
import { scrollTo } from '../../../../../../lib/utils';

// import { scrollTo } from '../../../../../../lib/utils';

export default () => {
  let jumperText;
  /* eslint-disable */
  if (wc_aelia_currency_switcher_params.selected_currency !== 'GBP') {
    jumperText = 'Sweaters';
  } else {
    jumperText = 'Jumpers';
  }
  /* eslint-enable */

  const brandCategory = {
    marvel: {
      category: 'marvel',
      image: '//cdn.optimizely.com/img/8355110909/f647b61c306d4ec386c469b7669d5ea1.jpg',
      name: 'Marvel',
    },
    'star-wars': {
      category: 'star-wars',
      image: '//cdn.optimizely.com/img/6087172626/beffe6c3daae4145b55a5b8ba4117e7f.jpg',
      name: 'Star Wars',
    },
    dc: {
      category: 'dc',
      image: '//cdn.optimizely.com/img/6087172626/9fadb754dc014f11b33b56954960dde4.jpg',
      name: 'DC Comics',
    },
    gaming: {
      category: 'gaming',
      image: '//cdn.optimizely.com/img/6087172626/29beb0236ecc439eac6e38aa5fbfaf1a.jpg',
      name: 'Gaming',
    },
    fortnite: {
      category: 'fortnite',
      image: '//cdn.optimizely.com/img/6087172626/91aa461158024ed9b81a2b5a24930688.png',
      name: 'Fornite',
    },
    tv: {
      category: 'tv',
      image: '//cdn.optimizely.com/img/6087172626/7cb3d6ca4eb548889dc7de2b11f9568a.jpg',
      name: 'TV',
    },
    disney: {
      category: 'disney',
      image: '//cdn.optimizely.com/img/6087172626/18ae4359ad834f19aab7e08ee1f33097.jpg',
      name: 'Disney',
    },
    harrypotter: {
      category: 'harrypotter',
      image: '//cdn.optimizely.com/img/6087172626/ff01ef04cf504569a9bf7e6417327e32.jpg',
      name: 'Harry Potter',
    },
  };

  const stickyFilter = document.createElement('div');
  stickyFilter.classList.add('ME178-categories_filter');
  stickyFilter.innerHTML = `<div class="ME178-filterName">Filter ${jumperText}</div>`;
  document.body.append(stickyFilter);

  // create the lightbox and overlay
  const brandsBox = document.createElement('div');
  brandsBox.classList.add('ME178-brands_filters');
  brandsBox.innerHTML = '<div class="ME178-filter_close">&times;</div><span class="ME178-filter_title">Filter by brand</span><div class="ME178-brands"></div><div class="ME178-apply"><span>Apply Filters</span></div>';
  document.body.append(brandsBox);

  const overlay = document.createElement('div');
  overlay.classList.add('ME178-overlay');
  document.body.append(overlay);
  pollerLite(['.ME178-brands_filters', '.ME178-categories_filter'], () => {
    // add all the brands to the lightbox
    const addBrandsToLightBox = () => {
      Object.keys(brandCategory).forEach((i) => {
        const data = brandCategory[i];
        // to get the key - [i][0]
        const categoryFilter = document.createElement('div');
        categoryFilter.classList.add('ME178-category_brand');

        const categories = [data.category];
        if (data.category === 'tv' || data.category === 'gaming') {
          categories.push(`${data.category}-products`);
        }

        categoryFilter.setAttribute('data-target', JSON.stringify(categories));
        categoryFilter.innerHTML = `<span style="background-image:url('${data.image}')"></span><p>${data.name}</p>`;
        document.querySelector('.ME178-brands_filters .ME178-brands').appendChild(categoryFilter);
      });

      // Add IDs to untagged blocks
      const gaming = document.querySelector('#gaming .woocommerce.columns-4');
      const tv = document.querySelector('#tv .woocommerce.columns-4');
      gaming.id = 'gaming-products';
      tv.id = 'tv-products';
      gaming.classList.add('ME178-show_brand');
      tv.classList.add('ME178-show_brand');
    };
    addBrandsToLightBox();

    // add classes to all divs if they match brand
    const addBrandClasses = () => {
      const allCategories = document.querySelectorAll('.entry-content div');

      Object.keys(brandCategory).forEach((i) => {
        const data = brandCategory[i];
        // to get the key - [i][0]
        for (let index = 0; index < allCategories.length; index += 1) {
          const element = allCategories[index];
          if (data.category === element.id) {
            element.classList.add('ME178-show_brand');
          }
        }
      });
    };
    // open the lightbox
    stickyFilter.addEventListener('click', () => {
      addBrandClasses();
      if (brandsBox.classList.contains('ME178-brands_show')) {
        brandsBox.classList.remove('ME178-brands_show');
        overlay.classList.remove('ME178-overlay_show');
      } else {
        brandsBox.classList.add('ME178-brands_show');
        overlay.classList.add('ME178-overlay_show');
      }
    });

    const closeLightBox = () => {
      const lightbox = document.querySelector('.ME178-brands_filters');
      const overlayWrapper = document.querySelector('.ME178-overlay');
      lightbox.classList.remove('ME178-brands_show');
      overlayWrapper.classList.remove('ME178-overlay_show');

      // reset the filterd
      /* const selectedFilters = document.querySelectorAll('.ME178-filter_selected');
      if (selectedFilters) {
        for (let index = 0; index < selectedFilters.length; index += 1) {
          const element = selectedFilters[index];
          element.classList.remove('ME178-filter_selected');
        }
      } */
      scrollTo(0, 0);
    };

    // close the lightbox on overlay/exit
    overlay.addEventListener('click', () => {
      closeLightBox();
    });
    brandsBox.querySelector('.ME178-filter_close').addEventListener('click', () => {
      closeLightBox();
    });


    // check/uncheck stcik filters when clicked
    const checkFilters = () => {
      const allBrands = document.querySelectorAll('.ME178-category_brand');
      // on click of the filters add matching active class to the filters
      for (let index = 0; index < allBrands.length; index += 1) {
        const element = allBrands[index];
        element.addEventListener('click', () => {
          if (element.classList.contains('ME178-filter_selected')) {
            element.classList.remove('ME178-filter_selected');
          } else {
            element.classList.add('ME178-filter_selected');
          }
        });
      }
    };
    checkFilters();

    // TO HERE - remove the "ME178-show_brand" class when filter is selected, hide them
    const onlyShowActiveBrands = () => {
      const selectedFilters = (() => {
        const active = document.querySelectorAll('.ME178-filter_selected');
        const data = Array.from(active).map(node => JSON.parse(node.getAttribute('data-target')));
        return data.flat();
      })();

      if (selectedFilters) {
        const allBrandBlocks = document.querySelectorAll('.ME178-show_brand');
        const showBlock = (element) => {
          element.classList.add('ME178-filter_show');
          element.classList.remove('ME178-filter_dontshow');
        };
        const hideBlock = (element) => {
          element.classList.add('ME178-filter_dontshow');
          element.classList.remove('ME178-filter_show');
          document.querySelector('#decorations').style.display = 'none';
          document.querySelector('#clearance').style.display = 'none';
        };

        /**
         * Hide all brand blocks by default
         */
        Array.from(allBrandBlocks).forEach(hideBlock);

        /**
         * Iterate over brand blocks and show those that have
         * been filtered
         */
        Array.from(allBrandBlocks).forEach((node) => {
          if (selectedFilters.indexOf(node.id) > -1) {
            showBlock(node);
          }
        });

        /**
         * If a subcategory is shown, make sure the parent category is also visible
         */
        const visible = document.querySelectorAll('.ME178-filter_show');
        Array.from(visible).forEach((node) => {
          const isSubcategory = !node.parentElement.classList.contains('.entry-content');
          if (isSubcategory) {
            let parent = node.parentElement;
            while (parent.classList.contains('ME178-show_brand')) {
              if (parent.classList.contains('ME178-filter_dontshow')) {
                parent.classList.remove('ME178-filter_dontshow');
              }
              parent = parent.parentElement;
            }
          }
        });
      } else {
        // Show other categories
        document.querySelector('#decorations').style.display = 'block';
        document.querySelector('#clearance').style.display = 'block';
      }
    };

    const applyFilters = () => {
      const applyButton = document.querySelector('.ME178-apply');
      applyButton.addEventListener('click', () => {
        onlyShowActiveBrands();
        closeLightBox();
      });
    };
    applyFilters();
    });
};
