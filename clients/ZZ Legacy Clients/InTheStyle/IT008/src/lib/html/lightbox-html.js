const lightboxHtml = `
    <div class="it8-lightbox">
        <span class="it8-lightbox__bg"></span>

        <div class="it8-lightbox__bg"></div>

        <div class="it8-lightbox__content">
            <span class="it8-lightbox__close it8-close-button">&times;</span>

            <div class="it8-slide it8-slide--capture it8-slide--active" data-slide-identifier="intro">
                <h2 class="it8-slide__heading">
                    Size Guide
                </h2>

                <form class="it8-capture-form">
                    <fieldset class="clearfix">
                        <label class="it8-col-xs-4 it8-text-center">
                            <img src="//www.sitegainer.com/fu/up/ewbaf6twgvmylaw.png" />
                            <span>
                                Waist
                            </span>
                        </label>
                        <div class="it8-capture-form__control it8-col-xs-8">
                            <div class="clearfix">
                                <div class="it8-col-xs-6">
                                    <input name="it8-waist" class="it8-capture-field" type="number">

                                    <span class="it8-pink it8-field-desc" data-load-slide="help">
                                        ? help me    
                                    </span>
                                </div>
                                <div class="it8-col-xs-6">
                                    <span class="it8-field-suffix">inches</span>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="clearfix">
                        <label class="it8-col-xs-4 it8-text-center">
                            <img src="//www.sitegainer.com/fu/up/x9rgsaeztpu7qv1.png" />
                            <span>
                                Hips
                            </span>
                        </label>
                        <div class="it8-capture-form__control it8-col-xs-8">
                            <div class="clearfix">
                                <div class="it8-col-xs-6">
                                    <input name="it8-hips" class="it8-capture-field" type="number">

                                    <span class="it8-pink it8-field-desc" data-load-slide="help">
                                        ? help me    
                                    </span>
                                </div>
                                <div class="it8-col-xs-6">
                                    <span class="it8-field-suffix">inches</span>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="clearfix">
                        <label class="it8-col-xs-4 it8-text-center">
                            <img src="//www.sitegainer.com/fu/up/si17at9y86q0pnb.png" />
                            <span>
                                Bust
                            </span>
                        </label>
                        <div class="it8-capture-form__control it8-col-xs-8">
                            <div class="clearfix">
                                <div class="it8-col-xs-6">
                                    <input name="it8-bust" class="it8-capture-field" type="number">

                                    <span class="it8-field-desc it8-pink" data-load-slide="help">
                                        ? help me    
                                    </span>
                                </div>
                                <div class="it8-col-xs-6">
                                    <span class="it8-field-suffix">inches</span>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <p class="it8-slide__actions">
                        <button class="it8-lightbox__action it8-btn it8-find-my-size">Find My Size</button>
                    </p>
                </form>
            </div>

            <div class="it8-slide it8-slide--help" data-slide-identifier="help">
                <h2 class="it8-slide__heading">
                    How to Measure
                </h2>
                
                <p class="it8-m-b20">
                    <a class="it8-arrow-link it8-m-b20" data-load-slide="intro" data-clear-form-fields="true">
                        <span class="it8-pink">&larr;</span> Go back
                    </a>
                </p>

                <div class="clearfix">
                    <div class="it8-col-xs-6 it8-text-center">
                        <img src="//www.sitegainer.com/fu/up/rdoeqqo1kthrimv.png" class="it8-mw120 it8-help__infographic it8-img">
                    </div>
                    <div class="it8-col-xs-6">
                        <div>
                            <h4 class="it8-img-heading">
                                <img src="//www.sitegainer.com/fu/up/ewbaf6twgvmylaw.png" />
                                Waist
                            </h4>
                            <p class="it8-f-s12">
                                Measure the smallest part just above your belly button
                                measuring around your whole body.
                            </p>
                        </div>
                        <div>
                            <h4 class="it8-img-heading">
                                <img src="//www.sitegainer.com/fu/up/x9rgsaeztpu7qv1.png" />
                                Hips
                            </h4>
                            <p class="it8-f-s12">
                                Measure in line with your hip bone around your whole body.
                            </p>
                        </div>
                        <div>
                            <h4 class="it8-img-heading">
                                <img src="//www.sitegainer.com/fu/up/si17at9y86q0pnb.png" />
                                Bust
                            </h4>
                            <p class="it8-f-s12">
                                Measure the fullest part of your bust around your whole body.
                            </p>
                        </div>
                    </div>
                </div>

                <p class="it8-slide__actions clearfix it8-clear it8-text-center">
                    <a class="it8-arrow-link" data-load-slide="intro" data-clear-form-fields="true">
                        <span class="it8-pink">&larr;</span> Go back
                    </a>
                </p>
            </div>

            <div class="it8-slide it8-slide--result" data-slide-identifier="result">
                <h2 class="it8-slide__heading">
                    My Size
                </h2>

                <div class="it8-result-box it8-bg-lightgrey it8-pa15">
                    <h3 class="it8-result-box__title it8-text-center">
                        We recommend a...
                    </h3>

                    <p class="it8-result-box__size it8-pink it8-text-center">
                    </p>

                    <div class="it8-country-dropdown">
                        <div class="it8-country-dropdown__select">
                            <span class="it8-country-dropdown__select-title it8-text-center">
                                Showing
                                <i class="it8-flag it8-flag-active it8-flag--uk"></i>
                                sizes

                                <strong class="it8-country-dropdown__indicator">Change</strong>
                            </span>
                            <div class="it8-country-dropdown__options-wrap">
                                <div class="it8-country-dropdown__options">
                                    <span class="it8-country-dropdown__option" data-value="us">
                                        <i class="it8-flag it8-flag--us"></i>
                                        US Sizes
                                    </span>
                                    <span class="it8-country-dropdown__option" data-value="eu">
                                        <i class="it8-flag it8-flag--eu"></i>
                                        EU Sizes
                                    </span>
                                    <span class="it8-country-dropdown__option" data-value="uk">
                                        <i class="it8-flag it8-flag--uk"></i>
                                        UK Sizes
                                    </span>
                                    <span class="it8-country-dropdown__option" data-value="au">
                                        <i class="it8-flag it8-flag--au"></i>
                                        AUS Sizes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="it8-start-again it8-m-b10 it8-m-t10 it8-bb1 it8-bc-midgrey it8-pa-l10 it8-pa-r10 it8-pa-b10">
                    <strong class="it8-arrow-link" 
                        data-load-slide="intro" data-clear-form-fields="true">
                        <span class="it8-pink">&larr;</span> Start again</strong>
                </div>

                <p class="it8-slide__actions">
                    <button class="it8-lightbox__action it8-btn it8-close-button">Finish</button>
                </p>
            </div>

        </div>
    </div> 
`;

export default lightboxHtml;
