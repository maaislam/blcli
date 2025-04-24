var _TP020v2 = (function () {

    // Plugins & Helpers ---------------------------
    // ---------------------------------------------

    // UC Library @version 0.2.4
    var UC = {};
    UC.poller=function(t,e,n){var i={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(n)for(var u in n)i[u]=n[u];else n=i;for(var o=!!i.timeout&&new Date(r()+i.timeout),f=i.wait,l=i.multiplier,a=[],c=function(n,i){if(o&&r()>o)return!1;i=i||f,function(){var t=typeof n;return"function"===t?n():"string"!==t||document.querySelector(n)}()?(a.push(!0),a.length===t.length&&e()):setTimeout(function(){c(n,i*l)},i)},m=0;m<t.length;m++)c(t[m])};

    // Magnific Popup v1.1.0 by Dmitry Semenov
    // http://bit.ly/magnific-popup#build=inline
    (function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H,I=function(){return H===undefined&&(H=document.createElement("p").style.MozTransform!==undefined),H};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return I()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}}),A()})

    // Send GA Events With Tracker Name
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Full Story Tagging
    UC.poller([function(){var t=window.FS;if(t&&t.setUserVars)return!0}],function(){window.FS.setUserVars({experiment_str:"TP020",variation_str:"Variation 1 Mobile"})},{multiplier:1.2,timeout:0});


    // ----------------------------------------

    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], function () {
            // Prevent script from running twice on same page
            if ($('body').hasClass('TP020v2')) {
                return false;
            } else {
                activate();
            }
        });
    })();

    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('TP020v2');

        /* Store data for forms in here if AJAX request has already
        been made */
        var cachedForms = {};

        /* Functions for pulling in Login/Register forms and storing them in
        cachedForms object */
        function ajaxLoginForm(deferred) {
            $.ajax({
                url: '/login',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    var $data = $(data);
                    var $form = $data.find('#loginForm');
                    if ($form.length) {
                        cachedForms.login = $form;
                    }
                    deferred.resolve();
                },
                error: function () {
                    console.error('TP020v2 - AJAX /login failed');
                }
            });
        }

        function ajaxRegisterForm(deferred) {
            $.ajax({
                url: '/register',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    var $data = $(data);
                    var $form = $data.find('#verifyDetailsForm');
                    if ($form.length) {
                        cachedForms.register = $form;
                    }
                    deferred.resolve();
                },
                error: function () {
                    console.error('TP020v2 - AJAX /register failed');
                }
            });
        }

        /* Functions to make AJAX requests with deferred objects, so we can build
        the lightbox when both requests have been completed */
        var getLoginForm = function () {
            var deferred = new $.Deferred();
            ajaxLoginForm(deferred);
            return deferred;
        };

        var getRegisterForm = function () {
            var deferred = new $.Deferred();
            ajaxRegisterForm(deferred);
            return deferred;
        };

        /* Function to build the modal with magnific popup, passing the login form and
        register form HTML as parameters. Every time a modal is closed with magnific
        the HTML is destroyed, so this function will run on every click to rebuild it */
        var buildLightbox = function ($loginForm, $registerForm) {
            // Create base HTML template
            var $html = $([
                '<div class="TP020v2_modal">',
                '<div class="TP020v2_modal__option">',
                '   <p class="TP020v2_modal__option_header">Got an online account?</p>',
                '<button class="TP020v2_modal__option_button">LOGIN</button>',
                '<hr />',
                '<h3 class="TP020v2_modal_option_title">Link your offline account, <span>online</span></h3>',
                '<p class="TP020v2_modal__option_description">' +
                'Have an account with us already in one of our branches? Link it online to see your trade prices.' +
                '</p>',
                '<ul class="TP020v2_modal__option_list">',
                '<li>',
                '<span class="TP020v2_li_img"><img src="https://ab-test-sandbox.userconversion.com/experiments/TP020-checkmark-for-verification.png"></span>',
                '<span class="TP020v2_li_txt">Online prices will reflect your trade pricing terms as agreed with your branch</span>',
                '</li>',
                '<li>',
                '<span class="TP020v2_li_img"><img src="https://ab-test-sandbox.userconversion.com/experiments/TP020-checkmark-for-verification.png"></span>',
                '<span class="TP020v2_li_txt">View real-time stock levels for any branch</span>',
                '</li>',
                '</ul>',
                '<button class="TP020v2_modal__option_button1">Security Code</button>',
                '<button class="TP020v2_modal__option_button2">No Security Code</button>',
                '</div>',
                '<div class="TP020v2_modal__form TP020v2_modal__login">', // DISPLAY NONE MOMENTAN//TEST ACUM
                '</div>',
                '<div class="TP020v2_modal__form TP020v2_modal__register">', // DISPLAY NONE MOMENTAN
                '<p class="TP020v2_modal__register_header">Link accounts...</p>',
                '<hr />',
                '</div>',
                '<div class="TP020v2_modal__form TP020v2_modal__noSecurityCode">',
                '<h3 class="TP020v2_modal__noSecurityCode_header">No security code...</h3>',
                '<p class="TP020v2_modal__noSecurityCode_content">Call our Customer Services team on ' +
                '<b>0330 123 3846</b> to request your security code. You will need your account information to hand.</p>',
                '<a href="tel:03301233846"><button class="TP020v2_modal__noSecurityCode_button"><span class="tel_icon"></span>Call Us</button></a>',
                '<p class="TP020v2_modal__noSecurityCode_content">Customer services opening times</p>',
                '<table class="TP020v2_modal__noSecurityCode_timetable">',
                '<tr>',
                '<td>Monday</td>',
                '<td>08:00 - 18:00</td>',
                '</tr>',
                '<tr>',
                '<td>Tuesday</td>',
                '<td>08:00 - 18:00</td>',
                '</tr>',
                '<tr>',
                '<td>Wednesday</td>',
                '<td>08:00 - 18:00</td>',
                '</tr>',
                '<tr>',
                '<td>Thursday</td>',
                '<td>08:00 - 18:00</td>',
                '</tr>',
                '<tr>',
                '<td>Friday</td>',
                '<td>08:00 - 18:00</td>',
                '</tr>',
                '<tr>',
                '<td>Saturday</td>',
                '<td>09:00 - 12:00</td>',
                '</tr>',
                '<tr>',
                '<td>Sunday</td>',
                '<td>Closed</td>',
                '</tr>',
                '</table>',
                '</div>',
                '</div>'
            ].join(''));

            // Append forms to HTML template
            $loginForm.appendTo($html.find('.TP020v2_modal__login'));
            $registerForm.appendTo($html.find('.TP020v2_modal__register'));

            // Go to the LOGIN page
            var $welcomePageDisplay = $html.find('.TP020v2_modal__option');
            // Add close ('back') button to allow return to the welcome page
            var $loginButtonClick = $html.find('.TP020v2_modal__option').find('.TP020v2_modal__option_button');
            var $loginFormFinder = $html.find('.TP020v2_modal__login');
            // If login button clicked go to login page
            $loginButtonClick.click(function () {
                $welcomePageDisplay.hide();
                $loginFormFinder.show();
            });

            // If login page closed return to welcome page
            var $loginFormClose = (function () {
                if ($loginFormFinder.find('.TP020v2_close').length) {
                    return $loginFormFinder.find('.TP020v2_close');
                } else {
                    return $('<div class="TP020v2_close"><i class="arrow_left"></i>BACK</div>');
                }
            })();
            $loginFormClose.click(function () {
                $loginFormFinder.hide();
                $welcomePageDisplay.show();
            });
            $loginFormClose.appendTo($loginFormFinder);

            // Add header to login page
            var $loginHeader = (function () {
                if ($html.find('#loginForm').find('h1').length) {
                    return $html.find('#loginForm').find('h1');
                } else {
                    return $('<h1>Log in to your online account</h1>');
                }
            })();
            $loginHeader.prependTo($html.find('#loginForm'));

            // Move popup in correct place
            var $popupLink = $html.find('#loginForm').find('.more_details_link');
            var $retriveLabelByAttribute = $html.find('.form_field').find('label[for="j_username"]');
            $popupLink.appendTo($retriveLabelByAttribute);

            // Display popup on click
            var $tooltip = $('<div id="emailPop"><p>Your email address will be used as your online login and to contact you</p></div>');
            var $tooltipLink = $html.find('a[href="#j_username-tooltip"]');

            $tooltip.hide().insertAfter($tooltipLink);

            $tooltipLink.click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                $tooltip.toggle();
            });

            // Go to the SECURITY CODE page
            var $regPageDisplay = $html.find('.TP020v2_modal__option');
            // Add close ('back') button to allow return to the welcome page
            var $regButtonClick = $html.find('.TP020v2_modal__option').find('.TP020v2_modal__option_button1');
            var $regFormFinder = $html.find('.TP020v2_modal__register');
            // If login button clicked go to login page
            $regButtonClick.click(function () {
                $regPageDisplay.hide();
                $regFormFinder.show();
            });

            // If SECURITY CODE page closed return to welcome page
            var $regFormClose = (function () {
                if ($regFormFinder.find('.TP020v2_close').length) {
                    return $regFormFinder.find('.TP020v2_close');
                } else {
                    return $('<div class="TP020v2_close"><i class="arrow_left"></i>BACK</div>');
                }
            })();
            $regFormClose.click(function () {
                $regFormFinder.hide();
                $welcomePageDisplay.show();
            });
            $regFormClose.appendTo($regFormFinder);

            // Modify text in the SECURITY CODE page as required
            var $modifyText = $html.find('#verifyDetailsForm').find('div.content').first();
            $modifyText.html("To register your Travis Perkins account online, you need to enter a security code " +
                "via email or SMS.<br><br>Call our customer services team on <b>0330 123 3846</b> to " +
                "receive your security code. You will need your account information to hand. " +
                "This takes just 2 minutes.");
            $html.find('#verifyDetailsForm').find('.content').eq(1).css('display', 'none');

            // Move popups in correct place
            var $popupLink = $html.find('#verifyDetailsForm').find('.more_details_link');
            var $retriveLabelByAttribute = $html.find('.form_field').find('label[for="accountNumber"]');
            $popupLink.eq(0).appendTo($retriveLabelByAttribute);

            $retriveLabelByAttribute = $html.find('.form_field').find('label[for="securityCode"]');
            $popupLink.eq(1).appendTo($retriveLabelByAttribute);

            // Display popups on click
            var $reg1_tooltip = $('<div id="accPopup"><p>If you have multiple accounts, please enter the account that you wish to manage online</p></div>');
            var $reg1_tooltipLink = $html.find('a[href="#accountNumber-tooltip"]');

            $reg1_tooltip.hide().insertAfter($reg1_tooltipLink);

            $reg1_tooltipLink.click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                $reg1_tooltip.toggle();
            });

            var $reg2_tooltip = $('<div id="secPopup"><p>Please enter the security code that you will have received via email or SMS</p></div>');
            var $reg2_tooltipLink = $html.find('a[href="#securityCode-tooltip"]');

            $reg2_tooltip.hide().insertAfter($reg2_tooltipLink);

            $reg2_tooltipLink.click(function(e) {
                e.preventDefault();
                e.stopPropagation();

                $reg2_tooltip.toggle();
            });

            // Go to 'NO SECURITY CODE' Page
            var $nosecPageDisplay = $html.find('.TP020v2_modal__option');
            // Add close ('back') button to allow return to the welcome page
            var $nosecButtonClick = $html.find('.TP020v2_modal__option').find('.TP020v2_modal__option_button2');
            var $nosecFormFinder = $html.find('.TP020v2_modal__noSecurityCode');
            // If 'no security code' button clicked go to 'no security code' page
            $nosecButtonClick.click(function () {
                $nosecPageDisplay.hide();
                $nosecFormFinder.show();
            });

            // If 'NO SECURITY CODE' page closed return to welcome page
            var $nosecFormClose = (function () {
                if ($nosecFormFinder.find('.TP020v2_close').length) {
                    return $nosecFormFinder.find('.TP020v2_close');
                } else {
                    return $('<div class="TP020v2_close"><i class="arrow_left"></i>BACK</div>');
                }
            })();
            $nosecFormClose.click(function () {
                $nosecFormFinder.hide();
                $nosecPageDisplay.show();
            });
            $nosecFormClose.appendTo($nosecFormFinder);

            // Add placeholders to inputs
            $html.find('#j_username').attr('placeholder','Email Address');
            $html.find('#j_password').attr('placeholder','Password');
            $html.find('#accountNumber').attr('placeholder','Account no');
            $html.find('#securityCode').attr('placeholder','Security code');

            // Email must be an email and not empty field
            $html.find('#j_username').on('input', function() {
                var input=$(this);
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var is_email=re.test(input.val());
                if(is_email){input.removeClass("invalid").addClass("valid");}
                else{input.removeClass("valid").addClass("invalid");}
            });

            // To verify password field is not empty
            $html.find('#j_password').on('input', function() {
                var $input = $(this);
                var val = $input.val();
                if (val.length) {
                    $input.removeClass("invalid").addClass('valid');
                } else {
                    $input.removeClass('valid').addClass("invalid");
                }
            });

            // Form Submission Validation
            $html.find("#loginSubmitButton").click(function (event) {
                event.preventDefault();
                var form_data = $html.find("#loginForm").serializeArray();
                var error_free = true;
                for (var input in form_data) {
                    // Skip input validation if CSRFToken
                    if (form_data[input].name === 'CSRFToken') continue;
                    var element = $html.find('#' + form_data[input]['name']);
                    var valid = element.hasClass("valid");
                    var error_element = $("span", element.parent());
                    error_element.css('display', 'none');
                    // Error display logic
                    if (!valid && element.val()) {
                        error_free = false;
                        if (error_element.eq(0).hasClass('validation_error')) {
                            error_element.eq(0).css('display', 'block');
                        }
                    }
                    else if (!valid && !element.val()) {
                        error_free = false;
                        if (error_element.eq(1).hasClass('empty_error')) {
                            error_element.eq(1).css('display', 'block');
                            if (form_data[input].name === 'j_password') {
                                error_element.eq(1).html("Please enter your password");
                            }
                        }
                    }
                }
                if (error_free) {
                    $html.find('#loginForm').submit();
                }
            });


            // Error messages
            var $inputs = $html.find('#accountNumber, #securityCode');
            $inputs.each(function(i) {
                var $input = $(this);
                var $errorElement = $('<p class="accValidationMsg" style="display:none;"></p>');
                if (i === 0) {
                    $errorElement.html("Please enter your account number");
                    $errorElement.insertAfter($input);
                }
                else if (i === 1) {
                    $errorElement.html("Please enter your security code");
                    $errorElement.insertAfter($input);
                }

                $input.on('input', function() {
                    var val = $input.val();
                    if (val.length) {
                        $input.removeClass("invalid").addClass('valid');
                        $errorElement.hide();
                    } else {
                        $input.removeClass('valid').addClass("invalid");
                        $errorElement.show();
                    }
                });
            });

            // Form Submission Validation
            $html.find("#verifyDetailsForm .verifyDetailsSubmit").click(function (event) {
                event.preventDefault();

                var form_data = $html.find("#verifyDetailsForm").serializeArray();
                var noError = true;
                for (var input in form_data) {
                    // Skip input validation if CSRFToken
                    if (form_data[input].name === 'CSRFToken') continue;
                    var element = $html.find('#' + form_data[input]['name']);
                    var valid = element.hasClass("valid");

                    if (!valid && !element.val()) {
                        element.addClass('invalid');
                        noError = false;
                        element.next('.accValidationMsg').show();
                    }
                    else if (!valid) {
                        noError = false;
                    }
                }
                if (noError) {
                    $html.find('#verifyDetailsForm').submit();
                }
            });

            // If users click on the specified inputs the opened tooltips will close
            $html.find('input#j_username').on('click', function () {
                $('#emailPop').hide();
            });

            $html.find('input#accountNumber').on('click', function () {
                $('#accPopup').hide();
            });

            $html.find('input#securityCode').on('click', function () {
                $('#secPopup').hide();
            });

            // Open popup
            $.magnificPopup.open({
                items: {
                    src: $html,
                    type: 'inline'
                },
                closeOnBgClick: false,
                callbacks: {
                    open: function() {
                        $('html').addClass('TP020v2_noscroll');
                        $('body').addClass('TP020v2_noscroll');
                    },
                    close: function() {
                        $('html').removeClass('TP020v2_noscroll');
                        $('body').removeClass('TP020v2_noscroll');
                    }
                }
            });
        };

        /* When user clicks login link, build a lightbox using the form HTML.
        If this is the first time, make AJAX requests to pull in the login and register forms */
        $('a[href="/login"]').on('click', function (e) {
            // Prevent default behaviour of the link (redirecting to page)
            e.preventDefault();

            /* If forms are cached, used those instead of making another
            AJAX request */
            if (cachedForms.login && cachedForms.register) {
                buildLightbox(cachedForms.login, cachedForms.register);
            } else {
                $.when(getLoginForm(), getRegisterForm()).done(function () {
                    /* Both forms have been successfully pulled in,
                    it's now safe to build the lightbox */
                    buildLightbox(cachedForms.login, cachedForms.register);
                });
            }
        });
    }

})();