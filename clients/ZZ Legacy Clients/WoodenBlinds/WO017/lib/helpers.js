import UC from './uc.js';

/**
 * Submit the free sample form
 */
export const addFreeSampleToBasket = () => {
    $('#sample form.free_sample').trigger('submit');
};

/**
 * GA Send Event
 */
export const sendEvent = (action, label = '') => {
    const cat = 'WO17-Product-Page-Measurement';

    ga('send', 'event', cat, action, label);
};

/**
 * Do CSS Animation 
 *
 * Helper w/ removal after running
 */
export const cssAnimation = (element, className) => {
    element.addClass(className);
    element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        element.removeClass(className);
    });
};

/**
 * Convert inputs into +/- inputs
 * and implict validate on non-numeric or < 1 values
 */
export const numberInput = (input) => {
    let prev = input.previousElementSibling
        , next = input.nextElementSibling;

    const triggerBlur = () => {
        input.focus();
        input.blur();
    };

    prev.addEventListener('click', (e) => {
        const val = parseInt(input.value);
        if(val > 2) {
            input.value = val - 1;
        } else {
            input.value = 1;
        }

        triggerBlur();
    });

    next.addEventListener('click', (e) => {
        const val = parseInt(input.value);
        if(val > 0) {
            input.value = val + 1;
        } else {
            input.value = 1;
        }

        triggerBlur();
    });

    input.addEventListener('blur', (e) => {
        const num = parseInt(input.value);
        if(isNaN(num) || num < 1) {
            input.value = 1;
        }
    });
};

/**
 * Full story integration
 */
export const fullStory = (experiment_str, variation_str) => {
    UC.poller([
     function() {
         var fs = window.FS;
         if (fs && fs.setUserVars) return true;
     }
    ], function () {
     window.FS.setUserVars({
         experiment_str: experiment_str,
         variation_str: variation_str
     });
    }, { multiplier: 1.2, timeout: 0 });
};

/**
 * Modal Lightbox
 * https://codepen.io/ScottTaylor96/pen/eRvdBR
 */
export const lightbox = (modal) => {
    var slideQ = false;

    function toggle(e) {
      if (slideQ === false) {
        slideQ = true;
        e.preventDefault();

        if (modal.hasClass("active")) {
          modal.fadeOut("slow", function() {
            modal.removeClass("active");
            slideQ = false;
          });

          modal.find('iframe').each(function() {
              $(this).attr('src', '');
          });
        } else {
          var iframes = modal.find('iframe');
          iframes.each(function() {
            if(!$(this).attr('src')) {
                var d = $(this).data('original-src');
                if(d) {
                    $(this).attr('src', d);
                }
            }
          });

          modal.fadeIn("slow", function() {
            modal.addClass("active");
            slideQ = false;
          });
        }
      }
    }

    modal.find('iframe').each(function() {
        $(this).data('original-src', $(this).attr('src'));
    });

    $(document).on("mousedown", function(e) {
      if (!$(e.target).closest(".pop-up_modal > div").length) {
        if (modal.hasClass("active")) {
            toggle(e);
        }
      }
    });

    $(document).on('keyup', function(e) {
        if(e.which === 27) {
            if (modal.hasClass("active")) {
                toggle(e);
            }
        }
    });

    modal.find('.close_btn').on('click', toggle);

    return {
        toggle: toggle
    }

};

export const scrollToFirstInstanceOf = (element) => {
    const yPos = (element.eq(0).offset() || {}).top;
    if(yPos) {
        $('body,html').animate({
            scrollTop: yPos - 30
        }, 300);
    }
};
