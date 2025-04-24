(function($){

var UC={now:Date.now||function(){return(new Date).getTime()},poller:function(a,b,c){var d={wait:50,multiplier:1.1,timeout:null};c||(c=d);for(var e=c.timeout?new Date(UC.now()+c.timeout):d.timeout,f=c.wait?c.wait:d.wait,g=c.multiplier?"disable"===c.multiplier?0:c.multiplier:d.multiplier,h=[],j=function(c,d){if(e&&UC.now()>e)return!1;d=d||f;var i="function"==typeof c?c():window.jQuery(c).length>0;i?(h.push(!0),h.length===a.length&&b()):setTimeout(function(){j(c,d*g)},d)},k=0;k<a.length;k++)j(a[k])}};

    // Triggers
    UC.poller([
        'body',

        function() {
            if (window.jQuery) return true;
        },
        function() {
            if (window.ga) return true;
        }
    ], TP010, {
        timeout: 7000,
        multiplier: 'disable'
    });
    
    // Variation
    function TP010() {
        var $ = window.jQuery;


	var $body = $('body');

	$body.addClass('TP010');
	/*========LIGHT BOX=========*/
	function tp10doonce() {
		if (!localStorage.getItem('TP010-survey')) {


			var loggedin = $('.yCmsComponent  .sessioncamhidetext');

			var $lightboxHTML = $([
				'<div class="tp10-lightbox">',
				'<div id="tp10-lightbox-exit">x</div>',
				'<div class="tp10-content"></div>',
				'</div>'
			].join(''));

			var $lightbox = $lightboxHTML.filter('.tp10-lightbox');
			$lightboxHTML.find("#tp10-lightbox-exit").click(function () {
				$lightbox.fadeOut(200);
			});

			$body.prepend($lightboxHTML);



			$lightbox.fadeIn(200);
			$(window).load(function () {
				localStorage.setItem('TP010-survey', '1');
			});

			/*====Adding Q&As====*/
			var questions = {
				question1: {
					question: 'Are you in the Trade?',
					answers: [
						{ answer: "Yes, that's my profession" },
						{ answer: "No, I am a DIY'er" }
					]
				},
				question2: {
					question: 'Do you have an account with us?',
					answers: [
						{ answer: 'Yes, an offline account' },
						{ answer: 'Yes, an online account' },
						{ answer: 'No' }
					]
				}
			};

			var questionsHtml = $([
				'<div class="tp10-question-wrap tp10-question1 tp10-active">',
					'<h2 class="tp10-title">Please help us by answering 2 quick questions</h2>',
					'<p class="tp10-quest first">' + questions.question1.question + '</p>',
					'<div class="tp10-answers"></div>',
					'<div class="tp10-nextButton">Next</div>',
				'</div>',
				'<div class="tp10-question-wrap tp10-question2">',
					'<h2 class="tp10-title">Last Question...</h2>',
					'<p class="tp10-quest">' + questions.question2.question + '</p>',
					'<div class="tp10-answers"></div>',
					'<div class="tp10-nextButton">Next</div>',
					'</div>',
				'</div>',
				'<div class="tp10-question-wrap tp10-question3">',
					'<h2 class="tp10-title">Link your trade account</h2>',
					'<div class="tp10-bulletPoints"><li><img src="http://sb.monetate.net/img/1/581/1042749.png"/>Get your trade pricing terms agreed with your branch</li><li><img src="http://sb.monetate.net/img/1/581/1042749.png"/>View real time stock levels for any branch</li></div>',
					'<a class="tp10-continueButton href="/login">Continue</a><p>It only takes 2 minutes</p>',
				'</div>',
				'<div class="tp10-question-wrap tp10-question4">',
					'<h2 class="tp10-title">Thanks for your feedback</h2>',
					'<div class="tp10-continueButton">Continue</div>',
				'</div>',
				'<div class="tp10-question-wrap tp10-question5">',
					'<h2 class="tp10-title">Thanks for your feedback</h2>',
					'<p class="tp10-quest">Why not log in to view your trade prices?</p>',
					'<a class="tp10-continueButton href="/login">Log in</div>',
				'</div>',
				'<div class="tp10-question-wrap tp10-question6">',
					'<p class="tp10-quest">Thank you</p>',
					'<a class="tp10-exitButton">Close</div>',
				'</div>'
			].join(''));

			$('.tp10-content').prepend(questionsHtml);

			$.each(questions.question1.answers, function (idx, value) {
				$('.tp10-question1 .tp10-answers').append([
					'<div class="tp10-answer tp10-answer1" answer-id="' + (idx + 1) + '">',
					'<input type="radio" value ="' + value.answer + '" name ="tp10-userType" class="tp10-answer q1">' + value.answer,
					'</div>'
				].join(''));
			});
			$.each(questions.question2.answers, function (idx, value) {
				$('.tp10-question2 .tp10-answers').append([
					'<div class="tp10-answer tp10-answer1" answer-id="' + (idx + 1) + '">',
					'<input type="checkbox" value ="' + value.answer + '" name="tp10-accountType" class="tp10-answer q2 answer-id="' + (idx + 1) + '">' + value.answer,
					'</div>'
				].join(''));
			});

			/*Hide show based on answer*/
			var nextButton = $('.tp10-nextButton'),
				box1 = $('.tp10-question1'),
				box2 = $('.tp10-question2'),
				box3 = $('.tp10-question3'),
				box4 = $('.tp10-question4'),
				box5 = $('.tp10-question5'),
				box6 = $('.tp10-question6');

			$('input[name="tp10-userType"]:first').prop('checked', true);

			//First box
			box1.find(nextButton).click(function () {
				var input1 = box1.find('.tp10-answer1:first');
				input2 = box1.find('.tp10-answer1:last');

				if ($(input1).find("input[name='tp10-userType']:first").is(':checked')) {
					$.cookie("TP010", 'Tradesmen', { expires: 2000 });
				} else {
					$.cookie("TP010", 'Consumer', { expires: 2000 });
				}
				box1.fadeOut(200).removeClass('tp10-active');
				box2.fadeIn(200).addClass('tp10-active');
			});

			//Second Box
			box2.find(nextButton).click(function () {
				var input1 = box2.find('.tp10-answer2:first');
				input2 = box2.find('.tp10-answer2:eq(1)');
				input3 = box2.find('.tp10-answer2:last');

				var answer1 = $('[name="tp10-userType"]:checked').val();

				var answer2Array = [];
				$('[name=tp10-accountType]:checked').each(function () {
					var val = $(this).val();
					answer2Array.push(val);
				});

				/*COOKIES*/

				if (answer1 === "Yes, that's my profession" && answer2Array.indexOf('Yes, an offline account') > -1 && answer2Array.indexOf('Yes, an online account') === -1) { //tradesman-yes offline, no online
					box2.fadeOut(200).removeClass('tp10-active');
					box3.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer1", 'Tradesmen, has offline account, no online account', { expires: 2000 });

				} else if (answer1 === "No, I am a DIY'er" && answer2Array.indexOf('No') > -1 && answer2Array.indexOf('Yes, an online account') === -1 && answer2Array.indexOf('Yes, an offline account') === -1) {
					box2.fadeOut(200).removeClass('tp10-active');
					box4.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer2", 'Consumer, no offline account, no online account ', { expires: 2000 });
				}
				else if (answer1 === "Yes, that's my profession" && answer2Array.indexOf('Yes, an offline account') > -1 && answer2Array.indexOf('Yes, an online account') > -1 && answer2Array.indexOf('No') === -1 && !loggedin) {
					box2.fadeOut(200).removeClass('tp10-active');
					box5.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer3", 'Tradesmen with offline and online account but not logged in', { expires: 2000 });
				}
				else if (answer1 === "No, I am a DIY'er" && answer2Array.indexOf('Yes, an offline account') > -1 && answer2Array.indexOf('Yes, an online account') === -1) {
					box2.fadeOut(200).removeClass('tp10-active');
					box5.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer4", 'Consumer, offline account, no online account', { expires: 2000 });
				}
				else if (answer1 === "No, I am a DIY'er" && answer2Array.indexOf('Yes, an offline account') === -1 && answer2Array.indexOf('Yes, an online account') > -1) {
					box2.fadeOut(200).removeClass('tp10-active');
					box5.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer5", 'Consumer, no offline account, online account', { expires: 2000 });
				}
				else if (answer1 === "Yes, that's my profession" && answer2Array.indexOf('Yes, an offline account') === -1 && answer2Array.indexOf('Yes, an online account') === -1) {
					box2.fadeOut(200).removeClass('tp10-active');
					box6.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer6", 'Tradesman, no offline account, no online account', { expires: 2000 });
				}
				else if (answer1 === "Yes, that's my profession" && answer2Array.indexOf('Yes, an offline account') === -1 && answer2Array.indexOf('Yes, an online account') > -1) {
					box2.fadeOut(200).removeClass('tp10-active');
					box5.fadeIn(200).addClass('tp10-active');
					$.cookie("TPAnswer7", 'Tradesman, no offline account, online account', { expires: 2000 });
				}
				else {
					box2.fadeOut(200).removeClass('tp10-active');
					box6.fadeIn(200).addClass('tp10-active');
				}
			});

			$('.tp10-exitButton').click(function () {
				$lightbox.fadeOut(200);
			});

		}
	}

	tp10doonce();


	}

})(window.jQuery);