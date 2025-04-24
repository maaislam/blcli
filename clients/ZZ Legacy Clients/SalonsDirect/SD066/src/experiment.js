import { fullStory, events } from '../../../../lib/utils';
import { productFinderHTML } from './lib/productfinder';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'SD066',
    VARIATION: '{{VARIATION}}',
  },
  globals: {
    linksJSON: [],
  },

  /**
   * Build the product finder,
   * each selection which show different categories
   * Build the URLs which will make up the link which is also in the navigation "shop by category"
   * eg. click hair, click electricals, click clippers & trimmers = https://www.salonsdirect.com/hair/electricals/clippers-trimmers
   */

  init() {
    // Setup
    const {
      settings,
      services,
      components,
    } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    /**
     * @desc Create the main product finder and store the json from the nav
     */
    components.createProductFinder();
    components.addTheOptionSlider();
    components.storeJSON();

    /**
     * @desc Create the categories within the slide out box
     */
    components.createTopCategories();
    components.createtheInnerCategories();
    components.createFinalCategories();

    /**
     * @desc Click functions to know what to show
     */
    components.openCategories();
    components.clickMainCategory();
    components.showLastCategory();

    /**
    * @desc If previous search boxes are clicked
    */
    components.backClick();

    /**
     * @desc Stop the final links going to another page
     */
    components.voidFinalLinks();

    // ON CLICK OF RESET
    document.querySelector('.SD066-reset').addEventListener('click', () => {
      components.resetFinder();
    });

    if (settings.VARIATION === '2') {
      components.autoExpand();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
    * @desc create the product finder
    */
    createProductFinder: function createProductFinder() {
      const homeBanners = document.querySelector('.home-slider.desktop-banners');

      const productFinder = document.createElement('div');
      productFinder.classList.add('SD066-product_finder');
      productFinder.innerHTML = productFinderHTML;
      homeBanners.insertBefore(productFinder, homeBanners.firstChild);

      // add the href to the main banner
      const bannerLink = document.createElement('a');
      bannerLink.classList.add('SD066-main_banner');
      bannerLink.setAttribute('href', 'https://issuu.com/salonsdirect/docs/july_august_2018_singlepages?e=26848508/62569940');

      productFinder.appendChild(bannerLink);
    },
    /**
    * @desc create the slide out box
    */
    addTheOptionSlider: function addTheOptionSlider() {
      const optionSlider = document.createElement('div');
      optionSlider.classList.add('SD066-slide_options');
      optionSlider.innerHTML =
      `<div class="SD066-exit">&times;</div>
        <div class="SD066-category_options"></div>
        <div class="SD066-level2_options"></div>
        <div class="SD066-level3_last_options"></div>
      </div>`;
      document.querySelector('.SD066-product_finder_box').insertAdjacentElement('afterend', optionSlider);
    },
    /**
    * @desc store the JSON from SD026
    */
    storeJSON: function storeJSON() {
      /* eslint-disable */
      const { globals } = Experiment;
      const oldMenu = document.getElementById('custommenu');

      // Scrape page for category data and return JSON ---
      let listItems = [].slice.call(oldMenu.children[0].children);
      // Convert from HTMLCollection to array
      const filterIds = ['2', '3', '4', '5', '6', '7'];
      const json = {
        name: 'Shop by category',
        sub: []
      };
      let category;

      // Filter LIs with subcategories
      listItems = listItems.filter((el) => {
        return filterIds.indexOf(el.id) > -1;
      });

      // Iterate over each category and convert relevant data to JSON format
      for (let i = 0; i < listItems.length; i += 1) {
        category = listItems[i];
        json.sub.push({
          name: _getTitle(category),
          link: _getLink(category),
          'sub': _getSubCategories(category)
        });
      }

      function _getLink(category) {
        let href = [].slice.call(category.children).filter(function (el) {
          return el.tagName.toUpperCase() === 'A';
        })[0].href;
        return href ? href : undefined;
      }

      function _getName(category) {
        const name = [].slice.call(category.children).filter(function (el) {
          return el.tagName.toUpperCase() === 'A';
        })[0].children[0].innerText.toProperCase().replace('https://www.salonsdirect.com/', '');
        return name ? name : undefined;
      }

      function _getTitle(category) {
        return category.children[1].children[0].innerText.toProperCase();
      }

      function _getSubCategories(category) {
        let formattedSubcategories = [];
        let formattedSubcategory;
        let subcategory;
        let title;
        let links;

        const subcategories = category.children[2].children[0].children;
        for (let j = 0; j < subcategories.length; j += 1) {
          subcategory = subcategories[j];
          title = subcategory.children[1].children[0].innerText.toProperCase();
          formattedSubcategory = {
            'name': _getName(subcategory),
            'link': _getLink(subcategory),
            'sub': []
          };

        if(subcategory.children[2]){
          const subsubcategories = subcategory.children[2].children[0].children;
          
          for (let k = 0; k < subsubcategories.length; k += 1) {
            subcategory = subsubcategories[k];
            formattedSubcategory.sub.push({
              'name': _getName(subcategory),
              'link': _getLink(subcategory)
            });
          }
          formattedSubcategories.push(formattedSubcategory);
        }
      }
        return formattedSubcategories;
      }
      globals.linksJSON.push(json);
      /* eslint-enable */
    },
    /**
    * @desc create the top level cateogory boxes e.g Hair
    */
    createTopCategories: function createTopCategories() {
      const { globals } = Experiment;
      const dropDownCategories = globals.linksJSON[0].sub;
      const categoryDropdownSlider = document.querySelector('.SD066-category_options');

      for (let i = 0; i < dropDownCategories.length; i += 1) {
        const element = dropDownCategories[i];
        const categoryOption = document.createElement('div');
        categoryOption.classList.add('SD066-cat_opt');
        categoryOption.innerHTML = `<div class="SD066-cat"><div class="SD066-icon"></div><span>${element.name}</span></div>`;

        const categoryName = element.name.replace(/\s/g, '').toLowerCase();
        categoryOption.setAttribute('data-cat', `SD066-${categoryName}`);

        categoryDropdownSlider.appendChild(categoryOption);
      }
    },
    /**
    * @desc create the inner categories by looping through the level 2 categories in the object
    */
    createtheInnerCategories: function createtheInnerCategories() {
      const { globals } = Experiment;
      const innerCategories = globals.linksJSON[0].sub;
      const innerCategoryDiv = document.querySelector('.SD066-level2_options');

      for (let i = 0; i < innerCategories.length; i += 1) {
        const data = innerCategories[i];

        // create the main wrapper for the inner categories & set id
        const innerCats = document.createElement('div');
        innerCats.classList.add('SD066-level2_wrapper');
        innerCats.id = `SD066-${data.name.replace(/\s/g, '').replace('&', '').toLowerCase()}`;

        innerCategoryDiv.appendChild(innerCats);

        // loop through and add the options
        [].forEach.call(data.sub, (subData) => {
          const level2Cat = document.createElement('div');
          level2Cat.classList.add('SD066-level2_option');
          level2Cat.innerHTML = subData.name;
          innerCats.appendChild(level2Cat);

          const level2Name = subData.name.replace(/\s/g, '').replace(/&/g, '').toLowerCase();
          level2Cat.setAttribute('data-cat', `SD066-${level2Name}`);
        });
      }
    },
    /**
    * @desc Create the last of the categories by looping through the object with
    * nested for loops then create the divs for the final option box
    */
    createFinalCategories: function createFinalCategories() {
      const { globals } = Experiment;
      const lastCategories = globals.linksJSON[0].sub;
      const lastCatDiv = document.querySelector('.SD066-level3_last_options');
      for (let i = 0; i < lastCategories.length; i += 1) {
        const data = lastCategories[i].sub;
        for (let j = 0; j < data.length; j += 1) {
          const element = data[j];

          const thirdsubLevel = element.sub;
          const lastCategory = document.createElement('div');
          lastCategory.classList.add('SD066-level3_wrapper');
          lastCategory.id = `SD066-${element.name.replace(/\s/g, '').replace(/&/g, '').toLowerCase()}`;
          lastCatDiv.appendChild(lastCategory);

          [].forEach.call(thirdsubLevel, (item) => {
            const finalLinks = document.createElement('div');
            finalLinks.classList.add('SD066-lvl3_links');
            finalLinks.innerHTML = `<a href="${item.link}">${item.name}</a>`;
            lastCategory.appendChild(finalLinks);
          });
        }
      }
    },

    /**
    * @desc On click of the first box, show the product options block
    */
    openCategories: function openCategories() {
      const { components, settings } = Experiment;
      const firstCategorySelect = document.querySelector('.SD066-category');
      const level1cats = document.querySelector('.SD066-category_options');
      const mainCategories = document.querySelector('.SD066-slide_options');
      firstCategorySelect.addEventListener('click', () => {
        if (document.querySelector('.SD066-category').textContent === 'Choose a category') {
          firstCategorySelect.classList.add('SD066-select_active');
          mainCategories.classList.add('SD066-options_open');
          level1cats.classList.add('SD066-lvl1_active');

          // hide the banner a tag
          document.querySelector('.SD066-main_banner').style.display = 'none';

          events.send('CRO Test', `SD066 v${settings.VARIATION}`, 'Box clicked: Choose a category', { sendOnce: true });
        }

        document.querySelector('.SD066-exit').addEventListener('click', () => {
          components.resetFinder();
          // hide the banner a tag
          document.querySelector('.SD066-slide_options').classList.remove('SD066-options_open');
          document.querySelector('.SD066-main_banner').style.display = 'block';
        });
      });
    },
    /**
    * @desc On click of the main category/level 1, change the text of the first
    * box and open the next box using the matching id
    */
    clickMainCategory: function clickMainCategory() {
      const settings = { Experiment };
      const mainCategorySelect = document.querySelector('.SD066-searchbox.SD066-category');
      const level1Categories = document.querySelectorAll('.SD066-category_options .SD066-cat_opt');
      const level2Select = document.querySelector('.SD066-searchbox.SD066-innercategory');


      // toggle classes on/off
      for (let i = 0; i < level1Categories.length; i += 1) {
        const element = level1Categories[i];
        element.addEventListener('click', (e) => {
          if (document.querySelector('.SD066-finalcategory').textContent === '' && document.querySelector('.SD066-searchbox.SD066-innercategory').textContent.indexOf('category') === -1) {
            const elementName = element.textContent;
            // remove the search active class
            mainCategorySelect.classList.remove('SD066-select_active');
            level2Select.classList.add('SD066-select_active');

            document.querySelector('.SD066-category_options').classList.remove('SD066-lvl1_active');
            document.querySelector('.SD066-level2_options').classList.add('SD066-lvl2_active');

            events.send('CRO Test', `SD066 v${settings.VARIATION}`, 'Box Clicked: Second category', { sendOnce: true });
            events.send('CRO Test', `SD066 v${settings.VARIATION}`, `Item Clicked: ${elementName} category`, { sendOnce: true });
            for (let j = 0; j < level1Categories.length; j += 1) {
              level1Categories[j].classList.remove('SD066-main_selected');
            }
            e.currentTarget.classList.add('SD066-main_selected');

            // change the text of the select boxes
            mainCategorySelect.textContent = element.querySelector('span').textContent;
            level2Select.textContent = `Choose a ${element.querySelector('span').textContent} category...`;

            const level2Cats = document.querySelectorAll('.SD066-level2_wrapper');
            const matchingCat = e.currentTarget.getAttribute('data-cat');
            // Loop through the lvl 2 categories to find the matching one and make active
            [].forEach.call(level2Cats, (item) => {
              if (item.id === matchingCat) {
                item.classList.add('SD066-lvl2_active');
              } else {
                item.classList.remove('SD066-lvl2_active');
              }
            });
          }
        });
      }
    },
    /**
    * @desc On click of the second category option, change the text of the last
    * box then hide the options box
    */
    showLastCategory: function showLastCategory() {
      const settings = { Experiment };
      const level2SearchBox = document.querySelector('.SD066-searchbox.SD066-innercategory');
      const level2Categories = document.querySelectorAll('.SD066-level2_options .SD066-level2_option');
      const level3options = document.querySelectorAll('.SD066-level3_last_options .SD066-level3_wrapper');

      for (let i = 0; i < level2Categories.length; i += 1) {
        const element = level2Categories[i];
        element.addEventListener('click', (e) => {
          const elementName = element.textContent;
          // add the active class to the search box
          level2SearchBox.classList.remove('SD066-select_active');
          document.querySelector('.SD066-finalcategory').classList.add('SD066-select_active');

          document.querySelector('.SD066-level2_options').classList.remove('SD066-lvl2_active');
          document.querySelector('.SD066-level3_last_options').classList.add('SD066-lvl3_active');

          events.send('CRO Test', `SD066 v${settings.VARIATION}`, 'Box Clicked: Third category', { sendOnce: true });
          events.send('CRO Test', `SD066 v${settings.VARIATION}`, `Item Clicked: ${elementName} category`, { sendOnce: true });
          for (let j = 0; j < level2Categories.length; j += 1) {
            level2Categories[j].classList.remove('SD066-lvl2-link_selected');
          }
          e.currentTarget.classList.add('SD066-lvl2-link_selected');

          // change the second select box
          level2SearchBox.textContent = element.textContent;

          const matchingCat = e.currentTarget.getAttribute('data-cat');
          const chosenCategory = document.querySelector('.SD066-searchbox.SD066-category').textContent.toLowerCase().replace(/\s/g, '');
          [].forEach.call(level3options, (item) => {
            if (item.id === matchingCat) {
              let itemName = item.querySelector('a').getAttribute('href').split('/')[3].replace(/(-)/g, '');

              // avoid duplicate options being added due to same attributes
              if (itemName === 'barbering' && chosenCategory === 'barbers') {
                itemName = 'barbers';
              }
              if (itemName === 'nails' && chosenCategory === 'beauty') {
                itemName = 'beauty';
              }
              if (itemName === 'barbering' && chosenCategory === 'furniture') {
                itemName = 'furniture';
              }

              if (itemName === chosenCategory) {
                item.classList.add('SD066-lvl3_active');

                // avoid duplicates on beauty & nails
                if (item.querySelector('.SD066-lvl3_links:nth-child(2) a').textContent === 'Manicure Products' && chosenCategory === 'beauty' && itemName === 'beauty') {
                  item.classList.remove('SD066-lvl3_active');
                }
                if (item.querySelector('.SD066-lvl3_links:nth-child(2) a').textContent === 'Files, Buffers & Implements' && chosenCategory === 'nails' && itemName === 'nails') {
                  item.classList.remove('SD066-lvl3_active');
                }
              }
            } else {
              item.classList.remove('SD066-lvl3_active');
            }
          });
        });
      }
    },
    /**
    * @desc On the last category click, make all the links
    * void and change the last box to match the chosen result
    */
    voidFinalLinks: function voidFinalLinks() {
      const settings = { Experiment };
      poller(['.SD066-lvl3_active .SD066-lvl3_links'], () => {
        const activeLvl3Links = document.querySelectorAll('.SD066-level3_wrapper.SD066-lvl3_active .SD066-lvl3_links');
        for (let i = 0; i < activeLvl3Links.length; i += 1) {
          const element = activeLvl3Links[i];
          element.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            const elementName = element.textContent;
            const linkName = element.querySelector('a').textContent;
            const finalLink = element.querySelector('a').getAttribute('href');
            document.querySelector('.SD066-product-search a').setAttribute('href', finalLink);
            document.querySelector('.SD066-finalcategory').textContent = linkName;
            document.querySelector('.SD066-level3_last_options').classList.remove('SD066-lvl3_active');
            document.querySelector('.SD066-slide_options').classList.remove('SD066-options_open');

            events.send('CRO Test', `SD066 v${settings.VARIATION}`, `Item Clicked: ${elementName} category`, { sendOnce: true });
          });
        }

        const productSearchButton = document.querySelector('.SD066-product-search');
        productSearchButton.querySelector('a').addEventListener('click', () => {
          if (document.querySelector('.SD066-searchbox.SD066-finalcategory').textContent !== '') {
            productSearchButton.classList.add('SD066-loader_show');
            productSearchButton.textContent = '';
            setTimeout(() => {
              productSearchButton.classList.remove('SD066-loader_show');
              productSearchButton.textContent = 'Search Now';
            }, 6000);
            events.send('CRO Test', `SD066 v${settings.VARIATION}`, 'Product Finder Search Complete', { sendOnce: true });
          }
        });
      });
    },
    /**
    * @desc If any of the links previously are clicked, reset the slider
    */
    backClick: function backClick() {
      const { components } = Experiment;
      const searchBoxes = document.querySelectorAll('.SD066-searchbox');
      for (let i = 0; i < searchBoxes.length; i += 1) {
        const element = searchBoxes[i];
        element.addEventListener('click', () => {
          if (!element.classList.contains('SD066-select_active') && element.textContent !== '') {
            components.resetFinder();
          }
        });
      }
    },
    /**
    * @desc On click of the reset button reset all the product finder
    */
    resetFinder: function resetFinder() {
      const { components } = Experiment;
      // remove the options box
      const slideOptionsBox = document.querySelector('.SD066-slide_options');
      slideOptionsBox.parentNode.removeChild(slideOptionsBox);
      document.querySelector('.SD066-product-search a').removeAttribute('href');
      // remove active from the selected boxes
      const selectBox = document.querySelectorAll('.SD066-searchbox');
      for (let i = 0; i < selectBox.length; i += 1) {
        const element = selectBox[i];
        if (element.classList.contains('SD066-select_active')) {
          element.classList.remove('SD066-select_active');
        }
        element.textContent = '';

        // hide the banner a tag
        document.querySelector('.SD066-main_banner').style.display = 'none';
      }
      document.querySelector('.SD066-searchbox').textContent = 'Choose a category';

      // rebuild the options box and run the functions again on reset
      components.addTheOptionSlider();
      components.createTopCategories();
      components.createtheInnerCategories();
      components.createFinalCategories();

      // open the first box again
      const firstCategorySelect = document.querySelector('.SD066-category');
      const level1cats = document.querySelector('.SD066-category_options');
      const mainCategories = document.querySelector('.SD066-slide_options');
      firstCategorySelect.classList.add('SD066-select_active');
      mainCategories.classList.add('SD066-options_open');
      level1cats.classList.add('SD066-lvl1_active');

      document.querySelector('.SD066-exit').addEventListener('click', () => {
        components.resetFinder();
        // hide the banner a tag and remove options
        document.querySelector('.SD066-slide_options').classList.remove('SD066-options_open');
        document.querySelector('.SD066-main_banner').style.display = 'block';
      });


      components.openCategories();
      components.clickMainCategory();
      components.showLastCategory();
      components.voidFinalLinks();
      components.backClick();
    },
    /**
    * @desc Show categories on page load V2
    */
    autoExpand: function autoExpand() {
      const firstCategory = document.querySelector('.SD066-searchbox.SD066-category');
      document.querySelector('.SD066-main_banner').style.display = 'none';
      firstCategory.click();
    },
  },
};


export default Experiment;
