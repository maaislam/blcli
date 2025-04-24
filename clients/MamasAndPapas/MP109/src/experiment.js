import { fullStory, events } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';

/**
 * {{MP109}} - {{Bundle contents v2}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP109',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    let bundleImagesContent;
    let bundleOptionsContent;

    poller(['ul.MP081_BundlePicker__images', 'ul.MP081_BundlePicker__images'], () => {
      bundleImagesContent = document.querySelector('ul.MP081_BundlePicker__images').outerHTML;
      document.querySelector('ul.MP081_BundlePicker__images').outerHTML = `<div class='MP109-listWrapper'>${bundleImagesContent}</div>`;
      bundleOptionsContent = document.querySelector('ul.MP081_BundlePicker__options').outerHTML;
      document.querySelector('ul.MP081_BundlePicker__options').outerHTML = `<div class='MP109-listWrapper'>${bundleOptionsContent}</div>`;
    });

    let productSku = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

    // Change Text in Options
    poller(['.MP081_BundlePicker__option__label'], () => {
      components.changeOptionsText();
    });

    // Move Description Section
    poller(['.MP062-pushchairMessage'], () => {
      components.moveDescription();
    });

    // Product Data ??
    const productData = components.getBrandData();
    let bundleDetails = services.getProductData(productData, productSku);

    poller(['.MP081_priceBlockBottom'], () => {
      observer.connect(document.querySelector('.MP081_priceBlockBottom'), () => {
        bundleImagesContent = document.querySelector('ul.MP081_BundlePicker__images').outerHTML;
        document.querySelector('ul.MP081_BundlePicker__images').outerHTML = `<div class='MP109-listWrapper'>${bundleImagesContent}</div>`;
        bundleOptionsContent = document.querySelector('ul.MP081_BundlePicker__options').outerHTML;
        document.querySelector('ul.MP081_BundlePicker__options').outerHTML = `<div class='MP109-listWrapper'>${bundleOptionsContent}</div>`;

        productSku = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        // Change Text in Options
        components.changeOptionsText();
        bundleDetails = services.getProductData(productData, productSku);

        if (bundleDetails !== []) {
          const bundleName = bundleDetails[0];
          const bundleSaving = bundleDetails[1];
          const bundlePercentage = bundleDetails[2];

          if (document.querySelector(`.MP081_BundlePicker__option[data-bundle='${bundleName}']`)) {
            document.querySelector(`.MP081_BundlePicker__option[data-bundle='${bundleName}']`).insertAdjacentHTML('beforeend', `<div class='MP109-save'>Save £<span class='MP109-amount'>${bundleSaving}</span> - that's <span class='MP109-percentage'>${bundlePercentage}</span>%!</div>`);
          }
        }
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
        },
      });
    });
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
    /**
     * @desc Gets bundle data
     */
    getProductData(productData, productSku) {
      const bundleDetails = [];
      const variationsObj = productData.data.colours;
      for (let i = 0; i < variationsObj.length; i++) { // eslint-disable-line no-plusplus
        const skus = variationsObj[i].variations;
        for (let x = 0; x < skus.length; x++) { // eslint-disable-line no-plusplus
          if (skus[x].sku === productSku) {
            if (skus[x + 1]) {
              const bundleName = skus[x + 1].name;
              bundleDetails.push(bundleName);
              const worthPrice = parseFloat(skus[x + 1].worthPrice.replace(',', ''));
              const rrpPrice = parseFloat(skus[x + 1].price.replace(',', ''));
              const save = (worthPrice - rrpPrice).toFixed(0);
              bundleDetails.push(save);
              const percentage = ((worthPrice - rrpPrice) / rrpPrice).toFixed(2) * 100;
              bundleDetails.push(percentage);
            }
          }
        }
      }
      return bundleDetails;
    },
  },

  components: {
    /**
     * @desc Move description section below carousel
     */
    moveDescription() {
      const descriptionElement = document.querySelector('.MP062-pushchairMessage').outerHTML;
      const descriptionContainer = `<div class='MP109-descriptionWrapper'>
        <div class='MP109-descriptionSection'>
          <div class='MP109-sectionHeading'>Product Description</div>
          ${descriptionElement}
          <a id='MP109readMorePDP' class='readMorePDP productDetail-read-more' title='Read more'>
            <u>read more</u>
          </a>
        </div>
       </div>`;

      document.querySelector('#js-desktopImageContainer').insertAdjacentHTML('afterend', descriptionContainer);
      document.querySelector('#MP109readMorePDP').addEventListener('click', () => {
        document.querySelector('#readMorePDP').click();
      });
    },
    /**
     * @desc Changes text in option labels
     */
    changeOptionsText() {
      const bundleOptions = document.querySelectorAll('.MP081_BundlePicker__option');
      [].forEach.call(bundleOptions, (option) => {
        const dataName = option.getAttribute('data-bundle');
        /*eslint-disable */
        switch (dataName) {
          case '4 Piece':
            option.querySelector('p.MP081_BundlePicker__option__label').innerHTML = `4 piece with carry cot, cup holder, adaptors`;
            break;
          case '5 Piece':
          option.querySelector('p.MP081_BundlePicker__option__label').innerHTML = `5 piece with added car seat`;
            break;
          case '6 Piece':
          option.querySelector('p.MP081_BundlePicker__option__label').innerHTML = `6 piece with added isofix base`;
            break;
        }
        /* eslint-enable */
      });
    },
    /*eslint-disable */
    /**
		 * @description Get all possible colour and bundle options for this brand
		 * @returns {string} Brand name
		 */
		getBrandData() {
			const UV = window.universal_variable;
			const productName = UV.product.name.toLowerCase();
			const products = window.MP081;
			let brandData;

			for (let brand in products) {
				const normalisedBrand = brand.toLowerCase();
				if (productName.indexOf(normalisedBrand) > -1) {
					brandData = {
						'brand': brand,
						'data': products[brand]
					};
					break;
				}
			}
			return brandData;
    },
    /* eslint-enable */
  },
};

export default Experiment;
