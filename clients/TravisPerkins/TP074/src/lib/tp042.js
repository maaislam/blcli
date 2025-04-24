export default function tp042() {
    var _TP042 = (function() {
      
      // UC Library - Poller -- @version 0.2.2
      var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});

      // get GA tracker name
      var trackerName;
      function sendEvent(category, action, label, nonInteractionValue, dimensionValue, dimensionName) {
              var fire = function (tracker) {
                  var options = {};
                  options.nonInteraction = nonInteractionValue;
                  if(dimensionValue && dimensionName){
                      options['dimension' + dimensionValue] = dimensionName;
                  }
                  window.ga(tracker + '.send', 'event', category, action, label, options);
              };

              if (trackerName) {
                  fire(trackerName);
              } else {
                  UC.poller([
                      function () {
                          return window.ga.getAll;
                      }
                  ], function () {
                      trackerName = window.ga.getAll()[0].get('name');
                      fire(trackerName);
                  });
              }
        }
      
        UC.poller([
            'input#addForCollectButton',
            'input#addToCartButton'
        ], activate);
          
      
        function activate() {
          
          // Full Story Integration
          UC.poller([
              function() {
                  var fs = window.FS;
                  if (fs && fs.setUserVars) return true;
              }
          ], function () {
              window.FS.setUserVars({
                  experiment_str: 'TP042',
                  variation_str: 'Variation 1 Desktop/Tablet'
              });
          }, { multiplier: 1.2, timeout: 0 });
          
          var eventsSent = {
              clickAndCollect: false,
              delivery: false
          };
          
          
          var updateText = function() {
              $('input#addForCollectButton').attr('value', 'Click and Collect');
              $('.addToCollectionOnQuoteListDisabled').attr('value', 'Click and Collect');
          };
          
          var attachEvents = (function(){
              $('body').on('click', 'input#addForCollectButton', function() {
                  if (!eventsSent.clickAndCollect) {
                      sendEvent('TP042', 'click', 'clicked click and collect btn', true);
                      eventsSent.clickAndCollect = true;
                  }
              });
      
              $('body').on('click', 'input#addToCartButton', function() {
                  if (!eventsSent.delivery) {
                      sendEvent('TP042', 'click', 'clicked add for delivery btn', true);
                      eventsSent.delivery = true;
                  }
              });
          })();
          
          updateText();
          
          // If category page with product variants, update the text on change of select inputs
          var ajaxSuccessFuncRunning = false;
          var productVariantSelector = '.pageType-CategoryPage .prod .variant_select select';
          if ($(productVariantSelector).length) {
              $('.prod').ajaxSuccess(function() {
                  if (!ajaxSuccessFuncRunning) {
                      ajaxSuccessFuncRunning = true;
                      updateText();
                      setTimeout(function() {
                          ajaxSuccessFuncRunning = false;
                      }, 400);
                  }
              });
          }
         
        }
      
      
    })();
}
