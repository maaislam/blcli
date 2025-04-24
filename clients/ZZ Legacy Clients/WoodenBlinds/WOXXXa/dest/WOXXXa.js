
(function() {
  
  var UC=function(a){return a.poller=function(a,b,c){var d={wait:50,multiplier:0,timeout:7000},e=Date.now||function(){return(new Date).getTime()};if(c)for(var f in c)d[f]=c[f];else c=d;for(var g=!!d.timeout&&new Date(e()+d.timeout),h=d.wait,i=d.multiplier,j=[],l=function(c,d){if(g&&e()>g)return!1;d=d||h,function(){var a=typeof c;return"function"===a?c():"string"!==a||document.querySelector(c)}()?(j.push(!0),j.length===a.length&&b()):setTimeout(function(){l(c,d*i)},d)},m=0;m<a.length;m++)l(a[m])},a}(UC||{});
  
  /**
     * @method Feedback Tab
     * @desc Attatch a feedback tab to the window
     * @param {object} options - Settings to determine how the feedback tab is created
     */
    UC.feedbackTab = (function () {
        if (!$) return false;
        
        var settings, component, background, css, animations, dimensions, dimensionProperty;
        
        var getSettings = function (options) {
            var newSettings = settings || {
                label: false,
                content: false,
                position: 'left',
                customClass: false,
                tabDimensions: {height: 'auto', width: '350px'},
                contentDimensions: {height: '350px', width: '600px'},
                mobileBreakpoint: 768,
                animationSpeed: 600,
                dimBackground: false,
                zIndex: 99999
            }
            
            if (options) {
                // Overwrite defaults with values from options
                for (var option in options) {
                    newSettings[option] = options[option];
                }
            } else {
                options = newSettings;
            }
            
            
            return newSettings;
        }
        
        
        var createComponent = function () {
            var $template = $([
                '<div class="UC_fb-tab-container">',
                    '<div class="UC_fb-tab">',
                        '<span class="UC_fb-tab__inner"></span>',
                        '<span class="UC_fb-tab__close">&#215;</span>',
                    '</div>',
                    '<div class="UC_fb-content">',
                        '<div class="UC_fb-content__inner"></div>',
                    '</div>',
                '</div>'
            ].join('')),
            $tab = $template.find('.UC_fb-tab'),
            $content = $template.find('.UC_fb-content');
            // Optional
            if (settings.label) $tab.find('.UC_fb-tab__inner').html(settings.label);
            if (settings.content) $content.find('.UC_fb-content__inner').html(settings.content);
            if (settings.customClass) $template.addClass(settings.customClass);
            if (settings.dimBackground) background = $('<div class="UC_fb-tab-bg"></div>');
            // Set user defined styles
            $tab.css({'height': settings.tabDimensions.height, 'width': settings.tabDimensions.width});
            $content.css({'height': settings.contentDimensions.height, 'width': settings.contentDimensions.width});
            return $template
        };
        
        
        var destroyComponent = function () {
            if (component) component.remove();
            if (background) background.remove();
        }
        
        
        var createCSS = function() {
            // Define positioning variables
            var tabPosStyle, contentPosStyle, containerPosStyle;
            switch (settings.position) {
                case 'left':
                    tabPosStyle = '-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;';
                    containerPosStyle = 'top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;';
                    dimensionProperty = 'width';
                    break;
                    
                case 'right':
                    tabPosStyle = '-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;';
                    containerPosStyle = 'top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;';
                    dimensionProperty = 'width';
                    break;
                    
                case 'bottom':
                    tabPosStyle = '-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;';
                    containerPosStyle = 'left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;';
                    dimensionProperty = 'height';
                    break;
                    
                case 'top':
                    tabPosStyle = '-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;';
                    containerPosStyle = 'left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;';
                    dimensionProperty = 'height';
                    break;
                    
                default:
                    tabPosStyle = '';
                    containerPosStyle = '';
                    dimensionProperty = 'width';
                    break;
            }
            
            // Create style node
            var style = document.createElement('style');
            style.type = 'text/css';
            var css = '.UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:'+settings.zIndex+';'+containerPosStyle+'}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:'+settings.zIndex+';color:#333;font-size:15px;padding:10px 10px 10px 20px;'+tabPosStyle+'}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:'+(settings.zIndex-1)+';}';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
        
            return style;
        };
        
        
        var destroyCSS = function (){
          if (css) css.parentElement.removeChild(css);
        };
        
        
        // Return height and width of each element
        var getDimensions = function () {
            var $container = $('.UC_fb-tab-container');
            var $tab = $container.children('.UC_fb-tab');
            var $content = $container.children('.UC_fb-content');
            var $window = $(window);
            var dimensions = {
                window: { width: $window.innerWidth(), height: $window.innerHeight() },
                tab: { width: $tab.outerWidth(), height: $tab.outerHeight() },
                content: { width: $content.outerWidth(), height: $content.outerHeight() }
            };
            return dimensions;  
        };
        
        
        // Generate animations based on dimensions
        var getAnimations = function (dimensions) {
            if (!dimensions) dimensions = getDimensions();
            if (!settings) settings = getSettings();
            
            var updatedAnimations = { remove: {}, open: {}, close: {} };
            
            updatedAnimations.remove[settings.position] = '-100%';
            updatedAnimations.open[settings.position] = '0';
            updatedAnimations.close[settings.position] = '-'+dimensions.content[dimensionProperty]+'px';
            
            return updatedAnimations;
        };
            
            
        // Event Handlers
        var attachEventHandlers = function (component) {
            if (!component) return false;
            var tab = component.find('.UC_fb-tab');
            var content = component.find('.UC_fb-content');
            var tabStatus = 'closed';
            
            tab.click(function () {
                var maxWidth, maxHeight, animationToPerform;
                    
                // Refresh dimensions and animations
                dimensions = getDimensions();
                animations = getAnimations(dimensions);
                
                // Define max dimensions to make sure close tab is always visible 
                maxWidth = dimensions.window.width - dimensions.tab.height - 5;
                maxHeight = dimensions.window.height - dimensions.tab.height - 5;
                content.css({'max-width': maxWidth, 'max-height': maxHeight});
                    
                // If dimensions.content values exeed new max dimensions, update values to reflect current render state
                if (dimensions.content.width > maxWidth) dimensions.content.width = maxWidth;
                if (dimensions.content.height > maxHeight) dimensions.content.height = maxHeight;
                    
                    
                // Get next animation based on whether tab is open or closed
                if (tabStatus === 'open') {
                    animationToPerform = animations.close
                    if (background) background.fadeOut();
                } else {
                    animationToPerform = animations.open;
                    if (background) background.fadeIn();
                }
                    
                // Perform animation
                component.animate(animationToPerform, settings.animationSpeed, function () {
                    tabStatus = tabStatus === 'open' ? 'closed' : 'open';
                });
            });
                
            tab.find('.UC_fb-tab__close').click(function (e) {
                e.stopPropagation();
                if (background) background.fadeOut();
                component.animate(animations.remove, settings.animationSpeed);
            });
        };
        
        
        /*
         * Public Methods
         */
        
        var methods = {
            init: function (options) {        
                var newSettings = getSettings(options);
                if (settings !== newSettings) settings = newSettings;
                
                component = createComponent();
                css = createCSS();
                
                // Inject in DOM
                component.prependTo('body'); // HTML
                document.body.insertBefore(css, component[0]); // Style tag
                if (settings.dimBackground) component.before(background); // Background
                
                
                dimensions = getDimensions();
                animations = getAnimations(dimensions);
                attachEventHandlers(component);
                
                // Set initial position
                component.css(settings.position, '-'+dimensions.content[dimensionProperty]+'px');
            },
            
            destroy: {
                component: destroyComponent,
                css: destroyCSS,
                all: function () {
                    destroyComponent();
                    destroyCSS();
                }
            },
            
            refresh: function (options) {
                this.destroy.all();
                this.init(options);
            }
        };
        
        return methods;
        
    }());
    
    // Setup
    UC.poller([
      function() {
        return !!window.jQuery;
      },
      function() {
        return !!window.ga;
      }
    ], function() {
      $('body').addClass('woxxxa');
      
      var tabPosition = 'left';
      if(window.innerWidth <= 550) {
        tabPosition = 'bottom';
      }
      UC.feedbackTab.init({
        label: 'Win £20 worth of vouchers',
        position: tabPosition,
        tabDimensions: {height: 'auto', width: '350px'},
        contentDimensions: {height: '350px', width: '600px'},
        content: [
          '<div>',
            '<div class="woxxxa-imgwrap">',
                '<img class="" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RUIzNkZENDZENEIxMUU3OUFBNjk0OTQ5OEZFNUE5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RUIzNkZENTZENEIxMUU3OUFBNjk0OTQ5OEZFNUE5NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQjM2RkQyNkQ0QjExRTc5QUE2OTQ5NDk4RkU1QTk1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFQjM2RkQzNkQ0QjExRTc5QUE2OTQ5NDk4RkU1QTk1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AJkFkb2JlAGTAAAAAAQMAFQQDBgoNAAAIRAAAFGkAABku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" />',
            '</div>',
            '<p class="">',
              'Please answer this short survey so that we can improve our shopping experience. It takes just 3 minutes and you could <strong>win one of 10 x vouchers worth £20!</strong>',
            '</p>',
            '<p>',
              '<a class="btn btn-default" target="_blank" href="https://goo.gl/forms/KiIvLXbZ6E8cGjSf1">',
              'Take quick survey',
              '</a>',
            '</p>',
          '</div>'
        ].join(''),
        customClass: 'woxxxa-tab-init',
        dimBackground: true
      });

      // Auto pop-out after 2 seconds
      setTimeout(function() {
          $('.woxxxa-tab-init .UC_fb-tab').trigger('click');
      }, 2000);
    });
})();   
