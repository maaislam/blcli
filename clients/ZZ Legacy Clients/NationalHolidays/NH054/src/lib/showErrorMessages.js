import { pollerLite, observer } from '../../../../../lib/uc-lib';

export default (page) => {
  if (page !== 'passengers' && page !== 'payment') {
    const paymentMessageError = document.querySelector('.NH054-alert');
    if (paymentMessageError) {
      paymentMessageError.classList.add('show');
    }
    pollerLite(['div.alert'], () => {
      document.querySelector('div.alert').scrollIntoView({behavior: "smooth"});
      const errorMessages = document.querySelectorAll('.NH054-errorMessage__wrapper');
      [].forEach.call(errorMessages, (message) => {
        message.classList.add('show');
      });
    });
  } else if (page !== 'payment')  {
    pollerLite(['div.alert'], () => {
      document.querySelector('div.alert').scrollIntoView({behavior: "smooth"});

      const errorMessages = document.querySelectorAll('.NH054-errorMessage__wrapper');
      [].forEach.call(errorMessages, (message) => {
        if (message.classList.contains('NH054-passengerPickup')) {
          const selectField = message.parentNode.querySelector('select');
          if (selectField) {
            const pickupOptions = selectField.options;
            const indexSelected = pickupOptions.selectedIndex;
            if (indexSelected === 0) {
              message.classList.add('show');

              setTimeout(() => {
                message.classList.remove('show');
              }, 8000);
            }
          }
        } else {
          message.classList.add('show');
          setTimeout(() => {
            message.classList.remove('show');
          }, 8000);
        } 
      });
    });
  }
  
  if (page !== 'payment') {
    if (document.querySelector('.NH054-alert')) {
      document.querySelector('.NH054-alert').classList.add('show');
    }
  } else if (page === 'payment') {
    observer.connect([document.querySelector('span#ReqCardNumber')], () => {
      document.querySelector('div.alert').scrollIntoView({behavior: "smooth"});
      const errorMessage = document.querySelector('.NH054-errorMessage__wrapper');
      if (errorMessage) {
        errorMessage.classList.add('show');
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  }
};