/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP078 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            'ul.tabs','#tp26_overview .tab-content',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){

        utils.fullStory('TP078', 'Variation 1');
        //utils.events.send('TP078', 'Category', 'Action', true, 6, 'Non-Trade');
        //utils.events.send('TP078', 'Category', 'Action', true);

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

            bodyVar.classList.add('TP078');
            
			//Retun the selectors we want to reference in other parts of the test
			
            const tabsParent = document.querySelector('ul.tabs');
            const tabContentParent = document.querySelectorAll('#tp26_overview .tab-content');
            const productBP = document.querySelector('#tab-1 .featureClass');

			
            return {
				bodyVar,
                tabsParent,
                tabContentParent,
                productBP,
            };
        })();

		const testBuilder = {

			moveContent(){


      //Loop through tabs and move the headers above the tab content

				for(let i = 0; i < cacheDom.tabsParent.children.length; i++){
                        let headerMove = cacheDom.tabsParent.children[i].querySelector('p');
                        cacheDom.tabContentParent[i].insertBefore(headerMove, cacheDom.tabContentParent[i].firstChild);	
				};

                //Move the product bullet points above the product description and add a space
                
                cacheDom.productBP.parentNode.insertBefore(cacheDom.productBP, cacheDom.productBP.parentNode.firstChild);
			}

		}
		
		//Check if there are no reviews

		if(document.querySelector('.pr-rd-no-reviews .pr-snippet-write-review-link') != null){
			//No Reviews hide elements

			document.querySelector('#pr-reviewsnippet').style.display = "none";
			document.querySelector('#pr-reviewdisplay').style.display = "none";
        };

    //Hide TP051 links if they exists

      if(document.querySelector('.tp51-toplinks') != null){
          document.querySelector('.tp51-toplinks').style.display = "none";
      };

    //Hide data sheets if there are no data sheets

      if(document.querySelector('#tab-3 > .dataSheetClass') == null){
        document.getElementById('tp26_overview').classList.add('TP078-Hide');
      };


        testBuilder.moveContent();
        
  
    }    
})();