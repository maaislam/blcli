var _TG001 = (function () {
    // PLUGINS & HELPER FUNCTIONS
    // UC Library - Poller -- @version 0.2.2
    var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
	// Wait for GA Tracker Name
	var trackerName;
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
    // Cookie Setter Helper Function.
    function setCookie(c_name,value,exdays,c_domain) {
        c_domain = (typeof c_domain === "undefined") ? "" : "domain=" + c_domain + ";";
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value + ";" + c_domain + "path=/";
    }
    // Cookie Getter Helper Function.
    function getCookie(name) {
        var match = document.cookie.match(name+'=([^;]*)');
        return match ? match[1] : undefined;
    }

  	UC.poller([
    	function() {
          return window.jQuery;
      },
      function() {
      		return window.jQuery.fn.modal;
      }
    ], activate);
  
  
  	function activate() {
      // EXPERIMENT
      var $ = window.jQuery;
      $('body').addClass('TG001');
      var $modal = $([
          '<div class="TG001_modal modal fade" tabindex="-1" role="dialog">',
              '<div class="modal-dialog" role="document">',
                  '<div class="modal-content">',
                      '<div class="modal-body">',
                          '<div>',
                              '<div class="TG001_img"></div>',
                              '<div class="TG001_content">',
                                  '<div class="modal-header">',
                                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                                      '<h4 class="modal-title">WELCOME TO TECHNOGYM</h4>',
                                      '<hr id="modal-title-underline">',
                                  '</div>',
                                  '<h5>ARE YOU?</h5>',
                                  '<div class="TG001_option" id="TG001_option--personal" data-userType="personal">',
								      '<div class="TG001_option__icon-wrap">',
									      '<div class="TG001_option__icon"></div>',
									  '</div>',
                                      '<div class="TG001_option__text">Looking to buy fitness / wellness equipment for the home</div>',
                                  '</div>',
                                  '<div class="TG001_option" id="TG001_option--business" data-userType="business">',
									  '<div class="TG001_option__icon-wrap">',
								          '<div class="TG001_option__icon"></div>',
									  '</div>',
                                      '<div class="TG001_option__text">Looking to buy fitness / wellness equipment for a business</div>',
                                  '</div>',
								  '<div class="TG001_continue-btn-wrap">',
								      '<div class="TG001_btn" id="TG001_continue-btn">CONTINUE</div>',
								  '</div>',	
                              '</div>',
                          '</div>',
                      '</div>',
                  '</div>',
              '</div>',
          '</div>'
      ].join(''));
      var $options = $modal.find('.TG001_option');
      $options.on('click', function() {
		  var $el = $(this);

		  // If error msg exists, hide it
		  var $error = $modal.find('.TG001_error');
		  if ($error.length) {
		      $error.hide();
		  }

          // If option is already selected, do nothing
          if ($el.hasClass('TG001_option--selected')) {
              return false;
          } else {
              // else unselect any active options and select this one
              $options.filter('.TG001_option--selected').removeClass('TG001_option--selected');
              $el.addClass('TG001_option--selected');
          }
      });
      var $continue = $modal.find('#TG001_continue-btn');
      var errorMsgShown = false;
      $continue.on('click', function() {
          /* Make sure an option has been selected. If not, tell
             the user to select one */
          if (!$options.filter('.TG001_option--selected').length) {
              // tell user to select an option
              if (!errorMsgShown) {
                  $(this).before('<div class="TG001_error">Please select an option before continuing.</div>');
                  errorMsgShown = true;
              } else {
				  $modal.find('.TG001_error').show();
			  }
          } else {
              // Get user type
              var userType = $options.filter('.TG001_option--selected').attr('data-userType'); // Personal or Business

              // send event to ga
              sendEvent('TG001', 'submit', 'User type is ' + userType, true);

              // close modal
              $modal.modal('hide');
              // save cookie
              setCookie('TG001', userType);
          }
	  });
		
	  // If user closes modal, send event to GA and set cookie so they don't see it again
	  $modal.on('hidden.bs.modal', function() {
		  sendEvent('TG001', 'close', 'User closed modal', true);
		  setCookie('TG001-close', true);
	  });


	  $modal.prependTo('body');
	  
	  $(function() {
		  // If new user, wait for newsletter popup to show then hide it
		  var isNewUser = !getCookie('visited');

		  if (isNewUser) {
			UC.poller([
				function() {
					var modal = document.getElementById('newsletter-welcome-modal');
					if (modal && modal.style.display === 'block') {
						return true;
					}
				}
			], function() {
				// Newsletter modal is visible, force hide it
				$('#newsletter-welcome-modal').modal('hide');
				var $modalBgs = $('.modal-backdrop.fade.in');
				if ($modalBgs.length > 1) {
					$modalBgs.not($modalBgs.first()).remove();
				}
			}, {
				multiplier: 1,
				timeout: 20000
			});
		  }
		  
		  $modal.modal('show');
	  });

    }
})();