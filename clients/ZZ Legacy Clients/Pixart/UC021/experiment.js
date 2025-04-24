var UC021 = (function() {

	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

	UC.poller([
		'body',
		function () {
			if (window.jQuery) {
				return true;
			}
		}
	], run);

	function run(){

	function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
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

	sendEvent('UC021', 'Page Loaded', 'Page Loaded', true, 14, 'Page Loaded');

	UC.poller([
		function() {
			var fs = window.FS;
			if (fs && fs.setUserVars) return true;
		}
	], function () {
		window.FS.setUserVars({
			experiment_str: 'UC021',
			variation_str: 'Variation 1'
		});
	}, { multiplier: 1.2, timeout: 0 });

	$('body').addClass('UC021');

	var checkoutStepWrap = $('.checkout_steps'),
		summaryPanel = $('.carrello_container > .col-md-4 .panel > .panel-body');

	checkoutStepWrap.before([
		'<div class="UC021_countdown_wrap">',
			'<p>Never wait longer than you have to.</p>',
			'<p>To meet your expected delivery date, you have ',
			'<span class="UC_hours"></span> hrs ', 
			'<span class="UC_minutes">37</span> mins ',
			'<span class="UC_seconds">10</span> sec</p>',
		'</div>',
	].join(''));

	summaryPanel.after([
		'<div class="UC_step_block">',
			'<h2>3 Steps</h2>',
			'<p>Only three steps to complete your order</p>',
			'<ul>',
				'<li>Log in/register for an account (Make it quicker for next time).</li>',
				'<li>Place your order.</li>',
				'<li>Upload your print ready file so we can start work on you order.</li>',
			'</ul>',
		'</div>',
	].join(''));

	var start = new Date;
	start.setHours(17, 30, 0); // 5:30pm

	function pad(num) {
		return ("0" + parseInt(num)).substr(-2);
	}

	function tick() {
		var now = new Date;
		if (now > start) {
			start.setDate(start.getDate() + 1);
		}
		var remain = ((start - now) / 1000);
		var hh = pad((remain / 60 / 60) % 60);
		var mm = pad((remain / 60) % 60);
		var ss = pad(remain % 60);
		$('.UC_hours').text(hh);
		$('.UC_minutes').text(mm);
		$('.UC_seconds').text(ss);
		setTimeout(tick, 1000);
	}

	tick();
	}
})();