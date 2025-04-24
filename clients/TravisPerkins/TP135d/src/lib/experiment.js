import { setup } from './services';
import { events, getClosest } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{TP135d}} - {{Prompt to login after first basket add}}
 */

const TP135Markup = `
  <div class="TP135_Container">
    <div class="TP135_Body_Click"></div>
    <div class="TP135_Inner_Container">
      <p class="TP135_Modal_Header">Add to a <span class="TP135_Bold">guest</span> basket?<span class="TP135_Close">×</span></p>
      <div class="TP135_Content_Container">
        <span class="TP135_Header">Do you have a Travis Perkins Account?</span>
        <span class="TP135_Sub_Header">You may be missing your trade discount<br />by not logging in</span>
        <div class="TP135_Product_Detail_Container">
          <p class="TP135_Adding_Text">You are about to add:</p>
          <img class="TP135_Image" />
          <div class="TP135_Product_Text_Conatiner">
            <span class="TP135_Product_Title"></span>
            <span class="TP135_Product_Price_EVAT"><span class="TP135_EVAT"></span> per each (ex VAT)</span>
            <span class="TP135_Product_Price_IVAT"><span class="TP135_IVAT"></span> per each (inc VAT)</span>
          </div>
        </div>
        <p class="TP135_Adding_Sub_Text">To a <span class="TP135_Bold TP135_Guest_Basket_Text">Guest Basket</span></p>
        <div class="TP135_Button_Conatiner">
          <a href="/login" class="TP135_Link">Log in & Add to Basket</a>
          <span class="TP135_Button">Continue as a Guest</span>
        </div>
      </div>
    </div>
  </div>
`;


const RunPLP = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Reassigned when modal is rendered
      // eslint-disable-next-line
      let modalCross;
      // eslint-disable-next-line
      let modalBG;
      // eslint-disable-next-line
      let continueButton;

      return {
        docVar,
        bodyVar,
        modalCross,
        modalBG,
        continueButton,
      };
    })(),
    init: () => {
      setup();
      // Render modal - hidden by default
      Exp.cache.bodyVar.insertAdjacentHTML('beforeend', TP135Markup);
      // Add category styling class to modal
      Exp.cache.bodyVar.querySelector('.TP135_Container').classList.add('TP135_Category');
      Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('.TP135_Button');
      Exp.cache.modalBG = Exp.cache.bodyVar.querySelector('.TP135_Body_Click');
      Exp.cache.modalCross = Exp.cache.bodyVar.querySelector('.TP135_Close');
      Exp.bindExperimentEvents.addModalClose();
      Exp.bindExperimentEvents.addTracking();

      // Watch for network requests
      $(Exp.cache.docVar).ajaxComplete((event, request, reqSettings) => {
        // Check URL and response status, if endpoint is add to cart or add for collection
        // and requst status is successful show modal
        const requestURL = reqSettings.url.toUpperCase();
        if ((requestURL === '/CART/ADD' || requestURL === '/CART/ADDFORCOLLECTION') && (request.status >= 200 && request.status < 400)) {
          if (!window.localStorage.getItem('TP135_Viewed')) {
            // Use reqSettings.data to find product in DOM, populate modal content
            const reqData = reqSettings.data;
            // const productID = reqData.substring(reqData.indexOf('productCodePost=') + 16, reqData.indexOf('&CSRFToken'));
            const productID = reqData.match(/productCodePost=(\d+)/)[1];
            const productParent = getClosest(Exp.cache.bodyVar.querySelector(`#productForm_${productID}`), '.tpPlpProductPanelComponent');
            // Populate modal information
            const imageEl = productParent.querySelector('.prod_img > a > img');
            const modalImg = Exp.cache.bodyVar.querySelector('.TP135_Image');
            modalImg.setAttribute('src', imageEl.getAttribute('src'));
            modalImg.setAttribute('alt', imageEl.getAttribute('alt'));
            // Ex vat price
            // TODO: Issue getting textContent here
            Exp.cache.bodyVar.querySelector('.TP135_EVAT').textContent = productParent.querySelector('.price_value').innerText.trim();
            // Product Title
            Exp.cache.bodyVar.querySelector('.TP135_Product_Title').textContent = productParent.querySelector('.prod_name').innerText.trim();
            Exp.cache.bodyVar.classList.add('TP135_Display');
            // Send Event
            events.send(`${settings.ID}`, 'Viewed', 'Lightbox', { sendOnce: true });
            window.localStorage.setItem('TP135_Viewed', 'TP135_Viewed');
          }
        }
      });
    },

    bindExperimentEvents: {
      handleModalClose: () => {
        Exp.cache.bodyVar.classList.remove('TP135_Display');
        events.send(`${settings.ID}`, 'Click', 'Continue as guest', { sendOnce: true });
        // If existing lightbox close button exists, click it
        const existingModalCLose = Exp.cache.bodyVar.querySelector('.inc_minibasket_close');
        if (existingModalCLose) {
          existingModalCLose.click();
        }
      },
      addModalClose() {
        Exp.cache.modalBG.addEventListener('click', this.handleModalClose);
        Exp.cache.modalCross.addEventListener('click', this.handleModalClose);
        Exp.cache.continueButton.addEventListener('click', this.handleModalClose);
      },
      addTracking() {
        // Track login button
        Exp.cache.bodyVar.querySelector('.TP135_Link').addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Click', 'Log me in and add to basket', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

const RunPDP = () => {
  const $ = window.jQuery;
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const productImage = bodyVar.querySelector('.s7staticimage > img');
      // Reassigned when modal is rendered
      // eslint-disable-next-line
      let modalCross;
      // eslint-disable-next-line
      let modalBG;
      // eslint-disable-next-line
      let continueButton;

      return {
        docVar,
        bodyVar,
        productImage,
        modalCross,
        modalBG,
        continueButton,
      };
    })(),
    init: () => {
      setup();
      Exp.render.modal();
      // Watch for network requests
      $(Exp.cache.docVar).ajaxComplete((event, request, reqSettings) => {
        // Check URL and response status, if endpoint is add to cart or add for collection
        // and requst status is successful show modal
        const requestURL = reqSettings.url.toUpperCase();
        if ((requestURL === '/CART/ADD' || requestURL === '/CART/ADDFORCOLLECTION') && (request.status >= 200 && request.status < 400)) {
          if (!window.localStorage.getItem('TP135_Viewed')) {
            Exp.cache.bodyVar.classList.add('TP135_Display');
            window.localStorage.setItem('TP135_Viewed', 'TP135_Viewed');
            // Send Event
            events.send(`${settings.ID}`, 'Viewed', 'Lightbox', { sendOnce: true });
          }
        }
      });
    },
    render: {
      modal: () => {
        Exp.cache.bodyVar.insertAdjacentHTML('beforeend', TP135Markup);
        // Store selectors and update modal product details
        const modalImage = Exp.cache.bodyVar.querySelector('.TP135_Image');
        modalImage.setAttribute('src', Exp.cache.productImage.getAttribute('src'));
        modalImage.setAttribute('alt', Exp.cache.productImage.getAttribute('alt'));
        Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('.TP135_Button');
        Exp.cache.modalBG = Exp.cache.bodyVar.querySelector('.TP135_Body_Click');
        Exp.cache.modalCross = Exp.cache.bodyVar.querySelector('.TP135_Close');
        // Set product name
        Exp.cache.bodyVar.querySelector('.TP135_Product_Title').textContent = Exp.cache.bodyVar.querySelector('h1.tpProductTitle').textContent.trim();
        // Set inc and ex vat prices
        Exp.cache.bodyVar.querySelector('.TP135_EVAT').textContent = Exp.cache.bodyVar.querySelector('.price_value').textContent.trim();
        Exp.cache.bodyVar.querySelector('.TP135_IVAT').textContent = Exp.cache.bodyVar.querySelector('.includedVAT').textContent.trim();
        // Add event listeners
        Exp.bindExperimentEvents.addModalClose();
        Exp.bindExperimentEvents.addTracking();
      },
    },
    bindExperimentEvents: {
      handleModalClose: () => {
        Exp.cache.bodyVar.classList.remove('TP135_Display');
        events.send(`${settings.ID}`, 'Click', 'Continue as guest', { sendOnce: true });
        // If existing lightbox close button exists, click it
        const existingModalCLose = Exp.cache.bodyVar.querySelector('.inc_minibasket_close');
        if (existingModalCLose) {
          existingModalCLose.click();
        }
      },
      addModalClose() {
        Exp.cache.modalBG.addEventListener('click', this.handleModalClose);
        Exp.cache.modalCross.addEventListener('click', this.handleModalClose);
        Exp.cache.continueButton.addEventListener('click', this.handleModalClose);
      },
      addTracking() {
        // Track login button
        Exp.cache.bodyVar.querySelector('.TP135_Link').addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Click', 'Log me in and add to basket', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export { RunPDP, RunPLP };
