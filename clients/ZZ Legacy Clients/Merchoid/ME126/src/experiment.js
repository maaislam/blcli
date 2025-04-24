import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _ME126 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		var $body = $('body');

		$body.addClass('ME126');
		/*--------------------------------------
		Content headings
		---------------------------------------*/
		function wrappedHeadings(){

			var headings = $('.entry-content h3').addClass('ME126_heading');

			headings.each(function(){
				var el = $(this),
					subHeadings = el.next('h4');
				subHeadings.appendTo(this);
				el.wrap('<div class="ME126_heading-wrapper"/>');
		    });

			//Add class for the headings based on heading brand

			$('.ME126_heading-wrapper').each(function () {
				var el = $(this);
				var brand = el.find('h3').text().trim();
				var newClass;

				if (brand.indexOf('Star Wars') > -1) {
					newClass = 'ME126_starwars';
				}
				if (brand.indexOf('DC') > -1) {
					newClass = 'ME126_dc-comics';
				}
				if (brand.indexOf('Marvel') > -1) {
					newClass = 'ME126_marvel';
				}
				if (brand.indexOf('Gaming') > -1) {
					newClass = 'ME126_gaming';
				}
				if (brand.indexOf('NFL') > -1) {
					newClass = 'ME126_nfl';
				}
				if (brand.indexOf('TV and Movie') > -1) {
					newClass = 'ME126_tv-movie';
				}

				if(brand){
					var e = $(this);
					e.addClass(newClass);
					e.attr('id',newClass); //Also add ID for the sticky prompt below
				}
			});

		}
		wrappedHeadings();

		/*--------------------------------------
		Add "more jumpers" message section has odd amount of items
		---------------------------------------*/

		function morePrompt(){

            var headingName = $('.ME126_heading-wrapper');
            headingName.each(function(){
                var headingText = $(this).text();
                if(headingText.indexOf('Christmas Decorations') > -1){
                    $(this).next().addClass('ME126_decorations');
                }
            });


			setTimeout(function(){
			
				var sections = $('.large-12.columns .woocommerce.columns-4');
				
				sections.each(function() {
					var el = $(this),
					products = el.find('.products').children("li");
	
					var $prompt = $('<div class="ME126_oddPrompt"><img src="//cdn.optimizely.com/img/6087172626/a22e9f2c620841b98409c4ca9bccdfe0.png"/><p>More awesome Christmas Jumpers Below<p></div>');	
					if (products.length % 2 != 0) {
						$prompt.appendTo(el);
					}
				});
				
			},700);
			
		}
			

	morePrompt();

		/*--------------------------------------
		Sticky Prompt
		---------------------------------------*/

		function stickyPrompt(){
			var $stickyBar = $('<div class="ME126_prompt-bar"/>'),
				$headerWrapper = $('#wrapper .header-wrapper');
				$headerWrapper.prepend($stickyBar);
	
			$stickyBar.html(['<div class="ME126_prompt-bar_title">',
								'<img src="//cdn.optimizely.com/img/6087172626/ae819d83138247a488a40c0d722a88e0.png"/>',
								'<h3>Jump to section</h3>',
							'</div>',
						'<div class="ME126_prompt_sections"/>'
					].join(''));

			var sectionAnchors = [
				['ME126_link_sw','#ME126_starwars','Star Wars'],
				['ME126_link_dc','#ME126_dc-comics','DC'],
				['ME126_link_ma','#ME126_marvel','Marvel'], 
				['ME126_link_gaming','#ME126_gaming','Gaming'],
				['ME126_link_tv','#ME126_tv-movie','TV/Movie'],
			]
			$.each(sectionAnchors,function(){
				var sectionClass = this[0],
					sectionLink = this[1],
					sectionTitle = this[2];

				$([
				'<div class="ME126_section">',
					'<a href="'+sectionLink+'">',
						'<div class="ME126_section_image '+sectionClass+'"/>',
						'<p>'+sectionTitle+'</p>',
					'</a>',
				'</div>'].join('')).appendTo('.ME126_prompt_sections');
			});


			//Anchor link for the prompt bae and the brand sections
			$('.ME126_section a').on('click', function(e) {
				e.preventDefault();
				var thisTarget = $(this).attr('href');
				var targetOffset = $(thisTarget).offset().top - 50;
				$('body,html').animate({
				  scrollTop: targetOffset
				}, 600);
			  });
			
		}

		stickyPrompt();

		/*--------------------------------------
		Text Replace/Restyle
		---------------------------------------*/
		function productText(){
			var products = $('.product-small');

			products.each(function(){
				//Replace brand and christmas text
				var productName = $(this).find('.info.style-grid3 .name');
				var christmasRemove = productName.text().replace(/Christmas Sweater\/Jumper/g,"Sweater").replace(/Unisex/g,"").replace(/Christmas Jumper\/Sweater/g,"Sweater");
				productName.text(christmasRemove);

				//Move price to top
				var productNameWrap = productName.closest('tr').find('td:first');
				var priceWrap = productName.closest('tr').find('td:last');

					productNameWrap.insertAfter(priceWrap);
			});
		}
		productText();
	}

	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('ME126', 'Variation 1');
		
		UC.poller([
			'body',
			'.woocommerce.columns-4',
			'.products.large-block-grid-4',
			'.info.style-grid3',
			'.entry-content',
			'.entry-content h3',
			function(){
				if(window.jQuery){
					return true;
				}
			}
		], _activate);
	}
	_triggers();

})();

