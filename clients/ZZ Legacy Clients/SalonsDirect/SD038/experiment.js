var _SD038 = (function () {

    // PLUGINS
    // UC Library - Poller -- @version 0.2.2
    var UC=function(t){var n=n||window.jQuery;return t.poller=function(t,n,e){var o={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(e)for(var a in e)o[a]=e[a];else e=o;for(var i=!!o.timeout&&new Date(r()+o.timeout),s=o.wait,f=o.multiplier,l=[],c=function(e,o){if(i&&r()>i)return!1;o=o||s,function(){var t=typeof e;return"function"===t?e():"string"!==t||document.querySelector(e)}()?(l.push(!0),l.length===t.length&&n()):setTimeout(function(){c(e,o*f)},o)},m=0;m<t.length;m++)c(t[m])},t.throttle=function(t,n){var e,o,r,a=null,i=0;return function(){var s=Date.now||function(){return(new Date).getTime()};s=s(),i||(i=s);var f=n-(s-i);return e=this,o=arguments,(f<=0||f>n)&&(a&&(clearTimeout(a),a=null),i=s,r=t.apply(e,o),a||(e=o=null)),r}},t.group=function(t,n){for(var e=[],o=0;o<t.length;o+=n)e.push(t.slice(o,o+n));return e},t.hoverDelay=function(t,e,o){if(!n)return!1;var r,a,i=Date.now||function(){return(new Date).getTime()};return o||(o=1e3),n(t).hover(function(){a=i()},function(){r||i()-a>=o&&(e(),r=!0)}),t},t.observer={active:[],connect:function(t,n,e){var o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(e)for(var r in e)o[r]=e[r];else e=o;for(var a,i=new MutationObserver(function(e){e.forEach(function(e){a||(a=!0,n(t,e),setTimeout(function(){a=!1},o.throttle))})}),s=0;s<t.length;s++)i.observe(t[s],o.config),this.active.push([t[s],i])},disconnect:function(t){for(var n=this.active,e=0;e<t.length;e++)for(var o=t[e],r=0;r<n.length;r++)o===n[r][0]&&n[r][1].disconnect()}},t.feedbackTab=function(){if(!n)return!1;var t,e,o,r,a,i,s,f=function(n){var e=t||{label:!1,content:!1,position:"left",customClass:!1,sessionClose:!0,tabDimensions:{height:"auto",width:"350px"},contentDimensions:{height:"350px",width:"600px"},mobileBreakpoint:768,animationSpeed:600,dimBackground:!1,zIndex:99999};if(n)for(var o in n)e[o]=n[o];else n=e;return e},l=function(){var e=n(['<div class="UC_fb-tab-container">','<div class="UC_fb-tab">','<span class="UC_fb-tab__inner"></span>','<span class="UC_fb-tab__close">&#215;</span>',"</div>",'<div class="UC_fb-content">','<div class="UC_fb-content__inner"></div>',"</div>","</div>"].join("")),r=e.find(".UC_fb-tab"),a=e.find(".UC_fb-content");return t.label&&r.find(".UC_fb-tab__inner").html(t.label),t.content&&a.find(".UC_fb-content__inner").html(t.content),t.customClass&&e.addClass(t.customClass),t.dimBackground&&(o=n('<div class="UC_fb-tab-bg"></div>')),r.css({height:t.tabDimensions.height,width:t.tabDimensions.width}),a.css({height:t.contentDimensions.height,width:t.contentDimensions.width}),e},c=function(){e&&e.remove(),o&&o.remove()},m=function(){var n,e;switch(t.position){case"left":n="-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;",s="width";break;case"right":n="-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;",s="width";break;case"bottom":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;",s="height";break;case"top":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;",s="height";break;default:n="",e="",s="width"}var o=document.createElement("style");o.type="text/css";var r=".UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:"+t.zIndex+";"+e+"}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:"+t.zIndex+";color:#333;font-size:15px;padding:10px 10px 10px 20px;"+n+"}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:"+(t.zIndex-1)+";}";return o.styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),o},d=function(){r&&r.parentElement.removeChild(r)},u=function(){var t=n(".UC_fb-tab-container"),e=t.children(".UC_fb-tab"),o=t.children(".UC_fb-content"),r=n(window);return{window:{width:r.innerWidth(),height:r.innerHeight()},tab:{width:e.outerWidth(),height:e.outerHeight()},content:{width:o.outerWidth(),height:o.outerHeight()}}},b=function(n){n||(n=u()),t||(t=f());var e={remove:{},open:{},close:{}};return e.remove[t.position]="-100%",e.open[t.position]="0",e.close[t.position]="-"+n.content[s]+"px",e},h=function(n){if(!n)return!1;var e=n.find(".UC_fb-tab"),r=n.find(".UC_fb-content"),s="closed";e.click(function(){var e,f,l;i=u(),a=b(i),e=i.window.width-i.tab.height-5,f=i.window.height-i.tab.height-5,r.css({"max-width":e,"max-height":f}),i.content.width>e&&(i.content.width=e),i.content.height>f&&(i.content.height=f),"open"===s?(l=a.close,o&&o.fadeOut()):(l=a.open,o&&o.fadeIn()),n.animate(l,t.animationSpeed,function(){s="open"===s?"closed":"open"})}),e.find(".UC_fb-tab__close").click(function(e){e.stopPropagation(),o&&o.fadeOut(),n.animate(a.remove,t.animationSpeed),t.sessionClose&&window.sessionStorage.setItem("ucfbtab-closed",1)})};return{init:function(n){var c=f(n);t!==c&&(t=c),t.sessionClose&&window.sessionStorage.getItem("ucfbtab-closed")||(e=l(),r=m(),e.prependTo("body"),document.body.insertBefore(r,e[0]),t.dimBackground&&e.before(o),i=u(),a=b(i),h(e),e.css(t.position,"-"+i.content[s]+"px"))},destroy:{component:c,css:d,all:function(){c(),d()}},refresh:function(t){this.destroy.all(),this.init(t)}}}(),t}(UC||{});


    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'SD038',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            '.product-des',
            '.product-shop',
            '.add-to-cart-wrapper',
            '.qty-wrapper',
            '.extra-info.pro-avail-info',
            '.tierprice_image',
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // Experiment ------------------------------------
    // ---------------------------------------------
        function activate() {
            var $ = window.jQuery;

            if (!$('.tierprice_image img[title="Multibuy"]').length) {
                return;
            }

            var $body = $('body');
            $body.addClass('SD038');

        var $multi_buyWrapper = $([
            '<div class="SD038_contentWrapper">',
            '<h1 class="SD038_discountMessage">*MULTI-BUY DISCOUNT AVAILABLE*</h1>',
            '<div class="SD038_vatToggle">',
            '<span class="SD038_vatMessage">Show VAT price</span>',
            '<div class="SD038_switch_wrapper">',
            '<label class="SD038_switch">', // Rounded switch
            '<input type="checkbox">',
            '<div class="SD038_slider">',
            '<span class="SD038_on">ON</span>',
            '<span class="SD038_off">OFF</span>',
            '</div>',
            '</label>',
            '</div>',
            '</div>',
            '<table id="SD038_excelDataTable">',
            '</table>',
            '</div>'
        ].join(''));

        // Amend - completely different control layout if there's product options (e.g select a colour)
        if ($('#product-options-wrapper').length) {
            $('.product-des').find('.product-options-bottom').prependTo('.add-to-cart-wrapper');
            $('.product-des').find('.product-options-bottom').find('.price-box:first').prependTo('.add-to-cart');

            // Compute the value for a single unit (both ex and inc VAT)
            var $computePriceWithoutTax = $('.add-to-cart').find('.price-box:first').find('.price-excluding-tax').find('.price');
            var $computePriceWithTax = $('.add-to-cart').find('.price-box:first').find('.inc-vat');

            $computePriceWithoutTax = $computePriceWithoutTax.text().trim().substring(1, $computePriceWithoutTax.text().trim().length - 7);
            $computePriceWithTax = $computePriceWithTax.text().trim().substring(2, $computePriceWithTax.text().trim().length - 9);
        }

        // Fixed amend - 31/oct/2k17
        // Insert the multi-buy wrapper
        var $specialOfferContainer = $('.extra-info.pro-avail-info');
        $multi_buyWrapper.insertAfter($specialOfferContainer);

        var $discountTable = $('.product-des').find('.product-shop').find('.multiple-item-table:first');
        $discountTable.appendTo($multi_buyWrapper);

        var $cartWrapper = $('.product-des').find('.add-to-cart-wrapper');
        $cartWrapper.appendTo($multi_buyWrapper);

        // Restyling (hide current unwanted text)
        $('.add-to-cart-wrapper').find('label[for="qty"]').hide();

        var $priceBox = $('.product-des').find('.price-box');
        $priceBox.insertAfter('.qty-wrapper');

        var $inStockMessage = $('.extra-info').find('.in-stock').find('.message-code');
        $inStockMessage.appendTo('.add-to-links');

        UC.poller([
            '.main-container .sd14-breadCrumb'
        ], function() {
            $('.main-container .sd14-breadCrumb').insertAfter('.add-to-links');
        });


        var $productHeader = $('.product-des').find('.product-shop');
        $productHeader.find('.product-name').prependTo('.main-container');
        $productHeader.find('.sku-number').insertBefore('.main');

        // Remove the first 2 unnecesary rows from the table
        $('table.multiple-item-table:first tr:eq(0), table.multiple-item-table:first tr:eq(1)').remove(); 

        // Extract the data from the current table and display to subsequently display it in a tidier format
        var $extractTableData = $('table.multiple-item-table:first tr').map(function(){
            return [
                $('td',this).map(function(){
                    return $(this).text();
                }).get()
            ];
        }).get();

        // Also turn the extracted table data into an array of numbers to allow for further computations
        var $numericTableData = [];
        (function() {
            var i;
            var colIndex;
            for (i = 0; i < $extractTableData.length; i++) {
                $numericTableData.push([]);
                for (colIndex = 0; colIndex < $extractTableData[i].length; colIndex++) {
                    if (colIndex === 0) {
                        $numericTableData[i].push($extractTableData[i][0].substring(0, $extractTableData[i][0].length - 1));
                    }
                    else {
                        $numericTableData[i].push($extractTableData[i][colIndex].substring(1, $extractTableData[i][colIndex].length));
                    }
                }
            }
        }());

        $('<p id="SD038_cheapestUnit">From £<span></span> per item</p>').insertBefore('.main');
        $('#SD038_cheapestUnit span').text($numericTableData[$numericTableData.length -1 ][1]);


        setTimeout(function() {
            $productHeader.find('#product_reviews').insertBefore('#SD038_cheapestUnit');
        }, 1000);

        $toggleOnOrOff = 2; // 2 if toggle is off --> do not show vat price, 1 if toggle is on --> show vat price
        // Builds the HTML Table out of $extractTableData.
        // option param (1 or 2) states if user wants to display VAT prices or not
        function buildHtmlTable(selector, option) {
            $(selector).empty();
            var i;
            var colIndex;
            for (i = 0; i < $extractTableData.length; i++) {
                var $row = $('<tr/>');
                for (colIndex = 0; colIndex < $extractTableData[i].length; colIndex++) {
                    if (colIndex !== option) {
                        var cellValue = $extractTableData[i][colIndex];
                        if (cellValue == null) cellValue = "";
                        $row.append($('<td/>').html(cellValue));
                    }
                }
                $(selector).append($row);
            }
        }

        // buildHtmlTable
        buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);
        // Amend
        $('#product-options-wrapper').insertAfter('#SD038_excelDataTable');

        var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
        $("#SD038_excelDataTable").prepend($tableHeader);
        $('#SD038_excelDataTable tr td:odd').append(' each');
        $('#SD038_excelDataTable tr th:eq(1)').append(' (ex VAT)');

        // For computing the saving amount the user currently benefits of
        var $purchaseSaving = $('<p class="SD038_saving">You save <span class="SD038_saving_amount"></span></p>');
        //$purchaseSaving.appendTo($('.add-to-cart-wrapper').find('.qty-wrapper'));
            $purchaseSaving.insertAfter('.qty-wrapper');

        // Let the user know how many more units left until the next level of savings/or when max reached
        var $nextLevelMessage = $('<p class="SD038_nextLevel" style="display:none;">Add <span class="SD038_nextLevel_units"></span> more' +
            ' to get the next level of savings at just <span class="SD038_nextLevel_amount"></span> each</p>');
        $nextLevelMessage.insertAfter($('.add-to-cart').find('.add-to-cart-buttons'));
        var $nextLevelMessageMax = $('<p class="SD038_nextLevel_max" style="display:none;">You have reached the highest level of savings at just ' +
            '<span class="SD038_nextLevel_amount"></span> each</p>');
        $nextLevelMessageMax.insertAfter($('.add-to-cart').find('.add-to-cart-buttons'));

        // Display price total
        var $priceTotalMessage = $('<p class="SD038_priceTotal"></p>');
        //$priceTotalMessage.insertAfter('.qty-wrapper');
        $priceTotalMessage.appendTo($('.add-to-cart-wrapper').find('.qty-wrapper'));

        // Compute the value for a single unit (both ex and inc VAT)
        var $priceExcludingTax = $('.add-to-cart').find('.price-box:first').find('.price-excluding-tax').find('.price');
        var $priceIncludingTax = $('.add-to-cart').find('.price-box:first').find('.inc-vat');

        $priceExcludingTax = $priceExcludingTax.text().trim().substring(1, $priceExcludingTax.text().trim().length - 7);
        $priceIncludingTax = $priceIncludingTax.text().trim().substring(2, $priceIncludingTax.text().trim().length - 9);

        if ($('#product-options-wrapper').length) {
            $priceExcludingTax = $computePriceWithoutTax;
            $priceIncludingTax = $computePriceWithTax;
        }

        // $priceExcludingTax, $priceIncludingTax (current standard value for a single unit)
        // $getValue to replace currentValue (number of units user wants to purchase)
        // $numericTableData - discount data (first column -> number of items)
        // second column -> depends on the value of $toggleOnOrOff (either shows prices per item ex. or inc. VAT)
        function displayComputations(currentValue, showVATorNOT) { // showVATorNOT -> 1 if off on 2 if on
            var i; // colIndex
            if (showVATorNOT === 1) {showVATorNOT++;} else {showVATorNOT--;}
            var exORincVATMessage = (showVATorNOT === 1) ? "ex VAT" : "inc VAT";
            var amountSaved = (showVATorNOT === 1) ? $priceExcludingTax : $priceIncludingTax;

            if (currentValue === 0) {
                $nextLevelMessage.hide();
                $nextLevelMessageMax.hide();
                $('.SD038_saving').hide();
                $priceTotalMessage.hide();
            }
            else if (currentValue < $numericTableData[0][0] && currentValue !== 0) {
                $nextLevelMessageMax.hide();
                $nextLevelMessage.show();
                $('.SD038_saving').hide();
                $priceTotalMessage.show();
                $('.SD038_nextLevel_units').text($numericTableData[0][0] - currentValue);
                $('.SD038_nextLevel_amount').text('£' + $numericTableData[0][showVATorNOT]);
               // $('.SD038_priceTotal').text('£' + ($numericTableData[0][showVATorNOT] * currentValue).toFixed(2) + " " + exORincVATMessage);
                if (showVATorNOT === 1) {
                    $('.SD038_priceTotal').html('£' + ($priceExcludingTax * currentValue).toFixed(2) + ' ' + '<span>' + exORincVATMessage + '</span>');
                } else {
                    $('.SD038_priceTotal').html('£' + ($priceIncludingTax * currentValue).toFixed(2) + ' ' + '<span>' + exORincVATMessage + '</span>');
                }
            }
            else if (currentValue >= $numericTableData[$numericTableData.length - 1][0]) {
                $nextLevelMessage.hide();
                $nextLevelMessageMax.show();
                $priceTotalMessage.show();
                $('.SD038_saving').show();
                $('.SD038_nextLevel_amount').text('£' + $numericTableData[$numericTableData.length - 1][showVATorNOT]);
                amountSaved = amountSaved * currentValue - ($numericTableData[$numericTableData.length - 1][showVATorNOT] * currentValue);
                $('.SD038_saving_amount').text('£' + amountSaved.toFixed(2));
                $('.SD038_priceTotal').html('£' + ($numericTableData[$numericTableData.length - 1][showVATorNOT] * currentValue).toFixed(2) +
                    " " + '<span>' + exORincVATMessage + '</span>');

            }
            else {
                for (i = 0; i < $numericTableData[0].length - 1; i++) {
                    if (currentValue >= $numericTableData[i][0] && currentValue < $numericTableData[i + 1][0]) {
                        $nextLevelMessageMax.hide();
                        $nextLevelMessage.show();
                        $priceTotalMessage.show();
                        $('.SD038_saving').show();
                        $('.SD038_nextLevel_units').text($numericTableData[i + 1][0] - currentValue);
                        $('.SD038_nextLevel_amount').text('£' + $numericTableData[i + 1][showVATorNOT]);
                        amountSaved = amountSaved * currentValue - ($numericTableData[i][showVATorNOT] * currentValue);
                        $('.SD038_saving_amount').text('£' + amountSaved.toFixed(2));
                        $('.SD038_priceTotal').html('£' + ($numericTableData[i][showVATorNOT] * currentValue).toFixed(2) + " " + '<span>' + exORincVATMessage + '</span>');
                    }
                }
            }
        }

        /*
            Dynamically retrive the quantity the user inputs and use it for further computations (e.g amount saved)
         */
        var $getQuantity = $('.qty-wrapper').find('#qty');
        var $getAddedQuantity = $('.qty-wrapper').find('.plusqty');
        var $getSubtractedQuantity = $('.qty-wrapper').find('.minusqty');
        var $getValue = $getQuantity.val(); // always the current value input by the user
        displayComputations(parseInt($getValue), $toggleOnOrOff);
        $getQuantity.on('input', function() {
            $getValue = $getQuantity.val();
            if(Math.floor($getValue) == $getValue && $.isNumeric($getValue)) {
                displayComputations(parseInt($getValue), $toggleOnOrOff);
            }
        });

        $getAddedQuantity.on('click', function() {
            var $getQuantity = $('.qty-wrapper').find('#qty');
            $getValue = $getQuantity.val();
            if(Math.floor($getValue) == $getValue && $.isNumeric($getValue)) {
                displayComputations(parseInt($getValue), $toggleOnOrOff);
            }
        });

        $getSubtractedQuantity.on('click', function() {
            var $getQuantity = $('.qty-wrapper').find('#qty');
            $getValue = $getQuantity.val();
            if(Math.floor($getValue) == $getValue && $.isNumeric($getValue)) {
                displayComputations(parseInt($getValue), $toggleOnOrOff);
            }
        });

        // Dynamically change between the contents of the table (either show ex or inc VAT prices)
        $('.SD038_switch input[type="checkbox"]').on('click', function() {
            if (!$(this).is(':checked')) {
                $toggleOnOrOff = 2;
                buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);
                var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
                $("#SD038_excelDataTable").prepend($tableHeader);
                $('#SD038_excelDataTable tr td:odd').append(' each');
                $('#SD038_excelDataTable tr th:eq(1)').append(' (ex VAT)');
                displayComputations(parseInt($getValue), $toggleOnOrOff);
            }
            else {
                $toggleOnOrOff = 1;
                buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);
                var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
                $("#SD038_excelDataTable").prepend($tableHeader);
                $('#SD038_excelDataTable tr td:odd').append(' each');
                $('#SD038_excelDataTable tr th:eq(1)').append(' (inc VAT)');
                displayComputations(parseInt($getValue), $toggleOnOrOff);
            }
        });
        ga('send', 'event', 'SD038---Multibuy-Product', 'pageview');

    } // activate

})(); // _SD038