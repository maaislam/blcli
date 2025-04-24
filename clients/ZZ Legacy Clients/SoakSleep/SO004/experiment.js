var _SO004 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Triggers
    UC.poller([
        'body',
        function() {
            if (window.jQuery) return true;
        },
        function() {
            if (window.ga) return true;
        }
    ], SO004, {
        timeout: 7000,
        multiplier: 'disable'
    });
    
    function SO004() {
    	var $ = window.jQuery;

    	UC.poller([
    		function () {
    			var fs = window.FS;
    			if (fs && fs.setUserVars) return true;
    		}
    	], function () {
    		window.FS.setUserVars({
    			experiment_str: 'SO004',
    			variation_str: 'Variation 1'
    		});
    	}, {
    		multiplier: 1.2,
    		timeout: 0
    	});

    	$('body').addClass('SO004');


    	var pageWrapper = $('.page-wrapper'),
    		categoryTitle = $('.sidebar-title').text().trim();

    	var banner = $('<div class="so4-banner"/>');
    	banner.insertAfter('h1.sidebar-title');

    	$('.guide-bed-line .item:first').appendTo(banner);


    	/*Press Blocks*/
    	var pressReview = pageWrapper.find('.cat-blocks .press-pillow .press')
    		.insertAfter(banner);


    	/*view all no products*/

    	var viewAll = $('<div class="so4-viewAll"><a href="#">View all <span></span> ' + categoryTitle + '</a></div>');
    	viewAll.insertAfter(pressReview);


    	var productListing_url = $('.breadcrumbs .items .item.home').next('li').find('a').attr('href');
    	viewAll.find('a').attr('href', productListing_url);

    	$.ajax({
    		url: productListing_url,
    		success: function (data) {
    			var d = document.createElement('div');
    			d.innerHTML = data;

    			var productAmount = $(d).find('.product-count').text().trim().replace(/[^0-9]/gi, '');;
    			viewAll.find('span').append(productAmount);

    		}

    	});
    	/*collapse categories*/
    	var categories = $('.sidebar.sidebar-main .heading');

    	$(categories).click(function (e) {
    		if (!$(this).hasClass('so4-filterActive')) {
    			$(this).addClass('so4-filterActive');
    			$(this).find('ul').slideDown(600);

    			if ($(categories).not(this).hasClass('so4-filterActive')) {
    				$('.heading').not(this).removeClass('so4-filterActive')
    				$('.heading').not(this).find('ul').slideUp(600);
    			}
    		} else {
    			if ($(this).hasClass('so4-filterActive')) {
    				$(this).removeClass('so4-filterActive');
    				$(this).find('ul').slideUp(600);
    			}
    		}
    	});
    	categories.each(function () {
    		$(this).find('span:first').append('<img src="http://www.sitegainer.com/fu/up/flph2qa9fsh4obw.png"/>');
    	});
	}

})();