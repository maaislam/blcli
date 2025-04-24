import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

// ID - Experiment Title
const SD038 = (() => {

	// Experiment code
	const activate = () => {
	
				var $ = jQuery;
	
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
			
		    var $productOptionsWrapper = $('#product-options-wrapper'),	
				$productDesoptionsbottom = $('.product-des').find('.product-options-bottom');
			var $productDes = $('.product-des');

			if ($productOptionsWrapper.length) {
					$productDesoptionsbottom.prependTo('.add-to-cart-wrapper');
					$productDesoptionsbottom.find('.price-box:first').prependTo('.add-to-cart');
					var $productdetailsBox = $productDes.find('.product-details-box');
					$productdetailsBox.prependTo('.add-to-cart-wrapper');


		
					// Compute the value for a single unit (both ex and inc VAT)
					var $computePriceWithoutTax = $('.add-to-cart').find('.price-box:first').find('.price-excluding-tax').find('.price');
					var $computePriceWithTax = $('.add-to-cart').find('.price-box:first').find('.inc-vat');
					$computePriceWithoutTax = $computePriceWithoutTax.text().trim().substring(1, $computePriceWithoutTax.text().trim().length - 7);
					$computePriceWithTax = $computePriceWithTax.text().trim().substring(2, $computePriceWithTax.text().trim().length - 9);
			}

			// Insert the multi-buy wrapper
			var $specialOfferContainer = $('.desktop-stock-info');
			$multi_buyWrapper.insertAfter($specialOfferContainer);

			//Append mulitbuy table & the add to basket section to the multi buy wrapper

			var $discountTable = $productDes.find('.product-shop .multiple-item-table'),
				$cartWrapper = $productDes.find('.add-to-cart-wrapper');

			$discountTable,$cartWrapper.appendTo($multi_buyWrapper);

			/*------------------
			//Product Name area
			-------------------*/
			//chage the sku text & move product reviews

			function productHeader(){
				//change text of SKU number
				var $sku = $('.mobile-product-name .sku-number');
				$sku.find('span:first').text('PRODUCT CODE - ');
	
				var productReviews = $('#product_reviews');
					$sku.closest('.mobile-product-name').append(productReviews);

				//add the from price to top
				$sku.closest('.mobile-product-name').append('<p id="SD038_cheapestUnit">From £<span></span> per item</p>');
				}

				productHeader();


			/*------------------
			//Create table
			-------------------*/
			$('table.multiple-item-table:first tr:eq(0), table.multiple-item-table:first tr:eq(1)').remove(); 
			//Extract the data from the current table and display to subsequently display it in a tidier format
			function productData(){
				var $extractTableData = $('table.multiple-item-table:first tr').map(function(){
					return [
						$('td',this).map(function(){
							return $(this).text();
						}).get()
					];
				}).get();
				


			// Turn the extracted table data into an array of numbers to allow for further computations
			var $numericTableData = [];
			function dataArray(){
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
				//add the from text to the price span in the header
				$('#SD038_cheapestUnit > span').text($numericTableData[$numericTableData.length -1 ][1]);

			};
			dataArray();
			

			var $toggleOnOrOff;

			//2 means toggle is off so do not show VAT price, 1 is that the toggle is on.
			$toggleOnOrOff = 2; 
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
			//build the new table
			buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);

			//add the table header
			var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
			$("#SD038_excelDataTable").prepend($tableHeader);

			//Add savings
			var $purchaseSaving = $('<p class="SD038_saving">You save <span class="SD038_saving_amount"></span></p>');
			$productDes.find('.qty-wrapper').append($purchaseSaving);

			//add the savings banner underneath CTA - e.g add '' to get the next level of savings
			var $nextLevelMessage = $('<p class="SD038_nextLevel SD38-nextlevel-hide">Add <span class="SD038_nextLevel_units"></span> more to get the next level of savings at just <span class="SD038_nextLevel_amount"></span> each</p>');
			var $nextLevelMessageMax = $('<p class="SD038_nextLevel_max SD038_max-hide">You have reached the highest level of savings at just <span class="SD038_nextLevel_amount"></span> each</p>');
			$productDes.find('.add-to-cart-buttons:first').after($nextLevelMessage).after($nextLevelMessageMax);

			//add the total price
			var $priceTotalMessage = $('<p class="SD038_priceTotal"></p>');
			$productDes.find('.qty-wrapper').after($priceTotalMessage);

			//Get the price values
			var $priceExcludingTax = parseInt($productDes.find('.add-to-box .price-excluding-tax .price').text().replace(/[^0-9$.,]/g, '')).toFixed(2);
			var $priceIncludingTax = parseInt($productDes.find('.add-to-box .inc-vat').text().replace(/[^0-9$.,]/g, '')).toFixed(2);

			if ($($productOptionsWrapper).length) {
				$priceExcludingTax = $computePriceWithoutTax;
				$priceIncludingTax = $computePriceWithTax;
			}
			

			function displayComputations(currentValue, showVATorNOT) { // showVATorNOT -> 1 if off on 2 if on

				var $getNextlevel = $('.SD038_nextLevel'),
					$maxLevelreached = $('.SD038_nextLevel_max'),
					$savingMade = $('.SD038_saving');
				var i; // colIndex
				if (showVATorNOT === 1) {
					showVATorNOT++;
				} else {
					showVATorNOT--;
				}
				var exORincVATMessage = (showVATorNOT === 1) ? "ex VAT" : "inc VAT";
				var amountSaved = (showVATorNOT === 1) ? $priceExcludingTax : $priceIncludingTax;
	
				if (currentValue === 0) { //if user has no qty

					$getNextlevel.addClass('SD38-nextlevel-hide');
					$maxLevelreached.addClass('SD038_max-hide');
					$savingMade.hide();
					$priceTotalMessage.hide();
				}
				else if (currentValue < $numericTableData[0][0] && currentValue !== 0) { //if the minimum multi buy saving is higher than the qty
					$maxLevelreached.addClass('SD038_max-hide');
					$getNextlevel.removeClass('SD38-nextlevel-hide');
					$savingMade.hide();
					$priceTotalMessage.show();
					$('.SD038_nextLevel_units').text($numericTableData[0][0] - currentValue);
					$('.SD038_nextLevel_amount').text('£' + $numericTableData[0][showVATorNOT]);
				    $('.SD038_priceTotal').text('£' + ($numericTableData[0][showVATorNOT] * currentValue).toFixed(2) + " " + exORincVATMessage);
					if (showVATorNOT === 1) {
						$('.SD038_priceTotal').html('£' + ($priceExcludingTax * currentValue).toFixed(2) + ' ' + '<span>' + exORincVATMessage + '</span>');
					} else {
						$('.SD038_priceTotal').html('£' + ($priceIncludingTax * currentValue).toFixed(2) + ' ' + '<span>' + exORincVATMessage + '</span>');
					}
				}
				else if (currentValue >= $numericTableData[$numericTableData.length -1][0]) { //if the maximum number of items has been added
					$getNextlevel.addClass('SD38-nextlevel-hide');
					$maxLevelreached.removeClass('SD038_max-hide');
					$priceTotalMessage.show();
					$savingMade.show();
					
					$('.SD038_nextLevel_amount').text('£' + $numericTableData[$numericTableData.length - 1][showVATorNOT]);
					amountSaved = amountSaved * currentValue - ($numericTableData[$numericTableData.length - 1][showVATorNOT] * currentValue);
					$('.SD038_saving_amount').text('£' + amountSaved.toFixed(2));
					$('.SD038_priceTotal').html('£' + ($numericTableData[$numericTableData.length - 1][showVATorNOT] * currentValue).toFixed(2) +
						" " + '<span>' + exORincVATMessage + '</span>');
		
	
				}
				else {
					for (i = 0; i < $numericTableData[0].length - 1; i++) {
						if (currentValue >= $numericTableData[i][0] && currentValue < $numericTableData[i + 1][0]) {
							$maxLevelreached.addClass('SD038_max-hide');
							$getNextlevel.removeClass('SD38-nextlevel-hide');
							$priceTotalMessage.show();
							$savingMade.show(); 
							$('.SD038_nextLevel_units').text($numericTableData[i + 1][0] - currentValue);
							$('.SD038_nextLevel_amount').text('£' + $numericTableData[i + 1][showVATorNOT]);
							amountSaved = amountSaved * currentValue - ($numericTableData[i][showVATorNOT] * currentValue);
							if(amountSaved != 0){
								$('.SD038_saving_amount').text('£' + amountSaved.toFixed(2));
							}else{
								$('.SD038_saving').hide();
							}
							$('.SD038_priceTotal').html('£' + ($numericTableData[i][showVATorNOT] * currentValue).toFixed(2) + " " + '<span>' + exORincVATMessage + '</span>');
						}
					}
				}
			}
	
			
		     //Dynamically retrive the quantity the user inputs and use it for further computations (e.g amount saved)
			
			var $getQuantity = $productDes.find('.qty-wrapper').find('#qty');
			var $getAddedQuantity = $productDes.find('.qty-wrapper').find('.plusqty');
			var $getSubtractedQuantity = $productDes.find('.qty-wrapper').find('.minusqty');
			var $getValue = $getQuantity.val(); // always the current value input by the user
			displayComputations(parseInt($getValue), $toggleOnOrOff);


			function updateQTY(){
				$getValue = $getQuantity.val();
				if(Math.floor($getValue) == $getValue && $.isNumeric($getValue)) {
					displayComputations(parseInt($getValue), $toggleOnOrOff);
				}
			}

			$getQuantity.on('input', function() {
				updateQTY();
			});
	
			$getAddedQuantity.click(function() {
				updateQTY();
			});
	
			$getSubtractedQuantity.on('click', function() {
				updateQTY();
			});
	
			// Dynamically change between the contents of the table (either show ex or inc VAT prices)

			var $excelTable = $("#SD038_excelDataTable"),
				$oddTR = $excelTable.find('tr td:odd'),
				$tableHeaders = $excelTable.find('tr th:eq(1)');


			$('.SD038_switch input[type="checkbox"]').on('click', function() {
				if (!$(this).is(':checked')) {
					$toggleOnOrOff = 2;
					buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);
					var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
					$excelTable.prepend($tableHeader);
					$oddTR.append(' each');
					$tableHeaders.append(' (ex VAT)');
					displayComputations(parseInt($getValue), $toggleOnOrOff);
				}
				else {
					$toggleOnOrOff = 1;
					buildHtmlTable('#SD038_excelDataTable', $toggleOnOrOff);
					var $tableHeader = '<tr><th>Number of items</th><th>Price per item</th> .....</tr>';
					$excelTable.prepend($tableHeader);
					$oddTR.append(' each');
					$tableHeaders.append(' (inc VAT)');
					displayComputations(parseInt($getValue), $toggleOnOrOff);
				}
			});

		}
		productData();			

	};

	// Audience conditions
	const triggers = ((options) => {
		// FullStory tagging
		utils.fullStory('SD038', 'Variation 1');

		UC.poller([
			'.product-des',
            '.product-shop',
            '.add-to-cart-wrapper',
            '.qty-wrapper',
            '.extra-info.pro-avail-info',
			'.tierprice_image',
			], activate);

	
	})();

})();
