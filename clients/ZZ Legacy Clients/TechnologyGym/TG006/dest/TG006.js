var _TG006 = (function () {

    // PLUGINS ------------------------------------

    // UC Library - Poller -- @version 0.2.2
    // ---------------------------------------------
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // UC Library - Observer
    // ---------------------------------------------
    UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};

    // Send GA Events With Tracker Name -----------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'TG006',
            variation_str: 'Variation 1 Desktop'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            '.item-product-content',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // ---------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('TG006');

        $('.product_type_attr_code_option').on('click', function () {
            $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
        });

        // Find out max outter height
        var maxHeight = 0;

        addAndFormatContent();
        if ($('#amshopby-page-container > .category-title > h1').text().indexOf('Products') > -1) {
            $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
        } else {
            $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', maxHeight);
        }

        UC.observer.connect(jQuery('#main > .layout > div[role="main"]'), function() {

            addAndFormatContent();
            if ($('#amshopby-page-container > .category-title > h1').text().indexOf('Products') > -1) {
                $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
            } else {
                $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', maxHeight);
            }
        }, {
            // Options
            config: {attributes: false, childList: true, subtree: false},
            throttle: 1000
        });

        $(window).on('resize', function () {
            // $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
            generateMaxHeight();
            if ($('#amshopby-page-container > .category-title > h1').text().indexOf('Products') > -1) {
                $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
            } else {
                $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', maxHeight);
            }
        });

        function generateMaxHeight () {
            // Loop through the products corresponing to a type of product
            maxHeight = 0;
            $('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', 'auto');
            var $productsOfTypeList = $('#amshopby-page-container .category-view .category-products .item-product');
            $productsOfTypeList.each(function (i) {
                var $currentProductToFormat = $(this);

                if ($currentProductToFormat.find('.item-product-content').outerHeight() > maxHeight) {
                    maxHeight = $currentProductToFormat.find('.item-product-content').outerHeight();
                }
            });
        }

        // --------------------------------------------------------------------------------------------------------
        function addAndFormatContent() {
            var $productsByType = $('#narrow-by-list dd:eq(0) ul li[data-text]');
            // Loop through types of product (e.g Treadmills etc.)
            $productsByType.each(function (i) {
                var $this = $(this);
                var $thisProductTypeName = $this.attr('data-text');
                // Check if product filtered
                if ($('#amshopby-page-container > .category-title > h1').text().trim() === $thisProductTypeName) {
                    // Loop through the products corresponing to a type of product
                    var $productsOfTypeList = $('#amshopby-page-container .category-view .category-products .item-product');
                    $productsOfTypeList.each(function (i) {
                        var $this = $(this);
                        var $thisProductName = $this.find('.product-info .product-name a').text().trim();
                        var $productDetails = getProductDetails($thisProductTypeName, $thisProductName);
                        var $currentProductToFormat = $this;
                        // Loop through the added details of each product and format as required
                        $.each($productDetails, function (i) {
                            var $this = $(this);
                            if (!i) { // this is the title/header of the product
                                var $titleOfThisProduct = $('<p class="TG006_title_product">' + $this[0] + '</p>');
                                $titleOfThisProduct.insertAfter($currentProductToFormat.find('.product-info'));
                            }
                            else {
                                var $descriptionOfThisProduct = $([
                                    '<table class="TG006_table">',
                                    '<tr class="TG006_tableRow">',
                                    '<td class="TG006_small_description">' + $this[0] + '</td>',
                                    '<td class="TG006_description_product">' + $this[1] + '</td>',
                                    '</tr>',
                                    '</table>'
                                ].join(''));
                                $descriptionOfThisProduct.appendTo($currentProductToFormat.find('.item-product-content'));
                            }
                        });
                        $currentProductToFormat.find('.item-product-content').append('<a href="#" class="TG006_viewProduct"><span>View Product ></span></a>');
                        $currentProductToFormat.find('.TG006_viewProduct').prop('href', $currentProductToFormat.find('.no-std-link').prop('href'));
                        if ($currentProductToFormat.find('.item-product-content').outerHeight() > maxHeight) {
                            maxHeight = $currentProductToFormat.find('.item-product-content').outerHeight();
                        }
                    });
                }
            });
        } // addAndFormatContent
        // --------------------------------------------------------------------------------------------------------

        // Returns additional info for each product of each product type
        // First element in the array stands for the title/header corresponding to individual products
        function getProductDetails(productType, productName) {
            // Returns additional info when passed a product type and name as parameters
            switch (productType) {
                // Treadmills
                case 'Treadmills':
                    switch (productName) {
                        case 'MYRUN':
                            return [
                                ['"Providing personal training programmes and instant feedback the MYRUN is specially designed for the ultimate running experience."'],
                                ['Sizing', 'Big on impact and small in size. Offering the best running space to footprint ratio in its category.'],
                                ['Safety', 'Instant running feedback with ‘RUNNING RATE’ to help reduce the risk of injury and improve your running experience by adapting to the way you run and absorbing the impact.'],
                                ['Tracking', 'With the MyRun App, you can track your running patterns, routes and play music dependant on the rhythm of your run.'],
                                ['Audio', 'This is the first music interactive treadmill ever, giving you the ability to Run to your own Rhythm by selecting songs direct from your own playlist and adapting them to your running pattern.'],
                                ['Best for', 'Great for personal use, providing the outdoor and indoor gym experience within your own home.']
                            ];
                            break;

                        case 'RUN PERSONAL':
                            return [
                                ['"Gain pure entertainment and professional cardio training while you run with the innovative materials, design and cutting edge technology."'],
                                ['Sizing', 'No need to move from your exercising position with a large running surface including shock absorbers and joysticks for altering gradient and speed all with no hassle.'],
                                ['Safety', 'Features include grip handles, non-slip edges and an emergency STOP button.'],
                                ['Tracking', 'Perform a constant heart rate exercise especially tailored to your abilities with hand sensors on the central handles and telemetric chest strap.'],
                                ['Audio', 'Internet and bluetooth features available for you to sync up and run to your own playlists, skype your trainer and friends or choose from outdoor routes in a simulated reality'],
                                ['Best for', 'Professional use and perfect for hotels and spas or larger home gyms']
                            ];
                            break;

                        case 'SPAZIO FORMA':
                            return [
                                ['"Providing performance and functionality with this fold away unique solution."'],
                                ['Sizing', 'The ultimate space saving treadmill which folds away as small as 1 square meter. Even though compact, the full gym experience with freedom of movement on the running surface is available with the Spazio Forma.'],
                                ['Safety', 'Includes a Safety Break Feature and Constant Pulse Rate system, this follows your heart rate and adjusts speed and gradient to ensure a safe and effective workout.'],
                                ['Tracking', 'Keep track of your workout and favourite content with the Forma Training App.'],
                                ['Audio', 'With the Bluetooth Forma training link (optional) you can add your personal Ipad to any forma equipment and sync up your playlists, training schedules and more'],
                                ['Best for', 'Especially designed for home-based workouts']
                            ];
                            break;

                        case 'JOG FORMA':
                            return [
                                ['"Providing a long life deck, sturdy frame and powerful motor enabling  superior performance."'],
                                ['Sizing', 'The widest running platform in this range, providing the most freedom of movement during your workouts.'],
                                ['Safety', 'Running detection system when no users are found on the equipment, also, the Constant Pulse Rate system, this follows your heart rate and adjusts speed and gradient to ensure a safe and effective workout.'],
                                ['Tracking', 'Check your performance with the LED dial. No need for a chest strap with all new constantly reading hand sensors. Keep track of your workout and favourite content with the Forma Training App.'],
                                ['Audio', 'Play movies and listen to music from your own iPad with the Bluetooth Training link (optional)'],
                                ['Best for', 'Providing effective workouts for home and professional use']
                            ];
                            break;

                        case 'ARTIS® RUN':
                            return [
                                ['"Providing a digital interface which ensures a personalised training experience and cutting - edge connectivity."'],
                                ['Sizing', 'Providing the widest running surface on the market.'],
                                ['Safety', 'Runner Detection System, InMotion safety system and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPS'],
                                ['Audio', 'With LCD backlit display, listen to your own playlists and more with countless entertainment options.'],
                                ['Best for', 'Professional and Home use.']
                            ];
                            break;

                        case 'EXCITE® RUN 600':
                            return [
                                ['"Providing the most engaging cardio experience on the market."'],
                                ['Sizing', 'Compact design which provides freedom of movement with additional handlebars for those inexperienced users.'],
                                ['Safety', 'The InMotion Safety Light and Runner Detection System and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPS and the mywellness platform connectivity to keep you up to date with your performance.'],
                                ['Audio', 'Connect your own audio for a personalised experience with the Bluetooth System'],
                                ['Best for', 'Professional use, suitable for home too']
                            ];
                            break;

                        case 'EXCITE® RUN 1000':
                            return [
                                ['"Offering a fully connected cardio experience."'],
                                ['Sizing', 'Providing a wider running surface with the ability to have freedom of movement.'],
                                ['Safety', 'Preventive Care Light, InMotion Safety Light and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPS as well as providing a cushioned running surface which adapts automatically and dynamically to your running style.'],
                                ['Audio', 'Connect your own audio for a personalised experience with the Bluetooth System'],
                                ['Best for', 'Professional use wishing to create special experiences']
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;

                // Exercise bikes
                case 'Exercise bikes':
                    switch (productName) {
                        case 'RECLINE PERSONAL':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'RECLINE FORMA':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'BIKE FORMA':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'ARTIS® - BIKE':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'ARTIS® - RECLINE':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'EXCITE® BIKE':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'EXCITE® RECLINE':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'MYCYCLING™':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;

                // Elliptical Cross Trainers
                case 'Elliptical Cross Trainers':
                    switch (productName) {
                        case 'CROSS PERSONAL':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'SYNCHRO FORMA':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'ARTIS® - SYNCHRO':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'ARTIS® - VARIO':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'EXCITE® VARIO':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'EXCITE® SYNCHRO':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;

                // Rowers
                case 'Rowers':
                    switch (productName) {
                        case 'SKILLROW™':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;

                // Stair Climbers
                case 'Stair Climbers':
                    switch (productName) {
                        case 'ARTIS® - CLIMB':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'EXCITE® STEP':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'Excite® Climb UNITY™':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'Excite® Climb LED':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        case 'Excite® Climb TV':
                            return [
                                ['"High end product and design perfect for personal wellness"'],
                                ['Sizing', 'Compact design, great for space saving'],
                                ['Audio', 'Something good about how the treadmill integrates with music'],
                                ['Safety', 'Something explaining how good the safety is'],
                                ['Best for', 'Whether good for personal or professional use'],
                                ['Tracking', 'Whether the product does CPS heart tracking etc.']
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;
            }
        } // getMoreDetails

    } // activate

}()); // _TG006