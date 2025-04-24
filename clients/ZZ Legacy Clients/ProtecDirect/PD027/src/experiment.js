/* eslint-disable */


// Using old experiment template as test contains PD006
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

//PD006

// ID - Experiment Title
const PD006 = (() => {

	// Experiment code
	const activate = () => {
		var $ = window.jQuery;
		var $body = $('body');

		$body.addClass('PD006');
		
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
    // PD027 Client amend - Insert delivery countdown banner before special offers carousel
		countdownWrap.insertBefore('#content .span-24:first');

		var cutoff = new Date(); 
		cutoff.setUTCHours(17, 0, 0);
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
		blocks.insertAfter('.pd6-countdown');

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
		$('.siteLogo .cmsimage img').attr('src','//cdn-sitegainer.com/nud86nmk3co1wmb.png');

		/*-------------------------------
		Navigation arrow
		---------------------------------*/
		$('.nav_main .La > a').each(function(){
			$(this).append('<img class="pd5-arrow" src="//www.sitegainer.com/fu/up/pjvl0pti7yz8ayw.png"/>')
		});

		/*-------------------------------
		Add Clearance & USP bars
		---------------------------------*/
    if(!$('.pd5-uspwrapper').length) {
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
		

	var clearanceBar = $('<div class="pd5-clearancewrapper"><a href="http://www.protecdirect.co.uk/All-Discounts/Clearance~c~clearance?utm_source=Homepage&utm_medium=Banner&utm_campaign=Clearance%20Header%20Slot">Clearance <img src="//cdn-sitegainer.com/pgeme4q8fhxi6kj.png"/></a></div>');
		clearanceBar.insertAfter(uspBar);
  }
	
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
	cutoff.setUTCHours(17, 0, 0);
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
    () => {
      if (window.jQuery) {
          $ = window.jQuery
          return true;
      }
    },
    //Only activate test on the homepage, enables testing with PD017
		() => {
			if (/^(\/)($|\?.*)/.test(window.location.pathname)) {
				return true;
			}
		}
		], activate);

	})();

})();

// PD027

// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

const PD027 = (() => {
    let trackerName,
        slideQ = false,
        $ = window.jQuery;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '.pd6-countdown', // change
            '#homepage_slider > ul > li',
            '#homepage_slider > ul > li a',
            '#homepage_slider > ul > li img',
            '#nav_secondary',
        ], init);
    })();

    function init(){
        utils.fullStory('PD027', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');
            const PD006CountdownContainer = bodyVar.querySelector('.pd6-countdown');
            const oldSliderSlides = bodyVar.querySelectorAll('#homepage_slider > ul > li');
            const searchFilterBar = bodyVar.querySelector('#nav_secondary');

            bodyVar.classList.add('PD027');
            let PD027SlickParent;
            
            //Retun the selectors we want to reference in other parts of the test
            return {
                bodyVar,
                PD006CountdownContainer,
                oldSliderSlides,
                searchFilterBar,
                PD027SlickParent,
            };
        })();


        const testBuilder = {

            setupElements(){
              // Default running event
              utils.events.send('PD027', 'View', 'PD027 activated - Variation 1', {sendOnce: true});
              // Build carousel
              testBuilder.renderCarousel();
              // Build offer blocks
              testBuilder.renderBlocks();
            },

            renderCarousel(){
                /*-------------------------------
                Top Slider - page using jcarousel
                ---------------------------------*/

                var PD027BannerCarousel = function(){
                cacheDom.searchFilterBar.insertAdjacentHTML('afterend', `
                  <section class="landing_wrap PD027_Banner_Carousel">
                    <div class="landing_slider"> 
                      <div class="PD027_Slider_Wrap">
                      </div>
                    </div>
                  </section>
                `);

                // Assign Selectors
                cacheDom.PD027SlickParent = cacheDom.bodyVar.querySelector('.PD027_Slider_Wrap');
                cacheDom.bodyVar.querySelector('.landing_wrap.PD027_Banner_Carousel').className = 'PD027_landing_wrap PD027_Banner_Carousel ';
                cacheDom.PD027SlickParent.classList.add('PD027_landing_slider');
                cacheDom.PD027SlickParent.classList.remove('landing_slider');
                cacheDom.PD027SlickParent = $(cacheDom.PD027SlickParent);
            
                // Retrieve information from default slider
                // Add to slick slider
                for (let i = 0; i < cacheDom.oldSliderSlides.length; i += 1) {
                  const currentSlide = cacheDom.oldSliderSlides[i];
                  const currentImage = currentSlide.querySelector('img').getAttribute('src');
                  const currentAlt = currentSlide.querySelector('img').getAttribute('alt').trim();
                  const currentLink = currentSlide.querySelector('a').getAttribute('href');
                  const currentSlideMarkup = `
                  <div class="PD027_Slide_Container">
                    <a class="PD027_Slide_Link" href="${currentLink}">
                      <img class="PD027_Slide_Image" src="${currentImage}" alt="${currentAlt}"/>
                    </a>
                  </div>
                  `;
                  cacheDom.PD027SlickParent[0].insertAdjacentHTML('beforeend', currentSlideMarkup);
                }
                // Build custom buttons using image alt text
                cacheDom.PD027SlickParent.slick({
                  dots: true,
                  infinite: true,
                  autoplay: true,
                  slidesToShow: 1,
                  autoplaySpeed: 5000,
                  slidesToScroll: 1,
                  arrows: false,
                  customPaging: (slick, index) => {
                    const targetText = slick.$slides.eq(index).find('img').attr('alt') || '';
                    return `<span class="PD027_Slider_Button">${targetText}</span>`;
                  },
                });
              }


              if($.fn.slick){
                PD027BannerCarousel();
              } else {
                $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', PD027BannerCarousel);
              }
            },

            renderBlocks() {
              const largeOfferData = {
                link: '/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Winter-Essentials~c~DAI?q=%3Aprice-asc&show=All&utm_source=Homepage&utm_medium=7ContentBanner&utm_campaign=WinterEssentials_170918',
                img: '//cdn-sitegainer.com/to67on9bc89qwhj.jpg',
                alt: '15% Off Winter Essentials',
              };
              
              const offerBlockData = [
                { img: '//cdn-sitegainer.com/03nzi0wijr7u0sg.jpg', alt: 'Matrix P Grip Black PU Coated Nylon Glove', link: '/Personal-Protective-Equipment-PPE-/Hand-Protection/PU-Coated-Gloves/Matrix-P-Grip-Black-PU-Coated-Nylon-Glove~p~POL40?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=POL40_140119' },
                { img: '//cdn-sitegainer.com/3hay323qriigkcx.jpg', alt: 'White General Disposable Coverall', link: '/Clothing-and-Workwear/Disposable-Workwear/Disposable-Coveralls/White-General-Disposable-Coverall~p~WDC?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=WDC_140119' },
                { img: '//cdn-sitegainer.com/zmfyb5cldgc6ygw.jpg', alt: 'Chukka Boot with Scuff Cap S3', link: '/Personal-Protective-Equipment-PPE-/Safety-Footwear/Chukka-Boots/Tuf-Pro-Chukka-Boot-with-Scuff-Cap-S3-SRC~p~ATTACK?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=ATTACK_140119' },
                { img: '//cdn-sitegainer.com/6elnha6unn4fblg.jpg', alt: 'Economy Latex Disposable Glove', link: '/Personal-Protective-Equipment-PPE-/Hand-Protection/Disposable-Gloves/Economy-Latex-Disposable-Glove~p~GLO420?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=GLO420_140119' },
                { img: '//cdn-sitegainer.com/lq2lldg9b7moqah.jpg', alt: 'Dunlop Acifort Ribbed Full Safety Wellington - S5 SBP SRA', link: '/Personal-Protective-Equipment-PPE-/Safety-Footwear/Wellington-Boots/Dunlop-Acifort-Ribbed-Full-Safety-Wellington-S5-SBP-SRA~p~A252931?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=A252931_140119' },
                { img: '//cdn-sitegainer.com/moehrzxzn0ne6bo.jpg', alt: 'Marigold Industrial Puretough P3000 Cut Protection Glove', link: '/Personal-Protective-Equipment-PPE-/Hand-Protection/Nitrile-Coated-Gloves/Marigold-Industrial-Puretough-P3000-Cut-Protection-Glove~p~P3000?utm_source=Homepage_Desktop&utm_medium=7ContentBanners&utm_campaign=P3000_140119' },
              ];

              cacheDom.PD006CountdownContainer.insertAdjacentHTML('beforebegin', `
              <div class="PD027_Large_Offer_Wrap">
                <a class="PD027_Large_Offer_Link" href="${largeOfferData.link}">
                  <img class="PD027_Large_Offer_Image" src="${largeOfferData.img}" alt="${largeOfferData.alt}"/>
                </a>
              </div>
              <div class="PD027_Small_Offer_Wrap">
              </div>
              `);
              const PD027SmallCategoryParent = cacheDom.bodyVar.querySelector('.PD027_Small_Offer_Wrap');
              for (let i = 0; i < offerBlockData.length; i += 1) {
                PD027SmallCategoryParent.insertAdjacentHTML('beforeend', `
                  <div class="PD027_Small_Block">
                    <a href="${offerBlockData[i].link}" class="PD027_Offer_Link_Small">
                      <img class="PD027_Offer_Small_Image" src="${offerBlockData[i].img}" alt="${offerBlockData[i].alt}" />
                    </a>
                  </div>
                `);
              }
            }

          };

    // Start Test
    testBuilder.setupElements();
       
    }    
})();
