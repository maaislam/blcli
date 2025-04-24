export default () => {
 /* eslint-disable */
  //--version 2
  //code reused from RC022
  var _RC004 = (function ($) {
    $('body').addClass('rc004 RC022');
    // ----------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------
    var _opts = {
      workplaceOptText: 'Workplace',
      publicOptText: 'Public',
      searchTitle: 'Search over 50 First Aid courses',
      searchSubtitle: 'Book a course that meets the legal requirements of your role or employer',
      searchSubtitlePublic: 'Learn first aid skills you can confidently use in an emergency situation',
      groupBookingsText: 'For groups of 12 or more, <a href="/What-we-do/Group-bookings.aspx">visit group bookings</a>',
      selectCourseText: '2. What kind of course do you need?',
      selectACourseText: '2. Select a course',
      selectYourDates: 'We\'ll search for the soonest available courses in the <b> next 30 days</b><a class="changeDate">Change date range</a>',
      selectYourLocation: '1. Your location',
      useCourseFinder: 'Not sure which one suits your needs? <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">Take our quick quiz</a>',
      selectCourseTitle: 'Courses for work and legal requirements',
      selectCourseSubTitle: 'Over 100,000 UK businesses trust us with their first aid training needs. Recognised by the Health and Safety Executive as a leading training provider.'
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
    function sendEvent(e, n, a, r, t, o) {
      var c = function (c) {
        var i = {};
        i.nonInteraction = r, t && o && (i["dimension" + t] = o), window.ga(c + ".send", "event", e, n, a, i)
      };
      trackerName ? c(trackerName) : UC.poller([function () {
        return window.ga.getAll
      }], function () {
        trackerName = window.ga.getAll()[0].get("name"), c(trackerName)
      })
    }
    var trackerName;
    // Full Story Integration
    UC.poller([
      function () {
        var fs = window.FS;
        if (fs && fs.setUserVars) return true;
      }
    ], function () {
      window.FS.setUserVars({
        experiment_str: 'RC026',
        variation_str: 'Variation 1 Desktop'
      });
    }, {
      multiplier: 1.2,
      timeout: 0
    });
    // Work options apppears in overlay
    var workOptionsHtml = [
      '<div class="rc4-options-overlay rc4-options-overlay--work">',
      '<span title="Close" class="rc4-options-overlay__close">x</span>',
      '<h2 class="rc4-options-overlay__title">2b. Select a course',
      '<p class="RC022_useCourseFinderM8">' + _opts.useCourseFinder + '</p>',
      '</h2>',
      '<h3 class="custom-courseTitle">' + _opts.selectCourseTitle + '</h3>',
      '<p class="RC022_options-overlay__description">' + _opts.selectCourseSubTitle + '</p>',
      '<div style="padding: 0;" class="row">',
      '<div class="custom-course-container clearBoth" data-value="6c5cc743-d456-4faf-8694-5bb87c8556e5|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid at work</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Aimed at high risk workplaces</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>3 days</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid at work</h3>',
      '<ul>',
      '<li>Learn the skills and confidence to respond to a range of accidents and first aid emergencies you could encounter in the workplace.</li>',
      '<li>On successful completion of this course, you will receive a <strong>first aid at work certificate</strong> which is valid for <strong> three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '<span class="custom-hsc-box">HSE certified for workplace </span>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="536928a6-fe53-44f3-aaa7-6ba10d73b44a|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Emergency first aid at work</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Aimed at low risk workplaces</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1 days</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Emergency first aid at work</h3>',
      '<ul>',
      '<li>Our courses offer a practical, hands on approach that deliver the skills and confidence to use first aid skills in a real life situation.</li>',
      '<li>On successful completion of this course, you will receive an emergency <strong>first aid at work certificate</strong> which is valid for<strong> three years.</strong> </li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '<span class="custom-hsc-box">HSE certified for workplace </span>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="01235a45-e7a7-4377-a284-c5f92048136a|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Paediatric first aid</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>For child carers in any professional setting</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>2 days</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Paediatric first aid</h3>',
      '<ul>',
      '<li>This course can be used as evidence for an NVQ in childcare and education.</li>',
      '<li>On successful completion of this course, you will receive a paediatric first aid certificate which is valid for three years.</li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="bc197a39-01f9-45ad-a46d-dc27690d0043|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid at work requalification</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Refresher course</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>2 days</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid at work requalification</h3>',
      '<ul>',
      '<li>Learn the skills and confidence to respond to a range of accidents and first aid emergencies you could encounter in the workplace.</li>',
      '<li>On successful completion of this course, you will receive a <strong>first aid at work certificate </strong>which is valid for <strong>three years.</strong> Learners must have previously attended a three day first aid at work course.</li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '<span class="custom-hsc-box">HSE certified for workplace </span>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="648a58a0-4afe-4892-afa4-e8876cbcb520|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid for appointed persons</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>For people who cover first aid arrangements (not first aiders)</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1/2 days</p>',
      '<p>AM or PM</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid for appointed persons</h3>',
      '<ul>',
      '<li>Learn the skills to recognise and treat a wider range of injuries and medical conditions, not covered in first aid for work or emergency first aid at work courses.</li>',
      '<li>On successful completion of this course, you will receive a <strong>first aid for appointed persons</strong> certificate which is valid for three years.</li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" date-value="e1fa21c7-80ec-471d-b52b-c753dc183f8d|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid annual skills update</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Refresher course for first aiders (face-to-face or e-learning)</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1/2 days</p>',
      '<p>AM or PM</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid annual skills update</h3>',
      '<ul>',
      '<li>A course to refresh your skills and keep up to date with any changes in the first aid at work course. </li>',
      '<li>This course is <strong>not certified.</strong> Designed to keep your existing first aid at work or emergency first aid at work skills and confidence refreshed.</li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="4064cd0c-5a85-4558-b4ad-944e80191711|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Paediatric first aid (2 days in 2 weeks)</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>For child carers in any professional setting</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>2 days in 2 weeks</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Paediatric first aid (2 days in 2 weeks)</h3>',
      '<ul>',
      '<li>This course can be used as evidence for an NVQ in childcare and education.</li>',
      '<li>On successful completion of this course, you will receive a <strong>paediatric first aid certificate </strong>which is valid for <strong>three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="032d9c79-a89a-4d60-a103-4d22b08fc6d0|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Emergency paediatric first aid</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Designed for newly qualified level ⅔ childcare staff</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1 day</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Emergency paediatric first aid</h3>',
      '<ul>',
      '<li>The emergency paediatric first aid course meets Childcare Registration requirements.</li>',
      '<li>On successful completion of this course, you will receive a emergency <strong>paediatric first aid certificate</strong> which is valid for <strong>three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="db01b7bf-c944-4c30-8de7-6d337a07d0a9|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Fire marshall training</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>For those responsible for overseeing fire safety</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1/2 day</p>',
      '<p>AM or PM</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Fire marshall training</h3>',
      '<ul>',
      '<li>Learn the valuable skills to use a fire extinguisher, become the designated fire marshal or are responsible to oversee the fire safety.</li>',
      '<li>On successful completion of this course, you will receive a <strong>fire marshal training certificate </strong>which is valid for <strong>three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="083e35fc-9739-4f37-a3a5-586b9a455bc3|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>Automated external defibrillators (AED)</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>How to use an AED machine</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>1/2 day</p>',
      '<p>09:00-12:15</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>Automated external defibrillators (AED)</h3>',
      '<ul>',
      '<li>Our courses offer a practical, hands on approach that delivers the skills and confidence to use first aid skills in a real life situation.</li>',
      '<li>On successful completion of this course, you will receive an <strong>AED certificate </strong>which is valid for <strong>three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="433b1212-c682-4b9a-8e7e-f996e9d170da|UK|NI|WORK">',
      '<div class="custom-nameNdetails">',
      '<h3>AED with life support</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Train at our venues, in-house or at a location of your choice</p>',
      '<p>Basic life support training and use of the AED machine.</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>2 day</p>',
      '<p>09:00-17:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>AED with life support</h3>',
      '<ul>',
      '<li>The course covers first aid for unresponsive adult casualties, including the use of an AED machine.</li>',
      '<li>On successful completion of this course, you will receive an <strong>AED with life support certificate </strong>which is valid for <strong>three years.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="rc4-options-overlay__cat">',
      '</div>',
      '<div class="RC022_footerWrapper RC022_workplace_footerWrapper">',
      '<button class="RC022_footerBtn RC022_workplace_footerBtn">SHOW MORE WORKPLACE COURSES</button>',
      '</div>',
      '<div class="RC022_underFooterWrapper">',
      '<span class="RC022_underFooterQ">Not sure what you\'re looking for?</span>',
      '<span class="RC022_underFooterA">Use our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">course finder</a> instead</span>',
      '</div>',
      '<div class="customCourseContainerOverlay" style="display:none;"></div>',
      '</div>'
    ].join('');
    var publicOptionsHtml = [
      '<div class="rc4-options-overlay rc4-options-overlay--public">',
      '<span title="Close" class="rc4-options-overlay__close">x</span>',
      '<h2 class="rc4-options-overlay__title">2b. Select a course',
      '<p class="RC022_useCourseFinderM8">' + _opts.useCourseFinder + '</p>',
      '</h2>',
      '<p class="RC022_options-overlay__description">Learn in an open, friendly environment with qualified, externally accredited trainers. All at a venue near you.</p>',
      '<div style="padding: 0;" class="row">',
      '<div class="custom-course-container clearBoth" data-value="03e3bf08-7d24-4fda-a3ae-fae0254a84b5|UK|NI|PUBLIC">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid for baby and child</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Available at our venues or at a location of your choice</p>',
      '<p>Not certified for professional use</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>4 hours</p>',
      '<p>10:00-14:30</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid for baby and child</h3>',
      '<ul>',
      '<li>Designed with parents in mind, to guide you through exactly what you need to know.</li>',
      '<li>You\'ll receive a <strong>free first aid workbook</strong> full of helpful advice; this can be taken home and used to check and refresh your knowledge. The workbook includes your <strong>certificate of learning.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="5ae41926-0d16-4509-a417-5ee27c8aa8a7|UK|NI|PUBLIC">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid for adult</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Available at our venues or at a location of your choice</p>',
      '<p>Not certified for professional use</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>4 hours</p>',
      '<p>10:00-14:30</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid for adult</h3>',
      '<ul>',
      '<li>Learn a range of life-saving skills to treat unresponsiveness, heart attack, choking and seizures.</li>',
      '<li>You\'ll receive a <strong>free first aid workbook</strong> full of helpful advice; this can be taken home and used to check and refresh your knowledge. The workbook includes your <strong>certificate of learning.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="5ede371a-eb4d-4c8d-bb84-fe9d3b2758dc|UK|NI|PUBLIC">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid for baby and child (evenings)</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Available at our venues or at a location of your choice</p>',
      '<p>Not certified for professional use</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>4 hours over 2 days</p>',
      '<p>19:00-21:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid for baby and child (evenings)</h3>',
      '<ul>',
      '<li>The same "First aid for baby and child" course, but recommended for anyone who prefers an evening class, or find it difficult to attend a course during the day.</li>',
      '<li>You\'ll receive a <strong>free first aid workbook</strong> full of helpful advice; this can be taken home and used to check and refresh your knowledge. The workbook includes your <strong>certificate of learning.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="custom-course-container clearBoth" data-value="272f96fc-d7d0-4499-8b7e-d7af23bbaa2b|UK|NI|PUBLIC">',
      '<div class="custom-nameNdetails">',
      '<h3>First aid for adult (evenings)</h3>',
      '<div class="custom-details">',
      '<input type="checkbox" name="checkbox">',
      '<p>Available at our venues or at a location of your choice</p>',
      '<p>Not certified for professional use</p>',
      '</div>',
      '</div>',
      '<div class="custom-dayNtime">',
      '<p>4 hours over 2 days</p>',
      '<p>19:00-21:00</p>',
      '</div>',
      '<div class="custom-btnwrapper">',
      '<a class="customSelect">Select course</a>',
      '<div class="custom-toolTip">',
      '<span><i>i</i> More information</span>',
      '<div class="custom-moreInformationPopup">',
      '<span class="closeIcon">×</span>',
      '<h3>First aid for adult (evenings)</h3>',
      '<ul>',
      '<li>The same "First aid for adult" course, but recommended for anyone who prefers an evening class, or find it difficult to attend a course during the day.</li>',
      '<li>You\'ll receive a <strong>free first aid workbook</strong> full of helpful advice; this can be taken home and used to check and refresh your knowledge. The workbook includes your <strong>certificate of learning.</strong></li>',
      '</ul>',
      '<a class="customPopupClose">Close</a>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
      '<div class="RC022_underFooterWrapper">',
      '<span class="RC022_underFooterQ">Not sure what you\'re looking for?</span>',
      '<span class="RC022_underFooterA">Use our <a href="https://www.redcrossfirstaidtraining.co.uk/Courses/find-the-right-first-aid-course.aspx">course finder</a> instead</span>',
      '</div>',
      '<div class="customCourseContainerOverlay" style="display:none;"></div>',
      '</div>'
    ].join('');
    var courseTypeHtml = [
      '<div class="RC022_courseType_overlay">',
      '<span title="Close" class="rc4-options-overlay__close">x</span>',
      '<h2 class="RC022_courseType__title">2a. Select your course type</h2>',
      '<div class="RC022_courseType_wrapper row">',
      '<div class="RC022_courseType_innerWrapper col-md-5">',
      '<span class="RC022_workplace_option"><img src="https://ab-test-sandbox.userconversion.com/experiments/RC022-building.png"><span class="RC022_workplaceTitle">Workplace</span></span>',
      '<span class="RC022_courseType_description">Ideal for<ul>',
      '<li>training in accidents and emergencies which could happen at work</li>',
      '<li>compliance with health and safety requirements</li>',
      '<li>professional childcarers</li>',
      '</ul><a class="customSelect">Select</a></span>',
      '</div>',
      '<span class="RC022_justOR col-md-2">or</span>',
      '<div class="RC022_courseType_innerWrapper col-md-5">',
      '<span class="RC022_public_option"><img src="https://ab-test-sandbox.userconversion.com/experiments/RC022-house.png"><span class="RC022_publicTitle">Public</span></span>',
      '<span class="RC022_courseType_description">Ideal for<ul>',
      '<li>parents/carers of young family members</li>',
      '<li>casual babysitters</li>',
      '<li>members of community or sports groups</li>',
      '</ul><a class="customSelect">Select</a></span>',
      '</div>',
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
      '<div class="custom-selected-course">',
      '<a class="customGoback"> < Go back</a>',
      '<h2 class="selectedCourseTitle">You\’ve selected:</h2>',
      '<h3 class="selectedCoursename"></h3>',
      '</div>',
      '<p class="rc4-toggle-heading location">' + _opts.selectYourLocation + '</p>',
      '<p class="rc4-toggle-heading customSecond">' + _opts.selectCourseText + '</p>',
      // RC022 -----------------------
      '<span class="RC022_selectCourseType ui-selectmenu-button ui-widget ui-state-default ui-corner-all customSecond" tabindex="1">',
      '<span class="RC022_triangleArrow ui-icon ui-icon-triangle-1-s"></span>',
      '<span class="RC022_selectCourseTypeText ui-selectmenu-text">Workplace</span>',
      '</span>',
      // -----------------------------
      //'<p class="rc4-toggle-heading">' + _opts.selectACourseText + '</p>',
      '<div class="rc4-course-form-wrapper rc4-course-form-wrapper--workplace">',
      '</div>',
      '<div class="rc4-course-form-wrapper rc4-course-form-wrapper--public">',
      '</div>',
      '<div class="RC022_btnContainer"><button class="RC022_searchDatesFinalBtn">FIND MY COURSE</button></div>',
      '<p class="rc4-search-box__group-bookings">',
      _opts.groupBookingsText,
      '</p>',
      '</div>',
      '</div>'
    ].join(''));
    $('.home-course-search').before(courseSearch);
    $('fieldset.form-daterange').before('<p class="rc4-toggle-heading">' + _opts.selectYourDates + '</p>');
    $('.changeDate').click(function () {
      $(this).parent().next().addClass('active');
      $(this).parent().html('3. Select dates');
    });
    //$('fieldset.form-daterange').next('.form-item').before('<p class="rc4-toggle-heading">' + _opts.selectYourLocation + '</p>');
    $('.form-button-inline.form-autoSubmit.js-location-required').closest('.form-item').insertAfter('.rc4-toggle-heading.location');
    $('.form-button-inline.form-autoSubmit.js-location-required input').attr('placeholder', 'Enter your town, city or postcode');
    $('.form-button-inline.form-autoSubmit.js-location-required').after('<p class="RC022_locationFooter">We\'ll search for courses nearest to this town, city or postcode</p>');
    
    // Bug fix - Form not submitting because visible location input isn't for that form
    // Update all other location inputs on change of one of them
    var $locationInputs = $('.form-button-inline.form-autoSubmit.js-location-required input.js-location');
    $locationInputs.on('change', function() {
      $locationInputs.not(this).val(this.value);
    });
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
      '<p class="RC022_accordingTo">(According to our 2017 delegate feedback + independent TrustPilot reviews).</p>',
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
      $('.RC022 .rc4-course-form-wrapper .course-search-form .form-item.form-course-type .ui-selectmenu-button').eq(0).click();
    });
    //----------------------------------------------------------------
    //Click for slide button
    //----------------------------------------------------------------
    $('.RC022_courseType_description').click(function () {
      $(this).prev().click();
    });
    //--------------------------------------------------------------
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
    $('.custom-course-container input').on('click', function (e) {
      var $this = $(this);
      var chosenValue = $this.closest('.custom-course-container').attr('data-value'),
        chosenText = $this.closest('.custom-course-container').find('.custom-nameNdetails > h3').text(),
        activeForm = getActiveForm();
      // Set the value on the original (hidden) select
      if ($this.prop('checked')) {
        $('.custom-course-container input').not($this).prop('checked', false);
        var actualSelectInput = activeForm.find('.js-select select:first');
        actualSelectInput.val(chosenValue);
        // Update the value on the faux select
        $('.RC022_selectCourseTypeText.ui-selectmenu-text').text(chosenText);
        $('.custom-course-container .customSelect').text('Select Course');
        $this.closest('.custom-course-container').find('.customSelect').text('Selected');
        //close logic
        $this.closest('.rc4-options-overlay').removeClass('rc4-options-overlay--active');
        $('.selectedCoursename').text(chosenText);
        $('.custom-selected-course').addClass('showSelected');
        $('.customSecond').hide();
        //$('.RC022_onLoadHiddenList').slideUp('fast');
        // When users select a course we are allowing the user to then select a 'learn' or a 'view dates'
        /*
        var $additionalInfoCurrContainer = $this.next();
        if ($additionalInfoCurrContainer.is(':visible')) {
          $additionalInfoCurrContainer.slideUp('fast');
        } else {
          $additionalInfoCurrContainer.slideDown('fast');
        }
        */
      } else {
        $this.closest('.custom-course-container').find('.customSelect').text('Select Course');
        $this.prop('checked', false);
      }
    });
    $('.custom-course-container .customSelect').click(function () {
      var $this = $(this);
      var chosenValue = $this.closest('.custom-course-container').attr('data-value'),
        chosenText = $this.closest('.custom-course-container').find('.custom-nameNdetails > h3').text(),
        activeForm = getActiveForm();
      if (!($this.closest('.custom-course-container').find('input').prop('checked'))) {
        $('.custom-course-container input').not($this.closest('.custom-course-container').find('input')).prop('checked', false);
        var actualSelectInput = activeForm.find('.js-select select:first');
        actualSelectInput.val(chosenValue);
        // Update the value on the faux select
        $('.RC022_selectCourseTypeText.ui-selectmenu-text').text(chosenText);
        $('.custom-course-container .customSelect').text('Select Course');
        $this.text('Selected');
        $this.closest('.custom-course-container').find('input').prop('checked', true);
        //close logic
        $this.closest('.rc4-options-overlay').removeClass('rc4-options-overlay--active');
        $('.selectedCoursename').text(chosenText);
        $('.custom-selected-course').addClass('showSelected');
        $('.customSecond').hide();
      } else {
        $this.text('Select Course');
        $this.closest('.custom-course-container').find('input').prop('checked', false);
      }
    });
    // ----------------------------------------------------------------
    // click on Goback
    // ----------------------------------------------------------------
    $('.customGoback').click(function () {
      $('.custom-selected-course').removeClass('showSelected');
      $('.customSecond').show();
      $('span.RC022_selectCourseType.ui-selectmenu-button.ui-widget.ui-state-default.ui-corner-all').click();
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
    // $('.home-buttons .trustpilot-widget').insertAfter('.rc4-search-container').wrapAll(
    //   '<div class="rc4-trustpilot-wrapper" ></div>'
    // );
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
        window.ga(trackerName + '.send', 'event', ev.category, ev.eventId, null, {
          nonInteraction: 1
        });
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
    // Additional events
    $('.RC022_selectCourseType').on('click', function () {
      sendEvent('RC026', 'Select-course-type-toggled');
    });
    $('.RC022_workplace_option').on('click', function () {
      sendEvent('RC026', 'Workplace option selected');
    });
    $('.RC022_public_option').on('click', function () {
      sendEvent('RC026', 'Public option selected');
    });
    $('.RC022_footerBtn').on('click', function () {
      sendEvent('RC026', 'Select all courses button clicked');
    });
    $('.RC022_searchDatesFinalBtn').on('click', function () {
      sendEvent('RC026', 'Search dates button clicked');
    });
    $('.rc4-search-box__group-bookings > a').on('click', function () {
      sendEvent('RC026', '12 or more group bookings link clicked');
    });
    $('.RC022_useCourseFinderM8 > a').on('click', function () {
      sendEvent('RC026', 'Course finder link clicked');
    });
    // ----------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    // Popup Toggle
    // ----------------------------------------------------------------
    $('.rc4-options-overlay.rc4-options-overlay--work.rc4-options-overlay--active').append('<div class="customCourseContainerOverlay" style="display:none;"></div>');
    $('.custom-toolTip span').click(function () {
      $(this).closest('.custom-course-container').siblings().find('.custom-moreInformationPopup').fadeOut();
      $(this).next().fadeToggle();
      $('.customCourseContainerOverlay').fadeIn();
    });
    $('.customCourseContainerOverlay, span.closeIcon, a.customPopupClose').click(function () {
      $('.customCourseContainerOverlay, .custom-moreInformationPopup').fadeOut();
    });
    $('.RC022_underFooterWrapper').hide();
    $('button.RC022_footerBtn.RC022_workplace_footerBtn').click(function () {
      $('.custom-course-container:nth-child(4) ~ .custom-course-container').fadeToggle();
      if ($(this).text().indexOf('MORE') !== -1) {
        $(this).text('SHOW LESS WORKPLACE COURSES');
      } else {
        $(this).text('SHOW MORE WORKPLACE COURSES');
      }
    });
    $(".rc4-search-box label").each(function () {
      if ($(this).html() == '&nbsp;') {
        $(this).html('');
      }
    });
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
  })(window.jQuery);
};