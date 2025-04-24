import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import { getCookie, setCookie } from '../../../../lib/utils';

var _MP050 = (function() {
	let $ = null;

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var activate = function() {
		var $body = $('body');
		$body.addClass('MP050');

		//-----------------------
		// Create text wrapper
		//-----------------------

		if (!getCookie('MP050-uspSeen')) {


			var $uspWrapper = $('<div class="MP050_USPWrap"><div class="MP050_USP-bubble"><div class="MP050-exit">&times;</div></div></div>');
			$uspWrapper.prependTo($body);

			//USPs for all URLS

			var USPS = {
				mumTobe: [ //mumtobe
					// {
					// 	text: "Remember to pack your hospital bag… If you need some help, we've written this handy guide.",
					// 	link: ''
					// },
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
				],
				blossomMaternity: [
					// {
					// 	text: "Remember to pack your hospital bag… If you need some help, we've written this handy guide.",
					// 	link: ''
					// },
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
					{
						text: "Your shape is changing, so finding comfy clothes is essential. Check out our guide to the perfect maternity wardrobe.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/How-to-create-a-capsule-maternity-wardrobe'
					},
					{
						text: "It seems like you're interested in one of our collaborations. Did you know we work with lots of exciting brands? Find out more.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/our-collaborators'
					},
				],
				frameMaternity: [
					// {
					// 	text: "Remember to pack your hospital bag… If you need some help, we've written this handy guide.",
					// 	link: ''
					// },
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
					{
						text: "Your shape is changing, so finding comfy clothes is essential. Check out our guide to the perfect maternity wardrobe.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/How-to-create-a-capsule-maternity-wardrobe'
					},
					{
						text: "It seems like you're interested in one of our collaborations. Did you know we work with lots of exciting brands? Find out more.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/our-collaborators'
					},
				],
				maternity: [
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
					{
						text: "Your shape is changing, so finding comfy clothes is essential. Check out our guide to the perfect maternity wardrobe.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/How-to-create-a-capsule-maternity-wardrobe'
					}
				],
				// babyBasicsTravelbags: [
				// 	{
				// 		text: "Remember to pack your hospital bag… If you need some help, we've written this handy guide.",
				// 		link: ''
				// 	},
				// ],
				maternityathlesiure: [
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
					{
						text: "Your shape is changing, so finding comfy clothes is essential. Check out our guide to the perfect maternity wardrobe.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/How-to-create-a-capsule-maternity-wardrobe'
					},
				],
				brandedBeauty: [
					{
						text: "If you're shopping for athleisurewear then you'll need a routine to go with it. Here, we break down some of pregnancy's biggest exercise myths…",
						link: 'https://www.mamasandpapas.com/discover/health/pregnancy-exercise-myths-busted'
					},
					{
						text: "Interested in staying fit during pregnancy? Try Yoga and Pilates. We've written about how it's the perfect pairing.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/move-your-frame'
					},
					{
						text: "Interested in staying in-shape while pregnant? We've got some great tips to help keep you fit.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/health/fitness-in-your-third-trimester'
					},
					{
						text: "It seems like you're interested in one of our collaborations. Did you know we work with lots of exciting brands? Find out more.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/our-collaborators'
					},
				],
				maternityLoungewear: [
					{
						text: "Your shape is changing, so finding comfy clothes is essential. Check out our guide to the perfect maternity wardrobe.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/How-to-create-a-capsule-maternity-wardrobe'
					},
				],
				feedingAll: [
					{
						text: "If you've decided to breastfeed, but need a little help, we've got some useful words of advice for you.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/guide-to-breastfeeding'
					},
					{
						text: "If bottle feeding is best for you, check out our handy guide to bottle feeding.",
						link: 'https://www.mamasandpapas.com/en-gb//discover/feeding/guide-to-bottle-feeding'
					},
					{
						text: "It looks like you're getting ready to start weaning, why not give our handy guide a read?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/the-mp-guide-to-weaning'
					},
					{
						text: "Getting ready to start weaning? Our handy guide breaks down everything you could possibly need.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/the-mp-guide-to-weaning'
					},
					{
						text: "Whether you decide to breast or bottle feed, there's a lot of things to consider. Our handy guide breaks down everything you could possibly need, whatever you choose.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/what-you-need-whether-you-go-breast-or-bottle'
					},
				],
				breastFeeding: [
					{
						text: "If you've decided to breastfeed, but need a little help, we've got some useful words of advice for you.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/guide-to-breastfeeding'
					}
				],
				bottleFeeding: [
					{
						text: "If bottle feeding is best for you, check out our handy guide to bottle feeding.",
						link: 'https://www.mamasandpapas.com/en-gb//discover/feeding/guide-to-bottle-feeding'
					},
				],
				weaning: [
					{
						text: "It looks like you're getting ready to start weaning, why not give our handy guide a read?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/the-mp-guide-to-weaning'
					},
					{
						text: "Getting ready to start weaning? Our handy guide breaks down everything you could possibly need.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/the-mp-guide-to-weaning'
					},
				],
				feedingSeatingHighchairs: [ //feeding seating and highchairs
					{
						text: "It looks like you're getting ready to start weaning, why not give our handy guide a read?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/feeding/the-mp-guide-to-weaning'
					}
				],
				teetherscomforters: [
					{
						text: "Are you looking for something baby can gnaw on? Why not read our guide to teething...",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/the-mp-guide-to-teething'
					},
				],
				teething: [
					{
						text: "Are you looking for something baby can gnaw on? Why not read our guide to teething...",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/the-mp-guide-to-teething'
					},
					{
						text: "We want to help baby and you get the best sleep possible. So we spoke to an expert. Find out what we learnt.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/sleep/helping-your-baby-nod-off'
					}
				],
				rockersBouncers: [
					{
						text: "We want to help baby and you get the best sleep possible. So we spoke to an expert. Find out what we learnt.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/sleep/helping-your-baby-nod-off'
					},
					{
						text: "As you're looking at our developmental toys, you might want to read our helpful guide.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					}
				],
				grabbing: [  //grabbing 
					{
						text: "With so many milestones to hit in baby's first year, we've broken it down so you know what to expect.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
				],
				rollingOver: [
					{
						text: "With so many milestones to hit in baby's first year, we've broken it down so you know what to expect.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
					{
						text: "As you're looking at some of our toys, you might want to read our guide to when baby will start rolling, crawling and walking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/theyve-got-the-moves'
					},
				],
				sitting: [  //sitting
					{
						text: "As you're looking at some of our toys, you might want to read our guide to when baby will start rolling, crawling and walking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/theyve-got-the-moves'
					},
					{
						text: "With so many milestones to hit in baby's first year, we've broken it down so you know what to expect.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
				],
				tummyTime0monthsPlaytime: [
					{
						text: "As you're looking at our developmental toys, you might want to read our helpful guide.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
				],
				playtime: [
					{
						text: "As you're looking at our developmental toys, you might want to read our helpful guide.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					}
				],
				crawling: [
					{
						text: "As you're looking at some of our toys, you might want to read our guide to when baby will start rolling, crawling and walking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/theyve-got-the-moves'
					},
				],
				playtime6Months: [
					{
						text: "As you're looking at some of our toys, you might want to read our guide to when baby will start rolling, crawling and walking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/theyve-got-the-moves'
					},
					{
						text: "As you're looking at our developmental toys, you might want to read our helpful guide.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
				],
				playtime12Months: [
					{
						text: "As you're looking at some of our toys, you might want to read our guide to when baby will start rolling, crawling and walking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/theyve-got-the-moves'
					},
					{
						text: "Our toys are a great way to get reactions from baby. Ready our guide to when they start laughing, smiling and talking.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/talking-the-talk'
					}
				],
				pushChairs: [   ///c/pushchairs/  /c/pushchairs-prams/ /c/buggies-strollers/  /c/twin-double-pushchairs/
					{
						text: "Trying to find the perfect pushchair? Check out our handy buying guide to get an idea of what you're looking for.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/support/pushchair-buying-guide'
					},
					{
						text: "We've noticed you're interested in pushchairs. If you're looking for a little help, we've got a handy guide to finding the right pushchair for your lifestyle.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/travel/finding-the-perfect-pushchair-for-your-lifestyle'
					},
				],
				carSeats: [   //c/car-seats/  /c/baby-car-seats/  /c/isize-car-seats/
					{
						text: "How's the car seat shopping going? Tricky, isn't it? We've written some top tips to help you find the one that's right for you.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/travel/choosing-the-perfect-car-seat'
					}
				],
				nursery: [
					{
						text: "If you need some expert advice on how to style your nursery, give our interview with Bobo Kids a read.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/nursery-design-hacks-with-bobo-kids'
					},
					{
						text: "Looking for nursery inspiration? Have you read our guide on styling your nursery?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/how-to-style-a-nursery'
					}
				],
				coordFurniture: [ // /en-gb/coordinating-furniture-collection  /c/decor/ /en-gb/coordinating-collections
					{
						text: "If you need some expert advice on how to style your nursery, give our interview with Bobo Kids a read.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/nursery-design-hacks-with-bobo-kids'
					},
					{
						text: "Looking for nursery inspiration? Have you read our guide on styling your nursery?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/how-to-style-a-nursery'
					},
				],
				nurseryFurniture: [
					{
						text: "If you need some expert advice on how to style your nursery, give our interview with Bobo Kids a read.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/nursery-design-hacks-with-bobo-kids'
					},
					{
						text: "Looking for nursery inspiration? Have you read our guide on styling your nursery?",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/how-to-style-a-nursery'
					},
					{
						text: "Struggling to know which mattress is best? Our handy guide explains everything is a clear and simple way.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/sleep/finding-a-mattress'
					}
				],
				variousPlaytimes: [    ///c/playtime-0months/ /c/babyplay-0months/ /c/tummy-time-0months/ /c/books-0months/
					{
						text: "As you're looking at our developmental toys, you might want to read our helpful guide.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/learning-and-development/a-12-month-guide-to-your-babys-development'
					},
				],
				mattressCovers: [
					{
						text: "Struggling to know which mattress is best? Our handy guide explains everything is a clear and simple way.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/sleep/finding-a-mattress'
					}
				],
				libertyClothing: [
					{
						text: "It seems like you're interested in one of our collaborations. Did you know we work with lots of exciting brands? Find out more.",
						link: 'https://www.mamasandpapas.com/en-gb/discover/home/our-collaborators'
					}
				]
			};

			let uspsObj;

			const url = window.location.pathname;


			if (url.indexOf('/c/mum-to-be') > -1) {
				uspsObj = USPS.mumTobe;
			} else if (url.indexOf('/c/bloom-blossom-maternity') > -1) {
				uspsObj = USPS.blossomMaternity;
			}
			else if (url.indexOf('/c/frame-maternity') > -1) {
				uspsObj = USPS.frameMaternity;
			}
			else if (url.indexOf('/c/maternity') > -1) {
				uspsObj = USPS.maternity;
			}
			else if (url.indexOf('/c/baby-basics') > -1 || url.indexOf('/c/travel-changing-bags') > -1) {
				uspsObj = USPS.babyBasicsTravelbags;
			}
			else if (url.indexOf('/c/maternity-athleisure') > -1) {
				uspsObj = USPS.maternityathlesiure;
			}
			else if (url.indexOf('/c/branded-beauty') > -1) {
				uspsObj = USPS.brandedBeauty;
			}
			else if (url.indexOf('/c/maternity-loungewear') > -1) {
				uspsObj = USPS.maternityLoungewear;
			}
			else if (url.indexOf('/c/feeding-all') > -1) {
				uspsObj = USPS.feedingAll;
			}
			else if (url.indexOf('/c/breastfeeding') > -1) {
				uspsObj = USPS.breastFeeding;
			}
			else if (url.indexOf('/c/bottle-feeding') > -1) {
				uspsObj = USPS.bottleFeeding;
			}
			else if (url.indexOf('/c/weaning/') > -1) {
				uspsObj = USPS.weaning;
			}
			else if (url.indexOf('/c/feeding-seating') > -1) {
				uspsObj = USPS.feedingSeatingHighchairs;
			}
			else if (url.indexOf('/c/teethers-comforters') > -1) {
				uspsObj = USPS.teetherscomforters;
			}
			else if (url.indexOf('/c/teething') > -1) {
				uspsObj = USPS.teething;
			}
			else if (url.indexOf('/c/rockers-bouncers-swings') > -1) {
				uspsObj = USPS.rockersBouncers;
			}
			else if (url.indexOf('/c/grabbing') > -1) {
				uspsObj = USPS.grabbing;
			}
			else if (url.indexOf('/c/sitting') > -1) {
				uspsObj = USPS.sitting;
			}
			else if (url.indexOf('/c/rolling-over') > -1) {
				uspsObj = USPS.rollingOver;
			}
			else if (url.indexOf('/c/tummy-time-0months') > -1) {
				uspsObj = USPS.tummyTime0monthsPlaytime;
			}
			else if (url.indexOf(' /c/playtime') > -1) {
				uspsObj = USPS.playtime;
			}
			else if (url.indexOf('/c/crawling-walking') > -1) {
				uspsObj = USPS.crawling;
			}
			else if (url.indexOf('/c/playtime-6months') > -1) {
				uspsObj = USPS.playtime6Months;
			}
			else if (url.indexOf('/c/playtime-12months') > -1) {
				uspsObj = USPS.playtime12Months;
			}
			else if (url.indexOf('/c/pushchairs') > -1 || url.indexOf('/c/pushchairs-prams') > -1 || url.indexOf('/c/buggies-strollers') > -1 || url.indexOf('/c/twin-double-pushchairs') > -1) {
				uspsObj = USPS.pushChairs; ///c/pushchairs/  /c/pushchairs-prams/ /c/buggies-strollers/  /c/twin-double-pushchairs/
			}
			else if (url.indexOf('/c/car-seats') > -1 || url.indexOf('/c/baby-car-seats') > -1 || url.indexOf('/c/isize-car-seats') > -1) {
				uspsObj = USPS.carSeats;   //c/car-seats/  /c/baby-car-seats/  /c/isize-car-seats/
			}
			else if (url.indexOf('/en-gb/nursery') > -1) {
				uspsObj = USPS.nursery;
			}
			else if (url.indexOf('/en-gb/coordinating-furniture-collection') > -1 || url.indexOf('/c/decor') > -1 || url.indexOf('/en-gb/coordinating-collections') > -1) {
				uspsObj = USPS.coordFurniture;// /en-gb/coordinating-furniture-collection  /c/decor/ /en-gb/coordinating-collections 
			}
			else if (url.indexOf('/c/nursery-furniture') > -1) {
				uspsObj = USPS.nurseryFurniture;
			}
			else if (url.indexOf('/c/playtime-0months') > -1 || url.indexOf('/c/babyplay-0months') > -1 || url.indexOf('/c/tummy-time-0months') > -1 || url.indexOf('/c/books-0months') > -1) {
				uspsObj = USPS.variousPlaytimes;    ///c/playtime-0months/ /c/babyplay-0months/ /c/tummy-time-0months/ /c/books-0months/
			}
			else if (url.indexOf('/c/mattress-covers') > -1) {
				uspsObj = USPS.mattressCovers;
			}
			else if (url.indexOf('/c/liberty-clothing') > -1) {
				uspsObj = USPS.libertyClothing;
			}

			$.each(uspsObj, function () {
				var $uspInnerContent = $([
					'<div class="MP050_usp-text">',
						'<a href="' + this.link + '">',
							'<h4>Did you know?</h4>',
							'<span>"' + this.text + '"</span>',
							'<span class="MP050_usp-link">find out more</span>',
						'</a>',
					'</div>'
				].join(''));

				$uspInnerContent.find('.MP050_usp-link').on('click', function() {
					// utils.events.send('MP050', 'click', 'Clicked find out more', {sendOnce: true});
				});

				$uspInnerContent.appendTo('.MP050_USP-bubble');

			});


			//randomise which one to show
			var uspText = $('.MP050_USP-bubble .MP050_usp-text');
			var uspsToShow = Math.floor(Math.random() * $(uspText).length);
			uspText.eq(uspsToShow).addClass('MP050-visible');

			$uspWrapper.find('.MP050-exit').click(function () {
				// utils.events.send('MP050', 'click', 'Clicked close popup');
				var $elem = $(this);

				$elem.closest('.MP050_USPWrap').addClass('MP50-bubbleHidden');
				setCookie('MP050-uspSeen',true);
			});
		}
	}

   /*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		UC.poller([
			'body',
			() => {
			return !!window.jQuery;
			}
			], () => {
			$ = window.jQuery;
			utils.fullStory('MP050', 'Variation 1');
			activate();
			});
	};


	// Run experiment
	_triggers();

})();