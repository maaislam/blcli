/* no_doc_ready */

var CB080 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	UC.observer={active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}};
	var UC_={};UC_.now=Date.now||function(){return(new Date).getTime()},UC_.throttle=function(n,t,l){var e,r,u,a=null,i=0;l||(l={});var o=function(){i=!1===l.leading?0:UC_.now(),a=null,u=n.apply(e,r),a||(e=r=null)};return function(){var c=UC_.now();i||!1!==l.leading||(i=c);var v=t-(c-i);return e=this,r=arguments,v<=0||v>t?(a&&(clearTimeout(a),a=null),i=c,u=n.apply(e,r),a||(e=r=null)):a||!1===l.trailing||(a=setTimeout(o,v)),u}};
	
	console.log('test');
	
	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'.product-view .gen-tabs',
			'#product_tabs_question_contents',
			'#product_tabs_Yotporeview_contents',
			'#product_tabs_Yotporeview_contents .yotpo-sum-reviews',
			'.yotpo-review',
			'#product-name',
			'#product_tabs_question_contents',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'CB080',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var JQ = window.jQuery,
				bodyVar = JQ('body'),
				origTabsWrapper = JQ('.product-view'),
				origTabs = origTabsWrapper.find('.gen-tabs'),
				recentlyViewedOrig = document.getElementById('recently-viewed-container'),
				bundleOrig = origTabsWrapper.find('.bundle-slider'),
				footerOrig = JQ('.footer-container'),
				questionsBlock = origTabs.find('#product_tabs_question_contents'),
				reviewsBlock = origTabs.find('#product_tabs_Yotporeview_contents'),
				whatsInBox = origTabs.find('#product_tabs_Overview_contents .block.box-contents'),
				slideQ = false,
				productName = JQ('#product-name').text();
			
			// mobileTabBindOn variables
			var tabWrapper,
				tabsBlock,
				mobileTgl,
				mobileTglText,
				tabsBlockBtn,
				tabContentWrap,
				tabContentBlock;

			// Customer Reviews
			var totalReviews,
				starsWrap,
				prodRating = 0,
				reviewCountWrap = reviewsBlock.find('.yotpo-distibutions-sum-reviews'),
				reviewCountElement = reviewCountWrap.find('.yotpo-sum-reviews'),
				starWrap = reviewsBlock.find('.yotpo-distibutions-stars'),
				innerStar = starWrap.find('span.review-stars'),
				reviewBtn,
				reviewsWrap = reviewsBlock.find('.yotpo-reviews');

			// Questions Asked
			var questionsHeader,
				questionSection;

			//Unique markup Variables 
			var ExpertsTabContent,
				deliveryContentVar;

			var URL = window.location.href,
				currentURL;

			bodyVar.addClass('CB080');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				JQ: JQ,
				origTabs: origTabs,
				recentlyViewedOrig: recentlyViewedOrig,
				bundleOrig: bundleOrig,
				URL: URL,
				footerOrig: footerOrig,
				currentURL: currentURL,
				tabWrapper: tabWrapper,
				tabsBlock: tabsBlock,
				mobileTgl: mobileTgl,
				mobileTglText: mobileTglText,
				tabsBlockBtn: tabsBlockBtn,
				tabContentWrap: tabContentWrap,
				tabContentBlock: tabContentBlock,
				slideQ: slideQ,
				questionsBlock: questionsBlock,
				reviewsBlock: reviewsBlock,
				whatsInBox: whatsInBox,
				totalReviews: totalReviews,
				starsWrap: starsWrap,
				prodRating: prodRating,
				reviewCountWrap: reviewCountWrap,
				reviewCountElement: reviewCountElement,
				starWrap: starWrap,
				innerStar: innerStar,
				reviewBtn: reviewBtn,
				reviewsWrap: reviewsWrap,
				productName: productName,
				questionSection: questionSection,
				ExpertsTabContent: ExpertsTabContent,
				deliveryContentVar: deliveryContentVar
			};
		})();

		var URLChecker = {
			checkURL: function(){
				// Check the page URL and set a varible to be used later so the content is correct for the page the user is on

				if(cacheDom.URL.indexOf('/tria-hair-removal-laser-4x.html') > -1){
					cacheDom.currentURL = 'triaHair';
				}
				else if(cacheDom.URL.indexOf('/nuface-trinity.html') > -1){
					cacheDom.currentURL = 'nufaceTrinity';
				}
				else if(cacheDom.URL.indexOf('/smoothskin-gold-permanent-hair-removal.html') > -1){
					cacheDom.currentURL = 'smoothGold';
				}
				else if(cacheDom.URL.indexOf('/nuface-mini-facial-toner.html') > -1){
					cacheDom.currentURL = 'nufaceToner';
				}
				else if(cacheDom.URL.indexOf('/clarisonic-mia-2-facial-cleanser.html') > -1){
					cacheDom.currentURL = 'clarisonicMia';
				}
			}
		};

		var URLData = {
			// Using the URLChecker variable, set which content to use for the page the user is on
			URLContent: function(){
				if(cacheDom.currentURL == 'triaHair'){
					cacheDom.ExpertsTabContent = [
						'<div class="CB080_quote-block">',
							'<span class="CB080_quote-img"><img src="http://currentbody.com/media/wysiwyg/about-us-2017/emily.jpg" /></span>',
							'<strong>Tria is one of the leading brands in laser hair removal, and the 4x is one of our best-selling devices. The diode laser technology ensures permanent hair reduction, specifically targeting the hair follicle to give you smoother skin in just 12 weeks.</strong>',
							'<span class="CB080_quote-name">Emily, <span></span></span>',
						'</div>',
						'<div class="CB080_life_icon-wrap clearfix">',
							'<div class="CB080_lifestyle">',
								'<h4>Would suit <br/> these lifestyles</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/q8qox4iphhetm17.jpg" /> On the Go </div>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> Career-minded</div>',
							'</div>',
							'<div class="CB080_skin-types">',
								'<h4>Skin types <br/> most effective</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Combination skin</div>',
								'<div><img src="http://www.sitegainer.com/fu/up/z530gf1ke7wvxge.jpg" /> Normal skin</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-finder clearfix">',
							'<div class="CB080_img-block" style="background-image: url(http://www.currentbody.com/blog/wp-content/uploads/2017/08/home-facial-large.jpg)"></div>',
							'<div class="CB080_product_finder-content">',
								'<div>',
									'<h2>Need something different?<br /> Use our product finder to find your perfect product</h2>',
									'<a href="#">Launch product finder</a>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-use clearfix">',
							'<h2>How to use your PMD Kiss</h2>',
							'<div class="CB080_use-step clearfix">',
								'<span>1.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>2.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>3.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>4.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>5.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<p class="CB080_smallprint">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
						'</div>'
					].join('');

					cacheDom.deliveryContentVar = [
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>Delivery</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
									'<ul class="CB080_dot-variant">',
										'<li><strong>Standard Delivery</strong> - £2.50</li>',
										'<li><strong>Express Delivery</strong> - £4.50</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-image: url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/03/marble-wallpaper-8.jpg\');">',
									'<div><strong>Free delivery</strong> over £60</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>90 Day Money Back Guarantee</h2>',
									'<p>We\'re so confident that you\'ll get results you\'ll love with your Clarisonic from the first use that we offer a 90-day money</p>',
									'<ul class="CB080_tick-variant">',
										'<li>We ask that you have used the device for 60 seconds a day for 30 days to see consistent results.</li>',
										'<li>By using it for a month. it ensures that you have given the device a proper chance to start working on your skin.</li>',
										'<li>If you are still not satisfied, you can return the device for a 90-day money back guarantee.</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle">',
									'<div><strong>90 Day</strong> Money back guarantee</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>2 Year Warranty</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-color: #88B5C8; color: #fff;">',
									'<div><strong>2 year</strong> warranty</div>',
								'</div>',
							'</div>',
						'</section>'
					].join('');
				}
				else if(cacheDom.currentURL == 'nufaceTrinity'){
					cacheDom.ExpertsTabContent = [
						'<div class="CB080_quote-block">',
							'<span class="CB080_quote-img"><img src="http://currentbody.com/media/wysiwyg/about-us-2017/emily.jpg" /></span>',
							'<strong>This intelligent device gives your skin a natural lift. Using gentle microcurrent, the NuFACE Trinity tightens the muscles to improve your facial contour, skin tone and appearance of wrinkles. It’s like a simple gym session for your face. Plus, it only takes 5 minutes of your day.</strong>',
							'<span class="CB080_quote-name">Emily, <span></span></span>',
						'</div>',
						'<div class="CB080_life_icon-wrap clearfix">',
							'<div class="CB080_lifestyle">',
								'<h4>Would suit <br/> these lifestyles</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> On the Go </div>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> Career-minded</div>',
							'</div>',
							'<div class="CB080_skin-types">',
								'<h4>Skin types <br/> most effective</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Combination skin</div>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Normal skin</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-use clearfix">',
							'<h2>How to use your PMD Kiss</h2>',
							'<div class="CB080_use-step clearfix">',
								'<span>1.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>2.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>3.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>4.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>5.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<p class="CB080_smallprint">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
						'</div>'
					].join('');

					cacheDom.deliveryContentVar = [
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>Delivery</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
									'<ul class="CB080_dot-variant">',
										'<li><strong>Standard Delivery</strong> - £2.50</li>',
										'<li><strong>Express Delivery</strong> - £4.50</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-image: url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/03/marble-wallpaper-8.jpg\');">',
									'<div><strong>Free delivery</strong> over £60</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>90 Day Money Back Guarantee</h2>',
									'<p>We\'re so confident that you\'ll get results you\'ll love with your Clarisonic from the first use that we offer a 90-day money</p>',
									'<ul class="CB080_tick-variant">',
										'<li>We ask that you have used the device for 60 seconds a day for 30 days to see consistent results.</li>',
										'<li>By using it for a month. it ensures that you have given the device a proper chance to start working on your skin.</li>',
										'<li>If you are still not satisfied, you can return the device for a 90-day money back guarantee.</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle">',
									'<div><strong>90 Day</strong> Money back guarantee</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>2 Year Warranty</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-color: #88B5C8; color: #fff;">',
									'<div><strong>2 year</strong> warranty</div>',
								'</div>',
							'</div>',
						'</section>'
					].join('');
				}
				else if(cacheDom.currentURL == 'smoothGold'){
					cacheDom.ExpertsTabContent = [
						'<div class="CB080_quote-block">',
							'<span class="CB080_quote-img"><img src="http://currentbody.com/media/wysiwyg/about-us-2017/emily.jpg" /></span>',
							'<strong>Say goodbye to unwanted hair in just 12 weeks with SmoothSkin Gold. This small device uses powerful IPL technology to stunt hair growth at the root. What\'s more, it takes just 20 minutes to treat each area so it\'s very easy to keep up with the treatment cycle.</strong>',
							'<span class="CB080_quote-name">Emily, <span></span></span>',
						'</div>',
						'<div class="CB080_life_icon-wrap clearfix">',
							'<div class="CB080_lifestyle">',
								'<h4>Would suit <br/> these lifestyles</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> On the Go </div>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> Career-minded</div>',
							'</div>',
							'<div class="CB080_skin-types">',
								'<h4>Skin types <br/> most effective</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Combination skin</div>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Normal skin</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-finder clearfix">',
							'<div class="CB080_img-block" style="background-image: url(http://www.currentbody.com/blog/wp-content/uploads/2017/08/home-facial-large.jpg)"></div>',
							'<div class="CB080_product_finder-content">',
								'<div>',
									'<h2>Need something different?<br /> Use our product finder to find your perfect product</h2>',
									'<a href="#">Launch product finder</a>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-use clearfix">',
							'<h2>How to use your PMD Kiss</h2>',
							'<div class="CB080_use-step clearfix">',
								'<span>1.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>2.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>3.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>4.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>5.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<p class="CB080_smallprint">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
						'</div>'
					].join('');

					cacheDom.deliveryContentVar = [
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>Delivery</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
									'<ul class="CB080_dot-variant">',
										'<li><strong>Standard Delivery</strong> - £2.50</li>',
										'<li><strong>Express Delivery</strong> - £4.50</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-image: url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/03/marble-wallpaper-8.jpg\');">',
									'<div><strong>Free delivery</strong> over £60</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>90 Day Money Back Guarantee</h2>',
									'<p>We\'re so confident that you\'ll get results you\'ll love with your Clarisonic from the first use that we offer a 90-day money</p>',
									'<ul class="CB080_tick-variant">',
										'<li>We ask that you have used the device for 60 seconds a day for 30 days to see consistent results.</li>',
										'<li>By using it for a month. it ensures that you have given the device a proper chance to start working on your skin.</li>',
										'<li>If you are still not satisfied, you can return the device for a 90-day money back guarantee.</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle">',
									'<div><strong>90 Day</strong> Money back guarantee</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>2 Year Warranty</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-color: #88B5C8; color: #fff;">',
									'<div><strong>2 year</strong> warranty</div>',
								'</div>',
							'</div>',
						'</section>'
					].join('');
				}
				else if(cacheDom.currentURL == 'nufaceToner'){
					cacheDom.ExpertsTabContent = [
						'<div class="CB080_quote-block">',
							'<span class="CB080_quote-img"><img src="http://currentbody.com/media/wysiwyg/about-us-2017/emily.jpg" /></span>',
							'<strong>NuFACE are renowned in the industry for the 5-minute face lift. The Mini device is compact enough to use when you\'re on-the-go, using microcurrent therapy to gently lift and tone the skin as well as iron out any creases or wrinkles. A must-have in your beauty routine.</strong>',
							'<span class="CB080_quote-name">Emily, <span></span></span>',
						'</div>',
						'<div class="CB080_life_icon-wrap clearfix">',
							'<div class="CB080_lifestyle">',
								'<h4>Would suit <br/> these lifestyles</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> On the Go </div>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> Career-minded</div>',
							'</div>',
							'<div class="CB080_skin-types">',
								'<h4>Skin types <br/> most effective</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Combination skin</div>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Normal skin</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-finder clearfix">',
							'<div class="CB080_img-block" style="background-image: url(http://www.currentbody.com/blog/wp-content/uploads/2017/08/home-facial-large.jpg)"></div>',
							'<div class="CB080_product_finder-content">',
								'<div>',
									'<h2>Need something different?<br /> Use our product finder to find your perfect product</h2>',
									'<a href="#">Launch product finder</a>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-use clearfix">',
							'<h2>How to use your PMD Kiss</h2>',
							'<div class="CB080_use-step clearfix">',
								'<span>1.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>2.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>3.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>4.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>5.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<p class="CB080_smallprint">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
						'</div>'
					].join('');

					cacheDom.deliveryContentVar = [
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>Delivery</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
									'<ul class="CB080_dot-variant">',
										'<li><strong>Standard Delivery</strong> - £2.50</li>',
										'<li><strong>Express Delivery</strong> - £4.50</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-image: url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/03/marble-wallpaper-8.jpg\');">',
									'<div><strong>Free delivery</strong> over £60</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>90 Day Money Back Guarantee</h2>',
									'<p>We\'re so confident that you\'ll get results you\'ll love with your Clarisonic from the first use that we offer a 90-day money</p>',
									'<ul class="CB080_tick-variant">',
										'<li>We ask that you have used the device for 60 seconds a day for 30 days to see consistent results.</li>',
										'<li>By using it for a month. it ensures that you have given the device a proper chance to start working on your skin.</li>',
										'<li>If you are still not satisfied, you can return the device for a 90-day money back guarantee.</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle">',
									'<div><strong>90 Day</strong> Money back guarantee</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>2 Year Warranty</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-color: #88B5C8; color: #fff;">',
									'<div><strong>2 year</strong> warranty</div>',
								'</div>',
							'</div>',
						'</section>'
					].join('');
				}
				else if(cacheDom.currentURL == 'clarisonicMia'){
					cacheDom.ExpertsTabContent = [
						'<div class="CB080_quote-block">',
							'<span class="CB080_quote-img"><img src="http://currentbody.com/media/wysiwyg/about-us-2017/emily.jpg" /></span>',
							'<strong>Clarisonic is set to revolutionise your skin routine, and it all begins with skin-changing sonic cleansing. The Mia 2 uses patented micro-massage to eliminate dirt, bacteria and sebum from your skin in just 60 seconds and is 6 times more effective than hands alone. Believe us, once you\'ve tried it you\'ll never look back.</strong>',
							'<span class="CB080_quote-name">Emily, <span></span></span>',
						'</div>',
						'<div class="CB080_life_icon-wrap clearfix">',
							'<div class="CB080_lifestyle">',
								'<h4>Would suit <br/> these lifestyles</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> On the Go </div>',
								'<div><img src="http://www.sitegainer.com/fu/up/l8hy0axofcfm3cv.jpg" /> Career-minded</div>',
							'</div>',
							'<div class="CB080_skin-types">',
								'<h4>Skin types <br/> most effective</h4>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Combination skin</div>',
								'<div><img src="http://www.sitegainer.com/fu/up/xpkj3s9g9psl31v.jpg" /> Normal skin</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-finder clearfix">',
							'<div class="CB080_img-block" style="background-image: url(http://www.currentbody.com/blog/wp-content/uploads/2017/08/home-facial-large.jpg)"></div>',
							'<div class="CB080_product_finder-content">',
								'<div>',
									'<h2>Need something different?<br /> Use our product finder to find your perfect product</h2>',
									'<a href="#">Launch product finder</a>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="CB080_product-use clearfix">',
							'<h2>How to use your PMD Kiss</h2>',
							'<div class="CB080_use-step clearfix">',
								'<span>1.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>2.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>3.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>4.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<div class="CB080_use-step clearfix">',
								'<span>5.</span>',
								'<p>Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip Apply PMD Smart Lip</p>',
							'</div>',
							'<p class="CB080_smallprint">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
						'</div>'
					].join('');

					cacheDom.deliveryContentVar = [
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>Delivery</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
									'<ul class="CB080_dot-variant">',
										'<li><strong>Standard Delivery</strong> - £2.50</li>',
										'<li><strong>Express Delivery</strong> - £4.50</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-image: url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2017/03/marble-wallpaper-8.jpg\');">',
									'<div><strong>Free delivery</strong> over £60</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>90 Day Money Back Guarantee</h2>',
									'<p>We\'re so confident that you\'ll get results you\'ll love with your Clarisonic from the first use that we offer a 90-day money</p>',
									'<ul class="CB080_tick-variant">',
										'<li>We ask that you have used the device for 60 seconds a day for 30 days to see consistent results.</li>',
										'<li>By using it for a month. it ensures that you have given the device a proper chance to start working on your skin.</li>',
										'<li>If you are still not satisfied, you can return the device for a 90-day money back guarantee.</li>',
									'</ul>',
									'<p>For non-UK orders delivery charges please view the product pagefor the itme(s) you\'d like to purchase</p>',
								'</div>',
								'<div class="CB080_delivery-circle">',
									'<div><strong>90 Day</strong> Money back guarantee</div>',
								'</div>',
							'</div>',
						'</section>',
						'<section class="CB080_delivery-wrap">',
							'<div class="clearfix">',
								'<div class="CB080_delivery-content">',
									'<h2>2 Year Warranty</h2>',
									'<p>Lorem ipsum some bottom text some upper text Lorem ipsum some bottom text some upper text</p>',
								'</div>',
								'<div class="CB080_delivery-circle" style="background-color: #88B5C8; color: #fff;">',
									'<div><strong>2 year</strong> warranty</div>',
								'</div>',
							'</div>',
						'</section>'
					].join('');
				}
			}
		}

		var tabBuilder = {
			// Create the new tab system 
			tabCreator: function(){
				cacheDom.footerOrig.before([
					'<section class="CB080_tab-wrap">',
						'<a class="CB080_mobile-tab-slide" href="#"><span class="CB080_tab-text">What Our Experts Say</span><span class="CB080_tab-arrow"></span></a>',
						'<div class="CB080_tab-btns CB_hide">',
							'<div>',
								'<a href="#" class="CB080_active">What Our Experts Say</a>',
								'<a href="#">Customer Reviews</a>',
								'<a href="#">Delivery and Returns</a>',
								'<a href="#">What\'s In The Box</a>',
							'</div>',
						'</div>',
						'<div class="CB080_tab-content">',
							'<div class="CB080_active"></div>',
							'<div></div>',
							'<div></div>',
							'<div></div>',
						'</div>',
					'</section>'
				].join(''));

				// Cache new markup in variables for further use
				cacheDom.tabWrapper = cacheDom.JQ('.CB080_tab-wrap');
				cacheDom.tabsBlock = cacheDom.tabWrapper.find('.CB080_tab-btns');
				cacheDom.tabsBlockBtn = cacheDom.tabsBlock.find('a');
				cacheDom.mobileTgl = cacheDom.tabWrapper.find('.CB080_mobile-tab-slide'),
				cacheDom.mobileTglText = cacheDom.mobileTgl.find('.CB080_tab-text'),
				cacheDom.tabContentWrap = cacheDom.tabWrapper.find('.CB080_tab-content'),
				cacheDom.tabContentBlock = cacheDom.tabContentWrap.find('> div');
			}
		};

		var whatOurExpertsSay = {
			// Append the pre selected content from the URLData and move the questions block to just after the new markup
			contentBuilder: function(){
				cacheDom.tabContentBlock.eq(0).append(cacheDom.ExpertsTabContent);
				cacheDom.questionsBlock.show().appendTo(cacheDom.tabContentBlock.eq(0));
			}
		};

		var reviewsContent = {
			// Move the reviews section to the new tab, create new styled buttons 
			contentBuilder: function(){
				cacheDom.reviewsBlock.show().appendTo(cacheDom.tabContentBlock.eq(1));
				cacheDom.reviewsBlock.find('.yotpo-bottomline-2-boxes .yotpo-stars-and-sum-reviews').append([
					'<a href="#" class="CB080_review-btn">Write a review</a>'
				].join(''));

				cacheDom.reviewsBlock.find('.yotpo-bottomline-box-1.yotpo-stars-and-sum-reviews').prepend([
					'<div class="CB080_ds-title"><span>Customer Reviews</span>' + cacheDom.productName + '</div>'
				].join(''));

				cacheDom.reviewBtn = cacheDom.reviewsBlock.find('.CB080_review-btn');
			},
			// Go through each product review and re arrange the markup so it matches the design
			reviewReorder: function(){
				cacheDom.reviewsWrap.find('.yotpo-review').each(function(){
					var el = cacheDom.JQ(this),
						elName = el.find('> .yotpo-header .yotpo-user-name').text(),
						elDate = el.find('> .yotpo-header .yotpo-review-date').text();
					
					el.find('.yotpo-header-element .label-with-tooltip').insertAfter(el.find('> .yotpo-main .content-title'));
					el.find('> .yotpo-main .content-title').after([
						'<div class="CB080_name-date">',
							'By ' + elName + ' on ' + elDate,
						'</div>'
					].join(''));
				});

				cacheDom.reviewsBlock.find('.yotpo-nav-content').addClass('CB080_transition');
			}
		};

		var questionsContent = {
			// Add new markup for questions block
			contentBuilder: function(){
				cacheDom.questionsHeader = cacheDom.questionsBlock.find('.yotpo-bottomline.yotpo-bottomline-2-boxes');
				cacheDom.questionSection = cacheDom.questionsBlock.find('.yotpo-questions .yotpo-question');

				cacheDom.questionsHeader.prepend([
					'<div class="CB080_questions-title">Your Questions Answered</div>'
				].join(''));

				var questionsText = cacheDom.questionsHeader.find('.ask-question').text().replace('Answers', 'Responses').replace('Questions', 'Questions asked');
				cacheDom.questionsHeader.find('.ask-question').text(questionsText).after([
					'<div class="CB080_question_sub-title">',
						'<div>Our team always responds within 1-2 days. If you\'d like to chat to us now, please use Live Chat in the bottom right of this page</div>',
						'<a href="#" class="CB080_ask-question">Ask A Question</a>',
					'</div>',
					
				].join(''));
			},
			// Re arrange the markup for the questions section so it matches the design
			reorderContent: function(){
				cacheDom.questionSection.each(function(){
					var el = cacheDom.JQ(this),
						questionText = el.find('> .yotpo-main .content-question'),
						answerText = el.find('.yotpo-comments-box .yotpo-main .content-question'),
						removeQ = questionText.text().replace('Q:', ''),
						removeA = answerText.text().replace('A:', ''),
						elName = el.find('> .yotpo-header .yotpo-user-name').text(),
						elTooltip = el.find('.yotpo-header-element .label-with-tooltip');
					
					if(elTooltip.length > 0){
						elTooltip.insertAfter(el.find('> .yotpo-main .content-question'));
					}

					el.find('> .yotpo-main .content-question').after([
						'<div class="CB080_name-date">',
							'By ' + elName,
						'</div>'
					].join(''));

					questionText.text(removeQ);
					answerText.text(removeA);
				});

				cacheDom.questionsBlock.find('.yotpo-nav-content').addClass('CB080_transition');
			}
		}

		var deliveryContent = {
			// Append the content defined earlier in URLdata
			contentBuilder: function(){
				cacheDom.tabContentBlock.eq(2).append(cacheDom.deliveryContentVar);
			}
		};

		var whatsInTheBoxContent = {
			// Move content that exists to the new Tab section
			contentBuilder: function(){
				cacheDom.whatsInBox.find('.box-title').remove();
				cacheDom.whatsInBox.appendTo(cacheDom.tabContentBlock.eq(3));
			}
		};

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			mobileTabBindOn: function(){
				cacheDom.mobileTgl.on('click', function(e){
					var el = cacheDom.JQ(this);

					e.preventDefault();
					if(cacheDom.slideQ === false){
						cacheDom.slideQ = true;
						if(cacheDom.mobileTgl.hasClass('CB080_active')){
							cacheDom.mobileTgl.removeClass('CB080_active');
							cacheDom.tabsBlock.slideUp(function(){
								cacheDom.slideQ = false;
							});
						}
						else{
							cacheDom.mobileTgl.addClass('CB080_active');
							cacheDom.tabsBlock.slideDown(function(){
								cacheDom.slideQ = false;
							});
						}
						if(el.hasClass('CB080_GA-sent')){

						}
						else{
							el.addClass('CB080_GA-sent');
							sendEvent('CB080', 'Mobile tab slider reveal', 'clicked', true);
						}

					}
				});
			},
			// Click function for changing the current tab that is being shown
			mobileTabChangeOn: function(){
				cacheDom.tabsBlockBtn.on('click', function(e){
					e.preventDefault();
					
					if(cacheDom.slideQ === false){
						cacheDom.slideQ = true;
						var el = cacheDom.JQ(this),
							elText = el.text(),
							elIndex = el.index();

						if(el.hasClass('CB080_active')){
							cacheDom.slideQ = false;
						}
						else{
							cacheDom.tabsBlockBtn.removeClass('CB080_active');
							cacheDom.mobileTgl.removeClass('CB080_active');
							cacheDom.mobileTglText.text(elText);

							if(cacheDom.JQ(window).width() > 767){
							}
							else{
								cacheDom.tabsBlock.slideUp();
							}

							el.addClass('CB080_active');
							cacheDom.tabContentWrap.find('> div.CB080_active').slideUp();
							cacheDom.tabContentBlock.eq(elIndex).addClass('CB080_active').slideDown(function(){
								cacheDom.slideQ = false;
							});

							if(el.hasClass('CB080_GA-sent')){

							}
							else{
								el.addClass('CB080_GA-sent');
								sendEvent('CB080', 'Mobile tab ' + elText, 'clicked', true);
							}
						}
					}
				});
			},
			// Click function to allow the hover/active state to be applied
			reviewHighlight: function(){
				cacheDom.innerStar.on('click', function(e){
					e.preventDefault();
					var el = cacheDom.JQ(this);

					cacheDom.innerStar.removeClass('CB080_active');

					if(el.hasClass('CB080_active')){}
					else{
						el.addClass('CB080_active');
					}

					cacheDom.reviewsBlock.find('.yotpo-nav-content').removeClass('CB080_transition');
				});
				cacheDom.reviewsBlock.find('.yotpo-star-distribution-show-all').on('click', function(e){
					e.preventDefault();
					cacheDom.innerStar.removeClass('CB080_active');
					cacheDom.reviewsBlock.find('.yotpo-nav-content').removeClass('CB080_transition');
				});
			},
			// Remove opacity to make blocks look like they are loading
			pagerClick: function(){
				cacheDom.questionsBlock.find('.yotpo-page-element').on('click', function(){
					cacheDom.questionsBlock.find('.yotpo-nav-content').removeClass('CB080_transition');
				});
			},
			// Show write a review section when new button is clicked
			reviewClickOn: function(){
				cacheDom.reviewBtn.on('click', function(e){
					e.preventDefault();
					cacheDom.JQ('.write-review-button').click();
				});
			},
			// Show ask a question section when new button is clicked
			askAQuestionClickOn: function(){
				cacheDom.questionsHeader.find('.CB080_ask-question').on('click', function(e){
					e.preventDefault();
					cacheDom.questionsHeader.find('.ask-question').click();
				});
			},
			// Fire GA event when the new tab content is scrolled into view
			scrolledIntoView: function(){
				cacheDom.JQ(window).scroll(UC_.throttle(function(){
					function elementScrolled(elem)
					{
						var docViewTop = cacheDom.JQ(window).scrollTop();
						var docViewBottom = docViewTop + cacheDom.JQ(window).height();
						var elemTop = cacheDom.JQ(elem).offset().top;
						return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
					}

					if(elementScrolled('.CB080_tab-wrap')) {
						if(cacheDom.tabWrapper.hasClass('CB080_in-view')){
						}
						else{
							cacheDom.tabWrapper.addClass('CB080_in-view');
							sendEvent('CB080', 'Below the fold is in view', '', true);
						}
					}
				}, 300));
			},
			// Mutation observer for the DOM rebuild when the user interacts with the plugin
			questionsMutationObserver: function(){
				UC.observer.connect(cacheDom.questionsBlock.find('.yotpo-nav-content > .yotpo-questions'), function() {
					setTimeout(function() {
						cacheDom.questionsBlock.find('.yotpo-questions .yotpo-question').each(function(){
							var el = cacheDom.JQ(this),
								questionText = el.find('> .yotpo-main .content-question'),
								answerText = el.find('.yotpo-comments-box .yotpo-main .content-question'),
								removeQ = questionText.text().replace('Q:', ''),
								removeA = answerText.text().replace('A:', ''),
								elName = el.find('> .yotpo-header .yotpo-user-name').text(),
								elTooltip = el.find('.yotpo-header-element .label-with-tooltip');
							
							if(elTooltip.length > 0){
								elTooltip.insertAfter(el.find('> .yotpo-main .content-question'));
							}

							el.find('> .yotpo-main .content-question').after([
								'<div class="CB080_name-date">',
									'By ' + elName,
								'</div>'
							].join(''));

							questionText.text(removeQ);
							answerText.text(removeA);
						});
						cacheDom.questionsBlock.find('.yotpo-nav-content').addClass('CB080_transition');
					}, 700);
				}, {
				// Options
					config: {attributes: false, childList: true, subtree: false},
					throttle: 1000 
				});
			},
			// Mutation observer for the DOM rebuild when the user interacts with the plugin
			reviewsMutationObserver: function(){
				UC.observer.connect(cacheDom.reviewsBlock.find('.yotpo-reviews'), function(element, mutation) {
					setTimeout(function() {
						cacheDom.reviewsWrap.find('.yotpo-review').each(function(){
							var el = cacheDom.JQ(this),
								elName = el.find('> .yotpo-header .yotpo-user-name').text(),
								elDate = el.find('> .yotpo-header .yotpo-review-date').text();
							
							el.find('.yotpo-header-element .label-with-tooltip').insertAfter(el.find('> .yotpo-main .content-title'));
							el.find('> .yotpo-main .content-title').after([
								'<div class="CB080_name-date">',
									'By ' + elName + ' on ' + elDate,
								'</div>'
							].join(''));

						});

						cacheDom.reviewsBlock.find('.yotpo-nav-content').addClass('CB080_transition');
					}, 700);
				}, {
				// Options
					config: {attributes: false, childList: true, subtree: false},
					throttle: 1000 
				});
			}
		};

		var hideElements = {
			// Hide some content thats no longer used
			originalElements: function(){
				cacheDom.origTabs.hide();
				cacheDom.recentlyViewedOrig.hide();
				cacheDom.bundleOrig.hide();
				cacheDom.JQ('.block-blog').hide();
				cacheDom.JQ('.product-collateral').hide();
			}
		};

		var productRating = {
			// Go through stars and decide what the rating is based on how many stars have the relevant classes
			starCount: function(){
				cacheDom.starsWrap = cacheDom.JQ('#product_tabs_Yotporeview_contents .yotpo-stars-and-sum-reviews .yotpo-stars');
				cacheDom.totalReviews = cacheDom.reviewsBlock.find('.yotpo-stars + .yotpo-sum-reviews');

				cacheDom.starsWrap.find('span.yotpo-icon').each(function(){
					var el = cacheDom.JQ(this);

					if(el.hasClass('yotpo-icon-star')){
						cacheDom.prodRating = cacheDom.prodRating + 1;
					}
					else if(el.hasClass('yotpo-icon-half-star')){
						cacheDom.prodRating = cacheDom.prodRating + 0.5;
					}
				});
			}
		};

		var moveCustomerReviewElements = {
			// Move the review stars to the relevant label text to create the new button style.
			originalElements: function(){
				var totalReviewsSpan = cacheDom.totalReviews.find('span'),
					totalReviewsSpanText = totalReviewsSpan.text(),
					starI = 0;

				totalReviewsSpan.text('(Based on ' + cacheDom.JQ.trim(totalReviewsSpanText) + ')');
				cacheDom.totalReviews.prepend([
					'<span class="CB080_rated-stars">Rated ' + cacheDom.prodRating + '/5</span>'
				].join(''));
				cacheDom.totalReviews.insertBefore(cacheDom.starsWrap);

				cacheDom.reviewCountElement.each(function(){
					var el = cacheDom.JQ(this);
						
					el.insertBefore(cacheDom.innerStar.eq(starI).find('.yotpo-clr'));

					starI++;
				});

				cacheDom.starWrap.prepend('<div class="CB080_sub-title">Filter reviews:</div>');
			}
		};

		// Check URL to decide what content to load in
		URLChecker.checkURL();
		hideElements.originalElements();
		URLData.URLContent();

		// Build new Markup
		tabBuilder.tabCreator();
		whatOurExpertsSay.contentBuilder();
		reviewsContent.contentBuilder();
		deliveryContent.contentBuilder();
		whatsInTheBoxContent.contentBuilder();
		questionsContent.contentBuilder();

		// Move around inner elements of customer reviews
		productRating.starCount();
		moveCustomerReviewElements.originalElements();
		reviewsContent.reviewReorder();
		questionsContent.reorderContent();

		// Bind click events etc
		elementBindings.mobileTabBindOn();
		elementBindings.mobileTabChangeOn();
		elementBindings.reviewHighlight();
		elementBindings.reviewClickOn();
		elementBindings.askAQuestionClickOn();
		elementBindings.questionsMutationObserver();
		elementBindings.reviewsMutationObserver();
		elementBindings.pagerClick();
		elementBindings.scrolledIntoView();

	}


	/* 
		Anon functions to be called inside the code

		Custom GA event sender that uses a tracker if found
	*/

	var trackerName;
	function sendEvent (category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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

	//sendEvent('TP017', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
	//sendEvent('TP017v2', 'Closed Trade Modal', '', true);
	
})();