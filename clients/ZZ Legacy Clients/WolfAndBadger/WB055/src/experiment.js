// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------
/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as snippets from './html/snippets.js';

window._WB055 = (function() {
    // Event sending
    const eventSender = utils.events.setDefaultCategory('WB055---Homepage-Product-Promotion');

    // jQuery
    let $ = null;

    /**
     * Entry point for experiment running
     */
	const _activate = () => {
		document.body.classList.add('wb55');

        // --------------------------------------------------------------
        // Logo caption
        // --------------------------------------------------------------
        //$('#header .navbar').prepend(snippets.logoCaption);

        // --------------------------------------------------------------
        // Headline - Curated UPDATED to Unique
        // --------------------------------------------------------------
        $('#header > .usp-bar').after(snippets.headlineUnique);

        // --------------------------------------------------------------
        // 'Just Landed' New Products
        // --------------------------------------------------------------
        $('.wb55-headline--unique').after(snippets.newProductsContainer);

        const products = $('.recommended-products-box.bottom .products .product-summary');
        $('.wb55-discover-new__products').append(products);

        $('.wb55-discover-new__products .product-summary:eq(2)').after(snippets.womensNewIn);

        // --------------------------------------------------------------
        // Headline - Fashion, UPDATED to Curated
        // --------------------------------------------------------------
        $('.wb55-discover-new').after(snippets.headlineCurated);

        // --------------------------------------------------------------
        // Editors Picks Products
        // --------------------------------------------------------------
        $('.wb55-headline--curated').after(snippets.editorsProductsContainer);

        const editorsPicksProducts = $('.recommended-products-box.top .products .product-summary');
        $('.wb55-editors-picks__products').append(editorsPicksProducts);

        $('.wb55-editors-picks__products .product-summary:eq(2)').after(snippets.shopHomeware);

        // --------------------------------------------------------------
        // Home Category boxes (Womens / Mens / Kids)
        // --------------------------------------------------------------
        
        // Replace mens links
        const mensBox = $('#home-category-boxes .row-fluid.top_row .span6:last');
        // Add resizing class to mens box
        mensBox.addClass('WB055-Box');
        mensBox.find('.toplinks').html(snippets.menNewTopLinks);

        // We rebuild the kids box to match the mens / womens with additional links
        const kidsBox = $('#home-category-boxes .row-fluid.bottom-row .span6:first')
            , kidsImageUrl = document.querySelector('#home-category-boxes > .bottom-row .span6:last-child .image-container > a > img').src;

        $('#home-category-boxes .row-fluid.top_row .span6:last-child').addClass('WB055_height-set');
        $('#home-category-boxes .row-fluid.top_row').append(snippets.getKidsBox(kidsImageUrl));

        // Get the image for mens, add it to a span as background image

        const WB055mensBGImage = document.querySelector('.WB055-Box.WB055_height-set > .category_box > .image-container > a > img').src;
        document.querySelector('.WB055-Box.WB055_height-set > .category_box > .image-container > a').insertAdjacentHTML('afterbegin', `
        <span class="WB055-BG-Image" style="background-image: url(${WB055mensBGImage})"></span>
        `)
        
        // --------------------------------------------------------------
        // Our Story
        // --------------------------------------------------------------
        $('#homepage-boxes').after(snippets.ourStory);

        // --------------------------------------------------------------
        // Feature
        // --------------------------------------------------------------
        $('.wb55-our-story').after(`
            <div class="wb55-feature-wrap"></div>
        `);

        const featureContent = $('#homepage-boxes .span6:first .box:first');
        featureContent.appendTo('.wb55-feature-wrap');

        // --------------------------------------------------------------
        // Designer support
        // --------------------------------------------------------------
        // $('.wb55-feature-wrap').after(snippets.headlineDesignerSupport);

        // --------------------------------------------------------------
        // Designer spotlight
        // --------------------------------------------------------------
        $('.wb55-headline--designer-support').after(`
            <div class="wb55-designer-wrap"></div>
        `);

        const designerContent = $('#homepage-boxes .homecolumn .box:first');
        designerContent.appendTo('.wb55-designer-wrap');

        const designerText = designerContent.find('table td:first').text().trim();
        $('.wb55-designer-wrap').append(`
            <div class="wb55-designer-text">
                <p class="wb55-mt15">${designerText}</p>
            </div>
        `);

        // --------------------------------------------------------------
        // Olapic instagram feed
        // --------------------------------------------------------------
        $('.wb55-designer-wrap').after(`
            <div class="wb55-olapic-wrapper"></div>
        `);
        $('.wb55-olapic-wrapper').append($('#homepage-boxes .box.olapic'));
        
        // --------------------------------------------------------------
        // Show our stores box - only for users in New York or London
        // --------------------------------------------------------------
        $('.wb55-olapic-wrapper').after(`
            <div class="wb55-our-stores-wrapper"></div>
        `);

        let didShowStores = false;
        if(typeof options != 'undefined') {
            // Qubit options
            if(options.getVisitorState() && options.getVisitorState().value) {
                const areaCode = options.getVisitorState().value.areaCode;

                // Only show for London && New York 
                if(areaCode == '826044' || areaCode == '501') {
                    const ourStoresBox = $('.row-fluid.boxes-bottom > .box:first');
                    $('.wb55-our-stores-wrapper').append(ourStoresBox);

                    didShowStores = true;
                }
            }
        }

        // --------------------------------------------------------------
        // Show article from The Sett, but give this new title
        // --------------------------------------------------------------
        $('.wb55-our-stores-wrapper').after(`
            <div class="wb55-sett-wrapper"></div>
        `);
        
        const settArticle = $('.row-fluid.boxes-bottom > .box:nth-child(' + (didShowStores ? '1' : '2') + ')');
        settArticle.find('h5').text('Catch up on Fashion and Travel in The Sett');
        $('.wb55-sett-wrapper').append(settArticle);
        
        // Set the correct height for home and men boxes, based on largest height

        if ($('.WB055_height-match .undertopimagelinks').height() > $('.WB055_height-set .undertopimagelinks').height()) {
          $('.WB055_height-set .undertopimagelinks').height($('.WB055_height-match .undertopimagelinks').height());
        } else {
          $('.WB055_height-match .undertopimagelinks').height($('.WB055_height-set .undertopimagelinks').height());
        }
       
        $( window ).resize(function() {
          if ($('.WB055_height-match .undertopimagelinks').height() > $('.WB055_height-set .undertopimagelinks').height()) {
            $('.WB055_height-set .undertopimagelinks').height($('.WB055_height-match .undertopimagelinks').height());
          } else {
            $('.WB055_height-match .undertopimagelinks').height($('.WB055_height-set .undertopimagelinks').height());
          }

        });
	};

    /**
     * Trigger test
     */
	const _triggers = (options) => {
        UC.poller([
            '#header > .usp-bar',
            '.recommended-products-box.bottom .products .product-summary',
            '.recommended-products-box.top .products .product-summary',
            () => {
                return !!window.jQuery;
            }
        ], () => {
            utils.fullStory('WB055', 'Variation 1');

            $ = window.jQuery;

            _activate();
        });
	};

	// Run experiment
	_triggers();

})();
