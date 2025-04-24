/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite, observer } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
    setup();

    const { ID, VARIATION } = settings;

    events.send(settings.ID, 'BRA-8 Active', 'test displaying');

    console.log("BRA-8");
	
    const alterProdTabs = () => {

		console.log("alter prod tabs");

    	let prodTabs = document.querySelector('.c-tabs');

	    // set up the new accordion buttons

	    pollerLite(['.c-tabs'], () => {

		    let prodDetails = document.getElementById('product-details');
		    let prodDelivery = document.getElementById('delivery-and-returns');
		    let sizingHelp = document.getElementById('sizing-help');

		    if(prodDetails) {
		    	prodDetails.classList.add('accordion-section');
		    	prodDetails.insertAdjacentHTML('beforebegin', `
			    	<button class="accordion-button" id="product-details"> 

			    		<span class="button-text">Product Details</span>
			    		<svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
			    		<svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
			    	</button>
			    `);
			    events.send(settings.ID, 'BRA-8 adding accordion buttons', 'product-details button added');
		    }

		    if(prodDelivery) {
				prodDelivery.classList.add('accordion-section');
				prodDelivery.insertAdjacentHTML('beforebegin', `
			    	<button class="accordion-button" id="product-delivery"> 

			    		<span class="button-text">Delivery &amp; Returns</span>
			    		<svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
			    		<svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
			    	</button>
			    `);
			    events.send(settings.ID, 'BRA-8 adding accordion buttons', 'product-delivery button added');
		    }

		    if(sizingHelp) {
				sizingHelp.classList.add('accordion-section');
				sizingHelp.insertAdjacentHTML('beforebegin', `
			    	<button class="accordion-button" id="product-sizing"> 

			    		<span class="button-text">Sizing Help</span>
			    		<svg class="plus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect><rect width="32" height="200" x="88" rx="16"></rect></svg>
			    		<svg class="minus-sign" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 200 200" role="img"><rect width="200" height="32" y="88" rx="16"></rect></svg>
			    	</button>
			    `);
			    events.send(settings.ID, 'BRA-8 adding accordion buttons', 'product-sizing help button added');
		    }

		    // set a poller to listen for when the accordion buttons have been added
		    // then add click events for each button

		    pollerLite(['.accordion-button'], () => {
		    	
		    	let accordionButtons = document.querySelectorAll('.accordion-button');
		    	let accSections = document.querySelectorAll('.accordion-section');
		    	
		    	Array.from(accordionButtons).forEach((accButton) => {
			      accButton.addEventListener('click', (e) => {
			        e.preventDefault();
			        let currNode = e.target.id;


			        if(e.target.classList.contains('active')) {
			        	// if the classlist contains active, click is to close that accordion section
			        	Array.from(accordionButtons).forEach((accButton) => {
					        accButton.classList.remove('active');
					    });

				        Array.from(accSections).forEach((accSection) => {
					        accSection.classList.remove('active');
					    });

					    events.send(settings.ID, 'BRA-8 closing accordion', 'accordion button '+currNode+' closed');

			        } else {
			        	// if the classlist doesn't contain active, click is to open that accordion & close all others
			        	Array.from(accordionButtons).forEach((accButton) => {
					        accButton.classList.remove('active');
					    });

				        Array.from(accSections).forEach((accSection) => {
					        accSection.classList.remove('active');
					    });

					    e.target.classList.add('active');
					    if(currNode == "product-details") {
				        	prodDetails.classList.add('active');
				        } else if(currNode == "product-delivery") {
				        	prodDelivery.classList.add('active');
				        } else if(currNode == "product-sizing") {
				        	sizingHelp.classList.add('active');
				        }

				        events.send(settings.ID, 'BRA-8 opening accordion', 'accordion button '+currNode+' opened, all others closed');
				        


			        }

			      });
			    });
		    	

		    });
		});
    };
    

    // add experiment observer to re-add body classes when megamenu opened
    var body = document.body;
    if(body) {
      observer.connect(body, function () {
      	
      	if(!document.body.classList.contains(ID)) {
        	document.body.classList.add(ID);
        }

      }, {
        config: {
          attributes: true,
          childList: true,
          subtree: false,
        }
      });
    }    

    
  	pollerLite([
    () => {
        return document.readyState == "complete";
    }
    ], () => {
        alterProdTabs();
    });
    
    
};