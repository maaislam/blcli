
var UC022 = (function($) {
  var UC = {

    now: Date.now || function(){
        return new Date().getTime();
    },

    poller: function (elements, cb, options) {
        var defaults = {
            wait: 50,
            multiplier: 1.1,
            timeout: null
        };

        if (!options) options = defaults;

        var timeout = options.timeout ? new Date(UC.now() + options.timeout) : defaults.timeout;
        var wait = options.wait ? options.wait : defaults.wait;
        var multiplier = options.multiplier ? options.multiplier === 'disable' ? 0 : options.multiplier : defaults.multiplier;
        var successful = [];
        var time;
        var pollForElement = function (selector, time) {
            if (timeout && UC.now() > timeout) { return false; }
            time = time || wait;
            var condition = typeof selector === 'function' ? selector() : window.jQuery(selector).length > 0;

            if (condition) {
                successful.push(true);
                if (successful.length === elements.length) cb();
            } else {
                setTimeout(function () {
                    pollForElement(selector, time * multiplier);
                }, time);
            }
        };

        for (var i = 0; i < elements.length; i++) {
            pollForElement(elements[i]);
        }
    }
  };

  UC.poller(['.aggiungi .add_carrello.btn-cart-custom', function() {
            if (window.jQuery) return true;
        }
    ], run, {
        timeout: 6000,
        multiplier: 'disable'
    });

    function run() { 

        var $ = window.jQuery;

    $('body').addClass('UC022 V4');
  
  /*Top Text*/
  
  	var additionalOptions = $('.opzioni_aggiuntive'),
        fileCheckwrap = $('.servizi_aggiuntivi:first'),
        checkBox = $('.info_box'),
        price = $('.panel-heading .prezzo.text-right'),
        selectButton = $('<div class="uc22_button"><div class="btn uc22-add">Add for just <span class="uc22-pricetext"></span></div></div>');
 

  
     
        
  var $lightboxHTML = $([
        '<div id="uc022_lightbox-overlay"></div>',
            '<div class="uc022_lightbox">',
                '<div id="uc022_lightbox-exit">X</div>',
                    '<div class="uc022_lightbox__dialog">',
                        '<h3>Wait, are you sure dont want us to check over your file?</h3>',
                            '<div class="col-sm-12 uc22-listheading">',
                               '<p>One of our graphic designers will review your artwork to make sure the file is perfect and take the worries out of printing</p>',
                             '</div>',	
                            '<div class="col-sm-12 uc022_bottomoflightbox">',
                                '<div class="uc022_lightboxbutton"></div>',
        						'<p>Thats less than 5% of your overall order total!</p>',
                            '</div>',
        					'<div class="col-sm-12 uc022_bottomoflightbox buttons">',
                                '<div class="col-sm-6 uc022_continuebutton">Continue Shopping</div>',
        						'<div class="col-sm-6 uc022_basketbutton"></div>',
        					'</div>',
                    '</div>',
              '</div>'
        ].join(''));
  
 
     
      
  	var $lightbox = $lightboxHTML.filter('#uc022_lightbox-overlay, .uc022_lightbox');
  
    $lightboxHTML.find("#uc022_lightbox-exit").add($lightbox.filter('#uc022_lightbox-overlay')).click(function () {
        $lightbox.fadeOut(200);
    });

    $lightboxHTML.find("#uc022_lightbox-exit").click(function () {
        $lightbox.fadeOut(200);

    });
  
    $lightboxHTML.find('.uc022_continuebutton').click(function () {
        $lightbox.fadeOut(200);

    });

    $lightboxHTML.prependTo('body');
  
    $('.uc022_lightBoxtrigger').click(function(){
          $lightbox.fadeIn(100);
    });
  
    var checkoutButton = $('.inner_price_grid .aggiungi');
  
  	
  
  /*show box is checked to user*/

   
  
    $lightboxHTML.find('.uc22-checked:first').remove();
  	selectButton.appendTo('.uc022_lightboxbutton');
  	price.clone().appendTo('.uc22-pricetext').removeClass('col-xs-3 col-sm-5 text-right');
  
  var ticked = $('<img class="uc22-checked" src="#$(ContentManager:checkedwhite.png)!"/>').appendTo('.uc22-pricetext').hide();
  
      
        selectButton.click(function(){
          $('#check_prestampa').click();
        });
  
         $('#check_prestampa').change(function() {
		  if($(this).is(":checked")) {
              ticked.show();
              return;
           }
             ticked.hide();
         });

  
  /*NEW BASKET BUTTON*/
  
  var realBasketbutton = $('.aggiungi .add_carrello.btn-cart-custom');
  
  
  if(realBasketbutton){
  	  var basketButton = $('<div class="uc_22addtobasket btn btn-cart-custom">Add to basket</div>');
  
  	  realBasketbutton.hide();
  	  realBasketbutton.parent().prepend(basketButton);
      basketButton.clone().appendTo('.col-sm-6.uc022_basketbutton');
    
    
    
    
    $('.uc_22addtobasket').click(function(){
      realBasketbutton.click();
    });
    
    
    $('#check_prestampa').change(function() {
		  if($(this).is(":checked")) {
              basketButton.click(function(){
       			$lightbox.fadeIn(200);
    		});
           }
        });
    
   	}
  
  
  
  
   }

  
 })(window.jQuery);
  
