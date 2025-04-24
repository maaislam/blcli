import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

/* eslint-disable */

// ---------------------------------------------------------
// When adding to the framework, specify IT44VARIATION = 1
// ---------------------------------------------------------
let VARIATION = null;
if(typeof IT44VARIATION != 'undefined') {
    VARIATION = IT44VARIATION;
} else {
    VARIATION = 2;
}

// ---------------------------------------------------------
// Hold outer ref to jQuery
// ---------------------------------------------------------
let $ = null;

// ---------------------------------------------------------
// Test
// ---------------------------------------------------------
window._IT044 = (() => {
    // ------------------------------------------------------
    // Full story tagging
    // ------------------------------------------------------
    utils.fullStory('IT044', 'Variation 1');

    const eventSender = utils.events.setDefaultCategory('IT044-Filters-VARIATION-' + VARIATION);

    /**
     * Entry point for running test
     */
    const run = () => {
        $ = window.jQuery;

        $('body').addClass('it044');

        // ------------------------------------------------------
        // Open all categories by default
        // ------------------------------------------------------
        const blockNav = $('.block-layered-nav'),
            blockSections = blockNav.find('dt'),
            blockSectionContents = blockNav.find('dd'),
            filtersList = blockNav.find('#narrow-by-list'),
            filtersDt = filtersList.find('dt'),
            filtersDd = filtersList.find('dd'),
            checkboxFilters = blockNav.find('.checkbox-filter'),
            blockTitle = blockNav.find('.block-title:first');

        // ------------------------------------------------------
        // Auto-open sections
        // ------------------------------------------------------
        blockSections.removeClass('closed');

        // ------------------------------------------------------
        // Prevent collapsing section
        // ------------------------------------------------------
        filtersDt.on('click', () => {
            return false;
        });

        // ------------------------------------------------------
        // Against each dt in the list, give it an identifying class
        // ------------------------------------------------------
        filtersDt.each((idx, item) => {
            const t = item.textContent.trim(),
                c = t.replace(/[^A-Z]/i, '').toLowerCase();

            $(item).addClass('it44-dt-' + c);
            $(item).next('dd').addClass('it44-dd-' + c);
        });

        $('.it44-dd-price, .it44-dd-category').on('click', 'li a', () => {
            eventSender.send(null, 'clicked-direct-filter');
        });

        // ------------------------------------------------------
        // Update 'filter by' text to cat name
        // ------------------------------------------------------
        blockTitle.find('strong').append('<span>' + $('.page-title h1').text() + '</span>');

        // Block title event handling
        blockTitle.on('click', () => {
            eventSender.send(null, 'did-click-filter-by-to-open-filters');
        });

        // ------------------------------------------------------
        // Block title prevent closing filters
        // ------------------------------------------------------
        blockTitle.on('click', () => {
            if(blockTitle.parent().hasClass('block-expanded')) {
                return false;
            }
            return true;
        });

        // ------------------------------------------------------
        // Add 'close' button
        // ------------------------------------------------------
        blockTitle.prepend(`
            <span class="it44-close">
                <em class="it44-times">&times;</em>
                <em>Close</em>
            </span>
        `);

        $('.it44-close').on('click', () => {
            blockNav.removeClass('block-expanded');
            blockNav.find('.block-content').hide();
            blockNav.find('.currently').show();
            blockNav.find('.block-title > .button').show();

            document.body.classList.remove('it44-filters-active');

            eventSender.send(null, 'closed-filters');

            return false;
        });

        // ------------------------------------------------------
        // Add 'reset all' button
        // ------------------------------------------------------
        blockTitle.append(`
            <span class="it44-reset-all">
                reset all
            </span>
        `);

        $('.it44-reset-all').on('click', (e) => {
            e.currentTarget.innerHTML = 'loading...';
            window.location = window.location.pathname;

            eventSender.send(null, 'did-reset-all-filters');
        });

        // ------------------------------------------------------
        // Category filters, first filter should read 'All' if there's a hierarchy
        // ------------------------------------------------------
        const categoryFilters = blockNav.find('.category-filter-tree'),
            firstCatFilter = categoryFilters.find('.level0:first'),
            firstCatFilterText = firstCatFilter.text().trim();

        if(!firstCatFilterText.match(/^All/)) {
            var a = firstCatFilter.find('a:first');
            if(a && a[0] && a[0].childNodes) {
                var txtNode = a[0].childNodes[0];
                txtNode.nodeValue = 'All ' + txtNode.nodeValue;
            }
        }

        // ------------------------------------------------------
        // Against each filter type, add ability to hit 'clear' - unchecks checkboxes
        // ------------------------------------------------------
        $('.it44-dt-colour, .it44-dt-shoesize, .it44-dt-size').each((idx, item) => {
            $(item).append(`
                <a class="it44-dt-clearall">clear</a>
            `);
        });

        // ------------------------------------------------------
        // Elms w/ checkboxes
        // ------------------------------------------------------
        const valueOnlyElms = $('.it44-dd-size, .it44-dd-shoesize, .it44-dd-colour');

        if(VARIATION == 1) {
            eventSender.send(null, 'did-show-v1');

            // ------------------------------------------------------
            // Variation 1
            // ------------------------------------------------------
            $('body').addClass('it044-v1');

            // ------------------------------------------------------
            // Add color swatch to each color filter
            // ------------------------------------------------------
            const colorLabels = $('.it44-dd-colour label[for^=colour-]');
            colorLabels.each((idx, item) => {
                const colorName = $(item).attr('for').replace('colour-', '').trim();
                $(item).prepend(`<em class="it44-color-key it44-bg-${colorName}"></em>`);
            });

            // ------------------------------------------------------
            // For definitions with checkboxes, move the checkboxes
            // ------------------------------------------------------
            filtersDd.find('input.checkbox-filter').each((idx, item) => {
                $(item).appendTo(item.parentNode);
            });

            // ------------------------------------------------------
            // Handle clear all against a category of filters
            // ------------------------------------------------------
            $('.it44-dt-clearall').on('click', (e) => {
                const that = $(e.currentTarget);

                that.parent('dt').next('dd').find('input.checkbox-filter').attr('checked', false)
                    .removeClass('IT011_selected');
                that.text('cleared!');
                setTimeout(() => that.text('clear'), 800);

                eventSender.send(null, 'cleared-filter-group');

                return false;
            });

            // ------------------------------------------------------
            // Limit number of items to show and show 'more' link to initiate
            // ------------------------------------------------------
            $('.it44-dd-size, .it44-dd-category').each((idx, dd) => {
                const ol = $(dd).find('ol:first, ul:first'),
                    items = ol.children('li');

                if(items.length > 6) {
                    items.slice(5).hide();

                    const more = $('<li class="it44-more">+ More</li>');
                    ol.append(more);

                    more.on('click', () => {
                        items.show();
                        more.remove();

                        eventSender.send(null, 'more-clicked-on-filter-cat');
                    });
                }
            });
            
            // ------------------------------------------------------
            // Update elms replace a tags with spans for checkbox filters
            // ------------------------------------------------------
            valueOnlyElms.find('li').each((idx, item) => {
                const span = $(item).find('label span'),
                    txt = span.text(),
                    input = $(item).find('input'),
                    newTxt = txt.replace(/\(\d+\)/, '').trim();

                // Replace any a tags with spans
                const a = $(item).find('a:first'),
                    aText = a.text().trim();

                a.replaceWith('<span>' + aText + '</span>');
            });
        
            // ------------------------------------------------------
            // Append display div against checkboxes
            // ------------------------------------------------------
            checkboxFilters.after(`
                <div class="tg44-pseudo-checkbox"><i class="fa fa-check"></i></div>
            `);
        } else if(VARIATION == 2) {
            eventSender.send(null, 'did-show-v2');

            $('body').addClass('it044-v2');

            // ------------------------------------------------------
            // Move all category links into a select    
            // ------------------------------------------------------
            const catFilterTree = $('.it44-dd-category .category-filter-tree'),
                catItems = catFilterTree.find('li');

            if(catItems.length) {
                catFilterTree.addClass('it44-has-select');

                const select = $('<select class="input-select">');
                select.append('<option>--Select Category--</option>');

                catItems.each((idx, item) => {
                    const a = $(item).find('a'),
                        link = a.attr('href'),
                        txt = a.text().trim();

                    select.append(`<option value="${link}">${txt}</option>`);
                });

                select.on('change', () => window.location = select.val());
                
                catFilterTree.prepend(select);
            }

            // ------------------------------------------------------
            // If it's a shoes category, move 'shoe size' up to be 2nd elm
            // otherwise move 'size' to be 2nd elm - providing those filters exist
            // ------------------------------------------------------
            if(window.location.pathname.match(/shoes/)) {
                $('.it44-dt-shoesize').insertAfter('.it44-dd-category');
                $('.it44-dd-shoesize').insertAfter('.it44-dt-shoesize');
            } else {
                $('.it44-dt-size').insertAfter('.it44-dd-category');
                $('.it44-dd-size').insertAfter('.it44-dt-size');
            }

            /**
             * Add odd/even classes to elm
             */
            const evenOdd = (item, idx) => {
                $(item).removeClass('odd');
                $(item).removeClass('even');

                if((idx + 1) % 2 == 0) {
                    $(item).addClass('even');
                } else {
                    $(item).addClass('odd');
                }
            }

            // ------------------------------------------------------
            // Update the odd/even listing on dt and dd
            // ------------------------------------------------------
            $('#narrow-by-list dt').each((idx, item) => {
                evenOdd(item, idx);
            });

            $('#narrow-by-list dd').each((idx, item) => {
                evenOdd(item, idx);
            });
            
            // ------------------------------------------------------
            // Update size and shoe size elms to only show the value
            // (not num products in brackets)
            // ------------------------------------------------------
            valueOnlyElms.addClass('it44-value-only');
            valueOnlyElms.find('li').each((idx, item) => {
                const span = $(item).find('label span'),
                    txt = span.text(),
                    input = $(item).find('input'),
                    newTxt = txt.replace(/\(\d+\)/, '').trim();

                span.text(newTxt);

                if(input.is(':checked')) {
                    $(item).addClass('it44-active');
                } else {
                    $(item).removeClass('it44-active');
                }

                // Replace any a tags with spans
                const a = $(item).find('a:first'),
                    aText = a.text().trim();

                a.replaceWith('<span>' + aText + '</span>');

                // Input is hidden, clicks on li should toggle input checked
                $(item).find('label').off('click').on('click', () => {
                    if(input.is(':checked')) {
                        $(item).removeClass('it44-active');
                    } else {
                        $(item).addClass('it44-active');
                    }

                    return false;
                });
            });
            
            // ------------------------------------------------------
            // Update colour elements
            // ------------------------------------------------------
            const colourDd = $('.it44-dd-colour');
            colourDd.addClass('it44-value-only--color');
            colourDd.find('li').each((idx, item) => {
                const input = $(item).find('input.checkbox-filter'),
                    label = $(item).find('label'),
                    colorName = label.attr('for').replace('colour-', '').trim();
                $(item).addClass('it44-bg-' + colorName);
            });
            
            // ------------------------------------------------------
            // Handle clear all against a category of filters
            // ------------------------------------------------------
            $('.it44-dt-clearall').on('click', (e) => {
                const that = $(e.currentTarget);

                that.parent('dt').next('dd').find('ol li').each((idx, item) => {
                    const input = $(item).find('input');
                    $(item).removeClass('it44-active');
                    input.attr('checked', false);
                    input.removeClass('IT011_selected');
                });

                eventSender.send(null, 'cleared-filter-group');

                that.text('cleared!');
                setTimeout(() => that.text('clear'), 800);

                return false;
            });
        }
        
        // ------------------------------------------------------
        // Events
        // ------------------------------------------------------
        const cbFilters = valueOnlyElms.find('.checkbox-filter');
        if(cbFilters.length > 0) {
            const checkboxFiltersArray = [].slice.call(cbFilters);
            if(checkboxFiltersArray) {
                UC.observer.connect(checkboxFiltersArray, () => {
                    eventSender.send(null, 'did-click-checkbox-filter');
                }, {
                    config: {attributes: true, childList: false, subtree: false},
                    throttle: 100
                });
            }
        }

        $('.col-left.sidebar').on('click', '.IT011_applyFiltersButton', () => {
            eventSender.send(null, 'did-click-apply-filters-button');
        });
        
        // ------------------------------------------------------
        // Fix issue with spans binding events
        // ------------------------------------------------------
        valueOnlyElms.find('li label').each((idx, item) => {
            $(item).find('em, span').on('click', (e) => {
                e.stopPropagation();

                e.currentTarget.parentNode.click();
            });
        });
    
        // ------------------------------------------------------
        // Prevent under scroll (facilitate for body fixed in css)
        // ------------------------------------------------------
        if(blockNav[0]) {
            UC.observer.connect(
                blockNav[0],
                () => { 
                    if(blockNav[0].classList.contains('block-expanded')) {
                        document.body.classList.add('it44-filters-active');
                    } else {
                        document.body.classList.remove('it44-filters-active');
                    }
                },
                {
                    attributes: true,
                    childList: false,
                    subTree: false
                }        
            );
        }
    };

    // ------------------------------------------------------
    // Poll to run
    // - Test requires a running IT011 to run
    // ------------------------------------------------------
    UC.poller([
        'body.IT011',
        function () {
            return !!window.jQuery;
        }
    ], run);

})();
