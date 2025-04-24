
//
// Split on payment methods:  
// - 25% should see worldpay
// - 75% should see braintree
//
// => Worldpay is hidden on the control
// => Braintree is hidden on the variation
// => the variation runs for 25% traffic


if(!typeof ITYYY_IS_CONTROL == 'undefined' || !ITYYY_IS_CONTROL) {
    // ------------------------------------------
    // Variation Code
    // ------------------------------------------

    (function($) {
        $('body').addClass('ityyy-hide-braintree');
    })(jQuery);
} else {
    // ------------------------------------------
    // Control Code
    // ------------------------------------------

    (function($) {
        $('body').addClass('ityyy-hide-worldpay');
    })(jQuery);
}
