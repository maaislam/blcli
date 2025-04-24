var _SO005 = (function(){

var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Triggers
    UC.poller([
        'body',
        '#product_addtocart_form',
        //'.product-options-wrapper',
        '.data.table.additional-attributes',
        '.product-info-stock-sku',
        '.product-right-content',
        '.product-left-content',
        '.product.attribute.description',
        function() {
            if (window.jQuery) return true;
        },
        function() {
            if (window.ga) return true;
        }
    ], SO005, {
        timeout: 7000,
        multiplier: 'disable'
    });
    
    function SO005() {
        var $ = window.jQuery;

        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'SO005',
                variation_str: 'Variation 1'
            });
        }, {
            multiplier: 1.2,
            timeout: 0
        });

        $('body').addClass('SO005');

        var productContent = $('#product-content-wrapper');


        /*-----------product specs at top & Read more desc-----------*/
        productContent.find('.product.attribute.overview').append('<div class="so5-readMore"><span><a href="#so5-specs">See more product details</a></span></div>');
        productContent.find('.data.table.additional-attributes tr:eq(1),.data.table.additional-attributes tr:eq(2)');


        
        var specText = $('.data.table.additional-attributes tr th');

        $('.data.table.additional-attributes tr').each(function(){
            var specTextLabel = $(this).find('.col.label').text().trim();

            if(specTextLabel === 'Material'){
                $(this).closest('tr').clone().prependTo('.so5-readMore');
            }
            if(specTextLabel === 'Filling'){
                $(this).closest('tr').clone().prependTo('.so5-readMore');
            }
            if(specTextLabel === 'Threadcount'){
                $(this).closest('tr').clone().prependTo('.so5-readMore');
            }

        });
  
        $('.so5-readMore a').on('click', function (e) {
            e.preventDefault();
            var thisTarget = $(this).attr('href');
            var targetOffset = $(thisTarget).offset().top - 100;
            $('body,html').animate({
                scrollTop: targetOffset
            }, 600);
        });

        /*-----------Move product add to basket area if delivery info exists-----------*/
        var deliveryInfo = $('.delivery-counter'),
            productForm = $('#product_addtocart_form');

        if (deliveryInfo.length > 0) {
            deliveryInfo.find('.delivery-content .delivery-content').addClass('so5-deliveryUSP').appendTo(productForm);

            var productOptions = $('.product-options-wrapper');
            var newPricewrap;

            if(productOptions.length > 0){
                $('.product-info-price, .product-info-stock-sku, .product-options-bottom').wrapAll('<div class="so5-priceWrap"/>');
                newPricewrap = $('.so5-priceWrap').insertAfter('.product-options-wrapper');
            }else{
                $('.product-info-price, .product-info-stock-sku , .box-tocart').wrapAll('<div class="so5-priceWrap"/>');
                newPricewrap = $('.so5-priceWrap').insertAfter('.field.qty-box');
            }

        
            //countdown
            var countdown = $('.delivery-counter');
            countdown.insertAfter(productForm);

            //deliveryUsps
            newPricewrap.find('.product-info-stock-sku').prependTo('.so5-deliveryUSP');
            $('.delivery-content.so5-deliveryUSP li').each(function () {
                $(this).before('<span>&#10003;</span>');
            });

            var pollerOpts = {
                timeout: 7000,
                multiplier: 0
            };

            UC.poller(['.stock.available .stock-content.instock'], function () {
                $('<span>&#10003;</span>').prependTo('.stock.available .stock-content.instock');
            }, pollerOpts);

        }else{
            $('.product-info-price, .product-add-form .product-info-stock-sku').wrapAll('<div class="so5-noCountdownWrap"/>');
            $('.so5-noCountdownWrap').insertAfter('.product-options-wrapper');
        }

        /*-----------product specifications bottom elements-----------*/
        productContent.find('.product.media').insertAfter('.product-right-content');

        //moving interactive image and inlining the text with it

        var productSpecstest = $('.product.attribute.description'),
            productSpecslist = $('.additional-attributes-wrapper.table-wrapper');

        $('.hero-image-desc.desc-two').appendTo('.hero-main-image');
        $(productSpecslist).appendTo('.product.attribute.description');
        $(productSpecstest, productSpecslist).wrapAll('<div class="so5-productdesc-bottom"/>');


        var productSpecsBlock = $('.product-left-content');
        productSpecsBlock.prepend('<h3 id ="so5-specs" class="so5-specsTitle">Product Specification</h3>');

        /*-----------Reviews-----------*/
        $('.detailed-reviews').insertBefore('.product-left-content')
            .prepend('<h3 id ="so5-reviews" class="so5-reviewsTitle">Customer Reviews</h3>');


        //Bottom Products
        var pollerOpts = {
            timeout: 8000,
            multiplier: 0
        };

        UC.poller(['.products.wrapper.grid.products-grid.products-upsell'], function () {
            $('.products.wrapper.grid.products-grid.products-upsell .stock.available span').prepend('<span>&#10003;</span>');
        }, pollerOpts);

    }

    })(jQuery);
