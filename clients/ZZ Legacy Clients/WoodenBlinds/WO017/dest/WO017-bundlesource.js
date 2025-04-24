'use strict';

let html = $(`
    <div class="wo17-steps">
        <div class="wo17-step clearfix" data-step="measurements-known-question">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">1.</span> Do you know your measurements?
                </span>
            </div>
            <div class="wo17-step__content">
                <label>
                    <input type="radio" name="wo17-step1" value="1">
                    Yes, I know my measurements
                </label>
                <label>
                    <input type="radio" name="wo17-step1" value="2">
                    No, show me how
                </label>

                <p class="text-center">
                    <button class="wo17-button wo17-init-next-step">Add Measurements</button>
                </p>
            </div>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step wo17-step--hidden clearfix" data-step="measurements-help-recess">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">2.</span> Are your measurements recess or exact?
                </span>
            </div>
            <div class="wo17-step__content">
                <div class="row">
                    <div class="col-sm-6">
                        <label>
                            <input type="radio" name="wo17-recess" value="recess">
                            Recess
                        </label>
                    </div>
                    <div class="col-sm-6">
                        <label>
                            <input type="radio" name="wo17-recess" value="exact">
                            Exact
                        </label>
                    </div>
                </div>
            </div>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step wo17-step--hidden clearfix" data-step="measurements-help-add-measurements">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">3.</span> What are your measurements?
                </span>
            </div>
            <div class="wo17-step__content">
                <p class="text-center">
                    Watch our 2m video on how to measure your blinds
                </p>
                <div class="row">
                    <div class="col-sm-6">
                        <p>Add SureFit protection for just £9.99 at the basket.</p>
                        <p>If it turns out you made some kind of measurement error we will
                            replace your blind absolutely free of charge.</p>
                    </div>
                    <div class="col-sm-6">
                        <button class="wo17-button wo17-init-next-step">Add Measurements</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <p>Order up to 8 FREE samples. We send over 900 free samples every single day to arrive
                            with you in the next 3 working days.</p>
                    </div>
                    <div class="col-sm-6">
                        <button class="wo17-button wo17-init-next-step">Order FREE Sample</button>
                    </div>
                </div>
            </div>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step clearfix" data-step="enter-measurements">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">2.</span> Enter Measurements
                </span>
            </div>
            <div class="wo17-step__content">
                <div class="row">
                    <div class="col-sm-3">
                        Width (cm)
                    </div>
                    <div class="col-sm-3">
                        <input type="text" name="wo17-width" />
                        <span class="wo17-input-desc wo17-width-desc">
                        </span>
                    </div>
                    <div class="col-sm-3">
                        Drop (cm)
                    </div>
                    <div class="col-sm-3">
                        <input type="text" name="wo17-drop" />
                        <span class="wo17-input-desc wo17-drop-desc">
                        </span>
                    </div>
                </div>    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-sm-3">
                                Recess or Exact?

                                <a class="wo17-helper">What's the difference?</a>
                            </div>
                            <div class="col-sm-9">
                                <label>
                                    <input type="radio" name="wo17-recess" value="recess">
                                    Recess
                                </label>
                                <label>
                                    <input type="radio" name="wo17-recess" value="exact">
                                    Exact
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wo17-additional-configuration">
                    <!-- Populated on a per-product basis -->
                </div>
            </div>
            <div class="wo17-surefit">
                <p>Add SureFit protection for just £9.99 at the basket.</p>
                <p>If it turns out you made some kind of measurement error we will
                    replace your blind absolutely free of charge.</p>
            </div>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step clearfix" data-step="order">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">3.</span> Order
                </span>
            </div>
            <div class="wo17-step__grand-total">
                <span class="wo17-price-prefix">
                    From
                </span>
                <span class="wo17-was-price">

                </span>
                <span class="wo17-final-price">
                </span>
            </div>
            <div class="wo17-step__content">
                <div class="row">
                    <div class="col-xs-6">
                        <label>Qty</label>
                        <div class="wo17-qty-input-wrap">
                            <span class="wo17-qty-input-wrap__action wo17-qty-input-wrap__action--minus">-</span>
                            <input name="wo17-qty" type="number">
                            <span class="wo17-qty-input-wrap__action wo17-qty-input-wrap__action--plus">+</span>
                        </div>
                        <p class="wo17-smaller-text">Free delivery over £149.99</p>
                    </div>
                    <div class="col-xs-6">
                        <button class="wo17-button wo17-add-to-cart-button">Add to Cart</button>
                    </div>
                </div>
                <div class="row wo17-free-sample-info">
                    <span class="wo17-or">or</span>
                    <button class="wo17-button wo17-free-sample-button">Order FREE Sample</button>

                    <p class="text-center wo17-smaller-text">
                        Order up to 8 FREE samples. We send over 900 free samples every single day
                        to arrive with you in the next 3 working days
                    </p>
                </div>
            </div>
        </div>
    </div>
`);

// ------------------------------------------
// IMPORTANT!!!!
// _____________________________________
//
// DO NOT EDIT THIS TEST DIRECTLY IN VWO
// _____________________________________
//
// Modify the source in the ab-test-sandbox repo
// since it uses ES6 and is easier to work with there.
// ------------------------------------------

(() => {

    if(document.body.classList.contains('wo17')) {
        return;
    }

    // UC Library - Poller -- @version 0.2.2
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i);},d);},m=0;m<a.length;m++)l(a[m]);},a}(UC||{});
   
    // Send Event
    document.body.classList.add('wo17');

    const imageContainer = $('#content > .row > .col-md-7:first')
        , productRightContainer = $('#content > .row > .col-md-5:first')
        , productRight = $('#product_right')
        , imageViewer = imageContainer.find('.image-viewer:first')
        , addToForm = productRightContainer.find('form:first');

    imageContainer.removeClass('col-md-7').addClass('col-md-6');
    productRightContainer.removeClass('col-md-5').addClass('col-md-6');

    if(imageViewer && imageViewer[0] && imageViewer[0].slick) {
        imageViewer[0].slick.refresh();
    }

    accordionHtml.prependTo(productRightContainer);
})();
