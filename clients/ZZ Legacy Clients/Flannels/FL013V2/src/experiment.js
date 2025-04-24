import { fullStory, events } from '../../../../lib/utils';

/**
 * {{FL013}} - {{Local storage cache of entered fields across checkout}}
 */
const RunCheckoutLaunch = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const input = bodyVar.querySelector('.newCustomer .field.SignLogIn2 input');
      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013V2_checkoutGuest')));
      let checkoutJSON = {
        email: '',
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        input,
        checkoutJSON,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.checkoutJSON.email !== '') {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously');
        }
      },
      bind() {
        Exp.cache.input.addEventListener('blur', () => {
          const val = Exp.cache.input.value;
          if (val) {
            Exp.cache.checkoutJSON.email = val;
            localStorage.setItem('FL013V2_checkoutGuest', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
          }
        });
      },
    },
  };

  Exp.init();
};

const RunDeliveryChoices = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const autofillWrap = bodyVar.querySelectorAll('.pca > .pcaautocomplete');
      const firstName = bodyVar.querySelector('.form-control.txtFirstName');
      const lastName = bodyVar.querySelector('.form-control.txtLastName');
      const country = bodyVar.querySelector('.form-control.ddlCountry');
      const addressLine1 = bodyVar.querySelector('.form-control.txtAddress1');
      const addressLine2 = bodyVar.querySelector('.form-control.txtAddress2');
      const town = bodyVar.querySelector('.form-control.txtTownCity');
      const countyState = bodyVar.querySelector('.form-control.txtCounty');
      const postcode = bodyVar.querySelector('#HomeDeliveryWrapper .form-control.txtPostcode');
      const billingAdd = bodyVar.querySelector('#chkUseAsBillingAddress');
      const mobileNumber = bodyVar.querySelector('#HomeDeliveryWrapper .TelephoneLine .form-control');
      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013Control_deliveryForm')));

      let checkoutJSON = {
        firstName: '',
        lastName: '',
        country: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        countyState: '',
        postcode: '',
        billingAdd: '',
        mobileNumber: '',
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        autofillWrap,
        firstName,
        lastName,
        country,
        addressLine1,
        addressLine2,
        town,
        countyState,
        postcode,
        billingAdd,
        mobileNumber,
        checkoutJSON,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.storedJSON) {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously Delivery Options');
        }
      },
      bind() {
        Exp.cache.firstName.addEventListener('blur', () => {
          const val = Exp.cache.firstName.value;

          Exp.cache.checkoutJSON.firstName = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.lastName.addEventListener('blur', () => {
          const val = Exp.cache.lastName.value;

          Exp.cache.checkoutJSON.lastName = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.country.addEventListener('change', () => {
          const val = Exp.cache.country.options[Exp.cache.country.selectedIndex].value;

          Exp.cache.checkoutJSON.country = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.addressLine1.addEventListener('blur', () => {
          const val = Exp.cache.addressLine1.value;

          Exp.cache.checkoutJSON.addressLine1 = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.addressLine2.addEventListener('blur', () => {
          const val = Exp.cache.addressLine2.value;

          Exp.cache.checkoutJSON.addressLine2 = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.town.addEventListener('blur', () => {
          const val = Exp.cache.town.value;

          Exp.cache.checkoutJSON.town = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.countyState.addEventListener('blur', () => {
          const val = Exp.cache.countyState.value;

          Exp.cache.checkoutJSON.countyState = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.postcode.addEventListener('blur', () => {
          const val = Exp.cache.postcode.value;

          Exp.cache.checkoutJSON.postcode = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.mobileNumber.addEventListener('blur', () => {
          const val = Exp.cache.mobileNumber.value;

          Exp.cache.checkoutJSON.mobileNumber = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.billingAdd.addEventListener('change', () => {
          const val = Exp.cache.billingAdd;

          if (val.checked === true) {
            Exp.cache.checkoutJSON.billingAdd = true;
          } else {
            Exp.cache.checkoutJSON.billingAdd = false;
          }
          Exp.cache.checkoutJSON.billingAdd = val;
          localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        [].forEach.call(Exp.cache.autofillWrap, (el) => {
          el.addEventListener('click', (e) => {
            const ele = e.target;
            setTimeout(() => {
              if (ele.classList.contains('pcaitem')) {
                Exp.cache.checkoutJSON.addressLine1 = Exp.cache.addressLine1.value;
                Exp.cache.checkoutJSON.addressLine2 = Exp.cache.addressLine2.value;
                Exp.cache.checkoutJSON.town = Exp.cache.town.value;
                Exp.cache.checkoutJSON.countyState = Exp.cache.countyState.value;
                Exp.cache.checkoutJSON.postcode = Exp.cache.postcode.value;
                localStorage.setItem('FL013Control_deliveryForm', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
              }
            }, 250);
          });
        });
      },
    },
  };

  Exp.init();
};

const RunDeliveryOptions = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const postcode = bodyVar.querySelector('#txtPostcodeOrTown');
      const pickupBtn = bodyVar.querySelector('.deliveryGroupTypeLi.deliveryGroup_DeliveryCollection');

      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013Control_pickupOption')));
      let checkoutJSON = {
        postcode: '',
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        postcode,
        checkoutJSON,
        pickupBtn,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.storedJSON) {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously Collection');
        }
      },
      bind() {
        Exp.cache.pickupBtn.addEventListener('click', () => {
          setTimeout(() => {
            Exp.components.loadStorage();
          }, 200);
        });

        Exp.cache.postcode.addEventListener('blur', () => {
          const val = Exp.cache.postcode.value;
          if (val !== '') {
            Exp.cache.checkoutJSON.postcode = val;
            localStorage.setItem('FL013Control_pickupOption', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
          }
        });
      },
    },
  };

  Exp.init();
};

const RunHomeDelivery = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const autofillWrap = bodyVar.querySelectorAll('.pca > .pcaautocomplete');
      const firstName = bodyVar.querySelector('.form-control.txtFirstName');
      const lastName = bodyVar.querySelector('.form-control.txtLastName');
      const country = bodyVar.querySelector('.form-control.ddlCountry');
      const addressLine1 = bodyVar.querySelector('.form-control.txtAddress1');
      const addressLine2 = bodyVar.querySelector('.form-control.txtAddress2');
      const town = bodyVar.querySelector('.form-control.txtTownCity');
      const countyState = bodyVar.querySelector('.form-control.txtCounty');
      const postcode = bodyVar.querySelector('#HomeDeliveryWrapper .form-control.txtPostcode');
      const billingAdd = bodyVar.querySelector('#chkUseAsBillingAddress');
      const mobileNumber = bodyVar.querySelector('#HomeDeliveryWrapper .TelephoneLine .form-control');
      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013Control_deliveryHome')));

      let checkoutJSON = {
        firstName: '',
        lastName: '',
        country: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        countyState: '',
        postcode: '',
        billingAdd: '',
        mobileNumber: '',
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        autofillWrap,
        firstName,
        lastName,
        country,
        addressLine1,
        addressLine2,
        town,
        countyState,
        postcode,
        billingAdd,
        mobileNumber,
        checkoutJSON,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.storedJSON) {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously Home Delivery');
        }
      },
      bind() {
        Exp.cache.firstName.addEventListener('blur', () => {
          const val = Exp.cache.firstName.value;

          Exp.cache.checkoutJSON.firstName = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.lastName.addEventListener('blur', () => {
          const val = Exp.cache.lastName.value;

          Exp.cache.checkoutJSON.lastName = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.country.addEventListener('change', () => {
          const val = Exp.cache.country.options[Exp.cache.country.selectedIndex].value;

          Exp.cache.checkoutJSON.country = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.addressLine1.addEventListener('blur', () => {
          const val = Exp.cache.addressLine1.value;

          Exp.cache.checkoutJSON.addressLine1 = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.addressLine2.addEventListener('blur', () => {
          const val = Exp.cache.addressLine2.value;

          Exp.cache.checkoutJSON.addressLine2 = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.town.addEventListener('blur', () => {
          const val = Exp.cache.town.value;

          Exp.cache.checkoutJSON.town = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.countyState.addEventListener('blur', () => {
          const val = Exp.cache.countyState.value;

          Exp.cache.checkoutJSON.countyState = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.postcode.addEventListener('blur', () => {
          const val = Exp.cache.postcode.value;

          Exp.cache.checkoutJSON.postcode = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.mobileNumber.addEventListener('blur', () => {
          const val = Exp.cache.mobileNumber.value;

          Exp.cache.checkoutJSON.mobileNumber = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.billingAdd.addEventListener('change', () => {
          const val = Exp.cache.billingAdd;

          if (val.checked === true) {
            Exp.cache.checkoutJSON.billingAdd = true;
          } else {
            Exp.cache.checkoutJSON.billingAdd = false;
          }
          Exp.cache.checkoutJSON.billingAdd = val;
          localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        [].forEach.call(Exp.cache.autofillWrap, (el) => {
          el.addEventListener('click', (e) => {
            const ele = e.target;
            setTimeout(() => {
              if (ele.classList.contains('pcaitem')) {
                Exp.cache.checkoutJSON.addressLine1 = Exp.cache.addressLine1.value;
                Exp.cache.checkoutJSON.addressLine2 = Exp.cache.addressLine2.value;
                Exp.cache.checkoutJSON.town = Exp.cache.town.value;
                Exp.cache.checkoutJSON.countyState = Exp.cache.countyState.value;
                Exp.cache.checkoutJSON.postcode = Exp.cache.postcode.value;
                localStorage.setItem('FL013Control_deliveryHome', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
              }
            }, 250);
          });
        });
      },
    },
  };

  Exp.init();
};

const RunDeliveryType = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const standardDel = bodyVar.querySelector('.DeliveryOptionsItem.DeliveryOptionsItem_STD');
      const nextdayDel = bodyVar.querySelector('.DeliveryOptionsItem.DeliveryOptionsItem_NDD');

      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013Control_deliveryType')));
      let checkoutJSON = {
        standardDel: false,
        nextdayDel: false,
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        standardDel,
        checkoutJSON,
        nextdayDel,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.storedJSON) {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously Delivery Type');
        }
      },
      bind() {
        Exp.cache.standardDel.addEventListener('click', () => {
          Exp.cache.checkoutJSON.standardDel = true;
          localStorage.setItem('FL013Control_deliveryType', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.nextdayDel.addEventListener('click', () => {
          Exp.cache.checkoutJSON.nextdayDel = true;
          localStorage.setItem('FL013Control_deliveryType', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });
      },
    },
  };

  Exp.init();
};

const RunVoucher = () => {
  events.analyticsReference = '_gaUAT';
  const Exp = {
    settings: {
      ID: 'FL013',
      VARIATION: 'Control',
    },
    cache: (() => {
      const bodyVar = document.body;
      const cardnumber = bodyVar.querySelector('#CardNumberInput');
      const pincode = bodyVar.querySelector('#SecurityCodeInput');

      const storedJSON = JSON.parse(decodeURIComponent(localStorage.getItem('FL013Control_giftcard')));
      let checkoutJSON = {
        cardnumber: '',
        pincode: '',
      };

      if (storedJSON) {
        checkoutJSON = storedJSON;
      }

      return {
        bodyVar,
        cardnumber,
        checkoutJSON,
        pincode,
        storedJSON,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.loadStorage();
      components.bind();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      loadStorage() {
        if (Exp.cache.storedJSON) {
          events.send('FL013 Control', 'Load', 'Loaded in stored data user entered previously Voucher');
        }
      },
      bind() {
        Exp.cache.cardnumber.addEventListener('blur', () => {
          const val = Exp.cache.cardnumber.value;
          Exp.cache.checkoutJSON.cardnumber = val;
          localStorage.setItem('FL013Control_giftcard', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });

        Exp.cache.pincode.addEventListener('blur', () => {
          const val = Exp.cache.pincode.value;
          Exp.cache.checkoutJSON.pincode = val;
          localStorage.setItem('FL013Control_giftcard', encodeURIComponent(JSON.stringify(Exp.cache.checkoutJSON)));
        });
      },
    },
  };

  Exp.init();
};

export {
  RunCheckoutLaunch,
  RunDeliveryChoices,
  RunDeliveryOptions,
  RunHomeDelivery,
  RunDeliveryType,
  RunVoucher,
};
