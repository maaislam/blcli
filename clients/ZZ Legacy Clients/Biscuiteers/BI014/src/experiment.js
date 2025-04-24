/**
 * BI014
 * Book of iced gifts ID: 918
 */
import * as UC from '../../../../lib/uc-lib';
import {cacheDom} from '../../../../lib/cache-dom';
import * as utils from '../../../../lib/utils';
import * as basket from './lib/basket';

// -----------------------------------------------------------
// Setup
// -----------------------------------------------------------
let $ = null;

const eventSender = utils.events.setDefaultCategory('BI014-basket-upsell');

/**
 * Book ID
 */
const bookId = 918;
    
(function() {
    // ---------------------------------------------
    // If scope does not exist, reload with debug info
    // so we have access to scope for handling basket.add
    // ---------------------------------------------
    const $rootScope = angular.element(document.querySelector('html')).scope();
    if(!$rootScope) {
        angular.reloadWithDebugInfo();

        return;
    }

    /**
     * Entry point for experiment
     */
    const run = () => {
        // -----------------------------------------------------------
        // Setup
        // -----------------------------------------------------------
        document.body.classList.add('bi014');

        // Fire did run event
        eventSender.send(null, 'did-show-basket-upsell', '', {
            sendOnce: true
        });
        
        // -----------------------------------------------------------
        // Remove existing elms
        // -----------------------------------------------------------
        const basketSuccess = document.querySelector('.bi14-basket-success');
        if(basketSuccess) {
            basketSuccess.remove();
        }

        const upsellWrapper = document.querySelector('.bi14-upsell-wrapper');
        if(upsellWrapper) {
            upsellWrapper.remove();
        }

        // -----------------------------------------------------------
        // Handle basket add
        // -----------------------------------------------------------
        $rootScope.$on('basket.add', () => {
            $('body,html').animate({
                scrollTop: $('h1:first').offset().top
            }, 300, () => {
                // Fire did run event
                eventSender.send(null, 'did-successfully-add-to-basket', '', {
                    sendOnce: true
                });

                if($('.bi14-basket-success').length == 0) {
                    $('[ng-controller="LocalBasketController"] h1').after(`
                        <div class="bi14-basket-success p-a-4 fs-14 italic center m-b bg-col-grey-80">
                            The <strong>biscuiteers book of iced gifts</strong> has been added to your basket.
                        </div>
                    `);    
                }

                $('.bi14-addto-btn').html('add to basket');
            });
        });

        // ---------------------------------------------
        // Draw
        // ---------------------------------------------
        drawOnBasket();

        cacheDom.get('.bi14-upsell-wrapper--basket .bi14-addto-btn').addEventListener('click', (e) => {
            $(e.currentTarget).html('adding...');
                
            // Fire did run event
            eventSender.send(null, 'did-click-add-to-basket-button', '', {
                sendOnce: true
            });
                // Fire did run event
                eventSender.send(null, 'did-successfully-add-to-basket', '', {
                    sendOnce: true
                });
            
            basket.addToBasket(bookId, 1);
        });
            
        // ---------------------------------------------
        // Orientation change => refresh page
        // Workaround for DOM rebuliding
        // ---------------------------------------------
        window.addEventListener("orientationchange", function() {
            window.location.reload();
        });
    };

    /**
     * Draw 
     */
    const drawOnBasket = () => {
        const html = `
            <div class="bi14-upsell-wrapper bi14-upsell-wrapper--basket">
                <img class="bi14-upsell-wrapper__img" src="//www.sitegainer.com/fu/up/e0wahpimeir5b3l.png">
                <div class="bi14-upsell-wrapper__content">
                    <h2 class="col-pink">our new book has arrived!</h2>
                    <p>60 creative projects for every gifting moment</p>
                </div>
                <div class="bi14-upsell-wrapper__actions">
                    <p class="bi14-upsell-price col-pink">
                    £20.00
                    </p>
                    <p class="bi14-addto-wrap">
                        <a class="button button--bigger button--pink b-radius-5 bi14-addto-btn">
                        add to basket
                        </a>
                    </p>
                </div>
            </div>
        `;

        const ngInclude = cacheDom.get('main [ng-controller=LocalBasketController] > ng-include');
        if(window.innerWidth <= 519) {
            ngInclude.querySelector('div:first-of-type > div:first-of-type').insertAdjacentHTML('afterend', html);
        } else {
            ngInclude.insertAdjacentHTML('beforebegin', html);
        }
    };

    // -----------------------------------------------------------
    // BASKET - Poll elements required 
    // -----------------------------------------------------------
    const poller = UC.poller([
        () => !!window.JQSG,
        () => !!angular,
        () => {
            // -------------------------------------------------------
            // Don't show if product already in basket
            // -------------------------------------------------------
            const prods = document.querySelectorAll('[basket-list-item]');

            let icedGiftsAlreadyExists = false;
            [].forEach.call(prods, (item, idx) => {
                const itemText = item.querySelector('a.block p').textContent.trim();
                if(itemText.match(/biscuiteers book of iced gifts/)) {
                    icedGiftsAlreadyExists = true;
                }
            });

            return prods.length > 0 && icedGiftsAlreadyExists === false;
        },
        '[basket-list-item]',
        'main [ng-controller=LocalBasketController] > ng-include'
    ], () => {
        utils.fullStory('BI014', 'Variant 1');

        $ = window.JQSG;

        run();
    }); 
})();
