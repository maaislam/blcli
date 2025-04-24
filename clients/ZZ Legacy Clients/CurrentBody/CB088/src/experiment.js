
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as helpers from './lib/helpers.js';
import clarisonicLightboxHtml from './html/lightbox/clarisonic.js';
import hairLightboxHtml from './html/lightbox/hair.js';
import cache from './lib/cache.js';
import ProductFinder from './lib/product-finder.js';

let $ = null;

window._CB088 = (function() {
    // ----------------------------
    // Event sender
    // ----------------------------
    const eventSender = utils.events.setDefaultCategory('CB088---Product Finder V2');

    /**
     * Which test type is this? Clarisonic or the hair finder...
     */
    const getTestType = () => {
        const matchConditions = [
            {
                match: /currentbody.com\/clarisonic/i,
                testType: 'clarisonic'
            },
            {
                match: /clarisonic/i,
                testType: 'clarisonic'
            },
            {
                match: /nuface-mini-facial-toner.html/i,
                testType: 'clarisonic'
            },
            {
                match: /currentbody.com\/tria-hair-removal-laser-4x.html/i,
                testType: 'hair'
            },
            {
                match: /currentbody.com\/iluminage-?touch.html/i,
                testType: 'hair'
            },
            {
                match: /currentbody.com\/hair-and-nails\/hair-removal.html/i,
                testType: 'hair'
            },
            {
                match: /smoothskin-gold-permanent-hair-removal.html/i,
                testType: 'hair'
            },
            {
                match: /currentbody.com\/hair-and-nails\/hair-removal\/permanent-hair-removal.html/i,
                testType: 'hair'
            },
        ];

        let testType = null;
        $.each(matchConditions, function() {
            var matchRegex = this.match;
            if(window.location.href.match(matchRegex)) {
                testType = this.testType;
                return false;
            }
        });

        return testType;
    };

    /**
     * Build Lightbox
     */
    const buildLightboxAndTab = () => {
        let lightboxHtml = '';

        switch(getTestType()) {
            case 'clarisonic':
                lightboxHtml = clarisonicLightboxHtml;
                break;
            case 'hair':
                lightboxHtml = hairLightboxHtml;
                break;
        }

        const lightboxElms = $(lightboxHtml);
        $('body').prepend(lightboxElms);

        cache.add('side-tab', $('.cb88-sidetab'));

        return $('.cb88-lightbox');
    };

    /**
     * Show sidetab 
     */
    const showSidetab = () => {
        if(localStorage.getItem('cb88-sidetab-disabled') == 1) {
            return false;
        }
        cache.get('side-tab').addClass('cb88-sidetab--active');
    };

    /**
     * Hide sidetab 
     */
    const hideSidetab = () => {
        cache.get('side-tab').removeClass('cb88-sidetab--active');
    };

    /**
     * Remove sidetab
     */
    const removeSidetab = () => {
        hideSidetab();
        window.localStorage.setItem('cb88-sidetab-disabled', 1);
    };

    /**
     * Entry point for test
     */
	const _activate = () => {

        // ----------------------------
        // Setup
        // ----------------------------
        $ = window.jQuery;
        document.body.classList.add('cb88');

        if(!getTestType()) {
            if(typeof window.console != 'undefined') {
                console.log('Error: non-matching URL [CB088]; experiment should not run on this page.');
            }

            return false;
        }

        // ----------------------------
        // Build Lightbox
        // ----------------------------
        const lightboxElm = buildLightboxAndTab();
        const lightboxHelper = helpers.lightbox(lightboxElm, function() {
            lightboxHelper.toggle();
            showSidetab();
        });

        lightboxElm.on('click', '.cb88-close-lightbox', function() {
            lightboxHelper.toggle();
            showSidetab();
        });

        $('.cb88-sidetab__remove').on('click', function(e) {
            e.stopPropagation();

            removeSidetab();
        });

        // ----------------------------
        // Show Lightbox
        // ----------------------------
        cache.get('side-tab').on('click', function() {
            hideSidetab();
            lightboxHelper.toggle();
        });

        setTimeout(function() {
            showSidetab();
        }, 1500);

        // ----------------------------
        // Create product finder
        // ----------------------------
        const productFinder = new ProductFinder(getTestType(), function() {
            showSidetab();
        }, eventSender);
        productFinder.buildProductFinder();

        // ----------------------------
        // Show product finder
        // ----------------------------
        const initProductFinderLinks = $('.cb88-init-product-finder');

        initProductFinderLinks.on('click', (e) => {
            lightboxHelper.toggle(); // Hide lightbox

            // Show product finder
            productFinder.openProductFinder();
        });
        
        // ----------------------------
        // Close product finder
        // ----------------------------
        $('.cb88-product-finder__close').on('click', function() {
            productFinder.closeProductFinder();
        });
        $(document).on('keyup', function(e) {
            const keyCode = e.which || e.keyCode;
            if(keyCode == 27) {
                // Escape key pressed
                productFinder.closeProductFinder();
            }
        });

        // ----------------------------
        // Question answer handling
        // ----------------------------
        $('.cb88-answer').on('click', (e) => {
            productFinder.recordAnswer(e.currentTarget);
        });

        // ----------------------------
        // Header icons go to question
        // ----------------------------
        $('.cb88-product-finder__header').on('click', '.cb88-product-finder__header-icon--active', function() {
            var targetIndex = $(this).attr('data-identifier');
            productFinder.goToSlide(targetIndex);
        });

        // ----------------------------
        // Restart the slider
        // ----------------------------
        $('.cb88-product-finder__restart').on('click', function() {
            productFinder.goToSlide(1);
        });
	};

    /**
     * Trigger test
     */
	const _triggers = () => {
        UC.poller([
            () => {
                return !!window.jQuery;
            }
        ], () => {
            utils.fullStory('CB088', 'Variation 1');

            _activate();
        });
	};

    // Init triggers
	_triggers();

    // Helpers
    return {
        cache: cache
    };

})();
window._CB088();
