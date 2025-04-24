/* no_doc_ready */
var _IT032v2 = (function () {

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
                function() {
                    var fs = window.FS;
                    if (fs && fs.setUserVars) return true;
                }
            ], function () {
                window.FS.setUserVars({
                    experiment_str: 'IT032',
                    variation_str: 'Variation 2'
                });
            }, { multiplier: 1.2, timeout: 0 });
        
            // Poll start
            UC.poller([
                'body',
                '.product-options',
                '.product-size-guide',
                '#sideGuideModal',
                '.reveal-content > .data-table.size-table',
                function() {
                    if (window.jQuery) return true;
                },
                function() {
                    if (window.ga) return true;
                }
            ], activate, {
                timeout: 12000,
                multiplier: 'disable'
            });

        // Variation
                
        function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('IT032v2');


        // Flag whether product has matching sizes or size ranges e.g. 18-20
        var productSizesRange = false;
        var $sizesAvailable = $('#product-options-wrapper').find('.switcher-size > label');
        var availableSizesArray = [];
        $sizesAvailable.each(function () {
            var sizeText = $(this).text().trim();
            var matches = sizeText.match(/^(\d{1,2})-(\d{1,2})$/);
            if(matches) {
                productSizesRange = true;
                return false;
            }
        });

        // The html structure for the top
        var $html = $([
            '<div class="IT032v2_contentWrapper">',
            '<h3 class="IT032v2_size_guide_Header">Size Guide</h3>',
            '<p class="IT032v2_belowHeader">FIND YOUR SIZE</p>',
            '<div class="IT032v2_countrySizeDropdown"></div>',
            '<div class="IT032v2_inchesORcm_toggle">',
            '<span class="IT032v2_inchesToggle IT032v2_toggleOption_active">INCHES</span>',
            '<span class="IT032v2_cmToggle">CM</span>',
            '</div>',
            '</div>'
        ].join(''));

        // The html structure for the bottom
        var $bottomHtml = $([
            '<h3 class="IT032v2_bottom_header">How to measure?</h3>',
            '<h3 class="IT032v2_bottomCategoryTitle">BUST</h3>',
            '<p class="IT032v2_bottomCategoryDetails">Measure across the fullest part of the Bust and across the shoulder blades</p>',
            '<h3 class="IT032v2_bottomCategoryTitle">WAIST</h3>',
            '<p class="IT032v2_bottomCategoryDetails">Measure around the natural Waistline</p>',
            '<h3 class="IT032v2_bottomCategoryTitle">HIPS</h3>',
            '<p class="IT032v2_bottomCategoryDetails IT032v2_bottomCategoryDetails_last">Measure at the widest part</p>',
            '<span class="IT032v2_close_btn">CLOSE (x)</span>'
        ].join(''));

        // Recreate the table (stuff that doesn't change) - main content
        const $tableRecreate = $([
            '<table class="IT032v2_newTable_wrapper">',
            '<thead class="IT032v2_newTable__header">',
            '<tr class="IT032v2_header1">',
            '<th rowspan="2" style="font-weight: 800;">SIZE</th>',
            '<th>BUST</th>',
            '<th>WAIST</th>',
            '<th>HIPS</th>',
            '</tr>',
            '<tr class="IT032v2_header2">',
            '<th class="IT032v2_bust_img"></th>',
            '<th class="IT032v2_waist_img"></th>',
            '<th class="IT032v2_hips_img"></th>',
            '</tr>',
            '</thead>',
            '<tbody class="IT032v2_newTable__content"></tbody>',
            '</table>',
            '<p class="IT032v2_biggerSizesInfo">Bigger sizes are available from our other ranges</p>',
            '<p class="IT032v2_inBetween">IN BETWEEN SIZES?</p>',
            '<div class="IT032v2_infoBigWrapper">',
            '<p class="IT032v2_infoBigText">That\'s easier said than done. Because, what do you do if you are in between two sizes?</p>',
            '<p class="IT032v2_infoBigText">Well, that\'s up to you. Do you like a tight fit? Go for the smaller size. Loving a loose fit? Go for the larger size.</p>',
            '<p class="IT032v2_diffSizes">Different sizes</p>',
            '<p class="IT032v2_infoBigText">If your body measurements for bust and waist result in two different suggested sizes, order the size from your bust measurement.</p>',
            '</div>',
            '<p class="IT032v2_internationalSizes" id="IT032v2_anchor">INTERNATIONAL SIZES</p>',
            '<table class="IT032v2_internationalSizesTable_wrapper">',
            '<thead class="IT032v2_intTable_head">',
            '<th>UK</th>',
            '<th>EU</th>',
            '<th>US</th>',
            '<th>AU</th>',
            '</thead>',
            '<tbody class="IT032v2_intTable_body"></tbody>',
            '</table>',
            '<p class="IT032v2_scrollMsg">Scroll Horizontal to view more</p>'
        ].join(''));

        // iffy iffy
        (function () {
            // Store all the data in the original size guide which will subsequently be used to recreate the size guide
            // Cache vars
            var $originalModal = $('#sideGuideModal');
            $originalModal.find('.reveal-content').hide();

            // The whole content following 3 lines
            $html.prependTo($originalModal);
            $tableRecreate.insertAfter($('.IT032v2_inchesORcm_toggle'));
            $bottomHtml.insertAfter($('.IT032v2_scrollMsg'));

            // Note: The toggle defaults to inches
            var $inchesToggle = $('.IT032v2_inchesToggle');
            var $cmToggle = $('.IT032v2_cmToggle');

            // The original table where data will be extracted from
            var $originalTable = $originalModal.find('.reveal-content > .data-table.size-table');

            // Some more vars which will extract the info in the original table based on specific categories (e.g sizes, bust in cm etc...)
            var $ukSizes = [], $usSizes = [], $auSizes = [], $euSizes = [], $bustInchArray = [], $bustCmArray = [],
                $waistInchArray = [], $waistCmArray = [], $hipsInchArray = [], $hipsCmArray = [];

            // Start extracting the values into the above vars ----------------
            // All table rows
            var $dataInTableRows = $originalTable.find('tbody > tr');
            $dataInTableRows.each(function () {
                var $this = $(this);
                var $thisTableRowData = $this.children('td');
                $ukSizes.push($thisTableRowData.eq(0).text());
                $usSizes.push($thisTableRowData.eq(1).text());
                $auSizes.push($thisTableRowData.eq(2).text());
                $euSizes.push($thisTableRowData.eq(3).text());
                $bustInchArray.push($thisTableRowData.eq(4).text());
                $bustCmArray.push($thisTableRowData.eq(5).text());
                $waistInchArray.push($thisTableRowData.eq(6).text());
                $waistCmArray.push($thisTableRowData.eq(7).text());
                $hipsInchArray.push($thisTableRowData.eq(8).text());
                $hipsCmArray.push($thisTableRowData.eq(9).text());
            });

            // --------------------------------------------------------------------
            // Store the sizes of the product currently viewed
            // The tables will only show those sizes and their corresponding dimensions
            function productSizes() {
                var $sizesAvailable = $('#product-options-wrapper').find('.switcher-size > label');
                var availableSizesArray = [];
                $sizesAvailable.each(function () {
                    var sizeText = $(this).text().trim();
                    var matches = sizeText.match(/^(\d{1,2})-(\d{1,2})$/);
                    if(matches && matches[1] && matches[2]) {
                        // Split up sizes
                        if(availableSizesArray.indexOf(matches[1]) === -1) {
                            availableSizesArray.push(matches[1]);
                        }
                        if(availableSizesArray.indexOf(matches[2]) === -1) {
                            availableSizesArray.push(matches[2]);
                        }
                    } else {
                        // Push size to available sizes
                        availableSizesArray.push(sizeText);
                    }
                });
                return availableSizesArray;
            } // productSizes
            // --------------------------------------------------------------------

            // Generate the table (default to uk sizes and inches)
            generateTable($ukSizes, $bustInchArray, $waistInchArray, $hipsInchArray, productSizes(), $ukSizes);

            // Generate second (static) talbe (contains uk, eu, us, au in this order) specific sizes
            generateCountrySizeTable($ukSizes, $euSizes, $usSizes, $auSizes, productSizes());

            // ------------------------------
            // Event listeners for the toggle
            $inchesToggle.on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('IT032v2_toggleOption_active')) {
                    $this.addClass('IT032v2_toggleOption_active');
                    $this.next().removeClass('IT032v2_toggleOption_active');
                    updateToggle($bustInchArray, $waistInchArray, $hipsInchArray);
                }
            });

            $cmToggle.on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('IT032v2_toggleOption_active')) {
                    $this.addClass('IT032v2_toggleOption_active');
                    $this.prev().removeClass('IT032v2_toggleOption_active');
                    updateToggle($bustCmArray, $waistCmArray, $hipsCmArray);
                }
            });
            // ------------------------------

            // Create the country sizes dropdown ------------------------------------------------
            var $dropdownCountrySizes = $('.IT032v2_countrySizeDropdown');

            var $dropdownHTML = $([
                '<div class="IT032v2_dropdown_displayed"><span class="IT032v2_dropdown_Text">UK</span><i class="IT032v2_arrow_down"></i></div>',
                '<div class="IT032v2_dropdown_toggle">',
                '<div class="IT032v2_dropwdown_option">US</div>',
                '<div class="IT032v2_dropwdown_option">AU</div>',
                '<div class="IT032v2_dropwdown_option">EU</div>',
                '</div>'
            ].join(''));

            $dropdownHTML.prependTo($dropdownCountrySizes);

            var $dropdownToggle = $('.IT032v2_dropdown_displayed');
            var $dropdownOptions = $('.IT032v2_dropdown_toggle');
            $dropdownOptions.hide();

            // Based on country code return the corresponding array containing the specific sizes
            var countryShort = {
                'UK': $ukSizes,
                'US': $usSizes,
                'EU': $euSizes,
                'AU': $auSizes
            };

            // Event listeners for the dropdown
            $dropdownToggle.on('click', function () {
                $dropdownOptions.slideToggle('fast');
            });
            $dropdownOptions.on('click', '.IT032v2_dropwdown_option', function () {
                $dropdownOptions.hide();
                var $this = $(this);
                var $prevTextContainer = $dropdownToggle.find($('.IT032v2_dropdown_Text'));
                var $prevText = $prevTextContainer.text();
                var $currentText = $this.text();
                $prevTextContainer.text($currentText);
                $this.text($prevText);

                updateCountrySizes(countryShort[$currentText], productSizes(), $ukSizes); // use the obj literal above
            });

            // Event listner for the bottom close button
            $('.IT032v2_close_btn').on('click', function () {
                $('.close-reveal-modal').trigger('click');
            });

            // --------------------------------------------------------------------------------------
        }());

        // Populate the table with the proper values...
        // Params ---> countrySizeArray: array (e.g $ukSizes)
        //             metricArray: array (e.g $bustInchArray)
        // On load page will have the default values corresponding to: $ukSizes, $bustInchArray, $waistInchArray, $hipsInchArray
        function generateTable(countrySizeArray, metricArrayBust, metricArrayWaist, metricArrayHips, productSizesArray, ukSizeArray) {
            var i;
            var $tableBodyContainer = $('.IT032v2_newTable__content');
            for (i = 0; i < ukSizeArray.length; i++) {
                if (productSizesArray.includes(ukSizeArray[i])) {
                    $tableBodyContainer.append($([
                        '<tr>',
                        '<td class="IT032v2_sizeCell">' + countrySizeArray[i] + '</td>',
                        '<td>' + metricArrayBust[i] + '</td>',
                        '<td>' + metricArrayWaist[i] + '</td>',
                        '<td>' + metricArrayHips[i] + '</td>',
                        '</tr>'
                    ].join('')));
                }
            }
        } // generateTable

        // Create table of sizes only specific to locations (uk, us, au, eu)
        // generate data for this (second) table
        // Params (array containing the country sizes) -> so takes 4 params (uk, ..)
        function generateCountrySizeTable(ukSizeArray, euSizeArray, usSizeArray, auSizeArray, productSizesArray) {
            var $secondTableBodyContainer = $('.IT032v2_intTable_body');
            var i;
            // All arrays have the same length
            var length = ukSizeArray.length;
            for (i = 0; i < length; i++) {
                if (productSizesArray.includes(ukSizeArray[i])) {
                    $secondTableBodyContainer.append([
                        '<tr>',
                        '<td>' + ukSizeArray[i] + '</td>',
                        '<td>' + euSizeArray[i] + '</td>',
                        '<td>' + usSizeArray[i] + '</td>',
                        '<td>' + auSizeArray[i] + '</td>',
                        '</tr>'
                    ].join(''));
                }
            }
        } // generateCountrySizeTable

        // Update the sizes in the table based on location (uk, us, au, eu)
        var $tableBodyContainerCountrySizeData = $('.IT032v2_newTable__content > tr');
        function updateCountrySizes(countrySizeArray, productSizesArray, ukSizeArray) {
            var length = ukSizeArray.length;
            var counter = 0;
            for (i = 0; i < length; i++) {
                if (productSizesArray.includes(ukSizeArray[i])) {
                    $tableBodyContainerCountrySizeData.eq(counter).children('td').eq(0).text(countrySizeArray[i]);
                    counter++;
                }
            }
        } // updateCountrySizes

        // Update the sizes in the table based on the toggle (cm/inch)
        function updateToggle(metricArrayBust, metricArrayWaist, metricArrayHips) {
            $tableBodyContainerCountrySizeData.each(function (i) {
                $this = $(this);
                $this.children('td').eq(1).text(metricArrayBust[i]);
                $this.children('td').eq(2).text(metricArrayWaist[i]);
                $this.children('td').eq(3).text(metricArrayHips[i]);
            });
        } // updateToggle

        // Anchor down to 'international sizes' table when selection a country in the 'dropdown'
        $('.IT032v2_dropwdown_option').on('click', function(e) {
            // location.hash = '#IT032v2_anchor'; ...
            // Fix
            var myAnchor = $('#IT032v2_anchor').offset().top;
            window.scrollTo(0, myAnchor);
        });

        $('a[data-reveal-id="sideGuideModal"]').on('click', function () {
            sendEvent('IT032v2', 'Size guide opened', 'IT032v2 - Size Guide Iteration', true);
        });

        sendEvent('IT032v2', 'Page View', 'IT032 - Size Guide Iteration', true);

        // ------------------------------------------ v2 changes below ------------------------------------------------
        $('.IT032v2_newTable_wrapper')
            .before('<p class=IT032v2_cta>Click on a size to add it to your bag</p>');

        var $sizesInFirstTable = $('.IT032v2_newTable__content > tr');
        // When users clicks a size add a button beneath its corresponding tr
        $sizesInFirstTable.on('click', ' > td:first', function() {

            var $this = $(this);
            if ($this.hasClass('IT032v2_painter')) {
                return;
            }
            $('.IT032v2_addToCart').hide();
            $('.IT032v2_newTable__content > tr > td').removeClass('IT032v2_painter');
            var $thisParent = $this.parent('tr');
            if (!$thisParent.next().hasClass('IT032v2_addToCart')) {
                $this.addClass('IT032v2_painter');
                $thisParent.after('<tr class="IT032v2_addToCart"><td colspan="4" class="IT032v2_addToCartDataCell">ADD TO CART</td></tr>');
                $thisParent.next('.IT032v2_addToCart').hide().fadeIn('2500');
            } else {
                $this.addClass('IT032v2_painter');
                $thisParent.next('.IT032v2_addToCart').fadeIn('2500');
            }
            var indexSize = $this.index('.IT032v2_newTable__content tr .IT032v2_sizeCell') + 1; // add 1 to conform to selectedIndex on hidden option
            if(productSizesRange) {
                indexSize = Math.floor($this.index('.IT032v2_newTable__content tr .IT032v2_sizeCell') / 2) + 1;
            }
            $thisParent.next('.IT032v2_addToCart').on('click', function () {

                // Amend small problem with product size selected in popup and on orig
                var temp = document.querySelector('.super-attribute-select').selectedIndex;
                document.querySelector('.super-attribute-select').selectedIndex = indexSize;
                $('#product-addtocart-button').trigger('click');
                $('.right-off-canvas-toggle').trigger('click');
                $('.close-reveal-modal').trigger('click');
                document.querySelector('.super-attribute-select').selectedIndex = temp;
            });
        });

    } // activate

}()); // _IT032v2
