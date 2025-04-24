import { fullStory, events } from '../../../../lib/utils';
import PublishSubscribe from './lib/PublishSubscribe';
import miniBasketCarousel from './lib/mini-basket-carousel';
import lightboxCarousel from './lib/lightbox-carousel';

/**
 * MP096
 */
class Experiment {
  /**
   * @constructor
   */
  constructor() {
    this.settings = {
      ID: 'MP096',
      VARIATION: '{{VARIATION}}',
    };
  }


  /**
   * Entry point for running experiment
   */
  init() {
    document.body.classList.add(this.settings.ID);
    document.body.classList.add(this.settings.ID + '-V' + this.settings.VARIATION);

    this.trackOnPageLoad();

    // -----------------------------------------
    // Subscribers Across all variations
    // -----------------------------------------

    // Clicked 'add to bag'
    PublishSubscribe.subscribe('clicked-add-to-bag', () => {
      events.send(
        'MP096-V' + this.settings.VARIATION, 
        'clicked-add-to-bag', 
        '',
        {sendOnce: true}
      );
    });

    // Clicked 'more info'
    PublishSubscribe.subscribe('clicked-more-info', () => {
      events.send(
        'MP096-V' + this.settings.VARIATION, 
        'clicked-more-info', 
        '',
        {sendOnce: true}
      );
    });
    
    // Clicked view all
    PublishSubscribe.subscribe('click-view-all', () => {
      events.send(
        'MP096-V' + this.settings.VARIATION, 
        'clicked-view-all', 
        '',
        {sendOnce: true}
      );
    });
    
    // Refresh cart on add to bag
    PublishSubscribe.subscribe('did-add-to-bag', () => {
      ACC.minicart.getMiniCart();
    });
    
    // Error adding to bag
    PublishSubscribe.subscribe('error-adding-to-bag', (sku) => {
      events.send(
        'MP096-V' + this.settings.VARIATION, 
        'error--add-to-bag', 
        'pageurl:' + window.location.pathname + ';addedsku:' + sku, 
        {sendOnce: true}
      );
    });

    PublishSubscribe.subscribe('did-add-to-bag', () => {
      events.send('MP096-V' + this.settings.VARIATION, 
        'added-to-basket-from-carousel', '', {sendOnce: true});
    });

    // -----------------------------------------
    // Run variations
    //
    // V1: Lightbox
    // V2: Mini Basket Carousel
    // -----------------------------------------
    const data = this.getProductDataFromQubit();
    while(data.length > 8) {
      data.pop();
    }

    if(this.settings.VARIATION == 1) {
      lightboxCarousel(data);
    } else if(this.settings.VARIATION == 2) {
      miniBasketCarousel(data);
    }
  }

  /**
   * Helper get recommendations from Qubit
   */
  getProductDataFromQubit() {
    const d = window.MP046_product_recommendations;

    const productData = [];

    if(d && d.length) {
      d.forEach((prod) => {
        const item = prod.details;
        if(item.stock > 0) {
          productData.push({
            url: item.url,
            before_sale_price: '£' + item.unit_sale_price.toFixed(2),
            price: '£' + item.unit_price.toFixed(2),
            sku: item.sku_code,
            name: item.name,
            image: item.image_url.replace(/http:https:\/\//i, '//')
              .replace(/https:\/\/media/i, '//')
              .replace(/http:\/\/media/i, '//')
          });
        }
      });
    }

    return productData;
  }

  /**
   * Helper for scraping product data off the page
   *
   * We can use this in place of Qubit's product recommendations
   * should we want to go back to this
   *
   * N.B. Qubit's recommendations are preferable as stock information is known to us
   */
  getProductDataFromPage() {
    const productData = [];

    const relSliderItems = document.querySelectorAll('.relatedItems .relatedItems_slider li:not(.slick-cloned)');
    [].forEach.call(relSliderItems, (item) => {
      const link = item.querySelector('a');
      const img = item.querySelector('img');
      const price = item.querySelector('.relatedItems_price');
      const nameElm = item.querySelector('.pt-3 a.popup');
      const dataItem = {};

      if(img && img.src && nameElm && link && link.href && price) {
        const target = link.href;
        const name = nameElm.textContent.trim();
        const priceText = price.textContent.trim();
        const matchLinkToSku = target.match(/p\/(\d+)/i);

        if(target && name && priceText && matchLinkToSku && matchLinkToSku[1]) {
          const sku = matchLinkToSku[1];

          dataItem.url = target;
          dataItem.name = name;
          dataItem.sku = sku;
          dataItem.price = priceText;
          dataItem.image = img.src.replace(/http:https:\/\//i, '')
            .replace(/https:\/\/media/i, '//')
            .replace(/http:\/\/media/i, '//');

        }
      }

      if(dataItem.sku) {
        productData.push(dataItem);
      }
    });

    return productData;
  }

  /**
   * Post-polling event tracking
   */
  trackOnPageLoad() {
    fullStory(this.settings.ID, `Variation ${this.settings.VARIATION}`);
    events.send(this.settings.ID, 'View', `${this.settings.ID} activated - Variation ${this.settings.VARIATION}`);
  }
}

const experiment = new Experiment();
export default experiment;
