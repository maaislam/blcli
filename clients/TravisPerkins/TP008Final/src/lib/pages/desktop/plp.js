/* eslint-disable */
import * as helpers from '../../helpers.js';

export default function desktopPlpTest(inclusionProducts) {
    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    if(document.body.classList.contains('tp008final--plp')) {
        return false;
    }
    document.body.classList.add('tp008final--plp');

    $ = window.jQuery;
    
    // ----------------------------------------------------------------
    // Update rows on PLP against each matching product
    // ----------------------------------------------------------------
    let didMatchProduct = false;

    $('#products .prod').each(function() {
        let sku = $(this).find('.product_code span').text().trim().replace(/\(|\)/g, ''),
            img = $(this).find('.prod_img'),
            productCode = $(this).find('.prod_info .product_code'),
            innerProdcontent = $(this).find('.plp_add_to_cart_form');

        const targetDate = helpers.getDeliveryTargetDate();

        let bannerMessage = '',
            bannerMessageGrid = '';

        if(targetDate.daysAdded == 1) {
            bannerMessage = 'Next day delivery available on this product*';
            bannerMessageGrid = 'Next day delivery';
        } else {
            bannerMessage = `Delivery on ${targetDate.targetDateDayString}*`;
            bannerMessageGrid = bannerMessage;
        }

        if(helpers.skuInArray(sku, inclusionProducts)) {
            didMatchProduct = true;

            // ----------------------------------------------------------------
            // Free Delivery Banner
            // ----------------------------------------------------------------
            
            if(bannerMessage) {
                const banner = $(`
                    <div class="tp8_listingBanner tp8_listingBanner--list">
                        <img src="//sb.monetate.net/img/1/581/1482591.png"/>
                        <span>${bannerMessage}</span>
                    </div>
                `);
                 
                innerProdcontent.prepend(banner);

                const bannerGrid = $(`
                    <div class="tp8_listingBanner tp8_listingBanner--grid">
                        <img src="//sb.monetate.net/img/1/581/1482591.png"/>
                        <span>${bannerMessageGrid}</span>
                    </div>
                `);

                // For grid view
                productCode.after(bannerGrid);
            }
        }
    });

    return didMatchProduct;
}
