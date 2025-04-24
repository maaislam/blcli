/* no_doc_ready */
var _RC020 = (function () {
	
	 // PLUGINS ------------------------------------
	// UC Library - Poller -- @version 0.2.2
	// ---------------------------------------------
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
		// Send GA Events With Tracker Name ------------
		// ---------------------------------------------
		function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;
		
		// -----------------------------------------------
		// Full story integration
		// -----------------------------------------------
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'RC020',
				variation_str: 'Variation 1'
			});
		}, {
				multiplier: 1.2,
				timeout: 0
			});

		// Poll start
		UC.poller([
			'body',
			'.desktop-homepage',
			'.row #main_0_homepagemidcomponents_0_ContainerDiv',
			'.RC012',
			function () {
				if (window.jQuery) return true;
			},
			function () {
				if (window.ga) return true;
			}
		], RC020, {
				timeout: 7000,
				multiplier: 'disable'
			});
		// Variation
		function RC020() {

			var $ = window.jQuery;
			$('body').addClass('RC020');


			sendEvent('RC020', 'Page View', 'RC020---Homepage Content Optimisation Page view V1', true);

			/*-------------------------------
			ADD USPS TO THE TOP OF THE PAGE
			---------------------------------*/
			function topUSP() {
				var uspWrap = $('<div class="rc20-topWrapper"><h2>Why choose British Red Cross?</h2><div class="rc20-usp_wrapper"/></div>');
				uspWrap.prependTo('.desktop-homepage');

				var uspContent = [
					['1', 'Learn in an interactive and engaging environment'],
					['2', 'With continuous assessment throughout our courses, there’s no need for a written exam'],
					['3', 'Training venues at a location near you – national coverage delivered locally']
				]

				$.each(uspContent, function () {
					var uspNumber = this[0],
						uspText = this[1];

					var usp = $('<div class="rc20-usp"><div class="rc20-no"><span>' + uspNumber + '</span></div><p>' + uspText + '</p></div>');
					$('.rc20-usp_wrapper').append(usp);
				});

				$.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function () {
					$('.rc20-usp_wrapper').slick({
						dots: true,
						infinite: true,
						arrows: false,
						responsive: [
							{
								breakpoint: 9999,
								settings: "unslick"
							},
							{
								breakpoint: 1000,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
									infinite: true,
									dots: true
								}
							},
							{
								breakpoint: 500,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
									infinite: true,
									dots: true
								}
							}
						]
					});
				});

			}
			topUSP();


			/*-------------------------------
			CREATE 3 BLOCKS OF TEXT
			---------------------------------*/
			var blocksWrapper = $('.desktop-homepage .row #main_0_homepagemidcomponents_0_ContainerDiv');
			blocksWrapper.html('<div class="rc20-newBlocks"/>');
			var newBlocks = [
				{
					title: 'Learn life-saving skills',
					imageref: "rc20-block1",
					content1: "Your actions in an emergency could save a life. Learning first aid will give you the confidence to help someone – whether that’s a family member, friend, colleague or even a stranger – if they were to have an accident or sudden illness and urgently need your help.",
					content2: "There are benefits for businesses too. Although the UK has one of the best health and safety records in the world, injuries and ill health cost businesses £14bn a year with over 30m working days lost*. First aid training can help to reduce risks and prevent minor accidents and illnesses becoming more serious.",
					link: '<a href="https://www.redcrossfirstaidtraining.co.uk/Courses.aspx">View all our courses <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020-greyarrow.png"/></a>',
				},
				{
					title: 'Why train with the British Red Cross?',
					imageref: "rc20-block2",
					content1: "You’ll learn in a friendly environment with a small group ( average 15 people). You’ll have the chance to ask questions (making the course content relevant to your own situation) and practice your skills to help you build confidence and remember what you’ve learned.",
					content2: "Our courses are based on the latest guidelines to ensure they’re clinically accurate and educationally sound. All our trainers have current first aid certificates and externally accredited training/assessing qualifications. And we have a 99% customer satisfaction rating – we’re rated Excellent on Trustpilot.",
					link: '<a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course/1-personal-or-work.aspx">Take a quiz to find the course for you <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020-greyarrow.png"/></a>',
				},
				{
					title: 'By learning with us, you help us to help others',
					imageref: "rc20-block3",
					content1: "The British Red Cross helps people in crisis, whoever and wherever they are. All operating surplus from Red Cross Training goes into our Charity Fund, which means the cost of your first aid course goes towards funding vital humanitarian work in the UK.",
					content2: "We trained 150,000 people in 2016, which helped the Red Cross to treat 28,288 casualties at 5,152 events, provide wheelchair loans for 103,810 people, and send our fleet of 150 Red Cross ambulances to help 112,370 people nationwide. By choosing Red Cross Training, you get a quality course and help us make a difference.",
					link: '<a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do.aspx">Find out more about what we do <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020-greyarrow.png"/></a>'
				}
			];

			$.each(newBlocks, function (idx, val) {
				var blockTitle = val.title,
					imageName = val.imageref,
					blockContent1 = val.content1,
					blockContent2 = val.content2,
					blockLink = val.link;

				var block = $([
					'<div class="rc20-block col-sm-4 col-md-4">',
					'<h3>' + blockTitle + '</h3>',
					'<div class="rc20-image ' + imageName + '"/>',
					'<div class="rc20-content_first">' + blockContent1 + '</div>',
					'<div class="rc20-content_last">' + blockContent2 + '</div>',
					'<div class="rc20-link">' + blockLink + '</div>',
					'</div>'
				].join(''));
				$('.rc20-newBlocks').append(block);
			});

			$('.rc20-block:first').append('<p>*Health and Safety Executive annual ill-health and injury statistics for Great Britain November 2016</p>');


			/*-------------------------------
			EVENTS
			---------------------------------*/
			var lifesaveEvent,
				whyTrainEvent,
				learnEvent;

			var lifesavebox = $('.rc20-newBlocks .rc20-block:first'),
				whyTrainbox =  $('.rc20-newBlocks .rc20-block:eq(1)'),
				learnbox =  $('.rc20-newBlocks .rc20-block:last'),
				linkName;
		

			lifesavebox.find('.rc20-link a').click(function(){
				linkName = $(this).text().trim();
				if(!lifesaveEvent){
					sendEvent('RC020 V1', 'Page View', 'RC020 User clicked '+linkName+ ' link', true);
					lifesaveEvent = true;
				}
			});

			learnbox.find('.rc20-link a').click(function(){
				linkName = $(this).text().trim();
				if(!learnEvent){
					sendEvent('RC020 V1', 'Page View', 'RC020 User clicked '+linkName+ ' link', true);
					learnEvent = true;
				}
			});

			whyTrainbox.find('.rc20-link a').click(function(){
				linkName = $(this).text().trim();
				if(!whyTrainEvent){
					sendEvent('RC020 V1', 'Page View', 'RC020 User clicked '+linkName+ ' link', true);
					whyTrainEvent = true;
				}
			});

		}

	})();