import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ---------------------------------------------------------
// Hold outer ref to jQuery
// ---------------------------------------------------------
let $ = null;

/**
 * Entry point for product page amends
 */
const runProductPage = () => {
    utils.fullStory('IT020', 'Variation 1');

    const eventSender = utils.events.setDefaultCategory('IT020-product-promotion');

    $('body').addClass('it020');

    eventSender.send(null, 'did-show-product-promotion');

    const promoBtn = $('.promo_message-view .promo-code-btn');
    
    // --------------------------------------------------
    // Helper remove validation errors if a user
    // actually selects something
    // --------------------------------------------------
    $('#product-options-wrapper').on('click', '.switcher-field label', (e) => {
        const parent = $(e.currentTarget).parents('dl:first');
        if(parent.find('label.selected').not('.no-stock').length > 0) {
            parent.find('.validation-advice').remove();
        }
    });

    // --------------------------------------------------
    // On promo button click scroll to errors
    // --------------------------------------------------
    $('.promo_message-view').on('click', '.promo-code-btn', () => {

        eventSender.send(null, 'user-did-click-apply-promo-code');

        promoBtn.addClass('it20-button-active');

        setTimeout(() => {
            const validationAdvices = $('.product-options .validation-advice');

            if(validationAdvices.length > 0) {
                $('body,html').animate({
                    scrollTop: validationAdvices.eq(0).offset().top - 50
                }, 450);

                eventSender.send(null, 'user-saw-errors-on-click-apply-promo-code');

                promoBtn.removeClass('it20-button-active');
            }
        }, 300);
    });
    
    // --------------------------------------------------
    // Coupon code
    // --------------------------------------------------
    const promotedCode = $('#voucher_code').val();
    if(promotedCode) {
        getCouponCode().then((couponCode) => {
            if(promotedCode == couponCode) {

                eventSender.send(null, 'did-see-promotion-already-applied-code');

                promoBtn.addClass('it20-btn-coupon-applied');
                promoBtn.find('> span:first').html(
                    `<span class="it20-coupon-applied">
                        <i class="fa fa-heart-o applied-heart float-left">
                            <i class="fa fa-check applied-check"></i>
                        </i>
                        Applied Code <strong>"${couponCode.trim()}"</strong>
                    </span>`
                );
            }
        });

        // Show price after discount where product code on page
        var productPrice = parseProductPrice(),
            discountPercentage = parseDiscountPercentage();

        if(discountPercentage && productPrice) {
            const priceAfterDiscount = calculatePriceAfterDiscount(productPrice.priceValue, discountPercentage);

            productPrice.priceElm.addClass('it20-discount-exists');

            eventSender.send(null, 'did-show-promotion-discount-price');

            productPrice.priceElm.after(`
                <span class="it20-price-after-discount">
                    £${priceAfterDiscount} with voucher code ${promotedCode}
                </span>
            `);
        }
    }
};

/**
 * Helper calculate price after disciount
 */
const calculatePriceAfterDiscount = (price, discountPercentage) => {
    discountPercentage /= 100;
    
    return (price * (1 - discountPercentage)).toFixed(2);
};

/**
 * Parse discount we're offering
 */
const parseDiscountPercentage = () => {
    const discountText = $('.promo-coupon-container .promo_message-view .discount-div').text().trim(),
        discountTextMatches = discountText.match(/(\d+)%/);

    if(discountTextMatches && discountTextMatches[1]) {
        return discountTextMatches[1];
    }

    return false;
};

/**
 * Helper parse price on product page
 */
const parseProductPrice = () => {
    const price = $(`
        .product-shop .price-box:first .regular-price .price, 
        .product-shop .price-box:first .special-price .price
    `);

    const priceValueMatches = price.eq(0).text().trim().match(/£(.+)/);
    if(priceValueMatches && priceValueMatches[1]) {
        const priceValue = priceValueMatches[1];
        return {
            priceElm: price,
            priceValue: parseFloat(priceValue) 
        };
    }

    return false;
};

/**
 * Get the coupon code from the basket
 */
const getCouponCode = () => {
    const p = new Promise((resolve, reject) => {
        $.ajax({
            url: '/checkout/cart',
            success: function(data) {
                const d = document.createElement('div');
                d.innerHTML = data;

                const couponCode = $(d).find('#coupon_code');
                if(couponCode) {
                    const couponCodeValue = couponCode.val();
                    if(couponCodeValue) {
                        resolve(couponCodeValue);    
                    }
                }
            }
        });
    });

    return p;
};

// ---------------------------------------------------------
// Poll required elements
// ---------------------------------------------------------
UC.poller([
    '.promo_message-view .promo-code-btn',
    function () {
        return !!window.jQuery;
    }
], function() {
    $ = window.jQuery;
    
    runProductPage();    
});
