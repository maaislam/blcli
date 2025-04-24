// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const AC016_V2 = (() => {
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
		if($('#input-order-selector .dropdown-icon-container .option-text').text() == "Agencies nearest to location"){

            utils.fullStory('AC016', 'Variation 2');

            const cacheDom = (() => {
                //Cache useful selectors for later use
                const bodyVar = document.querySelector('body');
    
                const searchResultCount = $('#search-results-container .agency-result.row ');
                const searchDistanceText = $('#search-results-container .distance-bands-text.text-center span');
                let searchDistanceCutoff;
                const searchHeader = $('.search-title-h2 strong:first-child');
                let AC016_V2_Markup;
                let searchedLength;
                const searchHeaderNumber = parseInt(searchHeader.text());
    
                
                //Retun the selectors we want to reference in other parts of the test
                return {
                    bodyVar,
                    searchResultCount,
                    searchDistanceText,
                    searchDistanceCutoff,
                    searchHeader,
                    AC016_V2_Markup,
                    searchedLength,
                    searchHeaderNumber
                };
            })();
            
            const distanceSelector = {
                //Function to find the agencies within 10 miles
                run(){
                    for(let i = 0; i < cacheDom.searchDistanceText.length; i++){
                        let distanceText = cacheDom.searchDistanceText[i];
                        if(distanceText.textContent.toLowerCase().trim().indexOf('recruitment agencies found within 10 miles') > -1)                    {
                            cacheDom.searchDistanceCutoff = distanceText.parentNode;
                            break;
                        };
                    };

                    $('.paginator').hide();
                }
            }
            
            const contentBuilder = {
                //Building view more button and distance header content
    
                buildContent(){
                 cacheDom.AC016_V2_Markup = $(`
                    <div class="AC016_V2_Content">
                        <div class="AC016_V2_ViewMore_Wrapper">
                            <a class="AC016_V2_ViewMore_Button">View More ></a>
                        </div>
                    </div>
                    <div class="AC016_V2-reveal-distance distance-bands-text text-center"><span><strong>` + (cacheDom.searchHeaderNumber - cacheDom.searchedLength) + `</strong> Recruitment agencies found further than 10 miles</span></div>
                `);
            
                $(cacheDom.searchDistanceCutoff).after(cacheDom.AC016_V2_Markup);
                functionalityBuilder.buildFunction();
            }
        }
            
        const functionalityBuilder = {
    
            //build view more button's functionality
    
            buildFunction(){
                $(cacheDom.AC016_V2_Markup).find('a').on('click', function(){
                    //utils.events.send('AC016_V2', 'Click', 'View More', {sendOnce: true});
                    $(cacheDom.AC016_V2_Markup).hide();
                    $('.AC016_V2-reveal-distance').show();
                    $(cacheDom.searchDistanceCutoff).nextAll('.agency-result.row ').show();
                });
            }
        } 

			//Run test
            distanceSelector.run();
            cacheDom.searchedLength = $(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length;
            if(cacheDom.searchedLength >= 2){
                //hide agencies with a distance greater than 10 miles

                //utils.events.send('AC016', 'AC016_V2', '10 Mile Agencies', true);
                $(cacheDom.searchDistanceCutoff).nextAll('.distance-bands-text.text-center, .agency-result.row ').hide();

                cacheDom.bodyVar.classList.add('AC016_V2');

                //Update displayed search result header
                $('.results-filter + .distance-bands-text').html('<strong>' + cacheDom.searchedLength + '</strong> Recruitment agencies <br />found within 10 miles');
                contentBuilder.buildContent();

            } else if($(cacheDom.searchDistanceCutoff).prevAll('.agency-result.row ').length == 0){
                
                let secondDistanceCutOff = $(cacheDom.searchDistanceCutoff).nextUntil('.distance-bands-text.text-center', '.agency-result.row ');
             
                if(secondDistanceCutOff.length >= 2){
                    cacheDom.bodyVar.classList.add('AC016_V2');
                    let secondDistance = $('.distance-bands-text.text-center')[1];
                    $(secondDistance).hide().nextAll('.distance-bands-text.text-center, .agency-result.row ').hide();
                    $(cacheDom.searchHeader).text($(secondDistanceCutOff).length);
                    cacheDom.searchDistanceCutoff = secondDistance;
                    contentBuilder.buildContent();
                }    


            } else {
                utils.events.send('AC016', 'AC016_V2', 'No 10 Mile Agencies', true);
            };
		}
    }    
})();