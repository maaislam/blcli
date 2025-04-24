import * as utils from '../../../../../lib/utils';

export default function tp044() {
  /* eslint-disable */
    var _TP044 = (function () {
        // Firstly if not on product category pages don't go further
        if (!($('body').hasClass('page-productGrid') && $('body').hasClass('pageType-CategoryPage'))) {
            return;
        }

        // On page load check if there's an option to sort 120 products (basically if there are at least  120 products in the selected categ.)
        // If there is that option default the URL to the query 'perPage=120' (unless it's already queried to that)
      //  if ((window.location.href.indexOf('?q=%3Arelevance&perPage=') === -1 || window.location.href.indexOf('?q=%3Arelevance&page=') === -1)
      //if (window.location.href.indexOf('?q=%3Arelevance&perPage=') === -1 && window.location.href.indexOf('?q=%3Arelevance&page=') === -1 && $('.left.perpage_list > li:last a').text().trim() === '120') { // not queried to the other 'view' options either
      if(!utils.getUrlParameter('perPage') && !utils.getUrlParameter('page') && $('.left.perpage_list > li:last a').text().trim() === '120') {
          if(window.location.href.indexOf('?q=') > -1){
            window.location.href = window.location.href + "&perPage=120";
          }
          else{
            window.location.href = window.location.href + "?q=%3Arelevance&perPage=120";
          }
      } // Otherwise (there's less than 120 products on the page), leave URL as is and do the sorting on current page...

        // PLUGINS ------------------------------------

        // UC Library - Poller -- @version 0.2.2
        // ---------------------------------------------
        var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

        // Send GA Events With Tracker Name -----------
        // ---------------------------------------------
        function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

        // Full Story Tagging --------------------------
        // ---------------------------------------------
        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'TP044',
                variation_str: 'Variation 1'
            });
        }, {multiplier: 1.2, timeout: 0});

        // Triggers ------------------------------------
        // ---------------------------------------------
        var _triggers = (function () {
            UC.poller([
                '#r_content',
                function () {
                    return window.jQuery
                },
                function () {
                    return window.ga
                }
            ], activate);
        })();

        // ---------------------------------------------
        function activate() {
            var $ = window.jQuery;
            var $body = $('body');
            $body.addClass('TP044');

            // #r_content/.list-view -> container to work with
            // .prod_nav_top.prod_list_pagination -> product pagination (will include 'sort by' select)
            // #products container
            var $productWrapper = $('#r_content');
            var $productListPagination = $('.prod_nav_top.prod_list_pagination');
            var $products = $('#products');

            // Used to display the products as they were loaded (as per experiment descp. this will be regarded as a 'bestsellers' option in the 'sort by')
            var $clonedProducts = $products.clone();

            var $allIndividualProducts = $products.find('.prod');

            $allIndividualProducts.each(function(idx, item) {
                $(this).attr('data-tp44-idx', idx);
            });

            /**
             * Sort the products by using an index and DOM move rather than cloning products
             */
            function optimisedSortByFunction(sortOption) {
                var productCosts = [];

                $allIndividualProducts.each(function(idx, item) {
                    var $this = $(this);

                    // Get cost of product
                    var thisProductCostText = $this.find('.prod_info .product_price_holder .price_value').text();
                    thisProductCostText = thisProductCostText.replace(/,/g, "");
                    var thisProductCostValue = parseFloat(thisProductCostText.substring(1));

                    var costing = {
                        index: $this.attr('data-tp44-idx'),
                        cost: thisProductCostValue
                    };

                    productCosts.push(costing);
                });

                if (sortOption === 0) {
                    // Sort the products by index (their original order)
                    productCosts.sort(function (a, b) {
                        return a.index - b.index;
                    });
                } else if (sortOption === 1) {
                    // Sort the product costs in ascending order
                    productCosts.sort(function (a, b) {
                        return a.cost - b.cost;
                    });
                } else {
                    // Sort the product costs in descending order
                    productCosts.sort(function (a, b) {
                        return b.cost - a.cost;
                    });
                }

                for(var l = productCosts.length, p = l - 1; p >= 0; p--) {
                    var index = productCosts[p].index;
                    var targetProduct = $allIndividualProducts.filter('[data-tp44-idx=' + index + ']');
                    targetProduct.prependTo($products);
                }

                $allIndividualProducts = $products.find('.prod');

                // We have to remove 'row' objects and wrap every 3 products in a 'row' div
                // to reset the markup - it's easier for the above algorithm to do a simple
                // prepend and then sort this out later so existing styles just work
                
                $products.find('.row').filter(function() {
                    return this.innerHTML.trim() === '';
                }).remove();

                var cnt = 0, prods;
                while((prods = getSlicedProducts(cnt)).length > 0) {
                    cnt += 3;
                    prods.wrapAll('<div class="row">');
                }

                function getSlicedProducts(start) {
                    return $allIndividualProducts.slice(start, start + 3);
                }                                              
            }

            /*
              Will create an array of objects. Each object in the array will contain relevant
              product info. (productIndex when page loaded, the cost of that product and the product container)
            */
            // --------------------------------------------------------------------------------
            /*function myFullSortByFunction(sortOption) { // > 0 for ascending / 0 for descending order

                var $productInfoArray = [];
                var $productCostsArray = [];

                // Find all individual product containers
                // Loop through each of those products and get their cost
                $allIndividualProducts.each(function (i) {
                    var $this = $(this);
                    // Get cost of product (used for sorting based on price)
                    var $thisProductCostText = $this.find('.prod_info .product_price_holder .price_value').text();
                    // Replace commas with nothing as this caused number strings to be parsed to Floats incorrectly e.g (1,099.35 would've returned just 1)
                    $thisProductCostText = $thisProductCostText.replace(/,/g, "");
                    var $thisProductCostValue = parseFloat($thisProductCostText.substring(1));
                    // Create an object containing relevant info. about current project
                    var $thisProd = {
                        indexProd: i,
                        currProd: $this,
                        valueProd: $thisProductCostValue
                    };

                    $productCostsArray.push($thisProductCostValue);

                    // Push created object into the array of products
                    $productInfoArray.push($thisProd);
                });

                // Function to remove array duplicates (fixes an issue)
                function uniq(a) {
                    return Array.from(new Set(a));
                }

                $productCostsArray = uniq($productCostsArray);


                if (sortOption) {
                    // Sort the product costs in ascending order
                    $productCostsArray.sort(function (a, b) {
                        return a - b;
                    });
                } else {
                    // Sort the product costs in descending order
                    $productCostsArray.sort(function (a, b) {
                        return b - a;
                    });
                }

                $.each($productCostsArray, function (i) { // loop through sorted elements of the array
                    var $thisCost = $(this)[0].valueOf();
                    $.each($productInfoArray, function (j) { // loop through products
                        var $thisProduct = $(this);

                        if ($thisProduct[0].valueProd === $thisCost) {
                            $thisProduct[0].currProd.clone().insertBefore($productInfoArray[i].currProd);
                        }

                    }); // each for $productInfoArray
                }); // each for $productCostsArray

                $allIndividualProducts.hide();
            }*/
            // --------------------------------------------------------------------------------

            // Construct a <select> tag with 3 <option>s
            var $selectHtml = $([
                '<select class="TP044_myCustomSelect">',
                    '<option value="bestsellers">Bestsellers</option>', // default page
                    '<option value="priceHighToLow">Price High to Low</option>', // descending
                    '<option value="priceLowToHigh">Price Low to High</option>', // ascending
                '</select>'
            ].join(''));

            // Add it into the DOM
            $selectHtml.appendTo($productListPagination);

            // Listens for users selecting options and displays the results specific to each case
            $('.TP044_myCustomSelect').on('change', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).children('option :eq(0)').is(':selected')) {
                    //$products.hide();
                    //$clonedProducts.insertAfter($productListPagination).show();
                    
                    optimisedSortByFunction(0);

                    sendEvent('TP044', 'User selected ' + $(this).children('option :eq(0)').text(), 'TP044 - Sort By');
                } else if ($(this).children('option :eq(1)').is(':selected')) {
                    //$products.show();
                    //$clonedProducts.hide();
                    
                    optimisedSortByFunction(-1);

                    sendEvent('TP044', 'User selected ' + $(this).children('option :eq(1)').text(), 'TP044 - Sort By');
                } else if ($(this).children('option :eq(2)').is(':selected')) {
                    //$products.show();
                    //$clonedProducts.hide();
                    
                    optimisedSortByFunction(1);

                    sendEvent('TP044', 'User selected ' + $(this).children('option :eq(2)').text(), 'TP044 - Sort By');
                }
            });

        } // activate

    }()); // _TP044
}
