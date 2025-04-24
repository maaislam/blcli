export default function v1() {
    var IT007v2 = (function() {
        
        var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
        
        UC.poller([
            function () {
                if (window.jQuery) {
                    return true;
                }
            }
        ], run);

        function run(){
            var $ = window.jQuery,
                productTitle= $('.product-name h1').text(),
                bodyVar = $('body');

            bodyVar.addClass('IT007');
            
            UC.poller([
                function() {
                    var fs = window.FS;
                    if (fs && fs.setUserVars) return true;
                }
            ], function () {
                window.FS.setUserVars({
                    experiment_str: 'IT007',
                    variation_str: 'Variation 2'
                });
            }, { multiplier: 1.2, timeout: 0 });

            $('body .off-canvas-wrap').after([
                '<div class="IT_pop-up_modal">',
                    '<div class="IT_bg-trigger"></div>',
                    '<div>',
                        '<div class="IT_overflow_fix clearfix">',
                            '<a href="#" class="IT_close_btn">X</a>',
                            '<h2 class="IT_main-header"><span>' + productTitle + '</span> Successfully Added to Cart</h2>',
                            '<div class="IT_sub-header">Now Complete The Look:</div>',
                            '<div class="IT_slider"></div>',
                            '<div class="IT_returns-policy">',
                            'You\'ve got nothing to lose! Order within <span class="IT_countdown"></span> and get it <span class="IT_countdown-day"></span> with Next Day Delivery</div>',
                            '<a href="#" class="IT_basket-btn">View basket</a>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));

            var slideQ = false,
                modal = $(".IT_pop-up_modal"),
                modalSlider = $('.IT_slider');

            var trackerName;
            function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
                var fire = function (tracker) {
                    var options = {};
                    options.nonInteraction = nonInteractionValue;
                    if(dimensionValue && dimensionName){
                        options['dimension' + dimensionValue] = dimensionName;
                    }
                    window.ga(tracker + '.send', 'event', category, action, label, options);
                };

                if (trackerName) {
                    fire(trackerName);
                } else {
                    UC.poller([
                        function () {
                            return window.ga.getAll;
                        }
                    ], function () {
                        trackerName = window.ga.getAll()[0].get('name');
                        fire(trackerName);
                    });
                }
            }
            modal.fadeIn("slow", function () {
                modal.addClass("active");
                bodyVar.removeClass('IT_checkout_hide');
                slideQ = false;
            });
            if (slideQ === false) {
                $(".IT_pop-up_modal .IT_close_btn, .IT_basket-btn").on("click", function (e) {
                    slideQ = true;
                    e.preventDefault();

                    if($(this).hasClass('IT_basket-btn')){
                        //$('.link-bag.right-off-canvas-toggle').click();
                        sendEvent('IT007--v1', 'clicked-view-basket-button', '' , true);
                    }

                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function () {
                            modal.removeClass("active");
                            bodyVar.removeClass('IT_checkout_hide');
                            slideQ = false;
                        });
                    } else {
                        modal.fadeIn("slow", function () {
                            modal.addClass("active");
                            bodyVar.removeClass('IT_checkout_hide');
                            slideQ = false;
                        });
                    }
                });

                $('.IT_bg-trigger').on("click", function () {
                    if (modal.hasClass("active")) {
                        modal.fadeOut("slow", function () {
                            modal.removeClass("active");
                            bodyVar.removeClass('IT_checkout_hide');
                            slideQ = false;
                        });
                    }
                });
                slideQ = true;
                bodyVar.addClass('IT_checkout_hide');

                if($('.switcher-field.switcher-size .switcher-label.selected').length > 0){
                    modal.fadeIn("slow", function () {
                        modal.addClass("active");

                        if($('.IT_slider.slick-initialized').length > 0){
                        }
                        else{
                            $('.IT_slider').slick({
                                dots: false,
                                infinite: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                responsive: [
                                    {
                                        breakpoint: 960,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 1,
                                            infinite: true
                                        }
                                    },
                                    {
                                        breakpoint: 560,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 1,
                                            infinite: true
                                        }
                                    }
                                ]
                            });
                        }
                        slideQ = false;
                    });
                }
            }

            if(bodyVar.hasClass('category-clothing') || 
                bodyVar.hasClass('category-tops') || 
                bodyVar.hasClass('category-bodysuits') || 
                bodyVar.hasClass('category-playsuits') || 
                bodyVar.hasClass('category-jumpsuits') ||
                bodyVar.hasClass('category-sets-co-ords') ||
                bodyVar.hasClass('category-skirts-shorts') ||
                bodyVar.hasClass('category-shirts') ||
                bodyVar.hasClass('category-denim') || 
                bodyVar.hasClass('category-trousers-leggings') ||
                bodyVar.hasClass('category-swimwear') ||
                bodyVar.hasClass('category-jumpers-sweatshirts') ||
                bodyVar.hasClass('category-jackets-coats') ||
                bodyVar.hasClass('category-activewear') ||
                bodyVar.hasClass('category-loungewear') ||
                bodyVar.hasClass('category-lingerie-nightwear') ||
                bodyVar.hasClass('category-curve-clothing') ||
                bodyVar.hasClass('category-premium') ||
                bodyVar.hasClass('category-last-change-to-buy-clothing')
            ){
                var productName1 = 'Shop All Shoes',
                    productName2 = 'Shop Accessories',
                    itemImg1 = 'https://media.inthestyle.com/wysiwyg/thumbnail_shoes.jpg',
                    itemImg2 = 'https://media.inthestyle.com/wysiwyg/Accessories_June2017_thumbnail.jpg',
                    productHref1 = '/shoes',
                    productHref2 = '/accessories';
            }
            else if(bodyVar.hasClass('category-shoes') ||
                bodyVar.hasClass('category-high-heels') ||
                bodyVar.hasClass('category-flats') ||
                bodyVar.hasClass('category-sandals') ||
                bodyVar.hasClass('category-wedges') ||
                bodyVar.hasClass('category-boots') ||
                bodyVar.hasClass('category-flatforms') ||
                bodyVar.hasClass('category-wide-fit')
            ){
                var productName1 = 'Shop All Clothing',
                    productName2 = 'Shop Accessories',
                    itemImg1 = 'https://media.inthestyle.com/wysiwyg/Clothing_June2017_thumbnail.jpg',
                    itemImg2 = 'https://media.inthestyle.com/wysiwyg/Accessories_June2017_thumbnail.jpg',
                    productHref1 = '/clothing',
                    productHref2 = '/accessories';
            }
            else if(bodyVar.hasClass('category-accessories') ||
                bodyVar.hasClass('category-beauty') ||
                bodyVar.hasClass('category-belts') ||
                bodyVar.hasClass('category-body-jewllery') ||
                bodyVar.hasClass('category-chokers') ||
                bodyVar.hasClass('category-shapewear') ||
                bodyVar.hasClass('category-hair-accessories') ||
                bodyVar.hasClass('category-hats-scarves') ||
                bodyVar.hasClass('category-jewellery') ||
                bodyVar.hasClass('category-tights-socks') ||
                bodyVar.hasClass('category-phone-cases') ||
                bodyVar.hasClass('category-stationery') ||
                bodyVar.hasClass('category-sunglasses')
            ){
                var productName1 = 'Shop All Clothing',
                    productName2 = 'Shop All Shoes',
                    itemImg1 = 'https://media.inthestyle.com/wysiwyg/Clothing_June2017_thumbnail.jpg',
                    itemImg2 = 'https://media.inthestyle.com/wysiwyg/thumbnail_shoes.jpg',
                    productHref1 = '/clothing',
                    productHref2 = '/shoes';
            }
            else{
                var productName1 = 'Shop All Shoes',
                    productName2 = 'Shop Accessories',
                    itemImg1 = 'https://media.inthestyle.com/wysiwyg/thumbnail_shoes.jpg',
                    itemImg2 = 'https://media.inthestyle.com/wysiwyg/Accessories_June2017_thumbnail.jpg',
                    productHref1 = '/shoes',
                    productHref2 = '/accessories';
            }

            modalSlider.append([
                '<div class="IT_slide">',
                    '<div class="IT_img"><a data-identifier="' + productName1 + '" href="' + productHref1 + '"><img src="' + itemImg1 + '" /></a></div>',
                    '<h3><a href="' + productHref1 + '">' + productName1 + '</a></h3>',
                '</div>',
                '<div class="IT_slide">',
                    '<div class="IT_img"><a data-identifier="' + productName2 + '" href="' + productHref2 + '"><img src="' + itemImg2 + '" /></a></div>',
                    '<h3><a href="' + productHref2 + '">' + productName2 + '</a></h3>',
                '</div>'
            ].join(''));

            

            var interval = setInterval(function(){
                if($('.IT_slider.slick-initialized').length > 0){
                    $('.IT_slide a').on('click', function(e){
                        e.preventDefault();

                        var identifier = $(this).attr('data-identifier');

                        sendEvent('IT007--v1', 'clicked-slide', identifier, true);
                        
                        window.location = $(this).attr('href');
                    });
                    clearInterval(interval);
                    return;
                }
            }, 200);   
            
            var UC2 = UC2 || {};
            // UC Library - Countdown -- @version 0.3.4
            UC2.countdown = function (e) {
                function t(e) {
                    var t = function () {
                            return o[e.getDay()]
                        },
                        a = function () {
                            return c.indexOf(t()) > -1
                        };
                    if (a())
                        for (; a();) e.setDate(e.getDate() + 1);
                    return e
                }
                if (!$) return !1;
                var a = {
                        cutoff: null,
                        element: null,
                        labels: {
                            d: "days",
                            h: "hours",
                            m: "minutes",
                            s: "seconds"
                        },
                        delivery: {
                            deliveryDays: null,
                            excludeDays: null,
                            deliveryDayElement: null,
                            tomorrowLabel: !1
                        }
                    },
                    r = function (e, t) {
                        var a, n;
                        for (var l in t) a = e[l], n = t[l], Object.keys && -1 === Object.keys(e).indexOf(l) || ("object" == typeof n ? "[object Array]" === Object.prototype.toString.call(n) ? e[l] = n : r(a, n) : e[l] = n)
                    };
                r(a, e);
                var n = new Date;
                var l = new Date(a.cutoff),
                    o = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    s = a.delivery,
                    u = s.deliveryDays,
                    c = s.excludeDays,
                    d = s.deliveryDayElement,
                    i = {};
                n > l && (l.setDate(l.getDate() + 1), l = t(l)), i.cutoff = l.getTime();
                var y = Math.floor((l.getTime() - n.getTime()) / 1e3),
                    f = document.querySelectorAll(a.element),
                    D = setInterval(function () {
                        var e = Math.floor(y / 24 / 60 / 60),
                            t = Math.floor(y - 86400 * e),
                            r = Math.floor(t / 3600),
                            n = Math.floor(t - 3600 * r),
                            l = Math.floor(n / 60),
                            o = y % 60;
                        o < 10 && (o = "0" + o);
                        for (var s = 0, u = f.length; s < u; s++) f[s].innerHTML = [e > 0 ? '<span class="UC_cd-days">' + e + "</span> " + a.labels.d + " " : "", '<span class="UC_cd-hours">' + r + "</span> " + a.labels.h + " ", '<span class="UC_cd-minutes">' + l + "</span> " + a.labels.m + " ", '<span class="UC_cd-seconds">' + o + "</span> " + a.labels.s + " "].join("");
                        0 === y ? clearInterval(D) : y--
                    }, 1e3);
                if (u) {
                    var v = function () {
                            var e = new Date;
                            return e.setDate(l.getDate() + u), e = t(e)
                        }(),
                        g = document.querySelectorAll(d),
                        m = o[v.getDay()];
                    if (s.tomorrowLabel) {
                        var h = new Date(n);
                        h.setDate(h.getDate() + 1), h.getFullYear() == v.getFullYear() && h.getMonth() == v.getMonth() && h.getDate() == v.getDate() && (m = "tomorrow")
                    }
                    for (var b = 0, p = g.length; b < p; b++) g[b].innerHTML = m;
                    i.deliveryDate = v.getTime(), i.deliveryDay = m
                }
                return i
            };

            var d = new Date();
            var oneHourMs = 1000 * 60 * 60;  
            var timezoneCorrectionMs = (function() {
                return d.getTimezoneOffset() * 60000; // Get timezoneoffset (mins) and convert to ms
            })();
            
            /* Add timezone correction to date in ms to get date object set to UTC time
               Add one hour for client timezone offset (BST) */
            var timezoneCorrectedDate = new Date(d.getTime() + timezoneCorrectionMs + oneHourMs);
            var isSaturday = timezoneCorrectedDate.getDay() === 6; // Check if Saturday in client timezone
            var isSunday = timezoneCorrectedDate.getDay() === 7; // Check if Sunday in client timezone
            var cutoff = new Date();
            var excludedDays;
            
            
            if (isSaturday) {
                cutoff.setUTCHours(15, 0, 0); // Deadline is 3pm BST
            } 
            else if (isSunday) {
                cutoff.setUTCHours(15, 0, 0); // Deadline is 3pm BST
            }
            else {
                cutoff.setUTCHours(21, 0, 0); // Deadline is 10pm BST
                excludedDays = [];
            }
            
            cutoff = cutoff.getTime(); // Convert to MS since epoch
            
            // Create countdown component
            UC2.countdown({
                cutoff: cutoff,
                element: '.IT_countdown',
                delivery: {
                    deliveryDays: 1,
                    excludeDays: excludedDays,
                    deliveryDayElement: '.IT_countdown-day',
                    tomorrowLabel: true
                }
            });
        }
    })();
}
