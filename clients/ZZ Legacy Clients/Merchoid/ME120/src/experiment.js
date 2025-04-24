// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

window._ME120 = (function() {
    // Event sending
    const eventSender = utils.events.setDefaultCategory('ME120---Basket Limited Stock');

    /**
     * Get the message to show
     */
    const getMessaging = (stock, size) => {
        if(!stock) {
            return false;
        }

        let stockType = null;
        if(stock === 1) {
            stockType = 'red';
        } else if(stock < 5) {
            stockType = 'yellow';
        } else if(stock >= 5) {
            stockType = 'green';
        }

        let sizeText = '';
        if(size) {
            sizeText = `for size ${size}`;
        }

        let message = '';
        switch(stockType) {
            case 'red': 
                message = `
                    <div class="me120-message me120-message--red">
                        <p class="me120-message__summary">Limited Stock! Only 1 available ${sizeText}</p>
                        <p class="me120-message__detail">
                            To help guarantee you get your product in time, we will place this on hold for 
                            the next <strong>60 minutes</strong> so no one else will get it. 
                            <a 
                                data-tipso="Duis varius dignissim mi, at pellentesque justo. Praesent commodo nibh eu cursus tempor. Phasellus ut ex nisi. Proin pharetra euismod neque, quis porta ipsum vehicula et."
                                class="me120-tooltip me120-info me120-info--stock-red">More Information</a>
                        </p>
                    </div>
                `;
                break;
            case 'yellow': 
                message = `
                    <div class="me120-message me120-message--yellow">
                        <p class="me120-message__summary">Limited Stock! Less than 5 available ${sizeText}</p>
                        <p class="me120-message__detail">
                            Due to the popularity of our products, we will place this on hold for the 
                            next <strong>60 minutes</strong>
                            <a 
                                data-tipso="Duis varius dignissim mi, at pellentesque justo. Praesent commodo nibh eu cursus tempor. Phasellus ut ex nisi. Proin pharetra euismod neque, quis porta ipsum vehicula et."
                                class="me120-tooltip me120-info me120-info--stock-yellow">More Information</a>
                        </p>
                    </div>
                `;
                break;
            case 'green': 
                message = `
                    <div class="me120-message me120-message--green">
                        <p class="me120-message__summary">In stock ${sizeText}</p>
                        <p class="me120-message__detail">
                            To ensure we don't run out in the run up to Christmas, we will place this on hold 
                            for you for the next <strong>60 minutes</strong>
                            <a 
                                data-tipso="Duis varius dignissim mi, at pellentesque justo. Praesent commodo nibh eu cursus tempor. Phasellus ut ex nisi. Proin pharetra euismod neque, quis porta ipsum vehicula et."
                                class="me120-tooltip me120-info me120-info--stock-green">More Information</a>
                        </p>
                    </div>
                `;
                break;
        }

        return {
            message: message,
            stockType: stockType
        }
    };

    /**
     * Experiment code
     */
	const _activate = () => {
		// Namespace CSS
		document.body.classList.add('me120');

        // Check stock
        [].forEach.call(document.querySelectorAll('.shop_table .cart_item'), (item, index) => {
            const stockElm = item.querySelector('dd.variation-Stock p');
            const sizeElm = item.querySelector('dd.variation-Size p');

            let stockValue = stockElm ? parseInt(stockElm.innerHTML.trim(), 10) : null
                , size = sizeElm ? sizeElm.innerHTML.trim() : null;

            if(!stockValue) {
                return;
            }

            let messaging = getMessaging(stockValue, size);

            if(messaging.message) {
                const messageRow = document.createElement('tr');
                
                messageRow.classList.add('me120-message-row');
                messageRow.innerHTML = '<td colspan="6">' + messaging.message + '</td>';

                item.parentNode.insertBefore(messageRow, item.nextSibling);

                item.classList.add('me120-has-message-row');

                eventSender.send(null, 'stock-type=' + messaging.stockType, size);
            }
        });

        // Tipso tooltip
        window.jQuery('.me120-tooltip').tipso({
            background: '#000',
            width: 280
        });
	};

    /**
     * Trigger test
     */
	const _triggers = (options) => {
        UC.poller([
            'table.shop_table .cart_item',
            () => {
                return !!window.jQuery;
            }
        ], () => {
            utils.fullStory('ME120', 'Variation 1');

            _activate();
        });
	};

	// Trigger experiment
	_triggers();

})();
