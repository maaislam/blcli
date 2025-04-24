var IT007v2 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	
	UC.poller([
        '.catalog-product-view',
        '#product-addtocart-button',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){
		var $ = window.jQuery,
			productTitle= $('.product-name h1').text();

		$('body').addClass('IT007');
		
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
						'You\'ve got nothing to lose. With our free returns you can complete the look now, and make sure it\'s right when it arrives</div>',
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

		if (slideQ === false) {
			$(".IT_pop-up_modal .IT_close_btn, .IT_basket-btn").on("click", function (e) {
				slideQ = true;
				e.preventDefault();

				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
				$('body').removeClass('IT_checkout_hide');
						slideQ = false;
					});
				} else {
					modal.fadeIn("slow", function () {
						modal.addClass("active");
				$('body').removeClass('IT_checkout_hide');
						slideQ = false;
					});
				}
			});

			$('.IT_bg-trigger').on("click", function () {
				if (modal.hasClass("active")) {
					modal.fadeOut("slow", function () {
						modal.removeClass("active");
				$('body').removeClass('IT_checkout_hide');
						slideQ = false;
					});
				}
			});
			
			$('#product-addtocart-button').on('click', function(e){
				slideQ = true;
				e.preventDefault();
				$('body').addClass('IT_checkout_hide');

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
			});
		}

        if($('body').hasClass('category-clothing') || 
            $('body').hasClass('category-tops') || 
            $('body').hasClass('category-bodysuits') || 
            $('body').hasClass('category-playsuits') || 
            $('body').hasClass('category-jumpsuits') ||
            $('body').hasClass('category-sets-co-ords') ||
            $('body').hasClass('category-skirts-shorts') ||
            $('body').hasClass('category-shirts') ||
            $('body').hasClass('category-denim') || 
            $('body').hasClass('category-trousers-leggings') ||
            $('body').hasClass('category-swimwear') ||
            $('body').hasClass('category-jumpers-sweatshirts') ||
            $('body').hasClass('category-jackets-coats') ||
            $('body').hasClass('category-activewear') ||
            $('body').hasClass('category-loungewear') ||
            $('body').hasClass('category-lingerie-nightwear') ||
            $('body').hasClass('category-curve-clothing') ||
            $('body').hasClass('category-premium') ||
            $('body').hasClass('category-last-change-to-buy-clothing')
        ){
            var productName1 = 'Shop All Shoes',
                productName2 = 'Shop Accessories',
                itemImg1 = 'https://media.inthestyle.com/wysiwyg/thumbnail_shoes.jpg',
                itemImg2 = 'https://media.inthestyle.com/wysiwyg/Accessories_June2017_thumbnail.jpg',
                productHref1 = '/shoes',
                productHref2 = '/accessories';
        }
        else if($('body').hasClass('category-shoes') ||
            $('body').hasClass('category-high-heels') ||
            $('body').hasClass('category-flats') ||
            $('body').hasClass('category-sandals') ||
            $('body').hasClass('category-wedges') ||
            $('body').hasClass('category-boots') ||
            $('body').hasClass('category-flatforms') ||
            $('body').hasClass('category-wide-fit')
        ){
            var productName1 = 'Shop All Clothing',
                productName2 = 'Shop Accessories',
                itemImg1 = 'https://media.inthestyle.com/wysiwyg/Clothing_June2017_thumbnail.jpg',
                itemImg2 = 'https://media.inthestyle.com/wysiwyg/Accessories_June2017_thumbnail.jpg',
                productHref1 = '/clothing',
                productHref2 = '/accessories';
        }
        else if($('body').hasClass('category-accessories') ||
            $('body').hasClass('category-beauty') ||
            $('body').hasClass('category-belts') ||
            $('body').hasClass('category-body-jewllery') ||
            $('body').hasClass('category-chokers') ||
            $('body').hasClass('category-shapewear') ||
            $('body').hasClass('category-hair-accessories') ||
            $('body').hasClass('category-hats-scarves') ||
            $('body').hasClass('category-jewellery') ||
            $('body').hasClass('category-tights-socks') ||
            $('body').hasClass('category-phone-cases') ||
            $('body').hasClass('category-stationery') ||
            $('body').hasClass('category-sunglasses')
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
                '<div class="IT_img"><a href="' + productHref1 + '"><img src="' + itemImg1 + '" /></a></div>',
                '<h3><a href="' + productHref1 + '">' + productName1 + '</a></h3>',
            '</div>',
            '<div class="IT_slide">',
                '<div class="IT_img"><a href="' + productHref2 + '"><img src="' + itemImg2 + '" /></a></div>',
                '<h3><a href="' + productHref2 + '">' + productName2 + '</a></h3>',
            '</div>'
        ].join(''));

        

        var interval = setInterval(function(){
            if($('.IT_slider.slick-initialized').length > 0){
                $('.IT_slide a').on('click', function(e){
                    e.preventDefault();
                    var bodClass = $.grep($('body').attr('class').split(" "), function(v, i){
                        return v.indexOf('category-') === 0;
                    }).join();
                    if(bodClass == ''){
                        bodClass = window.location;
                    }

                    sendEvent('IT007v2', 'IT007v2: ' + bodClass, 'IT007v2: ' + $(this).text(), true);
                });
                clearInterval(interval);
                return;
            }
        }, 200);   
	}
})();

