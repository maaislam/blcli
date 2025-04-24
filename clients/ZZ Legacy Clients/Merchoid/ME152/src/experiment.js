import { fullStory, events } from '../../../../lib/utils';
import { welcomeText, topButtons, popularBrands } from './lib/ME152-content';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME152',
    VARIATION: '{{VARIATION}}',
  },

  finderData: {
    productData: '',
    filteredData: {
      json: '',
      brands: [],
      genders: [],
    },
    slugsMap: {
      brands: {
        query: 'pa_brand',
        values: {},
      },
      genders: {
        query: 'pa_person',
        values: {
          Male: 'men',
          Female: 'ladies',
        },
      },
    },
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.createProductFinderWrapper();
    components.addBrands();
    // components.createSearchUrl();
    components.clickGenderBrand();
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
     * @desc Create the wrapper for the product finder
     */
    createProductFinderWrapper: () => {
      const mainWrapper = document.getElementById('main-content');
      const productFinder = document.createElement('div');
      productFinder.classList.add('ME152-productFinder_wrapper');
      productFinder.innerHTML = `${welcomeText}<div class="ME152-product_finder">${topButtons} <div class="ME152-brands"></div></div>`;
      mainWrapper.insertAdjacentElement('beforebegin', productFinder);
    },

    /**
     * @desc Add all the brands
     */
    addBrands: () => {
      const allBrands = document.createElement('div');
      allBrands.classList.add('ME152-allBrands');
      document.querySelector('.ME152-brands').appendChild(allBrands);

      const allPopularBrands = popularBrands.brands;
      for (let i = 0; i < allPopularBrands.length; i += 1) {
        const element = allPopularBrands[i];
        const brandDiv = document.createElement('div');
        brandDiv.classList.add('ME152-brand');
        brandDiv.innerHTML = `<div class="ME152-brand_image" style="background-image:url('${element.image}');"></div><span>${element.name}</span>`;
        document.querySelector('.ME152-allBrands').appendChild(brandDiv);
      }
    },

    /**
     * @desc Create the wrapper for the product finder
     */
    clickGenderBrand: () => {
      const { finderData } = Experiment;
      const buttons = document.querySelectorAll('.ME152-button');
      const brands = document.querySelector('.ME152-brands');
      const base = 'https://www.merchoid.com/product-wizard/';
      let query = '';
      let separator = '?';
      const slugs = finderData.slugsMap;
      let url = '';

      [].forEach.call(buttons, (element) => {
        element.addEventListener('click', () => {
          // add active class to element clicked
          if (element.classList.contains('ME152_genderButton-showing')) {
            element.classList.remove('ME152_genderButton-showing');
            brands.classList.remove('ME152-brandsBar_showing');
          } else {
            element.classList.add('ME152_genderButton-showing');
            brands.classList.add('ME152-brandsBar_showing');
          }
          // create the query for gender
          const genderType = element.getAttribute('data_gender');
          if (genderType && query.indexOf('?pa_person') === -1) {
            query = '';
            query += `${separator}${slugs.genders.query}=${genderType}`;
            separator = '&';
            url = base + query;
          } else if (query.indexOf('?pa_person') > -1) {
            query = '';
            query += `${separator}${slugs.genders.query}=${genderType}`;
            separator = '&';
            url = base + query;
          }
          console.log(url);
        });
      });
    },

    /**
     * @desc Creates the search URL from the gender and brand chosen
     */
    createSearchUrl: (brand, gender) => {
      const { finderData } = Experiment;
      let url = '';
      const base = 'https://www.merchoid.com/product-wizard/';
      let query = '';
      let separator = '?';
      const slugs = finderData.slugsMap;

      if (brand) {
        const brandsString = () => {
          let slugString = '';
          for (let i = 0; i < brand.length; i += 1) {
            if (i > 0) slugString += ',';
            slugString += slugs.brands.values[brand[i]];
          }
          return slugString;
        };
        query += `${separator}${slugs.brands.query}=${brandsString}`;
        separator = '&';
      }

      if (gender) {
        const gendersString = () => {
          let slugString = '';
          for (let i = 0; i < gender.length; i += 1) {
            if (i > 0) slugString += ',';
            slugString += slugs.genders.values[gender[i]];
          }
          return slugString;
        };
        query += `${separator}${slugs.brands.query}=${gendersString}`;
        separator = '&';
      }
      url = base + query;
      return url;
    },
  },
};

export default Experiment;
