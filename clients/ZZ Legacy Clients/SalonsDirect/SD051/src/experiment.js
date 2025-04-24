/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as SD51content from './lib/SD051-html.js';

const SD051 = (() => {
  let $ = null;
  const activate = () => {
    const $body = $('body');
    $body.addClass('SD051');

    // remove the mini cart functionality
    const miniCart = document.querySelector('.header-minicart a');
    miniCart.removeAttribute('data-target-element');
    /*-------------------------
    Add the side bar
    --------------------------*/
    const addSideBar = () => {
      const sideBlock = SD51content.sideWrapper;
      $body.prepend(sideBlock);
      $('.SD051-sideWrapper').addClass('SD051-side_active');
      innersideBar();
    }

    const innersideBar = () => {
      let miniBasket = $('#header-cart');

      //get the items needed from the current mini basket
      const basketProducts = miniBasket.html(),
        basketSubtotal = miniBasket.find('.subtotal');

      //add basket items to the side bar     
      const sideBar = $('.SD051-sideWrapper'),
        $sideBarItems = sideBar.find('.SD051-basketItems');

      $sideBarItems.html(basketProducts);

      //store the items that will be used from the html markup
      const $sideBarFreeDeliv = sideBar.find('.SD051-freedelivery'),
        $checkoutBlock = sideBar.find('.SD051-checkout_wrapper'),
        $reviewBlock = sideBar.find('.SD051-review_wrapper'),
        $dpdBlock = sideBar.find('.SD051-dpd_wrapper');

      //Add the ex vat to the subtotal block
      $sideBarFreeDeliv.html(basketSubtotal);

      //Add the href to the button
      $checkoutBlock.find('.SD051-basketCheckout').append(`<a href="https://www.salonsdirect.com/checkout/cart/">PROCEED TO CHECKOUT</a>`);

      /*-------------------------
      Work out the inc VAT price
      --------------------------*/
      const $currentExVat = $sideBarFreeDeliv.find('.price').text(),
        $getexPrice = $currentExVat.trim().replace('£', '').replace(',', ''),
        $exVat = parseFloat($getexPrice);

      const exVatPrice = () => {
        const incvatAmount = parseFloat($exVat * 20) / 100;
        const incPrice = (incvatAmount + $exVat).toFixed(2);

        $checkoutBlock.find('.SD051-incPrice').prepend(`<div class="SD051-incVatPrice">£<span>${incPrice}</span> inc VAT</div>`);
      }
      exVatPrice();

      //Remove the disapled class on the update button
      $('.SD051-basketItems .item').each(function () {
        const basketItem = $(this);
        basketItem.find('.qty.cart-item-quantity').click(function () {
          basketItem.find('.button.quantity-button').addClass('visible').removeAttr('disabled');
        });
      });

      /*-------------------------
      Add the ex price and free delivery message
      --------------------------*/
      $sideBarFreeDeliv.html(`
                <div class="SD051-freeDeliverytext">You qualify for free delivery*</div>
                <div class="SD051-price">${$currentExVat} ex VAT</div>
            `);

      /*-------------------------
      Show free delivery if over £30
      --------------------------*/
      const showFreeDelivery = () => {
        $('.SD051-freedelivery').addClass('SD051-freedelivery_showing');
      }
      const hideFreeDelivery = () => {
        $('.SD051-freedelivery').removeClass('SD051-freedelivery_showing');
      }

      if ($exVat >= 50) {
        showFreeDelivery();
      } else {
        hideFreeDelivery();
      }


      /*-------------------------
      Add the review contents
      --------------------------*/
      const reviewContent = () => {
        const reviewHTML = SD51content.reviewBlock;
        $reviewBlock.html(reviewHTML);
      }
      reviewContent();

      /*-------------------------
      Add the DPD contents
      --------------------------*/
      const dpdContents = () => {
        const dpdContents = SD51content.DPDContent;
        $dpdBlock.prepend(
          `<h3>AWARD-WINNING DELIVERY</h3>
                    <span>Partnered with DPD</span>
                    <ul class="SD051-dpd_points"></ul>
                `);

        dpdContents.forEach(dpdText => {
          const dpdPoints = $(`<li class="SD051-dpdText">${dpdText}</li>`);
          dpdPoints.appendTo('.SD051-dpd_points');
        });
      }
      dpdContents();

      /*-------------------------
      Get the html from the countdown - add to sideBar
      --------------------------*/
      const countdown = () => {
        const countdownContent = $('.header-countdown').html();
        $('.SD051-deliveryCountdown').html(countdownContent);
      }
      countdown();


      //Events
      $checkoutBlock.find('.SD051-basketCheckout').click(function () {
        utils.events.send('SD051 - Basket & 004', 'Checkout click', 'SD051 checkout button click in side mini basket', {
          sendOnce: true
        });
      });
      $('#containerDiv #continued-shopping-btn').click(function () {
        utils.events.send('SD051 - Basket & 004', 'Checkout click', 'SD051 checkout button click in 04 lightbox', {
          sendOnce: true
        });
      });
      $('#containerDiv li.item').click(function () {
        utils.events.send('SD051 - Basket & 004', 'Checkout click', 'SD051 product clicked in 04 lightbox', {
          sendOnce: true
        });
      });
    }

    // on click of the mini-basket go to cart
    const miniBasket = document.querySelector('.skip-link.skip-cart');
    miniBasket.addEventListener('click',() => {
     window.location.href = 'https://www.salonsdirect.com/checkout/cart/';
    });
    //run the test if add to basket message is visible
    const addToBasketMessage = $('.success-msg');
    if (addToBasketMessage.text().indexOf('was added to your shopping basket.') > 1) {
      document.body.classList.add('SD051-nopopup');
      addSideBar();
      const exit = $('.SD051-times');
      exit.click(function () {
        const sideContainer = $('.SD051-sideWrapper');
        sideContainer.remove();
      });
    }

    const $ajaxPopup = $('#ajax_content');
    const $continueShoppingBtn = $('#continued-shopping-btn');

    UC.observer.connect($ajaxPopup, function () {
      if ($continueShoppingBtn[0].style.display !== 'none') {
        const sideContainer = $('.SD051-sideWrapper');
        if ($('.SD051-sideWrapper').hasClass('SD051-side_active')) {
          if ($('#addtocart-product-ajax-successmessage').text().indexOf('was successfully added to your shopping cart.') > -1 || $('#addtocart-product-ajax-successmessage').text().indexOf('Product Add to Cart') > -1) {
            sideContainer.remove();
            addSideBar();
            $('.ajax_loading').hide();
            if(document.querySelector('#ajax-cart-close-btn')){
              $('#ajax-cart-close-btn').click(function () {
                document.querySelector('.SD051-sideWrapper').remove();
              });
            }
            $('#continued-shopping-btn').click(function () {
              document.querySelector('.SD051-sideWrapper').remove();
            });
            //close basket on overlay click
            $('#bg_fade').click(function () {
              document.querySelector('.SD051-sideWrapper').remove();
            });
            
          }
        }
      }
    }, { config: { childList: true, attributes: false, subtree: true } });


    var $ajaxMsg = $('#ajax-custom-message');
    UC.observer.connect($ajaxMsg, function () {
      const sideContainer = $('.SD051-sideWrapper');
      if (!$ajaxPopup.is(':hidden')) {
        addSideBar();
        $('.ajax_loading').hide();
        if(document.querySelector('#ajax-cart-close-btn')){
          $('#ajax-cart-close-btn').click(function () {
            document.querySelector('.SD051-sideWrapper').remove();
          });
        }
        if(document.querySelector('#bg_fade')){
          $('#bg_fade').click(function () {
            document.querySelector('.SD051-sideWrapper').remove();
          });
        }
        if(document.querySelector('#continued-shopping-btn')){
          $('#continued-shopping-btn').click(function () {
            document.querySelector('.SD051-sideWrapper').remove();
          });
        }
        //close basket on overlay click
    
      }
    }, { config: { childList: false, attributes: true, subtree: true } });

    var $crossell = $('#static-data');
    UC.observer.connect($crossell, function () {
      const sideContainer = $('.SD051-sideWrapper');
      if (!$crossell.is(':hidden')) {
        if(document.querySelector('#ajax-cart-close-btn')){
          $('#ajax-cart-close-btn').click(function () {
            document.querySelector('.SD051-sideWrapper').remove();
          });
          $('#bg_fade').click(function () {
            sideContainer.remove();
          });
          $('#continued-shopping-btn').click(function () {
            sideContainer.remove();
          });
        }
      }
    }, { config: { childList: false, attributes: true, subtree: true } });

    //show the loader on oad to bag click
    const addToBagClick = $('.button.btn-cart');
    addToBagClick.click(function () {
      $('.ajax_loading').show();
    });

  };

  // Audience conditions
  const triggers = ((options) => {
    UC.poller([
      '#containerDiv',
      '#header-cart',
      '#ajax_content',
      () => {
        return !!window.jQuery;
      }
    ], () => {
      $ = window.jQuery;
      utils.fullStory('SD051', 'Variation 1');
      activate();
    });
  })();

})();