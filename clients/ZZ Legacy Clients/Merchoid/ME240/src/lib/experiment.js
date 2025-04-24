/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import BagMessage from './components/bagMessages';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import BasketSteps from './components/loaderBar';
import productChanges from './components/productChanges';
// import deliveryChanges from './components/deliveryChanges';
import PaymentButtons from './components/buttonChanges';

const activate = () => {
  setup();

  // add to bag message
  pollerLite(['.message.message-success.success'], () => {
    const bagMessage = new BagMessage();
  });

  // basket steps
  const basketSteps = new BasketSteps();

  // move the existing product elements around
  productChanges();

  // add the new payment buttons
  const payButtons = new PaymentButtons();


  // change the scarcity message
  const scarcityBox = document.querySelector('.mobile-text-info');
  if(scarcityBox) {
    scarcityBox.querySelector('span').innerHTML = 
    `<strong>Less than 3 available!</strong> 2 people have this in their basket`;
  }

 /* 

  
  deliveryChanges();

 
  // remove the added to bag message so it can be rebuilt by observer
  const removeAddedToCart = () => {
    const addedToBag = document.querySelector('.ME208_addedToCart');
    if (addedToBag) {
      addedToBag.remove();
    }
  };


  // observer if any changes are made in the basket
  observer.connect([document.querySelector('.cart-sidebar')], () => {
    deliveryChanges();
  }, {
    throttle: 2000,
    config: {
      attributes: false,
      childList: true,
      subtree: false,
    },
  });

  // whole form observer for when products are removed
  observer.connect([document.querySelector('.woocommerce form')], () => {
    // timeout due to page changes loading
    setTimeout(() => {
      removeAddedToCart();
      if (!document.querySelector('.ME208_addedToCart')) {
        // const bagMessage = new BagMessage();
      }
      productChanges();
      deliveryChanges();
      // add the new payment buttons
      const payButtons = new PaymentButtons();
      moveGiftBox();

      // add delivery observer back in, make sure it runs again
      observer.connect([document.querySelector('.cart-sidebar')], () => {
        deliveryChanges();
      }, {
        throttle: 2000,
        config: {
          attributes: false,
          childList: true,
          subtree: false,
        },
      });
    }, 1500);
  }, {
    throttle: 2000,
    config: {
      attributes: false,
      childList: true,
      subtree: false,
    },
  });*/
};

export default activate;
