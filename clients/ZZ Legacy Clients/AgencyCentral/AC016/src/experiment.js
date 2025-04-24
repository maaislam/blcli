// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const AC016_V1 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
			'#input-order-selector .dropdown-icon-container .option-text', 
			'#search-results-container .results-filter.row', 
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
    
    
        //Check search criteria to run test
		if($('#input-order-selector .dropdown-icon-container .option-text').text()== "Agencies nearest to location"){
            utils.fullStory('AC016', 'Variation 1');



            const cacheDom = (() => {
                //Cache useful selectors for later use
                const bodyVar = document.querySelector('body');
    
                const searchResultCount = $('#search-results-container .agency-result.row ');
                const searchDistanceText = $('#search-results-container .distance-bands-text.text-center span');
                let searchDistanceCutoff;
                const searchHeader = $('.search-title-h2 strong:first-child');
    
                
                //Retun the selectors we want to reference in other parts of the test
                return {
                    bodyVar,
                    searchResultCount,
                    searchDistanceText,
                    searchDistanceCutoff,
                    searchHeader
                };
            })();
            
            const distanceSelector = {
                //Function to find the agencies within 30 miles
    
                run(){
                    for(let i = 0; i < cacheDom.searchDistanceText.length; i++){
                        let distanceText = cacheDom.searchDistanceText[i];
                        if(distanceText.textContent.toLowerCase().trim().indexOf('recruitment agencies found within 30 miles') > -1){
                            cacheDom.searchDistanceCutoff = distanceText.parentNode;
                            break;
                        };
                    };

                    //Hide pagination
                    $('.paginator').hide();
                }
            }



			//Run test
            distanceSelector.run();
            if($(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length >= 2){

                //hide agencies with a distance greater than 30 miles

                //utils.events.send('AC016', 'AC016_V1', '30 Mile Agencies', true);
                cacheDom.bodyVar.classList.add('AC016_V1');

                $(cacheDom.searchDistanceCutoff).nextAll('.distance-bands-text.text-center, .agency-result.row ').hide();

                //Update displayed search result header
                $('.results-filter + .distance-bands-text').html('<strong>' + $(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length + '</strong> Recruitment agencies <br />found within 30 miles');
                $(cacheDom.searchHeader).text($(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length);

                //Run the test when the cut off point is the first distance

            } else if($(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length == 0){


                let secondDistanceCutOff = $(cacheDom.searchDistanceCutoff).nextUntil('.distance-bands-text.text-center', '.agency-result.row ');
                if(secondDistanceCutOff.length >= 2){
                    cacheDom.bodyVar.classList.add('AC016_V1');

                    let secondDistance = $('.distance-bands-text.text-center')[1];
                    $(secondDistance).hide().nextAll('.distance-bands-text.text-center, .agency-result.row ').hide();
                    $(cacheDom.searchHeader).text($(secondDistanceCutOff).length);
                }    


            } else {
                utils.events.send('AC016', 'AC016_V1', 'No 30 Mile Agencies', true);
            };
		}
    }    
})();