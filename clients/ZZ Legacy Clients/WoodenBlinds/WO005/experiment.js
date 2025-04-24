var _WO005 = (function () {

	/*-------------------------------
	Change quick quote banner text
	---------------------------------*/
	function quickQuotebanner() {
		var quickQuote = $('#quickQuote');

		quickQuote.find('h4').html('<h4>Quick Quote<p>Enter your <span>window</span> size and view all blinds & prices</p></h4>');
		quickQuote.parent().removeClass('col-md-4').addClass('col-md-12');
	};

	/*-------------------------------
	add a dropdown to choose one of the filter options on the quick quote pages 
	---------------------------------*/
	function filterDropdown() {
		var dropDown = $(['<label class="wo5-selectLabel">Style</label>',
			'<select class="wo5_dropdown" name="slug">',
			'<option value="white-wooden-blinds">White</option>',
			'<option value="natural-wooden-blinds">Light/Natural</option>',
			'<option value="oak-wooden-blinds">Oak/Medium</option>',
			'<option value="dark-wooden-blinds">Dark</option>',
			'<option value="painted-wooden-blinds">Painted</option>',
			'<option value="wooden-blinds-with-tapes">With Tape</option>',
			'</select>'
		].join(''));
		dropDown.insertAfter('.form-group #quick_quote_form .form-control:last');

	};

	/*-------------------------------
	Add the 4 new blocks
	---------------------------------*/
	function addNewblocks() {
		var newBlocks = $('<div class="row wo5-newBlocks"><div class=wo5_block_wrapper><div class="col-xs-12 col-md-6 wo5_rightBlock"/><div class="col-xs-12 col-md-6 wo5-leftBlocks"/></div></div>');
		$('#content .row:first').after(newBlocks);

		var firstBlock = $([
			'<div class="wo5-rightBlock">',
			'<a href="http://www.wooden-blinds-direct.co.uk/wooden-venetian-blinds">',
			'<div class="wo5-imageblock wo5_rightSide">',
				'<div class="wo5_link wo5_rightSide">',
					'<a href="http://www.wooden-blinds-direct.co.uk/wooden-venetian-blinds">Shop All made to measure Wooden Blinds</a>',
				'</div>',
			'</div>',
			'</a>',
			'</div>'
		].join('')); // add 50% width block

		var firstRightBlock = $(['<div class="wo5-infoBlock">',
			'<h2>Made to measure Venitian Blinds</h2>',
			'<p>All the blinds we supply are made of the highest quality Basswood and Aluminuim, coming in a huge range of painted colours, stains and finishes.<br>Every Wooden Blinds is hand cut to size based on your specific measurements</p>',
			'</div>'
		].join('')); // add info block - different to other two

		newBlocks.find('.wo5_rightBlock').prepend(firstBlock); //adding first block
		newBlocks.find('.wo5-leftBlocks').prepend(firstRightBlock); //adding content to blocks

		var colourBlocks = $('<div class="wo5_colourblock_wrapper"</div>').appendTo('.wo5-leftBlocks');

		var colours = [ //add smaller link blocks
			['https://cdn.interiorgoodsdirect.com/woodens/img/white-o.png', '#', 'White'],
			['https://cdn.interiorgoodsdirect.com/woodens/img/light-wood-o.png', '#', 'Light/Natural'],
			['https://cdn.interiorgoodsdirect.com/woodens/img/natural-oak-wood-o.png', '#', 'Oak/Medium'],
			['https://cdn.interiorgoodsdirect.com/woodens/img/dark-wood-o.png', '#', 'Dark'],
			['https://cdn.interiorgoodsdirect.com/woodens/img/painted-o.png', '#', 'Painted'],
			['https://cdn.interiorgoodsdirect.com/woodens/img/with-tapes-o.png', '#', 'With Tape'],
		];
		$.each(colours, function () {
			var image = this[0],
				link = this[1],
				colourName = this[2];

			$(['<div class="wo5_colourBlock">',
				'<a href="' + link + '">',
				'<div class="wo5-imageblock wo5-color-image">',
				'<img src="' + image + '">',
				'</div>',
				'</a>',
				'<div class="wo5_colorlink">',
				'<a href="' + link + '">' + colourName + '</a>',
				'</div>',
				'</div>',
				'</div>'
			].join('')).appendTo('.wo5_colourblock_wrapper');

		});


		var twoleftBlocks = [ //add smaller link blocks
			['wo5-firstLink', '#', 'Shop All Made to measure Alimunium Blinds'],
			['wo5-secondLink', '#', 'Venetian Blind Accessories'],
		];
		$.each(twoleftBlocks, function () {
			var blockClass = this[0],
				blockLink = this[1],
				blockTitle = this[2];

			var linkBlock = $([
				'<div class="wo5_leftblock ' + blockClass + '">',
				'<a href="' + blockLink + '">',
				'<div class="wo5-imageblock">',
				'<div class="wo5_link">',
				'<a href="' + blockLink + '">' + blockTitle + '</a>',
				'</div>',
				'</div>',
				'</a>',
				'</div>'
			].join(''));
			linkBlock.insertAfter('.wo5_colourblock_wrapper');
		});

		//if window is bigger than 1024 move one of the smaller links to the right
		if ($(window).width() > 1023) {
			$('.wo5_leftblock.wo5-firstLink').appendTo('.wo5_rightBlock');
		}

	};

	/*-------------------------------
	//Bring best sellers above the TrustPilot widget
	---------------------------------*/
	function moveBestsellers() {
		var bestSellers = $('.row.best-sellers-wrap');
		bestSellers.insertAfter('.wo5-newBlocks');

	};

	/*-------------------------------
	Run test
	---------------------------------*/
	function init() {


		/**
     * UC Library - Poller
     * @version 0.2.2
     */
    	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

    // Triggers
    UC.poller([
		'body',
		'#content',
        function () {
            if (window.jQuery) return true;
        },
        function () {
            if (window.ga) return true;
        }
    ], WO005, {
        timeout: 7000,
        multiplier: 0
	});
	 function WO005() {
        var $ = window.jQuery;

			$('body').addClass('WO005');

			// Full Story Integration 
			UC.poller([
			function() {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'WO005',
				variation_str: 'Variation 1'
			});
		}, { multiplier: 1.2, timeout: 0 });


			//run all functions here
			filterDropdown();
			addNewblocks();
			moveBestsellers();
			quickQuotebanner();


		}
	}

	init();
})();