import shared from '../shared';
import { angularCompile, getTemplate, replaceTemplate } from '../../../../../../lib/utils/avon';
import { translate } from '../services';
import { pollerLite } from '../../../../../../lib/utils';

export default () => {
  const { ID, $, rootScope } = shared;
  const $productsSectionHeading = $('#section_items');
  const $productsSection = $productsSectionHeading.next();
  const checkoutScope = $productsSection.scope();

  /** Edit title to include number of products */
  const editTitle = () => {
    const $title = $productsSectionHeading.children('.title');
    const $basketCount = $(`<span>${translate('Basket')} <span class="${ID}_titleCount">(<span ng-bind="BasketItems.TotalCount"></span> ${translate('items')})</span></span>`);
    $title.html($basketCount);
    angularCompile($basketCount, $, checkoutScope);
  };

  /** Add edit basket link to subtotal */
  const addEditBasketLink = () => {
    const $subtotal = $productsSection.find('.section-subtotal');
    const $subtotalWrap = $(`<div class="${ID}_subtotal"></div>`);
    // const $editBasket = $(`<div class="${ID}_editBag cursor-pointer" ng-click="EditItemsClicked()"><a href="/cart/">Edit Shopping Bag</a></div>`);
    const $editBasket = $(`<a class="${ID}_editBag cursor-pointer" href="/cart/">${translate('Edit Shopping Bag')}</a>`);
    $subtotal.wrap($subtotalWrap);
    $subtotal.before($editBasket);
    angularCompile($editBasket, $, checkoutScope);
  };

  /** Add active class to heading when open */
  const addActiveState = () => {
    // $productsSectionHeading.addClass(`ng-class: {showItems: ${ID}_section--open};`);
    // angularCompile($productsSectionHeading, $, checkoutScope);
    const toggleState = () => {
      const isShown = checkoutScope.showItems;
      if (isShown) {
        $productsSectionHeading.addClass(`${ID}_sectionActive`);
      } else {
        $productsSectionHeading.removeClass(`${ID}_sectionActive`);
      }
    };

    $productsSectionHeading.click(() => {
      setTimeout(toggleState, 0);
    });

    toggleState();
  };

  /** Add headings to each section */
  const addSectionHeadings = () => {
    const $addressSection = $('.section-delivery');
    const $deliverySection = $('mvp-delivery-selection');
    const $pickupSection = $('.delivery-tab.delivery-pickup');
    const $paymentSection = $('mvp-payment-selection').parent();
    const $addressHeading = $(`<div class="${ID}_sectionHeading ${ID}_sectionHeadingVisible" ng-if="Layout.IsDesktop">1. ${translate('Select an option')}</div>`);
    const $addressHeadingMobile = $(`<div class="${ID}_sectionHeading ${ID}_sectionHeadingVisible" ng-if="!Layout.IsDesktop">1. ${translate('Enter your address')}</div>`);
    const $deliveryHeading = $(`<div class="${ID}_sectionHeading" ng-class="{${ID}_sectionHeadingVisible: ((deliveryMethod == 'Home' && !(VM.ShowAddressForm || VM.SavingDetails) || deliveryMethod == 'PickupPoint' && VM.ConfirmedPickupPoint) || (deliveryMethod == 'PickupPoint' && !VM.ShowAddressForm))}">2. ${translate('Choose delivery method')}</div>`);
    const $paymentHeading = $(`<div class="${ID}_sectionHeading" ng-class="{${ID}_sectionHeadingVisible: (ShowPaymentOptions && showPayment && VM.SelectedShippingOption != null && ((deliveryMethod == 'PickupPoint' && VM.ConfirmedPickupPoint) || deliveryMethod != 'PickupPoint'))}">3. ${translate('Choose payment method')}</div>`);

    $addressSection.before($addressHeading);
    $addressSection.before($addressHeadingMobile);
    if ($pickupSection.length) {
      $pickupSection.before($deliveryHeading);
    } else {
      $deliverySection.before($deliveryHeading);
    }
    $paymentSection.before($paymentHeading);

    angularCompile($addressHeading, $, checkoutScope);
    angularCompile($addressHeadingMobile, $, checkoutScope);
    angularCompile($deliveryHeading, $, checkoutScope);
    angularCompile($paymentHeading, $, checkoutScope);
  };

  /** Add a dash to delivery price if no option is selected */
  const addUnselectedDeliveryPrice = () => {
    const $deliveryPrice = $('[ng-show="VM.SelectedShippingOption!=null && CartSummary.ShippingPrice"]');
    const $unselectedPrice = $('<span ng-show="VM.SelectedShippingOption===null" style="position:relative;top: 3px;">—</span>');
    $deliveryPrice.after($unselectedPrice);
    angularCompile($unselectedPrice, $, checkoutScope);
  };

  /** Fix typos */
  const fixTypos = () => {
    // Customer savings
    $('.customersavings').each((i, element) => {
      const textNode = $(element).children('span:first')[0].childNodes[0];
      textNode.textContent = textNode.textContent.replace('You\'ve', 'you\'ve');
    });
  };

  /**
   * Fixes a bug that allows user to checkout when using Pick-up
   * without selecting a pick-up point
   */
  const fixPickupCheckout = () => {
    /**
     * Only show next options if this statement is true:
     * deliveryMethod === ('PickupPoint' && ConfirmedPickupPoint) || deliveryMethod !== 'PickupPoint'
     */
    const condition = '((deliveryMethod === "PickupPoint" && VM.ConfirmedPickupPoint) || deliveryMethod !== "PickupPoint")';
    const $paymentOptionsContainer = $('mvp-payment-selection');
    const paymentOptionsContainerNgShow = $paymentOptionsContainer.attr('ng-show');
    $paymentOptionsContainer.attr('ng-show', `${paymentOptionsContainerNgShow ? `${paymentOptionsContainerNgShow} && ` : ''}${condition}`);
    angularCompile($paymentOptionsContainer, $, checkoutScope);
  };

  /** Change AngularJS templates */
  const modifyTemplates = () => {
    const modifyProductsTemplate = () => {
      const template = getTemplate('basketItems.html');
      const $template = $('<div>').html(template);
      const $options = $template.find('.item');
      $options.each((i, element) => {
        const $option = $(element);

        // Hide variant div unless there's a variant
        const $variant = $option.find('.item-variant');
        $variant.attr('ng-if', 'item.Variant !== null');

        const $price = $option.find('.item-price');
        $price.html(`<span class="bold">{{ item.Price == 0 ? "${translate('FREE')}" : (item.Price | currency : Locale.NUMBER_FORMATS.CURRENCY_SYM : 2) }}</span>`);
      });

      replaceTemplate('basketItems.html', $template.html(), () => {
        // Re-compile directive
        const $section = $('mvp-basket-items');
        $section.empty();
        angularCompile($section, $, $section.scope());
      });
    };

    const modifyDeliveryTemplate = () => {
      const template = getTemplate('deliverySelection.html');
      const $template = $('<div>').html(template);
      const $options = $template.find('[ng-repeat="shippingOption in shippingOptions"]');

      $options.each((i, element) => {
        const $option = $(element);

        // Remove individual select functions
        const $selectFunctions = $option.find('[ng-click="shippingOptionClicked(shippingOption)"]');
        $selectFunctions.each((j, selectElement) => {
          $(selectElement).removeAttr('ng-click');
        });

        // Wrap inner content in container
        const $innerWrap = $(`<div class="${ID}_optionInner" ng-click="shippingOptionClicked(shippingOption)" ng-class="{${ID}_optionActive: (selectedShippingOption!=null && shippingOption.ShippingOptionId == selectedShippingOption.ShippingOptionId)}"></div>`);
        $option.children().wrapAll($innerWrap);

        // Wrap in container
        const $wrap = $(`<div class="${ID}_deliveryOptions"></div>`);
        const ngIf = $option.attr('ng-if');
        if (ngIf) $wrap.attr('ng-if', ngIf);
        $option.wrap($wrap);

        // Add class to rep delivery help
        const $repDeliveryHelp = $option.find('[ng-click="openRepDeliveryHelp()"]');
        if ($repDeliveryHelp.length) {
          $repDeliveryHelp.closest('.shippingdetails').addClass(`${ID}_repDeliveryHelp`);
        }

        // Move rep delivery instructions
        const $repDeliveryInstructions = $option.find('.RepresentativeDelieryInstructions');
        if ($repDeliveryInstructions.length) {
          $option.append($repDeliveryInstructions);
        }

        // Wrap delivery timeframe in container
        const $title = $option.find('.title');
        $title.html(`{{shippingOption.FormattedDescription.toLowerCase()}}: <span class="${ID}_deliveryTimeframe">{{shippingOption.FormattedTimeFrame}}</span>`);
      });

      // Translate rep dialog
      const $repDialog = $template.find('.findarepdialog');
      if ($repDialog.length) {
        // Title
        const $titles = $repDialog.find('.findarepdialog-header > .button-title');
        $titles.each((i, element) => {
          const $title = $(element);
          $title.text(
            $title
              .text()
              .replace('Find a representative', translate('Find a representative'))
              .replace('Change your representative', translate('Change your representative'))
              .replace("Sorry! we can't find a rep with that email address", translate("Sorry! we can't find a rep with that email address"))
              .replace("Sorry! we can't find a rep with that name", translate("Sorry! we can't find a rep with that name"))
              .replace("Sorry! we can't find a rep with that phone number", translate("Sorry! we can't find a rep with that phone number"))
              .replace("Sorry! we can't find any rep in that area", translate("Sorry! we can't find any rep in that area"))
              .replace('Representative change failed', translate('Representative change failed')),
          );
        });

        // Dropdown
        const $selectOptions = $repDialog.find('select[ng-model="ViewModel.FindMode"] option');
        $selectOptions.each((i, element) => {
          const $selectOption = $(element);
          $selectOption.text(
            $selectOption
              .text()
              .replace('Choose your search method', translate('Choose your search method'))
              .replace('Search by email address', translate('Search by email address'))
              .replace('Search by phone number', translate('Search by phone number'))
              .replace('Search by full name', translate('Search by full name'))
              .replace('Search using your postcode', translate('Search using your postcode')),
          );
        });

        // CTA
        const $button = $repDialog.find('.find-a-rep-button span');
        $button.text(
          $button.text().replace('Find', translate('Find')),
        );

        // New search
        const $search = $repDialog.find('.tryNewSearch [ng-click="ResetSearch()"] span');
        $search.text(
          $search.text().replace('Try a new search', translate('Try a new search')),
        );

        // Close
        const $close = $repDialog.find('.closeErrorPage [ng-click="closeFindARep()"] span');
        $close.text(
          $close.text().replace('Find a rep for me', translate('Find a rep for me')),
        );

        // Don't worry
        const $worry = $repDialog.find('.dontWorryText span');
        $worry.text(
          $worry.text().replace("Don't worry, let us find a rep for you", translate("Don't worry, let us find a rep for you")),
        );

        // Read more
        const $readMore = $repDialog.find('.readMore[ng-click="ToggleRepresentativeInformation(representative)"][ng-if="!representative.ShowInformation"]');
        $readMore.text(
          $readMore.text().replace('Read more', translate('Read more')),
        );

        // Read more
        const $readLess = $repDialog.find('.readMore[ng-click="ToggleRepresentativeInformation(representative)"][ng-if="representative.ShowInformation"]');
        $readLess.text(
          $readLess.text().replace('Read less', translate('Read less')),
        );
      }

      replaceTemplate('deliverySelection.html', $template.html(), () => {
        // Re-compile directive
        const $section = $('mvp-delivery-selection');
        $section.empty();
        angularCompile($section, $, $section.scope());
      });
    };

    const modifyPickupTemplate = () => {
      const template = getTemplate('pickupDelivery.html');
      const $template = $('<div>').html(template);

      // Bug fix - show map when change pick-up point is clicked
      const $changePoint = $template.find('#ConfirmedPickupPoint [ng-click="SearchCustomAddress()"]');
      $changePoint.attr('ng-click', 'SearchCustomAddress(); HideMap=false');

      replaceTemplate('pickupDelivery.html', $template.html(), () => {
        // Re-compile directive
        const $section = $('mvp-pickup-delivery');
        $section.empty();
        angularCompile($section, $, $section.scope());
      });
    };

    const modifyPaymentTemplate = () => {
      const template = getTemplate('paymentSelection.html');
      const $template = $('<div>').html(template);
      const $options = $template.find('.paymentoptions > div');
      $options.each((i, element) => {
        const $option = $(element);
        const optionName = $option.find('input[name="paymentOption"]').val();

        // Remove individual select functions
        const selectFunctionName = $option.find('.checkbox').attr('ng-click');
        const $selectFunctions = $option.find(`[ng-click="${selectFunctionName}"]`);
        $selectFunctions.each((j, selectElement) => {
          $(selectElement).removeAttr('ng-click');
        });

        // Wrap inner content in container
        const $innerWrap = $(`<div class="${ID}_optionInner" ng-click="${selectFunctionName}" ng-class="{${ID}_optionActive: (selectedPaymentOption == '${optionName}')}"></div>`);
        $option.children().wrapAll($innerWrap);

        // Remove descriptive text if card
        if (optionName === 'Card') {
          $option.find('.paymentdetails p:last').remove();
        }
      });

      replaceTemplate('paymentSelection.html', $template.html(), () => {
        // Re-compile directive
        const $section = $('mvp-payment-selection');
        $section.empty();
        angularCompile($section, $, $section.scope());
      });
    };

    const modifyFormTemplate = () => {
      const template = getTemplate('homeDelivery.html');
      const $template = $('<div>').html(template);

      // Change validation message for postcode
      const $errorEl = $template.find('.message[ng-show="HomeDeliveryAddressForm.homedelivery_ZipCode.$error.pattern"] span span');
      $errorEl.text(
        $errorEl
          .text()
          .replace('Please provide a valid postcode.', 'Please provide a valid postcode (with a space between the first and second parts).')
          .replace('Zadejte prosím platné PSČ.', 'Prosím zadejte platné PSČ (bez mezer)'),
      );

      // Change postcode regex to allow no spaces
      // const $postcodeInput = $template.find('#postal_code');
      // const regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/i.toString();
      // $postcodeInput.attr('ng-pattern', regex);

      // Add selected address heading
      const $confirmedAddress = $template.find('[ng-show="!isAddressFormVisible()"] > .addressConfirmed:first');
      $confirmedAddress.before(`<div class="${ID}_confirmedAddressHeading">${translate('Selected address')}:</div>`);

      replaceTemplate('homeDelivery.html', $template.html(), () => {
        // Re-compile directive
        const $section = $('mvp-home-delivery');
        // const formScope = $section.find('#HomeDeliveryAddressForm').scope();
        $section.empty();
        angularCompile($section, $, $section.scope());
      });
    };

    modifyProductsTemplate();
    modifyDeliveryTemplate();
    modifyPickupTemplate();
    modifyPaymentTemplate();
    modifyFormTemplate();
  };

  /**
   * Binds click handlers to allow users to click anywhere within the delivery
   * or payment option elements to select it
   */
  const optionsUsabilityImprovements = () => {
    /**
     * If the user clicked an element without the ngClick function to select the
     * option, force a click to select it
     * @param {Object} event
     */
    const delegationHandler = (event) => {
      const $option = $(event.target).closest('.ng-scope');
      const $checkbox = $option.find('.checkbox:first');
      const ngClickFunction = $checkbox.attr('ng-click');
      const targetNgClickFunction = $(event.target).attr('ng-click');
      const optionWasSelected = targetNgClickFunction
        && targetNgClickFunction === ngClickFunction;

      if (!optionWasSelected) {
        // Force click checkbox if the user clicked outside of it
        $checkbox.click();
      }
    };

    $('mvp-delivery-selection').click('[ng-repeat="shippingOption in shippingOptions"]', delegationHandler);
    $('mvp-payment-selection').click('.paymentoptions > div', delegationHandler);
  };

  /**
   * Adds a dummy checkout CTA for visual purposes
   * This is hidden when Angular exposes the real CTA
   */
  const insertDummyCta = () => {
    const $real = $('[ng-show="!VM.ShowAddressForm && VM.SelectedShippingOption && VM.SelectedPaymentOption"]');
    const $dummy = $(`<div class="${ID}_dummyCta" ng-if="!(VM.SelectedPaymentOption && !VM.ShowAddressForm)">${translate('Go to payment')}</div>`);
    $real.before($dummy);
    angularCompile($dummy, $, $real.scope());
  };

  /** Close basket products by default */
  const closeBasketProducts = () => {
    checkoutScope.showItems = false;
    checkoutScope.$apply();
  };

  /**
   * Translate instances of English text present on
   * control to local language
   */
  const localTranslations = () => {
    pollerLite(['.tabs.delivery-selector > div'], () => {
      const $deliveryTabs = $('.tabs.delivery-selector > div');
      $deliveryTabs.each((index, element) => {
        const $deliveryTab = $(element);

        switch ($deliveryTab.text().toLowerCase()) {
          case 'home delivery':
            $deliveryTab.text(translate('Home delivery'));
            break;

          case 'pick-up':
            $deliveryTab.text(translate('Pick-up'));
            break;

          default:
            break;
        }
      });
    });
  };

  const generalUsabilityImprovements = () => {
    /**
     * Click the first payment option
     * if only one is available
     */
    const clickFirstPaymentOption = () => {
      $(document)
        .injector()
        .invoke(['$timeout', function invoke($timeout) {
          /*
            $timeout must be used to avoid an error that occurs when $apply or
            $digest is called whilst that service is currently running

            Read more:
            https://code.angularjs.org/1.4.2/docs/error/$rootScope/inprog?p0=$apply
          */
          $timeout(() => {
            const $paymentOptions = $('.paymentoptions > div');
            if ($paymentOptions.length === 1) {
              $paymentOptions.eq(0).find(`.${ID}_optionInner`).click();
            }
          }, 300);
        }]);
    };

    /*
     * Watch for changes to delivery type
     * If type is standard delivery check the first payment option by default
     */
    rootScope.$on('DeliveryGbService_SetDeliveryTypeSuccess', (event, selectionData) => {
      if (selectionData.SelectedShippingOptionCode === 'shipping_method_1') {
        clickFirstPaymentOption();
      }
    });
  };

  editTitle();
  addEditBasketLink();
  addActiveState();
  addSectionHeadings();
  // optionsUsabilityImprovements();
  addUnselectedDeliveryPrice();
  fixTypos();
  fixPickupCheckout();
  modifyTemplates();
  insertDummyCta();
  closeBasketProducts();
  localTranslations();
  generalUsabilityImprovements();
};
