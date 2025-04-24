// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP064 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '#tp_product_lister_enumeration > li > a', '#tp_product_lister_enumeration > li > a > p', 
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('TP064', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const categoryProductLink = $('#tp_product_lister_enumeration > li > a');
			const categoryProductPrice = $('#tp_product_lister_enumeration > li > a > p');
			const techSpecsMarkUp = (`
			<div class="TP064_TechnicalSpecs_Wrapper">
				<img class="TP064_TechnicalSpecs_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoMAQdVjS46AAAEpUlEQVRo3s3Zy2tVVxQG8J/mYoKPJC2iNZCigoIT0ZKJbdRUHGakCE7tPyA4E8WgE5GKE6UgQtGpTivoIFa0ooiUooIgOFFji6KtQWpijKuDu+/tSc+5r6i9fmdyztrr8e2zX2vvTevosNcD8Z/ngb06ZuFtFjiUC155DrXubE7LFnP9qdsvfvRuhvQ7g8Z9NkP6UdAvhK05+VYh9Lden1ZRbue3OfnbTOkHIrDEgJ6c9MsG/+e/6DFgScvV1OWkECbsqcpKthtN3W0oZzGUSkZty/yHPSaEcFJXa+EvZPr2YSxzwOP0PeGiVTmbVS6mYOGR/Zbi+4yXC81TqIQ/Zb1LQrjujRBeOWunRTUtF9nprFdCmHRDCJesd6oVCpXwP5iD+S6nGow7qLupCnQ7aDxZXTYfc/zQLIWZ4WGBK147anErbWixo167YkH6bpJCPjwstLKl4BWstDDz1RSFUwXhPxwqFE7VUuhLxR8nfJlCuYp9xcVfC2H9RwsP64XwdZbTv+j1h04/G/Z3E67WWa1PH5544r7fmrCZ7yffmvSFv4oV9qShs6Cumw2Oe5hbih86bkNduwVpSO+pp1Seu67M6L9ZrHU+E/S5u+56npGct7aG5UJXqvNqXdwQXhcOvA7HTAthzAlbdFZLOm1xwpgQph0rXBNXei1cbxR+qUnhaEFJT5ojntltXqHtPLs9S2O9p6D8qPDGsvoE9gvjBbNejztCOFd1vcIOR4wadcQOK6p654Rwp4DCYuPCgXrhOzwSDhbILwjv7Evfw4WdcDiV7vNOuFDQEAeFx0q1CWwTXhUsOceESOF7nUkhp9x22mm3TSXJGb2JQgjHcn66vRK21yYwKpzNSdeaFs6BwdTVbhrMzOldBt1M3XMQnBOmC0bEWWE0H3iufsttFMLOXOl54Zke9BoTpowU/MaSEVPCmF70eCacz2ntFMImy/VX0sEOh7ystuRELt3YIITd4IwwZWPNP7jRlHAG7BYiNzUtqmZN4aVDOtg7oytdzDk9LoyZh2EhjKiHESEMY54x4XhO4+KMeHt5IFy11WabbS7I9R4KJ6pvN+v1YZTcFB6CE9W3LFYZMmTIVleFB4Swq6bDdULYghVCpC5WD4NCWIEtQlhXU3OXEOWOEDWVVoNrGMBbtxoSuOVt0r6W8VCEoPHOqA8vTCaX90w0JDDhXtKe9CJ5qINmCPxOcvlrw/CS1gDJ8j0JfHQ0IvCEtH7dwldN+fwqaZctn7w/gc91JpdrmtjbdFmTtDt93iyB2nnwffBNcllKbVsPA0pJ+5uMhyKkqG2fiNo+Fbd9MaKyHG9qz3KcRdsSkgq2tzslK3nc3qSUA+1Ny1nmTXs3Jlxv79bscHs3p23Ynn9SBxRtOaLJou2HVG0/pvsEDirbflSbp/C/H1ZnKfx7XH/DpFaP69+4blbH9VkK5ed7LLXfo2rW1OjC4rEDlqnMqy1fWJQp5K9sOmxr6spme2bBneWVTRnFl1Yb6xLYlJM3uLSqlxw89bRA+qgu6Xwa/rL+jrr1veF0DeKlTGkLKLVqYMy4biP6c1e3jBtr2d8s8EEvr2eDD3p9/w+WW1C9x1w+OQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0yNlQxMjowMTowNyswMjowMAxaXEgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMjZUMTI6MDE6MDcrMDI6MDB9B+T0AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==" alt="Technical Specs">
				<p class="TP064_TechnicalSpecs_Text"><span class="TP064_View_TechnicalSpecs">View</span><span class="TP064_Close_TechnicalSpecs">Close</span> technical specifications</p>
			</div>
			<div class="TP064_TechnicalSpecs_Data_Wrap"></div>
			`); 

			bodyVar.classList.add('TP064');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				categoryProductLink,
				categoryProductPrice,
				techSpecsMarkUp
            };
        })();


        const testBuilder = {

            setupElements(){
				//Build Tech Specs link

				cacheDom.categoryProductLink.after(cacheDom.techSpecsMarkUp);
		
				functionalityBuilder.TP064TechnicalSpecificationsFunctions($('.TP064_TechnicalSpecs_Text'));
				
				$('.TP064_TechnicalSpecs_Wrapper').parent().addClass('TP064_TechnicalSpec_Product');
				functionalityBuilder.showMoreProducts();
            }

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

			TP064TechnicalSpecificationsFunctions(element){

				(element).on("click", function(){
					utils.events.send('TP064', 'Click', 'View Technical Specifications', {sendOnce: true});
					if(slideQ === false){
						slideQ = true;

						let TP064Wrapper = $(this).closest('.TP064_TechnicalSpecs_Wrapper');
						let TP064DataWrapper = TP064Wrapper.next(".TP064_TechnicalSpecs_Data_Wrap");

						if(TP064Wrapper.hasClass("TP064_Tech_Specs_Open")){
							TP064DataWrapper.slideUp(function(){
								slideQ = false;
							});
						} else {
							TP064DataWrapper.slideDown(function(){
								slideQ = false;
							});
						}
				
						//Toggle class to show correct text
						TP064Wrapper.toggleClass('TP064_Tech_Specs_Open');

						//Store the page URL on click
						let pageToRequest = $(this).closest('.product_item').find('a:first').attr('href');

						//Request page to retrieve tech specs 

						//Function to make a request
						const TP064MakeRequest = (function(){
							
							$.get(pageToRequest)

								.done(function(data){
									$(data).find('.tp_detSpec > .featureClass').appendTo(TP064DataWrapper);
									TP064DataWrapper.slideDown(function(){
										slideQ = false;
									});
									$('html, body').animate({
											scrollTop: TP064DataWrapper.offset().top - 90
											
										}, {
											duration: 600,
											complete: function(){
												slideQ = false;
											}
										});
									})

								.fail(function(){
									const TP064RequestFailMarkup =(`
									<p class="TP064_RequestFailed">There was an error with your request, please click here to try again</p>
									`);

									TP064DataWrapper.append(TP064RequestFailMarkup);
									TP064DataWrapper.slideDown(function(){
										slideQ = false;
									}); 
									$('html, body').animate({
										scrollTop: TP064DataWrapper.offset().top - 90
										
									}, {
										duration: 600,
										complete: function(){
											slideQ = false;
										}
									});

									

									//Run data request function again on click, empty the data wrapper to remove error message
									TP064DataWrapper.find(".TP064_RequestFailed").on("click", function(){
										TP064DataWrapper.slideUp(function(){
											slideQ = false;
										});
										$('html, body').animate({
											scrollTop: TP064DataWrapper.offset().top - 90
											
										}, {
											duration: 600,
											complete: function(){
												slideQ = false;
											}
										});

										$(this).closest('.TP064_TechnicalSpecs_Data_Wrap').empty();
										TP064MakeRequest();
									});
								});  

						});

						//Make request once
						if(TP064Wrapper.next(".TP064_TechnicalSpecs_Data_Wrap").is(':empty')){
							TP064MakeRequest();
						}
					}
				});
			},

			

			
			showMoreProducts(){
				$('#show_more').on("click", function(){
					UC.poller([
						'.product_item:not(.TP064_TechnicalSpec_Product)', 
						() => {
							if ($('.product_item').length > $('.product_item.TP064_TechnicalSpec_Product').length) {
								return true;
							}
						}
					], function(){

						//New functionality - clears all technical specs links, test will run again to add all

						$('.TP064_TechnicalSpecs_Wrapper').remove();

						//Below - old functionality to add technical specs link to products loaded in

						/*
						$('.product_item:not(.TP064_TechnicalSpec_Product)').each(function(){
								let TP064MoreProduct = $(this);
								TP064MoreProduct.find('a:first').after(cacheDom.techSpecsMarkUp);
								TP064MoreProduct.addClass('TP064_TechnicalSpec_Product');
								functionalityBuilder.TP064TechnicalSpecificationsFunctions(TP064MoreProduct.find('.TP064_TechnicalSpecs_Text'));
						});
						*/ 

					});
				})
			}
		};


	if(document.querySelector('body').classList.contains("pageType-CategoryPage")){	
		testBuilder.setupElements();
	}
    }    
})();