var _YMAUC009 = (function($) {
  
  function loadScript(location, callback){
    var fileRef = document.createElement('script');
    fileRef.setAttribute('type','text/javascript');
    if (callback) {
      if (fileRef.readyState) { // IE
        fileRef.onreadystatechange = function() {
        if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
        fileRef.onreadystatechange = null;
        callback();
      }
      };
      } else { // Non-IE
      fileRef.onload = function(){
      callback();
      };
      }
    }
    fileRef.setAttribute('src', location);
    document.head.appendChild(fileRef);
  }
  
  $('body').addClass('YMAUC009');
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');
  $('<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />').prependTo('body.YMAUC009');
  
  $('<div class="signup-form-bar"><p> Need a quote? Enter your email address here to get started! <input type="email" name="email-addr" id="email-addr" class="email-addr" /><a href="#" id="start-lightbox">Go</a> </p>  </div>').prependTo("#globalcontainer");
  
  $('<div class="lightbox-form mfp-hide"><form method="post" action="/calculators/home-loan-repayment/result/?sid=12930713-4xjqz-BasicRepay" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_43553"><div id="ContentPlaceHolder1_Panel1_0" class="enquiryform" onkeypress="javascript:return WebForm_FireDefaultButton(event, \'ContentPlaceHolder1_ibtnSubmit_0\')"> <div class="questionform"> <ul> <li> <div class="question purpose-of-mortgage"> Purpose of mortgage <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator1_0" class="red" style="display:none;">*</span> </div><div class="answer pad purpose-of-mortgage"> <select name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$ddlMortgagePurpose" id="ContentPlaceHolder1_ctl00_0_ddlMortgagePurpose_0"><option value="" data-purpose="">Select...</option><option value="1" data-purpose="1">I want to buy my first home</option><option value="2" data-purpose="1">To buy an investment property</option><option value="3" data-purpose="2">Refinance to get a better deal</option><option value="4" data-purpose="2">Refinance an investment property</option><option value="5" data-purpose="3">Move Home</option><option value="6" data-purpose="2">Release equity in my home</option><option value="7" data-purpose="1">Other</option></select> </div></li><li> <div class="question household-income"> Household Income <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator2_0" class="red" style="display:none;">*</span> </div><div class="answer household-income"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHouseholdIncome" type="text" id="ContentPlaceHolder1_ctl00_0_txtHouseholdIncome_0"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator1_0" class="red" style="display:none;"><br>* Numerical characters only</span> </div></li></ul><ul data-purpose="1"> <li> <div class="question how-much-do-you-want-to-borrow"> How much do you want to borrow? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator3_0" class="red" data-purpose="1" style="display:none;">*</span> </div><div class="answer how-much-do-you-want-to-borrow"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchBorrow" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow_0"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator2_0" class="red" data-purpose="1" style="display:none;"><br>* Numerical characters only</span> </div></li><li> <div class="question how-much-deposit-do-you-have"> How much deposit do you have? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator4_0" class="red" data-purpose="1" style="display:none;">*</span> </div><div class="answer how-much-deposit-do-you-have"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchDeposit" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchDeposit_0"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator3_0" class="red" data-purpose="1" style="display:none;"><br>* Numerical characters only</span> </div></li></ul><ul data-purpose="2" style="display:none"> <li> <div class="question how-much-is-your-house-worth"> How much is your house worth? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator7_0" class="red" data-purpose="2" style="display:none;">*</span> </div><div class="answer how-much-is-your-house-worth"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchHouseWorth" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchHouseWorth_0" class="howmuch"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator4_0" class="red" data-purpose="2" style="display:none;"><br>* Numerical characters only</span> </div></li><li> <div class="question how-much-do-you-still-owe-on-your-mortgage"> How much do you still owe on your mortgage? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator8_0" class="red" data-purpose="2" style="display:none;">*</span> </div><div class="answer how-much-do-you-still-owe-on-your-mortgage"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchMortgage" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchMortgage_0" class="howmuch"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator5_0" class="red" data-purpose="2" style="display:none;"><br>* Numerical characters only</span> </div></li><li> <div class="question what-type-of-mortgage-do-you-have"> What type of mortgage do you have? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator9_0" class="red" data-purpose="2" style="display:none;">*</span> </div><div class="answer pad what-type-of-mortgage-do-you-have"> <ul id="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0" class="horizontal"><li><input id="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_0_0" type="radio" name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$rblWhatMortgageType" value="Variable"><label for="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_0_0">Variable</label></li><li><input id="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_1_0" type="radio" name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$rblWhatMortgageType" value="Fixed"><label for="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_1_0">Fixed</label></li><li><input id="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_2_0" type="radio" name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$rblWhatMortgageType" value="Unsure"><label for="ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_2_0">Unsure</label></li></ul> </div></li></ul><ul data-purpose="3" style="display:none"> <li data-purporse="Move Home"> <div class="question how-much-is-your-new-home"> How much is your new home? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator6_0" class="red" data-purpose="3" style="display:none;">*</span> </div><div class="answer how-much-is-your-new-home"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchNewHome" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchNewHome_0" class="howmuch"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator6_0" class="red" data-purpose="3" style="display:none;"><br>* Numerical characters only</span> </div></li><li> <div class="question how-much-do-you-want-to-borrow"> How much do you want to borrow? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator10_0" class="red" data-purpose="3" style="display:none;">*</span> </div><div class="answer how-much-do-you-want-to-borrow"> $ <input name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHowMuchBorrow2" type="text" id="ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow2_0" class="howmuch"> <span id="ContentPlaceHolder1_ctl00_0_HighlightRegularExpressionValidator7_0" class="red" data-purpose="3" style="display:none;"><br>* Numerical characters only</span> </div></li></ul><ul> <li> <div class="question how-soon-do-you-want-a-mortgage"> How soon do you want a mortgage? <span id="ContentPlaceHolder1_ctl00_0_HighlightRequiredValidator5_0" class="red" style="display:none;">*</span> </div><div class="answer pad how-soon-do-you-want-a-mortgage"> <select name="ctl00$ContentPlaceHolder1$LeadForm1$ctl00$ddlHowSoon" id="ContentPlaceHolder1_ctl00_0_ddlHowSoon_0"><option value=""></option><option value="Right Now! Hurry!">Right Now! Hurry!</option><option value="In the next few months">In the next few months</option><option value="Not immediately">Not immediately</option></select> </div></li></ul><script>$("#ContentPlaceHolder1_ctl00_0_ddlMortgagePurpose_0").change(function (){var selected=$(this).find("option:selected").data("purpose"); if (selected !=""){$("ul[data-purpose]").each(function (){if ($(this).data("purpose")==selected){$(this).show();}else{$(this).hide();}}); $("span[data-purpose]").each(function (){this.enabled=($(this).data("purpose")==selected);});}});<\/script> <ul> <li> <div class="question where-do-you-live"> Where do you live? <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRequiredValidator1_0" class="red" style="display:none;">*</span> </div><div class="answer pad where-do-you-live"> <input name="ctl00$ContentPlaceHolder1$LeadForm1$FindMortgageBrokerUser1$txtPostcode" type="text" id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtPostcode_0" class="address ui-autocomplete-input" placeholder="Suburb or Postcode" autocomplete="off"> <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightCustomValidator1_0" class="red" style="display:none;"><br>* Please enter the correct suburb or postcode.<br>(eg. SYDNEY, NSW, 2000)</span>  </div></li><li> <div class="question first-name"> First name: <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRequiredValidator2_0" class="red" style="display:none;">*</span> </div><div class="answer pad first-name"> <input name="ctl00$ContentPlaceHolder1$LeadForm1$FindMortgageBrokerUser1$txtFirstName" type="text" id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtFirstName_0"> <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRegularExpressionValidator1_0" class="red" style="display:none;"><br>* Required minimum two letters</span> </div></li><li> <div class="question last-name"> Last name: <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRequiredValidator3_0" class="red" style="display:none;">*</span> </div><div class="answer pad last-name"> <input name="ctl00$ContentPlaceHolder1$LeadForm1$FindMortgageBrokerUser1$txtLastName" type="text" id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtLastName_0"> <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRegularExpressionValidator2_0" class="red" style="display:none;"><br>* Required minimum two letters</span> </div></li><li> <div class="question phone-number"> Phone number: <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRequiredValidator4_0" class="red" style="display:none;">*</span> </div><div class="answer pad phone-number"> <input name="ctl00$ContentPlaceHolder1$LeadForm1$FindMortgageBrokerUser1$txtPhone" type="text" id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtPhone_0"> <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRegularExpressionValidator3_0" class="red" style="display:none;"><br>* Please enter the correct phone number.<br>(eg. 0212341234)</span> </div></li><li> <div class="question email-address"> E-mail address: <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRequiredValidator5_0" class="red" style="display:none;">*</span> </div><div class="answer pad email-address"> <input name="ctl00$ContentPlaceHolder1$LeadForm1$FindMortgageBrokerUser1$txtEmail" type="text" id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtEmail_0"> <span id="ContentPlaceHolder1_FindMortgageBrokerUser1_0_HighlightRegularExpressionValidator4_0" class="red" style="display:none;"><br>* Please enter the correct E-mail address.</span> </div></li></ul> </div><input type="image" name="ctl00$ContentPlaceHolder1$LeadForm1$ibtnSubmit" id="ContentPlaceHolder1_ibtnSubmit_0" class="submit" src="/files/Image/YMM/Button/bt_aussie_send.jpg" onclick="toggleButton(this, \'LeadFormValidationGroup\');WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$LeadForm1$ibtnSubmit&quot;, &quot;&quot;, true, &quot;LeadFormValidationGroup&quot;, &quot;&quot;, false, false))"> </div> </form></div>').insertBefore("#globalcontainer");
    
    //<input type="image" name="ctl00$ContentPlaceHolder1$LeadForm1$ibtnSubmit" id="ContentPlaceHolder1_ibtnSubmit_0" class="submit" src="/files/Image/YMM/Button/bt_aussie_send.jpg" onclick="toggleButton(this, \'LeadFormValidationGroup\');WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$LeadForm1$ibtnSubmit&quot;, &quot;&quot;, true, &quot;LeadFormValidationGroup&quot;, &quot;&quot;, false, false))">


  $(document).on('click', '#start-lightbox', function(e) {
    e.preventDefault();
    console.log("go go go");
    var emailAddr = $('#email-addr').val();
    $('#ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtEmail_0').val(emailAddr);
    
    $.magnificPopup.open({
      items: {
        src: '.lightbox-form', // can be a HTML string, jQuery object, or CSS selector
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
              	appendTo: ".lightbox-form",
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
            
            console.log("hi andy");
            //$('#ContentPlaceHolder1_ibtnSubmit_0').replaceWith('<a href="#" id="submitform">Submit</a>');
            //$('.ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content').detach().appendTo('.mfp-content');
          }
        }
    
    });
  	 
  });

  
    
 
})(jQuery);

