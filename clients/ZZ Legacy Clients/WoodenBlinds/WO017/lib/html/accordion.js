const accordionHtml = `
    <div class="wo17-steps">
        <div class="wo17-step clearfix" data-step="measurements-known-question" data-default-step="1">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">1.</span> Have you measured your blinds?
                </span>
            </div>
            <div class="wo17-step__content">
                <label>
                    <input type="radio" name="wo17-step1" checked="checked" value="1">
                    Yes, I know my measurements
                </label>
                <label>
                    <input type="radio" name="wo17-step1" value="2">
                    No, show me how
                </label>

                <p class="text-center wo17-mt15 wo17-mb0">
                    <button class="wo17-button wo17-init-next-step">Continue</button>
                </p>
            </div>
            <span class="wo17-step__change">
                <i class="fa fa-pencil"></i>
                <span>Change</span>
            </span>
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
                <p>If you want your blind to sit inside the window recess then select the <em>recess</em> measurement we will deduct 1.5cm from the width to ensure it fits neatly inside the recess.</p>
                <p>If you want us to make the blind exactly to the size you specify select the exact size. We will not make any deductions from the size.</p>

                <div class="row wo17-mt15">
                    <div class="col-sm-6">
                        <label>
                            <img class="wo17-label-feature-image" src="https://cdn.interiorgoodsdirect.com/woodens/img/product/options/inside-recess-width-web.jpg" /> 
                            <input type="radio" name="wo17-help-recess" checked="checked" 
                                data-wo17-map='[
                                    ["click", "[name=wo17-recess][value=recess]", "click"]
                                ]' 
                                value="recess">
                            Recess
                            <span class="wo17-label-extra-info wo17-cgreen">
                                <i class="fa fa-thumbs-up"></i>
                                Most popular form of measurement
                            </span>
                        </label>
                    </div>
                    <div class="col-sm-6">
                        <label>
                            <img class="wo17-label-feature-image" src="https://cdn.interiorgoodsdirect.com/woodens/img/product/options/exact-blind-size.jpg" /> 
                            <input type="radio" name="wo17-help-recess" 
                                data-wo17-map='[
                                    ["click", "[name=wo17-recess][value=exact]", "click"]
                                ]' 
                                value="exact">
                            Exact
                        </label>
                    </div>
                </div>

                <p class="text-center wo17-mt15 wo17-mb0">
                    <button class="wo17-button wo17-init-next-step">Continue</button>
                </p>
            </div>
            <span class="wo17-step__change">
                <i class="fa fa-pencil"></i>
                <span>Change</span>
            </span>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step wo17-step--hidden wo17-step--inactive clearfix" data-step="measurements-help-add-measurements">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">3.</span> What are your measurements?
                </span>
            </div>
            <div class="wo17-step__content">
                <p class="text-center wo17-mb15">
                    <a href class="wo17-init-2m-video">
                        <i class="fa fa-play"></i>
                        Watch our 2m video on how to measure your blinds
                    </a>
                </p>
                <div class="row wo17-flex wo17-aic">
                    <div class="col-sm-6">
                        <p>Add SureFit protection for just £9.99 at the basket.</p>
                        <p class="wo17-mb0">If it turns out you made some kind of measurement error we will
                            replace your blind absolutely free of charge.</p>
                    </div>
                    <div class="col-sm-6">
                        <button class="wo17-button wo17-init-next-step">Add Measurements</button>
                    </div>
                </div>
                <div class="row wo17-flex wo17-aic wo17-mt15">
                    <div class="col-sm-6">
                        <p class="wo17-mb0">Order up to 8 FREE samples. We send over 900 free samples every single day to arrive
                            with you in the next 3 working days.</p>
                    </div>
                    <div class="col-sm-6">
                        <button class="wo17-button wo17-free-sample-button">Order FREE Sample</button>
                    </div>
                </div>
            </div>
            <span class="wo17-step__change">
                <i class="fa fa-pencil"></i>
                <span>Change</span>
            </span>
            <div class="wo17-step__summary">
            </div>
        </div>
        <div class="wo17-step wo17-step--inactive clearfix" data-step="enter-measurements">
            <div class="wo17-step__title">
                <span class="wo17-step__title-text">
                    <span class="wo17-step__title-prefix">2.</span> Enter Measurements
                </span>
            </div>
            <div class="wo17-unit-selector clearfix">
                <span class="wo17-unit-selector-option wo17-unit-selector-option--inch">
                    <label>inches</label>
                    <em></em>
                </span>
                <span class="wo17-unit-selector-option wo17-unit-selector-option--cm wo17-unit-selector-option--selected">
                    <em></em>
                    <label>cm</label>
                </span>
            </div>
            <div class="wo17-step__content">
                <div class="form-inline">
                    <div class="form-group clearfix">
                        <div class="wo17-width-wrap pull-left wo17-mr15">
                            <label>
                                Width (<span class="wo17-data-unit-text">cm</span>)
                            </label>
                            <input 
                                data-wo17-map='[
                                    ["keyup blur", "#width", "value"]
                                ]' 
                                type="number" class="form-control wo17-small-input" name="wo17-width" />
                            <select 
                                data-wo17-map='[
                                    ["change", "#buyFractionWidth", "value"]
                                ]' 
                                class="form-control wo17-inches-fraction" name="wo17-width-inches-fraction">
                                    <option value="0">0</option>
                                    <option value="0.125">1/8</option>
                                    <option value="0.25">1/4</option>
                                    <option value="0.375">3/8</option>
                                    <option value="0.5">1/2</option>
                                    <option value="0.625">5/8</option>
                                    <option value="0.75">3/4</option>
                                    <option value="0.875">7/8</option>
                            </select>
                            <span class="wo17-error-msg"></span>
                            <span class="wo17-input-desc wo17-width-desc">
                            </span>
                        </div>

                        <div class="wo17-drop-wrap pull-left">
                            <label>
                                Drop (<span class="wo17-data-unit-text">cm</span>)
                            </label>
                            <input 
                                data-wo17-map='[
                                    ["keyup blur", "#drop", "value"]
                                ]' 
                                type="number" class="form-control wo17-small-input" name="wo17-drop" />
                            <select 
                                data-wo17-map='[
                                    ["change", "#buyFractionDrop", "value"]
                                ]' 
                                class="form-control wo17-inches-fraction" name="wo17-drop-inches-fraction">
                                    <option value="0">0</option>
                                    <option value="0.125">1/8</option>
                                    <option value="0.25">1/4</option>
                                    <option value="0.375">3/8</option>
                                    <option value="0.5">1/2</option>
                                    <option value="0.625">5/8</option>
                                    <option value="0.75">3/4</option>
                                    <option value="0.875">7/8</option>
                            </select>
                            <span class="wo17-error-msg"></span>
                            <span class="wo17-input-desc wo17-drop-desc">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="form-group wo17-recess-or-exact-option">
                    <div class="row">
                        <div class="col-sm-4">
                            <span class="wo17-label-column">Recess or Exact?</span>

                            <a class="wo17-helper wo17-helper-recess-vs-exact">What's the difference?</a>
                        </div>
                        <div class="col-sm-4">
                            <label>
                                <img class="wo17-label-feature-image" src="https://cdn.interiorgoodsdirect.com/woodens/img/product/options/inside-recess-width-web.jpg" /> 
                                <input 
                                    data-wo17-map='[
                                        ["click", "#Option847", "click"],
                                        ["click", "[name=wo17-help-recess]:first", "checked"]
                                    ]' 
                                    type="radio" name="wo17-recess" checked="checked" value="recess">
                                Recess
                            </label>
                        </div>
                        <div class="col-sm-4">
                            <label>
                                <img class="wo17-label-feature-image" src="https://cdn.interiorgoodsdirect.com/woodens/img/product/options/exact-blind-size.jpg" /> 
                                <input 
                                    data-wo17-map='[
                                        ["click", "#Option846", "click"],
                                        ["click", "[name=wo17-help-recess]:last", "checked"]
                                    ]' 
                                    type="radio" name="wo17-recess" value="exact">
                                Exact
                            </label>
                        </div>
                    </div>
                </div>

                <div class="wo17-additional-configuration">
                    <!-- Populated on a per-product basis -->
                </div>

                <p class="text-center wo17-mt15 wo17-mb0">
                    <button class="wo17-button wo17-init-next-step">Continue</button>
                </p>
            </div>
            <span class="wo17-step__change">
                <i class="fa fa-pencil"></i>
                <span>Change</span>
            </span>
            <div class="wo17-step__summary">
            </div>
            <div class="wo17-step__surefit">
                <p>Add SureFit protection for just £9.99 at the basket.</p>
                <p>If it turns out you made some kind of measurement error we will
                    replace your blind absolutely free of charge.</p>
            </div>
        </div>
        <div class="wo17-step wo17-step--inactive clearfix" data-step="order">
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
                <span class="wo17-price-suffix">
                    inc. VAT
                </span>
            </div>
            <div class="wo17-step__content">
                <div class="row wo17-flex wo17-aic">
                    <div class="col-xs-6">
                        <label class="wo17-b wo17-mb5">Qty</label>
                        <div class="wo17-qty-input-wrap form-group clearfix">
                            <span class="wo17-qty-input-wrap__action wo17-qty-input-wrap__action--minus">-</span>
                            <input name="wo17-qty" class="form-control wo17-qty wo17-number-input" 
                                data-wo17-map='[
                                    ["blur", ".qty-row input.js-quantity", "value"]
                                ]' 
                                type="number" min="1" value="1">
                            <span class="wo17-qty-input-wrap__action wo17-qty-input-wrap__action--plus">+</span>
                        </div>
                        <p class="wo17-smaller-text wo17-mb0 wo17-mt5">Free delivery over £149.99</p>
                    </div>
                    <div class="col-xs-6 text-right">
                        <button 
                            data-wo17-map='[
                                ["click", "#buy_it", "click"]
                            ]' 
                            class="wo17-button wo17-add-to-cart-button">Add to Cart</button>
                    </div>
                </div>
                <div class="row wo17-free-sample-info">
                    <div class="text-center wo17-mb15 wo17-rel">
                        <span class="wo17-or">or</span>
                        <button 
                            data-wo17-map='[
                                ["click", "#sample form.free_sample", "submit"]
                            ]' 
                            class="wo17-button wo17-free-sample-button">Order FREE Sample</button>
                    </div>

                    <p class="text-center wo17-smaller-text wo17-mw350 wo17-mauto wo17-mb0">
                        Order up to 8 FREE samples. We send over 900 free samples every single day
                        to arrive with you in the next 3 working days
                    </p>
                </div>
            </div>
        </div>
    </div>
`;

export default accordionHtml;
