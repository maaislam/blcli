// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

import headerHTML from './lib/header.js';
import searchHTML from './lib/search.js';
import flickerPrevention from './lib/flickerPrevention';

flickerPrevention();

const AC018 = (() => {
	let trackerName,
		slideQ = false,
		$;

	const doc = document;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#favourites-navbar-button',
			'.breadcrumb',
			'.search-title-h2',
			'#input-industry-selector',
			'.contact-option-container .agency-primary-link',
			'.search-bar-input-container',
			'#input-location',
			() => {
				var version = detectIE();

				if (version === false) {
					if (window.jQuery) {
						$ = window.jQuery
						return true;
					}
				} 

				document.getElementById('details').innerHTML = window.navigator.userAgent;

				function detectIE() {
					var ua = window.navigator.userAgent;

					var msie = ua.indexOf('MSIE ');
					if (msie > 0) {
						return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
					}

					var trident = ua.indexOf('Trident/');
					if (trident > 0) {
						var rv = ua.indexOf('rv:');
						return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
					}

					var edge = ua.indexOf('Edge/');
					if (edge > 0) {
						return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
					}

					return false;
				}
			}
		], init);
	})();

	function init(){
		utils.fullStory('AC018', 'Variation 1');
		//utils.events.send('AC018', 'Submitted Trade Type', 'Non-Trade', true, 6, 'Non-Trade');
		//utils.events.send('AC018', 'Click', 'Show mobile clicked', true);

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = doc.querySelector('body');
			const URL = window.location.pathname;

			const breadcrumb = doc.querySelector('.breadcrumb');
			const headerWrap = doc.getElementById('content-panel');
			const searchWrap = doc.getElementById('search-bar-container');
			const mainContainer = doc.querySelector('.main-container');

			let prevOption;
			let firstLoad = true;

			let bannerWrap;
			let searchResultsWrap;

			let count = 0;
      let agencyResultsNum;

			let subTimeout,
				timeout = null;
			
			subTimeout = function(){
				timeout = setTimeout(function(){
					const newSubSelect = $('.AC018_sub-industry select');
					const indSelect = $('.AC018_industry select');
					let subIndustrySelect = $('#input-skill-selector-dropdown');

					if(count == 40) {
						count = 0;
					}
					else if(cacheDom.firstLoad === true){
						if($('#input-skill-selector-dropdown .dropdown-option').length > 1){
							subIndustrySelect.find('.dropdown-option').each(function(){
								let el = $(this),
									elText = el.text(),
									elData = el.attr('data-value'); 
								newSubSelect.append('<option value="' + elData + '">' + elText + '</option>');
							});

							if(window.location.search){
								let subStr = window.location.search.match("&skill=(.*)&location_id");
								$('.AC018_sub-industry select option[value="' + subStr[1] + '"]').attr('selected', 'selected');
							}
							else{
								$('.AC018_sub-industry select option:first-child').attr('selected', 'selected');
							}
							$('.AC018_sub-industry select').trigger('change');
							cacheDom.firstLoad = false;
						}
						else{
							subTimeout();
							count++;
						}
					}
					else if(cacheDom.prevOption !== $('#input-skill-selector-dropdown .dropdown-option:first-child').text()){
						cacheDom.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
						
						if(newSubSelect.find('option').length > 1){
							newSubSelect.empty(); 
							newSubSelect.append('<option>Main Industry Only</option>');
						}

						subIndustrySelect.find('.dropdown-option').each(function(){
							let el = $(this),
								elText = el.text(),
								elData = el.attr('data-value'); 

							newSubSelect.append('<option value="' + elData + '">' + elText + '</option>');
						});
		
						$('.AC018_sub-industry select option:first-child').attr('selected', 'selected');
						$('.AC018_sub-industry select').trigger('change');
						count = 0;
					}
					else{
						subTimeout();
						count++;
					}
				},200);
			};

			bodyVar.classList.add('AC018');
			
			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				URL,
				breadcrumb,
				headerWrap,
				bannerWrap,
				searchWrap,
				mainContainer,
				searchResultsWrap,
				prevOption,
				firstLoad,
				subTimeout,
        agencyResultsNum
			};
		})();

		const URLChecker = {
			run(){
				if(cacheDom.URL.match(/.*(agencysearch).*(skills|countysearch|bytown|byregion).*|.*(agencysearch.htm).*/)){
					cacheDom.bodyVar.classList.add('AC018_location-page');
					header.locationMarkup();
				}
			}
		}

		const header = {
			// Click function for the mobile tab variation to show the hidden options
			contentBuilder(){
				// Add core html
				cacheDom.breadcrumb.insertAdjacentHTML('beforebegin', headerHTML);

				// Cache Banner element
				cacheDom.bannerWrap = doc.querySelector('.AC018_banner');
				
				// Create wrap for the title to be appended to
				cacheDom.breadcrumb.insertAdjacentHTML('afterend', '<div class="AC0018_title"></div>');

				// Append header to element above
				doc.querySelector('.AC0018_title').appendChild(doc.querySelector('.search-title-h2'));

				// Remove un used text
				let text = doc.querySelector('.AC0018_title h2').innerHTML;
					text = text.replace('Use the search box above to find your ideal list of agencies.', '');

				// Change text to the stripped back version
				doc.querySelector('.AC0018_title h2').innerHTML = text;

        cacheDom.agencyResultsNum = doc.querySelector('.AC0018_title h2 strong:first-child').innerText;
			},
			locationMarkup(){
				cacheDom.bannerWrap.querySelector('.AC018_location').appendChild(cacheDom.headerWrap.querySelector('h1.page-title'));
				let locationText = cacheDom.headerWrap.querySelectorAll('.page-description p');

				for (let i = 0; locationText.length > i; i++){
					cacheDom.bannerWrap.querySelector('.AC018_location-text-reveal').insertBefore(locationText[i],cacheDom.bannerWrap.querySelector('.AC018_location-text-reveal .AC018_read-less'));
				}

				// Get substring of paragraph
				if(doc.querySelector('.AC018_location-text-reveal p:first-child').innerText.length > 510) {
					let subText = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.substring(0, 510).trim();
					doc.querySelector('.AC018_location-text-inner p').innerHTML = subText + '...';
				}
				else{
					if(doc.querySelector('.AC018_location-text-reveal p:first-child + p')){
						let subText = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.trim();

						let stringTotal = 510 - subText.length;
						let subText2 = doc.querySelector('.AC018_location-text-reveal p:first-child + p').innerHTML.trim();

						if(subText2.length > stringTotal){
							doc.querySelector('.AC018_location-text-inner p').innerHTML = subText + ' ' + subText2.substring(0, stringTotal) + '...';
						}
						else{
							doc.querySelector('.AC018_location-text-inner p').innerHTML = subText + ' ' + subText2 + '...';
						}
					}
					else{
						let subTextNoDot = doc.querySelector('.AC018_location-text-reveal p:first-child').innerHTML.trim();
						doc.querySelector('.AC018_location-text-inner p').innerHTML = subTextNoDot;
					}
				}
			}
		};

		const search = {
			contentBuilder(){
				cacheDom.mainContainer.insertAdjacentHTML('beforebegin', searchHTML);

				doc.querySelector('.AC018_results-header span').textContent = $('.AC0018_title .search-title-h2 strong:first-child').text();

				cacheDom.searchResultsWrap = doc.querySelector('.AC018_results-wrap');

			},
			moveElements(){
				const resultsBody = doc.querySelectorAll('#search-results-container .agency-result');
		
				for(let i = resultsBody.length - 1; i > -1; i--){
					// Cache current agency result row
					let resultsCurrent = resultsBody[i];
					let resultContainer = resultsCurrent.querySelector('.agency-body-container');
					let resultJQ = $(resultContainer);

					// Add clearfix for height fix
					resultJQ.addClass('clearfix');

					// Add markup for the contact options to be moved to
					$(resultContainer).after('<div class="AC018_contact-options clearfix"><div class="AC018_center-div clearfix"></div></div>');

					// Cache the new markup
					let contactOptions = resultsCurrent.querySelector('.AC018_contact-options .AC018_center-div');

					// If the website option exists move it
					if(resultJQ.find('.contact-option-container[data-action="website"] .agency-primary-link').length > 0){
						resultContainer.querySelector('.contact-option-container[data-action="website"] .agency-primary-link').textContent = 'Website';
						$(contactOptions).append(resultJQ.find('.contact-option-container[data-action="website"]'));
					}

					// If the telephone option exists move it
					if(resultJQ.find('.contact-option-container[data-action="telfax"] .agency-primary-link').length > 0){
						resultContainer.querySelector('.contact-option-container[data-action="telfax"] .agency-primary-link').textContent = 'Phone number';
						$(contactOptions).append(resultJQ.find('.contact-option-container[data-action="telfax"]'));
					}

					// If the more info option exists move it
					if(resultJQ.find('.extra-contact-action[data-action="moreinfo"]').length > 0){
						$(contactOptions).append(resultJQ.find('.extra-contact-actions-container .agency-primary-link:first-child'));
						$(contactOptions).append(resultJQ.find('.extra-contact-action[data-action="moreinfo"]'));
					}

					// If the email option exists move it
					if(resultJQ.find('.contact-option-container[data-action="email"]').length > 0){
						$(contactOptions).append(resultJQ.find('.contact-option-container[data-action="email"]'));
					}

					if(resultContainer.querySelector('.add-to-favourites-link')){
						resultJQ.find('.agency-title').parent().append(resultJQ.find('.extra-contact-action[data-action="favourite"]'));
					}

					if(resultJQ.find('.agency-address-line').length > 0){
						resultJQ.find('.contact-options-container').parent().append(resultJQ.find('.agency-address-line'));
					}

					if(resultContainer.querySelector('.agency-info-container + .col-md-4')){
						resultContainer.insertBefore(resultContainer.querySelector('.agency-info-container + .col-md-4'), resultContainer.querySelector('.agency-info-container'));
					}
				}

				$('.expand-addresses').off('click').on('click', function(){
					let $this = $(this);
					let $otherAddresses = $this.closest('.agency-address-line').find('.other-addresses');
					if ($otherAddresses.is(':visible')) {
						$otherAddresses.slideUp();
						$otherAddresses.next('.expand-addresses').find('span').html('Show more offices <i class="fa fa-chevron-down"></i>');
					} else {
						$otherAddresses.slideDown();
						$otherAddresses.next('.expand-addresses').find('span').html('Show less offices <i class="fa fa-chevron-up"></i>');
					}
				});

				const locationShowMore = doc.querySelectorAll('.expand-addresses span');
				for(let i = locationShowMore.length - 1; i > -1; i--){
					locationShowMore[i].innerHTML = 'Show more offices <i class="fa fa-chevron-down"></i>';
				}

				doc.querySelector('.AC018_search-results').insertBefore(doc.getElementById('search-results-container'), null);
			}
		}

		const readMore = {
			// Hide some content thats no longer used
			clickBinding(){
				doc.querySelector('.AC018_read-more').addEventListener('click', () => {
					cacheDom.bodyVar.classList.add('AC018_read-more');
				});
			}
		};

		const readLess = {
			// Hide some content thats no longer used
			clickBinding(){
				doc.querySelector('.AC018_read-less').addEventListener('click', () => {
					cacheDom.bodyVar.classList.remove('AC018_read-more');
				});
			}
		};

		const selectBox = {
			run() {
				$.each($('.AC018_select'), function () {
					let el = $(this),
						span = el.find('span'),
						sel = el.find('select');
					span.html(sel.find('option:selected').text());

					sel.change(function () {
						span.html(sel.find('option:selected').text());
					});
				});
			}
		}

		const favourite = {
			clickBinding(){
				const favElement = doc.querySelectorAll('.add-to-favourites-link');

				for(let i = favElement.length - 1; i > -1; i--){
					if(favElement[i].querySelector('a').textContent.indexOf('Remove') > -1){
						favElement[i].classList.add('AC018_active');
					}
					favElement[i].addEventListener('click', function(){
						this.classList.toggle('AC018_active')
					});	
				}
			}
		}

		const searchBuilder = {
			getLocation(){
				let locationWrap = $('#input-location').closest('.search-bar-input-container');
				const currentLocation = $('.AC018_location-check');
				const locationLabel = currentLocation.find('label');

				locationWrap.appendTo(currentLocation);

				locationWrap = currentLocation.find('.search-bar-input-container');

				locationLabel.on('click', function(){
					locationLabel.fadeOut(300);
					locationWrap.fadeIn(300);
					locationWrap.find('input').val("").focus();
				});

				if(currentLocation.find('#input-location').val() == ''){
					locationLabel.click();
				}
				else{
					locationLabel.find('span').text(currentLocation.find('#input-location').val());
				}
			},
			getIndustry(){
				const industrySelect = $('#input-industry-selector');
				const compactSelect = $('.AC018_industry select');
				const subIndSelect = $('.AC018_sub-industry select');
				let industryModal;

				UC.poller([
					function() {
						industrySelect.click();
						if($('#industry-modal-container .col-lg-3 .category-container').length > 0){
							return true;
						}
					}
				], function() {
					UC.poller([
						'#industry-modal-container',
						'#industry-modal-container .col-lg-3 .category-heading',
						'#industry-modal-container .col-lg-3 .category-container',
					], function(){
						industryModal = $('#industry-modal-container');
						
						industryModal.find('.col-lg-3 .category-heading').each(function(){
							let el = $(this),
								elText = el.text(),
								optionWrap = el.next('.category-container'); 

							compactSelect.append('<optgroup label="' + elText + '"></optgroup>');
							
							let compactOptgroup = compactSelect.find('optgroup:last-child');

							optionWrap.find('.industry-choice').each(function(){
								let el = $(this),
									elData = el.attr('data-value'),
									elText = el.text();

									compactOptgroup.append('<option value="' + elData + '">' + elText + '</option>');
							});

							cacheDom.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
						});
						
						let sub = window.location.search;
						let subStr = sub.match("&industry=(.*)&skill");

						if(subStr == null){
							if(industrySelect.find('.option-text').length > 0){
								let indText = $.trim(industrySelect.find('> .dropdown-icon-container').text());

								compactSelect.find("option:contains('" + indText + "')").attr('selected', 'selected');
							}
							else{
								$('.AC018_industry select > option:first-child').attr('selected', 'selected');
							}
						}
						else{
							$('.AC018_industry select option[value="' + subStr[1] + '"]').attr('selected', 'selected');
						}
						$('.AC018_industry select').trigger('change');
					});

				}, {
					wait: 200
				});

				compactSelect.on('change', function(){
					var el = $(this),
						elOption = el.find('option:selected'),
						elData = elOption.val();

					if(elOption.is(el.find('> option'))){
						subIndSelect.empty();
						subIndSelect.append('<option>Main Industry Only</option>');
						subIndSelect.find('option').attr('selected', 'selected');
						subIndSelect.trigger('change');
					}
					else{
						industryModal.find('.col-lg-3 .industry-choice[data-value="' + elData + '"]').click();
						clearTimeout(cacheDom.subTimeout); 
						// Load sub industry options
						searchBuilder.getSubIndustry();
					}
				});
			},
			getSubIndustry(){
				function checkOptions() {
					cacheDom.subTimeout();
				}
				checkOptions();
			},
			subIndustryClick(){
				const newSubSelect = $('.AC018_sub-industry select');

				newSubSelect.on('change', function(){
					var el = $(this),
						elOption = el.find('option:selected'),
						elData = elOption.val();

					if(elOption.text() == 'Please select an Industry'){
					}
					else{
						$('#input-skill-selector-dropdown .dropdown-option[data-value="' + elData + '"]').click();
					}
				});
			},
			getOrderBy(){
				const orderSelect = $('#input-order-selector-dropdown');
				const orderSpecialist = orderSelect.find('.dropdown-option[data-value="standard"]');
				const orderCover = orderSelect.find('.dropdown-option[data-value="covers"]');

				const orderOptionsWrap = $('.AC018_order_radio-wrap');
				const orderOptions = orderOptionsWrap.find('.AC018_order_radio');
				// const newOrderSpecialist = orderOptionsWrap.find('.AC018_special-option');
				// const newOrderCover = orderOptionsWrap.find('.AC018_cover-option');
				
				// set default to all
				orderCover.click();
				
				// on option click, check if its a new radio option and remove active class from previous, then click the old form option for the new radio click
				orderOptions.on('click', function(){
					let el = $(this);
					if(el.hasClass('AC018_active')){	
						//if it has class do nothing because its already the current option					
					}
					else{
						if(el.hasClass('AC018_special-option')){
							orderSpecialist.click();
						}
						else if(el.hasClass('AC018_cover-option')){
							orderCover.click();
						}
						
						orderOptions.removeClass('AC018_active');
						el.addClass('AC018_active')
					}
				});
			},
			getUserType(){
				// Old form fake select box
				const userType = $('#input-user-type-selector');
				const candOption = userType.find('.dropdown-option[data-value="cnd"]');
				const empOption = userType.find('.dropdown-option[data-value="emp"]');
				const neitherOption = userType.find('.dropdown-option[data-value="neither"]');

				// New radio buttons
				const userRadioWrap = $('.AC018_looking-for');
				const newOptions = userRadioWrap.find('.AC018_refine_radio-wrap');
				// const newAllOption = userRadioWrap.find('.AC018_all-option');
				// const newEmpOption = userRadioWrap.find('.AC018_emp-option');
				// const newCandOption = userRadioWrap.find('.AC018_cnd-option');

				// set default to all
				neitherOption.click();
				
				// on option click, check if its a new radio option and remove active class from previous, then click the old form option for the new radio click
				newOptions.on('click', function(){
					let el = $(this);
					if(el.hasClass('AC018_active')){	
						//if it has class do nothing because its already the current option					
					}
					else{
						if(el.hasClass('AC018_all-option')){
							neitherOption.click();
						}
						else if(el.hasClass('AC018_emp-option')){
							empOption.click();
						}
						else if(el.hasClass('AC018_cnd-option')){
							candOption.click();
						}
						
						newOptions.removeClass('AC018_active');
						el.addClass('AC018_active')
					}
				});
			},
			submitButton(){
				const submitBtn = $('.search-bar-button-inline');
				const indSelect = $('.AC018_industry select');

				$('.AC018_refine-cta').on('click', function(){
					if(indSelect.val().toLowerCase().indexOf('please select an industry') > -1){
						indSelect.parent().addClass('AC018_error');
						$('.AC018_refine-error').show();
					}
					else{
						submitBtn.click();
					}
				});
			}
		}

		const defaultSearchOptions = {
			url(){
				const URLQuery = window.location.search;

				if(URLQuery.indexOf('&emp_cand=emp') > -1){
					$('.AC018_emp-option').click();
				}
				else if(URLQuery.indexOf('&emp_cand=cnd') > -1){
					$('.AC018_cnd-option').click();
				}
				if(URLQuery.indexOf('&order=standard') > -1){
					$('.AC018_special-option').click();
				}
			}
		}

		const load = {
			itemFade(){
				setTimeout(function(){
					$('.AC018_pre-load').fadeOut();
					$('#search-results-container').fadeIn(function(){
						$(this).addClass('AC018_active');
            $(document).scrollTop(0);
					});
				}, 500);
        setTimeout(function(){
          const hide = document.getElementById('AC018_flickerPrevention');
          hide.parentElement.removeChild(hide);
        }, 1000);
			}
		}

    function sideNavScroll() {
      $(".AC018_search-refine").css("max-height", ($(window).height() - 76) + 'px');

      $(window).scroll(function () {
        $(".AC018_search-refine").each(function () {
          var adParent = $(this).closest(".AC018_search-wrap"),
            adOffset = adParent.offset().top,
            adParentBot = adOffset + adParent.height(),
            elHeight = $(this).height(),
            negSpacing = 40;

          if ($(window).scrollTop() >= adOffset - negSpacing) {
            if ($(window).scrollTop() >= (adParentBot - elHeight) - 32) {
            } else {
              $(this).css("top", $(window).scrollTop() - adOffset + negSpacing);
            }
          }
          else{
            $(this).css("top", '0px');
          }
        });
      });
    }

    function hideAgencies(){
      const allAgencies = doc.querySelectorAll('#search-results-container .agency-result');

      allAgencies[2].insertAdjacentHTML('afterend', '<div class="AC022_exra-agencies"></div><div class="AC022_refine-btn-wrap"><div class="AC022_more-agencies-header">' + cacheDom.agencyResultsNum + ' more recruitment agencies available in your Job Role</div><a class="AC022_reveal-agencies">Load More<br /> Recruitment Agencies</a><a class="AC022_page-top">Narrow your search</a><div>');

      allAgencies.forEach((el, index) => {
        if(index > 2){
          doc.querySelector('.AC022_exra-agencies').appendChild(el);
        }
      });

      $('.AC022_reveal-agencies').on('click', function(){
        $('.AC022_refine-btn-wrap').slideUp().off('click');
        $('.AC022_exra-agencies').slideDown();
        utils.events.send('AC018', 'Clicked on show more agencies', 'User click', {sendOnce: true});
      });
      
      $('.AC022_page-top').on('click', function(){
        $('html, body').animate({
            scrollTop: $(".AC018_search-refine").offset().top - 40
        }, 1000);
        $('.AC018_search-refine').animate({
            scrollTop:  $(this).scrollTop() - $(this).offset().top + $('.AC018_search-refine').offset().top 
        }, 1000 == undefined ? 1000 : 1000); 
      });
    }

		header.contentBuilder();
		URLChecker.run();
		search.contentBuilder();

		readMore.clickBinding();
		readLess.clickBinding();

		selectBox.run();

		search.moveElements();

		favourite.clickBinding();

		// Build search functionality
		searchBuilder.getLocation();

		// Bind user functionality
		searchBuilder.getUserType();

		// Bind order by functionality
		searchBuilder.getOrderBy();

		// Create industry selects
		searchBuilder.getIndustry();

		searchBuilder.subIndustryClick();

		searchBuilder.submitButton();

		defaultSearchOptions.url();

		// Remove Preloader
		load.itemFade();
    sideNavScroll();
    hideAgencies();
	}	
})();