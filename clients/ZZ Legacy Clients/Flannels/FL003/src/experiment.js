import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL003}} - {{Delivery Address}}
 */

const Run = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL003',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const billingAddressCB = bodyVar.querySelector('#chkUseAsBillingAddress');
      const billingAddressParent = bodyVar.querySelector('.billGroup');
      const homeDeliveryButton = bodyVar.querySelector('.deliveryGroup_HomeDelivery');
      const collectionButton = bodyVar.querySelector('.deliveryGroup_DeliveryCollection');
      const HDParent = bodyVar.querySelector('#HomeDeliveryWrapper');
      const CParent = bodyVar.querySelector('#DeliveryCollectionDeliveryWrapper');
      const billingAddressMarkup = `
      <div class="FL003-Billing-Address-Wrap">
        <p class="FL003-Billing-Address-Message">We will ask you to filling your billing address *after* entering your card details</p>
      </div>
      `;
      let BAParent;
      return {
        bodyVar,
        billingAddressCB,
        billingAddressMarkup,
        billingAddressParent,
        BAParent,
        homeDeliveryButton,
        collectionButton,
        HDParent,
        CParent,
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
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Insert markup
        Exp.cache.billingAddressParent.insertAdjacentHTML('beforeend', Exp.cache.billingAddressMarkup);
        // Assign selector
        Exp.cache.BAParent = Exp.cache.bodyVar.querySelector('.FL003-Billing-Address-Wrap');
        // Check if use billing address box is checked, toggle class if not
        if (!Exp.cache.billingAddressCB.checked) {
          // Toggle class
          Exp.cache.BAParent.classList.toggle('FL003-Show-Message');
        }
        // Add an event handler to the billing address checkbox
        Exp.cache.billingAddressCB.addEventListener('change', () => {
          // Toggle class
          Exp.cache.BAParent.classList.toggle('FL003-Show-Message');
        });
        // Add event handlers to home delivery and pickup buttons to toggle styling class
        Exp.cache.collectionButton.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID} - Variation ${Exp.settings.VARIATION}`, 'Click', 'Collection', { sendOnce: true });
          // Add styling class
          if (Exp.cache.CParent.style.display !== 'none') {
            Exp.cache.collectionButton.classList.add('FL003-Selected');
          }
          // Rmeove styling class from delivery button
          if (Exp.cache.homeDeliveryButton.classList.contains('FL003-Selected')) {
            Exp.cache.homeDeliveryButton.classList.remove('FL003-Selected');
          }
        });
        Exp.cache.homeDeliveryButton.addEventListener('click', () => {
          // Send Event
          events.send(`${Exp.settings.ID} - Variation ${Exp.settings.VARIATION}`, 'Click', 'Home Delivery', { sendOnce: true });
          // Add styling class
          if (Exp.cache.HDParent.style.display !== 'none') {
            Exp.cache.homeDeliveryButton.classList.add('FL003-Selected');
          }
          // Rmeove styling class from delivery button
          if (Exp.cache.collectionButton.classList.contains('FL003-Selected')) {
            Exp.cache.collectionButton.classList.remove('FL003-Selected');
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
