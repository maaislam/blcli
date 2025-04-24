/**
 * ME155 - Seemless PLP in PDP
 */

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME155',
    VARIATION: '1',
  },
  cache: (() => {
    const docVar = document;
    const bodyVar = docVar.body;
    const productBrandLink = bodyVar.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_link"]').value;
    // Where markup is inserted
    const youMightAlsoLikeParent = bodyVar.querySelector('.row.max-width:last-child > .columns.small-12');
    // Brand Image
    const brandImage = bodyVar.querySelector('.product-secondary-tabs__feature:first-child > .product-secondary-tabs__feature-image > img').src;
    // Brand name for alt text
    const brandName = bodyVar.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_name"]').value;
    // Reassigned when container added
    let ME155RequestedProductContainer;
    let ME155TrackView;

    return {
      docVar,
      bodyVar,
      productBrandLink,
      youMightAlsoLikeParent,
      ME155RequestedProductContainer,
      ME155TrackView,
      brandImage,
      brandName,
    };
  })(),
  init: () => {
    // Setup
    const { components } = Experiment;


    components.setupElements();
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    requestProducts: () => {
      // Make request to brand page
      const productRequest = new XMLHttpRequest();
      productRequest.open('GET', Experiment.cache.productBrandLink, true);
      productRequest.onload = () => {
        if (productRequest.status >= 200 && productRequest.status < 400) {
          const resp = productRequest.responseText;
          const div = document.createElement('div');
          div.insertAdjacentHTML('afterbegin', resp);
          const retrievedData = div.querySelector('.content-brand-wrapper');
          const brandProductContainer = div.querySelectorAll('.brand-category');
          const headerCheck = div.querySelectorAll('.section-category-heading');
          const productCheck = div.querySelectorAll('ul.products > li');
          // Check if retrieved and required data exists
          // Next line exceeds length
          // eslint-disable-next-line
          if (retrievedData && brandProductContainer.length > 0 && headerCheck.length > 0 && productCheck.length > 0) {
            // Initialise test
            Experiment.components.initialiseTest();
            // At least category 1, header and product found, render markup  - pass data to render
            Experiment.render.retrievedContent(brandProductContainer);
          }
        }
      };

      productRequest.send();
    },
  },
  components: {
    setupElements() {
      // Start Request
      Experiment.services.requestProducts();
    },
    initialiseTest() {
      // Add body class
      Experiment.cache.bodyVar.classList.add(Experiment.settings.ID);
      // Render content container
      Experiment.render.markupContainer();
      // Store selectors
      Experiment.cache.ME155RequestedProductContainer = Experiment.cache.bodyVar.querySelector('.ME155_Category_Containers');
    },
  },
  render: {
    markupContainer() {
      Experiment.cache.youMightAlsoLikeParent.insertAdjacentHTML('afterbegin', `
        <div class="ME155_Container">
          <div class="ME155_Brand_Header_Container">
            <span class="ME155_Header">More products from your favourite brand</span>
            <img class="ME155_Brand_Header_Image" src=${Experiment.cache.brandImage} alt=${Experiment.cache.brandName} />
          </div>
            <div class="ME155_Category_Containers">
            </div>
        </div>
      `);
    },
    retrievedContent(allProductContainers) {
      for (let i = 0; i < allProductContainers.length; i += 1) {
        const currentContainer = allProductContainers[i];
        const currentHeader = currentContainer.querySelector('.section-category-heading').textContent.trim();
        const currentProducts = currentContainer.querySelectorAll('ul.products > li');
        Experiment.cache.ME155RequestedProductContainer.insertAdjacentHTML('beforeend', `
          <div class="ME155_Catgegory_Block">
            <h2 class="ME155_Category_Header">${currentHeader}</h2>
            <div class="ME155_Product_Block">
              <ul class="ME155_Product_List">
              </ul>
            </div>
          </div>
        `);
        // Create a reference for product render
        const currentProductBlock = Experiment.cache.bodyVar.querySelectorAll('.ME155_Product_List')[i];
        // Render each product
        Experiment.render.retrievedProducts(currentProducts, currentProductBlock);
      }
    },
    retrievedProducts(productList, parentElement) {
      for (let i = 0; i < productList.length; i += 1) {
        const currentProduct = productList[i];
        parentElement.insertAdjacentElement('beforeend', currentProduct);
      }
    },
  },
};

export default Experiment;
