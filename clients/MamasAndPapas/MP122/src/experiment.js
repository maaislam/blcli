import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
/**
 * For live - comment out the following line
 */
// import loadProducts from './data/products';
/**
 * Then replace 'loadProducts' with 'window.MP122'
 */

/**
 * {{MP122}} - {{Pushchair PLP Improvements}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP122',
    VARIATION: '{{VARIATION}}',
    MP_PUSHCHAIRS: ['Ocarro', 'Urbo', 'Flip XT', 'Sola'],
  },

  init() {
    // Setup
    /*eslint-disable */
    const { settings, services, components, bindExperimentEvents } = Experiment; // eslint-disable-line object-curly-newline
    services.tracking();
    document.body.classList.add(settings.ID);
    /* eslint-enable */
    const productList = document.querySelector('.productLister');

    pollerLite(['.topratedbadge'], () => {
      components.hideSaleBanners();
    });

    const pushchairsTopContent = `<div class='MP122-pushchairsWrapper__top'>
      <div class='MP122-pushchairs__title'>
        <div class='MP122-title'>Mamas &amp; Papas Pushchairs</div>
      </div>
    </div>
    <div class='MP122-compareCtaWrapper'>
      <div class='MP122-compareCta'>
        <div id='MP122-ctaBtn'>View Comparison Page</div>
      </div>
    </div>
    <div class='MP122-pushchairsWrapper__bottom'>
      <div class='MP122-pushchairs__title'>
        <div class='MP122-title'>All Pushchairs</div>
      </div>
    </div>`;

    productList.insertAdjacentHTML('afterbegin', pushchairsTopContent);

    // Add link to banner
    const desktopBanner = document.querySelector('.banner_container .col-lg-5.visible-lg #category-banner-txt');
    if (desktopBanner) desktopBanner.insertAdjacentHTML('afterend', '<a class="MP122-topCompareCta" href="/en-gb/pushchairs-prams">View Comparison Page</a>');

    for (let i = 0; i < settings.MP_PUSHCHAIRS.length; i += 1) {
      const brand = window.MP122[`${settings.MP_PUSHCHAIRS[i]}`];
      components.createPushchairProduct(brand);
    }

    const mpPushchairs = document.querySelectorAll('.MP122-productWrap');
    [].forEach.call(mpPushchairs, (pushchair) => {
      // const pushchairTitle = pushchair.querySelector('.productCard_title strong').innerText;
      const menuIcon = pushchair.querySelector('div.MP122-menuIcon');
      const closeBundles = pushchair.querySelector('.MP122-bundleWrapper > .MP122-closeBundles');
      const bundleWrap = pushchair.querySelector('.MP122-bundleWrapper');
      const bundleCards = pushchair.querySelector('.MP122-bundleCardsWrapper');
      const bundleOptions = pushchair.querySelector('.MP122-bundles');
      const closeDetails = pushchair.querySelector('.MP122-bundleDetailsWrapper > .MP122-closeDetails');
      const bundleDetailsWrap = pushchair.querySelector('.MP122-bundleDetailsWrapper');
      const backArrow = pushchair.querySelector('.MP122-backArrow');
      // Open / Close Bundle Options
      bindExperimentEvents.showBundleCard(pushchair, bundleCards, menuIcon);
      bindExperimentEvents.showBundleCard(pushchair, bundleWrap, menuIcon);
      bindExperimentEvents.hideBundleCard(pushchair, bundleCards, closeBundles);
      // Animation on Bundle Options
      bindExperimentEvents.showBundleCard(pushchair, bundleOptions, menuIcon);

      // Open / Close Bundle Details
      const details = pushchair.querySelectorAll('.MP122-bundles li.MP122-bundle__item');
      [].forEach.call(details, (bundle) => {
        bindExperimentEvents.showBundleCard(pushchair, bundleDetailsWrap, bundle);
        // components.createBundleDetails(pushchair, details);
      });
      bindExperimentEvents.hideAllPushchairCards(bundleCards, bundleDetailsWrap, closeDetails);
      // Back Arrow
      bindExperimentEvents.hideBundleCard(pushchair, bundleDetailsWrap, backArrow);
      // Select Colour
      bindExperimentEvents.selectProductColour(pushchair);
      // Select Bundle
      bindExperimentEvents.selectBundleOption(pushchair);
    });

    // Click on Product Images
    bindExperimentEvents.clickOnPushchairImages();

    // // Click on Product Titles
    // bindExperimentEvents.clickOnPushchairTitles();

    // View Comparison Page CTA
    document.querySelector('#MP122-ctaBtn').addEventListener('click', () => {
      window.location.href = '/en-gb/pushchairs-prams';
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
  },

  components: {
    /**
     * @desc Hide Sale Banner or first 4 products
     */
    hideSaleBanners() {
      const saleBanners = document.querySelectorAll('.topratedbadge');
      for (let i = 0; i < 4; i += 1) {
        saleBanners[i].style.display = 'none';
      }
    },
    /**
     * @desc Creates Pushchair Product with Bundle Options
     */
    createPushchairProduct(productContent) {
      /*eslint-disable */
      const productName = productContent.details[0].name;
      const productTitle = productContent.details[0].title;
      const productSubTitle = productContent.details[0].subtitle;
      const productImage = productContent.details[0].img;
      const price = productContent.details[0].price;
      const wasPrice = productContent.colours[0].variations[0].wasPrice;
      const url = productContent.colours[0].variations[0].url;
      const initialColour = productContent.colours[0].name;
      const bundles = productContent.details[0].bundles;
      /* eslint-enable */

      let colourOptions = '';
      let colourCount = 0;
      for (let i = 0; i < productContent.colours.length; i += 1) {
        const colour = productContent.colours[i].name;
        if (colourCount !== 0) {
          colourOptions += `<li>
            <div class="MP081_ColourPicker__option" data-colour='${colour}'></div>
            <div class="MP081__tooltip">
              <div><h3>${colour}</h3></div>
            </div>
          </li>`;
        } else {
          colourOptions += `<li>
            <div class="MP081_ColourPicker__option MP081_ColourPicker__option--active" data-colour='${colour}'></div>
            <div class="MP081__tooltip">
              <div><h3>${colour}</h3></div>
            </div>
          </li>`;
        }
        colourCount += 1;
      }
      const bundleOptions = this.createBundleOptions(bundles);
      const bundleDetails = ''; // eslint-disable-line no-unused-vars

      const product = `<div class='MP122-productWrap col-xs-6 col-sm-3 mt-3' data-name='${productName}'>
        <div class='productCard transition-transform p-2'>
          <div class='productCard_mediaContainer'>
            <a href='${url}' title='${productName}' class='ga-product-click' data-productid="1037x74" data-name='${productName}' data-code='1037x74' data-category='Pushchairs &amp; Prams' data-pagetype='CATEGORY'>
              <picture>
                <!--[if IE 9]><video style="display: none;"><![endif]-->
                <source type="image/webp" srcset="${productImage}" media="(min-width: 1024px)">
                <source type="image/webp" srcset="${productImage}" media="(min-width: 768px)">
                <source type="image/webp" srcset="${productImage}" media="(min-width: 360px)">
                <source type="image/webp" srcset="${productImage}" media="(min-width: 320px)">
                <source srcset="${productImage}" media="(min-width: 1024px)">
                <source srcset="${productImage}" media="(min-width: 768px)">
                <source srcset="${productImage}" media="(min-width: 360px)">
                <source srcset="${productImage}" media="(min-width: 320px)">
                <!--[if IE 9]></video><![endif]-->
                <img src="${productImage}" alt="${productName}" title="${productName}" class="MP122-productCard_image productCard_image mx-auto">
              </picture>
            </a>
          </div>
          
          <div class="MP081_ColourPicker">
            <ul class="MP081_ColourPicker__options">
              ${colourOptions}
            </ul>
            <div class='MP122-menuIconWrap'>
              <div class="MP122-menuIcon"></div>
            </div>
            <div class="MP081_ColourPicker__label">${initialColour}</div></div>
            <div class="productCard_details pt-4">
            <div class="productCard_title pb-1">
              <a href="${url}" title="${productName}" class="MP122-productTitle ga-product-click" data-productid="1037x74" data-name="${productName}" data-code="1037x74" data-category="Pushchairs &amp; Prams" data-pagetype="CATEGORY">${productTitle}</a>
            <div class='MP122-subTitle'>${productSubTitle}</div>
          </div>
          
            <div class="productCard_price py-1">
              <div class="price">
                <div>${price}</div>
              </div>
            </div>
          </div>
        </div>
        <div class='MP122-bundleCardsWrapper'>
          <div class="MP122-bundleWrapper">
            <div class="MP122-closeBundles"></div>
            <div class="MP122-bundles">
              <ul class="MP122-bundleOptions">
                ${bundleOptions}
              </ul>
            </div>
          </div>

          <div class="MP122-bundleDetailsWrapper">
            <div class="MP122-backArrow"></div>
            <div class="MP122-closeDetails"></div>
            <div class="MP122-details"></div>
          </div>
        </div>
      </div>`;

      document.querySelector('.MP122-compareCtaWrapper').insertAdjacentHTML('beforebegin', product);
    },
    /**
     * @desc Creates Bundle Options
     */
    createBundleOptions(data) {
      let bundleOptions = '';
      for (let i = 0; i < data.length; i += 1) {
        const bundle = data[i];
        if (bundle === 'Pushchair Only') {
          bundleOptions += `<li class="MP122-bundle__item" data-bundle='${bundle}'>${bundle}</li>`;
        } else {
          bundleOptions += `<li class="MP122-bundle__item" data-bundle='${bundle}'>${bundle} Bundle</li>`;
        }
      }
      return bundleOptions;
    },
    /**
     * @desc Creates Bundle Details
     */
    createBundleDetails(data) {
      /*eslint-disable */
      const title = data['h1'];
      const img = data['img'];
      const bundleImage = img[0];
      const bundlePrice = data['price'];
      const worthPrice = data['worthPrice'];
      const url = data['url'];
      const details = data['details'];
      /* eslint-enable */
      let prices;
      if (worthPrice !== '') {
        prices = `<span class="MP122-isPrice">£${bundlePrice}</span>
        <span class="MP122-wasPrice">Worth £${worthPrice}*</span>`;
      } else {
        prices = `<span class="MP122-isPrice">£${bundlePrice}</span>`;
      }
      const bundleDetails = `<div class="MP122-bundleTitle">${title}</div>
        <div class="MP122-bundleImage" style="background-image: url('${bundleImage}')"></div>
        <div class="MP122-bundleInfo">${details}</div>
        <div class="MP122-bundlePrice">
          ${prices}
        </div>
        <div class="MP122-shopBtn">
          <a href="${url}">Shop Now</a>
        </div>`;
      return bundleDetails;
    },
    /**
     * @desc Updates Product Image
     */
    updateProductImage(productCard, newImage) {
      const imageSources = productCard.querySelectorAll('source');
      [].forEach.call(imageSources, (source) => {
        source.setAttribute('srcset', `${newImage}`);
      });

      productCard.querySelector('picture img').setAttribute('src', `${newImage}`);
    },
  },
  bindExperimentEvents: {
    /**
     * @desc Open Pushchair Bundle Card
     */
    showBundleCard(productCard, item, el) {
      const { settings } = Experiment;
      el.addEventListener('click', () => {
        if (item.classList.contains('MP122-bundle__item')) {
          this.hideBundleOptions();
        }
        item.classList.add('show');
        // User clicked on expanding symbol
        if (el.classList.contains('MP122-menuIcon')) {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The expanding symbol`, { sendOnce: true }); // eslint-disable-line quotes
        }
      });
    },
    /**
     * @desc Close Pushchair Bundle Card
     */
    hideBundleCard(productCard, item, el) {
      const { settings } = Experiment;
      el.addEventListener('click', () => {
        item.classList.remove('show');
        if (el.classList.contains('MP122-backArrow')) {
          if (!productCard.querySelector('.MP122-bundles').classList.contains('show')) {
            productCard.querySelector('.MP122-bundles').classList.add('show');
          }
        } else if (el.classList.contains('MP122-closeBundles')) {
          // User closed bundle card
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Close`, { sendOnce: true }); // eslint-disable-line quotes
        }
      });
    },
    /**
     * @desc Close All Bundle Cards
     */
    hideAllPushchairCards(bundleWrap, bundleDetailsWrap, el) {
      const { settings } = Experiment;
      el.addEventListener('click', () => {
        bundleWrap.classList.remove('show');
        // bundleDetailsWrap.classList.remove('show');
        if (el.classList.contains('MP122-closeDetails')) {
          // User closed bundle card
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Close`, { sendOnce: true }); // eslint-disable-line quotes
        }
      });
    },
    /**
     * @desc Select Colour
     */
    selectProductColour(item) {
      const { components, settings } = Experiment;
      const colourPicker = item.querySelector('.MP081_ColourPicker__options');
      const colourOptions = colourPicker.querySelectorAll('.MP081_ColourPicker__option');
      [].forEach.call(colourOptions, (option) => {
        option.addEventListener('click', (e) => {
          if (!e.currentTarget.classList.contains('MP081_ColourPicker__option--active')) {
            colourPicker.querySelector('.MP081_ColourPicker__option--active').classList.remove('MP081_ColourPicker__option--active');
            e.currentTarget.classList.add('MP081_ColourPicker__option--active');
            const chosenColour = e.currentTarget.getAttribute('data-colour');
            const brand = item.getAttribute('data-name');
            const brandContent = window.MP122[`${brand}`];
            for (let i = 0; i < brandContent.colours.length; i += 1) {
              const colourData = brandContent.colours[i];
              if (colourData.name === `${chosenColour}`) {
                const newImage = colourData.img;
                components.updateProductImage(item, newImage);

                if (colourData.variations) {
                  const newLink = colourData.variations[0].url;
                  if (newLink) item.querySelector('a').href = newLink;
                }

                /*eslint-disable */
                const bundles = [];
                const variations = brandContent.colours[i].variations;
                for (let i = 0; i < variations.length; i += 1) {
                  bundles.push(variations[i].name);
                }
                const newBundleOptions = components.createBundleOptions(bundles);
                item.querySelector('.MP122-bundles > ul.MP122-bundleOptions').innerHTML = newBundleOptions;
                item.querySelector('.MP081_ColourPicker__label').innerHTML = chosenColour;
                this.selectBundleOption(item);
                const bundleDetailsWrap = item.querySelector('.MP122-bundleDetailsWrapper');
                const details = item.querySelectorAll('.MP122-bundles li.MP122-bundle__item');
                [].forEach.call(details, (bundle) => {
                  this.showBundleCard(item, bundleDetailsWrap, bundle);
                });
                break;
              }
              /* eslint-enable */
            }
            // GA Event - Colour Option
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - A Colour Option: ${chosenColour}`, { sendOnce: true });
          }
        });
      });
    },
    /**
     * @desc Select Bundle Option
     */
    selectBundleOption(item) {
      const { components, settings } = Experiment;
      const bundles = item.querySelector('.MP122-bundles');
      const bundleOptions = bundles.querySelectorAll('.MP122-bundle__item');
      [].forEach.call(bundleOptions, (option) => {
        option.addEventListener('click', (e) => {
          const selectedColour = item.querySelector('.MP081_ColourPicker__option--active').getAttribute('data-colour');
          const chosenBundle = e.currentTarget.getAttribute('data-bundle');
          const brand = item.getAttribute('data-name');
          const brandContent = window.MP122[`${brand}`];
          for (let i = 0; i < brandContent.colours.length; i += 1) {
            if (brandContent.colours[i].name === `${selectedColour}`) {
              const colour = brandContent.colours[i];
              for (let y = 0; y < colour.variations.length; y += 1) {
                if (colour.variations[y].name === `${chosenBundle}`) {
                  const details = colour.variations[y];
                  const newBundleDetailsContent = components.createBundleDetails(details);
                  item.querySelector('.MP122-details').innerHTML = newBundleDetailsContent; // eslint-disable-line no-param-reassign
                  // GA Event - Shop Now CTA
                  const bundleTitle = item.querySelector('.MP122-bundleTitle').innerText;
                  item.querySelector('.MP122-shopBtn > a').addEventListener('click', () => {
                    events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Shop Now: ${bundleTitle}`, { sendOnce: true });
                  });
                  break;
                }
              }
            }
          }
          // Hides Bundle Options in order to re-animate them when the user goes back to this step
          item.querySelector('.MP122-bundles').classList.remove('show');
          // GA Event - Bundle Option
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - A Bundle Option: ${chosenBundle}`, { sendOnce: true });
        });
      });
    },
    /**
     * @desc Click on Product Images
     */
    clickOnPushchairImages() {
      const { settings } = Experiment;
      const pushchairImages = document.querySelectorAll('.productCard_image');
      [].forEach.call(pushchairImages, (image) => {
        image.addEventListener('click', () => {
          // GA Event - M&P Image
          const title = image.getAttribute('title');
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Product Image: ${title}`, { sendOnce: true });
        });
      });
    },
    /**
     * @desc Click on Product Titles
     */
    clickOnPushchairTitles() {
      const { settings } = Experiment;
      const pushchairTitles = document.querySelectorAll('.productCard_title.pb-1 .ga-product-click');
      [].forEach.call(pushchairTitles, (title) => {
        title.addEventListener('click', () => {
          if (!title.classList.contains('MP122-productTitle')) {
            // GA Event - Any Non M&P Title
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Any non mamas and papas pushchairs`, { sendOnce: true }); // eslint-disable-line quotes
          } else {
            // GA Event - Any M&P Title
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Any mamas and papas pram`, { sendOnce: true }); // eslint-disable-line quotes
          }
        });
      });
    },
  },
};

export default Experiment;
