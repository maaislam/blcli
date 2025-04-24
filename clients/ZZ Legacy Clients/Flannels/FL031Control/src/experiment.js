import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{FL031}} - {{Test Description}}
 */
const Run = () => {
  events.analyticsReference = '_gaUAT';
  const doc = document;
  const bodyVar = doc.body;
  let $ = null;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL031',
      VARIATION: '1',
    },
    cache: (() => {
      const bagItems = JSON.parse(doc.getElementById('divBagItems').getAttribute('data-basket'));
      const bagQuantity = bagItems.Quantity;
      const subTotal = bagItems.SubTotal;
      const basketProducts = bagItems.BasketProductDetails;
      const basketLength = basketProducts.length;
      let miniBag;
  
      return {
        bagItems,
        bagQuantity,
        subTotal,
        basketProducts,
        basketLength,
        miniBag,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      if (Exp.cache.basketLength > 0) {
        services.tracking();
      }
    },
    services: {
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Control`);
        events.send(settings.ID, 'View', `${settings.ID} Control activated`);
      },
    },
  };

  Exp.init();
};

export default Run;
