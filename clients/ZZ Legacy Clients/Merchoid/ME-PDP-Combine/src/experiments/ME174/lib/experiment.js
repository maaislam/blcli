import setup from './services';

/**
 * ME174 - Christmas Jumper PLP on PDP
 */
const Experiment = {
  cache: (() => {
    const docVar = document;
    const bodyVar = docVar.body;
    // Render Location
    const youMightAlsoLikeParent = bodyVar.querySelector('.row.max-width:last-child > .columns.small-12');
    // Reassigned when container renders
    let jumperBlocksContainer;

    return {
      docVar,
      bodyVar,
      youMightAlsoLikeParent,
      jumperBlocksContainer,
    };
  })(),
  init: () => {
    Experiment.services.getProducts();
  },
  services: {
    // Get the christmas jumpers products
    getProducts: () => {
      const jumperRequest = new XMLHttpRequest();
      jumperRequest.open('GET', '/geeks-guide-to-ugly-christmas-sweaterjumpers/', true);
      // Succesful request starts the test
      jumperRequest.onload = () => {
        if (jumperRequest.status >= 200 && jumperRequest.status < 400) {
          const div = document.createElement('div');
          div.insertAdjacentHTML('afterbegin', jumperRequest.responseText);
          // Check if container for jumpers exist
          const productContainer = div.querySelector('.entry-content');
          if (productContainer) {
            setup();
            // Pass data to render
            Experiment.render.parseData(productContainer);
          }
        }
      };
      // Request does nothing on error
      jumperRequest.send();
    },
    // Returns the jumpers to display first - based on brand
    getPrioritised: () => {
      // Convert brand to uppercase and remove whitespace
      let retrievalKey = Experiment.cache.bodyVar.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_name"]').value.toUpperCase().replace(/ /g, '');
      // multiple brands for the television category, reassign key based on regex
      if (retrievalKey.match(/JURASSICPARK|RICKANDMORTY|ADVENTURETIME/g)) {
        retrievalKey = 'TV';
      }
      const jumperDOMData = {
        MARVEL: 0,
        STARWARS: 1,
        DCCOMICS: 2,
        BATMAN: 2,
        FORTNITE: 4,
        DISNEY: 5,
        TV: 6,
        HARRYPOTTER: 7,
      };
      // Default to gaming - seems to have the largest variation if option not found
      return jumperDOMData[retrievalKey] || 3;
    },
  },
  render: {
    parseData(retrievedData) {
      // Render container
      Experiment.cache.youMightAlsoLikeParent.insertAdjacentHTML('afterbegin', `
        <div class="ME174_Container">
          <div class="ME174_Header_Container">
            <h2 class="ME174_Header">View More Of Our Officially Licensed Christmas Jumpers</h2>
          </div>
          <div class="ME174_Jumper_Container">
          </div>
        </div>
      `);
      // Region specific wording
      window.UC.poller([() => !!window.merchoidDetectedCountry], () => {
        const title = document.querySelector('.ME174_Header');
        switch (window.merchoidDetectedCountry) {
          case 'US':
            title.innerText = title.innerText.replace('Jumpers', 'Sweaters');
            break;

          default:
            break;
        }
      });
      // Store selector
      Experiment.cache.jumperBlocksContainer = Experiment.cache.bodyVar.querySelector('.ME174_Jumper_Container');
      // Get relevant array index
      const allCategoryContainers = retrievedData.querySelectorAll('.woocommerce.columns-4');
      const prioritisedData = Experiment.services.getPrioritised();
      // These product catgegories are skipped
      const excludedArray = [8, 9, 12, prioritisedData];
      // Initialise variable to collect markup
      let productMarkup = '';
      // Render Priotised category first
      productMarkup += this.retrievedContainer(allCategoryContainers[prioritisedData]);
      // Render other categories
      for (let i = 0, n = allCategoryContainers.length; i < n; i += 1) {
        // Check if the current index is not exlcuded, render it
        if (excludedArray.indexOf(i) === -1) {
          productMarkup += this.retrievedContainer(allCategoryContainers[i]);
        }
      }
      // Markup ready, complete render
      Experiment.cache.jumperBlocksContainer.insertAdjacentHTML('beforeend', `
        <ul class="ME174_Product_List">
          ${productMarkup}
        </ul>
      `);
    },
    retrievedContainer(currentCategory) {
      // Initialise variable to collect current markup
      let markupCollector = '';
      // Find all in stock jumpers
      const currentProducts = currentCategory.querySelectorAll('.product-small:not(.out-of-stock)');
      // Iterate over products and retrieve outerHTML
      for (let i = 0, n = currentProducts.length; i < n; i += 1) {
        markupCollector += currentProducts[i].outerHTML;
      }
      return markupCollector;
    },
  },
};

export default Experiment;
