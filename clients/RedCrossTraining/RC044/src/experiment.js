import { addUrlParameter, fullStory, events } from '../../../../lib/utils';

/**
 * RC044 - Reducing steps to basket from public/workplace pages 
 *
 * N.B. RC019 (V2) is at 100% and this test is built on top of that
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC044',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // Run
    Experiment.addFieldsToPopularCourses();
    Experiment.initDatepickers();
    Experiment.handleBookClicked();
    Experiment.attachEvents();
  },

  /**
   * Attach events
   */
  attachEvents() {

    [].forEach.call(document.querySelectorAll('.rc44-location-field'), (item) => {
      item.addEventListener('focus', () => events.send('RC044', 'focused-location-field', '', {sendOnce: true}));
    });

    [].forEach.call(document.querySelectorAll('.rc19-courseLearnMore'), (item) => {
      item.addEventListener('click', () => events.send('RC044', 'more-info-clicked', '', {sendOnce: true}));
    });
  },

  /**
   * Handle book button clicked
   */
  handleBookClicked() {
    const popularCourses = document.querySelectorAll('.rc19-popularcourse');
    if(popularCourses) {
      popularCourses.forEach((item, idx) => {
        const courseLink = item.querySelector('.rc19-courseLink');
        if(courseLink) {

          courseLink.addEventListener('click', (e) => {
            const dateTo = item.querySelector('.rc44-date-to');
            const dateFrom = item.querySelector('.rc44-date-from');
            const location = item.querySelector('.rc44-location-field');

            let params = new Map();
            if(dateFrom && dateFrom.value) {
              params.set('fromdate', dateFrom.value);
            }
            if(dateTo && dateTo.value) {
              params.set('todate', dateTo.value);
            }
            if(location && location.value) {
              params.set('location', location.value);
            }

            const target = e.currentTarget.href;

            if(target) {
              e.preventDefault();

              let newTarget = target;

              params.forEach((val, idx) => {
                newTarget = addUrlParameter(newTarget, idx, val);
              });

              // Send event and identify num fields filled in
              events.send('RC044', 'clicked-book-button', 'num-boxes-filled-in=' + params.size, {
                sendOnce: true  
              });

              window.location = newTarget;

              return false;
            }
          });
        }
      });
    }
  },

  /**
   * Add the fields markup
   */
  addFieldsToPopularCourses() {
    const popularCourses = document.querySelectorAll('.rc19-popularcourse');
    if(popularCourses) {
      popularCourses.forEach((item, idx) => {
        const courseLinks = item.querySelector('.rc19-courseLinks');
        if(courseLinks) {
          courseLinks.insertAdjacentHTML('afterbegin', `
            <div class="rc44-course-form-fields">
              <div class="rc44-course-form-fields__col">
                <label>From</label>
                <div class="form-item form-item-date">
                  <div class="js-datepicker">
                    <span class="datepicker-icon"><i class="icon-calendar"></i></span>
                    <input id="rc44-d-${parseInt((Math.random() * (new Date()).getTime()), 10)}"  
                    type="text" value="" class="js-date datepicker rc44-date-field rc44-date-from" placeholder="dd/mm/yy" />
                  </div>
                </div>
              </div>

              <div class="rc44-course-form-fields__col">
                <label>To</label>
                <div class="form-item form-item-date">
                  <div class="js-datepicker">
                    <span class="datepicker-icon"><i class="icon-calendar"></i></span>
                    <input id="rc44-d-${parseInt((Math.random() * (new Date()).getTime()), 10)}" 
                      type="text" class="js-date datepicker rc44-date-field rc44-date-to" placeholder="dd/mm/yy" />
                  </div>
                </div>
              </div>

              <div class="rc44-course-form-fields__col-full">
                <div class="form-item">
                  <input 
                    name="rc44-l-${parseInt((Math.random() * (new Date()).getTime()), 10)}"
                    type="text" placeholder="Town / Postcode" value="" class="rc44-location-field" />
                </div>
              </div>
            </div>
          `);
        }
      });
    }
  },

  /**
   * Implementation borrows from main.js, depends on jQuery UI
   */
  initDatepickers() {
		const $ = jQuery;

    const n = /(iPhone|iPod)/g.test(navigator.userAgent);
    if (n) {
        $("input.js-date").addClass("date-ios")
    }

    // --------------------------------------------
    // On focus toggle overlay and custom icons
    // --------------------------------------------
    $(".rc44-date-field").on("focus", function(e) {
				$(".ui-datepicker").removeClass("ui-datepicker-show");

				$(this).next(".ui-datepicker").addClass("ui-datepicker-show");

				$("#overlay").removeClass("show_overlay").removeClass("overlay_datepicker");

				if ($(this).parents(".flyout").length) {
						$("#overlay").addClass("show_overlay").removeClass("hide_overlay")
				} else {
						$("#overlay").addClass("show_overlay overlay_datepicker").removeClass("hide_overlay")
				}

				var d = $('meta[name="viewport"]');

				$("input.js-date").bind("focus blur", function(e) {
						d.attr("content", "width=device-width,initial-scale=1,maximum-scale=" + (e.type == "blur" ? 10 : 1))
				});

        if(e.currentTarget.classList.contains('rc44-date-from')) {
          events.send('RC044', 'focused-date-from', '', {sendOnce: true});
        }

        if(e.currentTarget.classList.contains('rc44-date-to')) {
          events.send('RC044', 'focused-date-to', '', {sendOnce: true});
        }

				return false;
		});

    // --------------------------------------------
    // Date picker fields should be read only
    // --------------------------------------------
    $(".rc44-date-field").prop("readOnly", true);
    
    // --------------------------------------------
    // Init jQuery UI Datepicker
    // --------------------------------------------
    $(".rc44-course-form-fields .js-datepicker").each(function() {
        const id = "#" + $("input.js-date", this).attr("id");

        $(id).datepicker("destroy");

        $(this).datepicker({
            dateFormat: "dd/mm/y",
            minDate: 0,
            altField: id,
            defaultDate: '',
            onSelect: function(val) {
              $(".ui-datepicker").removeClass("ui-datepicker-show");

              $("#overlay").removeClass("show_overlay").addClass("hide_overlay");

              return false
            }
        });

        // Workaround default dates
        $(".rc44-course-form-fields input.js-date").val('');
    });

    // --------------------------------------------
    // Init trigger on icon click
    // --------------------------------------------
    $('.rc44-course-form-fields .datepicker-icon').on('click', function() {
      $(this).parent().find('.js-date').trigger('focus');
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },
};

export default Experiment;
