/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const TP084 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '#tp_product_lister_enumeration > li > .tp_prodQuoteProcess',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('TP084', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
			const bodyVar = document.querySelector('body');
			const categoryProduct = $('#tp_product_lister_enumeration > li > .tp_prodQuoteProcess');
			const productInfoMarkUp = (`
			<div class="TP084_ProductInfo_Wrapper">
				<img class="TP084_ProductInfo_Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhBBoKIThy4lsXAAAD4UlEQVRo3t3Zf2iVVRgH8I+blBWC4pQwLAslK2tkf7RAy8wfOVAaJYstIpOalUYFVhQUmGFKmFREJKQg5c/IkGpDmH+MSCFWzYpCM4aYtI0mqMxG8+0Pb2O7u+s+9+5eF37PP/c953ue8z3P+5znfe77kg+utEunpE/r9Imr87KVFz7rt/i/7UeXXpjlJ+txyhzX9GnznJaYe2EEPC7RMKC3QaIud2Mjw8xSD3jQZZiEcwPGEzytCl22262n0Puu7ne/tw4Y39pvvDpqdkRYwKfu87Em8Je9OtLGyyxKBeEsNfaoipkd/BaMUmGGCb3X5Wjy/qD8Dpt7f9co90bvVZtmB5zNwduY6XCGg7Y8NHd5hpmHzczFAzPsN1K7Ju29fZUm5bCBY77o/T3eLFPsd7vm2OQRDkk0GNOvtz4nD9T36xmjQeJQpogryWBgqum61DqZw47/GyfV6jLd1JiAW9EyIMqHhg4tKctpyBQDY8mw+wTjTA4sNi7FTvfCecsBAZnR6F5rrAmzgyiJEm2yJXiWz9piU9Rs3AMnLbU0zA4j7oEi4aIWcIl3vDCcAt6zInuJUjwBT1km8Vw2WuQULLQ4a93Qap1zmKDOR466y0a8bk8+2tMfJj9lrIHT2y1gpcQJ87VJfN7Pv4M8zCIeqFMZ8MAhsM0TbtCAI2ozVI55CWhKFWIRdJit0U3OqIo9TQsfhG3u9q4FfojR46k4jnYr4+TiZsLRRg2ngJu1OjB8AsbaY6zfh0tAie2uczz7AzwiYEsgDbUaD+Y47hmsNV+3+/2RzXjkFFwV4JSlwq3MRG+pUI0VDmafGBGwwKSsmbDdGbBTuZdU44NYWRYRcE5rxFQKL/vbK76K5oJiBOGrys3WHSMXIxPSEqcWNxMuUzk8HjiPVdY7lu3lXfE8MM9avF0ID0xxT1bOUfvAKPPsd9q1tiu105v5aE8vyVpCJdmN4EmJb0z0vUSLK/pYGUJJttGSQEl2BOzT6TaHXa5TVSo5DdkDuWGGPyV6LEzrH8QDhQ/CZnMdVOfLGL0Yx7BZRZx8Uf85LfO1bdlIxcuEI+1SMZxF6QazdXm0EB541sNZ88CvHtKFadbbqNEjVuIx3+ajPT0PfBfKhNNAnUSX552V2NDP6hAy4UJ3ZuX85mewWaXF1qHRqshuIwJO2BH2XrcldlmsVXXsm0nhg7DbEsvcEX3VW4xj2O3DOPl/mQl7iiKsJGU5IOAXUoeqkJiWshzAaN0StQVdvlai2+iBA5mC8JTVXrPZ9fb2+WaUP8Zb5EWsdio6pdSOUPbLpe1QmpvuGvXaCrJ0m3o1gy3zD/cHtFfrzUnxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTI2VDEwOjMzOjU2KzAyOjAwH4Za7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0yNlQxMDozMzo1NiswMjowMG7b4lMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" alt="Product Informtion Icon">
				<p class="TP084_ProductInfo_Text"><span class="TP084_View_ProductInfo">View</span><span class="TP084_Close_ProductInfo">Close</span> Product Information</p>
			</div>
			<div class="TP084_ProductInfo_Data_Wrap"></div>
			`); 

			bodyVar.classList.add('TP084');
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				categoryProduct,
				productInfoMarkUp
            };
        })();


        const testBuilder = {

            setupElements(){
        // Default running event
        utils.events.send('TP084', 'View', 'TP084 activated - Variation 1', {sendOnce: true});
				//Build Product Information

				cacheDom.categoryProduct.after(cacheDom.productInfoMarkUp);

				functionalityBuilder.TP084ProductInformationFunctions($('.TP084_ProductInfo_Text'));

				$('.TP084_ProductInfo_Wrapper').parent().addClass('TP084_ProductInfo_Product');
				functionalityBuilder.showMoreProducts();
            }

        };

        
        const functionalityBuilder = {
            //Builds the functions of the test

			TP084ProductInformationFunctions(element){
				(element).on("click", function(){
					utils.events.send('TP084', 'Click', 'View Product Information', {sendOnce: true});
					if(slideQ === false){
						slideQ = true;

						let TP084Wrapper = $(this).closest('.TP084_ProductInfo_Wrapper');
						let TP084DataWrapper = TP084Wrapper.next(".TP084_ProductInfo_Data_Wrap");

						if(TP084Wrapper.hasClass("TP084_Product_Info_Open")){
							TP084DataWrapper.slideUp(function(){
								slideQ = false;
							});
						} else {
							TP084DataWrapper.slideDown(function(){
								slideQ = false;
							});
						}
				
						//Toggle class to show correct text
						TP084Wrapper.toggleClass('TP084_Product_Info_Open');

						//Store the page URL on click
						let pageToRequest = $(this).closest('.product_item').find('a:first').attr('href');

						//Request page to retrieve product information

						//Function to make a request
						const TP084MakeRequest = (function(){
							
							$.get(pageToRequest)

								.done(function(data){
									$(data).find('.tp_detOverview').appendTo(TP084DataWrapper);
									TP084DataWrapper.slideDown(function(){
										slideQ = false;
									});
									$('html, body').animate({
										scrollTop: TP084DataWrapper.offset().top - 90
										
									}, {
										duration: 600,
										complete: function(){
											slideQ = false;
										}
									});
									})

								.fail(function(){
									const TP084RequestFailMarkup =(`
									<p class="TP084_RequestFailed">There was an error with your request, please click here to try again</p>
									`);

									TP084DataWrapper.append(TP084RequestFailMarkup);
									TP084DataWrapper.slideDown(function(){
										slideQ = false;
									});
									$('html, body').animate({
										scrollTop: TP084DataWrapper.offset().top - 90
										
									}, {
										duration: 600,
										complete: function(){
											slideQ = false;
										}
									});
									

									//Run data request function again on click, empty the data wrapper to remove error message
									TP084DataWrapper.find(".TP084_RequestFailed").on("click", function(){
										TP084DataWrapper.slideUp(function(){
											slideQ = false;
										});
										$('html, body').animate({
											scrollTop: TP084DataWrapper.offset().top - 90
											
										}, {
											duration: 600,
											complete: function(){
												slideQ = false;
											}
										});

										$(this).closest('.TP084_ProductInfo_Data_Wrap').empty();
										TP084MakeRequest();
									});
								});  

						});

						//Make request once
						if(TP084Wrapper.next(".TP084_ProductInfo_Data_Wrap").is(':empty')){
							TP084MakeRequest();
						}
					}
				});
			},

			showMoreProducts(){
				$('#show_more').on("click", function(){
					UC.poller([
						'.product_item:not(.TP084_ProductInfo_Product)', 
						() => {
							if ($('.product_item').length > $('.product_item.TP084_ProductInfo_Product').length) {
								return true;
							}
						}
					], function(){

						$('.TP084_ProductInfo_Wrapper').remove();

						/*
						$('.product_item:not(.TP084_ProductInfo_Product)').each(function(){
							let TP084MoreProduct = $(this);
							TP084MoreProduct.find('a:first').after(cacheDom.productInfoMarkUp);
							TP084MoreProduct.addClass('TP084_ProductInfo_Product');
							functionalityBuilder.TP084ProductInformationFunctions(TP084MoreProduct.find('.TP084_ProductInfo_Text'));
							
						
						});*/
					});

				});
			}
	
		};
	
	if(document.querySelector('body').classList.contains("pageType-CategoryPage")){
    	testBuilder.setupElements();
		}
    }    
})();