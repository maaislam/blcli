/**
 * Is the user logged in?
 *
 * @return {Boolean}
 */
export let userIsLoggedIn = () => {
  const registerLink = document.querySelector('.links__item-my-account');

  return !!registerLink;
};

/**
 * Show a faux loader
 */
export let showLoader = () => {
  const existingLoader = document.querySelector('.itx9-custom-loader');
  if(existingLoader) {
    existingLoader.remove();
  }

  document.body.insertAdjacentHTML('afterbegin', `
      <div class="itx9-custom-loader">
        <div class="itx9-custom-loader__inner itx9-custom-loader__inner--animate"></div>
      </div>
  `);

  setTimeout(() => {
    const loader = document.querySelector('.itx9-custom-loader');
    if(loader) {
      loader.remove();
    }
  }, 2400);
};

export let worldpay = () => {
  var cseData;

    function getFormValue(element) {
        var value = 'not found';

        if(element) {
          jQuery(element).each(function(idx, elm) {
            if (elm && elm && !elm.disabled) {
                value = elm.value;
            }
          });
        }

        return value;
    }

    function setEncryptedData(encryptedData) {
      const ed = document.querySelectorAll('#encryptedData');

      if(ed) {
        [].forEach.call(ed, function(element, idx) {
          if (element && element && !element.disabled) {
              element.value = encryptedData;
          }
        });
      }
    }

    function isCreditCardFormUsed() {
        var used = false;

        var cardNumbers = document.querySelectorAll('.card_number');
        if(cardNumbers) {
          [].forEach.call(cardNumbers, (element) => {
            if (!element.disabled && element.value) {
                used = true;
            }
          });
        }

        return used;
    }

    function gatherAndEncryptData() {

        if (!isCreditCardFormUsed()) {
            return;
        }

        cseData = {
            cvc: getFormValue('.cvc'),
            cardHolderName: getFormValue('.cardholder_name'),
            cardNumber: getFormValue('.card_number'),
            expiryMonth: getFormValue('.month'),
            expiryYear: getFormValue('.year')
        };

        var encryptedData = Worldpay.encrypt(cseData);
        setEncryptedData(encryptedData);
    }

    /*function addFrontendListener() {
        var frontendElement = document.querySelector('#review-buttons-container .btn-checkout');

        if (frontendElement === undefined) {
            frontendElement = document.querySelector('#onestepcheckout-place-order');
        }

        if (frontendElement != undefined) {
            frontendElement.addEventListener('click', gatherAndEncryptData);
        }
    }

    addFrontendListener();*/

    gatherAndEncryptData();

    Worldpay.setPublicKey(WorldPayConfig.csePublicKey)
};
