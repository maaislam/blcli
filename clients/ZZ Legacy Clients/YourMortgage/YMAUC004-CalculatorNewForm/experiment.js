jQuery(document).ready(function($){
  var _UCCALC = (function($) { 
    $('body').addClass('UCCALC');
    
    
    $('.calculator_top .subHeader').remove();
    $('.calculator_top .txt').remove();
    
    $('#LFcontainer .formfield').wrapAll('<div class="uchomeloancal"></div>');
            
   var newHeaderMarkup = $([
   '<div class="uc-calc-newpage ucheader">',
     '<div class="uccalc-headimage">',
     	'<div class="uccalc-overimage-text">',
     		'<h1>Planning a Home Loan?</h1>',
     		'<p>We know how difficult trying to find the best Mortage and Loan advice can be thats why we’re on hand to help you find the best rates and advice.</p>',
     		'<a href="http://www.yourmortgage.com.au/enquiry/get-help-choosing-the-right-home-loan/"><div class="uc-calc-contactbutton">Get in Touch</div></a>',
     	'</div>',
     '</div>',
     '<div class="uc-calc-intro-text">',
     		'<p>Here at Your Mortgage you can choose from over 17 different financial calculators to help you find the exact amount and information you need to know when it comes to home loans and finances. We also offer you the option to contact one of over 4700 mortgage brokers to ensure you find the best deal available! </p>',
     	'</div>',
     	'<div class="uccalc-uspswrap"><div class="uc-usps-container"></div></div>',
     '</div>',
     '<div class="uc-maincontent-wrap">',
              '<h2>Our Calculators</h2>',
                 '<div class="uc-nav-wrap"><ul class="uc-nav"></uc></div>',
                       '<div class="ucslider-wrap">',
                         "<h2>We only find the best rates and finances from Australia’s Leading Banks</h2>",
                        '</div>',
     	'<div id="uchomeloan" class="uccalc-box homeloan">',
              '<div class="ucboxlabel">Home Loan Calculators</div>',
                    '<div class="uc-calc-link small"></div>',
                     '<div class="uc-calc-link homeloan"></div>',
         '</div>',
     	 '<div id="ucpriority" class="uccalc-box priority">',
     		'<div class="ucboxlabel">Special Offers</div>',
     		  '<div class="ucspecialofferbox"></div>',
         	'<div class="ucboxlabel best">Best Rates</div>',
     		  '<div class="ucrates"></div>',
         '</div>',
     	 '<div id="ucinvestment" class="uccalc-box investment">',
              '<div class="ucboxlabel">Investment Calculators</div>',
                    '<div class="uc-calc-link small"></div>',
         '</div>',
     	'<div id="uctax" class="uccalc-box tax">',
              '<div class="ucboxlabel">Tax Calculators</div>',
                    '<div class="uc-calc-link small"></div>',
         '</div>',
     	'<div id="uccostofbuy" class="uccalc-box costofbuy">',
              '<div class="ucboxlabel">Cost Of Buying</div>',
                    '<div class="uc-calc-link small"></div>',
         '</div>',
     	'<div id="uccomp" class="uccalc-box compare">',
              '<div class="ucboxlabel">Comparison Tools</div>',
                    '<div class="uc-calc-link small"></div>',
         '</div>',
     	'<div class="uc-firsttimebuy">',
     		'<h2>First Time Buyer?</h2>',
     			'<p>If you are a first time buyer, feeling a little confused about what to do or what information you might need then why not check out our very own first time buyers guide!</p>',
     			'<a href="http://www.yourmortgage.com.au/first-home-buyers/"><div class="ucfirst-time-button">First Time Buyers Guide <img src="//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/db10f51e563cb633c20a980bf26f1e20_asset_6.png"/></div></a>',
     			'<div class="ucbuyupsell"><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/3f749e51f5b7d564424a9b6cbcc796f8_asset_5.png"/>12 People have looked at this in the past hour!</div>',
     	'</div>',
     	'<div class="uc-homeloanhelp">',
     		'<h2>Home Loan <span>Help</span></h2>',
			'<div class="uc-homeloan-question"></div>',
     	'</div>',
     	'<div class="uc-search">',
     		'<h2>Need <span>Help?</span></h2>',
			'<p>If you need any more advice or have any more enquiries then why not contact one of over 4700 Mortgage brokers that we have available.</p>',
     	'</div>',
     	'<div class="ucblocks"><div class="ucspecialoffer one"><h2>Special <span>Offers</span></h2></div><div class="ucblock ucspecialoffer two"><h2>Forums</h2></div></div>',
     		'<div class="ucbottom-adverts"><div class="ucadvertone"></div><div class="ucadverttwo"></div></div>',
     '</div>'
      ].join('')).insertAfter('#wrap .header:first');
    
      var uspBlocks = [
          ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/4434b252f200aad9dd643a5ac62b44fd_asset_3.png', 'Millions', 'of satisfied users'],
          ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/5823882677a15129f08e0953fd184c8b_asset_2.png', 'Best Rates', 'Available'],
          ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/216e3f1e343e9b15266468f099d76a51_asset_4.png', 'Leading','Expert Advice']
        ];
        $.each(uspBlocks, function () {
            var image = this[0], //brand1
                text1 = this[1], //links
                text2 = this[2]; //links
            $([
            '<div class="uc-usp">',
                '<div class="ucimgusp"><img src="'+image+'"/></div>',
                '<div class="ucsp-text"><span>'+text1+' </span>' +text2+'</div>',
            '</div>'
          ].join('')).appendTo('.uc-usps-container');
        });
    
    var navLinks = [
          ['Home Loan Calculators', '#uchomeloan'],['Investment Property Calculators','#ucinvestment'],['Tax Calculators','#uctax'],['Costs of Buying','#uccostofbuy'],['Comparison Tools','#uccomp'],['Mortgage Chooser','http://www.yourmortgage.com.au/enquiry/mortgage-chooser/']
      	];
        $.each(navLinks, function () {
            var linkname = this[0], //brand1
                link = this[1]; //links
            $(['<li><a href="'+link+'">'+linkname + '</a></li><p>|</p>'].join('')).appendTo('.uc-nav-wrap .uc-nav');
        });
    
    var helpQuestion = [
          ['How Much Can I Borrow', 'http://www.yourmortgage.com.au/enquiry/how-much-can-i-borrow/'],["Refinance and Save $1000's",'http://www.yourmortgage.com.au/enquiry/should-i-refinance-to-get-a-better-rate/'],['Get Help Choose the right home loan','http://www.yourmortgage.com.au/enquiry/get-help-choosing-the-right-home-loan/'],['Ask our expert a question','http://www.yourmortgage.com.au/enquiry/ask-our-expert-a-question/']
      	];
        $.each(helpQuestion, function () {
            var linkname = this[0], //brand1
                link = this[1]; //links
            $(['<div class="uc-helpbox"><div class="ucquestarrow"><a href="'+link+'"><span><img src="//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/db10f51e563cb633c20a980bf26f1e20_asset_6.png"/></span></a></div><a class="uchelptext" href="'+link+'">'+linkname +'</a></div>'].join('')).appendTo('.uc-homeloan-question');
        });
    
    /*Home Loan Calculator*/
 	$('.uchomeloancal').appendTo('.uc-calc-link.homeloan');
    //text for home loan calculator
	$('<div class="uchomeloanhead"><h3>Home Loan Repayment</h3><p>Our Home Loan Repayment Calculator will work out your minimum monthly repayment balance and amount of interest paid</div>').prependTo('.uchomeloancal');
    
    //Adding Need Help Section
    $('#RHcontainer .blue_box:eq(2)').appendTo('.uc-search');
    //$('.uc-searchboxtext .blue_box').text('If you need any more advice or have any more enquiries then why not contact one of over 4700 Mortgage brokers that we have available.');
    
    /*========SLIDER=========*/
    var sliderImage = [
      {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/26d88dce6de5079b79c4c9ae6b2cc25c_2000px-citibank.svg.png",
        "name": "citibank"
      },
      {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/0a31741ced55280c7e1202223e4989c7_amp_logo.png",
        "name": "AMP"
      },
       {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/5f374a8805f816398bccd94900b360cc_ing_logo.png",
        "name": "ingdirect"
      },
       {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/40c68ffd4c0e85b6de36d90e4e5bd51e_national_australia_bank.png",
        "name": "nab"
      },
       {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/6b3fbb265fdc9bc7a6878ae3a9bf04e8_300px-westpac.png",
        "name": "westpac"
      },
       {
        "image": "//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/063516f396d8c6dc6e9c9e6078edd9ac_hsbc-logo.png",
        "name": "HSBC"
      }
       ];
    
    $.getScript('//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', function() {
      console.log('got script');
        var carouselContainer = $('<div class="ucslider-wrapper" ></div>'),
            carouselUl = $('<ul class="uccalc-slider-carousel" ></ul>');
            carouselContainer.append(carouselUl);
     
        $.each(sliderImage, function(idx, val) {
           var  image = val.image,
                name= val.name;
            var item = $([
                '<li class="uc-slide">',
                    '<a title="' + name + '">',
                        '<img alt="' + name + '" src="' + image + '" />',
                    '</a>',
                '</li>'
            ].join(''));
            carouselUl.append(item);
        });
        
        carouselContainer.appendTo('.ucslider-wrap');
        
      
        carouselUl.slick({
            dots: false,
            infinite: true,
            speed: 300,
            slide: '.uc-slide',
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: true
              }
            },
            {
              breakpoint: 411,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
    });
    
    /*TOP CALCULATOR - small links*/
    
   var smallLinks = {
        homeloans: [
               {
                name:'How Much Can I Borrow?',
                link:'http://www.yourmortgage.com.au/calculators/how-much-can-i-borrow/',
                text:'Estimate of the maximum you can borrow, based on monthly income and expenditure',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/47e986ea099d842b1eea3749efad3c34_howmuchborrow.png'
              },
             {
                name:'Mortgage Repayment',
                link:'http://www.yourmortgage.com.au/calculators/repay_advanced/',
                text:'Shows the effect of making additional repayments and redraws and produces a table showing the full loan amortisation',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f983e845f323c52f16276887db6dd2cb_mortgagerepay.png'
              },
             {
                name:'Income Expenditure',
                link:'http://www.yourmortgage.com.au/calculators/income_and_expenditure/',
                text:'Income and expenditure worksheet calculates how much you can afford to borrow.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/960c29f1553f16ab7a409940cebcdf84_incomeexpend.png'
              },
          	{
                name:'Fixed vs Variable Interest',
                link:'http://www.yourmortgage.com.au/calculators/fixed_variable/',
                text:'Analyse the choice of fixed or variable rates based on variable interest rate, comparing the amount repaid',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/1ed36c9805a98e7a38ac9fe6c7ca705b_fixvarinterest.png'
              }
        ],
      tax: [
               {
                name:'Capital Gains Tax',
                link:'http://www.yourmortgage.com.au/calculators/capital_gains_tax/',
                text:'Indication of the amount of capital gains tax you may be required to pay on an investment property.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f3b7f423f52039f25b48752889f9f708_tax_(1).png'
              },
             {
                name:'Negative Gearing',
                link:'http://www.yourmortgage.com.au/calculators/negative_gearing/',
                text:'Give residential property investors an estimate of the net income effect of owning an investment property.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f983e845f323c52f16276887db6dd2cb_mortgagerepay.png'
              },
             {
                name:'Stamp Duty',
                link:'http://www.yourmortgage.com.au/calculators/stamp_duty/',
                text:"Work out how much you'll owe the tax department for stamp duty on your home and on the amount you borrow",
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f7c2c614efc65869d3e0270126ddcda1_house-with-dollar-sign.png'
              },
        	{
                name:'Simple Capital Gains Tax',
                link:'http://www.yourmortgage.com.au/calculators/simple_capital_gains_tax/',
                text:'Indication of the amount of capital gains tax you may be required to pay on an investment property.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/47e986ea099d842b1eea3749efad3c34_howmuchborrow.png'
              }
        ],
        investment: [
               {
                name:'Affording Investment Property',
                link:'http://www.yourmortgage.com.au/calculators/can_i_afford_investment_property/',
                text:'Provides an estimate of how much an investment property will cost you',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/48c65258be9babb16cd22ff4bfd2d9a8_investmentprop.png'
              },
             {
                name:'Term Deposit Yield',
                link:'http://www.yourmortgage.com.au/calculators/term_deposit/',
                text:'Determine which term deposits offer the highest yield.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/bf270bd13f5c9cc22e3701168223dd86_termdepoyield.png'
              },
             {
                name:'Retirement Savings',
                link:'http://www.yourmortgage.com.au/calculators/retirement_savings/',
                text:'Estimate the amount of money you will save by the time you retire and the number of years these savings will last you',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/a4869c6b0b904aa7b1c3f3862f7f8251_retirment.png'
              },
          	{
                name:'Mortgage Calculators Canada',
                link:'http://www.whichmortgage.ca/calculators/',
                text:'Repayment calculators for the Canadian mortgage market on our sister website Which Mortgage.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/349783e20629593598308ff6d978fc39_canada.png'
              }	
        ],
     	costofbuy: [
               {
                name:'Lenders Mortgage Insurance',
                link:'http://www.yourmortgage.com.au/calculators/mortgage_insurance/',
                text:'Compare your estimated financial position after 7 years versus 7 years of home loan repayments',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/960c29f1553f16ab7a409940cebcdf84_incomeexpend.png'
              },
             {
                name:'Home Cost Estimator',
                link:'http://www.yourmortgage.com.au/calculators/homecost/',
                text:'Estimate the total cost of purchasing a property including all those nasty hidden costs.',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f983e845f323c52f16276887db6dd2cb_mortgagerepay.png'
             }
        ],
      compare: [
               {
                name:'Rent vs Buy',
                link:'http://www.yourmortgage.com.au/calculators/rent_vs_buy/',
                text:'Compare your estimated financial position after 7 years versus 7 years of home loan repayments',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f983e845f323c52f16276887db6dd2cb_mortgagerepay.png'
              },
             {
                name:'Buy & Sell or Sell & Buy',
                link:'http://www.yourmortgage.com.au/calculators/buy_or_sell/',
                text:'Indication of the costs you will face depending on the order in which you sell your old home and buy your new one',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/f7c2c614efc65869d3e0270126ddcda1_house-with-dollar-sign.png'
              },
             {
                name:'Relocation Timeline',
                link:'http://www.yourmortgage.com.au/calculators/relocation_timeline/',
                text:'Takes you specific moving details and produce a customized timeline',
                icon:'//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/bf270bd13f5c9cc22e3701168223dd86_termdepoyield.png'
              }
        ]
   };
   
   var expObj;
    
    $('.uccalc-box').each(function(){
      var $el = $(this);
      
      if($(this).hasClass('homeloan')){
         expObj = smallLinks.homeloans;
       }
      else if($(this).hasClass('tax')){
        expObj = smallLinks.tax;
      }
      else if($(this).hasClass('investment')){
        expObj = smallLinks.investment;
      }
      else if($(this).hasClass('costofbuy')){
        expObj = smallLinks.costofbuy;
      }
      else if($(this).hasClass('compare')){
        expObj = smallLinks.compare;
      }
      
      $.each(expObj, function(){
              var $links = $([
                '<div class="uccalc-smaller-calcs">',
                	'<img class="uclinkicon" src="'+this.icon+'"/>',
                      '<div class="uclinkname">',
                		'<a href="'+this.link+'"><h3>'+this.name+'</h3></a>',
                        '<p class="uclinktext">'+this.text+'</p>',
                      '</div>',
                    '</li>'
                    ].join(''));
      
             $links.appendTo($el.find('.uc-calc-link.small'));
  
     });   
      
       });  
    
    
    /*ADVERTS*/
    $('#div-gpt-ad-30025013-0').insertAfter('.uccalc-box.investment');
    $('#div-gpt-ad-30025024-0').appendTo('.ucadvertone');
    $('#div-gpt-ad-30025035-0').appendTo('.ucadverttwo');
    
    $('.ucbottom-adverts').insertBefore('#uccostofbuy');
    
    
    /*FORM*/
    $('<p class="ucdollar">$</div>').appendTo('.formfield .formQna:first');
   	//$('<div class="ucbutton">Calculate <img src="//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/db10f51e563cb633c20a980bf26f1e20_asset_6.png"/></div>').appendTo('.formfield');
  	
  
    	$("#ContentPlaceHolder1_btnCalculate").attr('src','//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/5e77fe9f37ced4331bc4356e7295ec9f_calculste.png');
    //$('#ContentPlaceHolder1_btnCalculate').hide();
    $('#ContentPlaceHolder1_FindaMortgageBroker1_BrokerFinder1_SearchButton').attr('src','//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/228d9311dec116a4b4a6f04790168d1a_asset_1.png');
   	$('#LFcontainer').remove(); 
    $('.uc-search .blue_box').contents().filter(function() {
   		 return this.nodeType === 3; 
	}).first().remove();
    
    /*bottom blocks*/
    $('#RHcontainer .blue_box:eq(0)').addClass('ucspecialofferboxoptions').appendTo('.ucspecialofferbox');
    
    
    
    //$('#globalcontainer').remove();
    
    $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
    //AMENDS
    $('<div class="uchomeloanusp">Used over 100,000 Times!</div>').prependTo('.uc-calc-link.homeloan');
    $('.ucbottom-adverts').insertBefore('#uccostofbuy');
    $('.uc-search').prependTo('.ucspecialoffer.one');
    $('.ucslider-wrap').hide();
    $('.ucspecialofferbox').insertAfter('.ucspecialheading');
    $('#RHcontainer .roundbox.subright').appendTo('.ucrates'); 
    $('#RHcontainer .blue_box:eq(0)').appendTo('.ucblock.ucspecialoffer.two');
    $('.ucspecialoffer.one h2:last').remove();
    $('#globalcontainer').hide();
    
    
    $('[data-google-query-id]').each(function(){
	
	var id = $(this).attr('id');
	googletag.cmd.push(function() { googletag.display(id); });
	});
    
    $('.sociallink').remove();
   
  })(window.jQuery);
  



  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');
  $('<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />').prependTo('body.UCCALC');


  $('<a href="#" class="new-lightbox-fire"> Go Form Go </a>').insertAfter('.UCCALC .uc-calc-intro-text');

  $.ajax({
    url: '/calculators/home-loan-repayment/result/',
    type: "GET",
    timeout: 5000,
    datattype: "html",
    success: function(data) {

        var result = $(data);
        
        var questionForm = result.find('.enquiryform');

        console.log(questionForm);

        $('<div class="mfp-hide form-popup lightbox-popup" id="form-lightbox"> <form method="POST" action="/calculators/home-loan-repayment/result/?sid=12930713-4xjqz-BasicRepay" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_43553"> </form>').prependTo('body.UCCALC');     

        result.find('.aspNetHidden').each(function() {
          var $this = $(this);
          console.log("go");
          $this.appendTo('#form2');

        });

        questionForm.appendTo('#form2');

        
        $('#ContentPlaceHolder1_ctl00_0_txtHouseholdIncome_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchDeposit_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchHouseWorth_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchMortgage_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchNewHome_0').val(0);
        $('#ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow2_0').val(0);

        $('#ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_0_0').attr('checked', 'checked');       
      
    
      
      
    }

  });

  $(document).on('click', '.new-lightbox-fire', function(e) {
    e.preventDefault();
    $.magnificPopup.open({
      mainClass: "qv-popup-holder",
      items: {
        src: '.UCCALC #form-lightbox', // can be a HTML string, jQuery object, or CSS selector
        type: 'inline'
      },
      callbacks: {
        open: function() {
          $("#ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtPostcode_0")
            .watermark("Suburb or Postcode")
            .autocomplete({
                minLength: 3,
                select: function(event, ui) {
                    $(this).val(ui.item.value).change();
                },
                appendTo: "#form2",
                source: function(request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;",
                        url: "/webservice/address.asmx/GetList",
                        data: "{ \"keyword\" : \"" + request.term + "\" }",
                        dataType: "json",
                        async: false,
                        success: function(data) {
                            if (data.d.length == 0) {
                                data.d.push("There were no records found.");
                            }
                            response(data.d);
                        },
                        error: function(data) {
                            alert("error");
                        }
                    });
                }
            });
            
            function validateAddress(source, args) {
                var result = $.ajax({
                    type: "POST",
                    contentType: "application/json;",
                    url: "/webservice/address.asmx/Validate",
                    data: "{ \"keyword\" : \"" + arguments.Value + "\" }",
                    dataType: "json",
                    async: false
                }).responseText;
                args.IsValid = eval("(" + result + ")").d;
            }   
          },
        close: function() {
          $('.UC007 .quick-view-popup').remove();
        }
      }
    });

  });

});