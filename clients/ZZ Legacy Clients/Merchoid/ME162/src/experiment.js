import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ME162}} - {{Brand Page - Scarcity}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME162',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Get brand name
    const brandName = components.getBrandName();
    // Build up messages, 1, 2 and 3.
    const messageOne = components.firstMessage(brandName);
    const messageTwo = components.secondMessage();
    const messageThree = components.thirdMessage(brandName);

    // Add messages
    components.addMessage(messageOne, 1);
    components.addMessage(messageTwo, 5);
    components.addMessage(messageThree, 9);
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
    getBrandName() {
      const metaTags = document.getElementsByTagName('meta');
      for (let i = 0; metaTags.length > i; i += 1) {
        const metaAttr = metaTags[i].getAttribute('property');
        if (metaAttr === 'og:brand') {
          const brandName = metaTags[i].getAttribute('content');
          return brandName;
        }
      }
    },
    firstMessage(brandName) {
      const html = `
        <div id="ME162-one" class="ME162-message">
          <p>Super rare ${brandName} merch you won't find in boring, big box retailers</p>
        </div>
      `;
      return html;
    },
    secondMessage(brandName) {
      const html = `
        <div id="ME162-two" class="ME162-message">
          <p>All our ${brandName} merch is only available in limited numbers. Once they're all gone, they're gone!</p>
        </div>
      `;
      return html;
    },
    thirdMessage(brandName) {
      const html = `
        <div id="ME162-three" class="ME162-message">
          <p>Don't miss out and regret it - buy now and show you're the biggest ${brandName} fan</p>
        </div>
      `;
      return html;
    },
    /**
     * @desc Add the selected message after the Nth number of products
     * @param {HTML} message
     * @param {Number} afterProductNumber
     */
    addMessage(message, afterProductNumber) {
      const products = document.querySelectorAll('.category-page ul.products > li');
      for (let i = 0; products.length > i; i += 1) {
        const product = products[i];
        // If product grid is 3 in a row add 1 to afterProductNumber
        let number = afterProductNumber;
        if (product.classList.contains('grid3')) {
          number = afterProductNumber + 1;
        }
        if (i === number) {
          product.insertAdjacentHTML('afterend', message);
          // Send Event
          events.send(Experiment.settings.ID, 'Added', 'Scarcity message was added');
          return;
        }
      }
    },
  },
};

export default Experiment;
