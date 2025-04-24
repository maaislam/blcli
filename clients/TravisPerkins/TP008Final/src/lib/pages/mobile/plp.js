
import * as helpers from '../../helpers.js';

export default function mobilePlpTest(inclusionProducts) {
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

    $('.tp_prodView .product_item').each(function() {
        const link = $(this).find('a:first');
        const linkHref = link.attr('href');
        const matches = linkHref.match(/\d{5,7}$/g);
        const targetDate = helpers.getDeliveryTargetDate();
        let sku = '';
        let bannerMessage = '';

        if(targetDate.daysAdded == 1) {
            bannerMessage = 'Next day delivery*';
        } else {
            bannerMessage = `Delivery on ${targetDate.targetDateDayString}*`;
        }

        if(matches && matches[0]) {
            sku = matches[0];
        }

        if(sku && helpers.skuInArray(sku, inclusionProducts)) {
            $(this).find('[id^=monetate_badge]').remove();

            const banner = $(`
                <div class="tp8_listingBanner">
                        <img src="//sb.monetate.net/img/1/581/1482591.png"/>
                    <span>${bannerMessage}</span>
                </div>
            `);
             
            $(this).append(banner).addClass('TP008-Padding');
            didMatchProduct = true;
        }
    });

    // Set grid items extra height to accommodate badge
    function resizeLinksToAddressDelivery() {
        setTimeout(function() {
            $('.tp_prodView.grid li').each(function(idx) {
                if($(this).find('.tp8_listingBanner').length) {
                    let newHeight = $(this).outerHeight() + 20;

                    this.style.height = newHeight + 'px';

                    if(idx % 2 == 0) {
                        const nxt = $(this).next('.product_item');
                        if(nxt.length) {
                            nxt[0].style.height = newHeight + 'px';
                        }
                    } else {
                        const prev = $(this).prev('.product_item');
                        if(prev.length) {
                            prev[0].style.height = newHeight + 'px';
                        }
                    }
                }
            });
            $('.tp_prodView.grid .product_item .product_price').css('padding-bottom', '25px');
        }, 200);
    }

    $(document).ready(function() {
        resizeLinksToAddressDelivery();
    });

    $('.tp_sort_grid').on('click', function() {
        resizeLinksToAddressDelivery();
    });

    return didMatchProduct;
}
