import { fullStory, events, getCookie, setCookie } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import searchHTML from './lib/search';

/* eslint-disable */
const Run = () => {
  let trackerName;
  let slideQ = false;
  const $ = window.jQuery;
  const doc = document;

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

    allAgencies[2].insertAdjacentHTML('afterend', '<div class="AC022_exra-agencies"></div><div class="AC022_refine-btn-wrap"><div class="AC022_more-agencies-header">' + Exp.cache.agencyResultsNum + ' more recruitment agencies available in your Job Role</div><a class="AC022_reveal-agencies">Load More<br /> Recruitment Agencies</a><a class="AC022_page-top">Narrow your search</a><div>');

    allAgencies.forEach((el, index) => {
      if(index > 2){
        doc.querySelector('.AC022_exra-agencies').appendChild(el);
      }
    });

    $('.AC022_reveal-agencies').on('click', function(){
      $('.paginator').show();
      $('.AC022_refine-btn-wrap').slideUp().off('click');
      $('.AC022_exra-agencies').slideDown();
    });
    
    $('.AC022_page-top').on('click', function(){
      $('html, body').animate({
          scrollTop: 0
      }, 1000, () => {
        document.querySelector('.AC029_reveal_search').click();
      });
    });
  }

  function revealOffices(){
    $('.AC022_view-wrap a').on('click', function(){
      const el = $(this);
      const elWrap = el.closest('.col-md-4');
      const offices = elWrap.find('.agency-address-line');

      el.toggleClass('AC022_hide-offices');
      offices.slideToggle();
    });
  }

  function addJobRole(){
    const jobBtn = $('.AC022_add-role');
    const subInd = $('.AC018_sub-industry');

    if(jobBtn.length > 0) {
      jobBtn.on('click', function(){
        subInd.addClass('AC022_glow');
      });

      subInd.on('click', function(){
        subInd.removeClass('AC022_glow');
      });
    }
  }

  function addLocation(){
    const locBtn = $('.AC022_add-loc');
    const locInput = $('.AC018_location-check .search-bar-input-container');

    if(locBtn.length > 0) {
      locBtn.on('click', function(){
        locInput.addClass('AC022_glow');
      });

      locInput.find('input').on('focus', function(){
        locInput.removeClass('AC022_glow');
      });
    }
  }
 
  const Exp = {
    settings: {
      ID: 'AC029',
      VARIATION: '1',
    },
    cache: (() => {
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

      const agencyResultsNum = 'See';

      let subTimeout;
      let timeout = null;

      const cndCookie = getCookie('empOrCand');

      subTimeout = () => {
        timeout = setTimeout(function(){
          const newSubSelect = $('.AC018_sub-industry select');
          const indSelect = $('.AC018_industry select');
          let subIndustrySelect = $('#input-skill-selector-dropdown');

					if(count == 40) {
						count = 0;
					}
					else if(Exp.cache.firstLoad === true){
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
							Exp.cache.firstLoad = false;
						}
						else{
							subTimeout();
							count++;
						}
					}
					else if(Exp.cache.prevOption !== $('#input-skill-selector-dropdown .dropdown-option:first-child').text()){
						Exp.cache.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
						
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

      bodyVar.classList.add('AC018', 'AC029_hide-modal');

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
        agencyResultsNum,
        cndCookie,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      Exp.URLChecker.run();
      Exp.search.contentBuilder();

      if (Exp.cache.cndCookie != 'emp' && Exp.cache.cndCookie != 'cnd') {
        Exp.header.contentBuilder();
        Exp.cndBind();
      } else {
        Exp.cache.bodyVar.classList.add('AC029_title-var');
        Exp.header.contentBuilder();
        $('#user-bar-handle').slideUp();
      }


      Exp.header.locationMarkup();
      // Exp.readMore.clickBinding();
      // Exp.readLess.clickBinding();

      Exp.selectBox.run();

      Exp.search.moveElements();

      Exp.favourite.clickBinding();

      // Build search functionality
      Exp.searchBuilder.getLocation();

      // Bind user functionality
      Exp.searchBuilder.getUserType();

      // Bind order by functionality
      Exp.searchBuilder.getOrderBy();

      // Create industry selects
      Exp.searchBuilder.getIndustry();

      Exp.searchBuilder.subIndustryClick();

      Exp.searchBuilder.submitButton();

      Exp.defaultSearchOptions.url();

      // Remove Preloader
      Exp.load.itemFade();

      sideNavScroll();
      hideAgencies();
      revealOffices();
      addJobRole();
      addLocation();
      Exp.revealSearch();
      Exp.revealSectors();
      Exp.trackingRefine();
      Exp.locationAlter();
    },
    services: {
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    URLChecker: {
			run(){
				if(Exp.cache.URL.match(/.*(agencysearch).*(skills|countysearch|bytown|byregion).*|.*(agencysearch.htm).*/)){
					Exp.cache.bodyVar.classList.add('AC018_location-page');
				}
			}
		},
    header: {
			// Click function for the mobile tab variation to show the hidden options
			contentBuilder(){
				// Create wrap for the title to be appended to
				Exp.cache.bodyVar.querySelector('.AC029_more-toggle').insertAdjacentHTML('afterbegin', `
          <div class="AC0018_title">
            <h2>Looking for a recruitment agency in london?</h2>
            <p>With over 1300 agencies listed in London alone, Agency Central is <strong>the</strong> Recruitment Agency search engine.</p>
            <div class="AC029_to-hide">
              <div class="AC029_user-type">
                <p>First of all are you:</p>
                <a class="AC029_job AC029_looking">Looking for a job</a>
                <a class="AC029_job AC029_hiring">Looking to hire staff</a>
              </div>
            </div>
          </div>
        `);
			},
			locationMarkup(){
				let locationText = Exp.cache.headerWrap.querySelectorAll('.page-description p');
        const seoText = document.querySelector('.AC018_search-refine');
        
        [].forEach.call(locationText, (item) => {
          seoText.insertAdjacentHTML('beforeend', '<p>' + item.innerText + '</p>');
        });
			}
		},
    search: {
			contentBuilder(){
				Exp.cache.mainContainer.insertAdjacentHTML('beforebegin', searchHTML);
				Exp.cache.searchResultsWrap = doc.querySelector('.AC018_results-wrap');

        const searchSec = Exp.cache.bodyVar.querySelector('.AC029_more-toggle');
        searchSec.parentNode.insertBefore(Exp.cache.searchWrap, searchSec.nextSibling);
			},
			moveElements(){
				const resultsBody = doc.querySelectorAll('#search-results-container .agency-result');
        let locVal = '';
        let subVal = '';
        const filter = doc.querySelector('#filter-form');
        const filterInner = doc.querySelectorAll('#filter-form .col-sm-3');

        if (filterInner.length > 3){
          filter.classList.add('AC022_job-variant');
        }

        if(doc.getElementById('input-location').value){
          locVal = $('#input-location').val();
        }
        else {
          Exp.cache.bodyVar.classList.add('AC022_no-loc');
        }

        if(doc.getElementById('input-skill-value').value){
          poller([
            () => {
              if($('.AC018_sub-industry option[value=' + $('#input-skill-value').val() + ']').length > 0){
                return true;
              }
            }
          ], function(){
            subVal = $('.AC018_sub-industry option[value=' + $('#input-skill-value').val() + ']').text();
            $('.AC022_match-sub').text(subVal);
          });
        }
        else {
          Exp.cache.bodyVar.classList.add('AC022_no-sub');
        }
		
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

					// if(resultJQ.find('.agency-address-line').length > 0){
					// 	resultJQ.find('.contact-options-container').parent().append(resultJQ.find('.agency-address-line'))
          //   .prepend(`
          //     <div class="AC022_match_wrap">
          //       <div class="AC022_match-closest">Closest Match</div>
          //       <div class="AC022_match-recruits">
          //         <p>Recruits in your Industry
          //           <span class="AC022_match-sub">${subVal}</span>
          //         </p>
          //       </div>
          //       <div class="AC022_match-recruits AC022_fail">
          //         <p>Recruits in your Industry? <br />
          //           <a class="AC022_add-role">Add your Job Role</a>
          //         </p>
          //       </div>
          //       <div class="AC022_match-area">
          //         <p>Recruits in your area
          //           <span class="AC022_match-loc">${locVal}</span>
          //         </p>
          //       </div>
          //       <div class="AC022_match-area AC022_fail">
          //         <p>Recruits in your area? <br />
          //           <a class="AC022_add-loc">Add your Location</a>
          //         </p>
          //       </div>
          //       <div class="AC022_view-wrap">
          //         <a><span>View office locations</span><span>Hide office locations</span></a>
          //       </div>
          //     </div>
          //   `);
					// } 
					// if(resultContainer.querySelector('.agency-info-container + .col-md-4')){
					// 	resultContainer.insertBefore(resultContainer.querySelector('.agency-info-container + .col-md-4'), resultContainer.querySelector('.agency-info-container'));
					// }
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
		},
    // readMore: {
		// 	// Hide some content thats no longer used
		// 	clickBinding(){
		// 		doc.querySelector('.AC018_read-more').addEventListener('click', () => {
		// 			Exp.cache.bodyVar.classList.add('AC018_read-more');
		// 		});
		// 	}
		// },
    // readLess: {
		// 	// Hide some content thats no longer used
		// 	clickBinding(){
		// 		doc.querySelector('.AC018_read-less').addEventListener('click', () => {
		// 			Exp.cache.bodyVar.classList.remove('AC018_read-more');
		// 		});
		// 	}
		// },
    selectBox: {
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
		},
    favourite: {
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
		},
		searchBuilder: {
			getLocation(){
				let locationWrap = $('#input-location').closest('.search-bar-input-container');
				const currentLocation = $('.AC018_location-check');
				const locationLabel = currentLocation.find('label');

				locationWrap.appendTo(currentLocation);

				locationWrap = currentLocation.find('.search-bar-input-container');

				locationLabel.on('click', function(){
					locationLabel.fadeOut(300);
					locationWrap.fadeIn(300);
					//locationWrap.find('input').val("").focus();
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

				poller([
					function() {
						industrySelect.click();
						if($('#industry-modal-container .col-lg-3 .category-container').length > 0){
							return true;
						}
					}
				], function() {
					poller([
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

							Exp.cache.prevOption = $('#input-skill-selector-dropdown .dropdown-option:first-child').text();
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
						clearTimeout(Exp.cache.subTimeout); 
						// Load sub industry options
						searchBuilder.getSubIndustry();
					}
				});
			},
			getSubIndustry(){
				function checkOptions() {
					Exp.cache.subTimeout();
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
		},
		defaultSearchOptions: {
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
		},
		load: {
			itemFade(){
				setTimeout(function(){
					$('.AC018_pre-load').fadeOut();
					$('#search-results-container').fadeIn(function(){
						$(this).addClass('AC018_active');
					});
				}, 500);
			}
		},
    cndBind(){
      const lookingBtn = doc.querySelector('.AC029_looking');
      const searchingBtn = doc.querySelector('.AC029_hiring');
      const lookingWrap = $('.AC0018_title .AC029_to-hide');

      lookingBtn.addEventListener('click', () => {
        setCookie('empOrCand', 'cnd');
        lookingWrap.slideUp();
        events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Looking for a job', { sendOnce: true });
      });

      searchingBtn.addEventListener('click', () => {
        setCookie('empOrCand', 'emp');
        lookingWrap.slideUp();
        events.send(`${Exp.settings.ID}`, 'Click', 'User clicked Looking to hire staff', { sendOnce: true });
      });
    },
    revealSearch(){
      const revealBtn = Exp.cache.bodyVar.querySelector('.AC029_reveal_search');
      const searchSec = $('.AC029_more-toggle');
      const oldSearch = $('#search-bar-container');
      const revealLocation = document.querySelector('.AC029_refine-sector + .AC029_refine-sector .AC029_reveal_more_sectors');

      revealBtn.addEventListener('click', () => {
        searchSec.slideUp();
        oldSearch.slideDown();
        events.send(`${Exp.settings.ID}`, 'Click', `User clicked More Search Options`, { sendOnce: true });
        $('#input-industry-selector').on('click', () => {
          Exp.cache.bodyVar.classList.remove('AC029_hide-modal');
        });
      });
      
      revealLocation.addEventListener('click', () => {
        searchSec.slideUp();
        oldSearch.slideDown();
        events.send(`${Exp.settings.ID}`, 'Click', `User clicked View all Locations`, { sendOnce: true });
        $('#input-industry-selector').on('click', () => {
          Exp.cache.bodyVar.classList.remove('AC029_hide-modal');
        });
      });
    },
    revealSectors() {
      const revealSector = document.querySelector('.AC029_refine-sector:first-child > .AC029_reveal_more_sectors');
      const revealAllSector = document.querySelector('.AC029_move-to-search.AC029_reveal_more_sectors');
      const searchSec = $('.AC029_more-toggle');
      const oldSearch = $('#search-bar-container');

      revealSector.addEventListener('click', () => {
        if (revealSector.previousElementSibling.classList.contains('AC029_reveal-tgl')) {
          revealSector.previousElementSibling.classList.remove('AC029_reveal-tgl');
        } 
        else {
          revealSector.previousElementSibling.classList.add('AC029_reveal-tgl');
        }
      });

      revealAllSector.addEventListener('click', () => {
        searchSec.slideUp();
        oldSearch.slideDown();
        events.send(`${Exp.settings.ID}`, 'Click', `User clicked View all Sectors`, { sendOnce: true });
        $('#input-industry-selector').on('click', () => {
          Exp.cache.bodyVar.classList.remove('AC029_hide-modal');
        });
      });

    },
    trackingRefine() {
      const refineBy = document.querySelectorAll('.AC029_refine-btn');
      [].forEach.call(refineBy, (item) => {
        item.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', `User clicked ${item.innerText} refine by button`, { sendOnce: true });
        });
      });
    },
    locationAlter() {
      if (window.location.search.indexOf('centralLondon') > -1) {
        Exp.cache.bodyVar.classList.add('AC029_location-ver');
        document.querySelector('.search-bar-input').value = '';
        document.querySelector('.AC018_search-refine h2').innerText = 'Learn more about the Central London recruitment market';
      } else if (window.location.search.indexOf('eastLondon') > -1) {
        Exp.cache.bodyVar.classList.add('AC029_location-ver');
        document.querySelector('.search-bar-input').value = '';
        document.querySelector('.AC018_search-refine h2').innerText = 'Learn more about the East London recruitment market';
      } else if (window.location.search.indexOf('northLondon') > -1) {
        Exp.cache.bodyVar.classList.add('AC029_location-ver');
        document.querySelector('.search-bar-input').value = '';
        document.querySelector('.AC018_search-refine h2').innerText = 'Learn more about the North London recruitment market';
      } else if (window.location.search.indexOf('southLondon') > -1) {
        Exp.cache.bodyVar.classList.add('AC029_location-ver');
        document.querySelector('.search-bar-input').value = '';
        document.querySelector('.AC018_search-refine h2').innerText = 'Learn more about the South London recruitment market';
      } else if (window.location.search.indexOf('westLondon') > -1) {
        Exp.cache.bodyVar.classList.add('AC029_location-ver');
        document.querySelector('.search-bar-input').value = '';
        document.querySelector('.AC018_search-refine h2').innerText = 'Learn more about the West London recruitment market';
      }
    },
  };
    Exp.init();
};

export default Run;
