/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

let $ = null;
events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send('FL094', 'FL094 Control', 'Control is active');
    return false;
  } else {
    events.send('FL094', 'FL094 Variation 1', 'Variation is active');
  }

  $ = window.$ || window.jQuery;

  const $anchor = $('a[id*="_aWishListToLogin"]');
  const $anchorAttrs = $anchor.attr('id');
  const sizeLink = document.querySelector('a#LearnMore');
  sizeLink.insertAdjacentHTML('afterend', `
    <a href="#" id="ShippingInfo" class="sizeslink" rel="nofollow help">
      <span id="dnn_ctr176031_ViewTemplate_ctl00_ctl14_spnSizeGuideText" class="SizeGuideText">Delivery Info</span>
    </a>
  `);


  const shippingLink = document.querySelector('#ShippingInfo');
  const mobileScrollEl = document.querySelector('.mobileInfoRow');
  const desktopScrollEl = document.querySelector('.innerInfoRow');
  if (shippingLink) {
    shippingLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      events.send('FL094', 'FL094 Click', 'Clicked Shopping Link');
      
      if (mobileScrollEl && window.innerWidth < 479) {
        mobileScrollEl.scrollIntoView({
          behavior: 'smooth',
          block: "end", inline: "nearest"
        });
        
      } 
      if (desktopScrollEl) {
        desktopScrollEl.scrollIntoView({
          behavior: 'smooth',
          block: "end", inline: "nearest"
        });
        
      }
    }); 
  }

  // Add anchor ID
  $anchor.attr('id', `${$anchorAttrs} ab-anchor`);

  $('#productVariantAndPrice').on('mousedown', function() {
    if (!document.querySelector('.mobileInfoRow .pd-accordion.open')) {
      $('#productDetails > div.col-xs-12.no-padding-all.productVariantContainer > div:nth-child(6) > div > div.acc-title > h3').trigger('click');
    }
  });
  
  // // Desktop Scroll to element
  // setTimeout(function() {
  //     $('#shippingLink').on('mousedown', function() {
  //         if ($(window).width() > 1024) {
  //             $('html, body').animate({
  //                 scrollTop: $('.innerInfoRow').offset().top - 100
  //             }, 800);
  //         }
  //     });
  // }, 2000);

};
