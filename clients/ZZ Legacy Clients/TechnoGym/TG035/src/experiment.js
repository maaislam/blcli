/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import exitIntent from './lib/exit-intent';
import lang from './lib/translation';

// TG035 - Experiment Title
const TG035 = (() => {

	// Experiment code
	const activate = () => {
    document.body.classList.add('TG035');
    
    const getLang = () => {
      return window.location.pathname.substring(1).match(/^it|gb|fr|de|es/) + '';
    };

		// Clone newsletter form
		const cloneForm = () => {
			const form = document.querySelector('.footer-bottom .block-subscribe form#newsletter-validate-detail');
			if (form) {
				const formCp = form.cloneNode(true);
				
				// amend wording
				const input = formCp.querySelector('.block-content .input-box input');
				input.setAttribute('placeholder', 'Email Address');

				const submit = formCp.querySelector('.block-content .actions button span span');
        submit.textContent = 'Submit';
        
        const WhichLang = getLang(); 
 
        if (WhichLang == "it") {
          input.setAttribute('placeholder', 'Il tuo indirizzo e-mail');
          submit.textContent = 'Invia';
        } 

				return formCp; 
			}
		};
    const newForm = cloneForm();
    let newFormHtml = null;
    if (newForm) {
      newFormHtml = newForm.outerHTML;
    }


		// Build new popup
		const buildPopup = () => {

			// Pull in translations
			const copy = lang;
			
			// Check which language we're using
			const url = window.location.pathname;
			const checkUrlLang = url.match(/^.(\w{2})/);
			const whichLang = checkUrlLang[1];

			// Set country variable
			let country = "en";
			if (whichLang == "it") {
				country = "it";
			} else if (whichLang == null) {
				country = "en";  
			}

			
 
			const html = `
				<div class="tg35-popup">
					<div class="tg35-popup--overlay">
						<div class="tg35-popup--container">

							<div class="tg35-popup--close">
								<span></span>
								<span></span>
							</div>

							<div class="tg35-popup--image">
								<img src="https://www.technogym.com/skin/frontend/technogym/default/images/technogym.png" alt="Technogym">
							</div>

							<div class="tg35-popup--title">
								<h3>${copy.title[country]}</h3>
							</div>

							<div class="tg35-popup--cta">
								<p>${copy.cta[country]}</p>
							</div>

							<div class="tg35-popup--info">
								<p>${copy.info[country]}</p>
							</div>

							<div class="tg35-popup--form">
								${newFormHtml}
							</div>
							
						</div>
					</div>
				</div>
			`;

			const ref = document.body;
			ref.insertAdjacentHTML('beforeend', html);
		};
		buildPopup();

		// Run on exit
		const run = (() => {
			const tgPopup = document.querySelector('.tg35-popup');

			// When user tries to leave.
			const exit = exitIntent();
			exit.init(function() {
				if (tgPopup) {
					tgPopup.classList.add('tg35-show--popup');

					// Event on show popup
					utils.events.send('TG035', 'Popup seen', 'User has seen the popup on exit intent', {sendOnce: true});
				}
			}, 'tg35Popup'); 


			// Closing the popup
			// Close button on click
			const closeBtn = tgPopup.querySelector('.tg35-popup--close');
			closeBtn.addEventListener('click', function() {
				tgPopup.classList.remove('tg35-show--popup');
			});

			// Escape key on press
			document.onkeydown = function(e) {
				e = e || window.event;
				if (e.keyCode == 27) {
					tgPopup.classList.remove('tg35-show--popup');
				}
			}
			// On click of outside element
			const overlay = document.querySelector('.tg35-popup--overlay');
			overlay.addEventListener('click', function(e) {
				if (e.target == this) {
					tgPopup.classList.remove('tg35-show--popup');
				}
			});


			// Send event on click of submit
			const submit = tgPopup.querySelector('.tg35-popup--form .actions button');
			submit.addEventListener('click', function() {
        utils.events.send('TG035', 'Click', 'User submitted email for newsletter on popup', {sendOnce: true});
        
			});

    })();
    

    const formPopulate = (() => {
			const emailInput = document.querySelector('.tg35-popup .tg35-popup--form form input[type="email"]');
			const popupInput = document.querySelector('#newsletter-modal .input-box input#newsletter-email_subscribe');
				
				emailInput.addEventListener("keyup", function(e) {
					let inputVal = e.currentTarget;
					let input = inputVal.value; 
					
					setTimeout(function() {
						popupInput.value = input;
					}, 1800)
										
				});
			
		});
    formPopulate();
    
    // UC Observer 
		if (document.querySelector('.newsroom_post_wrapper')) {
			UC.observer.connect(document.querySelector('.newsroom_post_wrapper'), function() {
				formPopulate();
			}, {
				config: {
					attributes: false, 
					childList: true
				}
			});
    }
    

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('TG035', 'Variation 1');

		activate();
	});

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
    ".newsroom-page",
    "#newsletter-validate-detail",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});
	

})();
