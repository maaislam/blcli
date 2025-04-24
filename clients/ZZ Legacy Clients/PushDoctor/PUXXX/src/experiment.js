import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as lightbox from './lib/lightbox.js';

const PUXXX = (() => {

	const activate = () => {
		const $ = window.jQuery,
			  $body = $('body');
		
		$body.addClass('PUXXX');

		//if cookie does not exist show lightbox/set cookie
		if(!utils.getCookie('PUXXX-survey')){
			setTimeout(function(){
				showLightbox();
				utils.setCookie('PUXXX-survey',1);
			},20000);
		}

		function showLightbox() {
			const $lightboxHtml = lightbox.lightBoxhtml;
			$lightboxHtml.prependTo($body);
			$lightboxHtml.addClass('PUXX-lightbox_active');

			const lightboxExit = $('.PUXX-lightboxOverlay'),
				overlay = $('.PUXX-lightbox_exit');

			//close lightbox
			$(lightboxExit).click(function () {
				closeLightbox();
			});
			$(overlay).click(function () {
				closeLightbox();
			});

			function closeLightbox() {
				$lightboxHtml.removeClass('PUXX-lightbox_active');
			}
		}


	};

	// Audience conditions
	const triggers = ((options) => {
        UC.poller([
            'body',
            () => {
                return !!window.jQuery;
            },
            () => {
                return !!window.ga;
            }
            ], () => {
             $ = window.jQuery;
             utils.fullStory('PUXXX', 'Variation 1');
             activate();
            });
    })();

})();
