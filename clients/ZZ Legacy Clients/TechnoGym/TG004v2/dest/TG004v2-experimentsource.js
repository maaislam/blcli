/* no_doc_ready */
var _TG004 = (function() {
	var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:6000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

   // Triggers
   UC.poller([
	   'body',
	   '.category-products .item-product',
	   '.item-product-content',
	   '.item-product-content a',
	   function () {
		   if (window.jQuery) return true;
	   },
	   function () {
		   if (window.ga) return true;
	   }
   ], TG004, {
	   timeout: 7000,
	   multiplier: 0
   });

   // Variation
   function TG004() {
	 
	   var $ = window.jQuery;
	 
	  UC.poller([
	   function() {
		   var fs = window.FS;
		   if (fs && fs.setUserVars) return true;
		   }
	   ], function () {
		 FS.setUserVars({
			 experiment_str: 'TG004',
			 variation_str: 'Variation 2'
		 });
	   }, { multiplier: 1.2, timeout: 0 });

			 $('body').addClass('TG004v2');


	// ----------------------------------------------------------------------------------------------
    // Product descriptions
    // ----------------------------------------------------------------------------------------------		 

	  var englishDescriptions = {
		"https://www.technogym.com/gb/treadmill-myrun.html": { "product_name":"MYRUN", "bullet_point_1":"With Running Rate index to help you run better", "bullet_point_2":"Integrates a native app that syncs to your tablet"},
		"https://www.technogym.com/gb/skillmill-connect.html": { "product_name":"SKILLMILL CONNECT", "bullet_point_1":"Works to Improve Power, Speed, Stamina and Agility", "bullet_point_2":"Fully connected product with a large backlit LCD display"},
		"https://www.technogym.com/gb/skillrow.html": { "product_name":"SKILLROW", "bullet_point_1":"The first fully connected indoor rowing machine", "bullet_point_2":"Trains both cardio and power at athlete's level"},
		"https://www.technogym.com/gb/run-personal.html": { "product_name":"RUN PERSONAL", "bullet_point_1":"Cutting-edge technology, innovative materials and design", "bullet_point_2":"Features a Unity touchscreen display, HD-Ready (19"},
		"https://www.technogym.com/gb/recline-personal.html": { "product_name":"RECLINE PERSONAL", "bullet_point_1":"Excellent biomechanics from professional gym equipment ", "bullet_point_2":"Personalised entertainment with UNITY console"},
		"https://www.technogym.com/gb/cross-personal.html": { "product_name":"CROSS PERSONAL", "bullet_point_1":"Eye-catching design, cutting-edge technology, surround sound", "bullet_point_2":"With UNITY™ console for personalised entertainment"},
		"https://www.technogym.com/gb/spazio-forma.html": { "product_name":"SPAZIO FORMA", "bullet_point_1":"Foldable treadmill that's great for space-saving", "bullet_point_2":"CPR follows your heart rate for a safe and effective workout"},
		"https://www.technogym.com/gb/jog-excite-forma.html": { "product_name":"JOG FORMA", "bullet_point_1":"Professional treadmill with long life deck and sturdy frame", "bullet_point_2":"Powerful motor which enables superior performance"},
		"https://www.technogym.com/gb/synchro-excite-forma.html": { "product_name":"SYNCHRO FORMA", "bullet_point_1":"Professional Cross Trainer for enjoyable total body workouts", "bullet_point_2":"The fluid movement reduces stress to muscles and joints"},
		"https://www.technogym.com/gb/recline-excite-forma.html": { "product_name":"RECLINE FORMA", "bullet_point_1":"Ideal recumbent bike for moderate cardio activity", "bullet_point_2":"Perfect solution for active adults suffering from back pain "},
		"https://www.technogym.com/gb/bike-excite-forma.html": { "product_name":"BIKE FORMA", "bullet_point_1":"Can be used as a standard, city or racing bike", "bullet_point_2":"Tones legs and gluteal muscles in a fun and effective way"},
		"https://www.technogym.com/gb/climb-excite-led.html": { "product_name":"CLIMB EXCITE LED", "bullet_point_1":"Innovative stair climber with advanced LED display", "bullet_point_2":"Easy for first-timers and challenging for advanced users"},
		"https://www.technogym.com/gb/climb-excite-tv.html": { "product_name":"CLIMB EXCITE TV", "bullet_point_1":"With your favorite TV channels, music and FM radio stations ", "bullet_point_2":"Easy for first-timers and challenging for advanced users"},
		"https://www.technogym.com/gb/climb-excite-unity.html": { "product_name":"CLIMB EXCITE UNITY", "bullet_point_1":"Stair climber with immersive content with UNITY™ 3.0 console", "bullet_point_2":"Easy for first-timers and challenging for advanced users"},
		"https://www.technogym.com/gb/treadmill-excite-1000.html": { "product_name":"RUN 1000 EXCITE", "bullet_point_1":"Featuring RACES to compete in the arena or in a marathon ", "bullet_point_2":"Running surface adaps automatically to your running style"},
		"https://www.technogym.com/gb/treadmill-excite-600.html": { "product_name":"RUN 600 EXCITE", "bullet_point_1":"With MYRUNNING LOGBOOK to relive outdoor runs indoors", "bullet_point_2":"Reduced deck height to allow accessibility for all users"},
		"https://www.technogym.com/gb/step-excite-1000.html": { "product_name":"STEP EXCITE", "bullet_point_1":"Transmission system ensuring smooth and effective movement", "bullet_point_2":"The support handles allow correct posture while training"},
		"https://www.technogym.com/gb/bike-excite-1000.html": { "product_name":"BIKE EXCITE", "bullet_point_1":"The handlebar ensures 3 different training positions", "bullet_point_2":"Ergonomic design offers a realistic road cycling feeling"},
		"https://www.technogym.com/gb/recline-excite-1000.html": { "product_name":"RECLINE EXCITE", "bullet_point_1":"Adjustable seat and exclusive padding material for comfort", "bullet_point_2":"Wide walk through and step-over height ensure accessibility"},
		"https://www.technogym.com/gb/synchro-excite-1000.html": { "product_name":"SYNCHRO EXCITE", "bullet_point_1":"Smooth Motion belt for focused and stress-free training", "bullet_point_2":"Multiple hand sensors to monitor heart rate while training"},
		"https://www.technogym.com/gb/vario-excite-1000.html": { "product_name":"VARIO EXCITE", "bullet_point_1":"Adaptive stride to suit your size and movement naturally", "bullet_point_2":"Great variety of movement: stepping, walking, running"},
		"https://www.technogym.com/gb/top-excite-1000.html": { "product_name":"TOP EXCITE", "bullet_point_1":"Multiple training options thanks to its adjustable features", "bullet_point_2":"With forward-backward resistance for an upper-body workout"},
		"https://www.technogym.com/gb/group-cycle-connect.html": { "product_name":"GROUP CYCLE CONNECT", "bullet_point_1":"An indoor cycling bike that tracks and saves workout data", "bullet_point_2":"A total immersive riding experience & unique design"},
		"https://www.technogym.com/gb/mycycling.html": { "product_name":"MYCYCLING", "bullet_point_1":"Train like a pro with programmes created by expert coaches", "bullet_point_2":"Features continous feedback on your pedalling technique"},
		"https://www.technogym.com/gb/group-cycle-ride.html": { "product_name":"GROUP CYCLE RIDE", "bullet_point_1":"Indoor cycling bike that ensures proper posture", "bullet_point_2":"unique exercises for maximum calorie burn and muscle tone"},
		"https://www.technogym.com/gb/climb-artis.html": { "product_name":"CLIMB ARTIS", "bullet_point_1":"Stair climber with full connectivity and dual touch display", "bullet_point_2":"Enjoy high intensity routines and immersive content"},
		"https://www.technogym.com/gb/treadmill-artis-run-standard.html": { "product_name":"RUN ARTIS", "bullet_point_1":"State-of-the-art treadmill with defined ergonomic standards", "bullet_point_2":"Fast Track control levers to adjust speed & incline easily"},
		"https://www.technogym.com/gb/artis-vario-standard.html": { "product_name":"VARIO ARTIS", "bullet_point_1":"Optimal Start avoids potential pedal blocking", "bullet_point_2":"Automatically adjusting to user preferences and posture"},
		"https://www.technogym.com/gb/artis-bike-standard.html": { "product_name":"BIKE ARTIS", "bullet_point_1":"Enabling a true outdoor cycling experience", "bullet_point_2":"HIIT workouts & entertainment options to burn more calories"},
		"https://www.technogym.com/gb/artis-recline-standard.html": { "product_name":"RECLINE ARTIS", "bullet_point_1":"Ideal for moderate cardio activity with maximum comfort", "bullet_point_2":"Featuring a 50 cm walk-through, the widest in the industry"},
		"https://www.technogym.com/gb/artis-synchro-standard.html": { "product_name":"SYNCHRO ARTIS", "bullet_point_1":"Soft return system for smooth training and workout pleasure ", "bullet_point_2":"Automatic pedal reset feature enabling convenient access"},
		"https://www.technogym.com/gb/excite-top-med.html": { "product_name":"TOP EXCITE MED", "bullet_point_1":"Removable seat and ramp enable easy access to wheelchair ", "bullet_point_2":"Can be used with two different seat options or without seat"},
		"https://www.technogym.com/gb/excite-treadmill-run-600-med.html": { "product_name":"RUN 600 EXCITE MED", "bullet_point_1":"Sturdy materials and robust design for intensive use ", "bullet_point_2":"Thanks to its special features it is safer than ever"},
		"https://www.technogym.com/gb/excite-treadmill-run-1000-med.html": { "product_name":"RUN 1000 EXCITE MED", "bullet_point_1":"Speed and incline adjusts on the fly for safer training", "bullet_point_2":"Safer than ever with the Runner Detection System"},
		"https://www.technogym.com/gb/excite-vario-med.html": { "product_name":"VARIO EXCITE MED", "bullet_point_1":"Fast Track control to change the settings while training", "bullet_point_2":"Adaptive stride length ensures a variety of exercises "},
		"https://www.technogym.com/gb/excite-synchro-med.html": { "product_name":"SYNCHRO EXCITE MED", "bullet_point_1":"No impact movement naturally prevents stress to the joints ", "bullet_point_2":"Change the settings while training with Fast track Control"},
		"https://www.technogym.com/gb/excite-recline-med.html": { "product_name":"RECLINE EXCITE MED", "bullet_point_1":"Special foot straps to ensure greater grip and stability", "bullet_point_2":"Low entry access for users of varying abilities"},
		"https://www.technogym.com/gb/excite-bike-med.html": { "product_name":"BIKE EXCITE MED", "bullet_point_1":"Tactile numbers and raised icons for visually impaired users", "bullet_point_2":"Innovative seat for the most ergonomic position "}
	  }
	 

	   var italianDescriptions = {
		"https://www.technogym.com/it/treadmill-myrun.html": { "product_name":"MYRUN", "bullet_point_1":"Con Running Rate per migliorare la tua corsa", "bullet_point_2":"Integra una app nativa e si sincronizza con il tuo tablet"},
		"https://www.technogym.com/it/skillmill-connect-technogym.html": { "product_name":"SKILLMILL CONNECT", "bullet_point_1":"Permette di migliorare Potenza,Velocità,Resistenza e Agilità", "bullet_point_2":"Connesso con un ampio display LCD retroilluminato"},
		"https://www.technogym.com/it/skillrow.html": { "product_name":"SKILLROW", "bullet_point_1":"Il primo vogatore indoor totalmente connesso", "bullet_point_2":"Consente di eseguire sia allenamenti cardio che di potenza"},
		"https://www.technogym.com/it/run-personal.html": { "product_name":"RUN PERSONAL", "bullet_point_1":"Unisce design, tecnologia e materiali innovativi ", "bullet_point_2":"Con ampio display touchscreen Unity, HD-Ready e 19"},
		"https://www.technogym.com/it/recline-personal.html": { "product_name":"RECLINE PERSONAL", "bullet_point_1":"Eccellente biomeccanica degli attrezzi professionali", "bullet_point_2":"Intrattenimento personalizzato con la console UNITY™"},
		"https://www.technogym.com/it/cross-personal.html": { "product_name":"CROSS PERSONAL", "bullet_point_1":"Attraente design, tecnologia all'avanguardia, casse hi-fi", "bullet_point_2":"Console UNITY™, esperienza di intrattenimento personalizzato"},
		"https://www.technogym.com/it/spazio-forma.html": { "product_name":"SPAZIO FORMA", "bullet_point_1":"Richiudibile in meno di un metro quadro quando non in uso", "bullet_point_2":"Segue il ritmo cardiaco per un allenamento efficace e sicuro"},
		"https://www.technogym.com/it/jog-excite-forma.html": { "product_name":"JOG FORMA", "bullet_point_1":"Tapis roulant professionale per allenarsi in modo semplice ed efficace", "bullet_point_2":"Motore potente, garantisce prestazioni di livello superiore"},
		"https://www.technogym.com/it/synchro-excite-forma.html": { "product_name":"SYNCHRO FORMA", "bullet_point_1":"Cross Trainer perfetto per l'allenamento total body ", "bullet_point_2":"Movimento fluido che riduce lo stress articolare e muscolare"},
		"https://www.technogym.com/it/recline-excite-forma.html": { "product_name":"RECLINE FORMA", "bullet_point_1":"Bike orizzontale indicata per un'attività cardio moderata", "bullet_point_2":"Ideale per chi ha problemi alla schiena o limitata mobilità"},
		"https://www.technogym.com/it/bike-excite-forma.html": { "product_name":"BIKE FORMA", "bullet_point_1":"Bike silenziosa e stabile, simile alla pedalata su strada", "bullet_point_2":"Tonifica i muscoli di gambe e glutei in modo divertente"},
		"https://www.technogym.com/it/climb-excite-led.html": { "product_name":"CLIMB EXCITE LED", "bullet_point_1":"Stair climbing con display LED avanzato", "bullet_point_2":"Semplice per i principianti e adatto agli utenti più esperti"},
		"https://www.technogym.com/it/climb-excite-tv.html": { "product_name":"CLIMB EXCITE TV", "bullet_point_1":"Con i tuoi canali TV, musica e stazioni radio FM preferiti", "bullet_point_2":"Semplice per i principianti e adatto agli utenti più esperti"},
		"https://www.technogym.com/it/climb-excite-unity.html": { "product_name":"CLIMB EXCITE UNITY", "bullet_point_1":"Stair climbing con i contenuti della nuova console UNITY™ 3.0", "bullet_point_2":"Semplice per i principianti e adatto agli utenti più esperti"},
		"https://www.technogym.com/it/treadmill-excite-1000.html": { "product_name":"RUN 1000 EXCITE", "bullet_point_1":"GARE per cimentarti nell'arena o in famose maratone ", "bullet_point_2":"La superficie si adatta in automatico al tuo stile di corsa"},
		"https://www.technogym.com/it/treadmill-excite-600.html": { "product_name":"RUN 600 EXCITE", "bullet_point_1":"Con MYRUNNING LOitOOK rivivi  i tuoi percorsi all'aperto", "bullet_point_2":"L'altezza ribassata della pedana è accessibile a tutti "},
		"https://www.technogym.com/it/step-excite-1000.html": { "product_name":"STEP EXCITE", "bullet_point_1":"Il sistema di trasmissione garantisce un movimento fluido", "bullet_point_2":"Maniglie di supporto per una postura sempre corretta"},
		"https://www.technogym.com/it/bike-excite-1000.html": { "product_name":"BIKE EXCITE", "bullet_point_1":"Il maniglione consente 3 differenti posizioni di allenamento", "bullet_point_2":"Sperimenta la sensazione della vera pedalata su strada"},
		"https://www.technogym.com/it/recline-excite-1000.html": { "product_name":"RECLINE EXCITE", "bullet_point_1":"Seduta e schienale offrono sostegno e comodità ottimali", "bullet_point_2":"Accessibile a tutti con l'ampia apertura e lo scavalco basso"},
		"https://www.technogym.com/it/synchro-excite-1000.html": { "product_name":"SYNCHRO EXCITE", "bullet_point_1":"Il movimento silenzioso e fluido per un allenamento ottimale", "bullet_point_2":"Sensori multipli  per monitorare la frequenza cardiaca"},
		"https://www.technogym.com/it/vario-excite-1000.html": { "product_name":"VARIO EXCITE", "bullet_point_1":"La falcata si adatta alla tua statura e ai tuoi movimenti", "bullet_point_2":"Ampia varietà di movimento: step verticale, camminata, corsa"},
		"https://www.technogym.com/it/top-excite-1000.html": { "product_name":"TOP EXCITE", "bullet_point_1":"Allenamento diversificato grazie alle varie regolazioni", "bullet_point_2":"Resistenza avanti/indietro per un allenamento completo"},
		"https://www.technogym.com/it/group-cycle-connect.html": { "product_name":"GROUP CYCLE CONNECT", "bullet_point_1":"La bike da indoor cycling che traccia i dati di allenamento", "bullet_point_2":"Misurazione accurata della potenza precisa al +/-2%"},
		"https://www.technogym.com/it/mycycling.html": { "product_name":"MYCYCLING", "bullet_point_1":"Allenati come un pro grazie ai programmi creati da esperti", "bullet_point_2":"Feedback continui sulla rotonda simmetria della pedalata"},
		"https://www.technogym.com/it/group-cycle-ride.html": { "product_name":"GROUP CYCLE RIDE", "bullet_point_1":"Regolazioni che permettono di trovare la giusta posizione", "bullet_point_2":"La resistenza del volano consente una ride fluida e omogenea"},
		"https://www.technogym.com/it/climb-artis.html": { "product_name":"CLIMB ARTIS", "bullet_point_1":"Il Courtesy step facilita  la salita e discesa dall'attrezzo", "bullet_point_2":"Esercizi  che massimizzano la quantità di calorie bruciate"},
		"https://www.technogym.com/it/treadmill-artis-run-standard.html": { "product_name":"RUN ARTIS", "bullet_point_1":"Posizione ergonomica del display per un utilizzo ottimale", "bullet_point_2":"Con Speed shift crei allenamenti di tipo Interval training"},
		"https://www.technogym.com/it/artis-vario-standard.html": { "product_name":"VARIO ARTIS", "bullet_point_1":"Optimal Start agevola l'esecuzione del primo passo", "bullet_point_2":"Si adatta automaticamente alle preferenze dell'utente"},
		"https://www.technogym.com/it/artis-bike-standard.html": { "product_name":"BIKE ARTIS", "bullet_point_1":"Per una vera e propria esperienza di pedalata all'aperto", "bullet_point_2":"Opzioni di intrattenimento ed esercizi Interval Training"},
		"https://www.technogym.com/it/artis-recline-standard.html": { "product_name":"RECLINE ARTIS", "bullet_point_1":"Ideale per attività cardio moderate con il massimo comfort", "bullet_point_2":"Lo spazio di scavalco è il più ampio della sua categoria"},
		"https://www.technogym.com/it/artis-synchro-standard.html": { "product_name":"SYNCHRO ARTIS", "bullet_point_1":"Soft return system rende l'allenamento fluido e  piacevole", "bullet_point_2":"Accesso comodo e sicuro con i pedali nella giusta posizione "},
		"https://www.technogym.com/it/excite-top-med.html": { "product_name":"TOP EXCITE MED", "bullet_point_1":"Sedile removibile e  rampa per l'accesso con sedia a rotelle", "bullet_point_2":"Utilizzabile con due diverse opzioni di seduta o senza"},
		"https://www.technogym.com/it/excite-treadmill-run-600-med.html": { "product_name":"RUN 600 EXCITE MED", "bullet_point_1":"Struttura e materiali resistenti per un uso intensivo ", "bullet_point_2":"Grazie alle sue caratteristiche è più sicuro che mai"},
		"https://www.technogym.com/it/excite-treadmill-run-1000-med.html": { "product_name":"RUN 1000 EXCITE MED", "bullet_point_1":"Inclinazione e velocità regolabili in modo sicuro ", "bullet_point_2":"Sicuro più che mai grazie al Runner Detection System"},
		"https://www.technogym.com/it/excite-vario-med.html": { "product_name":"VARIO EXCITE MED", "bullet_point_1":"Con Fast Track Control setti le impostazioni facilmente", "bullet_point_2":"La lunghezza adattiva della falcata consente vari esercizi "},
		"https://www.technogym.com/it/excite-synchro-med.html": { "product_name":"SYNCHRO EXCITE MED", "bullet_point_1":"Movimento ellittico  senza impatto sulle articolazioni", "bullet_point_2":"Con Fast Track Control cambi le impostazioni senza fermarti"},
		"https://www.technogym.com/it/excite-recline-med.html": { "product_name":"RECLINE EXCITE MED", "bullet_point_1":"Speciali fibbie regolabili per una maggiore  stabilità", "bullet_point_2":"Pedana ribassata per l'accesso facilitato"},
		"https://www.technogym.com/it/excite-bike-med.html": { "product_name":"BIKE EXCITE MED", "bullet_point_1":"Numeri tattili e icone in rilievo per utenti ipovedenti", "bullet_point_2":"Sella che consente  la posizione d'esercizio più adatta"}
	  }

	  var products = $('.category-products .item-product');

	  $(products).each(function () {

	  	// ----------------------------------------------------------------------------------------------
	  	// if product URL matches against URL in object get the bullet points for that product and add to listing
	  	// ----------------------------------------------------------------------------------------------
	  	var url = $(this).find('.item-product-content a').attr('href');
	  	var info;
	  	if (window.location.href.indexOf("/gb/") > -1) {
	  		info = englishDescriptions[url];
	  	} else if (window.location.href.indexOf("/it/") > -1) {
	  		info = italianDescriptions[url];
	  	}

	  	if (info) {
	  		var productDes = $([
	  			'<div class="tg4-productInfo">',
	  			'<li><img src="//cdn.optimizely.com/img/8355110909/1324e1e01e7b45e7acca52ec1f19976a.png"/><p>' + info.bullet_point_1 + '</p></li>',
	  			'<li><img src="//cdn.optimizely.com/img/8355110909/1324e1e01e7b45e7acca52ec1f19976a.png"/><p>' + info.bullet_point_2 + '</p></li>',
	  			'</div>'
	  		].join(''));
	  		$(this).find('.item-product-content').append(productDes);

	  	}

	  	// -----------------------------------------------
	  	// Add learn more link
	  	// -----------------------------------------------
	  	$(this).find('.item-product-content').append('<a class="tg4-moreLink" href="' + productUrl + '">Learn More</a>');
	  });

	 }
})();