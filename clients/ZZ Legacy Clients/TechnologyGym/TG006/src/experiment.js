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
            'body',
            '.category-view',
            '#amshopby-page-container',
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


        var $itemContent = $('#amshopby-page-container .category-view .category-products .item-product .item-product-content');

        $('.product_type_attr_code_option').on('click', function () {
            $itemContent.addClass('tg6-contentactive');
        });

        // Find out max outter height
        var maxHeight = 0;

        addAndFormatContent();
        if ($('#amshopby-page-container > .category-title > h1').text().indexOf('Products') > -1) {
            $itemContent.addClass('tg6-contentactive');
        } else {
            $itemContent.removeClass('tg6-contentactive');
        }

        UC.observer.connect(jQuery('#main > .layout > div[role="main"]'), function() {
            addAndFormatContent();
            if ($('#amshopby-page-container > .category-title > h1').text().indexOf('Products') > -1) {
                $itemContent.css('height', 'auto');
            } else {
                $itemContent.css('height', maxHeight);
            }
        }, {
            // Options
            config: {attributes: false, childList: true, subtree: false},
            throttle: 1000
        });
        //$('#amshopby-page-container .category-view .category-products .item-product .item-product-content').css('height', maxHeight);
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
        generateMaxHeight();

        // --------------------------------------------------------------------------------------------------------
        function addAndFormatContent() {
            var $productsByType = $('#narrow-by-list dd:eq(0) ul li[data-text]');
            // Loop through types of product (e.g Treadmills etc.)
            $productsByType.each(function (i) {
                var $this = $(this);
                var $thisProductTypeName = $this.attr('data-text');
                // Check if product filtered
               if ($('.active-filters').text().trim().indexOf($thisProductTypeName) > -1) {
                 
                //if ($('.active-filters').text().trim().indexOf($thisProductTypeName) > -1) {
                
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
                        case 'SKILLRUN™':
                            return [
                                ['"Creates the new gold standard for performance running answering the needs and training requirements of elite athletes and demanding fitness enthusiasts."'],
                                ['Sizing', '55cm/22in wide belt and streamlined frame giving the maximum training space for the ultimate running sensation and professional experience.'],
                                ['Safety', 'Features include grip handles, non-slip edges and an emergency STOP button easily accessed by the QuickPad. Parachute Training also includes harness for increased safety during training programs.'],
                                ['Tracking', 'Track running parameters in real time and monitor them with BIOFEEDBACK. This exclusive interactive technology has the ability to review your progress within a training class / bootcamp.'],
                                ['Best for', 'Professional use, recommended for classes within hotels, fitness clubs and medical centres.'],
                                ['Display', 'The advanced console lets you change speed and gradient in an instant. Built in interactive and phenomenal quality screen to ensure effective and responsive training.']
                            ];
                            break;

                        case 'MYRUN':
                            return [
                                ['"Providing personal training programmes and instant feedback the MYRUN is specially designed for the ultimate running experience.                                "'],
                                ['Sizing', 'Big on impact and small in size. Offering the best running space to footprint ratio in its category.'],
                                ['Safety', 'Instant running feedback with ‘RUNNING RATE’ to help reduce the risk of injury and improve your running experience by adapting to the way you run and absorbing the impact.'],
                                ['Tracking', 'With the MyRun App, you can track your running patterns, routes and play music dependent on the rhythm of your run'],
                                ['Audio', 'This is the first music interactive treadmill ever, giving you the ability to Run to your own Rhythm by selecting songs direct from your own playlist and adapting them to your running pattern.'],
                                ['Best for', 'Personal use, providing the outdoor and indoor gym experience within your own home.'],
                                ['Display', 'The built in screen on this treadmill gives the basic running information but when synced up to a tablet via a built-in Bluetooth connection, you can download the MYRUN APP to make use of all the features. Available in Diamond Black and Stone Grey']
                            ];
                            break;

                        case 'RUN PERSONAL':
                            return [
                                ['"Enjoy pure entertainment and professional cardio training while you run with innovative materials, design and cutting edge technology."'],
                                ['Sizing', 'This treadmill has a large running surface including shock absorbers and joystick to alter gradient and speed so you don’t have to move away from your running position. '],
                                ['Safety', 'Features include grip handles, non-slip edges and an emergency STOP button.'],
                                ['Tracking', 'Perform a constant heart rate exercise especially tailored to your abilities with hand sensors on the central handles and telemetric chest strap.'],
                                ['Audio', 'Internet and bluetooth features available for you to sync up and run to your own playlists, Skype your trainer and friends or choose from outdoor routes in a simulated reality'],
                                ['Best for', 'Professional use, perfect for hotels and spas or larger home gyms'],
                                ['Display', 'Integrated 19" touch-screen tempered glass display and loudspeakers']
                            ];
                            break;

                        case 'SPAZIO FORMA':
                            return [
                                ['"Providing performance and functionality with this fold away unique solution."'],
                                ['Sizing', 'The ultimate space saving treadmill which folds away as small as 1 square meter. Even though compact, the full gym experience with freedom of movement on the running surface is available with the Spazio Forma.'],
                                ['Safety', 'Includes a Safety Break Feature and Constant Pulse Rate system, this follows your heart rate and adjusts speed and gradient to ensure a safe and effective workout.'],
                                ['Tracking', 'Keep track of your workout and favourite content with the Forma Training App.'],
                                ['Audio', 'With the Bluetooth Forma training link (optional) you can add your personal iPad to any forma equipment and sync up your playlists, training schedules and more'],
                                ['Best for', 'Especially designed for home-based workouts'],
                                ['Display', 'Position and secure your iPad with the Entertainment support to allow you an optimal view for all training programmes.']
                            ];
                            break;

                        case 'JOG FORMA':
                            return [
                                ['"Providing a long life deck, sturdy frame and powerful motor enabling superior performance."'],
                                ['Sizing', 'The widest running platform in this range, providing the most freedom of movement during your workouts.'],
                                ['Safety', 'Running detection system when no users are found on the equipment, also, the Constant Pulse Rate system, this follows your heart rate and adjusts speed and gradient to ensure a safe and effective workout. '],
                                ['Tracking', 'Check your performance with the LED dial. No need for a chest strap with all new constantly reading hand sensors. Keep track of your workout and favourite content with the Forma Training App.'],
                                ['Audio', 'Play movies and listen to music from your own iPad with the Bluetooth Training link (optional)'],
                                ['Best for', 'Providing effective workouts for home and professional use'],
                                ['Display', 'Easy and simple setup with the numerical keypad and LED Display, Also, position and secure your iPad with the Entertainment support to allow you an optimal view for all training programmes.']
                            ];
                            break;

                        case 'ARTIS® RUN':
                            return [
                                ['"Providing a digital interface which ensures a personalised training experience and cutting - edge connectivity."'],
                                ['Sizing', 'Providing the widest running surface on the market.'],
                                ['Safety', 'Runner Detection System, InMotion safety system and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPS '],
                                ['Audio', 'With LCD backlit display, listen to your own playlists and more with countless entertainment options.'],
                                ['Best for', 'Professional and Home use.'],
                                ['Display', 'Providing a LCD backlit display which enhances picture quality, showing favourite programmes and content in their most vivid definition and vibrant colours with the UNITY™ 3.0 console.']
                                
                            ];
                            break;

                        case 'EXCITE® RUN 600':
                            return [
                                ['"Providing the most engaging cardio experience on the market."'],
                                ['Sizing', 'Compact design which provides freedom of movement with additional handlebars for those inexperienced users.'],
                                ['Safety', 'The InMotion Safety Light and Runner Detection System and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR and the MyWellness platform connectivity to keep you up to date with your performance.'],
                                ['Audio', 'Connect your own audio for a personalised experience with the Bluetooth System'],
                                ['Best for', 'Professional use, suitable for home too'],
                                ['Display', 'This can be equipped with the new 15.6" UNITY™ 3.0 console/ TV console or Advanced LED display to provide an incredibly reliable and engaging personal experience to your training programme.']
                                
                            ];
                            break;

                        case 'EXCITE® RUN 1000':
                            return [
                                ['"Offering a fully connected cardio experience."'],
                                ['Sizing', 'Providing a wider running surface with the ability to have freedom of movement.'],
                                ['Safety', 'Preventive Care Light, InMotion Safety Light and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR as well as providing a cushioned running surface which adapts automatically and dynamically to your running style.'],
                                ['Audio', 'Connect your own audio for a personalised experience with the Bluetooth System'],
                                ['Best for', 'Professional use wishing to create special experiences'],
                                ['Display', 'This can be equipped with the new 19" UNITY™ 3.0 console/ TV console or Advanced LED display to provide an incredibly reliable and engaging personal experience to your training programme.']
                                
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
                                ['"A recumbent bike that balances performance , aesthetics , ergonomics and design"'],
                                ['Sizing', 'The Vitra seat is height-adjustable, enabling you to find the right posture and to always ensure proper back support with it’s length of 1370mm | 54in.'],
                                ['Safety', 'Naturally assumes the correct position with the ergonomic Vitra seat ensuring to find the right position and support. Pedal safely with the closure system and adjustable straps.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR on the handles and an additional telemetric chest strap to help perform an exercise programme tailored to your abilities.'],
                                ['Audio', 'Enjoy countless entertainment options and new high intensity Interval Training workouts with UNITY 3.0, providing a diversified and personal training experience. '],
                                ['Best for', 'The perfect solution for hotels, spas or an aesthetic design for home.'],
                                ['Display', 'Elegant colours and lines with carefully combined glass, aluminium, and micro - polished steel make this an icon of Italian Design featuring a large HD Ready (15.6”) touch screen in tempered glass with the UNITY Console.']
                            
                            ];
                            break;

                        case 'RECLINE FORMA':
                            return [
                                ['"Offering new content, smart features and an enhanced and reliable design."'],
                                ['Sizing', 'Measuring 160cm | 63in in length with a 110 degree incline on the ergonomically designed seat to eliminate the need for adjustments.'],
                                ['Safety', 'With the constant heart rate system ensuring a stable heart rate on the handles and a telemetric chest strap to help you ensure a safe and sufficient programme. '],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR'],
                                ['Audio', 'With the Bluetooth Forma Training Link (optional) you can add your personal iPad to any forma equipment and sync up your playlists, training schedules and more.'],
                                ['Best for', 'Home use'],
                                ['Display', 'Easy and simple setup with the numerical keypad and LED Display. Ability to position and secure your iPad with the Entertainment support to allow you an optimal view for all training programmes.']
                            ];
                            break;

                        case 'BIKE FORMA':
                            return [
                                ['"Silent and stable, Bike Forma is the closest you get to cycling on the road with its 3 Training positions replicating Standard, City and Racing exercise."'],
                                ['Sizing', 'An Exercise Bike offering a space-saving solution to those home users with its compact design.'],
                                ['Safety', 'Provided with a Constant Pulse Rate system which follows your heart rate, automatically adjusting the speed, incline and resistance of the equipment to constantly provide you with a safe and effective workout.'],
                                ['Tracking', 'Connect with the MyWellness platform so you can keep track of your own improvements and progress.'],
                                ['Audio', 'With the Bluetooth Forma Training Link (optional) you can add your personal iPad to any forma equipment and sync up your playlists.'],
                                ['Best for', 'Perfect for home users to save space and have the ability to on professional and reliable equipment.'],
                                ['Display', 'Easy and simple setup with the numerical keypad and LED Display with the Ability to position and secure your iPad with the Entertainment support to allow you an optimal view for all training programmes.']
                            ];
                            break;

                        case 'ARTIS® - BIKE':
                            return [
                                ['"Replicate the sensation of exercising on a real road bike with reliability on Professional standard technology."'],
                                ['Sizing', 'Quick and easily adjustable wide pedals for users including reduced distance between the pedals to make it feel that users are on two wheels.'],
                                ['Safety', 'The easily adjustable pedal straps allow a safe and secure workout with ease.'],
                                ['Tracking', 'Keep on track with your workouts on the UNITY™ 3.0 constantly tracks your progress and programmes.'],
                                ['Audio', 'An Ergonomic Dashboard providing plug-in points for devices such as MP3 player, iPhone/iPod, earphones and a USB port giving the ability to train to your own playlists.'],
                                ['Best for', 'Professional and home users wishing to create real outdoor experiences indoors.'],
                                ['Display', 'Providing a LCD backlit display which enhances picture quality, showing favourite programmes and content in their most vivid definition and vibrant colours with the UNITY™ 3.0 console.']
                            ];
                            break;

                        case 'ARTIS® - RECLINE':
                            return [
                                ['"The perfect solution for users with limited mobility who want moderate cardio activity but need additional comfort."'],
                                ['Sizing', 'The widest walk in the industry with a 50cm | 19.7in walk - through.'],
                                ['Safety', 'Ergonomic Handlebars and Dashboard for easy access to personal effects and easily adjustable pedal straps for a secure workout position.'],
                                ['Tracking', ' Keep on track with your workouts on the UNITY™ 3.0 constantly tracks your progress and programmes.'],
                                ['Audio', 'An Ergonomic Dashboard providing plug-in points for devices such as MP3 player, iPhone/iPod, earphones and a USB port giving the ability to train to your own playlists.'],
                                ['Best for', 'Use within Club facilities or home use, particularly suitable for older adults and for those who have weight issues.'],
                                ['Display', 'Providing a LCD backlit display which enhances picture quality, showing favourite programmes and content in their most vivid definition and vibrant colours with the UNITY™ 3.0 console']
                            ];
                            break;

                        case 'EXCITE® BIKE':
                            return [
                                ['"Offering a fully connected cardio experience with the sensation of riding a real road bike."'],
                                ['Sizing', 'The 12.5mm/0.5” step guarantees the finest adjustment of your seat.'],
                                ['Safety', 'Wider pedals that provide greater stability and support for users and 10 degree pedal incline to help users slide their feet into the pedals from a seat position.'],
                                ['Tracking', 'Engage in the new interval workouts that are tracked, allowing you to see performance and adapt your training programme accordingly.'],
                                ['Audio', 'UNITY™ 3.0 included to offer a totally engaging and diversified personal experience directly from the touch- screen console.'],
                                ['Best for', 'Professional use.'],
                                ['Display', 'This can be equipped with the UNITY™ 3.0 console, TV console, Advanced LED display or Energy saving LED display to provide an incredibly reliable and engaging personal experience to your training programme.']
                            ];
                            break;

                        case 'EXCITE® RECLINE':
                            return [
                                ['"Offering moderate cardio activity and additional comfort for an overall ideal cycling experience."'],
                                ['Sizing', '2.5”/6.5cm step - over height simplifies access for those larger or less mobile users'],
                                ['Safety', 'Micro adjustable straps can be easily adjusted and hand sensors to ensure a healthy and stable training programme. '],
                                ['Tracking', 'Connect with the MyWellness platform so you can keep track of your own improvements and progress and choose one of our new interval training workouts.'],
                                ['Audio', 'UNITY™ 3.0 offers users a totally engaging and diversified personal experience directly from the touch-screen console by linking up to the Bluetooth and playing your own playlists.'],
                                ['Best for', 'Professional use.'],
                                ['Display', 'This can be equipped with the UNITY™ 3.0 console/ TV console, Advanced LED display or Energy saving LED display to provide an incredibly reliable and engaging personal experience to your training programme.']
                            ];
                            break;
//up to here
                        case 'MYCYCLING™':
                            return [
                                ['"Offering a fully connected cardio experience."'],
                                ['Sizing', 'Providing a wider running surface with the ability to have freedom of movement.'],
                                ['Safety', 'Preventive Care Light, InMotion Safety Light and Fast Track Control are all integrated within this design.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR as well as providing a cushioned running surface which adapts automatically and dynamically to your running style.'],
                                ['Audio', 'Connect your own audio for a personalised experience with the Bluetooth System'],
                                ['Best for', 'Professional use wishing to create special experiences'],
                                ['Display', 'This can be equipped with the new 19" UNITY™ 3.0 console/ TV console or Advanced LED display to provide an incredibly reliable and engaging personal experience to your training programme.']
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
                                ['"Taking total body training to new levels of performance and style with the Cross Personal "'],
                                ['Sizing', 'With a length of 1940mm | 76in and 690mm | 28in width, the Cross Personal is perfect to ensure a safe, fluid and reliable workout.'],
                                ['Safety', 'Quick and Easy Touchscreen emergency STOP function, by  including a telemetric chest strap and hand sensors it allows users to monitor your heart rate for a safe and effective workout.'],
                                ['Tracking', 'Perform a constant heart rate exercise especially tailored to your abilities with hand sensors on the handles and telemetric chest strap.'],
                                ['Audio', 'Connect your audio for your very own personalised experience, providing options for earphones or get the surround sound experience with the Treble Dolby Surround Tweeter speakers.'],
                                ['Best for', 'Ideal as home gym equipment with it’s aesthetic design for home as well as fluid and silent movements, Also used within Hotels, fitness clubs and spas.'],
                                ['Display','Featuring a large HD Ready (15.6”) touch screen in tempered glass with the UNITY Console. ']
                                
                            ];
                            break;

                        case 'SYNCHRO FORMA':
                            return [
                                ['"Synchro Forma is the ideal professional cross trainer for a simple and enjoyable total body workout at home."'],
                                ['Sizing', 'Length of 2040mm | 80in this machine gives you the professional reliability and standards for a home workout programme.'],
                                ['Safety', 'The Constant Pulse Rate System automatically changes the Synchro Forma speed and intensity to keep your heart rate constant from the pre-set value'],
                                ['Tracking', 'Check your performance with the LED dial. No need for a chest strap with all new constantly reading hand sensors. Keep track of your workout and favourite content with the Forma Training App and MyWellness platform.'],
                                ['Audio', 'With the (optional) Bluetooth Forma training link you can add your personal iPad to any Forma equipment and sync up your playlists, training schedules and more. '],
                                ['Best for', 'Synchro Forma is ideal for home training. Domestic but professional training at different intensity levels.'],
                                ['Display','Easy and simple setup with the numerical keypad and LED Display. Ability to position and secure your iPad with the Entertainment support to allow you an optimal view for all training programmes.']
                            ];
                            break;

                        case 'ARTIS® - SYNCHRO':
                            return [
                                ['"Offers an unparalleled workout experience by recreating the movement of the body when walking or running."'],
                                ['Sizing', 'This Machine has a length of 1947mm | 78in and height of 1760mm | 70in this allows users to gain a professional and reliable workout for all types of training programmes.'],
                                ['Safety', 'Fast Track Controls and the Soft Return System enable safe and simple adjustment of equipment settings during and after training. '],
                                ['Tracking', 'Heart Rate driven workout programmes and hand sensors that track your CPR.'],
                                ['Audio', 'Enjoy countless entertainment options and new high intensity Interval Training workouts with UNITY 3.0.'],
                                ['Best for', 'Home and Professional use'],
                                ['Display','Providing a LCD backlit display which enhances picture quality, showing favourite programmes and content in their most vivid definition and vibrant colours with the UNITY™ 3.0 console.']
                            ];
                            break;

                        case 'ARTIS® - VARIO':
                            return [
                                ['"Offers an automatically adapting system which follows your unique stride."'],
                                ['Sizing', 'Create a varied workout by making the most of the 0-83cm (0-2.7) stride length range'],
                                ['Safety', 'Avoid potential pedal blocking with the self- start device as well as Fast Track Controls to avoid an interrupted workout.'],
                                ['Tracking', 'Heart Rate driven workout programs and hand sensors that track your CPR'],
                                ['Audio', 'Enjoy countless entertainment options and new high intensity Interval Training workouts with UNITY 3.0.'],
                                ['Best for', 'Home and professional use.'],
                                ['Display','Providing a LCD backlit display which enhances picture quality, showing favourite programmes and content in their most vivid definition and vibrant colours with the UNITY™ 3.0 console.']
                            ];
                            break;

                        case 'EXCITE® VARIO':
                            return [
                                ['"Its adaptive and no-impact movement assures variety and effectiveness to your training by  automatically tracking and adjusting to your movement pattern."'],
                                ['Sizing', 'Adapting your stride automatically and dynamically, from 0-83cm /32.7” and a step height of 170 mm (7”) to suit your size and movement. '],
                                ['Safety', ' Avoid potential pedal blocking with reduced height of pedals, lateral hand supports and the Self Starting System'],
                                ['Tracking', 'Double Hand Sensors enable you to receive constant heart rate monitoring as well as the MyWellness platform connectivity to keep you up to date with your performance.'],
                                ['Audio', ' Enjoy countless entertainment options and new high intensity Interval Training workouts with UNITY 3.0. '],
                                ['Best for', 'Professional use.'],
                                ['Display','The Vario can be equipped with the new UNITY™ 3.0 or TV digital consoles / Advanced LED display or Energy saving LED display.']
                            ];
                            break;

                        case 'EXCITE® SYNCHRO':
                            return [
                                ['"Providing effective cardio exercise through natural elliptical movement  by recreating the movement of the body when walking or running."'],
                                ['Sizing', 'Length of 2040mm, 700mm width and 1600mm height, this powerful, solid and reliable machine helps businesses allow their users to reach their full training potential within their facilities'],
                                ['Safety', 'Fast Track Controls help to avoid an uninterrupted workout. No- impact movement due to the rear drive ensuring a fluid elliptical trajectory.'],
                                ['Tracking', 'Double Hand Sensors enable you to receive constant heart rate monitoring as well as the MyWellness platform connectivity to keep you up to date with your performance.'],
                                ['Audio', 'UNITY 3.0 or TV digital consoles with Bluetooth facilities, allowing you to manage and play your own audio content.'],
                                ['Best for', 'The perfect solution for all facilities wishing to deliver special experiences.'],
                                ['Display',"This can be equipped with the UNITY™ 3.0 console/ TV console, Advanced LED display or Energy saving LED display to provide an incredibly reliable and engaging personal experience to your training programme."]
                            ];
                            break;

                        default:
                            return false;
                            break;
                    }
                    break;

                // Rowers 
               /* case 'Rowers':
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
                    }*/
                    //break;
            }
        } // getMoreDetails
        //AMEND - all the same height on page load
        var productHasDesc = $('.item-product');
        productHasDesc.each(function(){
            var $productItem = $(this);
            if($productItem.find('.TG006_table').length > 0){
                $(this).closest('.item-product').addClass('TG006-productHasDesc');
            }else{
                $(this).closest('.item-product').removeClass('TG006-productHasDesc');
            }
         });
    } // activate

}()); // _TG006
