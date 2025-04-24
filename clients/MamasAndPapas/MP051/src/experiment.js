// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import { fullStory } from '../../../../lib/utils';

var _MP051 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		var $body = $('body');


		$body.addClass('MP051');

		/*--------------------------------------
		USP Content based on page
		---------------------------------------*/
		var productTitle = $('.breadcrumb .breadcrumb_item:eq(1)').text().trim(),
			productName = $('.productDetail_title').text().trim();
		var banners = [];

		if(productTitle.indexOf('Juno') > -1 || productName.indexOf('Juno') > -1){
			var banners = [
				["Choose between the single wardrobe with a deep fill drawer or, if you're short on space, the stylish clothing rail."],
				["The full-sized Lawson cotbed offers lots of space with three adjustable height positions. And when you're ready, turn it into a toddler bed."],
				["If you're looking for that little bit extra, the Lawson range includes a ladder bookcase (it also matches our Juno collection!) and a storage chest that doubles as a desk."],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
				["All our furniture comes with a 2 Year Guarantee, so you can be sure it will see your little one through those early years."],
			];
		}else if(productTitle.indexOf('Mia Sleigh') > -1 || productName.indexOf('Mia Sleigh') > -1){
			var banners = [
				["An elegant sleigh design for a stylish, traditional nursery"],
				["Mia Sleigh includes two protective teething rails on the cotbed"],
				["Changer converts into a dresser for long-lasting use"],
				["We've got a range of delivery options to help get your furniture to you. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
				["If DIY isn't your thing, we can deliver your furniture to your nursery and even build for you as well. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
			];
		}else if(productTitle.indexOf('Mia Classic') > -1 || productName.indexOf('Mia Classic') > -1){
			var banners = [
				["Timeless collection ideal for a traditional nursery"],
				["Two protective teething rails on the cotbed"],
				["Changer converts into a dresser, for long-lasting use"],
				["All our furniture is tested at our UK test lab so you know it's ready for anything."],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
			];
		}else if(productTitle.indexOf('Mia Vista') > -1 || productName.indexOf('Mia Vista') > -1){
			var banners = [
				["Slatted sides and ends to see baby easily"],
				["Two protective teething rails on the cotbed"],
				["Changer converts into a dresser, for long-lasting use"],
				["All our furniture comes with a 2 Year Guarantee, so you can be sure it will see your little one through those early years."],
				["We do events! If you're looking for a little inspiration and some advice, come along to one of our Parents to Be events. <a href='https://www.mamasandpapas.com/en-gb/store-event'>Find out more.</a>"],
				
			];
		}else if(productTitle.indexOf('Bunny and Clyde') > -1 || productTitle.indexOf('Bunny & Clyde') > -1 || productName.indexOf('Bunny & Clyde') > -1 || productName.indexOf('Bunny and Clyde') > -1){
			var banners = [
				["Transform the Bunny & Clyde cot bed into a toddler or day bed to keep it going as your little one grows."],
				["The Mamas & Papas x Bunny & Clyde dresser showcases a stylish geometric pattern and hidden handles, creating a real feature piece for your nursery or bedroom."],
				["The removable changing rails mean you can carry on using the stylish Bunny & Clyde dresser even when you're done with nappies."],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
				["If DIY isn't your thing, we can deliver your furniture to your nursery and even build for you as well. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
			];
		}else if(productTitle.indexOf('Cooper') > -1 || productName.indexOf('Cooper') > -1){
			var banners = [
				["Cooper's cotbed can be transformed into a toddler bed - meaning it can stay with your little until until they turn 4."],
				["With 3 cot base positions, you can adjust the height of your Cooper cotbed, making it easier to get baby out - or keep them in when they start moving!"],
				["All our furniture is tested at our UK test lab so you know it's ready for anything."],
				["We've got a range of delivery options to help get your furniture to you. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
			];
		}else if(productTitle.indexOf('Atlas') > -1 || productName.indexOf('Atlas') > -1){
			var banners = [
				["The cotbed can be adapted into a toddler bed so that your Atlas collection can stay with your little one for longer."],
				["The dresser comes with a removeable changer, meaning it's ready for nappies, but works just as well in a grown up's room."],
				["You're probably going to have lots of stuff. So Atlas's full-sized wardrobe with two hanging rails and huge drawer is ideal."],
				["If DIY isn't your thing, we can deliver your furniture to your nursery and even build for you as well. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
				["We do events! If you're looking for a little inspiration and some advice, come along to one of our Parents to Be events. <a href='https://www.mamasandpapas.com/en-gb/store-event'>Find out more.</a>"],
			];
		}else if(productTitle.indexOf('Franklin') > -1 || productName.indexOf('Franklin') > -1){
			var banners = [
				["The cotbed can be turned into a toddler bed when baby's ready to move up in the world. And when they're older, turn it into a day bed for a relaxing chill out space."],
				["Franklin's cotbed comes with lots of handy storage. From the hanging rails, ideal for towels after bathtime, to the integrated under bed storage."],
				["The dresser comes with a removable changing top, separated by handy dividers for all your nappy essentials. Plus it has soft close drawers to keep fingers safe."],
				["We've got a range of delivery options to help get your furniture to you. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
			];
		}else if(productTitle.indexOf('Lawson') > -1 || productName.indexOf('Lawson') > -1){
			var banners = [
				["Choose between the single wardrobe with a deep fill drawer or, if you're short on space, the stylish clothing rail."],
				["The full-sized Lawson cotbed offers lots of space with three adjustable height positions. And when you're ready, turn it into a toddler bed."],
				["If you're looking for that little bit extra, the Lawson range includes a ladder bookcase (it also matches our Juno collection!) and a storage chest that doubles as a desk."],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
			    ["If DIY isn't your thing, we can deliver your furniture to your nursery and even build for you as well. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],
				
			];
		}else if(productTitle.indexOf('Oxford White') > -1 || productName.indexOf('Oxford White') > -1 || productTitle.indexOf('Oxford Pebble Grey') > -1 || productName.indexOf('Oxford Pebble Grey') > -1){
			var banners = [
				["If the elegant Sleigh cotbed design is your thing, you can also adapt it into a toddler bed"],
				["If you choose the traditional Classic cotbed, you can change it into a toddler bed and even a day bed, ideal for dens and chill out rooms. It even comes with under-bed storage!"],
				["All our furniture comes with a 2 Year Guarantee, so you can be sure it will see your little one through those early years."],
				["We've got a range of delivery options to help get your furniture to you. <a href='https://www.mamasandpapas.com/en-gb/delivery-collections-and-returns-information'>Find out more.</a>"],		
			];
		}else if(productTitle.indexOf('Osborne') > -1 || productName.indexOf('Osborne') > -1){
			var banners = [
				["With three adjustable height positions and the ability to covert into a toddler bed, the Osborne cot bed will see you and your little one through those early years."],
				["If it's extra space you need, the Osborne cot bed comes with integrated under-bed storage to store away your essentials"],
				["If you can't figure out your cotbeds from your toddler beds, or your cots from your cribs, book a free Personal Shopping session and we'll help you out. <a href='https://www.mamasandpapas.com/en-gb/personal-shopping'>Book Now</a>"],
			    ["All our furniture is tested at our UK test lab so you know it's ready for anything."],
				];
		}

		if(banners.length > 0){
				var $uspWrapper = $('<div class="MP51-usp_wrapper"/>');
				$uspWrapper.insertAfter('.col-lg-4.col-md-6.js-detailPane .productDetail');

				$.each(banners,function(){
					var uspText = this[0];

					
					var bannerUsps = $([
						'<div class="MP51-usp">',
							'<span>Did you know?</span>',
							'<p>'+uspText+'</p></span>',
						'</div>'
					].join(''))
					bannerUsps.appendTo($uspWrapper);
				});


				$uspWrapper.slick({
					arrows: true,
					adaptiveHeight: true
				});

				/*$(window).scroll(function() {    
					var scroll = $(window).scrollTop();
					if (scroll >= 130) {
						$uspWrapper.addClass("MP51-hide");
					}else{
						$uspWrapper.removeClass("MP51-hide");
					}
				});*/
		
		}

		
		
	}

	/*-------------------------------------- 
	Events
	---------------------------------------*/
	$('.MP51-usp').click(function(){
		utils.events.send('MP051', 'USP Click', 'MP01 User clicked on did you know USP');

	});

	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('MP051', 'Variation 1');
		utils.events.send('MP051', 'Page View', '');
		_activate();
	};


	// Run experiment
	_triggers();

})();