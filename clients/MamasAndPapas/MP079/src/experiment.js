import { fullStory, scrollTo, events } from '../../../../lib/utils';


const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP079',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings } = Experiment;
    const { services } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // get the stock amount of the product
    const stockAmount = window.universal_variable.product.stock;
    if (stockAmount === 0) {
      const productDetail = document.querySelector('.productDetail.py-4 .py-3');
      const newStock = document.createElement('div');
      newStock.classList.add('MP079-outOfStock');
      newStock.innerHTML = `<h4>This item is out of stock online</h4>
                            <p>But don't worry we have lots of similiar items we know you'll love...</p>
                            <a href="#customersbought">See similiar items</a>`;
      productDetail.appendChild(newStock);

      const similiarProducts = document.getElementById('customersbought');
      const newStockLink = newStock.querySelector('a');
      // check this returns a value
      const productsVal = similiarProducts.getBoundingClientRect().y + window.scrollY;
      if (productsVal > 0) {
        newStockLink.addEventListener('click', (e) => {
          e.preventDefault();
          scrollTo(productsVal - 200);
          events.send('MP079 Out of Stock Sticky', 'See similiar click', 'MP079 See similiar items clicked', { sendOnce: true });
        });
      }
    }
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
