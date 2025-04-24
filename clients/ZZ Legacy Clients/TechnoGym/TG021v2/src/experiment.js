import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as translations from './lib/tg21translations.js';

// Event sender
const eventSender = utils.events.setDefaultCategory('TG021-V2');

var _TG021 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var $ = jQuery;
		var $body = $('body');
		$body.addClass('TG021v2');

	
	/*Copy based on pathname*/
	var pathName = window.location.pathname,
		description,
		rangePrice,
		productLine = $('.line-page-link a').text();


	const testContent = translations.textContent;

	var textProduct = testContent[pathName];

	
	if(textProduct){

		var $wrapper = $('<div class="TG21_wrap"/>');
			$wrapper.insertAfter('.product-collateral');
		
		var pricereassurance,
      callBack,
      rangeCopy;

		if(pathName.indexOf('/it/') > -1){
			pricereassurance ='Ogni prodotto è una esperienza unica. Prezzo su richiesta.';
      callBack = 'Un nostro Wellness Consultant risponderà entro un giorno lavorativo. Ti offriremo il miglior supporto per fornirti i consigli più utili e tutte le informazioni commerciali.';
      rangeCopy = 'Linea di prodotto';
		}else{
			pricereassurance = 'Each product is a unique piece. Price on request';
      callBack = 'A Wellness Consultant will follow up within 1 working day. Whether you just want a price or need more advice, we’ll guide you through';
      rangeCopy = 'Range';
		}
		
		//add product box to each product 
		var textBox = $(['<div class="TG21_textBlock">',
								'<h4>'+productLine+' '+rangeCopy+'</h4>',
								'<p class="TG21_description">'+textProduct+'</p>',
								'<p class="TG21_price">'+pricereassurance+'</p>',
							'</div>'].join(''));
			textBox.appendTo($wrapper);	
	 		
        // Request catalog
        var requestCatalogLink = $('.product-main-info .addition-info figcaption div a');
        var requestCatalogLinkHref = requestCatalogLink.attr('href');

		if(pathName.indexOf('/it/') > -1) {
            var socialButton = $('<div class="product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Richiedi catalogo</a></div>');
        } else {
            var socialButton = $('<div class="product-other-social"><a class="button tg21-request-cat btn-default" href="' + requestCatalogLinkHref + '">Request a catalogue</a></div>');
        }

		//Add product box html 
		var requestButton = $('.request-quote');

		//move buttons to new test wrapper
		if(pathName.indexOf('/it/') > -1) {
            var orText = $('<div class="TG21_or">o</div>');
        } else {
		    var orText = $('<div class="TG21_or">or</div>');
        }
		$wrapper.append(requestButton).append(socialButton);
		orText.insertAfter(requestButton);

		$wrapper.append('<p class="TG21_bottomText">'+callBack+'</p>');
        
        // Events
        $('.TG21_wrap .request-quote a').on('click', (e) => {
            eventSender.send(null, 'did-click-request-quote');
        });
        $('.tg21-request-cat').on('click', (e) => {
            eventSender.send(null, 'did-click-request-catalog');
        });
	}

	}

    /*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function (options) {
		utils.fullStory('TG021', 'Variation 2');

		UC.poller([
      '.product-collateral',
      () => {
        var cartBtn = document.querySelector('.add-to-cart');
        if (cartBtn) { 
          return false; 
        } else if (cartBtn === null) {
          return true;
        }
      },
		], _activate);

		
	};

	_triggers();

})();
