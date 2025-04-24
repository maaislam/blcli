// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import overlayHtml from './html/overlay.js';
import overlayHtmlV2 from './html/overlayV2.js';
import arrays from './html/agencyNames.js';


window._AC006 = (function () {
  let $ = null;
  let variation = '2';

  const showLoader = () => {
    let overlay;

    // Load overlay based on variation
    if (variation == '2') {
      overlay = $(overlayHtmlV2);
    } else if (variation == '3') {
      overlay = $(overlayHtml);
    } else {
      overlay = $(overlayHtml);
    }

    $('body').prepend(overlay);
  }

  // Function to shuffle arrays
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const _activate = () => {
    // Namespace CSS
    document.body.classList.add('ac6', 'AC020');

    if (variation == '1') {
      document.body.classList.add('AC021_agency-names-ver');
    }

    // Add fake search button
    $('.search-bar-button-inline').before(`
			<a class="AC020_fake-search">
				Search Agencies
			</a>
		`);

    let target = $('.AC020_fake-search');

    if ($('.multiple-location-link').length > 0) {
      target = $('.AC020_fake-search, .multiple-location-link');
      $('.multiple-location-link').off('click');
    }

    // When the fake search button is clicked run animation
    target.on('click', function () {
      localStorage.setItem('AC020', 'Seen');
      if ($(this).hasClass('multiple-location-link')) {
        var $searchBar = $('#search-bar-form');
        $searchBar.find('[name=location_id]').val($(this).data('locationid'));
        $searchBar.find('[name=location]').val('');
      }
      let validationCheck = true;
      // Check for error classes on the only validated sections
      if ($('#input-user-type-selector').hasClass('input-error')) {
        validationCheck = false;
      }
      if ($('#input-industry-selector').hasClass('input-error')) {
        validationCheck = false;
      }

      // If it passed validation
      //if (validationCheck === true && $('#input-location-id-value').val()) {
      if (validationCheck === true) {
        if (variation == '2') {
          showLoader();
          setTimeout(function () {
            $('.ac6-overlay').addClass('AC020_animate');
            // Fade in First message after 1 second
            setTimeout(function () {
              $('.AC020_loader-section2').fadeIn(function () {
                setTimeout(function () {
                  // Wait 3 seconds, then fade out previous message and fade in message 2
                  $('.AC020_loader-section2').fadeOut();
                  $('.AC020_loader-section3').fadeIn(function () {
                    // Wait 3 seconds after next message then load in the second part of it
                    setTimeout(function () {
                      $('.AC020_loader-section3 p + p').fadeIn(function () {
                        // Display last message
                        setTimeout(function () {
                          utils.events.send('AC020V1', 'Search Loader', 'User has seen full Search Loader', {
                            sendOnce: true
                          });
                          utils.setCookie('AC020_loader-seen', 'True', 200000000, 'www.agencycentral.co.uk');
                          $('.search-bar-input-container button.search-bar-button-inline').click();
                        }, 1200);
                      });
                    }, 1100);
                  });
                }, 1000);
              });
            }, 100);
          }, 10);
          // This setTimeout is to allow the css to render the before class and then animate it 
        } else if (variation == '3') {
          showLoader();
          setTimeout(function () {
            utils.events.send('AC020V1', 'Search Loader', 'User has seen full Search Loader', {
              sendOnce: true
            });
            utils.setCookie('AC020_loader-seen', 'True', 200000000, 'www.agencycentral.co.uk');
            $('.search-bar-input-container button.search-bar-button-inline').click();
          }, 1800);
        }
         else {
          showLoader();
          const agencyNames = $('.AC020_loader_agency_names');
          const agencyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          // Make array that has 10 since each industry has 10 agencies tied to it

          shuffle(arrays[$('#input-industry-value').val()]);
          shuffle(agencyArray);

          // This is the coolest line of javascript ever 
          arrays[$('#input-industry-value').val()].forEach(function (item, i) {
            agencyNames.append(`
                            <p>${item}</p><br />
                        `);
          });

          agencyNames.append('<p>...</p>');

          setTimeout(function () {
            $('.ac6-overlay').addClass('AC020_animate');
            $('.AC020_loader_agency_names').fadeIn(function () {
              // Loop through all the agency array
              // find a p based on the shuffled array earlier to make it random and strike it
              (function myLoop(i) {
                setTimeout(function () {
                  agencyNames.find('p')
                    .eq(agencyArray[i - 1])
                    .addClass('AC020_strikethrough');

                  if (--i) {
                    myLoop(i)
                  }
                  if (i == 1) {
                    // Wait till last animation is done then click search button
                    setTimeout(function () {
                      utils.events.send('AC020V2', 'Search Loader', 'User has seen full Search Loader', {
                        sendOnce: true
                      });
                      utils.setCookie('AC020_loader-seen', 'True', 200000000, 'www.agencycentral.co.uk');
                      $('.search-bar-input-container button.search-bar-button-inline').click();
                    }, 700);
                  }
                }, 410)
              })(agencyArray.length);
            });
          }, 10);
        }
      } else {
        utils.events.send('AC020', 'Form Field', 'User tried to submit without using form', {
          sendOnce: true
        });
      }
    });
  };

  /**
   * Trigger test
   */
  const _triggers = (options) => {
    const storageCheck = localStorage.getItem('AC020');
    
      UC.poller([
        '#search-bar-form .search-bar-button-inline',
        () => {
          return !!window.jQuery;
        }
      ], () => {
        $ = window.jQuery;
        if (variation == '1') {
          utils.fullStory('AC020', 'Variation 1');
        } else {
          utils.fullStory('AC020', 'Variation 2');
        }
        if(storageCheck === 'Seen') {
          variation = 3;
        } 
        _activate();
      });
  };

  function GAEvents() {
    UC.poller([
      '.agency-result',
      '.contact-option-container',
      () => {
        return !!window.jQuery;
      }
    ], () => {
      $ = window.jQuery;
      if (utils.getCookie('AC020_loader-seen')) {
        utils.deleteCookie('AC020_loader-seen');
        if (variation == '1') {
          $('.contact-option-container').on('click', function (e) {
            let el = $(this);

            if (el.attr('data-action') == 'email') {
              utils.events.send('AC020V1', 'Agency Click', 'User has clicked email button', {
                sendOnce: true
              });
            } else if (el.attr('data-action') == 'telfax') {
              utils.events.send('AC020V1', 'Agency Click', 'User has clicked phone number button', {
                sendOnce: true
              });
            } else if (el.attr('data-action') == 'website') {
              utils.events.send('AC020V1', 'Agency Click', 'User has clicked website button', {
                sendOnce: true
              });
            }
          });
        } else {
          $('.contact-option-container').on('click', function (e) {
            let el = $(this);

            if (el.attr('data-action') == 'email') {
              utils.events.send('AC020V2', 'Agency Click', 'User has clicked email button', {
                sendOnce: true
              });
            } else if (el.attr('data-action') == 'telfax') {
              utils.events.send('AC020V2', 'Agency Click', 'User has clicked phone number button', {
                sendOnce: true
              });
            } else if (el.attr('data-action') == 'website') {
              utils.events.send('AC020V2', 'Agency Click', 'User has clicked website button', {
                sendOnce: true
              });
            }
          });
        }
      }
    });
  }

  // Trigger experiment
  GAEvents();
  _triggers();
})();