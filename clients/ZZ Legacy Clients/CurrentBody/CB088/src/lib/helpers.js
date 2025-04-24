/**
 * Modal Lightbox
 * https://codepen.io/ScottTaylor96/pen/eRvdBR
 */
export const lightbox = (modal, closeCallback) => {
    var slideQ = false;

    function toggle(e) {
      if (slideQ === false) {
        slideQ = true;
        e && e.preventDefault();

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
      if (!$(e.target).closest(".pop-up_modal > div")) {
        if (modal.hasClass("active")) {
            e.preventDefault();
            closeCallback();
        }
      }
    });

    $(document).on('keyup', function(e) {
        if(e.which === 27) {
            if (modal.hasClass("active")) {
                e.preventDefault();
                closeCallback();
            }
        }
    });

    modal.find('.close_btn').on('click', function() {
        closeCallback();    
    });

    return {
        toggle: toggle
    }

};
