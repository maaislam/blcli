/* eslint-disable */
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const MP068 = (() => {
    let $ = null;
    
	const activate = () => {
		const $body = $('body');
		$body.addClass('MP068');
		

		const markup = $(`
		<div class="MP068-breadcrumb">
      <div class="MP068-behaviour_crumb MP068-crumb-wrap">
      <div class="MP068-button">
        <a href="#"><p></p> <span class="MP068-crumb"/></a>
      </div>
			</div>
    </div>`);
  
		//if the prevous URL is not this url/refreshed run this
		markup.insertAfter('#js-header');
		
		const currentBreadcrumb = $('.breadcrumb');
    currentBreadcrumb.appendTo('.MP068-breadcrumb');

    if(window.innerWidth > 767){
      document.querySelector('.MP068-button p').textContent = 'Back to';
    }else {
      document.querySelector('.MP068-button p').textContent = 'Back';
    }


		const previousURL = document.referrer,
			thisURL = window.location.href;

		//if breadcrumb has mamas and papas shop in name, hide
		const breadcrumbItem = $('.breadcrumb_item:first');
		if(breadcrumbItem.text().indexOf('Mamas & Papas Shop') > -1){
			breadcrumbItem.addClass('MP068-item_shop');
		}

		$('<span class="MP068-breadcrumb_text"><p>or</p>Go to: </span>').insertBefore(breadcrumbItem);
			
		markup.find('.MP068-behaviour_crumb a').attr('href',previousURL);

		//Use ajax to pull the name of the previous page and apply to the breadcrumb
		$.ajax({
			url: previousURL,
			success: function(data) {
			  var d = document.createElement('div');
			  d.innerHTML = data;
			 
			 let prevPageName;
			 let UV = window.universal_variable;

			 //if coming from category or product page get the h1 and add to breadcrumb
				const categoryTitle = $(d).find('.plp-title .itemcountd').text();
				const productTitle = $(d).find('h1.productDetail_title strong').text().split("-");
				const brandPage = $(d).find('.main-carousel-section .content-holder h1').text();

				const searchPage = $(d).find('#js_siteSearch');

				const breadcrumbTitle = $('.MP068-behaviour_crumb span');
				if(previousURL.indexOf('search') > -1){
					breadcrumbTitle.text('Search results');
				}
				else if(categoryTitle){
					breadcrumbTitle.text(categoryTitle);
				}else if(productTitle){
					breadcrumbTitle.text(productTitle[0]);
				}else if(brandPage){
					breadcrumbTitle.text(brandPage);
				}
			
			}
    });
    
    //if the product page has select option hide the back button
    const selectBox = document.querySelector(".variant_options.mb-3 select");
    const selectedOption = selectBox ? selectBox.options[selectBox.selectedIndex] : null;

    const breadcrumb = document.querySelector('.MP068-behaviour_crumb');
    const orText = document.querySelector('.MP068-breadcrumb_text p');
    if(selectedOption && selectedOption.textContent.trim() === "Select option"){
      breadcrumb.classList.remove('MP068-hide_breadcrumb');
      orText.classList.remove('MP068-or_hidden');
    } else {
      breadcrumb.classList.add('MP068-hide_breadcrumb');
      orText.classList.add('MP068-or_hidden');
    }

		const behaviourCrumb = $('.MP068-behaviour_crumb a'),
		siteCrumb = $('breadcrumb .breadcrumb_item');
		//Events//
		behaviourCrumb.on('click', () => {
            utils.events.send('MP068', 'breadcrumb click', 'MP068 behaviour breadcrumb clicked', {
                sendOnce: true
            });
		});
		siteCrumb.on('click', () => {
            utils.events.send('MP068', 'breadcrumb click', 'MP068 site breadcrumb clicked', {
                sendOnce: true
            });
        });
	}

	// Audience conditions
	const triggers = ((options) => {
		UC.poller([
			'.pageType-ProductPage',
			() => {
				return !!window.jQuery;
			}
		], () => {
			$ = window.jQuery;
			utils.fullStory('MP068', 'Variation 1');
				activate();

		});
	})();

})();
