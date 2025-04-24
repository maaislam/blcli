var _RC020V2 = (function () {
	
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
					variation_str: 'Variation 2'
				});
			}, {
				multiplier: 1.2,
				timeout: 0
			});

			// Poll start
			UC.poller([
				'body',
				function () {
					if (window.jQuery) return true;
				},
				function () {
					if (window.ga) return true;
				}
			], RC020v2, {
				timeout: 7000,
				multiplier: 'disable'
			});
			// Variation
			function RC020v2() {

				var $ = window.jQuery;
				$('body').addClass('RC020v2');


				sendEvent('RC020', 'Page View', 'RC020---Homepage Content Optimisation Page view V2', true);

				/*-------------------------------
				Add the new content blocks
				---------------------------------*/

				var blocksWrapper = $('.desktop-homepage .row #main_0_homepagemidcomponents_0_ContainerDiv');
				blocksWrapper.html('<div class="rc20-newBlocks_wrapper"/>');

				


				
				/*-------------------------------
				CREATE 3 BLOCKS OF TEXT
				---------------------------------*/
				var blocksWrapper = $('.desktop-homepage .row #main_0_homepagemidcomponents_0_ContainerDiv');
					blocksWrapper.html('<div class="rc20v2-newBlocks"/>');
				var newBlocks = [
					{
						title: 'Learn life-saving skills',
						imageref: "rc20-block1",
						desktopText:"Your actions in an emergency could save a life. Learning first aid will give you the confidence to help someone – whether that’s a family member, friend, colleague or even a stranger – if they were to have an accident or sudden illness and urgently need your help.",
						mobileText:"Your actions in an emergency could save a life. Learning first aid will give you the confidence to help someone in the event of accident or sudden illness.",
						mobilePoints: "<li>injuries and ill health cost businesses <span>£14bn a year</span> with over 30m working days lost*</li><li>Access to <span>Safe Hands</span> online content.</li>",
						bulletPoints:'<li>injuries and ill health cost businesses <span>£14bn a year</span> with over 30m working days lost*</li><li>Save money and time with group training on your premises.</li><li><span>Ongoing support</span> for delegates via our Safe Hands online community.</li>',
						link: '<a href="https://www.redcrossfirstaidtraining.co.uk/Courses.aspx">View all our courses <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020v2-arrow.png"/></a>',
						reviewText:'"Fun and friendly atmosphere"'
					},
					{
						title: 'Why train with the British Red Cross?',
						imageref: "rc20-block2",
						desktopText:"You’ll learn in a friendly environment with a small group. You’ll have the chance to ask questions (making the course content relevant to your own situation) and practice your skills to help you build confidence and remember what you’ve learned.",
						mobileText:"Learn in a friendly environment where you’ll have the chance to ask questions and practice your skills. Our goal is to build confidence and ensure you remember what you’ve learned.",
						mobilePoints: "<li>No more than <span>15 people</span> per group</li><li>Up-to-date teaching from externally <span>accredited trainers.</span></li>",
						bulletPoints:'<li>No more than <span>15 people</span> per group.</li><li><span>Excellent teaching</span> from externally accredited trainers.</li><li><span>Always up to date with the latest <span>HSE guidelines.</span></li>',
						link: '<a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course/1-personal-or-work.aspx">Take a quiz to find the course for you <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020v2-arrow.png"/></a>',
						reviewText:'"Clear and concise training"'
					},
					 {
						title: 'By learning with us, you help us to help others',
						imageref: "rc20-block3",
						desktopText:"The British Red Cross helps people in crisis, whoever and wherever they are. All operating surplus from Red Cross Training goes into our Charity Fund.<br>We trained 150,000 people in 2016, which helped the British Red Cross to",
						mobileText:"The British Red Cross helps people in crisis, whoever and wherever they are. All operating surplus from Red Cross Training goes into our Charity Fund.",
						mobilePoints: "<li>In 2016, we treated <span>28,288</span> casualties at <span>5,152</span> events*</li><li>Provided wheelchair loans for <span>103,810 people.</span></li>",
						bulletPoints:'<li>Treat <span>28,288</span> casualties at <span>5,152</span> events</li><li>Provide wheelchair loans for <span>103,810 people</span></li><li>Send our ambulances to help <span>112,370</span> people nationwide.</li>',
						link: '<a href="https://www.redcrossfirstaidtraining.co.uk/What-we-do.aspx">Find out more about what we do <img src="https://ab-test-sandbox.userconversion.com/experiments/RC020v2-arrow.png"/></a>',
						reviewText:'“My training has stuck with me"'
					}
				];
				  
				$.each(newBlocks, function(idx, val) {
					var  blockTitle = val.title,
						 imageName= val.imageref,
						 bulletPoints,
						 blockLink = val.link,
						 blockText,
						 reviewText = val.reviewText;

						 if($(window).width() > 600 ){
							blockText = val.desktopText;
							bulletPoints = val.bulletPoints;
						 }else{
							blockText = val.mobileText;
							bulletPoints = val.mobilePoints;
						 }

					 var block = $([
						 '<div class="rc20-block col-sm-4 col-md-4">',
							 '<h3>'+blockTitle+'</h3>',
							 '<div class="rc20-image '+imageName+'"/>',
							 '<div class="rc20-blockText">'+blockText+'</div>',
							 '<ul class="rc20-bullet-points">'+bulletPoints+'</ul>',
							 '<div class="rc20-link">'+blockLink+'</div>',
							 '<div class="rc20-trustpilot-logo">',
							 '<div class="rc20-review">'+reviewText+'</div>',
								 '<img src="https://ab-test-sandbox.userconversion.com/experiments/RC020v2-tplogo.jpeg">',
							 '</div>',
						'</div>'
					 ].join(''));
					 $('.rc20v2-newBlocks').append(block);
				 });

				 $('.rc20-block:first').append('<p>*Health and Safety Executive annual ill-health and injury statistics for Great Britain November 2016</p>');
				 

				 
			
			}

		})();