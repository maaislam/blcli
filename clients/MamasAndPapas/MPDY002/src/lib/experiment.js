/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * 
 * Event Count down
 */
import { setup } from './services';

export default () => {
  setup();

  var jQuery = window.jQuery || window.$;
  
  //sets cookie to expire in one hour
  var now = new Date();
  let thisEl;

  now.setTime(now.getTime() + 1 * 3600 * 1000);
  var stickyfooter = jQuery('<div id="countdown-footer"><div class="countdownbutton"><i class="ico ico-cross"></i></div><div class="podfades" style="display: block;"><span><a href="/c/sale"><span class="time-wrap"></span><h2 style="letter-spacing: 1px;"><span><strong>Hurry! Our Big Little Event Ends In:</strong></span></h2><p class="days"><span>00</span></p><span class="timeRefDays">days</span><p class="hours">00</p><span class="timeRefHours">hrs</span><p class="minutes">00</p><span class="timeRefMinutes">mins</span><p class="seconds">00</p><span class="timeRefSeconds">secs</span>&nbsp;<i class="ico ico-chevronRight hidden-xs"></i></a></span></div></div></div>');
  console.log('sticky footer ', stickyfooter);
		//cookie not set = shows content / delay starts
		setTimeout(function() {
  		if (document.cookie.indexOf('end-of-BLE-offers') == -1) {
       stickyfooter.appendTo('#PageContainer');
       jQuery(".gis-circle").css("bottom", "70px");
  		}
  		else {
  			//if cookie set do not show content
  			document.cookie = "=1; expires=" + now.toUTCString() + "; path=/";
  			jQuery(".gis-circle").css("bottom", "0");
  		}
		// set cookie manually by clicking button
		jQuery(".countdownbutton").click(function () {
			document.cookie = "end-of-BLE-offers=1; expires=" + now.toUTCString() + "; path=/";
			jQuery("#countdown-footer").fadeOut();
		});
		//Countdown jQuery starts here
		(function (e) {
			e.fn.countdown = function (t, n) {
				thisEl = e(this);
				function i() {
					var eventDate = Date.parse(r.date) / 1e3;
					var currentDate = Math.floor(e.now() / 1e3);
					var seconds = eventDate - currentDate;
					var days = Math.floor(seconds / 86400);
					seconds -= days * 60 * 60 * 24;
					var hours = Math.floor(seconds / 3600);
					seconds -= hours * 60 * 60;
					var minutes = Math.floor(seconds / 60);
					seconds -= minutes * 60;
					days == 1 ? thisEl.find(".timeRefDays").text("day") : thisEl.find(".timeRefDays").text("days");
					hours == 1 ? thisEl.find(".timeRefHours").text("hour") : thisEl.find(".timeRefHours").text("hours");
					minutes == 1 ? thisEl.find(".timeRefMinutes").text("minute") : thisEl.find(".timeRefMinutes").text("minutes");
					seconds == 1 ? thisEl.find(".timeRefSeconds").text("second") : thisEl.find(".timeRefSeconds").text("seconds");
					if (r["format"] == "on") {
						days = String(days).length >= 2 ? days : "0" + days;
						hours = String(hours).length >= 2 ? hours : "0" + hours;
						minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
						seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
					}
					if (!isNaN(eventDate)) {
						thisEl.find(".days").text(days);
						thisEl.find(".hours").text(hours);
						thisEl.find(".minutes").text(minutes);
						thisEl.find(".seconds").text(seconds)
					}
					else {
						//alert("Invalid date. Example: 30 Tuesday 2013 15:50:00");
						clearInterval(interval);
					}
				}
				// console.log(e(this));
				

				var r = {
					date: null
					, format: null
				};
				t && e.extend(r, t);
				i();
				var interval = setInterval(i, 1e3);
				//i();
			}
		})(jQuery);
		function e() {
			var e = new Date;
			e.setDate(e.getDate() + 60);
			dd = e.getDate();
			mm = e.getMonth() + 1;
			y = e.getFullYear();
			futureFormattedDate = mm + "/" + dd + "/" + y;
			return futureFormattedDate
		}
		//change the date here
		jQuery("#countdown-footer").countdown({
			date: "25 Dec 2020 23:59:59", // Change this to your desired date to countdown to
			format: "on"
		});
		//delay ends
		}, 3000);
};
