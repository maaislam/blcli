import { fullStory, events } from '../../../../lib/utils';
import productsDetails from './lib/MP083-content';

/**
 * {{MP083}} - {{Extra product info at PLP}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP083',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const productItems = document.querySelectorAll('.col-xs-6.col-sm-3.mt-3');
    const badgesInfo = document.querySelectorAll('.usp-outer');

    let productDetail;
    let productList;
    let productTitle;
    let productPrice;
    let listItems;
    let productHref;
    [].forEach.call(productItems, (item) => {
      productDetail = '';
      productTitle = '';
      productPrice = '';
      // Product Title
      if (item.querySelector('.productCard_title > a')) {
        productTitle = item.querySelector('.productCard_title > a').getAttribute('title');
        productHref = item.querySelector('.productCard_title > a').getAttribute('href');
      }
      // Gets Product Details from MP083-content
      listItems = productsDetails(item, item.querySelector('.productCard_mediaContainer a').href);

      // Product Detail List
      if (item.querySelector('.productLister > .productListItemPromotion .productCard_promoLine') === null || item.querySelector('.productLister > .productListItemPromotion .productCard_promoLine').textContent === '\n') {
        if (listItems !== '' || listItems !== null) {
          productList = `<ul class='MP083-productDetails'>${listItems}</ul>`;
        }
      } else {
        productDetail = item.querySelector('.productCard_promoLine').textContent;
        if (productDetail.match(/[a-z]/i)) {
          productList = `<ul class='MP083-productDetails'>${listItems}<li class='MP083-productDetails__item'>${productDetail}</li></ul>`;
        }
      }

      // Product Price
      if (item.querySelector('.productCard_price > .price')) {
        productPrice = item.querySelector('.productCard_price > .price').textContent.split(/\n/)[1].replace('£', '');
      }

      const productDetailsContainer = `<div class='MP083-productCard productCard transition-transform p-2'>
      <div class='MP083-productTitle'><a href='${productHref}'>${productTitle}</a></div>${productList}
      <div class="MP083-productPrice">£${productPrice}</div>
      </div>`;

      item.insertAdjacentHTML('afterend', productDetailsContainer);
    });

    if (window.innerWidth >= 768) {
      let badgeLink;
      [].forEach.call(badgesInfo, (info) => {
        // Badge Text Info
        const badgeText = info.querySelector('.usp-inner > p.usp-text').textContent;

        // Badge Image Size
        info.querySelector('.usp-inner > img').style.maxWidth = '100%'; // eslint-disable-line no-param-reassign
        // Badge Link
        if (info.querySelector('.usp-inner > a')) {
          badgeLink = info.querySelector('.usp-inner > a').outerHTML;
        } else {
          badgeLink = '';
        }

        const newBadgeInfo = `<div class='MP083-productCard productCard transition-transform p-2'>
        <div class='MP083-productBadgeContainer'><p>${badgeText}</p><div class='MP083-badge__link'>${badgeLink}</div></div>
        </div>`;

        info.parentElement.parentElement.insertAdjacentHTML('afterend', newBadgeInfo);
      });
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

  components: {},
};

export default Experiment;
