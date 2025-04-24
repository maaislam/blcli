/*eslint-disable */
/*
 * IMPORTANT!
 * Do not edit this test directly in this platform
 * Modify the src files in the experiments repository 
 */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// TG037 - Experiment Title
const TG037 = (() => {

	let $ = null;

	// Experiment code
	const activate = () => {
		document.body.classList.add('TG037');

		const cloneEl = () => {
			let formEl = document.querySelector('.block-subscribe form > .block-content');
			let formCp = formEl.cloneNode(true);
			
			// Remove elements
			let formTitle = formCp.querySelector('.form-subscribe-header');

			if (formTitle) {
				formTitle.parentNode.removeChild(formTitle);
			}

			return formCp;
		};
		// Clone the footer form
		let formCp = cloneEl();


		
		const buildModule = () => {
			let url = window.location.pathname.match(/^\/(\w+)\//)[1];
			
			let title = '';
			let signUp = '';
			let getHealth = '';

			const strings = {
				'title': {
					'en': 'Follow Technogym Posts',
					'it': 'Segui gli articoli Technogym',
				},
				'sign_up': {
					'en': 'Sign up to our free newsletter',
					'it': "Iscriviti alla nostra newsletter gratuita",
				},
				'get_health': {
					'en': 'Get health and wellness tips, advice and product updates straight to your inbox ',
					'it': 'Ricevi consigli su salute, wellness e aggiornamenti sui prodotti direttamente nella tua casella email',
				},
			};

			if (url == 'it') {
				title += strings.title.it; 
				signUp += strings.sign_up.it;
				getHealth += strings.get_health.it;
			} else {
				title += strings.title.en;
				signUp += strings.sign_up.en;
				getHealth += strings.get_health.en;
			}

			let newHtml = `
				<div class="tg37-subscribe-wrap">
					<div class="container">
						<div class="row">
							<div class="col-xs-12">
								<div class="tg37-subscribe-wrap clearfix">
								<h2 class="col-xs-12">${title}</h2>
									<div class="col-md-7 col-xs-12">
										<p>${signUp}</p>

										<p>${getHealth}</p>
									</div>

									<div class="tg37-form-wrap col-md-5 col-xs-12">
										${formCp.innerHTML}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;
			

			let articles = document.querySelectorAll('.single_post');
			for (let i = 0; articles.length > i; i++) {
        // let ref = articles[i].querySelector('.content-wrapper');
        let ref = articles[i].querySelector('#vcContactForm');
				let hasForm = articles[i].querySelector('.tg37-subscribe-wrap');

				if (hasForm) {
					continue
				} else {
					ref.insertAdjacentHTML('beforebegin', newHtml);
				}
			}
			
			
		};
		buildModule();


		// Tracking
		const tracking = (() => {
			let signUpCta = document.querySelectorAll('.tg37-form-wrap .actions button');
			if (signUpCta) {
				utils.events.send('TG037', 'Active Expperiment', 'New subscription form added', {sendOnce: true});
				
				for (let z = 0; signUpCta.length > z; z++) {
					signUpCta[z].addEventListener('click', function() {
						// Tracking event
						utils.events.send('TG037', 'Click', 'Used the new signup CTA', {sendOnce: false});
						
					});

					
				}
			}

		});


		const formPopulate = (() => {
			const formInputs = document.querySelectorAll('.tg37-form-wrap .input-box input#newsletter-pre-email');
			const popupInput = document.querySelector('#newsletter-modal .input-box input#newsletter-email_subscribe');
			
			for (let i = 0; formInputs.length > i; i++) {
				if (formInputs[i].classList.contains('tg37-added')) {
					continue;
				}
				formInputs[i].classList.add('tg37-added');
				
				formInputs[i].addEventListener("keyup", function(e) {
					let inputVal = e.currentTarget;
					let input = inputVal.value; 
					
					setTimeout(function() {
						popupInput.value = input;
					}, 1800)
										
				});
			} 
		});
		formPopulate();


		// Make form sticky
		const fixedForm = () => {

			let fixedWrap = document.createElement('div');
			fixedWrap.classList.add('TG37-fixed-wrap', 'clearfix');
			let emailSpan = document.createElement('span');
			emailSpan.classList.add('icon-Mail');

			let newForm = document.querySelector('.tg37-form-wrap').cloneNode(true);

			fixedWrap.appendChild(emailSpan);
			fixedWrap.appendChild(newForm);

			let hasFixedForm = document.querySelector('TG37-fixed-wrap');

			$(window).scroll(function() {
				if($(window).scrollTop() + $(window).height() > $(document).height() - 1000) {

					if (!hasFixedForm) { 	
						$('body').append(fixedWrap);
					} 
				

				}
			 });
		
		};

		fixedForm();


		// UC Observer 
		if (document.querySelector('.newsroom_post_wrapper')) {
			UC.observer.connect(document.querySelector('.newsroom_post_wrapper'), function() {
				buildModule();
				tracking();
				formPopulate();
			}, {
				config: {
					attributes: false,
					childList: true
				}
			});
		}

	};

	// Poller
	const poller = UC.poller([
		() => !!window.jQuery,
		".footer-container .block-subscribe",
	], () => {
		
		$ = window.jQuery;

		triggers();
	});

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('TG037', 'Variation 1');

		activate();
	});



})();
