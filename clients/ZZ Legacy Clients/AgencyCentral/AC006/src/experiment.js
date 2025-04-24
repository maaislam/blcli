// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import svgHtml from './html/svg.js';
import overlayHtml from './html/overlay.js';

window._AC006 = (function() {
    let $ = null;

    // Event sending
    const eventSender = utils.events.setDefaultCategory('AC006---Search Loader');

    /**
     * Show loader
     */
    const showLoader = () => {
        const overlay = $(overlayHtml);
        $('body').prepend(overlay);

        eventSender.send(null, 'did-show-lightbox');

        // Switch message
        setTimeout(() => {
            switchMessage();
        }, 1500);
    }

    /**
     * Switch messages in overlay
     */
    const switchMessage = () => {
        $('.ac6-message--first').addClass('hide');
        $('.ac6-message--second').removeClass('hide').addClass('ac6-animate-translateX1');

        setTimeout(() => {
            eventSender.send(null, 'did-see-second-message');
        }, 300);
    }

    /**
     * Experiment code
     */
	const _activate = () => {
		// Namespace CSS
		document.body.classList.add('ac6');

        // Add SVG elements to page
        $('body').prepend(svgHtml);

        // Add loader

        // Show loader
        $('#search-bar-form .search-bar-button-inline').on('click', (e) => {
            if($('#search-bar-form .input-error').length == 0) {
                showLoader();
            }
        });
	};

    /**
     * Trigger test
     */
	const _triggers = (options) => {
        UC.poller([
            '#search-bar-form .search-bar-button-inline',
            () => {
                return !!window.jQuery;
            }
        ], () => {
            $ = window.jQuery;

            utils.fullStory('AC006', 'Variation 1');

            _activate();
        });
	};

	// Trigger experiment
	_triggers();

    return {
        /**
         * Helper show guide line whilst test is running 
         */ 
        showGuideLine: () => {
            const guideDiv = document.createElement('div');
            guideDiv.style = `
                    position: absolute;
                    width: 10px;
                    margin-left: -5px;
                    height: 100%;
                    margin-top: -5px;
                    background: yellow;
                    display: block;
                    left: 50%;
                    top: 0;
            `;
            document.querySelector('.ac6-overlay').appendChild(guideDiv);
        },
        showLoader: () => {
            showLoader();
        }
    };

})();
