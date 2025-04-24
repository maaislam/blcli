var _TG010 = (function () {

	/*-------------------------------
		Run test
	---------------------------------*/
	var UC = function (a) {
		return a.poller = function (a, b, c) {
			var d = {
					wait: 50,
					multiplier: 0,
					timeout: 6000
				},
				e = Date.now || function () {
					return (new Date).getTime()
				};
			if (c)
				for (var f in c) d[f] = c[f];
			else c = d;
			for (var g = !!d.timeout && new Date(e() + d.timeout), h = d.wait, i = d.multiplier, j = [], l = function (c, d) {
					if (g && e() > g) return !1;
					d = d || h,
						function () {
							var a = typeof c;
							return "function" === a ? c() : "string" !== a || document.querySelector(c)
						}() ? (j.push(!0), j.length === a.length && b()) : setTimeout(function () {
							l(c, d * i)
						}, d)
				}, m = 0; m < a.length; m++) l(a[m])
		}, a
	}(UC || {});
	// Triggers
	UC.poller([
		'body',
		'#container',
		'#submit-button',
		function () {
			if (window.jQuery) return true;
		},

	], TG010, {
		timeout: 7000,
		multiplier: 0
	});

	function TG010() {
		var $ = window.jQuery;

		$('body').addClass('TG010b');
		// Full Story Integration 
		UC.poller([
			function () {
				var fs = window.FS;
				if (fs && fs.setUserVars) return true;
			}
		], function () {
			window.FS.setUserVars({
				experiment_str: 'TG010b',
				variation_str: 'Variation 1'
			});
		}, {
			multiplier: 1.2,
			timeout: 0
		});




		/*-------------------------------
		Italian/English Content
		---------------------------------*/

		var pageurl = window.location.href,
			pageCountry;

		/*header content*/
		var productView,
			productURL,
			phoneText,
			phoneNo,
			phoneLink,
			emailText,
			emailInner,
			emailLink;

		/*Product Information*/

		var productSubtext,
			smallProddesc,
			bulletPoint1,
			bulletPoint2,
			bulletPoint3;


		/*Form content*/
		var getBrochure,
			getBrochureUSP,
			formFieldphone,
			downloadButtontext,
			downloadDesktopButton;


		/*Main Content*/
		var usp1,
			usp2,
			usp3,
			blocksHeading,
			block1heading,
			block1text,
			block2heading,
			block2text,
			block3heading,
			block3text,
			block4heading,
			block4text,
			block5heading,
			block5text;

		/*Image bar*/
		var imageBarheading,
			imageBarsmallText;


		if (pageurl.match('/.*(\/)(land)(\/)(en)(\/)(landing_myrun_adwords).*/') || pageurl.match('/.*(\/)(land)(\/)(en-us)(\/)(landing_myrun_adwords).*/')) {
			pageCountry = 'english';

		} else if (pageurl.match('/.*(\/)(land)(\/)(it)(\/)(landing_myrun_adwords).*/')) {
			pageCountry = 'italian';
		}



		if (pageCountry === 'italian') {
			productView = 'Vai al Prodotto';
			productURL = 'https://www.technogym.com/it/tapis-roulant-myrun.html';
			phoneText = 'Chiamaci';
			phoneNo = '800 70 70 70';
			phoneLink = 'tel:800707070';
			emailText = 'Contattaci';
			emailInner = 'E-mail';
			emailLink = 'https://www.technogym.com/it/contacts/#contact-form';

			productSubtext = 'Disegnato dai Runner per chi ama correre.';
			smallProddesc = "MYRUN è un elegate tapis roulant ad alte prestazione che include un app nativa per monitorare e ottimizzare i tuoi allenamenti";
			bulletPoint1 = 'MYRUN è il primo tapis roulant che include un app nativa che si sincronizza con il tuo tablet';
			bulletPoint2 = 'Con il suo design minimalista si adatta perfettamente all’ambiente di casa tua';
			bulletPoint3 = 'Rivivi le tue corse all’aperto comodamente a casa.';


			getBrochure = 'COMPILARE IL FORMATO PER LA VOSTRA BROCHURE GRATUITA';
			getBrochureUSP = 'Per ricevere il catalogo con tutte le specifiche tecniche';
			formFieldphone = 'Telefono';
			downloadButtontext = 'Scarica il Catalogo';
			downloadDesktopButton = 'Scarica Ora';
			blocksHeading = 'Disegnato dai Runner per chi Ama Correre';
			usp1 = '2 anni di garanzia';
			usp2 = 'Consegna e installazione inclusi nel prezzo';
			usp3 = 'Supporto Continuo';
			block2heading = 'RUNNING MUSIC';
			block2text = 'RUNNING MUSIC seleziona dalla tua libreria musicale i brani che si adattano meglio al tuo ritmo di corsa, facendo di MYRUN TECHNOGYM® il primo tapis roulant interattivo di sempre. Running Music è una delle funzionalità disponibili con MYRUN App';
			block1heading = 'MYRUN APP';
			block1text = 'MYRUN è il primo tapis roulant che include un app nativa che si sincronizza con il tuo tablet Con il suo design minimalista si adatta perfettamente all’ambiente di casa tua Rivivi le tue corse all’aperto comodamente a casa.';
			block3heading = 'DESIGN ELEGANTE E FUNZIONALE';
			block3text = 'Il design minimale, unito alla semplicità di una tecnologia senza tempo, regala un’esperienza di corsa senza eguali.';
			block4heading = 'Rivivi la tua corsa outdoor in casa';
			block4text = 'MYRUNNING LOGBOOK potrai rivivere la tue corse preferite all’aperto su MYRUN TECHNOGYM. Traccia le tue prestazioni outdoor utilizzando la Technogym App oppure le app e i dispositivi compatibili per poterle replicare quando vuoi, dove vuoi.';
			block5heading = 'Superficie d’allenamento adattiva';
			block5text = 'L’innovativa superficie di corsa si adatta al tuo modo di correre e assorbe gli impatti per ridurre il rischio di traumatismi senza rubare energia alla tua corsa.';


			imageBarheading = 'MYRUN può essere tuo a 85€ al mese. Tan 0%, Taeg 3,65%';
			imageBarsmallText = '<a href="https://www.technogym.com/it/privacy-policy/">Vedi termini e condizioni qui.</a>';


		} else if (pageCountry === 'english') {
			productView = 'View product';
			productURL = 'https://www.technogym.com/treadmill-myrun.html';
			phoneText = 'Call us';
			phoneNo = '0800 316 2496';
			phoneLink = 'tel:08003162496';
			emailText = 'Contact Us';
			emailInner = 'Email Us';
			emailLink = 'https://www.technogym.com/gb/contacts/?reason=mail';

			productSubtext = 'The treadmill that puts you in control of a happier, healthier life.';
			smallProddesc = "MYRUN is a sleek,stylish,high perfomance treadmill that also includes a native app to track and optimise your workouts.";
			bulletPoint1 = 'MYRUN is the first treadmill to include a native app that can sync to your tablet';
			bulletPoint2 = 'Sleek, minimalist design, looks great in your home';
			bulletPoint3 = 'Relive your outdoor runs at home with simple track and sync';

			getBrochure = 'FILL IN THE FORM TO GET YOUR FREE BROCHURE';
			getBrochureUSP = 'and learn about the full MYRUN spec, and every feature';
			formFieldphone = 'Phone Number';
			downloadButtontext = 'Download Brochure';
			downloadDesktopButton = 'Download Now';

			usp1 = '2 Year Guarantee';
			usp2 = 'High Quality Delivery And Installation Included';
			usp3 = 'Ongoing Support';
			blocksHeading = 'Take your training to the next level';
			block1heading = 'MYRUN TECHNOLOGY';
			block1text = 'MYRUN is the first treadmill to include a native app that can sync to your tablet. Every detail of your run will be tracked for you. The MYRUN APP can give feedback and tips, even design workouts to improve your run.';
			block2heading = 'RUNNING MUSIC';
			block2text = 'The treadmill recognises your pace and selects songs from your music library that are best suited to your run';
			block3heading = 'AWARD-WINNING DESIGN';
			block3text = 'MYRUN’s sleek, minimalist design will look great in your home. It’s designed to maximise your feeling of space during use but occupy the smallest possible footprint.';
			block4heading = 'MYRUNNING LOGBOOK';
			block4text = 'Relive your outdoor runs at home using the MYRUNNING LOGBOOK. This is ideal if you’re training for a run as you can prepare for every rise and fall. Use the TECHNOGYM APP or your favourite fitness app to track your outdoor runs, then link the data to your MYRUN APP on the treadmill. You’ll get a tailored workout, with every elevation of your outdoor run replicated. MYRUN TECHNOGYM can challenge you to improve, pushing you to reach your personal best.';
			block5heading = 'ADAPTIVE RUNNING SURFACE';
			block5text = 'Our innovative running surface adapts to the way you run. Responding with a suitable amount of cushioning to absorb impact to decrease the risk of injuries.';

			imageBarheading = 'Available with flexible payment plans from just £122 a month, 0% interest';
			imageBarsmallText = ' TECHNOGYM MYRUN full price - £3250 <a href="http://www.technogym.com/privacy-policy/"> View Terms &amp; Conditions</a>';

		}






		/*-------------------------------
		ADD TOP STICKY BAR
		---------------------------------*/
		var topBar = $('<div class="tg10-headerBar"/>');
		topBar.prependTo('body');

		topBar.html(['<div class="tg10-headerInner">',
			'<div class="tg10-headerContent"><img src="http://www.technogym.com/land/wp-content/uploads/2017/02/Logo-Technogym_squeeze.png"/></div>',
			'</div>'
		].join(''));


		/*-------------------------------
		Phone Number
		---------------------------------*/
		var phoneNumber = $('<div class="tg10-contact"/>');
		phoneNumber.insertAfter(topBar);

		phoneNumber.html('<img src="//cdn.optimizely.com/img/8355110909/0a812a3534de4b19b6ff042c518a8ac8.png"/><span class="tg10-phonetext"><p>' + phoneText + '</p><a href="' + phoneLink + '">' + phoneNo + '</a></span>');


		/*-------------------------------
		Email
		---------------------------------*/
		var email = $('<div class="tg10-email"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCQYRGCyUkGLXAAAEFklEQVRo3u2Zb2iVVRzHv8+dm5uVbc62ynRQODNKMUJsYYu1iIrSiMoMEqIGjaKsN0FRBr0IlJLANTR6EUJFklQvSqI05iJwTMmyaeNaaZLJcmGu6XV+enHP/fXc3X/Pvfe5u724v1f3fM/v/L7f5zzn/M55fleqWMUqVmbz/A2atEQNJWY8qb3eHykodWzgKFNlR9lAnZ9+GQenjDxhB1nmXgFX6jtdUIbXP6bF3rCHp690iyRpRD0a1GiJaet1vbrVKEnarXaxyk3JHpqn6tFpZo9jXSN6ATjDwqmilyQWcgaAt8UAAP3WdQfdzC4JaT1PcLu1+gEYFGcB6HHwfW6bXBc6/dX8DMBK1+6Jz3xE1ZKks87vGknSHPXRHip9m/rVIklqdVCcsUZuMWx0jrMtHY1zf2j09zBmKajRYRvjwCQBEnP5wWETPBUKfRfnXMQDzDM0kwCJBnZbvnoNrwBOP/06i9XPLB+eWYBELdtt2LtUF0xexWaL83FS9s8uQCLCWzb0cy4siL6OTyzGZqom9WYXIEm8aMMHaMqbvpFvbPy6NP25BUg8Ssz1D3NVXvQtDLmR5+hK6xFEgMRdnHYex7khMP1ijrlRY6zI4BNMgMRSTjifU/8l0qz0HfzlRoxwU0avoAIk5hN1XjEeyUn/oDtm4NdsB1weAiQuZdAW1PNZPZ/hvPPbz5ysnvkIkLiIL0zCm0TS+nisN5+vqc8RMT8BEtVstfAfMj1r/7bU/qIFTHrCXVyccYY2pZ+hogVIEq8azX6uMLTZt0beDxipEAHMd5eKuB3hWodGfWiMh0okgEX8TrKN0u7LEwmb4PESCOBG/rScuJrf3O9xy5Qn6OBLE7E2ZAHcxt/O8xdaJeZxIOmpD9MqMd13/r0UogDutew2xFyHzfJdW/ZxmUOn8Z6h60MSwBq7Ug1yiQ+v5SMAdjLTh0bYYhJ6M2/I4IfR05Zc+5L3voTHcjpTSXjdJGxlWlECeNlCfcYMBTZesXHbqSlQAB5vWJgP8r0Z8pyN3ZFOek4BVPGOhdgSJLmmROhiwl7ezJTeHJfSGrYFW81ZJay2K91A4oMkkABmsMPoXyiUXpJYwbiL831iq+YUQL37coXzdBdDL0l0WgobpiWAAJrY57AYDxdLL0m0MeoiHqHV0PQCqLVy1T/cHQa9JLHEDqzjXJ4sYPLqfsB9Pp/Snd6nYQnw9upmHZMkNemx5L6IYpKkxC4fkiSN6FZvZ1j0kuT9qOU6LEn6yUFxxliiRNNn09XGs8nrNSyjgbWsTMw5ffHtmShSjbOgFKQZxSxw27O3PGW6JivTrUouVG7StzpZYvYGLdWTitfhdqmjnKXa01rkRSOSF1WnDk05/SF1elFrla9c/3/5w6JiFatY+exf3mYwhBxq3QAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDktMDZUMTc6MjQ6NDQrMDI6MDD5hYlBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA5LTA2VDE3OjI0OjQ0KzAyOjAwiNgx/QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="/><span class="tg10-emailtext"><p>' + emailText + '</p><a href="' + emailLink + '">' + emailInner + '</a></div>');


		/*-------------------------------
		Form Structure 
		---------------------------------*/
		var brochureForm = $('#container .col-sm-3').addClass('tg10-formColumn');

		$('<h3 class="brochureTitle">' + getBrochure + '</h3>').prependTo(brochureForm);

		brochureForm.find('#need').remove();
		brochureForm.find('.checkbox').hide();
		brochureForm.find('#email').attr('placeholder', 'Email');
		brochureForm.find('#phone').attr('placeholder', formFieldphone); //hide these on mobile show onclick

		brochureForm.find('.form-group:eq(1),.form-group:eq(2)').addClass('tg10-bfield');



		/*-------------------------------
		Replace top content based on screen size - run  content function - move phone bar
		---------------------------------*/
		var $mainContainer = $('#container .col-sm-9.text-center:first').addClass('tg10-topColumn');

		if ($(window).width() >= 740) {
			$mainContainer.html('<div class="tg10-content tg10-newContentdesktop"/>');
			phoneNumber.insertBefore('.tg10-headerContent:last');
			phoneNumber.find('img').attr('src', '//cdn.optimizely.com/img/8355110909/838b877a8d6d438d94fdfc678fb56d3c.png');
			email.prependTo('.tg10-contact');
			email.show();
			topcontentDesktop();

			

			if (pageCountry === 'italian') {
				$('.tg10-subText').text('Progettato da corridori, per i corridori');
				brochureForm.find('#submit-button').val('Scarica Ora');

			} else if (pageCountry === 'english') {
				$('.tg10-subText').text('Designed by runners, for runners');
				brochureForm.find('#submit-button').val('Download Now');

			}

		} else {
			$mainContainer.html('<div class="tg10-content tg10-newContentmobile"/>');
			phoneNumber.insertAfter(topBar);
			topContentMobile();
			phoneNumber.find('img').attr('src', '//cdn.optimizely.com/img/8355110909/0a812a3534de4b19b6ff042c518a8ac8.png');
			email.hide();
			brochureForm.find('#submit-button').val(downloadButtontext);
		}

		/*-------------------------------
		Main Content functions based on screen size
		---------------------------------*/

		/*MOBILE CONTENT*/
		function topContentMobile() {
			var $pageContent = $('.tg10-content');

			if ($('.tg10-newContentmobile').length > 0) {
				var $topcontentTitle = 'TECHNOGYM<span>&reg;</span> MYRUN',
					$topcontentSub = productSubtext,
					$topcontentLink = productURL,
					$topcontentPrice = '£3,250 including VAT, delivery and installation',
					$topcontentsmallPrint = ' 0% interest, flexible payment plans from as little as £122 a month*';

				$pageContent.html(['<div class="tg10-toptext">',
					'<h3>' + $topcontentTitle + '</h3>',
					'<span class="tg10-subText">' + $topcontentSub + '</span>',
					'<span class="tg10-smalltext">' + $topcontentPrice,
					'<span class="tg10-smallprint">' + $topcontentsmallPrint + '</span></span>',
					'</div>'
				].join(''));

				$pageContent.prependTo('.tg10-topColumn');


				/*add fake button to show form then show real button if form is shown*/
				var showForm = $('<div class="tg10-showForm">' + downloadButtontext + '</div>');
				showForm.appendTo('.tg10-formColumn');


				showForm.click(function () {
					$('.tg10-formColumn.fixed #requestform').slideDown(200);
					$(this).hide();
				});

			}
		}
		/*DESKTOP CONTENT*/
		function topcontentDesktop() {
			var $pageContent = $('.tg10-content');
			if ($('.tg10-newContentdesktop').length > 0) {
				var $topcontentTitle = 'TECHNOGYM<span>&reg;</span> MYRUN',
					$topcontentSub = productSubtext,
					$showtopText = smallProddesc,
					$tickImage = '<img src="//cdn.optimizely.com/img/8355110909/d5031150779348ad91b7c00cb185bb85.png"/>';

				$pageContent.addClass('col-sm-3');

				$pageContent.html(['<div class="tg10-toptext">',
					'<h3>' + $topcontentTitle + '</h3>',
					'<span class="tg10-subText">' + $topcontentSub + '</span>',

					'</div>'
				].join(''));
				$pageContent.insertBefore('.col-sm-3.tg10-formColumn');




				/*-------------------------------
				Add information above brochure
				---------------------------------*/
				$('.tg10-newContentdesktop').next('.tg10-mainContentwrap').hide();
				var findoutMore = $('<div class="tp10-moreInfo"/>');
				var formColumn = $('.col-sm-3.tg10-formColumn');
				formColumn.insertAfter('.tg10-newContentdesktop');
				findoutMore.prependTo(formColumn);

				findoutMore.html('<div class="tg10-infotext"><h3>' + getBrochure + '</h3></div>');

				$(['<li>' + getBrochureUSP + '</li>'].join('')).appendTo('.tg10-infotext');

				/*-------------------------------
				Form Structure for desktop
				---------------------------------*/
				var brochureForm = $('#container .col-sm-3').addClass('tg10-formColumn');

				$('<h3 class="brochureTitle">' + downloadButtontext + '</h3>').prependTo(brochureForm);

				brochureForm.find('#need').remove();
				brochureForm.find('.checkbox').hide();
				brochureForm.find('#email').attr('placeholder', 'Email');

			}
		}




		/*-------------------------------
		Create Inner Content div
		---------------------------------*/
		var mainContent = $('<div class="tg10-mainContentwrap col-sm-12"><div class="tg10-maincontent-inner"/></div>');
		mainContent.insertAfter('.col-sm-3.tg10-formColumn:last');


		/*-------------------------------
		USPs
		---------------------------------*/
		var uspInfo = $('<div class="tg10-uspWrapper col-sm-9"/>');
		mainContent.find('.tg10-maincontent-inner').append(uspInfo);

		var prodUSP = [
			['//cdn.optimizely.com/img/8355110909/0cf355be37fe4e6f88d0a0199c9d22af.png', usp1],
			['//cdn.optimizely.com/img/8355110909/d437b485f7fa47ebafd841bc72d7fa0a.png', usp2],
			['//cdn.optimizely.com/img/8355110909/448262ec839e49428b1a86b06483af61.png', usp3]
		]

		$.each(prodUSP, function () {
			var uspIcon = this[0],
				uspText = this[1];

			$(['<div class="tg10-uspblock">',
				'<img src="' + uspIcon + '"/>',
				'<span>' + uspText + '</span>',
				'</div>'
			].join('')).appendTo('.tg10-uspWrapper');

		});

		/*-------------------------------
		Product Content 
		---------------------------------*/

		var productInfoWrapper = $('<div class="tg10-productInfo col-sm-9"><h3>' + blocksHeading + '</h3></div>');
		mainContent.find('.tg10-maincontent-inner').append(productInfoWrapper);

		var productInformation = [{
				"image": 'https://www.technogym.com/wpress/wp-content/uploads/extended-content/myrun_mainfeature_06.jpg',
				"title": block1heading,
				"caption": block1text
			},
			{
				"image": 'https://www.technogym.com/wpress/wp-content/uploads/extended-content/myrun_mainfeature_04.jpg',
				"title": block2heading,
				"caption": block2text
			},
			{
				"image": 'https://www.technogym.com/wpress/wp-content/uploads/extended-content/myrun_mainfeature_01.jpg',
				"title": block3heading,
				"caption": block3text
			},
			{
				"image": 'https://www.technogym.com/wpress/wp-content/uploads/extended-content/myrun_mainfeature_05.jpg',
				"title": block4heading,
				"caption": block4text
			},
			{
				"image": 'https://www.technogym.com/wpress/wp-content/uploads/extended-content/myrun_mainfeature_02.jpg',
				"title": block5heading,
				"caption": block5text
			},

		];


		$.each(productInformation, function (idx, val) {
			var infoImage = val.image,
				infoTitle = val.title,
				infoText = val.caption,
				infoLink = val.link;

			var productInfoblock = $([
				'<div class="tg10-productBlock col-sm-9">',
				'<img src="' + infoImage + '"/>',
				'<div class="tg10-innerContent">',
				'<h3>' + infoTitle + '</h3>',
				'<p>' + infoText + '</p>',
				'</div>',
				'</div>'
			].join(''));
			$('.tg10-productInfo').append(productInfoblock);
		});


		/*-------------------------------
			create desktop images here
		---------------------------------*/
		var bannerWrap = $('<div class="col-sm-9 tg10-desktopBanner tg10-background1"><div class="tg10-imagessideWrap"/></div>');

		if ($(window).width() >= 740) {
			$('.col-sm-9.text-center.tg10-topColumn').append(bannerWrap);
		} else {
			$('.tg10-topColumn .tg10-content').prepend(bannerWrap);
			$('.tg10-toptext').prependTo(bannerWrap);
		}
		var $desktopMainimages = $('.tg10-desktopBanner');

		/*image thumbnails*/
		var productThumbs = [
			['tg10-thumb1', '//cdn.optimizely.com/img/8355110909/62fd9d76e38a4c5ea7dd9e1bb6ff1c33.jpg'],
			['tg10-thumb2', 'https://www.technogym.com/media/catalog/product/cache/1/thumbnail/75x75/040ec09b1e35df139433887a97daa66f/m/y/myrun_hero_15.jpg'],
			['tg10-thumb3', 'https://www.technogym.com/media/catalog/product/cache/1/thumbnail/75x75/040ec09b1e35df139433887a97daa66f/m/y/myrun_gallery_01_12.jpg'],
			['tg10-thumb4', '//cdn.optimizely.com/img/8355110909/d833149768494d0dadb38cfcf241ddc9.jpg']
		]

		$.each(productThumbs, function () {
			var thumbName = this[0],
				thumbImage = this[1];

			var thumbnails = $(['<div class="' + thumbName + ' tg10-thumbImage" style="background-image: url(' + thumbImage + ');"></div>'].join(''));

			$('.tg10-imagessideWrap').append(thumbnails);


		});

		/*-------------------------------
		show backgrounds based on thumb click
		---------------------------------*/
		var thumb1 = $('.tg10-thumb1'),
			thumb2 = $('.tg10-thumb2'),
			thumb3 = $('.tg10-thumb3'),
			thumb4 = $('.tg10-thumb4');

		thumb1.addClass('tg10-thumbactive');

		thumb1.click(function () {
			$(this).addClass('tg10-thumbactive');
			$(this).siblings().removeClass('tg10-thumbactive');
			$desktopMainimages.addClass('tg10-background1');
			$desktopMainimages.removeClass('tg10-background2');
			$desktopMainimages.removeClass('tg10-background3');
			$desktopMainimages.removeClass('tg10-background4');
		});

		thumb2.click(function () {
			$(this).addClass('tg10-thumbactive');
			$(this).siblings().removeClass('tg10-thumbactive');
			$desktopMainimages.addClass('tg10-background2');
			$desktopMainimages.removeClass('tg10-background1');
			$desktopMainimages.removeClass('tg10-background3');
			$desktopMainimages.removeClass('tg10-background4');
		});

		thumb3.click(function () {
			$(this).addClass('tg10-thumbactive');
			$(this).siblings().removeClass('tg10-thumbactive');
			$desktopMainimages.addClass('tg10-background3');
			$desktopMainimages.removeClass('tg10-background1');
			$desktopMainimages.removeClass('tg10-background2');
			$desktopMainimages.removeClass('tg10-background4');
		});

		thumb4.click(function () {
			$(this).addClass('tg10-thumbactive');
			$(this).siblings().removeClass('tg10-thumbactive');
			$desktopMainimages.addClass('tg10-background4');
			$desktopMainimages.removeClass('tg10-background1');
			$desktopMainimages.removeClass('tg10-background2');
			$desktopMainimages.removeClass('tg10-background3');
		});

		/*-------------------------------
		fixed brochure box on scroll
		---------------------------------*/

		var brochureBox = $('.tg10-formColumn:last');
		var searchHeight = $(brochureBox).outerHeight();
		var offset = $(brochureBox).offset().top - 100;
		var totalHeight = searchHeight + offset;

		$(window).scroll(function () {
			if ($(document).scrollTop() >= totalHeight) {
				brochureBox.addClass("fixed");
			} else {
				brochureBox.removeClass("fixed");
			}
		});


		/*------------------------------
		  Footer 
		---------------------------------*/

		var footer = $('<div class="tg10-footerbox"/>');

		if ($(window).width() >= 740) {
			footer.appendTo('.tg10-imagessideWrap');
		} else {
			footer.appendTo(mainContent);
		}

		footer.html('<h3>' + imageBarheading + '</h3>' + imageBarsmallText + '</span>');

		/*------------------------------
		  Italian small print
		---------------------------------*/
		if (pageCountry === 'italian') {
			var smallPrintIT = $('<p class="tg10-italianText col-sm-12">*Annuncio pubblicitario con finalità promozionale. Esempio rappresentativo di finanziamento: Prezzo €3.250, anticipo €300; importo totale del credito €2.950, da restituire in 36 rate mensili ognuna di €84,41 importo totale dovuto dal consumatore €3.110,36. TAN 0,01% (tasso fisso) – TAEG 3,45% (tasso fisso). Spese comprese nel costo totale del credito: interessi €0,26, istruttoria €88,50, incasso rata €1,5 cad. a mezzo SDD, produzione e invio lettera conferma contratto € 1; comunicazione periodica annuale €1 cad.; imposta sostitutiva: €7,60. Eventuali contratti relativi a uno o più servizi accessori (es. polizza assicurativa) sono facoltativi. Offerta valida dal 01/02/2017 al 31/12/2017. Condizioni contrattuali ed economiche nelle “Informazioni europee di base sul credito ai consumatori” presso i concessionari. Salvo approvazione di Santander Consumer Bank.</p>');
			smallPrintIT.insertAfter('.tg10-mainContentwrap');
		}

	}
})();