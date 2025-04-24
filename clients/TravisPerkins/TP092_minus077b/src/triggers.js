/* eslint-disable */

var experiment = {
	id: 'TP024',
	jQ: false,
	trackername: null,
	beforeTarget: null,

	utils: {
		// UC Library
		poller: function(t,e,n){var i={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(n)for(var u in n)i[u]=n[u];else n=i;for(var o=!!i.timeout&&new Date(r()+i.timeout),f=i.wait,l=i.multiplier,a=[],c=function(n,i){if(o&&r()>o)return!1;i=i||f,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(a.push(!0),a.length===t.length&&e()):setTimeout(function(){c(n,i*l)},i)},m=0;m<t.length;m++)c(t[m])},
		observer: {active:[],connect:function(t,e,n){var i={throttle:1e3,config:{attributes:!0,childList:!0,subtree:!1}};if(n)for(var o in n)i[o]=n[o];else n=i;for(var r,c=new MutationObserver(function(n){n.forEach(function(n){r||(r=!0,e(t,n),setTimeout(function(){r=!1},i.throttle))})}),f=0;f<t.length;f++)c.observe(t[f],i.config),this.active.push([t[f],c])},disconnect:function(t){for(var e=this.active,n=0;n<t.length;n++)for(var i=t[n],o=0;o<e.length;o++)i===e[o][0]&&e[o][1].disconnect()}},
	},

	modules: {
		analytics: {
			sendEvent: function(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};this.trackerName?c(this.trackerName):experiment.utils.poller([function(){return window.ga.getAll}],function(){this.trackerName=window.ga.getAll()[0].get("name"),c(this.trackerName)})},

			eventStatus: {
				clickAndCollectShown: false,
				clickAndCollectClicked: false,
				checkStockClicked: false
			},

			fullStory: function() {
				experiment.utils.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"TP024",variation_str:"Variation 1 Desktop"})},{multiplier:1.2,timeout:0});
			},

			GA: function() {
				var $ = experiment.jQ,
					status = this.eventStatus,
					sendEvent = this.sendEvent;

				// Click events
				$('#stock_results').one('click', '.TP024_clickAndCollect', function() {
					if (!status.clickAndCollectClicked) {
						//sendEvent('TP024 - Desktop', 'Click', 'Clicked add for collection', true);
						status.clickAndCollectClicked = true;
					}
				});
			},

			init: function() {
				this.fullStory();
				this.GA();
			}
		},

		clickAndCollect: {
			_render: function(component, store) {
				var $ = experiment.jQ;
				$(store).find('.tp_stockBranchPhone').after($(component));
			},

			_events: {
				triggerClickAndCollect: function() {
					var $ = experiment.jQ;
					var $branch = $(this).closest('.tp_stockBranch');
					var $addForCollectionForm = $('#collectionBranchLocatorPopup');

					// Get postcode
					var postcode = $branch.find('.tp_branchDetails_adress > p:last').text().trim();
					
					// Get branch name
					var name = $branch.find('.tp_branchDetails_name .title').text().trim().toLowerCase();

					// Close popup
					$(this).closest('#cboxLoadedContent').find('#cboxClose').trigger('click');

					// Open add for collection popup
					$('#addForCollectButton').trigger('click');
					
					// Add postcode
					$addForCollectionForm.find('input[name="postcode"]')[0].value = postcode;

					// Search for branch
					$addForCollectionForm.find('#collectionBranchLocatorButton').trigger('click');
					
					// Watch for mutation on closestBranchList to see if it has finished loading
					// When it is loaded, check if first result matches the branch name selected
					// If it does, trigger a click on the add for collection button
					var $closestBranchList = $addForCollectionForm.find('.closest-branch-list');
					var observer = experiment.utils.observer;
					
					function checkBranchList($list) {
						var branchFound = false;

						$list.each(function() {
							var branch = $(this);
							// If this is the branch selected, add for collection
							var branchName = $(this).find('.branch-name').text().trim().toLowerCase();

							if (branchName === name) {
								branchFound = true;
								branch.find('.addForCollectionButton').trigger('click');
								return false;
							}
						});

						return branchFound;
					}

					observer.connect($closestBranchList, function() {
						setTimeout(function() {
							var $loader = $closestBranchList.closest('#listView').siblings('#spinner'),
								hasLoaded = $loader.css('display') === 'none';

							if (hasLoaded) {
								// Check if branch is in "Branches you're already collecting from" list
								var $inUseBranches = $closestBranchList.siblings('.in-use-branch-list').find('.collection-branch-item');
								var branchFound = checkBranchList($inUseBranches);

								// If branch was not in the above list, check the "closest branch" list
								if (!branchFound) {
									var $closestBranches = $closestBranchList.find('.collection-branch-item');
									checkBranchList($closestBranches);
								}

								// Disconnect self
								observer.disconnect($closestBranchList);
							}
						}, 1000);
					}, { attributes: false, childList: true, subtree: true });

					// Fallback to disconnect mutationObserver after 8 seconds
					setTimeout(function() {
						observer.disconnect($closestBranchList);
					}, 8000);
				}
			},

			Component: function() {
				var $ = experiment.jQ;
				var $component = $('<a href="javascript:void(0)" class="TP024_clickAndCollect">Add for collection</div>');
				// Bind events
				$component.click(experiment.modules.clickAndCollect._events.triggerClickAndCollect);

				return $component;
			},

			init: function(store) {
				var component = new this.Component();
				this._render(component, store);
			}
		}
	},

	init: function() {
		var $ = experiment.jQ;
		var body = document.getElementsByTagName('body')[0];


		// Prevent experiment from running twice
		if (!body.classList || body.classList.contains('TP024')) return false;

		/* 
		
			TP092
		
		*/ 
		
		var stockInput = $('.form_field-input #q'),
			stockSubmit = $('#branchFinderButton');

		// $('.tpProductInfo').append(`
		// 	<div class="TP077B_CheckStock_Wrapper">
    //     <p class="TP077B_CheckStock_Header">Check stock</p>
    //     <p class="TP077B_CheckStock_Content">Check stock at your local branch</p>
    //     <div class="TP077B_SearchBox_Wrapper">
    //           <div class="TP077B_SearchBox">
    //             <input type="text" id="TP077B_PostcodeSearch" placeholder="Enter your postcode">
    //             <span class="TP077B_SearchButton">Search</span>
    //           </div>
    //     </div>
    //  </div>
		// `);

		$('.TP077B_SearchButton').on('click', function(){
			var val = $('#TP077B_PostcodeSearch').val();

			if(val){
				stockInput.val(val);
				stockSubmit.click();

				experiment.utils.poller([
					'#branches',
				], function(){
          //$('#collectionBranchLocatorButton').click();
					$('#stockCheckerButton').click();
					experiment.restructure();
				});
        experiment.utils.poller([
          () => {
            if (stockInput.val()) {

            } else {
              return true;
            }
          },
				], function(){
          stockInput.val(val);
				});
			}
      
		});

		$('#branchFinderButton').on('click', function(){
			experiment.restructure();
		});

		/* 
		
			TP092
		
		*/ 


		body.className += ' ' + 'TP024 TP092 '; // Namespace CSS

		experiment.modules.analytics.init();

		// Watch for mutations on this element
		var $container = $('#stock_results');
		
		var observer = experiment.utils.observer,
			modules = experiment.modules,
			analytics = modules.analytics;

		observer.connect($container, onMutation, { childList: true, attributes: false, subtree: false });

		/**
		 * @function  onMutation
		 * @desc      To run on each attribute mutation of the container element. Checks to see if inner 
		 * 			  content contains click and collect components. 
		 * 			  If not, loop through each store in the container and build a click and collect 
		 * 			  component for each one.
		 */
		function onMutation() {
			// Build components for each store container
			var $stores = $container.find('#branches > li');

			$stores.each(function() {
				var $el = $(this);

				if ($el.find('.tp_branchNumber .yCmsContentSlot.call').length || $el.find('.TP024_clickAndCollect').length) {
					// Out of stock or button already rendered
					return true;
				} else {
					var store = $el[0];
					modules.clickAndCollect.init(store);
					if (!analytics.eventStatus.clickAndCollectShown) {
						//analytics.sendEvent('TP024 - Desktop', 'View', 'Add for collection shown', true);
						analytics.eventStatus.clickAndCollectShown = true;
					}
				}
			});
		}

		// Initial onMutation call
		onMutation();
	},

	poller: function(){
		experiment.utils.poller([
		'.form_field-input #q',
		'#branchFinderButton',
		function () {
			if (window.jQuery) {
				if(document.querySelector('.tpProductOverview .tpCheckBasket.clearfix .content p')){
					experiment.jQ = window.jQuery;
					experiment.beforeTarget = 'p';
					return true;	
				}
				else if(document.querySelector('.tpProductOverview .tpCheckBasket.clearfix .content strong')){
					experiment.jQ = window.jQuery;
					experiment.beforeTarget = 'strong';
					return true;
				}
			}
		}
		], experiment.init);
	},
	restructure: function(){
		var $ = experiment.jQ;

		experiment.utils.poller([
		'#branches:not(.TP092_built) > li:not(.TP092_stock-row)',
		], function(){
			var branchWrap = $('#branches');
			var oldRow = branchWrap.find('> li:not(.TP092_stock-row)');

			branchWrap.addClass('TP092_built');

			oldRow.each(function(){
				var el = $(this),
					elName = el.find('.tp_branchDetails_name h3.title').text(),
					elDistance = el.find('.tp_branchDetails_name p').text(),
					elAddress = el.find('.tp_branchDetails_adress').html(),
					elEmail = $.trim(el.find('.tp_branchDetails_misc h3:first-child + p a').text()),
					elBranchManager = el.find('.tp_branchDetails_misc br + h3 + p').text(),
					elPhone = el.find('.tp_stockBranchNumber').text(),
					elStock = el.find('.tp_branchNumber'),
					elStockMarkup = null,
					lastClass = '';
					

				if(elStock.find('.tp_branchStatus').length > 0){
					elStock = $.trim(el.find('.tp_branchStatus + span').text());
					elStockMarkup = `
						<div class="TP092_tick">${elStock} in Stock</div>
						<div class="TP092_qty-input">
							<input type="number" value="1" />
						</div>
						<p>Free Click and Collect in 1 hour</p>
						<a class="TP092_add-collection">Add for collection</a>	
					`;

				}
				else{
					elStock = $.trim(el.find('.tp_branchNumber .call').text());
					elStockMarkup = `
						<div class="TP092_cross">Out of Stock</div>
						<p class="TP092_p-spacing">Ring Branch to check availability</p>
						<p class="TP092_p-spacing">${elPhone}</p>
						<p class="TP092_p-spacing">or</p>
						<a class="TP092_add-delivery">Add for delivery</a>	
					`;
				}

				if(el.is(':last-child')){
					lastClass = 'TP092_new-stock-last';
				}

				el.addClass('TP092_stock-row')
				.before(`
					<div class="TP092_new-stock clearfix ${lastClass}">
						<div class="TP092_details-wrap">
							<h3>
								<span>${elName}</span>
								<p>${elDistance}</p>
							</h3>
							<div class="TP092_details-inner">	
								<div class="TP092_details-half">
									<h3>Phone</h3>
									<p>${elPhone}</p>
								</div>
								<div class="TP092_details-half">
									${elAddress}
								</div>
								<div class="TP092_details-full">
									<h3>Email</h3>
									<p>${elEmail}</p>
								</div>
								<a class="TP092_branch-details-btn">View Branch Details</a>
							</div>
							<div class="TP092_details-inner">
								<h3>Branch Manager</h3>
								<p>${elBranchManager}</p>
							</div>
						</div>
						<div class="TP092_stock-block">
							${elStockMarkup}
						</div>
					</div>
				`);
			});

			if($('.TP092_add-collection').length > 0){
				$('.TP092_add-collection').on('click', function(){
					var el = $(this),
						elParent = el.parent(),
						elValue = elParent.find('.TP092_qty-input input').val(),
						elStock = parseInt(elParent.find('.TP092_tick').text().replace('in Stock', ''));

					el.removeClass('TP092_less-error TP092_more-error');

					if(elValue < 1){
						elParent.find('.TP092_qty-input').addClass('TP092_less-error');
					}
					else if(elValue > elStock){
						elParent.find('.TP092_qty-input').addClass('TP092_more-error');
					}
					else{
						$('#qty').val(elValue);
						el.closest('.TP092_new-stock').next().find('.TP024_clickAndCollect').click();
					}
				});
			}
      
      if($('.TP092_branch-details-btn').length > 0){
        $('.TP092_branch-details-btn').on('click', function(){
          var el = $(this);
          el.closest('.TP092_new-stock').next().find('.tp_stockBranch_call').click();
        });
      }

      $('.tp_branchList_pagination').on('click', function(event){
        if($(event.target).is('li')){
          experiment.restructure();
        }
      });

			if($('.TP092_add-delivery').length > 0){
				$('.TP092_add-delivery').on('click', function(){
					$('#cboxClose').click();
					$('#addToCartButton').click();
				});
			}	
		});		
	}
};

experiment.poller();