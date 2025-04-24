// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import searchMarkup from './lib/searchMarkup.js';
import indModal from './lib/industryModal.js';

const AC004 = (() => {
	let slideQ = false,
		$;

	const UCPoller = (() => {
		// Load Poller in seperate to other plugins to save on processing 
		// and only load libraries in when they are needed
		UC.poller([
			'#search-bar-container',
			'#search-bar-container #search-bar-body',
			() => {
				if (window.jQuery) {
					$ = window.jQuery
					return true;
				}
			}
		], init);
	})();

	function init() {
		utils.fullStory('AC004', 'Variation 1');

		const cacheDom = (() => {
			//Cache useful selectors for later use
			const bodyVar = document.body;

			const empOrCandCookie = utils.getCookie('empOrCand');

			const searchBar = $('#search-bar-container');
			const mainIndInput = $('#input-industry-value');
			const subIndInput = $('#input-skill-value');
			const orderInput = $('#input-order-value');
			const empOrCandInput = $('#input-emp-cand-value');

			let searchWrap,
				mainIndWrap,
				modalWrap,
				subIndWrap;

			bodyVar.classList.add('AC004');

			//Retun the selectors we want to reference in other parts of the test
			return {
				bodyVar,
				empOrCandCookie,
				searchBar,
				searchWrap,
				mainIndWrap,
				modalWrap,
				subIndWrap,
				mainIndInput,
				subIndInput,
				orderInput,
				empOrCandInput
			};
		})();

		const searchBuilder = {
			buildBase() {
				cacheDom.searchBar.after(searchMarkup);
				cacheDom.bodyVar.insertAdjacentHTML('beforeend', indModal);

				// Cache new elements
				cacheDom.searchWrap = $('.AC004_search_wrap');
				cacheDom.modalWrap = $('.AC004_industry_modal');
				cacheDom.mainIndWrap = cacheDom.modalWrap.find('.AC004_main-industries');
				cacheDom.subIndWrap = cacheDom.modalWrap.find('.AC004_sub-industries');

				$('#input-location').parent('.search-bar-input-container').appendTo(cacheDom.searchWrap.find('.AC004_location-wrap'));
        cacheDom.searchWrap.find('.AC004_location-wrap').append('<span class="AC004_error-text">Please select a location.</span>');
			}
		}

		const industry = {
			getIndustry() {
				$.ajax('/ajax/industry_modal')
					.done(function (response) {
						$(response).find('#industries-categorical .col-lg-3.visible-lg.col-resp').each(function () {
							let el = $(this),
								headerEl = el.find('h4.category-heading');

							cacheDom.mainIndWrap.append(`
								<div class="AC004_ind-wrap-inner"></div>
							`);

							headerEl.each(function(){
								let el = $(this),
									elText = el.text();

								cacheDom.mainIndWrap
									.find('.AC004_ind-wrap-inner:last-child')
									.append(`<h3>${elText}</h3>`);

								el.next('.category-container').find('> span').each(function(){
									let el = $(this),
										elText = el.text(),
										elData = el.attr('data-value');

									cacheDom.mainIndWrap.find('.AC004_ind-wrap-inner:last-child').append(`
										<a data-ind="${elData}" class="AC004_ind-link">${elText}</a>
									`);
								});
							});
						});

						mainIndClick.bind();
						indLoad.run();
					});
				// $.ajax('/ajax/industry_modal')
				// 	.done(function (response) {
				// 		$(response).find('#industries-categorical .col-lg-3.visible-lg.col-resp').each(function () {
				// 			let el = $(this),
				// 				headerEl = el.find('h4.category-heading:first-child'),
				// 				headerText = headerEl.text();

				// 			cacheDom.mainIndWrap.append(`
				// 			<div class="AC004_ind-wrap-inner">
				// 				<h3>${headerText}</h3>
				// 			</div>
				// 		`);

				// 			el.find('.category-container > span').each(function () {
				// 				let el = $(this),
				// 					elText = el.text(),
				// 					elData = el.attr('data-value');

				// 				cacheDom.mainIndWrap.find('.AC004_ind-wrap-inner:last-child').append(`
				// 				<a data-ind="${elData}" class="AC004_ind-link">${elText}</a>
				// 			`);
				// 			});
				// 		});

				// 		mainIndClick.bind();
				// 		indLoad.run();
				// 	});
			},
			getSubInd(subInd, subTitle) {
				let subIndString = 'https://www.agencycentral.co.uk/ajax/jobroles?industry=' + subInd;

				$.ajax(subIndString)
					.done(function (response) {
						let data = response.data;

						cacheDom.subIndWrap.append(`
					<div class="AC004_inner_sub AC004_active" data-sub-ind="${subInd}">
						<div>
							<h2>${subTitle} Sub-Sectors</h2>
							<div class="AC004_link-wrap">
							</div>
						</div>
					</div>
				`);

						for (let i = 0; i < data.length; i++) {
							data[i].skill_id
							cacheDom.subIndWrap.find('.AC004_inner_sub:last-child .AC004_link-wrap').append(`
						<a class="AC004_sub-button" data-sub-link="${data[i].skill_id}">${data[i].skill_name}</a>
					`);
						}

						cacheDom.subIndWrap.addClass('AC004_active');
						subIndClick.bind();

						setTimeout(function () {
							slideQ = false;
						}, 600);
					});
			}
		};

		const userTypeClick = {
			bind() {
				const userBtns = cacheDom.searchWrap.find('.AC004_user-type > div');

				userBtns.on('click', function () {
					let el = $(this);

					utils.events.send('AC004', 'Form Field', 'User clicked on ' + el.text(), true, {sendOnce: true});

					$('.AC004_user-type').removeClass('AC004_error');

					if (userBtns.hasClass('AC004_active')) {
						userBtns.removeClass('AC004_active');
					}
					el.addClass('AC004_active');
					cacheDom.empOrCandInput[0].value = el.data('option');
				});
			},
			detectUser() {
				if (cacheDom.empOrCandCookie != undefined || cacheDom.empOrCandCookie != null) {
					if (cacheDom.empOrCandCookie.toString().toLowerCase() == 'emp') {
						$('.AC004_emp-user').addClass('AC004_active');
						cacheDom.empOrCandInput[0].value = 'emp';
					} else if (cacheDom.empOrCandCookie.toString().toLowerCase() == 'cnd') {
						$('.AC004_cand-user').addClass('AC004_active');
						cacheDom.empOrCandInput[0].value = 'cnd';
					}
				}
			}
		}

		const mainIndClick = {
			bind() {
				$('.AC004_ind-link').on('click', function () {
					if (slideQ === false) {
						slideQ = true;

						let el = $(this),
							elSubIndData = el.data('ind');

						cacheDom.subIndWrap.find('.AC004_inner_sub.AC004_active').removeClass('AC004_active');

						if (cacheDom.subIndWrap.find('.AC004_inner_sub[data-sub-ind="' + elSubIndData + '"]').length > 0) {
							let currSub = cacheDom.subIndWrap.find('.AC004_inner_sub[data-sub-ind="' + elSubIndData + '"]');

							currSub.addClass('AC004_active');
							cacheDom.subIndWrap.addClass('AC004_active');

							setTimeout(function () {
								slideQ = false;
							}, 600);
						} else {
							industry.getSubInd(elSubIndData, el.text());
						}

						cacheDom.mainIndInput[0].value = elSubIndData;
						$('.AC004_pre_selected_ind').text(el.text());
						$('.AC004_ind-wrap').removeClass('AC004_error');
						utils.events.send('AC004', 'Form Field', 'Main Industry - User clicked on ' + el.text(), true, {sendOnce: true});
					}
				});
			}
		}

		const subIndClick = {
			bind() {
				let subBtn = $('.AC004_sub-button:not(.AC004_binded)');

				subBtn.each(function () {
					let el = $(this);
					el.addClass('AC004_binded');
					el.on('click', function () {
            const subLnk = el.data('sub-link');
            const mainLnk = el.closest('.AC004_inner_sub').data('sub-ind');

						cacheDom.subIndInput[0].value = subLnk;
						$('.AC004_close_btn').click();
						$('.AC004_pre_selected_ind').text($('.AC004_pre_selected_ind').text() + ' - ' + el.text());
						utils.events.send('AC004', 'Form Field', 'Sub Industry - User clicked on ' + el.text(), true, {sendOnce: true});
					
            if (subLnk == 'administration' && mainLnk == 'admin'
            || subLnk == 'alladminsecretarialskills' && mainLnk == 'admin'
            || subLnk == 'bilingual' && mainLnk == 'admin'
            || subLnk == 'pa' && mainLnk == 'admin'
            || subLnk == 'receiptionisttelephonist' && mainLnk == 'admin'
            || subLnk == 'secretarial' && mainLnk == 'admin'
            || subLnk == 'switchboard' && mainLnk == 'admin'
            || subLnk == 'typist' && mainLnk == 'admin'
            || subLnk == 'allagriculturalskills' && mainLnk == 'agriculture'
            || subLnk == 'arboricultureforestry' && mainLnk == 'agriculture'
            || subLnk == 'drivers' && mainLnk == 'agriculture'
            || subLnk == 'farmlabour' && mainLnk == 'agriculture'
            || subLnk == 'gisgeographicinformationsystems' && mainLnk == 'agriculture'
            || subLnk == 'horticulture' && mainLnk == 'agriculture'
            || subLnk == 'seasonalworkers' && mainLnk == 'agriculture'
            || subLnk == 'all' && mainLnk == 'catering'
            || subLnk == 'bars' && mainLnk == 'catering'
            || subLnk == 'confbanq' && mainLnk == 'catering'
            || subLnk == 'frontoffice' && mainLnk == 'catering'
            || subLnk == 'hotel-staff' && mainLnk == 'catering'
            || subLnk == 'housekeeping' && mainLnk == 'catering'
            || subLnk == 'kitchen' && mainLnk == 'catering'
            || subLnk == 'restaurant' && mainLnk == 'catering'
            || subLnk == 'sales' && mainLnk == 'catering'
            || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'catering'
            || subLnk == 'allconstructionskills' && mainLnk == 'construction'
            || subLnk == 'buildingandcivilstrades' && mainLnk == 'construction'
            || subLnk == 'buildingservicesmecontracting' && mainLnk == 'construction'
            || subLnk == 'civilstradesandlabour' && mainLnk == 'construction'
            || subLnk == 'commercialinteriors' && mainLnk == 'construction'
            || subLnk == 'contracting' && mainLnk == 'construction'
            || subLnk == 'mechanicalelectricaltradeslabour' && mainLnk == 'construction'
            || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'construction'
            || subLnk == 'allcustomerservicecallcentreskills' && mainLnk == 'custservcallcentre'
            || subLnk == 'businessservices' && mainLnk == 'custservcallcentre'
            || subLnk == 'customer' && mainLnk == 'custservcallcentre'
            || subLnk == 'languages' && mainLnk == 'custservcallcentre'
            || subLnk == 'operational' && mainLnk == 'custservcallcentre'
            || subLnk == 'technology' && mainLnk == 'custservcallcentre'
            || subLnk == 'training' && mainLnk == 'custservcallcentre'
            || subLnk == '75tonne' && mainLnk == 'driving'
            || subLnk == 'agriculture' && mainLnk == 'driving'
            || subLnk == 'alldrivingskills' && mainLnk == 'driving'
            || subLnk == 'commercial' && mainLnk == 'driving'
            || subLnk == 'courier' && mainLnk == 'driving'
            || subLnk == 'distribution' && mainLnk == 'driving'
            || subLnk == 'forklift' && mainLnk == 'driving'
            || subLnk == 'instructors' && mainLnk == 'driving'
            || subLnk == 'lgv' && mainLnk == 'driving'
            || subLnk == 'plant' && mainLnk == 'driving'
            || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'driving'
            || subLnk == 'inhousehardservices' && mainLnk == 'facilitiesmanagement'
            || subLnk == 'inhousesoftservices' && mainLnk == 'facilitiesmanagement'
            || subLnk == 'administration' && mainLnk == 'fashion'
            || subLnk == 'retail' && mainLnk == 'fashion'
            || subLnk == 'administration' && mainLnk == 'financialservices'
            || subLnk == 'ancillaryhospitalstaff' && mainLnk == 'health'
            || subLnk == 'generalpracticenonclinical' && mainLnk == 'health'
            || subLnk == 'allindustrialskills' && mainLnk == 'industrial'
            || subLnk == 'assemblers' && mainLnk == 'industrial'
            || subLnk == 'cleaning' && mainLnk == 'industrial'
            || subLnk == 'domestic' && mainLnk == 'industrial'
            || subLnk == 'drilling' && mainLnk == 'industrial'
            || subLnk == 'drivers' && mainLnk == 'industrial'
            || subLnk == 'foodprocessing' && mainLnk == 'industrial'
            || subLnk == 'forklift' && mainLnk == 'industrial'
            || subLnk == 'gardening' && mainLnk == 'industrial'
            || subLnk == 'injectionmoulding' && mainLnk == 'industrial'
            || subLnk == 'jigging' && mainLnk == 'industrial'
            || subLnk == 'loaders' && mainLnk == 'industrial'
            || subLnk == 'lobouring' && mainLnk == 'industrial'
            || subLnk == 'machineoperating' && mainLnk == 'industrial'
            || subLnk == 'orderpickers' && mainLnk == 'industrial'
            || subLnk == 'packers' && mainLnk == 'industrial'
            || subLnk == 'painting' && mainLnk == 'industrial'
            || subLnk == 'parcelsorters' && mainLnk == 'industrial'
            || subLnk == 'portering' && mainLnk == 'industrial'
            || subLnk == 'powdercoating' && mainLnk == 'industrial'
            || subLnk == 'pressingproduction' && mainLnk == 'industrial'
            || subLnk == 'productionline' && mainLnk == 'industrial'
            || subLnk == 'refusecollection' && mainLnk == 'industrial'
            || subLnk == 'soldering' && mainLnk == 'industrial'
            || subLnk == 'tapping' && mainLnk == 'industrial'
            || subLnk == 'typefitting' && mainLnk == 'industrial'
            || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'industrial'
            || subLnk == 'warehouseoperatives' && mainLnk == 'industrial'
            || subLnk == 'administration' && mainLnk == 'industrial'
            || subLnk == 'all' && mainLnk == 'retail'
            || subLnk == 'security' && mainLnk == 'retail'
            || subLnk == 'uksuppliersofinternationalworkers' && mainLnk == 'retail'
            ) {
              $('.AC004_order-wrap').addClass('AC004_hide-special').removeClass('AC004_hide-distance');
              $('.AC004_specialist').removeClass('AC004_active');
            } else {
              $('.AC004_order-wrap').addClass('AC004_hide-distance').removeClass('AC004_hide-special');
              $('.AC004_cover-other_location').removeClass('AC004_active');
            }
          });
				});
			}
		}

		const modalBack = {
			bind() {
				$('.AC004_sub-back').on('click', function () {
					if (slideQ === false) {
						cacheDom.subIndWrap.removeClass('AC004_active');
					}
					utils.events.send('AC004', 'Modal', 'User clicked on back button', true, {sendOnce: true});
				});
			}
		}

		const modalOpen = {
			bind() {
				const modal = $('.AC004_industry_modal'),
					modalBG = modal.find('.AC004_bg');

				$(".AC004_pre_selected_ind, .AC004_industry_modal .AC004_close_btn").on("click", function (e) {
					if (slideQ === false) {
						slideQ = true;
						e.preventDefault();

						if (modal.hasClass("active")) {
							modal.fadeOut("slow", function () {
								modal.removeClass("active");
								cacheDom.bodyVar.classList.remove('AC004_overflow-body');
								cacheDom.subIndWrap.removeClass('AC004_active');
								utils.events.send('AC004', 'modal', 'User closed modal', true, {sendOnce: true});
								slideQ = false;
							});
						} else {

							modal.fadeIn("slow", function () {
								cacheDom.bodyVar.classList.add('AC004_overflow-body');
								utils.events.send('AC004', 'modal', 'User opened modal', true, {sendOnce: true});
								modal.addClass("active");
								slideQ = false;
							});

							modalBG.on("mousedown touchstart", function () {
								if (modal.hasClass("active")) {
									modal.fadeOut("slow", function () {
										cacheDom.bodyVar.classList.remove('AC004_overflow-body');
										modal.removeClass("active");
										cacheDom.subIndWrap.removeClass('AC004_active');
									});
								}
							});
						}
					}
				});
			}
		}

		const orderBy = {
			optionClick() {
				const orderWrap = cacheDom.searchWrap.find('.AC004_order-wrap'),
					orderOptions = orderWrap.find('> div');

				orderOptions.on('click', function () {
					let el = $(this),
						elData = el.data('option');

					utils.events.send('AC004', 'Form Field', 'User clicked on ' + el.text(), true, {sendOnce: true});

					orderWrap.removeClass('AC004_error');

					if (!el.hasClass('AC004_active')) {
						if (orderOptions.hasClass('AC004_active')) {
							orderOptions.removeClass('AC004_active');
						}
						el.addClass('AC004_active');
						cacheDom.orderInput[0].value = elData;
					}
				});
			}
		}

		const agencySearch = {
			submitClick() {
				$('.AC004_search-btn').on('click', function () {
					let validationCheck = true;

					if (!$('.AC004_user-type > div').hasClass('AC004_active')) {
						validationCheck = false;
						$('.AC004_user-type').addClass('AC004_error');
					}
					if ($('.AC004_pre_selected_ind').text().indexOf('Please select an industry') > -1) {
						validationCheck = false;
						$('.AC004_ind-wrap').addClass('AC004_error');
					}
					if ($('#input-location-id-value').val() == '' || !$('#input-location-id-value').val()) {
						validationCheck = false;
						$('.AC004_location-wrap').addClass('AC004_error');
					}
					if (!$('.AC004_order-wrap > div').hasClass('AC004_active')) {
						validationCheck = false;
						$('.AC004_order-wrap').addClass('AC004_error');
					}

					if (validationCheck === true) {
						utils.events.send('AC004', 'Form Field', 'User clicked on submit', true, {sendOnce: true});
						$('.search-bar-input-container button.search-bar-button-inline').click();
					}
					else{
						utils.events.send('AC004', 'Form Field', 'User clicked on submit but got errors', true, {sendOnce: true});
					}
				});

				$('#input-location').on('keyup', function () {
					$('.AC004_location-wrap').removeClass('AC004_error');
					utils.events.send('AC004', 'Form Field', 'User typed in location', true, {sendOnce: true});
				});
			}
		}

		const indLoad = {
			run() {
				if (window.location.pathname.indexOf('/agencysearch/') > -1) {
					let indString = $('#input-industry-selector .option-text').text() + ' - ' + $('#input-skill-selector .option-text').text();
					$('.AC004_pre_selected_ind').text(indString);

					if (window.location.search.indexOf('&order=covers') > -1) {
						$('.AC004_cover_location').click();
					} else if (window.location.search.indexOf('&order=standard') > -1) {
						$('.AC004_specialist').click();
					}
				}
			}
		}

		const searchReveal = {
			bind() {
				$('.AC004_header').on('click', function () {
					if ($(window).width() < 768) {
						$('.AC004_col-wrap').slideToggle();
						utils.events.send('AC004', 'Form Field', 'Mobile user opened search', true, {sendOnce: true});
					}
				});
			}
		}

		searchBuilder.buildBase();

		userTypeClick.bind();
		modalBack.bind();
		modalOpen.bind();
		orderBy.optionClick();
		userTypeClick.detectUser();
		agencySearch.submitClick();
		searchReveal.bind();

		industry.getIndustry();
	}
})();