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
      },
      function() {
        return !!window.location.href.match(
            /Checkout\/order_thank_you_page|Checkout\/guest\/order_thank_you_page/ig
        )
      }
    ], function() {
      $('body').addClass('tpxxxa');
      
      var tabPosition = 'left';
      if(window.innerWidth <= 550) {
        tabPosition = 'bottom';
      }
      UC.feedbackTab.init({
        label: 'Please provide your feedback',
        position: tabPosition,
        tabDimensions: {height: 'auto', width: '350px'},
        contentDimensions: {height: '350px', width: '600px'},
        content: [
          '<div>',
            '<img class="" src="https://prod1-tp-prod02-aws-travisperkins-com-public.s3.amazonaws.com/h51/h3d/8807077740574" />',
            '<p class="">',
              'Please answer this short survey so that we can learn a little more about you. It only takes a minute.',
            '</p>',
            '<p>',
              '<a class="btn btn-default" target="_blank" href="https://docs.google.com/forms/d/1wJxY7sSsZcmXCV0mvuVpIH2a5NeNPEOICNrIRY1F0Ow/edit">',
              'Take quick survey',
              '</a>',
            '</p>',
          '</div>'
        ].join(''),
        customClass: 'tpxxxa-tab-init',
        dimBackground: true
      });

      // Auto pop-out after 2 seconds
      setTimeout(function() {
          $('.tpxxxa-tab-init .UC_fb-tab').trigger('click');
      }, 2000);
    });
})();   
