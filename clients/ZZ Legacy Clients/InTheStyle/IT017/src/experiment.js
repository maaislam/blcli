import { fullStory, events } from '../../../../lib/utils.js';
import { poller } from '../../../../lib/uc-lib.js';

var IT017 = (function() {
	var JQ = window.jQuery,
			trackerName;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		poller([
			'header.header-container',
			'.bag-count',
			function () {
				if (window.jQuery) {
					return true;
				}
			}
		], init);
	})();
	
    function init(){
		fullStory('IT017', 'Variation 1');

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = JQ('body'),
					URL = window.location.pathname,
					headerWrap = JQ('header.header-container'),
					bagCheck = parseInt(JQ('.header-bag .link-bag .bag-count').text());

			// Set namespaces for future variables
			var slideshowWrap,
    			uspSlider,
					sizingGuide,
					headerMarkup,
					screenWidth = JQ(window).width(),
					colOuter = JQ('.category-products'),
					colWrap = colOuter.find('ul.products-grid');
			
			bodyVar.addClass('IT017');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				URL: URL,
				headerWrap: headerWrap,
				slideshowWrap: slideshowWrap,
				uspSlider: uspSlider,
				headerMarkup: headerMarkup,
				bagCheck: bagCheck,
				screenWidth: screenWidth,
				colOuter: colOuter,
				colWrap: colWrap,
				sizingGuide: sizingGuide
			};
		})();

		var URLTest = {
			URLChecker: function(){
				// Check for page type
				var pageType = (function() {
					var $body = JQ('body');

					switch (true) {
						case $body.hasClass('catalog-category-view'):
						return 'category';

						case $body.hasClass('catalog-product-view'):
						return 'product';
					}
				})();

				// Test against regex's and set content
				if(cacheDom.bagCheck > 0){
					events.send('IT017', 'View', 'Showed product in bag USPs');
					cacheDom.headerMarkup = [
						'<section class="IT017-slider_wrap">',
							'<div class="IT017-usp_slider">',
								'<div class="IT017_slide"><span><img src="//www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" /></span> Get free delivery on orders over £60</div>',
								'<div class="IT017_slide"><span><img src="//www.sitegainer.com/fu/up/eypss2ycec7lxg1.png" /></span> Get that next day slay with our speedy delivery</div>',
								'<div class="IT017_slide"><span><img src="//www.sitegainer.com/fu/up/gomnf4t414w9ms1.png" /></span> <a href="/shipping-and-returns/">We’ve made returns easy and fuss free!</a></div>',
							'</div>',
						'</section>'
					].join('');
				}
				else if(pageType === 'category'){
					events.send('IT017', 'View', 'Showed category USPs');
					cacheDom.headerMarkup = [
						'<section class="IT017-slider_wrap">',
							'<div class="IT017-usp_slider">',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/qta4im5ukj2ovrf.png" /></span> Quit browsing! Buy now and try on at home</div></div>',
								'<div class="IT017_slide"><div><span style="position:relative; top: 7px;"><img src="//www.sitegainer.com/fu/up/gomnf4t414w9ms1.png" /></span> Shop collaboration ranges exclusive to us, like <a href="/sarah/">Sarah Ashcroft</a></div></div>',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" /></span> <a href="#" class="IT017-size_cta">Find your perfect fit with our size guide</a></div></div>',
							'</div>',
						'</section>'
					].join('');

					cacheDom.categoryColWidth = JQ('.category-products');
					
					cacheDom.bodyVar.append([
						'<div id="sideGuideModal" class="reveal-modal reveal-sideguide medium" data-reveal="">',
							'<div class="reveal-content">',
								'<table class="data-table size-table">',
								'<thead>',
								'<tr><th rowspan="2">UK</th><th rowspan="2">US</th><th rowspan="2">AU</th><th rowspan="2">EU</th><th colspan="2">Bust</th><th colspan="2">Waist</th><th colspan="2">Hips</th></tr>',
								'<tr><th>Inch</th><th>CM</th><th>Inch</th><th>CM</th><th>Inch</th><th>CM</th></tr>',
								'</thead>',
								'<tbody>',
								'<tr>',
								'<td>6</td>',
								'<td>2</td>',
								'<td>6</td>',
								'<td>34</td>',
								'<td>31</td>',
								'<td>79</td>',
								'<td>24</td>',
								'<td>61</td>',
								'<td>34</td>',
								'<td>86</td>',
								'</tr>',
								'<tr>',
								'<td>8</td>',
								'<td>4</td>',
								'<td>8</td>',
								'<td>36</td>',
								'<td>32</td>',
								'<td>81</td>',
								'<td>25</td>',
								'<td>64</td>',
								'<td>35</td>',
								'<td>89</td>',
								'</tr>',
								'<tr>',
								'<td>10</td>',
								'<td>6</td>',
								'<td>10</td>',
								'<td>38</td>',
								'<td>34</td>',
								'<td>86</td>',
								'<td>27</td>',
								'<td>69</td>',
								'<td>37</td>',
								'<td>94</td>',
								'</tr>',
								'<tr>',
								'<td>12</td>',
								'<td>8</td>',
								'<td>12</td>',
								'<td>40</td>',
								'<td>36</td>',
								'<td>91</td>',
								'<td>29</td>',
								'<td>74</td>',
								'<td>39</td>',
								'<td>99</td>',
								'</tr>',
								'<tr>',
								'<td>14</td>',
								'<td>10</td>',
								'<td>14</td>',
								'<td>42</td>',
								'<td>38</td>',
								'<td>99</td>',
								'<td>31</td>',
								'<td>79</td>',
								'<td>41</td>',
								'<td>104</td>',
								'</tr>',
								'<tr>',
								'<td>16</td>',
								'<td>12</td>',
								'<td>16</td>',
								'<td>44</td>',
								'<td>40</td>',
								'<td>101</td>',
								'<td>33</td>',
								'<td>84</td>',
								'<td>43</td>',
								'<td>109</td>',
								'</tr>',
								'<tr>',
								'<td>18</td>',
								'<td>14</td>',
								'<td>18</td>',
								'<td>46</td>',
								'<td>42</td>',
								'<td>106</td>',
								'<td>35</td>',
								'<td>89</td>',
								'<td>45</td>',
								'<td>115</td>',
								'</tr>',
								'<tr>',
								'<td>20</td>',
								'<td>16</td>',
								'<td>20</td>',
								'<td>48</td>',
								'<td>44</td>',
								'<td>112</td>',
								'<td>37</td>',
								'<td>94</td>',
								'<td>47</td>',
								'<td>120</td>',
								'</tr>',
								'<tr>',
								'<td>22</td>',
								'<td>18</td>',
								'<td>22</td>',
								'<td>50</td>',
								'<td>46</td>',
								'<td>117</td>',
								'<td>39</td>',
								'<td>99</td>',
								'<td>49</td>',
								'<td>125</td>',
								'</tr>',
								'<tr>',
								'<td>24</td>',
								'<td>20</td>',
								'<td>24</td>',
								'<td>52</td>',
								'<td>48</td>',
								'<td>122</td>',
								'<td>41</td>',
								'<td>104</td>',
								'<td>51</td>',
								'<td>130</td>',
								'</tr>',
								'<tr>',
								'<td>26</td>',
								'<td>22</td>',
								'<td>26</td>',
								'<td>54</td>',
								'<td>50</td>',
								'<td>127</td>',
								'<td>43</td>',
								'<td>109</td>',
								'<td>53</td>',
								'<td>135</td>',
								'</tr>',
								'<tr>',
								'<td>28</td>',
								'<td>24</td>',
								'<td>28</td>',
								'<td>56</td>',
								'<td>52</td>',
								'<td>132</td>',
								'<td>45</td>',
								'<td>114</td>',
								'<td>55</td>',
								'<td>140</td>',
								'</tr>',
								'</tbody>',
								'</table>',
							'</div>',
							'<a class="close-reveal-modal">×</a>',
						'</div>',
					].join(''));
				}
				else if(pageType === 'product'){
					events.send('IT017', 'View', 'Showed product page USPs');
					cacheDom.headerMarkup = [
						'<section class="IT017-slider_wrap">',
							'<div class="IT017-usp_slider">',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/qta4im5ukj2ovrf.png" /></span> <a href="/shipping-and-returns/">Need to return it? No worries, we’ve got fuss free returns!</a></div></div>',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" /></span> Find your perfect fit with our size guide</div></div>',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/eypss2ycec7lxg1.png" /></span> Get that next day slay with our speedy delivery</div></div>',
							'</div>',
						'</section>'
					].join('');
				}
				else{
					cacheDom.headerMarkup = [
						'<section class="IT017-slider_wrap">',
							'<div class="IT017-usp_slider">',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/qta4im5ukj2ovrf.png" /></span> Quit browsing! Buy now and try on at home</div></div>',
								'<div class="IT017_slide"><div><span style="position:relative; top: 7px;"><img src="//www.sitegainer.com/fu/up/gomnf4t414w9ms1.png" /></span> Shop collaboration ranges exclusive to us, like <a href="/sarah/">Sarah Ashcroft</a></div></div>',
								'<div class="IT017_slide"><div><span><img src="//www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" /></span> <a href="#" class="IT017-size_cta">Find your perfect fit with our size guide</a></div></div>',
							'</div>',
						'</section>'
					].join('');

					cacheDom.bodyVar.append([
						'<div id="sideGuideModal" class="reveal-modal reveal-sideguide medium" data-reveal="">',
							'<div class="reveal-content">',
								'<table class="data-table size-table">',
								'<thead>',
								'<tr><th rowspan="2">UK</th><th rowspan="2">US</th><th rowspan="2">AU</th><th rowspan="2">EU</th><th colspan="2">Bust</th><th colspan="2">Waist</th><th colspan="2">Hips</th></tr>',
								'<tr><th>Inch</th><th>CM</th><th>Inch</th><th>CM</th><th>Inch</th><th>CM</th></tr>',
								'</thead>',
								'<tbody>',
								'<tr>',
								'<td>6</td>',
								'<td>2</td>',
								'<td>6</td>',
								'<td>34</td>',
								'<td>31</td>',
								'<td>79</td>',
								'<td>24</td>',
								'<td>61</td>',
								'<td>34</td>',
								'<td>86</td>',
								'</tr>',
								'<tr>',
								'<td>8</td>',
								'<td>4</td>',
								'<td>8</td>',
								'<td>36</td>',
								'<td>32</td>',
								'<td>81</td>',
								'<td>25</td>',
								'<td>64</td>',
								'<td>35</td>',
								'<td>89</td>',
								'</tr>',
								'<tr>',
								'<td>10</td>',
								'<td>6</td>',
								'<td>10</td>',
								'<td>38</td>',
								'<td>34</td>',
								'<td>86</td>',
								'<td>27</td>',
								'<td>69</td>',
								'<td>37</td>',
								'<td>94</td>',
								'</tr>',
								'<tr>',
								'<td>12</td>',
								'<td>8</td>',
								'<td>12</td>',
								'<td>40</td>',
								'<td>36</td>',
								'<td>91</td>',
								'<td>29</td>',
								'<td>74</td>',
								'<td>39</td>',
								'<td>99</td>',
								'</tr>',
								'<tr>',
								'<td>14</td>',
								'<td>10</td>',
								'<td>14</td>',
								'<td>42</td>',
								'<td>38</td>',
								'<td>99</td>',
								'<td>31</td>',
								'<td>79</td>',
								'<td>41</td>',
								'<td>104</td>',
								'</tr>',
								'<tr>',
								'<td>16</td>',
								'<td>12</td>',
								'<td>16</td>',
								'<td>44</td>',
								'<td>40</td>',
								'<td>101</td>',
								'<td>33</td>',
								'<td>84</td>',
								'<td>43</td>',
								'<td>109</td>',
								'</tr>',
								'<tr>',
								'<td>18</td>',
								'<td>14</td>',
								'<td>18</td>',
								'<td>46</td>',
								'<td>42</td>',
								'<td>106</td>',
								'<td>35</td>',
								'<td>89</td>',
								'<td>45</td>',
								'<td>115</td>',
								'</tr>',
								'<tr>',
								'<td>20</td>',
								'<td>16</td>',
								'<td>20</td>',
								'<td>48</td>',
								'<td>44</td>',
								'<td>112</td>',
								'<td>37</td>',
								'<td>94</td>',
								'<td>47</td>',
								'<td>120</td>',
								'</tr>',
								'<tr>',
								'<td>22</td>',
								'<td>18</td>',
								'<td>22</td>',
								'<td>50</td>',
								'<td>46</td>',
								'<td>117</td>',
								'<td>39</td>',
								'<td>99</td>',
								'<td>49</td>',
								'<td>125</td>',
								'</tr>',
								'<tr>',
								'<td>24</td>',
								'<td>20</td>',
								'<td>24</td>',
								'<td>52</td>',
								'<td>48</td>',
								'<td>122</td>',
								'<td>41</td>',
								'<td>104</td>',
								'<td>51</td>',
								'<td>130</td>',
								'</tr>',
								'<tr>',
								'<td>26</td>',
								'<td>22</td>',
								'<td>26</td>',
								'<td>54</td>',
								'<td>50</td>',
								'<td>127</td>',
								'<td>43</td>',
								'<td>109</td>',
								'<td>53</td>',
								'<td>135</td>',
								'</tr>',
								'<tr>',
								'<td>28</td>',
								'<td>24</td>',
								'<td>28</td>',
								'<td>56</td>',
								'<td>52</td>',
								'<td>132</td>',
								'<td>45</td>',
								'<td>114</td>',
								'<td>55</td>',
								'<td>140</td>',
								'</tr>',
								'</tbody>',
								'</table>',
							'</div>',
							'<a class="close-reveal-modal">×</a>',
						'</div>',
					].join(''));
				}
			}
		}

		var headerSlider = {
			// Create header slider
			contentBuilder: function(){
				cacheDom.headerWrap.prepend(cacheDom.headerMarkup);

				// Set cached variables up once markup is created
				cacheDom.slideshowWrap = JQ('.IT017-slider_wrap');
				cacheDom.uspSlider = cacheDom.slideshowWrap.find('.IT017-usp_slider');
			}
		};

		var slickInit = {
			uspSliderInit: function() {
				// Create the slideshow with the new markup using slick
				cacheDom.uspSlider.slick({
					dots: false,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					draggable: false,
					autoplaySpeed: 7000
				});

				// Start poller for when the slider has initialized to change padding of the inner wrap
				poller([
					'.IT017-usp_slider.slick-initialized',
					function () {
						if (window.jQuery) {
							return true;
						}
					}
				], function(){
					if(cacheDom.screenWidth < 768){
						JQ('.off-canvas-wrap .inner-wrap').css('padding-top', cacheDom.slideshowWrap.height() + 45);
					}
				});
			}
		};

		function checkProductSets() {
			var $productsSets = cacheDom.colWrap.find('li:nth-child(2n):not(.IT017_li-hasUSP)');
			var $newProducts = JQ(),
				el = JQ(this);

			$productsSets.each(function() {
				var isModified = !!el.length;

				if (!isModified) {
					$newProducts = $newProducts.add(el);
				}
			});

			if ($newProducts.length) {
				addUSP();
			}
		}

		var categoryUSPInsert = {
			colWidthCheck: function(){
				addUSP();

				var target = document.querySelector('.category-products');
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						addUSP();
					});    
				});
				var config = { attributes: false, childList: true, characterData: false, subtree: false };
				observer.observe(target, config);
			}
		}

		var i = 0,
			uspContent = [
				'<div class="IT017_col-usp"><span><img src="//www.sitegainer.com/fu/up/gomnf4t414w9ms1.png" /></span> 100’s of new styles dropping every week!</div>',
				'<div class="IT017_col-usp"><span><img src="//www.sitegainer.com/fu/up/eypss2ycec7lxg1.png" /></span> Get it or regret it with Next Day Delivery</div>',
				'<div class="IT017_col-usp"><span><img src="//www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" /></span> Delivering quality in fast fashion, 1 killer garm at a time</div>'
			];

		function addUSP(){
			if(cacheDom.screenWidth < 768){
				// This is mobile/2 column grid
				// loop through each product row and insert USP
				cacheDom.colOuter.find('.products-set:not(.IT017_li-hasUSP) li:nth-child(2n)').each(function(){
					var el = JQ(this);
					el.after(uspContent[i]);
					el.closest('.products-set').addClass('IT017_li-hasUSP');
					// If index is the same as the total of USP Array then reset to 0
					if(i == 2){
						i = 0;
					}
					else{
						i++;
					}
				});
			}
			else {
				// This is tablet+/4 column grid
				// loop through each product row and insert USP
				cacheDom.colOuter.find('.products-set:not(.IT017_li-hasUSP) li:nth-child(4n)').each(function(){
					var el = JQ(this);
					el.after(uspContent[i]);
					el.closest('.products-set').addClass('IT017_li-hasUSP');
					// If index is the same as the total of USP Array then reset to 0
					if(i == 2){
						i = 0;
					}
					else{
						i++;
					}
				});
			}
		}

		var elementBindings = {
			// Click function for the mobile tab variation to show the hidden options
			sizeGuideClickOn: function(){
				cacheDom.sizingGuide = JQ('#sideGuideModal');

				JQ('.IT017-size_cta').on('click', function(){
					cacheDom.sizingGuide.fadeIn();
				});
			},
			// Click function to allow the sizing guide to close
			sizeGuideCloseOn: function(){
				cacheDom.sizingGuide.find('.close-reveal-modal').on('click', function(){
					cacheDom.sizingGuide.fadeOut();
				});
			}
		};

		// Test URL for which USP's to use
		URLTest.URLChecker();

		// Load slick slider
		JQ.get('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() {
				// Create new markup
				headerSlider.contentBuilder();
		
				// Slider init
				slickInit.uspSliderInit();
		
				// Col message checks
				var catRegex = /^https?:\/\/(www\.)?inthestyle\.com\/((dresses|clothing|new|shoes|accessories|curve|trends|sale-2017|charlotte-crosby|binky-felstead|billie-faiers|sarah|billiefaiers|sarahswim))\/?(\?.*)?(\#.*)?$/;
		
				if (catRegex.test(window.location.href)) {
					categoryUSPInsert.colWidthCheck();
				}
		
				// Bind clicks
				elementBindings.sizeGuideClickOn();
				elementBindings.sizeGuideCloseOn();
		});
	}


	/* 
		icons that are used but not on in the style
	*/

	// Star image <img src="http://www.sitegainer.com/fu/up/gomnf4t414w9ms1.png" />
	// Dress image <img src="http://www.sitegainer.com/fu/up/n4iv8n7329snjbf.png" />
	// Watch <img src="http://www.sitegainer.com/fu/up/eypss2ycec7lxg1.png" />
	// house <img src="http://www.sitegainer.com/fu/up/qta4im5ukj2ovrf.png" />

})();