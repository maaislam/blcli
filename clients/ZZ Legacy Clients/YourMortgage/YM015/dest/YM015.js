var _UCFormCalc = (function ($) {

    $('body').addClass('YM015');
    var trackerName = ga.getAll()[0].get('name');
    var prevQuestionElement;
    var originalForm;
    var formType;

    var originalButtonSrc = $('.YM015 #ContentPlaceHolder1_ibtnSubmit_0').attr('src');

    // Load scripts
    $.getScript("/scripts/jquery.watermark.min.js?v=h1d0pqyqvNZ_NZE5_G49xFstPLNW0CXnpUPHsxJLzHs1");
    $.getScript("/scripts/enquiry.min.js?v=7VdXXn8nYnu4-eOQQjk9qB5lPXa008nmIFyS4m_AgZA1");
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');
    $.getScript('http://ajax.aspnetcdn.com/ajax/4.6/1/WebForms.js');
    $('<link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />').prependTo('body.YM015');
    setupSideTab();

    console.log("2newest version");
    // functions
    function cloneForm() {
        console.log("clone form");
        $('.YM015 .lightbox-popup').remove();
        $('.YM015 .mfp-wrap.qv-popup-holder .mfp-content').empty();
        var formaction = $('#form1').attr('action');
        var questionForm = $('.enquiryform');

        if (questionForm.hasClass('whiteRoundbox_rbox')) {
            prevQuestionElement = questionForm.prev();
            originalForm = questionForm;
            questionForm.find('a.submit').remove();
            questionForm.find('.ucterms').remove();
            $('<div class="mfp-hide form-popup lightbox-popup cloned-form articlepage" id="form-lightbox-ym011"> <form method="POST" action="' + formaction + '" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_43553"><div class="heading"></div> </form>').prependTo('body.YM015');
            $('.aspNetHidden').each(function () {
                var $this = $(this);
                $this.clone().appendTo('#form2');
            });
            questionForm.find('.enquiryform').detach().appendTo('#form2');
        } else {
            prevQuestionElement = questionForm.prev();
            originalForm = questionForm;
            $('<div class="mfp-hide form-popup lightbox-popup cloned-form" id="form-lightbox-ym011"> <form method="POST" action="' + formaction + '" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_43553"><div class="heading"></div> </form>').prependTo('body.YM015');
            $('.aspNetHidden').each(function () {
                var $this = $(this);
                $this.clone().appendTo('#form2');
            });
            questionForm.detach().appendTo('#form2');
        }

        setTimeout(function () {
            makeFormAmends();
        }, 500);

    }

    function ajaxForm() {
        formtype = "ajax";
        console.log("ajax form");
        $('.YM015 .lightbox-popup').remove();
        $('.YM015 .mfp-wrap.qv-popup-holder .mfp-content').empty();
        $.ajax({
            url: '/calculators/home-loan-repayment/result/?sid=13399329-00q3y-BasicRepay',
            type: "GET",
            timeout: 5000,
            datattype: "html",
            success: function (data) {
                var result = $(data);
                var questionForm = result.find('.enquiryform');
                $('<div class="mfp-hide form-popup lightbox-popup ajaxed-form" id="form-lightbox-ym011"> <form method="POST" action="/calculators/home-loan-repayment/enquiry-complete/" onsubmit="javascript:return WebForm_OnSubmit();" id="form2" class="Formisimo_clocked_43553"><div class="heading"></div> </form>').prependTo('body.YM015');
                result.find('.aspNetHidden').each(function () {
                    var $this = $(this);
                    $this.appendTo('#form2');
                });
                questionForm.appendTo('#form2');
                setTimeout(function () {
                    makeFormAmends();
                }, 500);
            }
        });
    }

    function makeFormAmends() {
        console.log("make form amends");
        $('.YM015 #form2 #ContentPlaceHolder1_ibtnSubmit_0').addClass('shown');
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHouseholdIncome_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchDeposit_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchHouseWorth_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchMortgage_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchNewHome_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_txtHowMuchBorrow2_0').val(0);
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_ddlHowSoon_0').val("Right Now! Hurry!");
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_rblWhatMortgageType_0_0_0').attr('checked', 'checked');
        $('.YM015 #form2 #ContentPlaceHolder1_ctl00_0_rblWhatMortgageTypeWant_0_0_0').attr('checked', 'checked');
        //$('.YM015 #form2 #ContentPlaceHolder1_ibtnSubmit_0:first').wrapAll('<div class="image-submit-holder"></div>');
        $('.YM015 .questionform ul:first li:eq(1)').hide();
        $('.YM015 #ContentPlaceHolder1_MinifiedUserInformation1_0_cbNewsletter_0').parent('li').hide();
        //$('.YM015 .questionform ul:eq(1) li:eq(0)').hide();
        $('.YM015 #form2 .question.how-soon-do-you-want-a-mortgage').parents('ul').hide();
        $('.YM015 #form2 .answer.how-soon-do-you-want-a-mortgage').hide();
        $('.YM015 .ucterms, .YM015 .ucrequire, .YM015 .ucrequiretext').remove();
        $('<p class="ucrequire">*</p>').appendTo('.YM015 #form2 .question');
        $('<div class="ucrequiretext"><span>*</span> fields required</div>').prependTo('.YM015 .lightbox-popup#form2 .questionform');

        $('<a class="ucterms" href="http://www.yourmortgage.com.au/article/aussie-terms-and-conditions-217839.aspx">Terms & Conditions</a>').appendTo('.YM015 #form2 .enquiryform');
        $('.YM015 #form2 .ucterms').attr('target', '_blank');

        $('.YM015 .what-type-of-mortgage-do-you-want').parents('li').hide();
        $('.YM015 #ContentPlaceHolder1_CompareHomeLoansUser1_0_txtAlternativePhone_0').parents('li').hide();


        for (var i = 0; i < 4; i++) {
            $('.YM015 #form2 .enquiryform.current ul:first').prev().remove();
        }

        $(".YM015 #form2 .enquiryform.current .questionform").addClass('firstquestionform').contents().each(function () {
            //Text node
            if (this.nodeType === 3) {
                $(this).remove();
            }
        });


        $('.YM015 #form2 .firstquestionform').next('.submit').remove();
        $('.YM015 #form2 .firstquestionform').next('.ucterms').remove();

        var formHeading = $(['<div class="uc_header"><h2 class="uc_formHeader">Talk to Aussie</h2><img src="http://au.res.keymedia.com/files/image/YMM/CompanyLogo/Aussielogonew2.jpg" alt="aussie-logo" class="img-responsive aussie-logo-img" /></div>',
            '<div class="uc_formTextsmall">',
            '<p>Why not chat with an Aussie broker. We\'ll understand your lifestyle and property goals and take the hard work out of the loan process, seeing if we can save you thousands.</p>',
            '<p>We have 25 years of mortgage experience and wisdom and more than 1,000 mortgage brokers across Australia. Compare nearly 3,000 home loans. Using Aussie is like going to several banks in a single appointment.</p>',
            '</div>',
            '<div class="uc_formuspWrap"><div>'
        ].join(''));
        formHeading.appendTo('.YM015 .lightbox-popup #form2 .heading');
        var ucFormusps = [
            ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/81c7c75cfea9c08b10d97912b318d041_good-mood-emoticon.png', 'Millions', 'of satisfied home owners'],
            ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/5597e8ae8a0f5084958ac8abf934c175_no-dollars-accepted.png', 'FREE', 'of charge. Forever'],
            ['//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/9edafb8c1010e8288811ed1b8619369c_multiple-users-silhouette.png', 'Over 1000', 'Mortgage Brokers Available']
        ];
        $.each(ucFormusps, function () {
            var icon = this[0], //brand1
                bluetext = this[1],
                text = this[2]; //links
            $(['<div class="ucFormusp">',
                '<img src="' + icon + '"/><div class="uc_formusptext"><span>' + bluetext + '</span> ' + text + '</div>',
                '</div>'
            ].join('')).appendTo('.YM015 #form2 .uc_formuspWrap');
        });
        $('.YM015 #form2 #ContentPlaceHolder1_ibtnSubmit_0').attr('src', '//useruploads.visualwebsiteoptimizer.com/useruploads/263595/images/93697438fdfc8c4230355363ddbe7449_submit.png');

        $('<div class="form_live_tooltip">Why do you ask this?<div class="form_live_message">We’ll put you in touch with a broker in your area who can offer tailored advice and find the best rates based on your location</div></div>').appendTo('.YM015 #form2 .answer.pad.where-do-you-live');

        $(document).on('mouseenter', '.YM015 #form2 .form_live_tooltip', function () {
            $('.YM015 #form2 .form_live_message').addClass('active');
        });

        $(document).on('mouseleave', '.YM015 #form2 .form_live_tooltip', function () {
            $('.YM015 #form2 .form_live_message').removeClass('active');
        });

        $('.YM015 #form2 .answer.pad.where-do-you-live').parents('li').addClass('postcode-answer-list-item');

        if ($('.YM015 #form2 .smallfieldtext').length == 0) {
            $('<p class="smallfieldtext">An Aussie rep will call you within 1 hour</p>').appendTo('.YM015 #form2 .question.phone-number');
            $('<p class="smallfieldtext">Any information that you give us is in confidence, we\'ll only use this to stay in touch</p>').appendTo('.YM015 #form2 .question.email-address');
        }


    }

    function setupSideTab() {
        console.log("setup side tab");
        if ($('#articleBody > div > div').length > 2) {
            var innerBox = $([
                '<div class="banner-holder">',
                '<h2 class="uc-boxHeader">Get help choosing a loan from <img src="https://ab-test-sandbox.userconversion.com/experiments/YM015-aussielogo.png" alt="aussie-logo" class="img-responsive banner-aussie-logo" /></h2>',
                '<div class="uc-label-holder"><div class="uc_Label">What is the purpose of your mortgage?</div>',
                '<select name="mortgage-purpose" id="mortgage-purpose" class="mortgage-purpose">',
                '<option value="1">I want to buy my first home</option>',
                '<option value="1">To buy an investment property</option>',
                '<option value="2">Refinance to get a better deal</option>',
                '<option value="3">Move Home</option>',
                '<option value="2">Release equity in my home</option>',
                '<option value="1">Other</option>',
                '</select></div>',
                '<button id="startform" class="startform">Get Free Advice within the hour</button> </div>',
                '</div>'
            ].join('')).insertAfter('.YM015 #articleBody > div > div:eq(5)');
        } else if ($('#articleBody > p > p').length > 2) {
            var innerBox = $([
                '<div class="banner-holder">',
                '<h2 class="uc-boxHeader">Get help choosing a loan from <img src="https://ab-test-sandbox.userconversion.com/experiments/YM015-aussielogo.png" alt="aussie-logo" class="img-responsive banner-aussie-logo" /></h2>',
                '<div class="uc-label-holder"><div class="uc_Label">What is the purpose of your mortgage?</div>',
                '<select name="mortgage-purpose" id="mortgage-purpose" class="mortgage-purpose">',
                '<option value="1">I want to buy my first home</option>',
                '<option value="1">To buy an investment property</option>',
                '<option value="2">Refinance to get a better deal</option>',
                '<option value="3">Move Home</option>',
                '<option value="2">Release equity in my home</option>',
                '<option value="1">Other</option>',
                '</select></div>',
                '<button id="startform" class="startform">Get Free Advice within the hour</button> </div>',
                '</div>'
            ].join('')).insertAfter('.YM015 #articleBody > div > p:eq(5)');
        } else if ($('.article_body > p').length > 2) {
            var innerBox = $([
                '<div class="banner-holder">',
                '<h2 class="uc-boxHeader">Get help choosing a loan from <img src="https://ab-test-sandbox.userconversion.com/experiments/YM015-aussielogo.png" alt="aussie-logo" class="img-responsive banner-aussie-logo" /></h2>',
                '<div class="uc-label-holder"><div class="uc_Label">What is the purpose of your mortgage?</div>',
                '<select name="mortgage-purpose" id="mortgage-purpose" class="mortgage-purpose">',
                '<option value="1">I want to buy my first home</option>',
                '<option value="1">To buy an investment property</option>',
                '<option value="2">Refinance to get a better deal</option>',
                '<option value="3">Move Home</option>',
                '<option value="2">Release equity in my home</option>',
                '<option value="1">Other</option>',
                '</select></div>',
                '<button id="startform" class="startform">Get Free Advice within the hour</button> </div>',
                '</div>'
            ].join('')).insertAfter('.YM015 .article_body > p:eq(5)');
        } else if ($('.article_body > div').length > 2) {
            var innerBox = $([
                '<div class="banner-holder">',
                '<h2 class="uc-boxHeader">Get help choosing a loan from <img src="https://ab-test-sandbox.userconversion.com/experiments/YM015-aussielogo.png" alt="aussie-logo" class="img-responsive banner-aussie-logo" /></h2>',
                '<div class="uc-label-holder"><div class="uc_Label">What is the purpose of your mortgage?</div>',
                '<select name="mortgage-purpose" id="mortgage-purpose" class="mortgage-purpose">',
                '<option value="1">I want to buy my first home</option>',
                '<option value="1">To buy an investment property</option>',
                '<option value="2">Refinance to get a better deal</option>',
                '<option value="3">Move Home</option>',
                '<option value="2">Release equity in my home</option>',
                '<option value="1">Other</option>',
                '</select></div>',
                '<button id="startform" class="startform">Get Free Advice within the hour</button> </div>',
                '</div>'
            ].join('')).insertAfter('.YM015 .article_body > div:eq(5)');
        }



        $(document).on('click', '.closebutton', function () {
            var $this = $(this);
            var left = -1000;
            $('.YM015 .side-tab').removeClass('hidden');
            $('.YM015 .side-box').removeClass('open');
            $('.YM015 .side-box').animate({
                left: left
            });
        });
    }

    function setupJqueryValidate() {
        var valid = false;
        console.log("j validate called");
        $(document).on('click', '#ContentPlaceHolder1_ibtnSubmit_0', function (e) {
            $("#form2").validate({
                rules: {
                    "ctl00$ContentPlaceHolder1$LeadForm1$ctl00$ddlMortgagePurpose": "required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtFirstName": "required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHouseholdIncome": "required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtPostcode": "required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtLastName": "required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtPhone": {
                        required: true,
                        number: true
                    },
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtEmail": {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    "ctl00$ContentPlaceHolder1$LeadForm1$ctl00$ddlMortgagePurpose": "Please select a mortgage purpose",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtFirstName": "A first name is required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$ctl00$txtHouseholdIncome": "Household income is required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtPostcode": "Postcode is required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtLastName": "A last name is required",
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser11$txtPhone": {
                        required: "Please enter a telephone number",
                        number: "Please enter a valid telephone number in the format 0001112222"
                    },
                    "ctl00$ContentPlaceHolder1$LeadForm1$CompareHomeLoansUser1$txtEmail": {
                        required: "An email address is required",
                        email: "This is not a valid email address"
                    }
                },
                submitHandler: function (form) {
                    return true;
                }
            }).form();
        });
    }

    function startLightbox() {
        $('.YM015 .side-tab').removeClass('hidden');
        $('.YM015 .side-box').removeClass('open');
        $('.YM015 .side-box').animate({
            left: -1000
        });
        $('.YM015 #startform').html('Get Free Advice within the hour');

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js", function () {
            setupJqueryValidate();
        });
        ga(trackerName + '.send', 'event', 'Continue Button on Pop Out YM015', 'continue clicked', {
            nonInteraction: 1
        });
        // var emailAddr = $('.YM015 #emailadd').val();
        // $('.YM015 #ContentPlaceHolder1_FindMortgageBrokerUser1_0_txtEmail_0').val(emailAddr);

        var mortgagePurposeValue = $('.YM015 #mortgage-purpose option:selected').val();
        var mortgagePurposeText = $('.YM015 #mortgage-purpose option:selected').html();

        $.magnificPopup.open({
            mainClass: "qv-popup-holder",
            items: {
                src: '.YM015 #form-lightbox-ym011', // can be a HTML string, jQuery object, or CSS selector
                type: 'inline'
            },
            callbacks: {
                open: function () {

                    $('.YM015 #ContentPlaceHolder1_ctl00_0_ddlMortgagePurpose_0').find('option:contains("' + mortgagePurposeText + '")').attr('selected', 'selected');
                    $("ul[data-purpose]").each(function () {
                        if ($(this).data("purpose") == mortgagePurposeValue) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                    $("span[data-purpose]").each(function () {
                        this.enabled = ($(this).data("purpose") == mortgagePurposeValue);
                    });

                    $(".YM015 #form2 #ContentPlaceHolder1_MinifiedUserInformation1_0_txtWhere_0")
                        //.watermark("Suburb or Postcode")
                        .autocomplete({
                            minLength: 3,
                            select: function (event, ui) {
                                $(this).val(ui.item.value).change();
                            },
                            appendTo: ".YM015 #form2",
                            source: function (request, response) {
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json;",
                                    url: "/webservice/address.asmx/GetList",
                                    data: "{ \"keyword\" : \"" + request.term + "\" }",
                                    dataType: "json",
                                    async: false,
                                    success: function (data) {
                                        if (data.d.length == 0) {
                                            data.d.push("There were no records found.");
                                        }
                                        response(data.d);
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
                close: function () {
                    console.log("closing popup 1");
                    var questionForm = $('.lightbox-popup #form2 .enquiryform');
                    if (formType == "clone") {

                        $('.lightbox-popup #form2').empty();
                        console.log(prevQuestionElement);
                        $('.YM015 #ContentPlaceHolder1_ibtnSubmit_0').attr('src', originalButtonSrc);
                        originalForm.appendTo('.YM015 #ContentPlaceHolder1_Panel_0');
                        $(".YM015 #ContentPlaceHolder1_MinifiedUserInformation1_0_txtWhere_0")
                            //.watermark("Suburb or Postcode")
                            .autocomplete({
                                minLength: 3,
                                select: function (event, ui) {
                                    $(this).val(ui.item.value).change();
                                },
                                appendTo: ".YM015 #form1",
                                source: function (request, response) {
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json;",
                                        url: "/webservice/address.asmx/GetList",
                                        data: "{ \"keyword\" : \"" + request.term + "\" }",
                                        dataType: "json",
                                        async: false,
                                        success: function (data) {
                                            if (data.d.length == 0) {
                                                data.d.push("There were no records found.");
                                            }
                                            response(data.d);
                                        }
                                    });
                                }
                            });
                    }
                    $('.YM015 .ucterms, .YM015 .ucrequire, .YM015 .ucrequiretext').remove();
                    $('.YM015 .lightbox-popup').remove();
                    $('.YM015 .mfp-wrap.qv-popup-holder .mfp-content').empty();


                }
            }
        });
    }
    // keypress to enter the lightbox
    $(document).on('keypress', '.YM015 #mortgage-purpose', function (e) {
        if (e.which == 13) {
            $('.YM015 #startform').trigger('click');
        }
    });
    $(document).on('click', '.YM015 #startform', function (e) {
        e.preventDefault();
        $(this).html('Loading Form...');
        if ($('.YM015 .enquiryform').length <= 0) {
            formType = "ajax";
            ajaxForm();
            var polling = setInterval(function () {
                if ($('.YM015 .lightbox-popup .enquiryform').length > 0) {
                    clearInterval(polling);
                    startLightbox();
                }
            }, 50);
        } else {
            formType = "clone";
            cloneForm();
            var polling = setInterval(function () {
                if ($('.YM015 .lightbox-popup .enquiryform').length > 0) {
                    clearInterval(polling);
                    startLightbox();
                }
            }, 50);
        }

    });
    $(document).on('click', '.YM015 .image-submit-holder .submit', function () {
        ga(trackerName + '.send', 'event', 'Form Submit YM015', 'tab clicked', {
            nonInteraction: 1
        });
        return true;
    });
    $(document).on('click', '.YM015 #ContentPlaceHolder1_ctl00_0_ddlMortgagePurpose_0', function () {
        ga(trackerName + '.send', 'event', 'Form Dropdown Clicked YM015', 'dropdown clicked', {
            nonInteraction: 1
        });
        return true;
    });

})(window.jQuery);