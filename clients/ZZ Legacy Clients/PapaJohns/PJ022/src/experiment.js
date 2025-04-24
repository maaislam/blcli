import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ022',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;

    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    components.createHeader();
    components.postcodeBox();
    components.clickCollectOrDelivery();

    services.signInClick();
    services.defaultPostcode();
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc if the postcode has been added by default
     */
    defaultPostcode: function defaultPostcode() {
      const hiddenPostcode = document.getElementById('ctl00_cphBody_txtPostcode');
      if (hiddenPostcode.value !== 'null') {
        document.getElementById('PJ022-postcode').value = hiddenPostcode.value;
      }
    },
    /**
     * @desc click collect function
     */
    clickCollect: function clickCollect() {
      const $newpostCode = document.getElementById('PJ022-postcode');
      const postcodeField = document.querySelector('#ctl00_cphBody_txtPostcode');
      const newPostcodeValue = $newpostCode.value;
      postcodeField.value = newPostcodeValue;

      /* eslint-disable */
      __doPostBack('ctl00$cphBody$lbGetStarted','');
      document.body.classList.add('PJ022-boxOpened');
      setTimeout(() => {
        const errorMessage = $('#ctl00_cphBody_pnlPostCodeError');
        if (!errorMessage.length) {
          __doPostBack('ctl00$_objHeader$lbOrderForCollection','');
        }
      }, 1000);
      /* eslint-enable */
    },
    /**
     * @desc click delivery function
     */
    clickDelivery: function clickDelivery() {
      const $newpostCode = document.getElementById('PJ022-postcode');
      const postcodeField = document.querySelector('#ctl00_cphBody_txtPostcode');
      const newPostcodeValue = $newpostCode.value;
      postcodeField.value = newPostcodeValue;
      /* eslint-disable */
      __doPostBack('ctl00$cphBody$lbGetStarted',''); 
      document.body.classList.add('PJ008-boxOpened');
 
      setTimeout(() => {
          const errorMessage = $('#ctl00_cphBody_pnlPostCodeError');
          if(!errorMessage.length) {
              __doPostBack('ctl00$_objHeader$lbOrderForDelivery','');
          }
      }, 1000);
      /* eslint-enable */
    },
    /**
     * @desc functions to run when the sign in or select a store is clicked
     */
    signInClick: function signInClick() {
      const storeLink = document.querySelector('.PJ022-store');
      const signInlink = document.querySelector('.PJ022-signin');
      const headerWrap = document.querySelector('.PJ022-header_Wrapper');
      /* eslint-disable */
      signInlink.addEventListener('click', () => {
        __doPostBack('ctl00$_objHeader$lbLoginRegisterItem','');
        headerWrap.classList.add('PJ22-fadeAway');
        closeSignInFade();
      });
      storeLink.addEventListener('click', () => {
        __doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem', '');
        headerWrap.classList.add('PJ22-fadeAway');
        closeStoreFade();
      });
      /* eslint-enable */
      // on close of the sign in or register remove the fade
      const closeStoreFade = () => {
        poller(['#ctl00__objHeader_lbCloseOnmibar1'], () => {
          const closestoreBlock = document.getElementById('ctl00__objHeader_lbCloseOnmibar1');
          closestoreBlock.addEventListener('click', () => {
            headerWrap.classList.remove('PJ22-fadeAway');
          });
        });
      };
      const closeSignInFade = () => {
        poller(['#ctl00__objHeader_lbCloseOnmibar2'], () => {
          const closestoreBlock = document.getElementById('ctl00__objHeader_lbCloseOnmibar2');
          closestoreBlock.addEventListener('click', () => {
            headerWrap.classList.remove('PJ22-fadeAway');
          });
        });
      };
    },
  },

  components: {
    /**
     * @desc Create the new header wrapper
     */
    createHeader: function createHeader() {
      const headerBlock = document.getElementById('ctl00__objHeader_upOneClickPopup');
      const parent = document.getElementById('aspnetForm');
      const newHeaderBlock = document.createElement('div');

      newHeaderBlock.classList.add('PJ022-header_Wrapper');
      newHeaderBlock.innerHTML =
        `<div class="PJ022_header">
        <div class="PJ022-top_bar">
            <div class="PJ022-logo"></div>
            <div class="PJ022-links">
              <div class="PJ022-guarantee"><a href="/quality-guarantee.aspx"><span>View</span> Papa's Quality Guarantee</a></div>
              <div class="PJ022-signin">Sign in <span>or</span> Register</div>
            </div>
          </div>
        </div>`;
      parent.insertBefore(newHeaderBlock, headerBlock.nextSibling);
    },
    /**
     * @desc create the postcode box & buttons
     */
    postcodeBox: function postcodeBox() {
      const postcodeBoxWrap = document.createElement('div');
      postcodeBoxWrap.classList.add('PJ022-postcode_Wrap');
      postcodeBoxWrap.innerHTML =
      `<div class="PJ022_postcode_box">
          <h2>Find your local Papa John's to view our menu and latest offers</h2>
          <p>Enter a valid postcode to find your nearest store. Don't know your postcode, 
          <span class="PJ022-store">select a store</span> instead</p>
          <input id="PJ022-postcode" type="text" autocomplete="off" placeholder="Enter a postcode" class="txtField"></input>
          <div class="PJ022-buttons"><span class="PJ022-or">OR</span></div>
        </div>
        <div class="PJ022-background"></div>`;
      document.querySelector('.PJ022_header').appendChild(postcodeBoxWrap);

      const buttonArr = [['PJ022-collect', "I'll collect"], ['PJ022-deliver', 'Deliver to me']];
      const buttonWrapper = document.querySelector('.PJ022-buttons');
      buttonArr.forEach((element) => {
        const typeButton = document.createElement('div');
        typeButton.classList.add(element[0]);
        typeButton.innerHTML = `<span>${element[1]}</span>`;
        buttonWrapper.appendChild(typeButton);
      });
    },
    /**
     * @desc on click of the collect button or delivery
     */
    clickCollectOrDelivery: function clickCollectOrDelivery() {
      const { services } = Experiment;

      const collectionButton = document.querySelector('.PJ022-collect');
      const deliveryButton = document.querySelector('.PJ022-deliver');

      collectionButton.addEventListener('click', () => {
        services.clickCollect();
        events.send('PJ022', 'Collection click', 'PJ022 collection clicked', { sendOnce: true });
      });
      deliveryButton.addEventListener('click', () => {
        services.clickDelivery();
        events.send('PJ022', 'Delivery click', 'PJ022 Deliver to me clicked', { sendOnce: true });
      });
    },
  },
};

export default Experiment;
