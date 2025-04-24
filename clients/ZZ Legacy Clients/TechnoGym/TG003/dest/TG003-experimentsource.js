(function ($) {

	$('body').addClass('TG003');

	/*-------move exit outside what will be replaced so cookie is still stored-------*/
	var cataloguePopup = $('#request-catalogue-popup');

	var popupCloseExit = cataloguePopup.find('.modal-header .close');
	cataloguePopup.find('.modal-dialog').append(popupCloseExit);

	/*-------Replace exisiting content with new HTML wrapper-------*/
	var popupContent = cataloguePopup.find('.modal-content');
	popupContent.html('<div class="tg3-newPopup"/>');

	var newPopuphtml = $('.tg3-newPopup');

	/*-------Get product name/details from product page-------*/
	var productInfo = $('#product-info');
	var productName = productInfo.find('.product-name h1').text().trim(),
		productImage = $('.product-img-box .gallery-image.lazy-loaded:first').attr('src');

		var productDescription,
		productTitle,
		productCatpageAmount;

	/*-------Put each individuals product content here-------*/
	  if(productName === "RUN PERSONAL"){
		productDescription ='Want to know why the technogym&reg; ' + productName + ' gives you the ultimate running experience?';
		pageAmount = '40'; //amount of pages specific product catalog has
	  }//else if{

	  //}


	/*-------Add new content markup-------*/
	cataloguePopup.find('.close').prependTo(newPopuphtml);
	newPopuphtml.append('<h3>'+productDescription+'</h3>');
	newPopuphtml.append('<div class="tg3-productImage"><img src="' + productImage + '"/></div>');
	newPopuphtml.append('<div class="tg3-usps"/>');
	newPopuphtml.append('<div class="tg3-popup-buttons"/>');

	/*-------USPS-------*/
	var uspsBlock = $('.tg3-usps'),
		buttonsBlock = $('.tg3-popup-buttons');

	var popupUSPs = [
		['Free & Immediately available to download'],
		['Over ' + pageAmount + ' pages of additional content'],
		['Understand why TECHNOGYM provide the worlds most desirable health and wellness equipment']
	];

	$.each(popupUSPs, function () {
		var uspText = this[0];
		var usp = $(['<div class="tg3-usp">',
			'<p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAS1BMVEUAAAAfKzIeKzMAVVUeKzMeLDMeKzMeKzMfKjIfLDIkJCQeKzIfKzQdKzIeLDMrKyseKzQeKzMeKzMeKzQeLDQeKzMfKjQeKzMAAAA7GvLmAAAAF3RSTlMAQpsD9aSh/FtSB3C3trUGj7SzssGHhVruXaoAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4QgLCwE4y/HIeQAAALBJREFUWMPt1MkOwjAMRVEzQwokDO37/z9tQUCTNhv7SQgke51zV3ZEfP54FssV59fYMIXBgyk8PVF4eXPh442FzANb0u/27t27d/9z/hA43+AYOI9qQeOBU+D8vKD1wDlwfihEvZeUvcMlqv2kcI1qXy0o97co3KJh/ycFw/0Uhbvl/oqC6X4T6esF3f+RSD8v6P+vRPqyYPF5webHgtW/C3Yv0pL+UeC8SEd6n+9PD83KP+z9FfK2AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTExVDExOjAxOjU2KzAyOjAwEa2GwAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0xMVQxMTowMTo1NiswMjowMGDwPnwAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"/>' + uspText + '</p>',
			'</div>'
		].join(''));
		$(uspsBlock).append(usp);
	});

	/*-------Add bottom buttons-------*/
	buttonsBlock.html('<a class="tg3-request" href="#">Request your ' + productName + ' Brochure Now </a><a class="tg3-notnow" href="#">Not right now</a>');

	/*-------Make not right now button close pop up-------*/
	$('.tg3-notnow').click(function () {
		$('.modal-content .close').click();
	});

	var requestLink = $('.product-other-social a').attr('href');

	$('.tg3-request').attr('href', requestLink);

	/*-------Events-------*/
	var trackerName = window.ga.getAll()[0].get('name'); // GA tracker name
	var closedPopupevent,
		crossClickevent,
		brochureEvent;  
	
	$('.tg3-request').click(function(){
		if(!brochureEvent){
			window.ga(trackerName + '.send', 'event', 'TG003 Request Catalogue Pop Up', 'button click', 'TG003 Request Catalogue Pop Up user clicked request brochure', {nonInteraction: 1});
			brochureEvent = true;
		}
	});

	$('.tg3-notnow').click(function(){
		if(!closedPopupevent){
			window.ga(trackerName + '.send', 'event', 'TG003 Request Catalogue Pop Up', 'button click', 'TG003 Request Catalogue Pop Up user clicked not right now on popup', {nonInteraction: 1});
			closedPopupevent = true;
		}
	});

	$('.modal-content .close').click(function(){
		if(!crossClickevent){
			window.ga(trackerName + '.send', 'event', 'TG003 Request Catalogue Pop Up', 'button click', 'TG003 Request Catalogue Pop Up user clicked close brochure popup', {nonInteraction: 1});
			crossClickevent = true;
		}
	});
 	



})(window.jQuery);