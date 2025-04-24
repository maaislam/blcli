import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import productMatcher from './lib/product-matcher';

let $ = null;

const eventSender = utils.events.setDefaultCategory('BI010---Category-Descriptions');

/**
 * Entry point for running code, called on sitegainer.newPage() after polling
 */
const run = () => {
    document.body.classList.add('bi010');

    // -------------------------------------------------------
    // On page load
    // -------------------------------------------------------
    updateCategoriesWithText();

    // -------------------------------------------------------
    // On more products load
    // -------------------------------------------------------
    UC.observer.connect(document.querySelector('.listing-container > div > div'), function() {
        updateCategoriesWithText();

        equalHeightRows();
    }, {
        config: {
            attributes: false,
            childList: true
        }
    });

    // -------------------------------------------------------
    // Equal height rows
    // -------------------------------------------------------
    equalHeightRows();
};

/**
 * Equal height rows
 */
const equalHeightRows = () => {
    const prodItems = $('product-list-item');
    let maxHeight = 120;
    prodItems.each((idx, item) => {
        const itemInfo = $(item).find('.bi10-product-item-info');
        const outerHeight = itemInfo.outerHeight();

        maxHeight = Math.max(maxHeight, outerHeight);
    });

    prodItems.each((idx, item) => {
        const itemInfo = $(item).find('.bi10-product-item-info');
        itemInfo.css('min-height', maxHeight);
    });
};

/**
 * Loop through product items and add the info we have against them
 */
const updateCategoriesWithText = () => {
    let didShowPersonalisationAvailable = false,
        didShowGlutenFreeAvailable = false,
        didShowSize = false;

    $('product-list-item').each((idx, item) => {
        if($(item).attr('data-bi10updated')) {
            return true;
        } else {
            $(item).attr('data-bi10updated', true);
        }

        const relWrap = $(item).find('.pos-relative:first'),
            priceContainer = $(item).find('div[itemprop=offers]:last'),
            title = $(item).find('div[itemprop=url]:first'),
            titleText = title.text().trim() || '',
            productLink = title.attr('href'),
            priceBuyNow = priceContainer.find('bar').next(),
            personalisedDiv = $(item).find('div[ng-if="product.isPersonalized"]:first');

        title.prependTo(relWrap);

        priceContainer.addClass('bi10-price-container');
        personalisedDiv.addClass('bi10-personalised-container');
        title.addClass('bi10-title');

        const infoStrings = productMatcher.matchProduct(titleText);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('bi10-product-item-info');
        priceContainer.after(infoContainer);

        $(item).find('.ribbon').prependTo($(item).find('.block-item__image'));

        if(titleText && infoStrings.length) {
            // Show information strings we gleaned from product title
            infoStrings.forEach((infoString, idx) => {
                if(infoString.type) {
                    let html = '';

                    switch(infoString.type) {
                        case 'size': 
                            html += '<span class="bi10-info-item bi10-size">';

                            didShowSize = true;

                            break;
                        case 'glutenfree':
                            html += '<span class="bi10-info-item bi10-glutenfree">';

                            didShowGlutenFreeAvailable = true;

                            break;
                        default:
                            throw "[BI010] Can't display text not given for type.";
                    }

                    html += infoString.text;

                    if(infoString.numProducts) {
                        html += '<span class="bi10-extra">';
                        html += infoString.numProducts;
                        html += '</span>';
                    } else if(infoString.extra) {
                        html += '<span class="bi10-extra">';
                        html += infoString.extra;
                        html += '</span>';
                    }

                    html += '</span>';

                    infoContainer.insertAdjacentHTML('beforeend', html);
                }
            });
        }

        // -------------------------------------------------------
        // Show personalised text if it's personalised
        // -------------------------------------------------------
        if(personalisedDiv.length > 0) {
            let extraClass = '';
            if(infoStrings.length === 0) {
                extraClass = 'bi10-info-item--sole-link';
            }

            infoContainer.insertAdjacentHTML('beforeend', `
                <a href="${productLink}" class="bi10-info-item bi10-personalisation ${extraClass}">
                    Personalisation Available
                </a>
            `);

            didShowPersonalisationAvailable = true;
        } else {
            /*infoContainer.insertAdjacentHTML('beforeend', `
                <span class="bi10-info-item bi10-info-item--empty">&nbsp;</span>
            `);*/
        }

        // -------------------------------------------------------
        // Buy now button
        // -------------------------------------------------------
        priceBuyNow
            .removeClass('col-pink')
            .addClass('bi10-buy-now b-radius-5 w-12-s button--pink button')
            .appendTo(infoContainer);
    });

    // -------------------------------------------------------
    // Event sending
    // -------------------------------------------------------
    if(didShowPersonalisationAvailable) {
        eventSender.send(null, 'did-show-personalisation-available');
    }
    if(didShowGlutenFreeAvailable) {
        eventSender.send(null, 'did-show-gluten-free-available');
    }
    if(didShowSize) {
        eventSender.send(null, 'did-show-size');
    }

    $('.listing-container').on('click', '.bi10-buy-now', () => {
        eventSender.send(null, 'did-click-buy-now-button');
    });

    $('.listing-container').on('click', '.bi10-personalisation', () => {
        eventSender.send(null, 'did-click-personalisation-available');
    });
};

// -----------------------------------------------------------
// Poll elements required 
// -----------------------------------------------------------
const poller = UC.poller([
    () => !!window.JQSG,
    'product-list-item',
    '.listing-container',
    '.listing-page',
    '[ng-controller=LocalCategoryController]'
], () => {
    utils.fullStory('BI010---Category-Descriptions', 'Variant 1');

    $ = window.JQSG;

    run();
}); 
