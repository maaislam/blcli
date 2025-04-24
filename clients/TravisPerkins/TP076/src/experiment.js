/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP076 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '.tp_filterSearchBtnWrapper', '#tpFilterSearch-popup', '#tpFilterSearch .ui-content ul.ui-collapsible-set li.ui-collapsible h2',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('TP076', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

            bodyVar.classList.add('TP076');
            
            const filterNewDesitination = document.querySelector('.tp_filterSearchBtnWrapper');
            const filtersParent = $('#tpFilterSearch-popup');
            const filterOption = $('#tpFilterSearch .ui-content ul.ui-collapsible-set > li.ui-collapsible > h2');

            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
                filtersParent,
                filterNewDesitination,
                filterOption
            };
        })();


        const testBuilder = {

            setupElements(){
                
                //Move filters outside of popup
                cacheDom.filterNewDesitination.insertBefore(cacheDom.filtersParent[0], cacheDom.filterNewDesitination.lastChild);

                //Build new filter button

                cacheDom.filterNewDesitination.insertAdjacentHTML('afterbegin', `
                <div class="TP076_FilterButton_Wrapper">
                    <a class="TP076_FilterButton">Filter</a>
                </div>
                `);

                //Hide filters on load

             functionalityBuilder.filterButtonFunctionality();
             functionalityBuilder.topLevelFilterFunction();
            }

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

            filterButtonFunctionality(){

                document.querySelector('.TP076_FilterButton').addEventListener('click', function(){
                    cacheDom.bodyVar.classList.toggle('TP076_ShowFilters');
                    utils.events.send('TP076', 'Click', 'Filter', {sendOnce: true});

                    if(cacheDom.filtersParent.is(':visible')){
                        cacheDom.filtersParent.slideUp();
                    } else {
                        cacheDom.filtersParent.slideDown();
                    };
                });
            },

            topLevelFilterFunction(){
                //Build top level filter tracking

                cacheDom.filterOption.on('click', function(){
                    //Filter Anchoring
                    $('html, body').animate({
                        scrollTop: $(this).offset().top - 90
                        
                    }, {
                        duration: 600,
                        complete: function(){
                            slideQ = false;
                        }
                    });

                    //Send event once on click
                    let filterChosen = $(this).find('a label').text();
                    utils.events.send('TP076', 'Top Level Filter Option', filterChosen, {sendOnce: true});
                        });    
                },
     
        };


        if(document.querySelector('body').classList.contains("pageType-CategoryPage")){	
            testBuilder.setupElements();
        }
    }    
})();
