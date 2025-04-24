import * as helpers from '../../helpers.js';

export default function desktopPdpTest(inclusionProducts) {
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
    const sku = $('.tpProductView:first .tpInfoWrapper:first .tpProductItem span:first').text().trim(),
        targetDate = helpers.getDeliveryTargetDate();

    let message = '';

    if(targetDate.daysAdded == 1) {
        message = 'Order now for Next Day Delivery*';
    } else {
        message = `Order now for Delivery on ${targetDate.targetDateDayString}*`;
    }

    if(helpers.skuInArray(sku, inclusionProducts)) {
        const overlay = $('<div class="tp8_prod-overlay"/>');
        overlay.text(message);

        $('#tpPdpRightPanelComponent').addClass('tp8-did-match').before(overlay);

        return true;
    }
    
    return false;
}
