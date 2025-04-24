var _RC004 = (function($) {
    if (!$('.home-course-search').length) {
        return;
    }

    wholeExperiment(true);

    function wholeExperiment (runIt) {
        if (!runIt) {
            return;
        }

        // ----------------------------------------------------------------
        // Setup
        // ----------------------------------------------------------------
        $('body').addClass('rc004 RC022');
        var _opts = {
            workplaceOptText: 'Workplace',
            publicOptText: 'Public',
            searchTitle: 'Search over 50 First Aid courses',
            searchSubtitle: 'Book a course that meets the legal requirements of your role or employer',
            searchSubtitlePublic: 'Learn first aid skills you can confidently use in an emergency situation',
            groupBookingsText: 'For group bookings of 15 or more, <a href="/What-we-do/Group-bookings.aspx">click here</a>',
            selectCourseText: '1. Select Course Type',
            selectACourseText: '2. Select a course',
            selectYourDates: '3. Select your dates',
            selectYourLocation: '4. Your location',
            useCourseFinder: 'Not sure what you\'re looking for? Use our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">course finder</a> instead'
        };
        var UC = UC || {};
        UC.poller = function (elements, cb, options) {
            var settings = {
                wait: 50,
                multiplier: 1.1,
                timeout: 0
            };

            var now = Date.now || function () {
                return new Date().getTime();
            };

            if (options) {
                // Overwrite defaults with values from options
                for (var option in options) {
                    settings[option] = options[option];
                }
            } else {
                options = settings;
            }

            var timeout = settings.timeout ? new Date(now() + settings.timeout) : false;
            var wait = settings.wait;
            var multiplier = settings.multiplier;

            var successful = [];
            var time;
            var pollForElement = function (condition, time) {
                if (timeout && now() > timeout) {
                    return false;
                }
                time = time || wait;
                var conditionIsTrue = (function () {
                    var type = typeof condition;
                    var toReturn;

                    if (type === 'function') {
                        toReturn = condition();
                    } else if (type === 'string') {
                        toReturn = document.querySelector(condition);
                    } else {
                        toReturn = true;
                    }

                    return toReturn;
                }());

                if (conditionIsTrue) {
                    successful.push(true);
                    if (successful.length === elements.length) cb();
                } else {
                    setTimeout(function () {
                        pollForElement(condition, time * multiplier);
                    }, time);
                }
            };
            for (var i = 0; i < elements.length; i++) {
                pollForElement(elements[i]);
            }
        };

        // Send GA Events With Tracker Name ------------
        // ---------------------------------------------
        function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

        // Full Story Integration
        UC.poller([
            function () {
                var fs = window.FS;
                if (fs && fs.setUserVars) return true;
            }
        ], function () {
            window.FS.setUserVars({
                experiment_str: 'RC022',
                variation_str: 'Variation 1 Desktop'
            });
        }, {multiplier: 1.2, timeout: 0});

        // Work options apppears in overlay
        var workOptionsHtml = [
            '<div class="rc4-options-overlay rc4-options-overlay--work">',
            '<span title="Close" class="rc4-options-overlay__close">x</span>',
            '<h2 class="rc4-options-overlay__title">2. Select a course',
            '<a class="rc4-options-overlay__link rc4-options-overlay__all-courses-link" data-value="|WORK">Skip and select all</a>',
            '</h2>',
            '<p class="RC022_options-overlay__description">There courses are designed to meet health and safety legal requirements and are recognised by the Health and Safety Executive (HSE)</p>',
            '<div class="row">',
            '<div class="col-sm-6">',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'First aid',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Become a qualified workplace first aider"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="6c5cc743-d456-4faf-8694-5bb87c8556e5|UK|NI|WORK"',
            '>First aid at work</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Become a qualified first aider (3 day course aimed at high risk workplaces)"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
                '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work.aspx" target="=blank">Learn more</a></span>',
                '<span class="RC022_middleBorder"></span>',
                '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="456fb14f-68e8-484d-889a-a413b126b3e6|UK|NI|WORK"',
            '>First aid at work (1 day a week)</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Become a qualified first aider (3 day course aimed at high risk workplaces)"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
                '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-1-day-a-week.aspx" target="=blank">Learn more</a></span>',
                '<span class="RC022_middleBorder"></span>',
                '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="bc197a39-01f9-45ad-a46d-dc27690d0043|UK|NI|WORK"',
            '>First aid at work requalification</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For people who need to renew a first aid at work certificate"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-at-work-requalification.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="536928a6-fe53-44f3-aaa7-6ba10d73b44a|UK|NI|WORK"',
            '>Emergency first aid at work</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Become a qualified first aider (1 day course aimed at low risk workplaces)"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-first-aid-at-work.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="648a58a0-4afe-4892-afa4-e8876cbcb520|UK|NI|WORK"',
            '>First aid for appointed persons</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="A non-accredited course for lower risk workplaces"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/First-aid-for-appointed-persons.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="e1fa21c7-80ec-471d-b52b-c753dc183f8d|UK|NI|WORK"',
            '>First aid annual skills update</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Refresher course for first aiders (face to face and e-learning options are available)"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Annual-skills-update.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'Health & Safety',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="To help you meet health and safety requirements"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="db01b7bf-c944-4c30-8de7-6d337a07d0a9|UK|NI|WORK"',
            '>Fire marshal training</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For those responsible for overseeing fire safety"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Fire-marshal-training.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '</div>',
            '<div class="col-sm-6">',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'Paediatric',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For child carers in any professional setting, as well as newly qualified level 2 / 3 childcare staff"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="01235a45-e7a7-4377-a284-c5f92048136a|UK|NI|WORK"',
            '>Paediatric first aid</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="2 day course for child carers in any professional setting."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="4064cd0c-5a85-4558-b4ad-944e80191711|UK|NI|WORK"',
            '>Paediatric first aid (2 days in 2 weeks)</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="2 day course for child carers in any professional setting."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Paediatric-first-aid-two-weeks.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="032d9c79-a89a-4d60-a103-4d22b08fc6d0|UK|NI|WORK"',
            '>Emergency paediatric first aid</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Designed for newly qualified level 2 / 3 childcare staff"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/Emergency-paediatric-first-aid.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'AED',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For people who want to learn how to use an automated external defibrillator (AED)"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="083e35fc-9739-4f37-a3a5-586b9a455bc3|UK|NI|WORK"',
            '>Automated external defibrillators (AED)</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Learn how to use an AED"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-scheduled.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="433b1212-c682-4b9a-8e7e-f996e9d170da|UK|NI|WORK"',
            '>AED with life support</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Basic life support training and use of the AED"></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-at-work-courses-uk-mainland/Scheduled-courses/AED-with-life-support-scheduled.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '<div class="rc4-options-overlay__cat">',
            '</div>',
            '<div class="RC022_footerWrapper RC022_workplace_footerWrapper">',
            '<button class="RC022_footerBtn RC022_workplace_footerBtn">SELECT ALL WORKPLACE COURSES</button>',
            '</div>',
            '<div class="RC022_underFooterWrapper">',
                '<span class="RC022_underFooterQ">Not sure what you\'re looking for?</span>',
                '<span class="RC022_underFooterA">Use our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">course finder</a> instead</span>',
            '</div>',
            '</div>'
        ].join('');
        var publicOptionsHtml = [
            '<div class="rc4-options-overlay rc4-options-overlay--public">',
            '<span title="Close" class="rc4-options-overlay__close">x</span>',
            '<h2 class="rc4-options-overlay__title">2. Select a course',
            '<a class="rc4-options-overlay__link rc4-options-overlay__all-courses-link" data-value="|PUBLIC">Skip and select all</a>',
            '</h2>',
            '<p class="RC022_options-overlay__description">There courses are designed to meet health and safety legal requirements and are recognised by the Health and Safety Executive (HSE)</p>',
            '<div class="row">',
            '<div class="col-sm-6">',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'First Aid For Baby and Child',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Perfect for parents or carers of babies and children"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="03e3bf08-7d24-4fda-a3ae-fae0254a84b5|UK|NI|PUBLIC"',
            '>First aid for baby and child</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Perfect for parents or carers of babies and children."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="5ede371a-eb4d-4c8d-bb84-fe9d3b2758dc|UK|NI|PUBLIC"',
            '>First aid for baby and child (evenings)</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="Perfect for parents or carers of babies and children."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-baby-and-child-evening.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '</div>',
            '<div class="col-sm-6">',
            '<div class="rc4-options-overlay-cat">',
            '<span class="rc4-options-overlay-cat__text">',
            'First Aid for Adults',
            '</span>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For anyone who wants to learn first aid skills for adults, not accredited for workplace requirements"></i>',
            '</div>',
            '<ul>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="5ae41926-0d16-4509-a417-5ee27c8aa8a7|UK|NI|PUBLIC"',
            '>First aid for adult</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For anyone who wants to learn first aid skills for adults."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/First-aid-for-adult.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '<li><a class="rc4-options-overlay__link" ',
            'data-value="272f96fc-d7d0-4499-8b7e-d7af23bbaa2b|UK|NI|PUBLIC"',
            '>First aid for adult (evenings)</a>',
            '<i class="fa fa-info-circle rc4-tooltipster" title="For anyone who wants to learn first aid skills for adults."></i>',
            '</li>',
            '<li class="RC022_onLoadHiddenList">',
            '<span class="RC022_learnMore"><a href="https://www.redcrossfirstaidtraining.co.uk/Courses/First-aid-public-courses/first-aid-for-adult-evenings.aspx" target="=blank">Learn more</a></span>',
            '<span class="RC022_middleBorder"></span>',
            '<span class="RC022_viewDates">View Dates</span>',
            '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '<div class="RC022_footerWrapper RC022_public_footerWrapper">',
            '<button class="RC022_footerBtn RC022_public_footerBtn">SELECT ALL PUBLIC COURSES</button>',
            '</div>',
            '<div class="RC022_underFooterWrapper">',
            '<span class="RC022_underFooterQ">Not sure what you\'re looking for?</span>',
            '<span class="RC022_underFooterA">Use our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">course finder</a> instead</span>',
            '</div>',
            '</div>'
        ].join('');
        var courseTypeHtml = [
            '<div class="RC022_courseType_overlay">',
            '<span title="Close" class="rc4-options-overlay__close">x</span>',
            '<h2 class="RC022_courseType__title">1. Select a course type</h2>',
            '<div class="RC022_courseType_innerWrapper">',
            '<span class="RC022_workplace_option"><img src="https://ab-test-sandbox.userconversion.com/experiments/RC022-building.png"><span class="RC022_workplaceTitle">Workplace</span></span>',
            '<span class="RC022_courseType_description">Aimed at people who need to act as a first aider in the workplace</span>',
            '</div>',
            '<span class="RC022_justOR">or</span>',
            '<div class="RC022_courseType_innerWrapper">',
            '<span class="RC022_public_option"><img src="https://ab-test-sandbox.userconversion.com/experiments/RC022-house.png"><span class="RC022_publicTitle">Public</span></span>',
            '<span class="RC022_courseType_description">Aimed at people who want to learn first aid for their everyday life (e.g. parents), rather than as a requirement of their job.</span>',
            '</div>',
            '</div>'
        ].join('');

        // ----------------------------------------------------------------
        // Rebuild home course search container
        // ----------------------------------------------------------------
        var courseSearch = $([
            '<div class="rc4-search-container">',
            courseTypeHtml,
            workOptionsHtml,
            publicOptionsHtml,
            '<div class="rc4-search-overlay"></div>',
            '<div class="rc4-search-box">',
            '<h2 class="rc4-search-box__title">' + _opts.searchTitle + '</h2>',
            '<p class="rc4-toggle-heading">' + _opts.selectCourseText + '</p>',
            // RC022 -----------------------
            '<span class="RC022_selectCourseType ui-selectmenu-button ui-widget ui-state-default ui-corner-all" tabindex="1">',
            '<span class="RC022_triangleArrow ui-icon ui-icon-triangle-1-s"></span>',
            '<span class="RC022_selectCourseTypeText ui-selectmenu-text">Workplace</span>',
            '</span>',
            // -----------------------------
            '<p class="rc4-toggle-heading">' + _opts.selectACourseText + '</p>',
            '<div class="rc4-course-form-wrapper rc4-course-form-wrapper--workplace">',
            '</div>',
            '<div class="rc4-course-form-wrapper rc4-course-form-wrapper--public">',
            '</div>',
            '<div class="RC022_btnContainer"><button class="RC022_searchDatesFinalBtn">SEARCH DATES</button></div>',
            '<p class="rc4-search-box__group-bookings">',
            _opts.groupBookingsText,
            '</p>',
            '<p class="RC022_useCourseFinderM8">' + _opts.useCourseFinder + '</p>',
            '</div>',
            '</div>'
        ].join(''));
        $('.home-course-search').before(courseSearch);
        $('fieldset.form-daterange').before('<p class="rc4-toggle-heading">' + _opts.selectYourDates + '</p>');
        $('fieldset.form-daterange').next('.form-item').before('<p class="rc4-toggle-heading">' + _opts.selectYourLocation + '</p>');
        $('.form-button-inline.form-autoSubmit.js-location-required').after('<p class="RC022_locationFooter">e.g Bolton or Manchester or M12FF</p>');
        // ----------------------------------------------------------------
        // Move existing elements into new search container
        // ----------------------------------------------------------------
        $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_1_rctsubcontainer2placeholder_0_courseContainer .course-search-form').appendTo('.rc4-course-form-wrapper--workplace');
        $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_courseContainer .course-search-form').appendTo('.rc4-course-form-wrapper--public');

        var reviewsObject = {
            'Juan': {
                topReview: 'Thanks to the British Red Cross I have the confidence to act',
                bottomReview: 'Really great interactive session with knowledgeable instructors who made the learning really stick. I would now be very confident to help out when the time comes.',
                reviewer: ' - Juan'
            },
            'Lucy': {
                topReview: 'Superb Trainer and Excellent Course (PT)',
                bottomReview: 'Recommend this course without hesitation. Totally practical and wonderfully delivered.',
                reviewer: ' - Lucy'
            },
            'Greg': {
                topReview: 'The trainer made it fun (PT)',
                bottomReview: 'The trainer made it fun, made us think and made us better prepared for an emergency!',
                reviewer: ' - Greg'
            },
            'Neil': {
                topReview: "The best first aid course I've attended … (WP)",
                bottomReview: "The best first aid course I've attended in 38 years of working in the high voltage electricity industry",
                reviewer: ' - Neil'
            },
            'Nia': {
                topReview: "Life Saver",
                bottomReview: "Quality, effective training! Highly recommend.... one of the best delivered training courses I've had in 15years NHS service. Thank You",
                reviewer: ' - Nia'
            }
        };

        var nameOfReviewers = ['Juan', 'Lucy', 'Greg', 'Neil', 'Nia'];
        var randomNumber = Math.floor(Math.random() * 5);
        // On page load generate a random review to display
        var nameRandom = nameOfReviewers[randomNumber];

        // Add html to the search container (background split into 2 sections: top(40%) and bottom(60%))
        $('.rc4-search-container').prepend([
            '<div class="RC022_topSectionBackground">',
            '<div class="RC022_topSectionTextWrapper">',
            '<span class="RC022_percent">99%</span>',
            '<div class="customerInfoReviewWrap">',
            '<p class="RC022_customerSatisf">customer satisfaction score</p>',
            '<p class="RC022_accordingTo">(According to our 2016 delegate feedback + independent TrustPilot reviews).</p>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="RC022_bottomSectionBackground">',
            '<div class="RC022_bottomSectionLeft"></div>',
            '<div class="RC022_bottomSectionRight">',
            '<span class="RC022_fixedOnTop"></span>',
            '<h2 class="RC022_top_review">' + reviewsObject[nameRandom].topReview + '</h2>',
            '<p class="RC022_bottom_review">' + reviewsObject[nameRandom].bottomReview + '</p>',
            '<span class="RC022_reviewer">' + reviewsObject[nameRandom].reviewer + '</span>',
            '<span class="RC022_trustPilotStars"></span>',
            '<span class="RC022_trustPilotLogo"></span>',
            '</div>',
            '</div>'
        ].join(''));

        // ----------------------------------------------------------------
        // Add functionality to the workplace/public dropdown (will open a tab to the right of the 'search-box' on click)
        // ----------------------------------------------------------------
        // Default option is workplace (so set it)
        $('.rc4-course-form-wrapper--workplace').show();
        $('.rc4-course-form-wrapper--public').hide();
        $('.RC022_workplace_option').addClass('RC022_courseType--active');

        $('.RC022_selectCourseType').on('click', function () {
            if ($('.rc4-options-overlay').hasClass('rc4-options-overlay--active')) {
                return;
            }
            var $this = $(this);
            $this.toggleClass('rc4--active');
            $('.rc4-search-box').toggleClass('rc4--active');
            $this.parents('.rc4-search-container').find('.RC022_courseType_overlay')
                .toggleClass('RC022_courseType_overlay--active');
        });

        $('.RC022_workplace_option, .RC022_public_option').on('click', function () {
            var $this = $(this);
            deactivateOverlay();
            $('.RC022_selectCourseTypeText').text($this.text());
            if ($this.hasClass('RC022_workplace_option') && !$this.hasClass('RC022_courseType--active')) {
                $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_1_rctsubcontainer2placeholder_0_DropDownList_CourseNames-button > .ui-selectmenu-text')
                    .text('Please select a course');
                $('.rc4-course-form-wrapper--workplace').show();
                $('.rc4-course-form-wrapper--public').hide();
            } else if ($this.hasClass('RC022_public_option') && !$this.hasClass('RC022_courseType--active')) {
                $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_DropDownList_CourseNames-button > .ui-selectmenu-text')
                    .text('Please select a course');
                $('.rc4-course-form-wrapper--workplace').hide();
                $('.rc4-course-form-wrapper--public').show();
            }
            $('.RC022_workplace_option, .RC022_public_option').removeClass('RC022_courseType--active');
            $this.addClass('RC022_courseType--active');

        });
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------

        // ----------------------------------------------------------------
        // Set up options displays for 'Select a course' (default)
        // ----------------------------------------------------------------
        UC.poller(['.rc4-course-form-wrapper .ui-selectmenu-text'], function () {
            $('.rc4-course-form-wrapper .ui-selectmenu-text').text('Select a course');
        });
        // ----------------------------------------------------------------
        // Initialise options display for 'Select a course'
        // ----------------------------------------------------------------
        $('.rc4-course-form-wrapper .course-search-form').on('click', '.ui-selectmenu-button', function () {
            if ($('.RC022_courseType_overlay').hasClass('RC022_courseType_overlay--active')) {
                return;
            }
             $(this).toggleClass('rc4--active');
            // $('.rc4-search-box').toggleClass('rc4--active');
            // Depending on which tab is active, show the corresponding options overlay
            switch (getActiveTabName()) {
                case 'workplace':
                    $(this).parents('.rc4-search-container').find('.rc4-options-overlay--work')
                        .toggleClass('rc4-options-overlay--active');
                    break;
                case 'public':
                    $(this).parents('.rc4-search-container').find('.rc4-options-overlay--public')
                        .toggleClass('rc4-options-overlay--active');
                    break;
            }
            return false;
        });
        $('.rc4-options-overlay__close').on('click', function () {
            deactivateOverlay();
        });

        // Clicking anywhere in the 'search box' closes the (2. select a course) section
        $('.rc4-search-box').on('click', function () {
            $('.rc4-search-container .rc4-options-overlay').removeClass('rc4-options-overlay--active');
            $('.rc4-course-form-wrapper .course-search-form .ui-selectmenu-button').removeClass('rc4--active');
        });

        // ----------------------------------------------------------------
        // Handle options display course chosen
        // ----------------------------------------------------------------
        // rc4-options-overlay__link whole container clickable
        $('.rc4-options-overlay__link').closest('ul').on('click', 'li:not(.RC022_onLoadHiddenList)', function (e) {
            var $this = $(this);
            var chosenValue = $this.find(' > a').attr('data-value'),
                chosenText = $this.find(' > a').text(),
                activeForm = getActiveForm();
            // Set the value on the original (hidden) select
            var actualSelectInput = activeForm.find('.js-select select:first');
            actualSelectInput.val(chosenValue);
            // Update the value on the faux select
            activeForm.find('.ui-selectmenu-button .ui-selectmenu-text').text(chosenText);

            if ($this.hasClass('RC022_overlayLinkSelected')) {
                $('.rc4-options-overlay .row li:not(.RC022_onLoadHiddenList)').removeClass('RC022_overlayLinkSelected');
                $('.rc4-options-overlay .row li:not(.RC022_onLoadHiddenList) > a').removeClass('RC022_whiteColor');
            } else {
                $('.rc4-options-overlay .row li:not(.RC022_onLoadHiddenList)').removeClass('RC022_overlayLinkSelected');
                $('.rc4-options-overlay .row li:not(.RC022_onLoadHiddenList) > a').removeClass('RC022_whiteColor');
                $this.addClass('RC022_overlayLinkSelected');
                $this.find(' > a').addClass('RC022_whiteColor');
            }
            $('.RC022_onLoadHiddenList').slideUp('fast');
            // When users select a course we are allowing the user to then select a 'learn' or a 'view dates'
            var $additionalInfoCurrContainer = $this.next();
            if ($additionalInfoCurrContainer.is(':visible')) {
                $additionalInfoCurrContainer.slideUp('fast');
            } else {
                $additionalInfoCurrContainer.slideDown('fast');
            }
        });

        // On 'view dates' click open the first date picker in the third section (select your dates) and hide the 2nd section (sel. a course)
        $('.RC022_viewDates').on('click', function () {
            $('.rc4-search-container .rc4-options-overlay').removeClass('rc4-options-overlay--active');
            $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_1_rctsubcontainer2placeholder_0_SelectFromDate')
                .next().addClass('ui-datepicker-show');
            $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_SelectFromDate')
                .next().addClass('ui-datepicker-show');
        });

        $('.rc4-options-overlay__all-courses-link').on('click', function (e) {
            var chosenValue = $(this).attr('data-value'),
                chosenText = $(this).text(),
                activeForm = getActiveForm();
            // Set the value on the original (hidden) select
            var actualSelectInput = activeForm.find('.js-select select:first');
            actualSelectInput.val(chosenValue);
            // Update the value on the faux select
            activeForm.find('.ui-selectmenu-button .ui-selectmenu-text').text(chosenText);
            deactivateOverlay();
        });
        $('.rc4-options-overlay__link').closest('li').css('cursor', 'pointer');

        // Trigger click on overlay_link when clicking the footer button in public/workplace sections
        $('.RC022_footerBtn').on('click', function (e) {
            e.preventDefault();
            var $linkTo = $(this).parents('.rc4-options-overlay').find('.rc4-options-overlay__title > a');
            $($linkTo).trigger('click');
        });

        // ----------------------------------------------------------------
        // Trigger input (type=submit) click (submits on click) when clicking on the bottom button
        // ----------------------------------------------------------------
        // Hide 'original' input
        var $workplaceSubmit = $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_1_rctsubcontainer2placeholder_0_Button_DoSearch');
        var $publicSubmit = $('#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_Button_DoSearch');
        $workplaceSubmit.hide();
        $publicSubmit.hide();
        $('.RC022_searchDatesFinalBtn').on('click', function (e) {
            e.preventDefault();
            if (getActiveForm().hasClass('rc4-course-form-wrapper--workplace')) {
                $workplaceSubmit.trigger('submit');
                $workplaceSubmit.trigger('click');
            } else if (getActiveForm().hasClass('rc4-course-form-wrapper--public')) {
                $publicSubmit.trigger('submit');
                $publicSubmit.trigger('click');
            }
        });

        // ----------------------------------------------------------------
        // Tooltips
        // ----------------------------------------------------------------
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/tooltipster/3.3.0/js/jquery.tooltipster.min.js', function () {
            $('.rc4-tooltipster').tooltipster({
                theme: 'tooltipster-light',
                maxWidth: 300,
                side: ['bottom', 'top', 'left', 'right']
            });
        });
        // ----------------------------------------------------------------
        // Trustpilot widget move
        // ----------------------------------------------------------------
        $('.home-buttons .trustpilot-widget').insertAfter('.rc4-search-container').wrapAll(
            '<div class="rc4-trustpilot-wrapper" ></div>'
        );

        // ----------------------------------------------------------------
        // Close date picker when search box clicked (clicks elsewhere in body already appear to do this)
        // ----------------------------------------------------------------
        $('.rc4-toggle-heading, .rc4-search-box__title').click(function () {
            $('.ui-datepicker-show').removeClass('ui-datepicker-show');
        });

        // ----------------------------------------------------------------
        // Event Tracking
        // ----------------------------------------------------------------
        var EventTracker = (function () {
            var events = {};

            function addClickEvent(eventId) {
                var ev = events[eventId];
                $(ev.target).on('click', function (e) {
                    if (typeof events[eventId] !== 'undefined') {
                        fireEvent(eventId);
                        remove(eventId);
                    }
                });
            }

            function addHoverEvent(eventId) {
                var ev = events[eventId];
                var startHover;
                $(ev.target).hover(function () {
                    startHover = (new Date()).getTime();
                }, function () {
                    if (typeof events[eventId] !== 'undefined') {
                        var endHover = (new Date()).getTime();
                        var msHovered = endHover - startHover;
                        var seconds = msHovered / 1000;
                        if (seconds >= 0.7) {
                            fireEvent(eventId);
                            remove(eventId);
                        }
                    }
                });
            }

            function fireEvent(eventId) {
                if (typeof events[eventId] === 'undefined') {
                    throw "Tried to fire event on event that no longer exists in stack.";
                }
                var ev = events[eventId];

                // console.log(ev);

                var trackerName = window.ga.getAll()[0].get('name');
                // console.log(trackerName);
                window.ga(trackerName + '.send', 'event', ev.category, ev.eventId, null, {nonInteraction: 1});
                if (typeof ev.callback === 'function') {
                    ev.callback.call();
                }
            }

            function add(eventId, type, category, target, callback) {
                if (eventId in events) {
                    throw "Events must be unique. Cannot add event to event stack.";
                }
                var eventObject = {
                    eventId: eventId,
                    type: type,
                    category: category,
                    target: target,
                    callback: callback
                };
                events[eventId] = eventObject;

                switch (type) {
                    case 'click':
                        addClickEvent(eventId);
                        break;
                    case 'hover':
                        addHoverEvent(eventId);
                        break;
                }
            }

            function remove(eventId) {
                delete events[eventId];
            }

            return {
                add: add
            };
        })();

        UC.poller([
            '.rc4-course-form-wrapper .course-search-form .ui-selectmenu-button',
            '.form-item-date .js-datepicker',
            '.rc4-course-form-wrapper .course-search-form .datepicker-icon',
            function () {
                return typeof window.ga.getAll === 'function';
            },
            '.rc4-course-form-wrapper input[type=submit]',
            '.rc4-tooltipster'
        ], function () {
            // console.log('added');
            EventTracker.add('Interacted-with-Toggle-Buttons', 'click', 'RC022---Homepage', '.rc4-toggle-container__tab');
            EventTracker.add('Clicked-What-Are-You-Looking-For', 'click', 'RC022---Homepage', '.rc4-course-form-wrapper .course-search-form .ui-selectmenu-button');
            EventTracker.add('Interacted-with-datepickers', 'click', 'RC022---Homepage', '.form-item-date .js-datepicker, .rc4-course-form-wrapper .course-search-form .datepicker-icon');
            EventTracker.add('Chose-course-from-overlay', 'click', 'RC022---Homepage', '.rc4-options-overlay__link');
            EventTracker.add('Clicked-show-group-bookings', 'click', 'RC022---Homepage', '.rc4-search-box__group-bookings a');
            EventTracker.add('Clicked-submit-button', 'click', 'RC022---Homepage', '.rc4-course-form-wrapper input[type=submit]');
            EventTracker.add('Hovered-on-a-tool-tip', 'hover', 'RC022---Homepage', '.rc4-tooltipster');
        });

        // Additional events
        $('.RC022_selectCourseType').on('click', function () {
            sendEvent('RC022', 'Select-course-type-toggled');
        });
        $('.RC022_workplace_option').on('click', function () {
            sendEvent('RC022', 'Workplace option selected');
        });
        $('.RC022_public_option').on('click', function () {
            sendEvent('RC022', 'Public option selected');
        });
        $('.RC022_footerBtn').on('click', function () {
            sendEvent('RC022', 'Select all courses button clicked');
        });
        $('.RC022_searchDatesFinalBtn').on('click', function() {
            sendEvent('RC022', 'Search dates button clicked');
        });
        $('.rc4-search-box__group-bookings > a').on('click', function () {
            sendEvent('RC022', '15 or more group bookings link clicked');
        });
        $('.RC022_useCourseFinderM8 > a').on('click', function () {
            sendEvent('RC022', 'Course finder link clicked');
        });

        // ----------------------------------------------------------------
        // Helpers
        // ----------------------------------------------------------------
        /**
         * Active form
         */
        function getActiveForm() {
            return $('.rc4-course-form-wrapper').not(':hidden');
        }

        /**
         * Helper get active tab type
         */
        function getActiveTabName() {
            var activeTab = getActiveTab();
            if (activeTab.text() === 'Workplace') {
                return 'workplace';
            } else {
                return 'public';
            }
        }

        /**
         * Helper get active tab
         */
        function getActiveTab() {
            return $('.RC022_selectCourseType');
        }

        /**
         * Helper deactivate overlay
         */
        function deactivateOverlay() {
            $('.rc4-course-form-wrapper .course-search-form .ui-selectmenu-button').removeClass('rc4--active');
            $('.rc4-search-container .rc4-options-overlay').removeClass('rc4-options-overlay--active');
            $('.rc4-search-box').removeClass('rc4--active');
            $('.RC022_courseType_overlay').removeClass('RC022_courseType_overlay--active');
            $('.RC022_selectCourseType').removeClass('rc4--active');
        }
    }
})(window.jQuery);
