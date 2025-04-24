var _YMA_UC004_Calculator = (function($) {

	$('<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />').prependTo('.UC004');
  
	function loadScript(location, callback) {
	  var fileRef = document.createElement('script');
	  fileRef.setAttribute('type', 'text/javascript');

	  if (callback) {
	      if (fileRef.readyState) { // IE
	          fileRef.onreadystatechange = function() {
	              if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
	                  fileRef.onreadystatechange = null;
	                  callback();
	              }
	          };
	      } else { // Non-IE
	          fileRef.onload = function() {
	              callback();
	          };
	      }
	  }

	  fileRef.setAttribute('src', location);
	  document.head.appendChild(fileRef);
	}

	loadScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');


	var tableOuter = $('.UC004 .basicresult .basicresult_table .tb_result01');
	tableOuter.find('tr').each(function() {
		var $this = $(this);
		var className = $this.find('td:eq(0)').text().toLowerCase().trim();
		console.log(className);
		className = className.replace(' ', '-');
		$this.find('td:eq(1)').addClass('paymentAmount amount '+className);
		$this.find('td:eq(2)').addClass('interestAmount amount '+className);
	});


		var paymentAmountInitial = $('.paymentAmount.amount.monthly').html();

		var paymentYearsInitial = $('.basicresult_table p').html();
		var paymentYearsInitialLength = paymentYearsInitial.length;
		var paymentYearsInitialPosition = paymentYearsInitial.indexOf('years');
		paymentYearsInitial = paymentYearsInitial.substring(paymentYearsInitialPosition - 3, paymentYearsInitialPosition).trim();
		console.log(paymentYearsInitial);

		var interestInitial = $('.interestAmount.amount.monthly').html();

	$('<div class="estimated-results"> <h2> Estimated Results </h2> <p> The results of this calculator should not be considered a quote, loan offer, or as investment advice, and are provided as a guide only. </p> <div class="loan-calc-sentence"> Your <span class="repayment-amount-holder period"><select name="period-repayments" id="period-repayment"><option selected value="monthly">Monthly</option><option value="weekly">Weekly</option><option value="fortnightly">Fortnightly</option><option value="half-monthly">Half monthly</option></select></span> repayments would be <span id="repayment-amount" class="amount-box">'+paymentAmountInitial+'</span> meaning over <span class="amount-box">'+paymentYearsInitial+'</span> years </div><div class="actual-interest-sentence"> you would pay <span class="repayment-interest-amount" id="repayment-interest-amount">'+interestInitial+'</span> interest </div> <a href="#" class="search-again">Search Again</a></div>').insertBefore('.UC004 .calculator_informs.basicresult');

	$('<div class="suggested-advice"> <p> To obtain real qualified advice we suggest you speak to an advisor.</p> <p> Leave your details with our experienced Aussie Brokers and they\'ll call you back within the hour.</p> <a href="#" id="start-lightbox-form" class="new-btn"> Speak to an advisor </a><p> Get advice from Aussie Brokers within the hour. </p></div>').insertAfter('.UC004 .estimated-results');

	//$('.UC004 .enquiryform').wrapAll('<form method="post" action="/calculators/home-loan-repayment/result/?sid=12908471-btv1k-BasicRepay" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_77962 mfp-hide"></form>');


	$('#ContentPlaceHolder1_Panel1_0').insertAfter('.suggested-advice');

	

	$(document).on('click', '#start-lightbox-form', function(e) {
		e.preventDefault();

  		$('.enquiryform').addClass('active');
  		var top = $('.enquiryform').offset().top;
  		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: top }, 2000, "swing");

	});

	$(document).on('change', '#period-repayment', function() {
		
		var period = $('#period-repayment').find('option:selected').val();
		console.log("go");
		console.log(period);
		calcNewValues(period);

	});


	function calcNewValues(period) {

		console.log("WHY!");

		var monthlyRepayment = $('.paymentAmount.amount.monthly').html().trim();
		var weeklyRepayment = $('.paymentAmount.amount.weekly').html().trim();
		var fortnightlyRepayment = $('.paymentAmount.amount.fortnightly').html().trim();
		var halfMonthlyRepayment = $('.paymentAmount.amount.half-monthly').html().trim();

		var monthlyInterest = $('.interestAmount.amount.monthly').html().trim();
		var weeklyInterest = $('.interestAmount.amount.weekly').html().trim();
		var fortnightlyInterest = $('.interestAmount.amount.fortnightly').html().trim();
		var halfMonthlyInterest = $('.interestAmount.amount.half-monthly').html().trim();

		if(period == "monthly") {
			$('#repayment-amount').html(monthlyRepayment);
			$('#repayment-interest-amount').html(monthlyInterest);
		} else if(period == "weekly") {
			$('#repayment-amount').html(weeklyRepayment);
			$('#repayment-interest-amount').html(weeklyInterest);
		} else if(period == "fortnightly") {
			$('#repayment-amount').html(fortnightlyRepayment);
			$('#repayment-interest-amount').html(fortnightlyInterest);
		} else if(period == "half-monthly") {
			$('#repayment-amount').html(halfMonthlyRepayment);
			$('#repayment-interest-amount').html(halfMonthlyInterest);
		} 

		
	}

	$('.UC004 #ContentPlaceHolder1_ibtnSubmit_0').detach().appendTo('.UC004 .questionform');
	$('.UC004 .loan-text').replaceWith('<p class="loan-text">It can be confusing to know whether to get a variable rate or fixed rate mortgage, and what features are important. That\'s where a good broker comes in.</p>');
	$('<h2> Get in touch </h2><p class="call-back-text"> Fill out the form below and an Aussie Broker will call you back. </p>').prependTo('.UC004 .questionform');
	$('.UC004 .dynamic.calculator_top_right h1:first').remove();
	$('.UC004 .loan-header').replaceWith('<h1 class="help-choosing-header">Get help choosing the right home loan</h1>');
	
  	$('<p class="recommended-text"> <span class="highlight">*</span> fields are required </p>').insertAfter('.UC004 .call-back-text');
  	$('<p class="recommended-text"> <span class="highlight">*</span> fields are required </p>').insertAfter('.UC004 #ContentPlaceHolder1_ibtnSubmit_0');
  
  	$('.UC004 .formfield, .UC004 .results-table').wrapAll('<div class="form-results-holder"></div>');
  	$('<div class="next-panel"><h2> Get in touch </h2><p class="loan-calc-text">  The results of the Home Loan Repayment Calculator should not be considered a quote, loan offer, or as investment advice, and are provided as a guide only. </p><p> We suggest you speak to a local mortgage broker who will help you find the right loan for your needs.</p> <a href="#" id="start-form"> Get help now </a></div>').insertAfter('.basicresult_table .form-results-holder');
  	// Form Alteration Stuff
  	$('.UC004 .questionform input').each(function() {
    	var $this = $(this);
      	$this.parents('li').find('.question').append(' <span class="highlight">*</span>');
    });
  	$('.UC004 .questionform select').each(function() {
    	var $this = $(this);
      	$this.parents('li').find('.question').append(' <span class="highlight">*</span>');
    });
  
	tableOuter.find('tr').each(function() {
		var $this = $(this);
		var className = $this.find('td:eq(0)').text().toLowerCase().trim();
		//console.log(className);
		className = className.replace(' ', '-');
		$this.find('td:eq(1)').addClass('paymentAmount amount '+className);
		$this.find('td:eq(2)').addClass('interestAmount amount '+className);
	});
	
	// Events
	$('.UC004 #recalculate').click(function(e) {
		e.preventDefault();
		getNewCalculationValues();
		ga('send', 'event', 'Clicked Recalculate Button Mortgage Calc page','clicked-recalculate', {nonInteraction: 1});
	});
  
  	$('.UC004 #ContentPlaceHolder1_ibtnSubmit_0').click(function() {
      ga('send', 'event', 'Submits Large Form on Mortgage Form','submit-large-form', {nonInteraction: 1});
      return true;
    });
  

	Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };




})(jQuery);
