var experiment = {
	id: 'TP024',
	jQ: window.jQuery,


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
						sendEvent('TP024 - Desktop', 'Click', 'Clicked add for collection', true);
						status.clickAndCollectClicked = true;
					}
				});

				$('#stockCheckerButton').one('click', function() {
					if (!status.checkStockClicked) {
						sendEvent('TP024 - Desktop', 'Click', 'Clicked check stock', true);
						status.checkStockClicked = true;
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
		if (!body.classList || body.classList.contains(this.id)) return false;

		body.className += ' ' + this.id; // Namespace CSS

		this.modules.analytics.init();

		// Watch for mutations on this element
		var $container = $('#stock_results');
		
		var observer = this.utils.observer,
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
						analytics.sendEvent('TP024 - Desktop', 'View', 'Add for collection shown', true);
						analytics.eventStatus.clickAndCollectShown = true;
					}
				}
			});
		}

		// Initial onMutation call
		onMutation();

	}
};

experiment.init();