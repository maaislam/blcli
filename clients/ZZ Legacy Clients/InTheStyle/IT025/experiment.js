var _IT025 = (function () {

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
            experiment_str: 'IT025',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
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
        $body.addClass('IT025');

        if (!$('#product-options-wrapper > .product-size-guide a[data-reveal-id="sideGuideModal"]').length) {
            return;
        }

        // The html structure for the top
        var $html = $([
            '<div class="IT025_contentWrapper">',
                '<h3 class="IT025_size_guide_Header">Size Guide</h3>',
                '<p class="IT025_belowHeader">Know your size? Enter your measurements to quickly find your size</p>',
                '<div class="IT025_inchesORcm_toggle">',
                    '<span class="IT025_inchesToggle IT025_toggleOption_active">INCHES</span>',
                    '<span class="IT025_cmToggle">CM</span>',
                '</div>',
            '</div>'
        ].join(''));

        // The html structure for the bottom
        var $bottomHtml = $([
            '<h3 class="IT025_bottom_header">How to measure?</h3>',
            '<h3 class="IT025_bottomCategoryTitle">BUST</h3>',
            '<p class="IT025_bottomCategoryDetails">Measure across the fullest part of the Bust and across the shoulder blades</p>',
            '<h3 class="IT025_bottomCategoryTitle">WAIST</h3>',
            '<p class="IT025_bottomCategoryDetails">Measure around the natural Waistline</p>',
            '<h3 class="IT025_bottomCategoryTitle">HIPS</h3>',
            '<p class="IT025_bottomCategoryDetails IT025_bottomCategoryDetails_last">Measure at the widest part</p>',
            '<span class="IT025_close_btn">CLOSE (x)</span>'
        ].join(''));

        // Recreate the table (stuff that doesn't change) - main content
        $tableRecreate = $([
            '<table class="IT025_newTable_wrapper">',
                '<thead class="IT025_newTable__header">',
                    '<tr class="IT025_header1">',
                        '<th style="font-weight: 800;">Sizes</th>',
                        '<th>BUST</th>',
                        '<th>WAIST</th>',
                        '<th>HIPS</th>',
                    '</tr>',
                    '<tr class="IT025_header2">',
                        '<th class="IT025_countrySizeDropdown"></th>',
                        '<th class="IT025_bust_img"></th>',
                        '<th class="IT025_waist_img"></th>',
                        '<th class="IT025_hips_img"></th>',
                    '</tr>',
                '</thead>',
                '<tbody class="IT025_newTable__content"></tbody>',
            '</table>'
        ].join(''));

        // iffy iffy
        (function () {
            // Store all the data in the original size guide which will subsequently be used to recreate the size guide
            // Cache vars
            var $originalModal = $('#sideGuideModal');
            $originalModal.find('.reveal-content').hide();

            // The whole content following 3 lines
            $html.prependTo($originalModal);
            $tableRecreate.insertAfter($('.IT025_inchesORcm_toggle'));
            $bottomHtml.insertAfter($('.IT025_newTable_wrapper'));

            // Note: The toggle defaults to inches
            var $inchesToggle = $('.IT025_inchesToggle');
            var $cmToggle = $('.IT025_cmToggle');

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

            // Generate the table (default to uk sizes and inches)
            generateTable($ukSizes, $bustInchArray, $waistInchArray, $hipsInchArray);

            // ------------------------------
            // Event listeners for the toggle
            $inchesToggle.on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('IT025_toggleOption_active')) {
                    $this.addClass('IT025_toggleOption_active');
                    $this.next().removeClass('IT025_toggleOption_active');
                    updateToggle($bustInchArray, $waistInchArray, $hipsInchArray);
                }
            });

            $cmToggle.on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('IT025_toggleOption_active')) {
                    $this.addClass('IT025_toggleOption_active');
                    $this.prev().removeClass('IT025_toggleOption_active');
                    updateToggle($bustCmArray, $waistCmArray, $hipsCmArray);
                }
            });
            // ------------------------------

            // Create the country sizes dropdown ------------------------------------------------
            var $dropdownCountrySizes = $('.IT025_countrySizeDropdown');

            var $dropdownHTML = $([
                '<div class="IT025_dropdown_displayed"><span class="IT025_dropdown_Text">UK</span><i class="IT025_arrow_down"></i></div>',
                '<div class="IT025_dropdown_toggle">',
                    '<div class="IT025_dropwdown_option">US</div>',
                    '<div class="IT025_dropwdown_option">AU</div>',
                    '<div class="IT025_dropwdown_option">EU</div>',
                '</div>'
            ].join(''));

            $dropdownHTML.prependTo($dropdownCountrySizes);

            var $dropdownToggle = $('.IT025_dropdown_displayed');
            var $dropdownOptions = $('.IT025_dropdown_toggle');
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
            $dropdownOptions.on('click', '.IT025_dropwdown_option', function () {
                $dropdownOptions.hide();
                var $this = $(this);
                var $prevTextContainer = $dropdownToggle.find($('.IT025_dropdown_Text'));
                var $prevText = $prevTextContainer.text();
                var $currentText = $this.text();
                $prevTextContainer.text($currentText);
                $this.text($prevText);

                updateCountrySizes(countryShort[$currentText]); // use the obj literal above
            });

            // Event listner for the bottom close button
            $('.IT025_close_btn').on('click', function () {
                $('#sideGuideModal').hide();
            });

            // --------------------------------------------------------------------------------------
        }());

        // Populate the table with the proper values...
        // Params ---> countrySizeArray: array (e.g $ukSizes)
        //             metricArray: array (e.g $bustInchArray)
        // On load page will have the default values corresponding to: $ukSizes, $bustInchArray, $waistInchArray, $hipsInchArray
        function generateTable(countrySizeArray, metricArrayBust, metricArrayWaist, metricArrayHips) {
            var i;
            var $tableBodyContainer = $('.IT025_newTable__content');
            for (i = 0; i < countrySizeArray.length; i++) {
                $tableBodyContainer.append($([
                    '<tr>',
                        '<td>' + countrySizeArray[i] + '</td>',
                        '<td>' + metricArrayBust[i] + '</td>',
                        '<td>' + metricArrayWaist[i] + '</td>',
                        '<td>' + metricArrayHips[i] + '</td>',
                    '</tr>'
                ].join('')));
            }
        } // generateTable

        // Update the sizes in the table based on location (uk, us, au, eu)
        var $tableBodyContainerCountrySizeData = $('.IT025_newTable__content > tr');
        function updateCountrySizes(countrySizeArray) {
            $tableBodyContainerCountrySizeData.each(function (i) {
                $(this).children('td').eq(0).text(countrySizeArray[i]);
            });
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

        sendEvent('IT025', 'Page View', 'IT025 - Size Guide Redesign', true);

    } // activate

}()); // _IT025