/* eslint-disable */
(function ($) {

    /**
     * UC Library - Poller
     * @version 0.2.2
     */
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Triggers
    UC.poller([
        '#s7ProductDetailsImage_container',
        '.tpInfoWrapper .tp_prodPrice .product_price_section',
        '.featureClass li',
        '#addToCartForm',
        function () {
            if (window.jQuery) return true;
        },
        function () {
            if (window.ga) return true;
        }
    ], TP026, {
        timeout: 7000,
        multiplier: 0
    });

    // Variation
    function TP026() {
        var $ = window.jQuery;
      
        // Full Story Integration
        UC.poller([
        function() {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
            }
        ], function () {
          FS.setUserVars({
              experiment_str: 'TP026',
              variation_str: 'Variation 1 Mobile'
          });
        }, { multiplier: 1.2, timeout: 0 });
        
        var $loader = $('<div id="UC_page-overlay"><div class="UC_loading-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></div></div>');
$('body').prepend($loader);
        
        setTimeout(function(){
              $loader.hide();
        }, 6000);
        

        $('body').addClass('TP026');


        var loginLink = $('.yCmsComponent.logInForTradePricesLink'),
            productPrice = $('.tpInfoWrapper .tp_prodPrice'),
            priceexVAT = productPrice.find('.product_price_section'),
            priceincVAT = productPrice.find('.price_inc_vat_section');


        /*Price Toggle*/
      
      var loggedIn = $('.nav-user-header .logout-m');

      if (!loggedIn.length > 0){

         priceexVAT.removeClass('tp26-loggedIn');
        /*Price Toggle*/
      
        var toggle = $('<div class="tp26-toggle"><label class="toggle"><span class="ex-vat">ex VAT</span><input id="tp26-togglecheckbox" type="checkbox"><div class="slide-toggle"></div><span>inc VAT</span></label></div>');productPrice.find('.prices_holder').append(toggle);


        $('#tp26-togglecheckbox').prop('checked', true);

        $('#tp26-togglecheckbox').change(function () {
            if ($(this).is(':checked') == false) {
                priceexVAT.addClass('visible');
                priceincVAT.addClass('hidden');

            } else {
                priceexVAT.removeClass('visible');
                priceincVAT.removeClass('hidden');
  
            }
        });
        
          }else{
		priceexVAT.addClass('tp26-loggedIn');
      }



        /*product desc*/
        $('<div class="tp26-description"><ul class="tp26-list"></ul</div>').insertAfter(productPrice);

        $('.featureClass li:lt(3)').addClass('tp26-product-li').clone().prependTo('.tp26-list');

        var descLinks = $(
        ['<div class="tp26-descLinks">',
            '<div class="tp26-moreLink">',
                '<a href="#tp26_overview">Read More</a>',
            '</div>',
        '</div>'].join(''));

        descLinks.appendTo('.tp26-description');


        $('<p class="tpimageText">Double Tap to Zoom</p>').appendTo('#s7ProductDetailsImage_container');

        if ($('#s7ProductDetailsImage_swatches').is(":visible")) {
            $('#s7ProductDetailsImage_flyout').addClass('tp26-nothumb');
        }

        loginLink.prependTo('.tp26-description');

        /*Buttons*/
        $('#tpPdpRightPanelComponent .ccButton').insertAfter('.add_to_cart_form');
      
        $('<p class="tp26-cost"><strong>Tell us your delivery address</strong></p>').appendTo('#addToCartForm');
        $('#stockCheckerButton').text('Search');
      
     	 if($('#changePostCode').is(':visible')){
			$('.tp26-cost').hide();
		}

        $('.tp26-cost').click(function () {
            $('#addToCartButton').click();
        });


        var overviewContent = $('.tp_detOverview .ui-collapsible-content'),
            specificationsContent = $('.tp_detSpec .ui-collapsible-content');


        //NEW TABS

        var newTabs = $(['<div id="tp26_overview" class="tp26tabcontainer">',
                          '<ul class="tabs">',
                                '<li class="tp26_tab-link current" data-tab="tab-1"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"/"/></div><p>Product Overview</p></li><li class="tp26_tab-link" data-tab="tab-2"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="/></div><p>Technical Specs</p></li>','<li class="tp26_tab-link data" data-tab="tab-3"><div class="tp26tabicon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBB4SBwwN30kZAAADoUlEQVRo3uWZS0gVYRTHfzdvSbUwocgiI0oiokUhVJRQEVZolj0WQSFBFBEECQXtCqRoUy2KbCFREVIRPczAnhS97EVRm94oWQo97KHo9XGnhbfrnO/OfDP3zsxd5H82c+ac+b5z/ufMN98jhB6b2MwggoLBxZCDyXsmBdY9QG/YwSAMlPM6kM6zqSYjTDnLsOchByjjd8qdRKmiWtM20IUR6PVWE5yBEWYwsJlfgZCcRwVDnIwMjH9k+I7ZGDToGQjuE3MJp6/AO4azxiQZ1NMoDYJOgXo1xLWxIgwaEepFuDVSrTowknycRkc9ojygzSS3MF9nrjrwiImeY77FQvfGqgMnWOGZgTNCzmafSTK4zVX5QrqL8HNcm6Yi/E2lwoBA8A60slOnHgAjYY4g3aCGg9Lgvx8Jv7FVhFsv1aoD61nseRyoptYkt3NaZ646UME4zzHnCgccoDpQxBzPDNwQ8nh+miSD82zQOfCKV54ZkAiRJeQZegb8xxfxazL4qHdgPyuTSME7llLCHjJNz6Ic5oBJ7tavKhJrYEIS0Y0lm7lMVp4WCgfCokWDJnrNxiEMYAwtMXk405JgoJFmQkxXGHhBV+x+Ng8T3nnMrNhdDs2JDLTzKAkG+mJ67mAREdbvpDKxCLMsGYjQAQwVsVojqizkGp2SKv8F120WWBGWU0ynq8VYVby1FBYmnTbGvXTTLcvHFh1CGkYJI+yN1RSUkGmZgh56gCwX40Y0XoJ9GEUNlyh164AsGWs3kkOE+5xyz4D/aNFP0gfAlExdF9zgpjRI95SsKa5N05TsD8dEuNekWnUgn4KEz7CFs0SZSqGrDg3qxL7QD7Y5vWBOQZPl2FYAPHW9LXVPpKDBtmfLFOxgkQUDz4DdrHLJgJyEjqZOaC9zRMeAv7Aqwv4NmjQV4Xe2i3AfSLXqwDqKXUxIfrCLryyhzGIgi3JSkN7GcX1jMgWfXBbaWuCWje6uSEGDbc+WKShhngtaWzkHbKTYkoErQs6NT/f6wr3AFh0D/sKqCF/qGfAfzRSJcN9IterAXh82qSo5ZJK7eKF/QabgjQ8b9P27YCkU4Uyme2bgSTLmqgO/uOOp+6SRWISZLhlIZX5oCVkDta4z3cFqx7ZTWBc4HrDEkeHPdE5tZJHN0iwREWUB4pMD+H58JU9MzIjtnKR7KJZXV7pPTCQMavocWEBrIJ1PwfHEJEQPGYEy8IE8nTpMBaUeB18dohzVG/wFJvEOV3JUb8UAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMzBUMTg6MDc6MTIrMDI6MDBxvse3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTMwVDE4OjA3OjEyKzAyOjAwAON/CwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/></div><p>Data Sheets</p></li>',
                                '</ul>',
                                '<div id="tab-1" class="tab-content current"></div>',
                                '<div id="tab-2" class="tab-content"></div>',
                                '<div id="tab-3" class="tab-content"></div>',

                    '</div>'
                    ].join(''));

        newTabs.insertAfter('.tpAddToQuoteList');

        overviewContent.prependTo('#tab-1');
        specificationsContent.prependTo('#tab-2');
        
        
       $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        });
        
        if($('.dataSheetClass').length){
            $('.dataSheetClass').prependTo('#tab-3');
            $('.tp26tabcontainer').addClass('tp26-threetabs');

        }
        else{
            $('#tab-3').hide();
            $('.tp26_tab-link.data').hide();
        }
      
        // Above the fold content done
        // hide loader
        $loader.hide();
      
        // Hide VAT toggle on 'Footwear' category
        var category = $('.tp_bread_link.ui-link').text().trim().toLowerCase();
        if (category === 'footwear') {
            toggle.hide();
        }


        /*BUNDLES*/
        var pollerOpts = {
            timeout: 10000,
            multiplier: 0
        };

        //VIDEOS

        UC.poller(['#goodvidio-product-videos'], function () {
            if ($('#inc_frequently_bought').length) {
                $('#goodvidio-product-videos').insertAfter('#inc_frequently_bought');
            } else {
                $('#goodvidio-product-videos').insertAfter('#ProductDetail');
            }
        }, pollerOpts);


        //Bundles
        UC.poller(['#inc_frequently_bought'], function () {

            var bundles = $('#inc_frequently_bought');
            bundles.insertAfter('#ProductDetail');

            var title = bundles.find('.increasingly_element.col-increasingly-catalog .title').attr('id', 'tp26_title');
            title.text('Available Bundles');

            title.prepend('<div class="tp26-tabbundleicon"><img src="data:image/png;base64,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"/></div>');


            var bundleTabs = $('.tab-content.content').find('.product-bundle.tab-pane');

            bundleTabs.each(function () {

                $(this).find('.social_validation').insertAfter($(this).find('.bundles-price-info'));

                $(this).find('.social_validation .social_prominance_img').attr('src', 'data:image/png;base64,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');

                $(this).find('.products-view-right h3').addClass('tp26-bundlePrice').insertBefore($(this).find('.products-view-right'));

            });

            $('<div class="tp26-bundlesLink"><a href="#tp26_title">View Bundles</a></div>').appendTo('.tp26-descLinks');

            $('.tp26-bundlesLink').on('click', function (e) {
                e.preventDefault();
                var thisTarget = $(this).find('a').attr('href');
                var targetOffset = $(thisTarget).offset().top;

                $('body').animate({
                    scrollTop: targetOffset
                }, 600);
            });


        }, pollerOpts);

      
      
      if($('#addToCartButton').val() === 'Not eligible for Delivery'){
         $('.tp26-cost').hide();
      }
    

        /*Read More Scroll*/
        $('.tp26-moreLink').on('click', function (e) {
            e.preventDefault();
            var thisTarget = $(this).find('a').attr('href');
            var targetOffset = $(thisTarget).offset().top - 100;

            $('html, body').animate({
                scrollTop: targetOffset
            }, 600);
        });

    }
})(window.jQuery);