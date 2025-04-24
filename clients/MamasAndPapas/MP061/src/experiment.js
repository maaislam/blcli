import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const MP061 = (() => {
	let $ = null;
    const activate = () => {
        const $body = $('body');
		$body.addClass('MP061');
		
		//Check when the user highlights text
		const productTitle = $('.productDetail_title'),
		productTitleText = productTitle.find('h1');

		//Add the tooltip wrapper
		const tooltip = $(
			`<div class="MP61-tooltip">
				<h3>Price Match Promise</h3>
				<p>Did you know we match the price? Our Price Match Promise guarantees that if you find an identical product for less and with the same service conditions, we'll match it.<br></br>Everything you need in one place at a great price. Just call <span class="MP061-number"></span>
        </p>
			</div>`
		);
    tooltip.appendTo(productTitle);
    
    const URL = window.location.href;
    if (URL.indexOf('/en-gb/') > -1) {
      $('.MP061-number').text('0345 268 2000');
    } else if (URL.indexOf('en-ie') > -1) {
      $('.MP061-number').text('1890 882 363');
    }

		//function to get when the text is highlighted
		const selectedText = () => { 
			$(productTitle).mouseup(function(){  
				let highlightedText = "";
				if (window.getSelection) {
					highlightedText = window.getSelection().toString();
					
					if(highlightedText != ''){
						toolTip();
					}
				}
			});
			//remove class
			$(window).mousedown(function(){  
				if (window.getSelection) {
					tooltip.removeClass('MP61-showing');
				}
			});
		}

		selectedText();

		//show/hide tooltip
		const toolTip = () => { 
			if(!sessionStorage.getItem('MP61-shown')){
				tooltip.addClass('MP61-showing');
				sessionStorage.setItem('MP61-shown', 1);
				utils.events.send('MP061 Copy and Paste Messaging', 'Message shown', 'Message shown on title highlight', {
					sendOnce: true
				});
			}
		}		
	}

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
            () => {
                return !!window.jQuery;
            }
            ], () => {
             $ = window.jQuery;
             utils.fullStory('MP061', 'Variation 1');
             activate();
            });
    })();

})();