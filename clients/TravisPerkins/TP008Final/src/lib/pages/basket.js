import * as helpers from '../helpers.js';

export default function basketTest(inclusionProducts) {
    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    if(document.body.classList.contains('tp008final--basket')) {
        return false;
    }
    document.body.classList.add('tp008final--basket');

    const $ = window.jQuery;
    
    // ----------------------------------------------------------------
    // Check that we have valid products (products flagged for delivery)
    // ----------------------------------------------------------------
    const itemRows = $('.baskt_items_wrap .baskt_item');

    let numProducts = 0;
    itemRows.each(function() {
        if($(this).find('.itm_collect .content').length) {
            return;
        }

        numProducts++;
    });

    if(numProducts == 0) {
        return false;
    }

    let bannerMessage = '';
    const targetDate = helpers.getDeliveryTargetDate();
    if(targetDate.daysAdded == 1) {
        bannerMessage = 'Next day delivery*';
    } else {
        bannerMessage = `Delivery on ${targetDate.targetDateDayString}*`;
    }
    
    // ----------------------------------------------------------------
    // Operate on matching item rows
    // ----------------------------------------------------------------
    let numProductsMatch = 0;
    itemRows.each(function() {
        if($(this).find('.itm_collect .content').length) {
            return;
        }

        let sku = $(this).find('.item_code .normal').text().trim();

        if(helpers.skuInArray(sku, inclusionProducts)) {
            numProductsMatch++;
        } else {
            // Flag non-matching product
            $(this).addClass('tp8-baskt_item--non-matching');
        }
    });

    // ----------------------------------------------------------------
    // Where all products match...
    // ----------------------------------------------------------------
    if(numProductsMatch == numProducts) {
        // ----------------------------------------------------------------
        // Show message against each item
        // ----------------------------------------------------------------
        itemRows.each(function() {
            $(this).find('.itm_time').append(`
                <div class="tp8_basket-row-message">
                        <img src="//sb.monetate.net/img/1/581/1482591.png"/>
                    <span>${bannerMessage}</span>
                </div>
            `);
        });

        // Show date against each item on mobile basket
        if($('.page-mobile-cartPage').length > 0) {
            itemRows.each(function() {
                $(this).find('.itm_delivery div:eq(1) span').text(
                    targetDate.daysAdded == 1 ? 'Tomorrow' : targetDate.targetDateFriendlyString
                );
            });
        }
    }

    if(numProductsMatch) {
        return true;
    }
}
