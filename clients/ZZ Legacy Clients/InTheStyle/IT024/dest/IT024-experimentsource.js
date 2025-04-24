var _IT024 = (function () {

    // PLUGINS
    // UC Library - Poller -- @version 0.2.2
    var UC=function(t){var n=n||window.jQuery;return t.poller=function(t,n,e){var o={wait:50,multiplier:1.1,timeout:0},r=Date.now||function(){return(new Date).getTime()};if(e)for(var a in e)o[a]=e[a];else e=o;for(var i=!!o.timeout&&new Date(r()+o.timeout),s=o.wait,f=o.multiplier,l=[],c=function(e,o){if(i&&r()>i)return!1;o=o||s,function(){var t=typeof e;return"function"===t?e():"string"!==t||document.querySelector(e)}()?(l.push(!0),l.length===t.length&&n()):setTimeout(function(){c(e,o*f)},o)},m=0;m<t.length;m++)c(t[m])},t.throttle=function(t,n){var e,o,r,a=null,i=0;return function(){var s=Date.now||function(){return(new Date).getTime()};s=s(),i||(i=s);var f=n-(s-i);return e=this,o=arguments,(f<=0||f>n)&&(a&&(clearTimeout(a),a=null),i=s,r=t.apply(e,o),a||(e=o=null)),r}},t.group=function(t,n){for(var e=[],o=0;o<t.length;o+=n)e.push(t.slice(o,o+n));return e},t.hoverDelay=function(t,e,o){if(!n)return!1;var r,a,i=Date.now||function(){return(new Date).getTime()};return o||(o=1e3),n(t).hover(function(){a=i()},function(){r||i()-a>=o&&(e(),r=!0)}),t},t.observer={active:[],connect:function(t,n,e){var o={throttle:1e3,config:{attributes:!0,childList:!0,subTree:!1}};if(e)for(var r in e)o[r]=e[r];else e=o;for(var a,i=new MutationObserver(function(e){e.forEach(function(e){a||(a=!0,n(t,e),setTimeout(function(){a=!1},o.throttle))})}),s=0;s<t.length;s++)i.observe(t[s],o.config),this.active.push([t[s],i])},disconnect:function(t){for(var n=this.active,e=0;e<t.length;e++)for(var o=t[e],r=0;r<n.length;r++)o===n[r][0]&&n[r][1].disconnect()}},t.feedbackTab=function(){if(!n)return!1;var t,e,o,r,a,i,s,f=function(n){var e=t||{label:!1,content:!1,position:"left",customClass:!1,sessionClose:!0,tabDimensions:{height:"auto",width:"350px"},contentDimensions:{height:"350px",width:"600px"},mobileBreakpoint:768,animationSpeed:600,dimBackground:!1,zIndex:99999};if(n)for(var o in n)e[o]=n[o];else n=e;return e},l=function(){var e=n(['<div class="UC_fb-tab-container">','<div class="UC_fb-tab">','<span class="UC_fb-tab__inner"></span>','<span class="UC_fb-tab__close">&#215;</span>',"</div>",'<div class="UC_fb-content">','<div class="UC_fb-content__inner"></div>',"</div>","</div>"].join("")),r=e.find(".UC_fb-tab"),a=e.find(".UC_fb-content");return t.label&&r.find(".UC_fb-tab__inner").html(t.label),t.content&&a.find(".UC_fb-content__inner").html(t.content),t.customClass&&e.addClass(t.customClass),t.dimBackground&&(o=n('<div class="UC_fb-tab-bg"></div>')),r.css({height:t.tabDimensions.height,width:t.tabDimensions.width}),a.css({height:t.contentDimensions.height,width:t.contentDimensions.width}),e},c=function(){e&&e.remove(),o&&o.remove()},m=function(){var n,e;switch(t.position){case"left":n="-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;",s="width";break;case"right":n="-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;",e="top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;",s="width";break;case"bottom":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;",s="height";break;case"top":n="-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;",e="left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;",s="height";break;default:n="",e="",s="width"}var o=document.createElement("style");o.type="text/css";var r=".UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:"+t.zIndex+";"+e+"}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:"+t.zIndex+";color:#333;font-size:15px;padding:10px 10px 10px 20px;"+n+"}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:"+(t.zIndex-1)+";}";return o.styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),o},d=function(){r&&r.parentElement.removeChild(r)},u=function(){var t=n(".UC_fb-tab-container"),e=t.children(".UC_fb-tab"),o=t.children(".UC_fb-content"),r=n(window);return{window:{width:r.innerWidth(),height:r.innerHeight()},tab:{width:e.outerWidth(),height:e.outerHeight()},content:{width:o.outerWidth(),height:o.outerHeight()}}},b=function(n){n||(n=u()),t||(t=f());var e={remove:{},open:{},close:{}};return e.remove[t.position]="-100%",e.open[t.position]="0",e.close[t.position]="-"+n.content[s]+"px",e},h=function(n){if(!n)return!1;var e=n.find(".UC_fb-tab"),r=n.find(".UC_fb-content"),s="closed";e.click(function(){var e,f,l;i=u(),a=b(i),e=i.window.width-i.tab.height-5,f=i.window.height-i.tab.height-5,r.css({"max-width":e,"max-height":f}),i.content.width>e&&(i.content.width=e),i.content.height>f&&(i.content.height=f),"open"===s?(l=a.close,o&&o.fadeOut()):(l=a.open,o&&o.fadeIn()),n.animate(l,t.animationSpeed,function(){s="open"===s?"closed":"open"})}),e.find(".UC_fb-tab__close").click(function(e){e.stopPropagation(),o&&o.fadeOut(),n.animate(a.remove,t.animationSpeed),t.sessionClose&&window.sessionStorage.setItem("ucfbtab-closed",1)})};return{init:function(n){var c=f(n);t!==c&&(t=c),t.sessionClose&&window.sessionStorage.getItem("ucfbtab-closed")||(e=l(),r=m(),e.prependTo("body"),document.body.insertBefore(r,e[0]),t.dimBackground&&e.before(o),i=u(),a=b(i),h(e),e.css(t.position,"-"+i.content[s]+"px"))},destroy:{component:c,css:d,all:function(){c(),d()}},refresh:function(t){this.destroy.all(),this.init(t)}}}(),t}(UC||{});

    // Send GA Events With Tracker Name ------------
    // ---------------------------------------------
    function sendEvent(e,n,a,r,t,o){var c=function(c){var i={};i.nonInteraction=r,t&&o&&(i["dimension"+t]=o),window.ga(c+".send","event",e,n,a,i)};trackerName?c(trackerName):UC.poller([function(){return window.ga.getAll}],function(){trackerName=window.ga.getAll()[0].get("name"),c(trackerName)})}var trackerName;

    // Magnific Popup v1.1.0 by Dmitry Semenov
    // http://bit.ly/magnific-popup#build=inline
    (function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H,I=function(){return H===undefined&&(H=document.createElement("p").style.MozTransform!==undefined),H};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return I()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}}),A()})

    // Full Story Tagging --------------------------
    // ---------------------------------------------
    UC.poller([
        function () {
            var fs = window.FS;
            if (fs && fs.setUserVars) return true;
        }
    ], function () {
        window.FS.setUserVars({
            experiment_str: 'IT024',
            variation_str: 'Variation 1 Mobile'
        });
    }, {multiplier: 1.2, timeout: 0});

    // Triggers ------------------------------------
    // ---------------------------------------------
    var _triggers = (function () {
        UC.poller([
            function () {
                return window.jQuery
            },
            function () {
                return window.ga
            }
        ], activate);
    })();

    // Experiment -----------------------------------
    // ----------------------------------------------
    function activate() {
        var $ = window.jQuery;
        var $body = $('body');
        $body.addClass('IT024');

        // Global variable to keep track of what size the users select
        var sizeInputTrackGlobal = 0;

        // Align 'check the fit' and 'size guide' buttons (and wrap them in a div)
        // ---------------------------------------------------------
        var initMarkup = (function () {
            $('.product-size-guide').wrap('<div class=IT024_modalsWrapper></div>');
            $([
                '<div class="IT024_checkTheFitWrapper">',
                    '<button class="IT024_checkTheFitBtn" role="button">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/IT024-dress.png">CHECK THE FIT',
                    '</button>',
                '</div>'
            ].join(''))
                .prependTo('.IT024_modalsWrapper');
        }()); // initMarkup

        // Create wrapper (display 'users entering their size' (first) page by default - pass in createFirstStepHtml() as argument)
        // ---------------------------------------------------------
        function createHtml(stepHtml) {
            var modalHtml = [
                '<div class="IT024_wrapper">',
                    '<h3 class="IT024_title">CHECK THE FIT</h3>',
                    stepHtml,
                '</div>'
            ].join('');

            return modalHtml;
        } // createHtml

        // Functions returning the html for the 3 steps in the modal
        // ---------------------------------------------------------
        function createFirstStepHtml () {
            var firstStepHtml = [
                '<div class="IT024_firstStep">',
                    '<div class="IT024_ruleImgWrap">',
                        '<img src="https://ab-test-sandbox.userconversion.com/experiments/IT024-female-gymnast-measuring-her-waist.png" class="IT024_rulerImg">',
                    '</div>',
                    '<p class="IT024_sizeQ">WHAT SIZE DO YOU NORMALLY WEAR?</p>',
                    '<div class="IT024_sizeInputWrapper">',
                        '<input class="IT024_sizeInputText" type="text" value="0">',
                        '<p class="IT024_incorrectValue">Please enter a valid UK size -> even number between (6 - 28)</p>',
                    '</div>',
                    '<div class="IT024_next_Btn_Wrap">',
                        '<button class="IT024_nextBtn IT024_nextBtnFirst" role="button">NEXT</button>',
                    '</div>',
                '</div>'
            ].join('');

            return firstStepHtml;
        } // createFirstStepHtml

        function createSecondStepHtml () {
            var secondStepHtml = [
                '<div class="IT024_secondStep">',
                    '<div class="IT024_storesQ">WHICH STORES TEND TO FIT YOU BEST</div>',
                    '<div class="IT024_brandsWrapper">',
                        '<div class="IT024_brandsLeft">',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt="new_look" src="https://ab-test-sandbox.userconversion.com/experiments/IT024-store-logo.jpg">',
                            '</div>',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt="lipsy" src="https://ab-test-sandbox.userconversion.com/experiments/IT024-lipsy.jpg">',
                            '</div>',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt="miss-selfridge" src="https://ab-test-sandbox.userconversion.com/experiments/IT024-miss-selfridge.jpg">',
                            '</div>',
                        '</div>',
                        '<div class="IT024_brandsRight">',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt="river-island" src="https://ab-test-sandbox.userconversion.com/experiments/IT024-river-island.png">',
                            '</div>',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt=topshop src="https://ab-test-sandbox.userconversion.com/experiments/IT024-topshop.gif">',
                            '</div>',
                            '<div class="IT024_brand">',
                                '<span class="IT024_radioBtn">',
                                    '<span class="IT024_radioBtnFiller"></span>',
                                '</span>',
                                '<img class="IT024_brand_img" alt="asos" src="https://ab-test-sandbox.userconversion.com/experiments/IT024-ASOS_logo_plain_listing.jpg">',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<p class="IT024_noStore_error">Please select a store</p>',
                    '<div class="IT024_next_Btn_Wrap">',
                        '<button class="IT024_nextBtn IT024_nextBtnSecond" role="button">NEXT</button>',
                    '</div>',
                    '<div class="IT024_backBtn_Wrap">',
                        '<button class="IT024_backBtn"><span><-</span> Go back</button>',
                    '</div>',
                '</div>'
            ].join('');

            return secondStepHtml;
        } // createSecondStepHtml

        function createThirdStepHtml () {
            var thirdStepHtml = [
                '<div class="IT024_thirdStep">',
                    '<div class="IT024_recommendationWrapper">',
                        '<p class="IT024_recommTitle">OUR RECOMMENDATION</p>',
                        '<div class="IT024_percentageBigWrapper">',
                            '<div class="IT024_percentageBarWrapper">',
                                '<span class="IT024_theSize">',
                                    '<span class="IT024_sizeTextOnly">SIZE</span>',
                                        '<span class="IT024_sizeChosen">10</span>',
                                    '</span>',
                            '</div>',
                            '<div class="IT024_percentageBarWrapperSecond"></div>',
                        '</div>',
                        '<p class="IT024_percentageShow"><span class="IT024_percentage">70</span>% CHANCE THIS ITEM WILL FIT YOU</p>',
                    '</div>',
                    '<div class="IT024_lotOfTextContainer">',
                        '<p class="IT024_title">HOW DO WE DECIDE THIS?</p>',
                        '<p class="IT024_infoComp">We calculate this figure from a mixture of things...</p>',
                        '<div class="IT024_infoParamsWrapper">',
                            '<div class="IT024_infoRight IT024_infoLogo1">',
                                '<p class="IT024_infoHead">RETURNS</p>',
                                '<p class="IT024_infoContent">How many people returned this item because the fit wasn\'t right for them.</p>',
                            '</div>',
                            '<div class="IT024_infoRight IT024_infoLogo2">',
                                '<p class="IT024_infoHead">GARMENT EXPERT</p>',
                                '<p class="IT024_infoContent">Something here about the garment expert as this would look good.</p>',
                            '</div>',
                            '<div class="IT024_infoRight IT024_infoLogo3">',
                                '<p class="IT024_infoHead">REVIEWS/SURVEYS</p>',
                                '<p class="IT024_infoContent">We listen to what you say about the fit and how it suited certan body shapes.</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="IT024_next_Btn_Wrap">',
                        '<button class="IT024_nextBtn IT024_finishBtn" role="button">FINISH</button>',
                    '</div>',
                '</div>'
            ].join('');

            return thirdStepHtml;
        } // createThirdStepHtml

        // Functions for moving between the steps in the modal (from 1st to 2nd, 2nd to 3rd, and back from 2nd to 1st)
        // ---------------------------------------------------------
        // Move to second step in the lightbox when clicking 'next' button in the first lightbox
        function moveToSecondStep() {
            var $errorIncorrect = $('.IT024_incorrectValue');
            var $firstStepNextBtn = $('.IT024_nextBtnFirst');
            $firstStepNextBtn.on('click', function (e) {
                e.preventDefault();
                sizeInputTrackGlobal = $('.IT024_sizeInputText').val();
                if (sizeInputTrackGlobal < 6 || sizeInputTrackGlobal > 28
                    || sizeInputTrackGlobal % 2 !== 0 || sizeInputTrackGlobal[0] === '0') {
                    $errorIncorrect.show();
                    $('.IT024_sizeInputText').css('borderColor', 'red');
                    inputTracker();
                    return;
                }
                var $firstStep = $('.IT024_firstStep');
                $firstStep.toggleClass('IT024_hidden');
                $firstStep.removeClass('IT024_opened');
                if (!$('.IT024_secondStep').length) {
                    $(createSecondStepHtml()).insertAfter('.IT024_title');
                    moveBackToFirstStep();
                    moveToThirdStep();
                    radioBtnsSimulation();
                } else {
                    $('.IT024_secondStep').removeClass('IT024_hidden');
                }
            });
        } // moveToSecondStep

        // Move to third step in the lightbox when clicking 'next' button in the second lightbox
        function moveToThirdStep() {
            var $secondStepNextBtn = $('.IT024_nextBtnSecond');
            var $errorNoStoreSelected = $('.IT024_noStore_error');
            $secondStepNextBtn.on('click', function (e) {
                e.preventDefault();
                if (!$('.IT024_radioBtnFiller.IT024_opened').length) {
                    $errorNoStoreSelected.show();
                    return;
                }
                var $secondStep = $('.IT024_secondStep');
                $secondStep.toggleClass('IT024_hidden');
                $secondStep.removeClass('IT024_opened');
                if (!$('.IT024_thirdStep').length) {
                    $(createThirdStepHtml()).insertAfter('.IT024_title');
                    $('.IT024_finishBtn').on('click', function () {
                        $('.mfp-close').trigger('click');
                    });
                    computePercentage();
                }
            });
        } // moveToThirdStep

        // Move to first step in the lightbox when clicking '<- Go back' button in the second lightbox
        function moveBackToFirstStep() {
            var $secondStepBackBtn = $('.IT024_backBtn');
            $secondStepBackBtn.on('click', function (e) {
                e.preventDefault();
                $('.IT024_secondStep').addClass('IT024_hidden');
                $('.IT024_secondStep').removeClass('IT024_opened');
                $('.IT024_firstStep').removeClass('IT024_hidden');
                $('.IT024_firstStep').addClass('IT024_opened');
            });
        } // moveBackToFirstStep

        // Simulate radio input buttons - call inside -> moveToSecondStep function
        // ---------------------------------------------------------
        function radioBtnsSimulation() {
            var $brandImg = $('.IT024_brand_img');
            var $radioBtn = $('.IT024_radioBtn');
            var $radioCollection = $brandImg.add($radioBtn);
            $radioCollection.on('click', function (e) {
                e.preventDefault();
                $('.IT024_noStore_error').hide();
                var $this = $(this);
                $radioBtn.children().removeClass('IT024_opened');
                if ($this.hasClass('IT024_radioBtn')) {
                    $this.children().addClass('IT024_opened');
                } else {
                    $this.prev().children().addClass('IT024_opened');
                }
            });
        } // radioBtnsSimulation

        // Keep track of what users input. Also only on successful validation allow them to progress - call inside 'lightboxMarkup'
        // Validation: (?) 6 - 28 (even numbers only) (for UK only?) (?)
        // ---------------------------------------------------------
        function inputTracker() {
            var $errorIncorrect = $('.IT024_incorrectValue');
            $('.IT024_sizeInputText').on('input', function () {
                sizeInputTrackGlobal = this.value;
                if (sizeInputTrackGlobal < 6 || sizeInputTrackGlobal > 28
                    || sizeInputTrackGlobal % 2 !== 0 || sizeInputTrackGlobal[0] === '0') {
                    $errorIncorrect.show();
                    $('.IT024_sizeInputText').css('borderColor', 'red');
                } else {
                    $errorIncorrect.hide();
                    $('.IT024_sizeInputText').css('borderColor', 'green');
                }
            });
        } // inputTracker

        /* Compute percentage to display in the third step. This is called inside 'moveToThirdStep' function
           Percentage computed based on (nothing?)
           For now following logic used:
           ---> valid sizes user can select: even numbers between (6 - 28) -> so compute percentage based on these values
           ---> percentage will vary between 60 - 90% (?)
         */
        function computePercentage () {
            var $sizeChosen = $('.IT024_sizeChosen');
            var $percentageText = $('.IT024_percentage');
            var hardcodedPercentage;
            var percentageClipper = $('.IT024_percentageBarWrapperSecond');
            // If this point is reached a valid size value the user has selected is stored (sizeInputTrackGlobal)
            // Use this value to update the size in 'our recommendation' block
            $sizeChosen.text(sizeInputTrackGlobal);
            // hard code some percentages
            if (sizeInputTrackGlobal >= 6 && sizeInputTrackGlobal <= 14) {
                hardcodedPercentage = 85;
                percentageClipper.css('clip', 'rect(0px, 50px, 10px, 0px)');
            } else if (sizeInputTrackGlobal >= 16 && sizeInputTrackGlobal <= 22) {
                hardcodedPercentage = 75;
                percentageClipper.css('clip', 'rect(0px 50px 50px 0px)');
            } else if (sizeInputTrackGlobal >= 24 && sizeInputTrackGlobal <= 28) {
                hardcodedPercentage = 65;
                percentageClipper.css('clip', 'rect(0px 50px 70px 0px)');
            }
            $percentageText.text(hardcodedPercentage);
        } // computePercentage

        // Build initial lightbox using magnific popup
        var lightboxMarkup = (function () {
            function buildLightBox(stepHtml) {
                // Open popup
                $.magnificPopup.open({
                    items: {
                        src: createHtml(stepHtml),
                        type: 'inline'
                    }
                });
            } // buildLightBox

            // Open lightbox when clicking 'CHECK THE FIT' btn
            var firstLightboxBuilder = (function () {
                var $checkFitBtn = $('.IT024_checkTheFitBtn');
                $checkFitBtn.on('click', function (e) {
                    e.preventDefault();
                    buildLightBox(createFirstStepHtml());
                    moveToSecondStep();
                });
            }()); // firstLightboxBuilder
        }()); // lightboxMarkup

        var __events = (function () {
            sendEvent('IT024', 'Page View', 'IT024 - Product Size Tool 2', true);

            $('.IT024_checkTheFitBtn').on('click', function () {
                sendEvent('IT024', 'Product Size Tool opened', 'IT024 - Product Size Tool 2', true);
            });
        }()); // __events

    } // activate

})(); // _IT024