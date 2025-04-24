/**
 * WW007 - Mobile Minibasket
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const { ID } = settings;
  const $ = window.jQuery;
  const $form = $('#product_add_form');
  const $productGrid = $('#product_grid');
  const $productGridInputs = $productGrid.find('input');
  const $productSelect = $('#product_select');
  const $colourSelect = $('#colour_select');
  const $sizeSelect = $('#size_select');
  const $qtySelect = $('#qty_select');

  // ---------------------------------------------------------
  // Update product grid on change of product select
  // The minibasket relies on the product grid being accurate
  // ---------------------------------------------------------
  const productGrid = {
    /** Return a selected option */
    getSelectedOption: {
      colour: () => $colourSelect.find('option:selected').text().trim(),
      size: () => $sizeSelect.find('option:selected').text().trim(),
      qty: () => $qtySelect.val(),
    },

    /** Clear all current values */
    clearValues: function clearValues() {
      $productGridInputs.each((i, el) => {
        const val = el.value;
        if (val > 0) el.value = 0;
      });
    },

    /**
     * Get the input from the product grid using
     * the product selections in the dropdowns
     * @param {string} colour
     * @param {string} size
     */
    getMatchingInput: function getMatchingInput(colour, size) {
      const $matches = $productGridInputs.filter((i, el) => {
        const $el = $(el);
        return $el.data('colour') === colour && $el.data('size') === size;
      });
      return $matches;
    },

    /** Update product grid values */
    update: function update() {
      this.clearValues();

      const colour = this.getSelectedOption.colour();
      const size = this.getSelectedOption.size();
      const qty = this.getSelectedOption.qty();

      const $input = this.getMatchingInput(colour, size);
      if ($input.length) $input[0].value = qty;
    },
  };
  $productSelect.find('select, input').on('change', () => {
    productGrid.update.call(productGrid);
  });


  // ---------------------------------------------------------
  // Form submit logic
  // ---------------------------------------------------------
  // Change ID of form in case default script hasn't ran yet
  // This will prevent the default submit event from being attached to the form
  $form.attr('id', `${ID}_product_add_form`);

  // Remove default functionality
  $form.off('submit');
  $form.removeAttr('action');

  // Add background overlay and loader to DOM
  $('#site_header').prepend(`
    <div id="${ID}_overlay"></div>
    <div class="${ID}_loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `);

  /**
   * Form submit handler
   * Ths is a modified version of default form submit functionality
   * Changes made to prevent mobile basket redirecting to /basket on
   * submit and to show the minibasket instead
   */
  let instance = 0;
  const submitHandler = () => {
    if (window.viewmode == "mobile") {
      $('#form_style').val("select_mobile");
    }
    // SERIALIZE THE DATA
    window.form_data = $form.serialize();

    window.jsonProducts = [];
    window.fbProducts = [];

    // SHOW LOADER
    const thisInstance = instance + 1;
    $(`.${ID}_loading-dots`).fadeIn('fast');
    $(`#${ID}_overlay`).fadeIn('fast');

    $(".qty_grid").each(function () {
      if ($(this).val() > 0) {
        window.theColour = $(this).data("colour");
        window.theSize = $(this).data("size");
        window.theSKU = $(this).data("sku");

        window.jsonProducts.push({
          'name': productName,
          'id': mainSKU,
          'price': productPrice,
          'brand': brandName,
          'category': categoryName,
          'variant': theColour,
          'size': theSize,
          'quantity': $(this).val()
        });

        window.fbProducts.push({
          'id': theSKU,
          'quantity': $(this).val(),
          'item_price': productPrice
        });
      }
    });

    console.log(window.jsonProducts);
    console.log(window.fbProducts);

    window.dataLayer.push({
      'event': 'addToCart',
      'eventCategory': 'Ecommerce',
      'eventAction': 'Add to Basket',
      'eventLabel': mainSKU,
      'eventValue': productPrice,
      'ecommerce': {
        'currencyCode': currencyCode,
        'add': {
          'products': jsonProducts
        }
      }
    });

    window.fbq('track', 'AddToCart', {
      'content_type': 'product',
      'contents': fbProducts
    });

    window.mixpanel.track("Add To Basket");

    // POST IT TO ADDPROD
    $.post("/scripts/add-to-basket.php", window.form_data, function (responseHTML) {
      if (responseHTML.substr(0, 2) == "NO") {
        alert("We currently have no arrangements in place to deliver to your location.\n\nPlease contact Customer Service");
        $(`.${ID}_loading-dots`).fadeOut();
        $(`#${ID}_overlay`).fadeOut();
      } else if (responseHTML.substr(0, 2) == "OK") {
        window.responseData = responseHTML.split("|");
        $(`.${ID}_loading-dots`).fadeOut();

        // SHOULD BE SOME HTML TO POPULATE THE POPUP WITH
        $("#mini_cart_popup").html(window.responseData[1]);
        // SHOW IT
        $('#mini_cart').fadeIn('fast');
        events.send(ID, 'Click', 'View Basket');

        $('#mini_cart .numitems').html("<strong>" + window.responseData[2] + "</strong> item");
        if ((window.responseData[2] + 0) != 1) {
          $('#mini_cart .numitems').append("s");
        }

        $('#mini_cart .subtotal').html(window.responseData[3]);

        setTimeout(function () {
          if (instance === thisInstance) {
            $(`#${ID}_overlay`).fadeOut();
            $('#mini_cart').fadeOut();
            $(`.${ID}_loading-dots`).fadeOut();
          }
          instance = thisInstance;
        }, 10000);

        $('#mini_cart_popup span').add('#WW007_overlay').on("click", function () {
          $(`#${ID}_overlay`).fadeOut();
          $('#mini_cart').fadeOut();
          $(`.${ID}_loading-dots`).fadeOut();
          events.send(ID, 'Click', 'Close mini basket');
        });

        // ADD THE CLASS TO THE CHECKOUT BUTTON ON THE MINICART
        window.miniCartCheckoutButton = $("#mini_cart > a > span");
        if (!window.miniCartCheckoutButton.hasClass("has-items")) {
          window.miniCartCheckoutButton.addClass("has-items");
        }

        // RESET THE SIMPLE FORM
        $(`#${ID}_product_add_form`).trigger("reset");
        validateAddForm("select");

        // RESET THE FORMS
        $(".qty_grid, #qty_select").val("0").removeClass("highlight");
      } else {
        // PROBLEM?
        alert("Possible add to cart problem");
      }

    });

    // PREVENT THE FORM SUBMITTING AGAIN
    return false;
  };
  $form.on('submit', submitHandler);
};

export default activate;
