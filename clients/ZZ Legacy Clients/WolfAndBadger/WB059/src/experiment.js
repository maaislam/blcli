/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const WB059 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '#header .container > form > input', '#search-results-modal', '#search-link', '.search-modal > .container > form', '#close-search-model',
            'div[class="search-modal"]', '#header .search-modal .container', '.search-modal', '#header',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('WB059', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');
            const searchFormParent = bodyVar.querySelector('#header .search-modal .container');
            const searchInputBox = bodyVar.querySelector('#header .container > form > input');
            const searchResultsContainer = bodyVar.querySelector('#global > #search-results-modal');
            const searchForm = bodyVar.querySelector('#header .container > form');
            const searchModal = bodyVar.querySelector('.search-modal');
            const headerMessages = bodyVar.querySelector('#header-messages');
            const headerMessageClose = bodyVar.querySelector('#header-messages .icon.icon-times-circle-o');
            const headerParent = bodyVar.querySelector('#header');
            const loaderMarkup = `
            <div class="WB059-loader WB059-Loader-Hide">
              <div class="WB059-spinner">
                <div class="WB059-spinner-icon"></div>
              </div>
            </div>
            `;
            let loaderParent;

            bodyVar.classList.add('WB059');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
                bodyVar,
                searchInputBox,
                searchResultsContainer,
                searchFormParent,
                searchForm,
                loaderMarkup,
                searchModal,
                loaderParent,
                headerMessages,
                headerParent,
                headerMessageClose
            };
        })();

        
        const functionalityBuilder = {
            //Builds the functions of the test

			checkForScroll(){
				window.onscroll = function(){

          //Close the search bar on scroll, overrides applied inline styling
          if(document.querySelector('.navbar.navbar-fixed-top.main-navbar.scrolled') != null){
              $('#close-search-model').click();
          } else if(document.querySelector('.navbar.navbar-fixed-top.main-navbar.scrolled') == null){

              //Open search if scrolling to the top after page refresh
              document.querySelector('div[class="search-modal"]').style.display = "block";
          }
          
          if($('div[class="search-modal"]').is(':visible') != true){
              cacheDom.searchResultsContainer.style.display = "none";
          } 
				};
            },
            
            checkForScrollBasketPage(){
                window.onscroll = function(){
                if(document.querySelector('.navbar.navbar-fixed-top.main-navbar.scrolled') != null){
                   $('#close-search-model').click();
                };

                if($('.search-modal').is(':visible')){
                    document.querySelector('.full-sitenav-wrapper').style.marginTop = "50px";
                } else {
                    document.querySelector('.full-sitenav-wrapper').style.marginTop = "0";
                };
                };
            },

            basketPageDisplay(){
                document.getElementById('search-link').addEventListener("click", function(){
                        if($('.search-modal').is(':visible')){
                            document.querySelector('.full-sitenav-wrapper').style.marginTop = "50px";
                        } else {
                            document.querySelector('.full-sitenav-wrapper').style.marginTop = "0";
                        }
                });
            },

            searchBoxFunctionality(){
              // Insert Loader
              cacheDom.searchModal.insertAdjacentHTML('afterend', cacheDom.loaderMarkup);
              // Assign selector for loader
              cacheDom.loaderParent = cacheDom.bodyVar.querySelector('.WB059-loader');
                //Change icon colour on focus

                cacheDom.searchInputBox.addEventListener("focus", function(){
                    document.querySelector('#header .search-modal .container').classList.toggle('WB059-Change-Icon');
                    if(cacheDom.searchInputBox.value != ""){
                        cacheDom.searchResultsContainer.style.display = "block";
                    }
                });

                
                cacheDom.searchInputBox.addEventListener("blur", function(){
                   document.querySelector('#header .search-modal .container').classList.toggle('WB059-Change-Icon');

                   //Hide search results if search box is empty
                   if(cacheDom.searchInputBox.value == ""){
                    cacheDom.searchResultsContainer.style.display = "none";
                }
                });
 
                //Search icon click submits form

                //Create an a tag to add functionality to search icon's before class

                cacheDom.searchFormParent.insertAdjacentHTML('afterbegin',`<a class="WB059-Search-Button"></a>`);

                cacheDom.bodyVar.querySelector('.WB059-Search-Button').addEventListener("click", function(){
                  cacheDom.searchForm.submit();
                });

                // Add submit event handler to reveal loader
                cacheDom.searchForm.addEventListener('submit', () => {
                  // Reveal Loader
                  cacheDom.loaderParent.classList.remove('WB059-Loader-Hide');
                });

                // Check if header message and button exist, if so then add styling class
                if(cacheDom.headerMessages && cacheDom.headerMessageClose) {
                  cacheDom.headerParent.classList.toggle('WB059-Message-Adjust');
                  // Add event listener to message close button, remove styling class on message close
                    cacheDom.headerMessageClose.addEventListener('click', () => {
                      cacheDom.headerParent.classList.toggle('WB059-Message-Adjust');
                    });
                }
              },

            WB059TrackedElements(){
                document.querySelector('.search-modal > .container > form').addEventListener("submit", function(){
                    utils.events.send('WB059', 'Search', 'Search Submitted', {sendOnce: true});
                });

                $('#AutoSearches').on("click", function(){
                    utils.events.send('WB059', 'Search', 'Search Submitted', {sendOnce: true});
                });

                cacheDom.searchInputBox.addEventListener("keyup", function(){
                    utils.events.send('WB059', 'Search', 'Typed In Search Bar', {sendOnce: true});
                });
            },


            WB059MobileAddressBar(){
                //Stop the URL address bar scroll from closing search bar on mobile
                cacheDom.bodyVar.querySelector('#search-link').addEventListener("click", function(){
                    //Remove scroll class that hides search bar
                
                    setTimeout(function(){
                        //Wait for scroll animation

                        //If scroll class exists remove it
                        if($('#header > div:first').hasClass('scrolled')){
                            $('#header > div:first').toggleClass('scrolled');

                            //Apply scroll class to resume normal functioning, else search bar won't close
                            setTimeout(function(){
                                $('#header > div:first').toggleClass('scrolled');
                            }, 500);
                        }
                    }, 300);
                });
            }
		};

    //adjust inline padding to reveal navigation based on device type
    //Adjust test for the basket page
	if (window.location.pathname.indexOf("shopping-bag") == -1){ 
        functionalityBuilder.checkForScroll();

    } else if(window.location.pathname.indexOf("shopping-bag") > -1 ){

        //Amend test for the basket page
        cacheDom.bodyVar.classList.add('WB059-Basket-Page');
        $('#close-search-model').click();
        functionalityBuilder.checkForScrollBasketPage();
        functionalityBuilder.basketPageDisplay();
    }
    
    functionalityBuilder.searchBoxFunctionality();
    functionalityBuilder.WB059TrackedElements();
    functionalityBuilder.WB059MobileAddressBar();
       
    }    
})();