// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as htmlstuff from '../htmlstuff/html';

let _WO018 = (function () {

    /*--------------------------------------
    Experiment Code
    ---------------------------------------*/
    let _activate = function () {

        // Namespace CSS
        let $ = window.jQuery;
        $('body').addClass('WO018');

        // Run test (different outputs for different pages the user is on ---> (homepage, category, product))
        let runTest = () => {
            // Regex obj (for the 3 targeted pages)
            let regexObj = {
                'HomePage': /^https:\/\/www.wooden-blinds-direct.co.uk\/$/,
                'CategoryPage': /^https:\/\/www.wooden-blinds-direct.co.uk\/(wooden-venetian-blinds|aluminium-venetian-blinds)\/.*/,
                'ProductPage': /^https:\/\/www.wooden-blinds-direct.co.uk\/stores\/product\/.*/
            };

            // Check what pages the users are on -> and access their corresponding functions
            if (regexObj.HomePage.test(location.href) === true) {
                homepageFunction();
            } else if (regexObj.CategoryPage.test(location.href) === true) {
                categorypageFunction();
            } else if (regexObj.ProductPage.test(location.href) === true) {
                productpageFunction();
            }

        }; // runTest

        // If user is on home page
        let homepageFunction = () => {
            // hide original (thin) sale banner (only on homepage)
            //$('.sale-banner').hide();
            let $homeBannerWrapper = $('.col-md-12.mobile-usp');
            // Insert the html for the banner
            $homeBannerWrapper.prepend(htmlstuff.homepageHTML);

            // Evt list allow users to toggle the contents of the banner
            $('.WO018_hPage__header_wrapper').on('click', () => {
                $('.WO018_hPage__content_wrapper').slideToggle('slow');
            });
        };

        // If user is on category page
        let categorypageFunction = () => {
            // Category wrapper
            let $thumbnails = $('#thumbnails');
            // Cache individual products in category -> every 4th product will be 'replaced' with a message
            let $productsCollection = $thumbnails.find(' > .flex-thumbs > div');

            // CategoryMessage object to store the html for the 3 different messages
            let categoryMessage = {
                1: htmlstuff.categorypageHTML(htmlstuff.categoryMsg1, htmlstuff.imagesObj.first),
                2: htmlstuff.categorypageHTML(htmlstuff.categoryMsg2, htmlstuff.imagesObj.second),
                3: htmlstuff.categorypageHTML(htmlstuff.categoryMsg3, htmlstuff.imagesObj.third)
            };

            // This will be used to make sure messages are inserted in order (1,2,3,1,2,3,1...)
            let ctgMsgCoordinator = 1;

            /*
                Insert a message 'in place of' every 4th product in the
                order -> (msg1, 2, 3, 1, 2, 3, 1...)
                Start with the 3rd product (so index 2)
                Replacing 4th product means in this context insert the msg html after the third product
            */
            for (let i = 2; i < $productsCollection.length; i+=3) { // Remember 0-based indexing
                $productsCollection.eq(i).after(categoryMessage[ctgMsgCoordinator]);
                ctgMsgCoordinator = (ctgMsgCoordinator === 3) ? 1 : ctgMsgCoordinator + 1;
            } // for

        }; // categorypageFunction

        // If user is on product page
        let productpageFunction = () => {
            // Need to hide this inside js (as only want to do it on 'product' pages)
            $('.col-md-12.mobile-usp > .usps').hide();
            // Insert product banner into the bage/replace previous one
            $('.col-md-12.mobile-usp').prepend(htmlstuff.productpageHTML);

            // Slick slider (auto)
            $('.WO018_prodPage_banner_wrapper').slick({
                slide: '.WO018_prodPag_banner--coloumn',
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                responsive: [
                    // Don't 'slick' for min-width:1024px
                    {
                        breakpoint: 5000,
                        settings: "unslick"
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }); // slick

            // Fix an existing issue with the slick slider
            // Enable it again on resize/orchg
            $(window).on('resize orientationchange', function() {
                $('.WO018_prodPage_banner_wrapper').slick('resize');
            });

        };

        // Run test (different outputs for different pages the user is on ---> (homepage, category, product))
        runTest();

        utils.events.send('WO018', 'Page View', 'WO018 - Made in UK USPs', true);

    };

    /*--------------------------------------
    Activation
    ---------------------------------------*/
    let _triggers = (options) => {
        utils.fullStory('WO018', 'Variation 1 Mobile/Tablet/Desktop');

        UC.poller([
            () => {
                return window.jQuery
            },
            () => {
                return window.ga
            }
        ], _activate);
    };

    // Run experiment
    _triggers();

})(); // _WO018