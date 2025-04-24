// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import bubbleHTML from './lib/bubbleMarkup.js';

var AC008 = (function() {
	var trackerName,
		slideQ = false,
		$,
		bubbleObj = window.__UC008Data,
		bubbleObj2 = window.__UC008Data2,
		actionObj = window.__UC008ActionData;

	var UCPoller = (function(){
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			function () {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('AC008', 'Variation 1');

		var cacheDom = (function() {
			//Cache useful selectors for later use
			var bodyVar = $('body'),
				bubble,
				bubbleName,
				bubbleAction,
				bubbleAgency,
				bubbleTime,
				bubbleData,
				bubbleEvent = false;

			bodyVar.addClass('AC008');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar: bodyVar,
				bubble: bubble,
				bubbleAction: bubbleAction,
				bubbleAgency: bubbleAgency,
				bubbleTime: bubbleTime,
				bubbleData: bubbleData,
				bubbleEvent: bubbleEvent
			};
		})();

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

		function convertSecondsToMinutesAndSeconds(seconds){
            var minutes;
            var seconds;
            minutes = Math.floor(seconds/60);
            seconds = seconds%60;

            return [minutes, seconds];
        }

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}


		var cookieGet = (function(){
			return function (name) {
				var match = document.cookie.match(name+'=([^;]*)');
				return match ? match[1] : undefined;
			}
		})();

		var bubble = {
			// Click function for the mobile tab variation to show the hidden options
			contentBuilder: function(){
				// Append bubble markup to the body
				cacheDom.bodyVar.append(bubbleHTML);

				// Cache the main selector
				cacheDom.bubble = $('.AC008_bubble-info');
				cacheDom.bubbleName = cacheDom.bubble.find('.AC008_msg-name');
				cacheDom.bubbleAction = cacheDom.bubble.find('.AC008_msg-action');
				cacheDom.bubbleAgency = cacheDom.bubble.find('.AC008_msg-agency');
				cacheDom.bubbleTime = cacheDom.bubble.find('.AC008_msg-time');
			},
			bubbleAnim: function(){
				if(cacheDom.bubbleEvent === false){
					utils.events.send('AC008', 'Bubble', 'Bubble Visible', true);
					cacheDom.bubbleEvent = true;
				}
				// Use CSS transitions to move the bubble into place
				cacheDom.bubble.addClass('AC008_bubble-move');

				// Use a setTimeout to fadeout then remove the class and styles that fadeout add to reset the bubble
				// Have the setTimeout delay equal to the animation time (600ms) plus the time you want it to remain (5000ms)
				setTimeout(function(){
					cacheDom.bubble.fadeOut(function(){
						cacheDom.bubble.removeClass('AC008_bubble-move').attr('style', '');
					});
				}, 7600);
			},
			bubbleStart: function(){
				cacheDom.bubbleData = bubbleObj;
				var cookieCheck = cookieGet('rememberedContactDetails');
				// Check if user is employer, if so use different data set
				if(cookieCheck !== undefined){
					var decodeCookie = JSON.parse(decodeURIComponent(cookieCheck));

					if(decodeCookie.userDetails.type == 'Employer'){
						cacheDom.bubbleData = bubbleObj2;
					}
				}

				// Count how many objects is in the JSON file, create an empty array
				var counter = 0,
					NameCounter = 0,
					agencyArray = [],
					actionArray = [],
					randomTime;

				// Shuffle the numbers
				agencyArray = shuffle(cacheDom.bubbleData);
				actionArray = shuffle(actionObj);

				var timeOutRandom;

				function bubblePop(){
					// create random time between 9 seconds and 40 seconds
					timeOutRandom = Math.ceil(Math.random() * 32000 + 9000);

					// create random time between 30 seconds and 10 mins
					randomTime = Math.ceil(Math.random() * 570 + 30);
					randomTime = convertSecondsToMinutesAndSeconds(randomTime);

					if(randomTime[0] == 0) {
						cacheDom.bubbleTime.text('about ' + randomTime[1] + ' seconds ago');
					}
					else {
						cacheDom.bubbleTime.text('about ' + randomTime[0] + ' minutes ago');
					}

					// Change bubble message 
					cacheDom.bubbleAction.html(actionArray[NameCounter]);
					cacheDom.bubbleAgency.html(agencyArray[counter]);

					// Trigger bubble animation
					bubble.bubbleAnim();

					// Increment counters
					counter++;
					NameCounter++;

					// Reset the counter to start looping through the array again
					if(counter == cacheDom.bubbleData.length - 1){
						counter = 0;
					}

					if(NameCounter == actionObj.length - 1){
						NameCounter = 0;
					}

					// Randomise the time to show the bubble
					setTimeout(function(){
						bubblePop();
					}, timeOutRandom);
				}

				// Call the bubble function to start the process
				bubblePop();
			}
		};

		// Build Markup 
		bubble.contentBuilder();
		setTimeout(function(){
		// Start the process after 4 seconds
			bubble.bubbleStart();
		}, 4000);
	}	
})();