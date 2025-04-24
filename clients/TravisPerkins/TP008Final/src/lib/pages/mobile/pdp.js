import * as helpers from '../../helpers.js';

export default function mobilePdpTest(inclusionProducts) {
    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    if(document.body.classList.contains('tp008final--pdp')) {
        return false;
    }
    document.body.classList.add('tp008final--pdp');

    $ = window.jQuery;

    // ----------------------------------------------------------------
    // If product matches, show overlay on image
    // ----------------------------------------------------------------
    const sku = $('.tp_prod_detail .tp_prodName p:last').text().trim().replace('Product code:', ''),
        targetDate = helpers.getDeliveryTargetDate();

    let message = '';

    if(targetDate.daysAdded == 1) {
        message = 'Order now for Next Day Delivery*';
    } else {
        message = `Order now for Delivery on ${targetDate.targetDateDayString}*`;
    }

    if(helpers.skuInArray(sku, inclusionProducts)) {
        const overlay = $('<div class="tp8_prod-overlay tp8_prod-overlay--mobile"/>');
        overlay.text(message);

        $('.tp_prodImage').before(overlay);

        return true;
    }
    
    return false;
}
