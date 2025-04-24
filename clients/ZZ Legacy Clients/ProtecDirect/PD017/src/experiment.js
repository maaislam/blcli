// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
/* eslint-disable */
const PD006 = (() => {

	// Experiment code
	const activate = () => {
		var $ = window.jQuery;
		var $body = $('body');
		$body.addClass('PD006');

		/*-------------------------------
		Top Slider - page using jcarousel
		---------------------------------*/

		var PD006SlickDependentCode = function(){
      const bodyVar = document.body;
      const oldSliderSlides = bodyVar.querySelectorAll('#homepage_slider > ul > li');
      
          bodyVar.querySelector('#nav_secondary').insertAdjacentHTML('afterend', `
          <section class="landing_wrap PD006_Banner_Carousel">
            <div class="landing_slider"> 
              <div class="PD006_Slider_Wrap">
              </div>
            </div>
          </section>
        `);

        // Assign Selectors

        let PD006SlickParent = bodyVar.querySelector('.PD006_Slider_Wrap');
        bodyVar.querySelector('.landing_wrap.PD006_Banner_Carousel').className = 'PD006_landing_wrap PD006_Banner_Carousel';
        PD006SlickParent.classList.add('PD006_landing_slider');
        PD006SlickParent.classList.remove('landing_slider');
        PD006SlickParent = $(PD006SlickParent);
        // Retrieve information from default slider
        // Add to slick slider
        for (let i = 0; i < oldSliderSlides.length; i += 1) {
          const currentSlide = oldSliderSlides[i];
          const currentTitle = currentSlide.querySelector('img').getAttribute('title');
          const currentImage = currentSlide.querySelector('img').getAttribute('src');
          const currentLink = currentSlide.querySelector('a').getAttribute('href');
          const currentSlideMarkup = `
          <div class="PD006_Slide_Container">
            <a class="PD006_Slide_Link" href="${currentLink}">
              <img class="PD006_Slide_Image" src="${currentImage}" alt="${currentTitle}"/>
            </a>
          </div>
          `;
          PD006SlickParent[0].insertAdjacentHTML('beforeend', currentSlideMarkup);
        }
        // Configure slick
        PD006SlickParent.slick({
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        });

      // Old Slider Code
			// var slider = $('<div class="pd6-topCarousel"><ul class="pd6-slider"/></div>');
			// slider.insertAfter('#nav_secondary');
	
	
			// var slides = [['pd6-background1', 'https://www.protecdirect.co.uk/All-Discounts/Special-Offers~c~special_offers', 'https://d191y0yd6d0jy4.cloudfront.net/knon3tgx92jkagi.jpg']];
	
			// $.each(slides, function () {
			// 	var name = this[0],
			// 		link = this[1];
	
			// 	$(['<li class="pd6-slide ' + name + '"><a href="' + link + '"/></li>'].join('')).appendTo('.pd6-slider');
			// });

			// $('.pd6-slider').slick({
			// 	dots: true,
			// 	infinite: true,
			// 	autoplay: true,
			// 	autoplaySpeed: 3000,
			// 	slide: '.pd6-slide',
			// 	slidesToShow: 1,
			// 	slidesToScroll: 1,
			// 	arrows: false
			// });

		}


		if($.fn.slick){
			PD006SlickDependentCode();
		} else {
			$.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD006SlickDependentCode);
		}


		
		/*-------------------------------
		FEEFO REVIEW
		---------------------------------*/

		// var feefoBlock = $('<div class="pd5-feefo">feefo</div>');
		// feefoBlock.insertAfter('.siteLogo');

		// var reviewRating = '4.5',
		// reviewNumber = '214';

		// feefoBlock.html(['<img src="//www.sitegainer.com/fu/up/fxr20ig92jlk62z.png"/>',
		// 				'<div class="feefoReviews">',
		// 					'<h4>'+reviewRating+' / 5</h4>',
		// 					'<p>based on '+reviewNumber+' reviews</p>',
		// 				'</div>'
		// 			].join(''));

		

		//special offers
		var specialOffers = $('#content .span-24:first');
		specialOffers.addClass('pd6-specialoffers').prepend('<div class="pd6-sotitletext"><h3>Special Offers</h3><p>While stocks last!</p></div>');

		//Countdown
		/*-------------------------------
		Countdown
		---------------------------------*/
		var UC = UC || {};
		// UC Library - Countdown -- @version 0.3.4
		UC.countdown=function(e){var t={cutoff:null,element:null,labels:{d:"days",h:"hours",m:"minutes",s:"seconds"},delivery:{deliveryDays:null,excludeDays:null,deliveryDayElement:null,tomorrowLabel:!1}},a=function(e,t){var l,n;for(var r in t)l=e[r],n=t[r],Object.keys&&-1===Object.keys(e).indexOf(r)||("object"==typeof n?"[object Array]"===Object.prototype.toString.call(n)?e[r]=n:a(l,n):e[r]=n)};function l(e){var t=function(){return c.indexOf(d[e.getDay()])>-1};if(t())for(;t();)e.setDate(e.getDate()+1);return e}a(t,e);var n,r,o=new Date,s=new Date(t.cutoff),d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],u=t.delivery,y=u.deliveryDays,c=u.excludeDays,i=u.deliveryDayElement,f={};if(c.length&&c.indexOf(d[o.getDay()]>-1)){var D=l(new Date(o)),v=(n=o,r=D,Math.round(Math.abs(+n-+r)/864e5));s.setDate(s.getDate()+v)}o>s&&(s.setDate(s.getDate()+1),s=l(s)),f.cutoff=s.getTime();var g,h=Math.floor((s.getTime()-o.getTime())/1e3),m=document.querySelectorAll(t.element),b=setInterval(function(){var e=Math.floor(h/24/60/60),a=Math.floor(h-86400*e),l=Math.floor(a/3600),n=Math.floor(a-3600*l),r=Math.floor(n/60),o=h%60;o<10&&(o="0"+o);for(var s=0,d=m.length;s<d;s++)m[s].innerHTML=[e>0?'<span class="UC_cd-days">'+e+"</span> "+t.labels.d+" ":"",'<span class="UC_cd-hours">'+l+"</span> "+t.labels.h+" ",'<span class="UC_cd-minutes">'+r+"</span> "+t.labels.m+" ",'<span class="UC_cd-seconds">'+o+"</span> "+t.labels.s+" "].join("");0===h?clearInterval(b):h--},1e3);if(y){var M=((g=new Date).setDate(s.getDate()+y),g=l(g)),p=document.querySelectorAll(i),w=d[M.getDay()];if(u.tomorrowLabel){var T=new Date(o);T.setDate(T.getDate()+1),T.getFullYear()==M.getFullYear()&&T.getMonth()==M.getMonth()&&T.getDate()==M.getDate()&&(w="tomorrow")}for(var j=0,O=p.length;j<O;j++)p[j].innerHTML=w;f.deliveryDate=M.getTime(),f.deliveryDay=w}return f};


		var countdownWrap = $('<div class="pd6-countdown"></div>')
		countdownWrap.insertAfter('#content .span-24:first');

		var cutoff = new Date(); 
		cutoff.setUTCHours(16, 0, 0);
		cutoff = cutoff.getTime();
		
		$('.pd6-countdown').html([
			'<div class="pd6-countdown-inner span-18">',
				'<img src="//www.sitegainer.com/fu/up/wtnua7kuxuvvgar.png"/>',
				'<h3>Place your orders in the next</h3>',
				'<div class="countdown">',
					'<div id="pd6_countdown"></div>',
				'</div>',
				'<h3>for <span id="pd6_delivery-day"></span> delivery</h3>',
			'</div>'
    ].join(''));

		var countdown = UC.countdown({
			cutoff: cutoff,
			element: '#pd6_countdown',
			delivery: {
				deliveryDays: 1, // How long an item takes to arrive
        excludeDays: ['Saturday', 'Sunday'], // Non-working days
        deliveryDayElement: '#pd6_delivery-day',
				tomorrowLabel: true
			}
		});
    
    // Change label to next day if tomorrow
    if ($('.pd6-countdown h3:last').text().indexOf('tomorrow') > -1) {
      $('.pd6-countdown h3:last').html('for <span id="pd6_delivery-day">next day</span> delivery');
    }

		// if(countdown.deliveryDay === 'Monday'){
		// 	$('.pd6-countdown-inner span').text('delivery on Monday');
		// }else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
		// 	$('.pd6-countdown-inner span').text('delivery on Tuesday');
		// }else{
		// 	$('.pd6-countdown-inner span').text('next day delivery');
		// }

		//Category Blocks
		var blocks = $('<div class="pd6-cat-blocks"><div class="pd6-blocks"/>');
		blocks.appendTo('#content');

		var category = [
			['http://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-~c~A', 'Over 100 different items to suit your needs', '//www.sitegainer.com/fu/up/dvt3zxjpqlc48s1.png'],
			['http://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF', 'Free delivery on all items', '//www.sitegainer.com/fu/up/xm3smfpp3rgflac.png'],
			['http://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE', 'Over 100 different items to suit your needs', '//www.sitegainer.com/fu/up/nlxa0r84e4j4jrr.png'],
			['http://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG', 'Free delivery on all items', '//www.sitegainer.com/fu/up/jj015ddbv35x44y.png'],
			['http://www.protecdirect.co.uk/Clothing-and-Workwear~c~B', 'Over 100 different items to suit your needs', '//www.sitegainer.com/fu/up/ywuihjew2c15hr3.png'],
			['http://www.protecdirect.co.uk/Site-Equipment-and-Consumables~c~D', 'Free delivery on all items', '//www.sitegainer.com/fu/up/rtixby0s8rhwnnz.png']
		]

		$.each(category, function () {
			var catlink = this[0],
				cattext = this[1],
				catimage = this[2];
			$(['<div class="pd6-block">',
				'<a href="' + catlink + '">',
				'<img src="' + catimage + '"/>',
				'</a>',
				'<div class="pd6-underblocktext">' + cattext + '</div>',
				'</div>'
			].join('')).appendTo('.pd6-blocks');
		});


		/*-------------------------------
		Move header elements
		---------------------------------*/
		$('.manage_users.search').prependTo('.nav_secondary');
		$('.brands').prependTo('.nav_secondary');

		var headerTopelements = $('#header .nav');
			headerTopelements.insertBefore('#cart_header');
		/*-------------------------------
		Change register/signin
		---------------------------------*/
		var login = headerTopelements.find('.login'),
			register = headerTopelements.find('.register');

			register.html('<a href="/login">Sign In</a>'),
			login.html('<a href="/register">Register</a>');
		
		$('.La.sales_helpline').html('<span><b>Sales Helpline: </b>0870 333 3081</span>').prependTo(headerTopelements);
		/*-------------------------------
		Replace site logo
		---------------------------------*/
		$('.siteLogo .cmsimage img').attr('src','//www.sitegainer.com/fu/up/mei2jto6rm9040u.png');

		/*-------------------------------
		Navigation arrow
		---------------------------------*/
		$('.nav_main .La > a').each(function(){
			$(this).append('<img class="pd5-arrow" src="//www.sitegainer.com/fu/up/pjvl0pti7yz8ayw.png"/>')
		});

		/*-------------------------------
		Add Clearance & USP bars
		---------------------------------*/
		var uspBar = $('<div class="pd5-uspwrapper"></div>');
		uspBar.insertAfter('#nav_main');

	var uspHTML = [
		['<p class="pd5-countdownMessage"></p>','<span id="pd5-countdown">Order within</span>','//www.sitegainer.com/fu/up/1smo5lzomp18jsz.png'],
		['<b>Free</b> Delivery over £25','Free next day delivery as well! get it tomorrow','//www.sitegainer.com/fu/up/cu48usvvzzi8gvf.png'],
		['Contact us on <b>0870 333 3081</b>','Monday to friday between 8:30am & 5:30pm','//www.sitegainer.com/fu/up/krk8e45pv29w4so.png']
	]

	$.each(uspHTML, function(){
		var mainText = this[0],
			subText = this[1],
			icon = this[2];

		$(['<div class="pd5-usp">',
			'<img src="'+icon+'"/>',
				'<div class="pd5-usptext">',
				'<h3>'+mainText+'</h3>',
				'<p>'+subText+'</p>',
			'</div>',
		'</div>'].join('')).appendTo('.pd5-uspwrapper');
	});
		

	var clearanceBar = $('<div class="pd5-clearancewrapper"><a href="http://www.protecdirect.co.uk/All-Discounts/Clearance~c~clearance?utm_source=Homepage&utm_medium=Banner&utm_campaign=Clearance%20Header%20Slot">Clearance <img src="https://ab-test-sandbox.userconversion.com/experiments/PD005-rightarrow.png"/></a></div>');
		clearanceBar.insertAfter(uspBar);
	
	/*-------------------------------
	LOGGED IN AMEND
	---------------------------------*/
	var loggedIn = $('.nav .logged_in');
	if(loggedIn.length){
	$('.nav').addClass('pd5-loggedin');

	$('.logged_in, .my_account, .logout').wrapAll('<div class="pd5-loggedinlinks"/>');
	}else{
	$('.nav').removeClass('pd5-loggedin');
	}

  // Create cutoff date and convert to ms since epoch with getTime
	var cutoff = new Date();
	cutoff.setUTCHours(16, 0, 0);
  cutoff = cutoff.getTime();
  
	// Put your containers somewhere
	$('#pd5-countdown').append([
		'<div class="countdown">',
			'<div id="pd5_countdown"></div>',
		'</div>',
  ].join(''));

  var $countdownMsg = $('.pd5-countdownMessage');
  $countdownMsg.html('Get it by <b id="pd5_delivery-day"></b>');

  var countdown = UC.countdown({
		cutoff: cutoff,
		element: '#pd5_countdown',
		delivery: {
			deliveryDays: 1, // How long an item takes to arrive
			excludeDays: ['Saturday', 'Sunday'], // Non-working days
			deliveryDayElement: '#pd5_delivery-day',
			tomorrowLabel: true
		}
  });

  if ($countdownMsg.text().indexOf('tomorrow') > -1) {
    $countdownMsg.html('<b>Next Day</b> Delivery');
  }

	// if(countdown.deliveryDay === 'Monday'){
	// 	$('.pd5-countdownMessage').html('Get it by <b>Monday</b>');
	// }else if(countdown.deliveryDay === 'Saturday' || countdown.deliveryDay === 'Sunday'){
	// 	$('.pd5-countdownMessage').html('Get it by <b>Tuesday</b>');
	// }else{
	// 	$('.pd5-countdownMessage').html('<b>Next Day</b> Delivery');
	// }

	$('.manage_users.search .button').attr('src','//www.sitegainer.com/fu/up/x0i4dhcnbheljdy.png');
	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		//utils.fullStory('PD006', 'Variation 1');
		UC.poller(['body',
		'#content',
		'.cms_banner_slot',
		'#header',
		'.nav_secondary',
		'#cart_header',
		'.siteLogo .cmsimage',
    '.La.sales_helpline',
    '#homepage_slider > ul > li',
    '#homepage_slider > ul > li a',
    '#homepage_slider > ul > li img',
		() => {
			if (/^(\/)($|\?.*)/.test(window.location.pathname)) {
				return true;
			}
    },
    () => {
      if (window.jQuery) {
          $ = window.jQuery
          return true;
      }
  }
		], activate);

	})();

})();

//--------------
//   PD017
//--------------

const PD017 = (() => {
    let trackerName,
        slideQ = false,
        $ = window.jQuery;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '.PD006_landing_wrap.PD006_Banner_Carousel',
		], init);
		

		//Store product information when on product page
		UC.poller([
			'.prod.buynow > h3 > a', '.prod_image_main > a > img', '#variant-price-header', '.big-price .price_details',
		], function(){

			let jsonArray;
			let alreadyInArray = false;
			
			if(localStorage.getItem('PD017-Products')){
				jsonArray = localStorage.getItem('PD017-Products');
				jsonArray = JSON.parse(jsonArray);
			}
			else {
				jsonArray = [];
			}

			//Push product information to local storage

			const PD017ProductBrand = document.querySelector('.prod.buynow > h3 > a').textContent;
			const PD017ProductBrandLink = document.querySelector('.prod.buynow > h3 > a').getAttribute('href');
			const PD017ProductName = document.querySelector('.prod.buynow > h3 > label').textContent;
			const PD017ProductImageLink = document.querySelector('.prod_image_main > a > img').getAttribute('src');
			const PD017ProductLink = window.location.pathname;
			const PD017ExVATPrice = document.getElementById('variant-price-header').textContent + " " + document.querySelector('.big-price .price_details').textContent.trim();


			for(let i = 0; i < jsonArray.length; i++){
				if(jsonArray[i].href == PD017ProductLink){
					alreadyInArray = true;
				};

			};

			if(alreadyInArray === false){
				jsonArray.push({"title": PD017ProductName, "name": PD017ProductName, "img": PD017ProductImageLink, "href": PD017ProductLink, "ExVATPrice": PD017ExVATPrice, "Brand": PD017ProductBrand, "BrandLink": PD017ProductBrandLink});

				if(jsonArray.length > 10){
					jsonArray.shift();
				};

				jsonArray = JSON.stringify(jsonArray);
				localStorage.setItem('PD017-Products', jsonArray);
			};


		});

    })();

    function init(){
        utils.fullStory('PD017', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const bannerParent = bodyVar.querySelector('.PD006_landing_wrap.PD006_Banner_Carousel');
			const PD017SignOutMessage = bodyVar.querySelector('.information_message.neutral');
			let PD017Array; 
			let PD017SliderContentParent;
			let PD017PrevArrow;
			let PD017NextArrow;

            bodyVar.classList.add('PD017');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				bannerParent,
				PD017Array,
				PD017SliderContentParent,
				PD017PrevArrow,
				PD017NextArrow,
				PD017SignOutMessage
            };
        })();


        const testBuilder = {

            setupElements(){
        // Default running event
        utils.events.send('PD017', 'View', 'PD017 activated - Variation 1', {sendOnce: true});

				//Amend test if sign out message exists

				if(cacheDom.PD017SignOutMessage != null){
					//Move sign out message 
					cacheDom.bannerParent.insertAdjacentElement('beforebegin', cacheDom.PD017SignOutMessage);

					//Reposition special offers carousel

					cacheDom.bodyVar.querySelector('#globalMessages > .span-24').insertAdjacentElement('beforeend', cacheDom.bodyVar.querySelector('#content > .span-24 > .span-18'));
					cacheDom.bodyVar.querySelector('#globalMessages > .span-24 > .span-18').insertAdjacentElement('beforeend', cacheDom.bodyVar.querySelector('#content > .span-24 > .span-6'));
				}


				if(localStorage.getItem('PD017-Products')){
                    cacheDom.PD017Array = localStorage.getItem('PD017-Products');
                    cacheDom.PD017Array = JSON.parse(cacheDom.PD017Array);
				}
				else {
					cacheDom.PD017Array = 0;
				}

				if(cacheDom.PD017Array.length > 0){
					//Returning user, build test

					let PD017Markup = (`
						<div class="PD017-Wrapper">
							<div class="PD017-Header-Wrapper">
								<p class="PD017-Header-Text">Jump Back In</p>
							</div>
							<div class="PD017-Buttons-Wrapper">
								<p class="PD017-Favourites-Button-Wrapper">
									<a class="PD017-Favourites-Button" href="my-account/my-favourites">View My Favourites</a>
								</p>
								<p class="PD017-Order-History-Button-Wrapper">
									<a class="PD017-Order-History-Button" href="/my-account/orders">View My Order History</a>
								</p>
							</div>
						</div>
					`);

					cacheDom.bannerParent.insertAdjacentHTML('afterend', PD017Markup);
					functionalityBuilder.buildRecentlyViewedCarousel();	
					functionalityBuilder.buildTracking();

				}

            }

        };

        
        const functionalityBuilder = {

			//Builds the functions of the test

			buildRecentlyViewedCarousel(){

				var PD017SlickDependentCode = function(){
					let recentlyViewedSliderMarkup = (`
				<p class="PD017_RecentlyViewed_Carousel_Header">Recently Viewed</p>
					<section class="landing_wrap">
						<div class="landing_slider">
					</div>
				</section>
				`);

				cacheDom.bodyVar.querySelector('.PD017-Buttons-Wrapper').insertAdjacentHTML('afterend', recentlyViewedSliderMarkup);
				cacheDom.PD017SliderContentParent = $('.PD017-Wrapper > .landing_wrap > .landing_slider');

				cacheDom.PD017Array = cacheDom.PD017Array.reverse();


				for(let i = 0; i < cacheDom.PD017Array.length; i++){
			
					let PD017_CarouselMarkup = (`
					<div class="PD017_CarouselWrapper">
							<h3 class="PD017_Carousel_Brand_Text"><a class="PD017_Brand_Link" href="`+ cacheDom.PD017Array[i].BrandLink +`">` + cacheDom.PD017Array[i].Brand + `</a></h3>
							<a class="PD017_Carousel_Image_Link" href="`+ cacheDom.PD017Array[i].href +`">
								<img class="PD017_Carousel_Image" src="`+ cacheDom.PD017Array[i].img +`" alt="` + cacheDom.PD017Array[i].title + `"/>
							</a>
							<h3 class="PD017_Carousel_Product_Title"><a class="PD017_Carousel_Product_Link" href="` + cacheDom.PD017Array[i].href +`">` + cacheDom.PD017Array[i].title + `</h3>
								<p class="PD017_Carousel_Product_ExVAT_Price">` +  cacheDom.PD017Array[i].ExVATPrice +`</p>
								</a>
					</div>
					`);
					
					cacheDom.PD017SliderContentParent.append(PD017_CarouselMarkup);
					
        };
        
				cacheDom.bodyVar.querySelector('.PD017-Wrapper .landing_wrap').className = "PD017_landing_wrap";
				cacheDom.bodyVar.querySelector('.PD017-Wrapper .landing_slider').classList.add('PD017_landing_slider');
				cacheDom.bodyVar.querySelector('.PD017_landing_slider').classList.remove('landing_slider');
			

				cacheDom.PD017SliderContentParent.slick({
					slidesToShow: 5,
					slidesToScroll: 5,
					infinite: false,
					arrows: true
				});

				//Hide Slick's default arrows
				//Add click events to hide and show slick arrows
				
				if(cacheDom.PD017Array.length > 5){

					cacheDom.PD017PrevArrow = $('.PD017-Wrapper .slick-prev.slick-arrow');
					cacheDom.PD017NextArrow = $('.PD017-Wrapper .slick-next.slick-arrow');

					cacheDom.PD017PrevArrow.text("");
					cacheDom.PD017NextArrow.text("");

					cacheDom.PD017PrevArrow.hide();


					cacheDom.PD017PrevArrow.on("click", function(){
						cacheDom.PD017PrevArrow.hide();
						cacheDom.PD017NextArrow.show();
					});

					cacheDom.PD017NextArrow.on("click", function(){
						cacheDom.PD017NextArrow.hide();
						cacheDom.PD017PrevArrow.show();
					});

				}

				//set slick slider height
				
					UC.poller([
						'.PD017_landing_slider.slick-initialized.slick-slider', '.PD017_CarouselWrapper',
					], function () {
						let slickHeight = 0;
						let PD017SlickSlides = $('.PD017_CarouselWrapper');

						for (let i = 0; i < PD017SlickSlides.length; i++) {

							if ($(PD017SlickSlides[i]).outerHeight() > slickHeight) {
								slickHeight = $(PD017SlickSlides[i]).outerHeight();
							};

						};
						$('.PD017_landing_wrap').height(slickHeight + 2);

					});	
				

				}

				if($.fn.slick){
					PD017SlickDependentCode();
				} else {
					$.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD017SlickDependentCode);
				}

				
			},

			buildTracking(){
				cacheDom.bodyVar.querySelector('.PD017-Favourites-Button').addEventListener("click", function(){
					utils.events.send('PD017', 'Homepage', 'My Favourites', {sendOnce: true});
				});

				cacheDom.bodyVar.querySelector('.PD017-Order-History-Button').addEventListener("click", function(){
					utils.events.send('PD017', 'Homepage', 'My Order History', {sendOnce: true});
				});

				$('.PD017-Wrapper .PD017_Brand_Link').on("click", function(){
					utils.events.send('PD017', 'Recently Viewed Carousel', 'Brand', {sendOnce: true});
				});

				$('.PD017-Wrapper .PD017_Carousel_Product_Link').on("click", function(){
					utils.events.send('PD017', 'Recently Viewed Carousel', 'Product', {sendOnce: true});
				});

			}


		};
		
    //Start Test
	testBuilder.setupElements();
    }    
})();