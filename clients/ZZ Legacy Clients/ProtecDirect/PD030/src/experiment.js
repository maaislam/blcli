import { fullStory, events } from '../../../../lib/utils';


/**
 * {{PD030}} - {{Product Guidance v1}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'PD030',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const IDArray = ['10833001', '8545_7-12', '12230001', '10832200', 'HOLTON-B', 'HOLTON-T', 'HOLTON-H', '12231001', '8545_3-6'];
      const allProducts = bodyVar.querySelectorAll('.span-10.subcat_column-item.pd3--variant-product');
      const PD030Markup = `
        <div class="PD030_Container">
            <p class="PD030_SafetyT">Safety Toe Cap</p>
            <p class="PD030_SafetyM">Safety Midsole</p>
        </div>
      `;

      return {
        docVar,
        bodyVar,
        IDArray,
        allProducts,
        PD030Markup,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Add markup to each product container
        for (let i = 0; i < Exp.cache.allProducts.length; i += 1) {
          Exp.cache.allProducts[i].insertAdjacentHTML('afterbegin', Exp.cache.PD030Markup);
          // Secondary loop to determine if a product should have midsole removed
          // Remove the word 'cart' from ID to check against ID Array
          let codeToCheck = Exp.cache.allProducts[i].querySelector('.pd3-prod-content.clearfix .cart').id;
          codeToCheck = codeToCheck.replace(/cart-/g, '');
          for (let j = 0; j < Exp.cache.IDArray.length; j += 1) {
            if (codeToCheck === Exp.cache.IDArray[j]) {
              // Add styling class to adjust content
              Exp.cache.allProducts[i].classList.add('PD030-Hide');
              break;
            }
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
