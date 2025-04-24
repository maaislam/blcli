// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

let _WB054 = (function() {

    /*--------------------------------------
    Experiment Code
    ---------------------------------------*/
    let _activate = function() {

        // Namespace CSS
        $ = window.jQuery;
        $('body').addClass('WB054');

        let brandName = $('.desiger-info .designer-details .designer-name > a:first').text();

        let htmlCreate = [
            '<div class="WB054_info_Wrapper">',
                '<span class="WB054_close">x</span>',
                '<p class="WB054_lotoText">',
                    'We work with independent brands like ' + brandName +' who we have carefully selected from all over the world.',
                    ' We\'ve made it our mission to provide a platform for emerging designers to thrive by reaching new audiences,',
                    ' and we pride ourselves on curating the world\'s best independent brands.',
                '</p>',
                '<p class="WB054_enjoy">ENJOY DISCOVERING NEW DESIGNERS</p>',
            '</div>'
        ].join('');

        // Insert 'AVAILABLE IN STORE' from top of the page below the product price
        $('.hidden-non-phone .availability').insertAfter('.product-frame .hidden-non-phone');

        let $designerInfo = $('.desiger-info');

        $designerInfo.after(htmlCreate);

        // Close the info banner when clicking 'x'
        $('.WB054_close').on('click',function () {
            $('.WB054_info_Wrapper').hide();
            utils.sendEvent('WB054', 'User closed info banner', 'WB054 - Context for US users landing on PDP', true);
        });

        // Hide wishlist (?it seems)
        $('.wishlist-add-form').hide();

        utils.sendEvent('WB054', 'Page View', 'WB054 - Context for US users landing on PDP', true);

    };

    /*--------------------------------------
    Activation
    ---------------------------------------*/
    let _triggers = function(options) {
        utils.fullStory('WB054', 'Variation 1 All');

        _activate();
    };

    // Run experiment
    _triggers();

})(); // _WB054