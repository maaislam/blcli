import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';

/**
 * {{TP135m}} - {{Prompt to login after first basket add}}
 */

const TP135Markup = `
  <div class="TP135_Container">
    <div class="TP135_Body_Click"></div>
    <div class="TP135_Inner_Container">
      <p class="TP135_Modal_Header">Before you add to bag!<span class="TP135_Close">×</span></p>
      <div class="TP135_Content_Container">
        <span class="TP135_Header">You are adding this item:</span>
        <div class="TP135_Product_Detail_Container">
          <img class="TP135_Image" />
          <div class="TP135_Product_Text_Conatiner">
            <span class="TP135_Product_Title"></span>
            <span class="TP135_Product_Price_EVAT"><span class="TP135_EVAT"></span> per each (ex VAT)</span>
            <span class="TP135_Product_Price_IVAT"><span class="TP135_IVAT"></span> per each (inc VAT)</span>
          </div>
        </div>
        <p class="TP135_Adding_Sub_Text">To a <span class="TP135_Bold TP135_Guest_Basket_Text">Guest Basket</span></p>
        <div class="TP135_Account_Text_Conatainer">
          <span class="TP135_Account_Text_Header">Do you have a Travis Perkins Account?</span>
          <span class="TP135_Account_Text">You may be missing your trade discounts by not logging in</span>
        </div>
        <div class="TP135_Button_Conatiner">
          <span class="TP135_Button">Continue as a Guest</span>
          <a href="/login" class="TP135_Link">Log in & Add to Basket</a>
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
          if (!window.sessionStorage.getItem('TP135_Viewed')) {
            // Use reqSettings.data to find product in DOM, populate modal content
            const reqData = reqSettings.data;
            const productID = reqData.match(/productCodePost=(\d+)/)[1];
            const productParent = Exp.cache.bodyVar.querySelector(`#productForm_${productID}`).parentNode.parentNode;
            // Populate modal information
            const imageEl = productParent.querySelector('.product_item_header > a > img');
            const modalImg = Exp.cache.bodyVar.querySelector('.TP135_Image');
            modalImg.setAttribute('src', imageEl.getAttribute('src'));
            modalImg.setAttribute('alt', imageEl.getAttribute('alt'));
            // // Ex vat price
            // eslint-disable-next-line
            Exp.cache.bodyVar.querySelector('.TP135_EVAT').textContent = productParent.querySelector('.price_value').textContent.trim();
            // // Product Title
            // eslint-disable-next-line
            Exp.cache.bodyVar.querySelector('.TP135_Product_Title').textContent = productParent.querySelector('.advanced_plp_product_name').textContent.trim();
            Exp.cache.bodyVar.classList.add('TP135_Display');
            // Send Event
            events.send(`${settings.ID}`, 'Viewed', 'Lightbox', { sendOnce: true });
            window.sessionStorage.setItem('TP135_Viewed', 'TP135_Viewed');
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
      Exp.render.modal();
      // Watch for network requests
      $(Exp.cache.docVar).ajaxComplete((event, request, reqSettings) => {
        // Check URL and response status, if endpoint is add to cart or add for collection
        // and requst status is successful show modal
        const requestURL = reqSettings.url.toUpperCase();
        if ((requestURL === '/CART/ADD' || requestURL === '/CART/ADDFORCOLLECTION') && (request.status >= 200 && request.status < 400)) {
          if (!window.sessionStorage.getItem('TP135_Viewed')) {
            Exp.cache.bodyVar.classList.add('TP135_Display');
            window.sessionStorage.setItem('TP135_Viewed', 'TP135_Viewed');
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
        modalImage.setAttribute('src', JSON.parse(Exp.cache.docVar.getElementById('productMarkUp').innerHTML).image);
        Exp.cache.continueButton = Exp.cache.bodyVar.querySelector('.TP135_Button');
        Exp.cache.modalBG = Exp.cache.bodyVar.querySelector('.TP135_Body_Click');
        Exp.cache.modalCross = Exp.cache.bodyVar.querySelector('.TP135_Close');
        // Set product name
        Exp.cache.bodyVar.querySelector('.TP135_Product_Title').textContent = Exp.cache.bodyVar.querySelector('.tp_prodName > h3').textContent.trim();
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
