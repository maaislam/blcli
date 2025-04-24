// ------------------------------------------
// IMPORTANT!!!!
// _____________________________________
//
// DO NOT EDIT THIS TEST DIRECTLY IN VWO
// _____________________________________
//
// Modify the source in the ab-test-sandbox repo
// ------------------------------------------

import UC from './lib/uc.js';
import accordionHtml from './lib/html/accordion.js';
import videoLightboxHtml from './lib/html/lightbox-video.js';
import lightboxRecessVsExactHtml from './lib/html/lightbox-recess-vs-exact.js';
import Validators from './lib/accordion/validators.js';
import Accordion from './lib/accordion.js';
import * as helpers from './lib/helpers.js';

// ----------------------------------------------------------------
// Entry point for test
// ----------------------------------------------------------------
const run = () => {

    if(document.body.classList.contains('wo17')) {
        // Ensure test isn't already running
        return;
    }
   
    // ----------------------------------------------------------------
    // Vars
    // ----------------------------------------------------------------
    const imageContainer = $('#content > .row > .col-md-7:first')
        , productRightContainer = $('#content > .row > .col-md-5:first')
        , productRight = $('#product_right')
        , imageViewer = imageContainer.find('.image-viewer:first')
        , addToForm = productRightContainer.find('form:first');

    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    document.body.classList.add('wo17');

    helpers.fullStory('WO017---PDP-Measurement', 'V1');

    // ----------------------------------------------------------------
    // Build product  configuration area
    // ----------------------------------------------------------------
    imageContainer.removeClass('col-md-7').addClass('col-md-6');
    productRightContainer.removeClass('col-md-5').addClass('col-md-6');

    if(imageViewer && imageViewer[0] && imageViewer[0].slick) {
        // Refreshes the product image slider since we've 
        // just resized its containing div
        imageViewer[0].slick.refresh();
    }

    const accordionElm = $(accordionHtml);
    accordionElm.prependTo(productRightContainer);
    
    // ----------------------------------------------------------------
    // Start 'from' price
    // ----------------------------------------------------------------
    const fromPrice = $('#product_title .from-price');
    if(fromPrice.length) {
        let fromPriceClone = fromPrice.clone();

        let nowPrice = fromPriceClone
            .find('strike').remove()
            .end().text().trim().replace('From', '').trim();
        fromPriceClone = null;

        let thenPrice = fromPrice.find('strike').text().trim();

        $('.wo17-final-price').text(nowPrice);
        $('.wo17-was-price').text(thenPrice);
    }

    // ----------------------------------------------------------------
    // Additional product options
    //
    // These options vary per product and so need to be added
    // to the measurements step dynamically
    // ----------------------------------------------------------------
    $('table.product_options tr').each((idx, item) => {
        let name = $(item).find('th').text().trim(),
            helpIcon = $(item).find('.help'),
            options = $(item).find('[name^="data[Product][Option]"]');

        name = name.replace(/:$/, '');

        if(name == 'Recess or Exact') {
            // We've already dealt with this in accordionHtml
            return true;
        }

        const uniqueName = name.replace(/[^\d\w]/i, '').toLowerCase() + (new Date()).getTime();
            
        let optionContent = '';
        $.each(options, (idx, item) => {
            const elementId = $(item).attr('id');

            if($(item).attr('type') == 'radio') {
                const label = $(item).parent().find('label')
                    , labelText = label.text();

                let checkedHtml = '';
                if($(item).attr('checked')) {
                    checkedHtml = 'checked';
                }

                optionContent += `
                    <label>
                        <input 
                            type="radio"
                            name="${uniqueName}"
                            ${checkedHtml}
                            data-wo17-map='[
                                ["click", "#${elementId}", "click"]
                            ]'
                        />
                        ${labelText}
                    </label>
                `;
            } else if(item.nodeName.toLowerCase() == 'select') {
                const selectOptionsHtml = item.innerHTML;

                optionContent += `
                    <select
                        class="form-control"
                        name="${uniqueName}"
                        data-wo17-map='[
                            ["change", "#${elementId}", "value"]
                        ]'
                    >
                        ${selectOptionsHtml}
                    </select>
                `;
            }
        });

        let whatsThis = '';
        if(helpIcon.length) {
            var randomId = 'wo17-rand-' + (new Date()).getTime() + Math.ceil(1000000 * Math.random());
            helpIcon.attr('data-wo17-help-id', randomId);

            whatsThis = `
                <a class="wo17-helper"
                    data-wo17-map='[
                        ["click", "[data-wo17-help-id=${randomId}]", "click"]
                    ]'
                >What's this?</a>
            `;
        }

        let newHtml = $(`
            <div class="row wo17-extra-option">
                <div class="col-sm-4 wo17-option-name">
                    <span class="wo17-label-column">
                        ${name}
                    </span>
                    ${whatsThis}
                </div>
                <div class="col-sm-8 wo17-option-content">
                    <div class="form-inline">
                        <div class="form-group">
                            ${optionContent}
                        </div>
                    </div>
                </div>
            </div>
        `);

        newHtml.find('option').attr('selected', false);

        $('[data-step="enter-measurements"] .wo17-additional-configuration').append(newHtml);
    });
    
    // ----------------------------------------------------------------
    // Steps functionality
    //
    // Accordion with validation at steps
    // ----------------------------------------------------------------
    const validators = new Validators();

    validators.addFailedExecutionCallback(() => {
        helpers.scrollToFirstInstanceOf($('.wo17-steps .has-error'));
    });

    // Validate width and height measurements entered
    validators.add('enter-measurements', (currentStep) => {
        currentStep.find('.wo17-error-msg').removeClass('wo17-error-msg--visible');
        currentStep.find('.has-error').removeClass('has-error');

        const widthWrap = $('.wo17-width-wrap')
            , dropWrap = $('.wo17-drop-wrap');

        let valid = true;

        if(!currentStep.find('[name=wo17-width]').val().trim()) {
            widthWrap.addClass('has-error');
            valid = false;
        }
        if(!currentStep.find('[name=wo17-drop]').val().trim()) {
            dropWrap.addClass('has-error');
            valid = false;
        }

        if($('#errmsg_width')[0].style.display != 'none') {
            const errorText = $('#errmsg_width').text()
                , errorMsg = widthWrap.find('.wo17-error-msg');

            widthWrap.addClass('has-error');
            errorMsg.addClass('wo17-error-msg--visible');
            errorMsg.text(errorText);

            valid = false;
        }
        if($('#errmsg_drop')[0].style.display != 'none') {
            const errorText = $('#errmsg_drop').text()
                , errorMsg = dropWrap.find('.wo17-error-msg');

            dropWrap.addClass('has-error');
            errorMsg.addClass('wo17-error-msg--visible');
            errorMsg.text(errorText);

            valid = false;
        }

        // Validate select boxes that we built dynamically
        $('.wo17-extra-option').each((idx, item) => {
            const select = $(item).find('select');
            if(select.length && !parseInt(select.val(), 10)) {
                select.parent().addClass('has-error');
                valid = false;

                return false;    
            }
        });

        return valid;
    });

    // Validate add to order step
    validators.add('order', (currentStep) => {
        const qtyInputWrap = currentStep.find('.wo17-qty-input-wrap'),
            qty = parseInt(currentStep.find('.wo17-qty').val(), 10);
            
        qtyInputWrap.removeClass('has-error');

        if(!qty || qty < 0) {
            qtyInputWrap.addClass('has-error');
            return false;
        }

        return true;
    });

    const accordion = new Accordion(validators);
    accordion.run();

    // ----------------------------------------------------------------
    // Lightbox 2m video
    // ----------------------------------------------------------------
    const videoLightbox = $(videoLightboxHtml);
    videoLightbox.prependTo('body');

    const lightbox = helpers.lightbox(videoLightbox);
    $('.wo17-init-2m-video').on('click', (e) => {
        lightbox.toggle(e);
    });
    
    // ----------------------------------------------------------------
    // Recess vs exact - what's the difference
    // ----------------------------------------------------------------
    const recessVsExactLightbox = $(lightboxRecessVsExactHtml);
    recessVsExactLightbox.prependTo('body');

    const lightbox2 = helpers.lightbox(recessVsExactLightbox);
    $('.wo17-helper-recess-vs-exact').on('click', (e) => {
        lightbox2.toggle(e);
    });
    
    // ----------------------------------------------------------------
    // When free sample button clicked, add sample straight to basket
    // ----------------------------------------------------------------
    $('.wo17-free-sample-button').on('click', helpers.addFreeSampleToBasket);
    
    // ----------------------------------------------------------------
    // Inputs with number increment/decrement siblings
    // ----------------------------------------------------------------
    [].forEach.call(document.querySelectorAll('.wo17-number-input'), (item) => helpers.numberInput(item));
    
    // ----------------------------------------------------------------
    // Price listener
    //
    // Continuously poll for changes to the price
    // Price container doesn't exist to begin with, but thereafter it
    // remains in the DOM and is updated after changes to chosen options
    // ----------------------------------------------------------------
    const pollPrice = () => {
        const priceContainer = $('#price')
            , beforePrice = priceContainer.find('.sale-message strike').text().trim()
            , totalPriceClone = $('#newPrice').clone();

        totalPriceClone.find('span').remove();

        const totalPrice = totalPriceClone.text().trim();

        $('.wo17-final-price').text(totalPrice);
        $('.wo17-was-price').text(beforePrice);

        setTimeout(() => {
            pollPrice();
        }, 250);
    };

    UC.poller([
        '.price_container #newPrice'
    ], function() {
        $('.wo17-price-prefix').hide();
        $('.wo17-price-suffix').show();
        
        pollPrice();    
    }, {
        multiplier: 1,
        timeout: 1000000
    });

    // ----------------------------------------------------------------
    // Mapping elements
    // e.g. when one of our custom elements is clicked, trigger click
    // on corresponding target element 
    //
    // event-handler|target-element|trigger-event
    // ----------------------------------------------------------------
    $('[data-wo17-map]').each(function(idx, mapElm) {
        const mappingString = $(this).attr('data-wo17-map');
        let mapping = [];

        try {
            mapping = JSON.parse(mappingString);
        } catch(e) {
            return;
        }

        $.each(mapping, (j, item) => {
            const handler = item[0] || null,
                target = item[1] || null,
                trigger = item[2] || null;

            if(handler && target && trigger) {
                switch(trigger) {
                    case 'value':
                        $(mapElm).on(handler, (e) => {
                            $(target).val(mapElm.value);
                            $(target).trigger('keyup'); // Event on target 'original' element
                            $(target).trigger('change'); // Event on target 'original' element
                        });
                        break;
                    default:
                        $(mapElm).on(handler, (e) => {
                            $(target).trigger(trigger);
                        });
                }
            }
        });

    });
    
    // ----------------------------------------------------------------
    // Product right region is hidden so move modal outside of it
    // ----------------------------------------------------------------
    $('.product_right .modal').prependTo($('#product_right'));
    
    // ----------------------------------------------------------------
    // Unit selector
    // 
    // NB On page load a value of mm, inches or cm will be selected
    // This unit selector only uses cm and inches so always do 
    // corresponding faux click on given unit
    // ----------------------------------------------------------------
    const changeUnits = (unitsTo) => {
        $('.wo17-data-unit-text').text(unitsTo);
    };

    const mapToRealUnitChanger = (unitsTo) => {
        switch(unitsTo) {
            case 'inch':
                $('#MeasurementTypeInch')[0].click();
                $('.wo17-inches-fraction').show();
                break;
            case 'cm':
                $('#MeasurementTypeCm')[0].click();
                $('.wo17-inches-fraction').val(0).trigger('change').hide();
                break;
        }
    }

    // On page load
    let chosenUnitsByDefault = $('[name="data[Product][measurement_type]"]:checked').val();
    if(chosenUnitsByDefault == 'mm') {
        chosenUnitsByDefault = 'cm';
    }
    changeUnits(chosenUnitsByDefault);
    mapToRealUnitChanger(chosenUnitsByDefault);

    accordion.setUnit(chosenUnitsByDefault);

    $('.wo17-unit-selector-option').removeClass('wo17-unit-selector-option--selected');
    $('.wo17-unit-selector-option--' + chosenUnitsByDefault).addClass('wo17-unit-selector-option--selected');

    // When unit selector changed
    $('.wo17-unit-selector-option').on('click', (e) => {
        const chosen = $(e.currentTarget)
            , chosenType = chosen.hasClass('wo17-unit-selector-option--inch') ? 'inch' : 'cm';

        accordion.setUnit(chosenType);

        $('.wo17-unit-selector-option').removeClass('wo17-unit-selector-option--selected');
        chosen.addClass('wo17-unit-selector-option--selected');

        changeUnits(chosenType);
        mapToRealUnitChanger(chosenType);
    });
};

// ----------------------------------------------------------------
// Poll required elements
// ----------------------------------------------------------------
UC.poller([
    function() {
        return !!window.jQuery;
    }
], run);
