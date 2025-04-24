/**
 * Taken from M&P site source code
 */

/**
 * Slide panel initialiser
 *
 * @depends jQuery
 * @param {String|HTMLElement} detailPanelElement
 */
const initialiseSlidePanel = (detailPanelElement) => {
  (function($) {
      function createElement(type, addClass, id) {
          var element = $(type);
          if (id) {
              element.attr("id", id)
          }
          if (addClass) {
              element.addClass(addClass)
          }
          return element
      }
      function generateSlidePanel(content, side, slideID) {
          var side = side || "leftSide";
          var slidePanel = createElement("<div></div>", "slidePanel slidePanel-" + side + " h-100", slideID);
          var slidePanelContentContainer = createElement("<div></div>", "slidePanel_content h-100 bg-white");
          var slidePanelHeader = createElement("<div></div>", "slidePanel_top");
          var slidePanelClose = createElement("<div></div>", "slidePanel_close cursor-pointer js-slidePanel");
          slidePanelClose.append(createElement("<i></i>", "ico ico-cross"));
          slidePanelHeader.append(slidePanelClose);
          slidePanelContentContainer.append(slidePanelHeader);
          slidePanelContentContainer.append(content);
          slidePanel.append(slidePanelContentContainer);
          return slidePanel
      }
      var filters = $("#filter-by-slide");
      if (filters.length > 0) {
          filterSlidePanel = generateSlidePanel($("#slide-filter-container").detach().html());
          $("body").append(filterSlidePanel);
          sortSlidePanel = generateSlidePanel($("#slide-sort-container").detach().html());
          $("body").append(sortSlidePanel);
          setupFilters(jQuery)
      }
      var smBreakpoint = 768;
      function showPanel(slidePanel) {
          slidePanel.css("z-index", 9999).addClass("active");
          $("body").find(".blackout").addClass("active")
      }

      $(detailPanelElement).on("click", function(e) {
          if ($(window).width() <= smBreakpoint) {
              var slideID = $(this).data("slide-id");
              var checkIfExists = $("body").find("#" + slideID + ".slidePanel");
              if (checkIfExists.length > 0) {
                  showPanel(checkIfExists)
              } else {
                  var html = generateItemOptions($(this).clone());
                  var slidePanel = generateSlidePanel(html, "rightSide", slideID);
                  $("body").append(slidePanel);
                  $("body").on("click", ".slidePanel_content .addToCartButton", function(e) {
                      e.preventDefault();
                      $(this).parents(".slidePanel").find(".slidePanel_close").trigger("click");
                      $("#addToCartForm").trigger("submit");
                      hidePanel(slidePanel)
                  });
                  setTimeout(function() {
                      showPanel($("body").find("#" + slideID + ".slidePanel"))
                  }, 100)
              }
          }
      });

      function generateItemOptions(element) {
          var variantOptions = $(".variant_options form").clone();
          var submitButton = $("#addToCartForm button").clone();
          var columnSetup, variantHeight;
          switch (variantOptions.length) {
          case 1:
              columnSetup = "col-xs-6";
              variantHeight = $(".variant_options select").outerHeight();
              break;
          default:
              columnSetup = "col-xs-12"
          }
          var slidePanelActions = createElement("<div></div>", "col-xs-12 p-md-0 stickyBottom bg-white py-3");
          if (variantOptions.length) {
              var variants = createElement("<div></div>", columnSetup);
              variants.html(variantOptions);
              slidePanelActions.append(variants)
          }
          var submit = createElement("<div></div>", columnSetup);
          if (variantHeight) {
              submitButton.css({
                  height: variantHeight
              })
          }
          submit.html(submitButton);
          slidePanelActions.append(submit);
          element.append(slidePanelActions);
          return element
      }
  }
  )(window.jQuery);
};

export default initialiseSlidePanel;
