/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

const runExperiment = () => {
  var Scope = window.AppModule.RootScope;
  var origBroadcast = Scope.$broadcast;
  var origEmit = Scope.$emit; 

  const calculateBasket = () => {
    
    var sessionObject = {
      'glam-treat' : 0,
      'health-routine' : 0,
      'daily-makeup': 0,
      'products' : [],
      'date' : '',
      // 'purchased': false,
    };

    var purchasedProducts = [];

    pollerLite([
      '.Cart-Product'
    ], () => {
      var products = document.querySelectorAll('.Cart-Product');
      if (products) {
        [].forEach.call(products, (product) => {
          var productScope = $(product).scope().product;
          // Handle Sku differences
          var sku = '';
          if (productScope.LoneVariant) {
            sku = productScope.LoneVariant.Sku;
          } else if (productScope.Variants[0].Sku) {
            sku = productScope.Variants[0].Sku;
          } else {
            sku = 'not-found';
          }
          // Handle Personas
          var mainCategory = '';
          var secondaryCategory = '';
          if (productScope.Categories[1].Dept) {
            mainCategory = productScope.Categories[1].Dept.Slug;
          } else {
            mainCategory = 'not-found';
          }
          if (productScope.Categories[0].PDept) {
            secondaryCategory = productScope.Categories[0].PDept.Slug;
          }
          if (mainCategory === 'lip-oil' || 'lip-gloss' || 'liquid-lipstick' || 'lip-liner'|| 'powder' || 'full-coverage' || 'light-coverage' || 'blusher' || 'bronzer' || 'all-womenswear' || 'purse-sprays-samples' || 'all-perfume') {
            sessionObject['daily-makeup'] = sessionObject['daily-makeup'] + 1;
          }
          if (mainCategory === 'nail-care' || 'body-mists' || 'lip-gloss' || 'perfume-sets' || 'mens-pjs' || 'womens-pjs' || 'boxed-gift-sets' || 'eyeshadow-palettes') {
            sessionObject['glam-treat'] = sessionObject['glam-treat'] + 1;
          }
          if (mainCategory === 'hand-creams' || 'peach-velvet-collection' || 'styling' || 'mens-hair-body-wash' || 'shower-bath-oils') {
            sessionObject['health-routine'] = sessionObject['health-routine'] + 1;
          } else if (secondaryCategory === 'lips' || 'hand-cream' || 'shower' || 'hair-removal' || 'haircare' || 'body-moisturiser' || 'nails' || 'body-sprays-mist' || 'deodarants' || 'cleansers' || 'home-accessories' || 'bubble-bath' || 'skincare-sets' || 'planet-spa' || 'eye-creams' || 'anti-ageing' || 'watches') {
            sessionObject['health-routine'] = sessionObject['health-routine'] + 1;
          }
          var thisProduct = {
            'name': productScope.Name,
            'sku': sku,
            'price': productScope.Price,
            'category': productScope.Category,
            'sub-category': productScope.Categories[0].Level2.Name,
          }
          purchasedProducts.push(thisProduct);
        })
        sessionObject['products'].push(purchasedProducts);
        var timestamp = Date.now();
        var date = new Date(Date.now());
        sessionObject['date'] = date;
        localStorage.setItem('AV054-' + timestamp, JSON.stringify(sessionObject));
        console.log(JSON.stringify(sessionObject));
      }
    })
  }

  var CartButtons = document.querySelectorAll('.Cart-Buttons');
  if (CartButtons) {
    [].forEach.call(CartButtons, (cartbtn) => {
      var updateCartBtn = cartbtn.querySelector('.vi-btn--secondary');
      if (updateCartBtn) {
        updateCartBtn.addEventListener('click', () => {
          calculateBasket();
        })
      }
    })
  }



  pollerLite([
    '#CartPage'
  ], () => {
    calculateBasket();
  })
}

export default () => {
  setup();
  const { rootScope, ID } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    runExperiment();
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
