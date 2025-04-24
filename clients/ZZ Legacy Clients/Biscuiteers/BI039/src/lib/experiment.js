/**
 * IDXXX - Description
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { addPoller } from './winstack';
import CustomiseBoxes from './components/personalisedBox/personalisedBoxes';
import DeliverySlide from './components/deliverySlide/deliverySlide';
import ProductPageLayout from './components/productPage/productPage';
import slideHelper from './slideHelper';
import BuySlide from './components/buySlide/buySlide';
import buttonLoader from './buttonLoader';

const activate = () => {
  setup();

  // Experiment code
  //
  // Use Experiment.addPoller and Experiment.addEventListener rather than calling
  // those methods generally. This allows us to hold references to pollers and event
  // listeners which we can destroy in future
  //
  // Below is sample code demonstrating the use of the helper functions for
  // dealing with page events and mutations
  //
  // Remove it, but do use this approaches to binding events, pollers, mutation observers, etc..
  // addPoller([
    // () => !!window.BI039,
 // ], () => {
  // add the customise options if they exist
    /*addObserver([document.querySelector('.wrap')], () => {
      const personalised = new CustomiseBoxes();
    }, {
      childList: true,
      attributes: false,
    });
  }, {
    multiplier: 1,
  });*/

  /*addEventListener(document, 'click', () => {
    console.log('clicked document');
  }); */

  //}, {
    //multiplier: 1,
  //});



  addPoller(['.wrap .pos-relative.m-b .select option'], () => {
    const personalised = new CustomiseBoxes();
  });

 const delivery = new DeliverySlide({
    points: [
      {
        text: 'Royal Mail tracked - £3.99',
      },
      {
        text: 'Premium courier - £6.95',
      },
      {
        text: 'Same day delivery (London only) - £15-£25.00',
      },
    ],
  });

  const buySlider = new BuySlide();

  addPoller(['local-add-to-basket'], () => {
    const pageLayout = new ProductPageLayout();
    slideHelper();
  });
  addPoller(['.BI039-button'], () => {
    buttonLoader();
  });
};

export default activate;
